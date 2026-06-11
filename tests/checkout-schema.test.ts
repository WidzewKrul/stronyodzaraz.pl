import { describe, it, expect } from "vitest";
import {
  validateNip,
  gotowePismoCheckoutSchema,
  koszykCheckoutSchema,
  normalizeInvoiceTaxId,
} from "@/lib/checkout-schema";

const baseCustomer = {
  email: "klient@example.com",
  firstName: "Jan",
  lastName: "Kowalski",
  termsAccepted: true as const,
  consumerWaiverAccepted: true,
};

describe("validateNip", () => {
  it("accepts a valid Polish NIP", () => {
    // 5260001246 — well-known valid checksum NIP.
    expect(validateNip("5260001246")).toBe(true);
    expect(validateNip("526-000-12-46")).toBe(true);
  });

  it("rejects wrong length and bad checksum", () => {
    expect(validateNip("123")).toBe(false);
    expect(validateNip("5260001247")).toBe(false);
    expect(validateNip("0000000000")).toBe(true); // checksum 0 — structurally valid
  });
});

describe("normalizeInvoiceTaxId", () => {
  it("strips non-digits", () => {
    expect(normalizeInvoiceTaxId("526-000-12-46")).toBe("5260001246");
  });
});

describe("gotowePismoCheckoutSchema", () => {
  it("accepts a minimal valid order", () => {
    const r = gotowePismoCheckoutSchema.safeParse({ ...baseCustomer, slug: "strona-start" });
    expect(r.success).toBe(true);
  });

  it("rejects a tripped honeypot (website filled)", () => {
    const r = gotowePismoCheckoutSchema.safeParse({ ...baseCustomer, slug: "x", website: "spam" });
    expect(r.success).toBe(false);
  });

  it("requires terms acceptance", () => {
    const r = gotowePismoCheckoutSchema.safeParse({ ...baseCustomer, termsAccepted: false, slug: "x" });
    expect(r.success).toBe(false);
  });

  it("requires consumer waiver when no invoice requested", () => {
    const r = gotowePismoCheckoutSchema.safeParse({
      ...baseCustomer,
      consumerWaiverAccepted: false,
      slug: "x",
    });
    expect(r.success).toBe(false);
  });

  it("requires a valid NIP when an invoice is requested", () => {
    const bad = gotowePismoCheckoutSchema.safeParse({
      ...baseCustomer,
      slug: "x",
      invoiceRequested: true,
      invoiceName: "ACME sp. z o.o.",
      invoiceTaxId: "0000000001",
      invoiceStreet: "Główna 1",
      invoiceCity: "Warszawa",
      invoicePostalCode: "00-001",
      invoiceProvince: "mazowieckie",
    });
    expect(bad.success).toBe(false);
  });

  it("rejects an invalid email", () => {
    const r = gotowePismoCheckoutSchema.safeParse({ ...baseCustomer, email: "not-an-email", slug: "x" });
    expect(r.success).toBe(false);
  });
});

describe("koszykCheckoutSchema", () => {
  it("requires at least one item", () => {
    const r = koszykCheckoutSchema.safeParse({ ...baseCustomer, items: [] });
    expect(r.success).toBe(false);
  });

  it("accepts a valid cart", () => {
    const r = koszykCheckoutSchema.safeParse({ ...baseCustomer, items: [{ slug: "strona-start" }] });
    expect(r.success).toBe(true);
  });

  it("caps the cart at 10 items", () => {
    const items = Array.from({ length: 11 }, (_, i) => ({ slug: `pkg-${i}` }));
    const r = koszykCheckoutSchema.safeParse({ ...baseCustomer, items });
    expect(r.success).toBe(false);
  });
});
