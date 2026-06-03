import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { requireStripe } from "@/lib/stripe";
import { db } from "@/lib/db";
import { serviceOrders, processedEvents } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { kickoffGenerate } from "@/lib/worker";
import { log } from "@/lib/logger";
import type { ServiceOrder } from "@/lib/schema";

export const runtime = "nodejs";

async function markProcessed(eventId: string, type: string): Promise<boolean> {
  try {
    await db.insert(processedEvents).values({ id: eventId, type });
    return true;
  } catch {
    return false;
  }
}

function mergeStripeCustomerDetails(
  order: ServiceOrder,
  details: Stripe.Checkout.Session.CustomerDetails | null | undefined
): Partial<ServiceOrder> {
  if (!details) return {};

  const patch: Partial<ServiceOrder> = {};

  if (!order.phone && details.phone) {
    patch.phone = details.phone;
  }

  const taxId = details.tax_ids?.[0]?.value;
  if (!order.invoiceTaxId && taxId) {
    patch.invoiceTaxId = taxId.replace(/\D/g, "");
  }

  return patch;
}

async function applyCustomerDetailsMerge(orderId: string, session: Stripe.Checkout.Session) {
  const order = (await db.select().from(serviceOrders).where(eq(serviceOrders.id, orderId)).limit(1))[0];
  if (!order) return;

  const patch = mergeStripeCustomerDetails(order, session.customer_details);
  if (Object.keys(patch).length === 0) return;

  await db.update(serviceOrders).set(patch).where(eq(serviceOrders.id, orderId));
}

async function handleUslugaPaid(session: Stripe.Checkout.Session) {
  const serviceOrderId = session.metadata?.serviceOrderId;
  if (!serviceOrderId) return;

  await applyCustomerDetailsMerge(serviceOrderId, session);

  const order = (await db.select().from(serviceOrders).where(eq(serviceOrders.id, serviceOrderId)).limit(1))[0];
  if (!order || order.status !== "PENDING") return;

  const email = session.customer_details?.email ?? order.email;
  const paymentId = typeof session.payment_intent === "string" ? session.payment_intent : undefined;

  await db.update(serviceOrders).set({ status: "FILLED", stripePaymentId: paymentId, email }).where(eq(serviceOrders.id, order.id));

  kickoffGenerate(order.id);
}

async function handleKoszykPaid(session: Stripe.Checkout.Session) {
  const idsJson = session.metadata?.serviceOrderIds;
  if (!idsJson) return;

  let ids: string[];
  try {
    ids = JSON.parse(idsJson) as string[];
  } catch {
    log.warn("[webhook] koszyk: invalid serviceOrderIds JSON", { idsJson });
    return;
  }

  const paymentId = typeof session.payment_intent === "string" ? session.payment_intent : undefined;
  const emailFromSession = session.customer_details?.email;

  for (const id of ids) {
    await applyCustomerDetailsMerge(id, session);

    const order = (await db.select().from(serviceOrders).where(eq(serviceOrders.id, id)).limit(1))[0];
    if (!order || order.status !== "PENDING") continue;
    const email = emailFromSession ?? order.email;
    await db.update(serviceOrders).set({ status: "FILLED", stripePaymentId: paymentId, email }).where(eq(serviceOrders.id, order.id));
    kickoffGenerate(order.id);
  }
}

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ error: "Webhook not configured" }, { status: 500 });

  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "Missing signature" }, { status: 400 });

  const body = await req.text();
  const stripe = requireStripe();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err) {
    log.warn("[webhook] invalid signature", { err: String(err) });
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  const firstTime = await markProcessed(event.id, event.type);
  if (!firstTime) {
    log.info("[webhook] duplicate event ignored", { id: event.id, type: event.type });
    return NextResponse.json({ received: true, duplicate: true });
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      if (session.payment_status !== "paid") {
        log.info("[webhook] session completed but unpaid (async method)", { id: session.id, status: session.payment_status });
        return NextResponse.json({ received: true, pending: true });
      }
      const orderType = session.metadata?.orderType;
      if (orderType === "uslugi") await handleUslugaPaid(session);
      if (orderType === "koszyk") await handleKoszykPaid(session);
    }

    if (event.type === "checkout.session.async_payment_succeeded") {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderType = session.metadata?.orderType;
      if (orderType === "uslugi") await handleUslugaPaid(session);
      if (orderType === "koszyk") await handleKoszykPaid(session);
    }

    if (event.type === "checkout.session.async_payment_failed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderType = session.metadata?.orderType;
      if (orderType === "uslugi" && session.metadata?.serviceOrderId) {
        await db.update(serviceOrders).set({ status: "FAILED", error: "Payment failed" }).where(eq(serviceOrders.id, session.metadata.serviceOrderId));
      }
    }

    if (event.type === "charge.refunded") {
      const charge = event.data.object as Stripe.Charge;
      const paymentIntent = typeof charge.payment_intent === "string" ? charge.payment_intent : undefined;
      if (paymentIntent) {
        await db.update(serviceOrders).set({ status: "REFUNDED", error: "Refunded via Stripe" }).where(eq(serviceOrders.stripePaymentId, paymentIntent));
      }
    }
  } catch (err) {
    log.error("[webhook] handler error", { err: String(err), type: event.type });
    return NextResponse.json({ error: "Handler error" }, { status: 500 });
  }

  return NextResponse.json({ received: true });
}
