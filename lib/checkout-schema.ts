import { z } from "zod";
import { VOIVODESHIPS, POSTAL_CODE_REGEX } from "./address";

export const TERMS_VERSION = "1.0-2026-05-31";

const POLISH_PHONE_REGEX = /^(\+48|48)?[\s-]?(\d{3}[\s-]?\d{3}[\s-]?\d{3}|\d{2}[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2})$/;

export function validateNip(nip: string): boolean {
  const digits = nip.replace(/\D/g, "");
  if (digits.length !== 10) return false;
  const weights = [6, 5, 7, 2, 3, 4, 5, 6, 7];
  let sum = 0;
  for (let i = 0; i < 9; i++) sum += parseInt(digits[i]!, 10) * weights[i]!;
  const check = sum % 11;
  if (check === 10) return false;
  return check === parseInt(digits[9]!, 10);
}

function refineInvoice(data: {
  invoiceRequested: boolean;
  invoiceName?: string;
  invoiceTaxId?: string;
  invoiceStreet?: string;
  invoiceCity?: string;
  invoicePostalCode?: string;
  invoiceProvince?: string;
}, ctx: z.RefinementCtx) {
  if (!data.invoiceRequested) return;

  if (!data.invoiceName?.trim()) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Podaj nazwę firmy.", path: ["invoiceName"] });
  }
  if (!data.invoiceTaxId?.trim()) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Podaj NIP.", path: ["invoiceTaxId"] });
  } else if (!validateNip(data.invoiceTaxId)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Nieprawidłowy NIP.", path: ["invoiceTaxId"] });
  }
  if (!data.invoiceStreet?.trim()) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Podaj ulicę.", path: ["invoiceStreet"] });
  }
  if (!data.invoiceCity?.trim()) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Podaj miasto.", path: ["invoiceCity"] });
  }
  if (!data.invoicePostalCode?.trim() || !POSTAL_CODE_REGEX.test(data.invoicePostalCode.trim())) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Kod pocztowy w formacie XX-XXX.", path: ["invoicePostalCode"] });
  }
  if (!data.invoiceProvince || !(VOIVODESHIPS as readonly string[]).includes(data.invoiceProvince)) {
    ctx.addIssue({ code: z.ZodIssueCode.custom, message: "Wybierz województwo.", path: ["invoiceProvince"] });
  }
}

function refineConsumerWaiver(
  data: { invoiceRequested: boolean; consumerWaiverAccepted?: boolean },
  ctx: z.RefinementCtx
) {
  if (!data.invoiceRequested && !data.consumerWaiverAccepted) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Zaakceptuj zgodę na rozpoczęcie realizacji przed upływem 14 dni.",
      path: ["consumerWaiverAccepted"],
    });
  }
}

const checkoutCustomerBase = z.object({
  email: z.string().trim().email().max(180),
  firstName: z.string().trim().min(1, "Imię jest wymagane.").max(100),
  lastName: z.string().trim().min(1, "Nazwisko jest wymagane.").max(100),
  phone: z
    .string()
    .trim()
    .max(30)
    .optional()
    .transform((v) => (v === "" ? undefined : v))
    .refine((v) => v === undefined || POLISH_PHONE_REGEX.test(v), "Nieprawidłowy numer telefonu."),
  invoiceRequested: z.boolean().default(false),
  invoiceName: z.string().trim().max(200).optional(),
  invoiceTaxId: z.string().trim().max(20).optional(),
  invoiceStreet: z.string().trim().max(200).optional(),
  invoiceCity: z.string().trim().max(100).optional(),
  invoicePostalCode: z.string().trim().max(10).optional(),
  invoiceProvince: z.string().trim().max(50).optional(),
  termsAccepted: z.literal(true, { errorMap: () => ({ message: "Zaakceptuj regulamin." }) }),
  consumerWaiverAccepted: z.boolean().default(false),
  portfolioConsent: z.boolean().default(true),
  marketingConsent: z.boolean().default(false),
  website: z
    .string()
    .optional()
    .transform((v) => v ?? "")
    .refine((v) => v.length === 0, "Bot detected."),
  promotionCode: z.string().trim().max(64).optional(),
});

export const koszykCheckoutSchema = checkoutCustomerBase
  .extend({
    items: z
      .array(
        z.object({
          slug: z.string().min(1).max(200),
          prefillData: z.record(z.string().trim().max(2000)).optional(),
        })
      )
      .min(1)
      .max(10),
  })
  .superRefine(refineInvoice)
  .superRefine(refineConsumerWaiver);

export const gotowePismoCheckoutSchema = checkoutCustomerBase
  .extend({
    slug: z.string().min(1).max(200),
    prefillData: z.record(z.string().trim().max(2000)).optional(),
  })
  .superRefine(refineInvoice)
  .superRefine(refineConsumerWaiver);

export type KoszykCheckoutInput = z.infer<typeof koszykCheckoutSchema>;
export type UslugaCheckoutInput = z.infer<typeof gotowePismoCheckoutSchema>;

export function normalizeInvoiceTaxId(nip: string): string {
  return nip.replace(/\D/g, "");
}
