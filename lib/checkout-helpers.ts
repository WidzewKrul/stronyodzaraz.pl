import type Stripe from "stripe";
import type { UslugaCheckoutInput, KoszykCheckoutInput } from "./checkout-schema";
import { normalizeInvoiceTaxId, TERMS_VERSION } from "./checkout-schema";

type CustomerFields = Pick<
  KoszykCheckoutInput,
  | "email"
  | "firstName"
  | "lastName"
  | "phone"
  | "invoiceRequested"
  | "invoiceName"
  | "invoiceTaxId"
  | "invoiceStreet"
  | "invoiceCity"
  | "invoicePostalCode"
  | "invoiceProvince"
  | "consumerWaiverAccepted"
  | "portfolioConsent"
  | "marketingConsent"
>;

export function buildServiceOrderCustomerValues(
  data: CustomerFields,
  opts: { checkoutGroupId: string; termsAcceptedIp: string }
) {
  const now = new Date();
  return {
    email: data.email,
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone || null,
    checkoutGroupId: opts.checkoutGroupId,
    invoiceRequested: data.invoiceRequested,
    invoiceName: data.invoiceRequested ? data.invoiceName ?? null : null,
    invoiceTaxId: data.invoiceRequested && data.invoiceTaxId ? normalizeInvoiceTaxId(data.invoiceTaxId) : null,
    invoiceStreet: data.invoiceRequested ? data.invoiceStreet ?? null : null,
    invoiceCity: data.invoiceRequested ? data.invoiceCity ?? null : null,
    invoicePostalCode: data.invoiceRequested ? data.invoicePostalCode ?? null : null,
    invoiceProvince: data.invoiceRequested ? data.invoiceProvince ?? null : null,
    termsAcceptedAt: now,
    termsAcceptedIp: opts.termsAcceptedIp,
  };
}

export function buildStripeCheckoutExtras(
  data: CustomerFields & { checkoutGroupId: string }
): Pick<Stripe.Checkout.SessionCreateParams, "billing_address_collection" | "tax_id_collection"> {
  return {
    billing_address_collection: "auto",
    tax_id_collection: { enabled: true },
  };
}

export function buildStripeCustomerMetadata(
  data: CustomerFields & { checkoutGroupId: string }
): Record<string, string> {
  const meta: Record<string, string> = {
    firstName: data.firstName,
    lastName: data.lastName,
    checkoutGroupId: data.checkoutGroupId,
    invoiceRequested: String(data.invoiceRequested),
    termsVersion: TERMS_VERSION,
    portfolioConsent: String(data.portfolioConsent ?? true),
    marketingConsent: String(data.marketingConsent ?? false),
  };
  if (!data.invoiceRequested && data.consumerWaiverAccepted) {
    meta.consumerWaiverAccepted = "true";
  }
  return meta;
}

export function rejectOversizedBody(req: Request, maxBytes: number): Response | null {
  const raw = req.headers.get("content-length");
  if (!raw) return null;
  const len = parseInt(raw, 10);
  if (!Number.isFinite(len) || len <= maxBytes) return null;
  return new Response(JSON.stringify({ error: "Payload too large." }), {
    status: 413,
    headers: { "Content-Type": "application/json" },
  });
}

export type { UslugaCheckoutInput, KoszykCheckoutInput };
