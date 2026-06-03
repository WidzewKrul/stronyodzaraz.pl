import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { db } from "@/lib/db";
import { serviceOrders } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { requireStripe } from "@/lib/stripe";
import { getStoreProductBySlug } from "@/lib/uslugi";
import { rateLimit, clientIp } from "@/lib/rate-limit";
import { assertSameOriginStrict } from "@/lib/cron-auth";
import { log } from "@/lib/logger";
import { siteUrl } from "@/lib/env";
import { gotowePismoCheckoutSchema } from "@/lib/checkout-schema";
import {
  buildServiceOrderCustomerValues,
  buildStripeCheckoutExtras,
  buildStripeCustomerMetadata,
  rejectOversizedBody,
} from "@/lib/checkout-helpers";

export const runtime = "nodejs";

export async function POST(req: NextRequest) {
  const originErr = assertSameOriginStrict(req);
  if (originErr) return originErr;

  const sizeErr = rejectOversizedBody(req, 50_000);
  if (sizeErr) return sizeErr;

  const ip = clientIp(req);
  const rl = rateLimit(`uslugi-checkout:${ip}`, 10, 60_000);
  if (!rl.ok) {
    return NextResponse.json({ error: "Zbyt wiele prób. Odczekaj chwilę." }, { status: 429 });
  }

  try {
    const parsed = gotowePismoCheckoutSchema.safeParse(await req.json());
    if (!parsed.success) {
      const msg = parsed.error.errors[0]?.message ?? "Błędne dane.";
      return NextResponse.json({ error: msg }, { status: 400 });
    }
    const data = parsed.data;
    const { slug, promotionCode, prefillData } = data;

    const pismo = getStoreProductBySlug(slug);
    if (!pismo) {
      return NextResponse.json({ error: "Nie znaleziono pakietu usługi." }, { status: 404 });
    }

    const checkoutGroupId = crypto.randomUUID();
    const orderId = crypto.randomUUID();
    const customerValues = buildServiceOrderCustomerValues(data, {
      checkoutGroupId,
      termsAcceptedIp: ip,
    });

    const toolSlug = `uslugi:${pismo.slug}`;
    const stripe = requireStripe();
    const base = siteUrl();

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      customer_email: data.email,
      currency: "pln",
      allow_promotion_codes: true,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "pln",
            unit_amount: pismo.priceGrosze,
            product_data: {
              name: pismo.title,
              description:
                "Pakiet stronyodzaraz.pl — po płatności link do briefu online, realizacja wg opisu pakietu.",
            },
          },
        },
      ],
      success_url: `${base}/sukces?order=${orderId}&tool=uslugi&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/uslugi/${pismo.category}/${pismo.slug}`,
      ...buildStripeCheckoutExtras({ ...data, checkoutGroupId }),
      metadata: {
        orderType: "uslugi",
        serviceOrderId: orderId,
        toolSlug,
        pismoSlug: pismo.slug,
        ...buildStripeCustomerMetadata({ ...data, checkoutGroupId }),
      },
    };

    if (promotionCode) {
      try {
        const codes = await stripe.promotionCodes.list({ code: promotionCode, active: true, limit: 1 });
        if (codes.data[0]) {
          sessionParams.discounts = [{ promotion_code: codes.data[0].id }];
          sessionParams.allow_promotion_codes = undefined;
        }
      } catch (err) {
        log.warn("[uslugi/checkout] promo lookup failed", { err: String(err) });
      }
    }

    const session = await stripe.checkout.sessions.create(sessionParams, {
      idempotencyKey: `uslugi-checkout:${orderId}`,
    });

    // Insert to DB only after Stripe session is confirmed — avoids orphaned PENDING rows on Stripe failure.
    const questionnaireData = prefillData && Object.keys(prefillData).length > 0
      ? { ...prefillData, kategoria: pismo.category, tytulWzoru: pismo.title, branch: pismo.branch ?? "" }
      : { kategoria: pismo.category, tytulWzoru: pismo.title, branch: pismo.branch ?? "" };

    await db.insert(serviceOrders).values({
      id: orderId,
      ...customerValues,
      toolSlug,
      priceGrosze: pismo.priceGrosze,
      status: "PENDING",
      promotionCode: promotionCode || null,
      stripeSessionId: session.id,
      questionnaireData,
    });

    return NextResponse.json({ url: session.url, orderId });
  } catch (err) {
    log.error("[uslugi/checkout] error", { err: String(err) });
    const msg = err instanceof Error ? err.message : "Nieoczekiwany błąd";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
