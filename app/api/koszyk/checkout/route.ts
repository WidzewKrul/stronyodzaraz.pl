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
import { koszykCheckoutSchema } from "@/lib/checkout-schema";
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
  const rl = rateLimit(`koszyk-checkout:${ip}`, 10, 60_000);
  if (!rl.ok) {
    return NextResponse.json({ error: "Zbyt wiele prób. Odczekaj chwilę." }, { status: 429 });
  }

  try {
    const parsed = koszykCheckoutSchema.safeParse(await req.json());
    if (!parsed.success) {
      const msg = parsed.error.errors[0]?.message ?? "Błędne dane.";
      return NextResponse.json({ error: msg }, { status: 400 });
    }
    const data = parsed.data;
    const { items, promotionCode } = data;

    const checkoutGroupId = crypto.randomUUID();
    const customerValues = buildServiceOrderCustomerValues(data, {
      checkoutGroupId,
      termsAcceptedIp: ip,
    });

    const seen = new Set<string>();
    const resolved: {
      slug: string;
      pismo: ReturnType<typeof getStoreProductBySlug>;
      prefillData?: Record<string, string>;
    }[] = [];
    for (const item of items) {
      if (seen.has(item.slug)) continue;
      seen.add(item.slug);
      const pismo = getStoreProductBySlug(item.slug);
      if (!pismo) return NextResponse.json({ error: `Nie znaleziono pakietu: ${item.slug}` }, { status: 404 });
      resolved.push({ slug: item.slug, pismo, prefillData: item.prefillData });
    }

    const orderRows = await Promise.all(
      resolved.map(({ pismo, prefillData }) =>
        db
          .insert(serviceOrders)
          .values({
            ...customerValues,
            toolSlug: `uslugi:${pismo!.slug}`,
            priceGrosze: pismo!.priceGrosze,
            status: "PENDING",
            promotionCode: promotionCode || null,
            ...(prefillData && Object.keys(prefillData).length > 0
              ? {
                  questionnaireData: {
                    ...prefillData,
                    kategoria: pismo!.category,
                    tytulWzoru: pismo!.title,
                    branch: pismo!.branch ?? "",
                  },
                }
              : {
                  questionnaireData: {
                    kategoria: pismo!.category,
                    tytulWzoru: pismo!.title,
                    branch: pismo!.branch ?? "",
                  },
                }),
          })
          .returning()
          .then((rows) => rows[0]!)
      )
    );

    const orderIds = orderRows.map((o) => o.id);
    const stripe = requireStripe();
    const base = siteUrl();

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = resolved.map(({ pismo }) => ({
      quantity: 1,
      price_data: {
        currency: "pln",
        unit_amount: pismo!.priceGrosze,
        product_data: {
          name: pismo!.title,
          description:
            "Pakiet stronyodzaraz.pl — po płatności link do briefu online, realizacja wg opisu pakietu.",
        },
      },
    }));

    const sessionParams: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      customer_email: data.email,
      currency: "pln",
      allow_promotion_codes: true,
      line_items: lineItems,
      success_url: `${base}/sukces?order=${orderIds[0]}&tool=uslugi&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/koszyk`,
      ...buildStripeCheckoutExtras({ ...data, checkoutGroupId }),
      metadata: {
        orderType: "koszyk",
        serviceOrderIds: JSON.stringify(orderIds),
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
        log.warn("[koszyk/checkout] promo lookup failed", { err: String(err) });
      }
    }

    const session = await stripe.checkout.sessions.create(sessionParams, {
      idempotencyKey: `koszyk-checkout:${orderIds[0]}`,
    });

    await Promise.all(
      orderRows.map((o) =>
        db.update(serviceOrders).set({ stripeSessionId: session.id }).where(eq(serviceOrders.id, o.id))
      )
    );

    return NextResponse.json({ url: session.url, orderIds });
  } catch (err) {
    log.error("[koszyk/checkout] error", { err: String(err) });
    const msg = err instanceof Error ? err.message : "Nieoczekiwany błąd";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
