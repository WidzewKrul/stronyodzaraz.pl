"use client";

import Link from "next/link";
import { VOIVODESHIPS } from "@/lib/address";

export type CheckoutCustomerData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  invoiceRequested: boolean;
  invoiceName: string;
  invoiceTaxId: string;
  invoiceStreet: string;
  invoiceCity: string;
  invoicePostalCode: string;
  invoiceProvince: string;
  termsAccepted: boolean;
  consumerWaiverAccepted: boolean;
  portfolioConsent: boolean;
  marketingConsent: boolean;
  website: string;
};

type Props = {
  data: CheckoutCustomerData;
  onChange: (patch: Partial<CheckoutCustomerData>) => void;
};

export default function CheckoutCustomerForm({ data, onChange }: Props) {
  const isConsumer = !data.invoiceRequested;

  return (
    <div className="space-y-8">
      <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        <h2 className="text-base font-bold text-slate-900">Twoje dane</h2>
        <p className="mt-1 text-sm text-slate-500">
          Dane kontaktowe do realizacji usługi, wysyłki briefu i kontaktu w sprawie zamówienia.
        </p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="checkout-firstName" className="mb-1 block text-xs font-semibold text-slate-700">
              Imię <span className="text-red-500">*</span>
            </label>
            <input
              id="checkout-firstName"
              type="text"
              value={data.firstName}
              onChange={(e) => onChange({ firstName: e.target.value })}
              required
              autoComplete="given-name"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>
          <div>
            <label htmlFor="checkout-lastName" className="mb-1 block text-xs font-semibold text-slate-700">
              Nazwisko <span className="text-red-500">*</span>
            </label>
            <input
              id="checkout-lastName"
              type="text"
              value={data.lastName}
              onChange={(e) => onChange({ lastName: e.target.value })}
              required
              autoComplete="family-name"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="checkout-email" className="mb-1 block text-xs font-semibold text-slate-700">
              E-mail <span className="text-red-500">*</span>
            </label>
            <input
              id="checkout-email"
              type="email"
              value={data.email}
              onChange={(e) => onChange({ email: e.target.value })}
              required
              autoComplete="email"
              placeholder="twoj@email.pl"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>
          <div className="sm:col-span-2">
            <label htmlFor="checkout-phone" className="mb-1 block text-xs font-semibold text-slate-700">
              Telefon <span className="font-normal text-slate-400">(opcjonalnie)</span>
            </label>
            <input
              id="checkout-phone"
              type="tel"
              value={data.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              autoComplete="tel"
              placeholder="np. 500 123 456"
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          </div>
        </div>
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={data.invoiceRequested}
            onChange={(e) =>
              onChange({
                invoiceRequested: e.target.checked,
                ...(e.target.checked ? {} : { consumerWaiverAccepted: false }),
              })
            }
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
          />
          <span>
            <span className="text-sm font-semibold text-slate-900">Potrzebuję faktury VAT</span>
            <span className="mt-0.5 block text-xs text-slate-500">
              Faktura zostanie wystawiona po opłaceniu zamówienia. Podaj NIP i dane firmy.
            </span>
          </span>
        </label>

        {data.invoiceRequested && (
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="checkout-invoiceName" className="mb-1 block text-xs font-semibold text-slate-700">
                Nazwa firmy <span className="text-red-500">*</span>
              </label>
              <input
                id="checkout-invoiceName"
                type="text"
                value={data.invoiceName}
                onChange={(e) => onChange({ invoiceName: e.target.value })}
                required={data.invoiceRequested}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              />
            </div>
            <div>
              <label htmlFor="checkout-invoiceTaxId" className="mb-1 block text-xs font-semibold text-slate-700">
                NIP <span className="text-red-500">*</span>
              </label>
              <input
                id="checkout-invoiceTaxId"
                type="text"
                value={data.invoiceTaxId}
                onChange={(e) => onChange({ invoiceTaxId: e.target.value })}
                required={data.invoiceRequested}
                placeholder="000-000-00-00"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              />
            </div>
            <div>
              <label htmlFor="checkout-invoicePostalCode" className="mb-1 block text-xs font-semibold text-slate-700">
                Kod pocztowy <span className="text-red-500">*</span>
              </label>
              <input
                id="checkout-invoicePostalCode"
                type="text"
                value={data.invoicePostalCode}
                onChange={(e) => onChange({ invoicePostalCode: e.target.value })}
                required={data.invoiceRequested}
                placeholder="00-000"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="checkout-invoiceStreet" className="mb-1 block text-xs font-semibold text-slate-700">
                Ulica <span className="text-red-500">*</span>
              </label>
              <input
                id="checkout-invoiceStreet"
                type="text"
                value={data.invoiceStreet}
                onChange={(e) => onChange({ invoiceStreet: e.target.value })}
                required={data.invoiceRequested}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              />
            </div>
            <div>
              <label htmlFor="checkout-invoiceCity" className="mb-1 block text-xs font-semibold text-slate-700">
                Miasto <span className="text-red-500">*</span>
              </label>
              <input
                id="checkout-invoiceCity"
                type="text"
                value={data.invoiceCity}
                onChange={(e) => onChange({ invoiceCity: e.target.value })}
                required={data.invoiceRequested}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              />
            </div>
            <div>
              <label htmlFor="checkout-invoiceProvince" className="mb-1 block text-xs font-semibold text-slate-700">
                Województwo <span className="text-red-500">*</span>
              </label>
              <select
                id="checkout-invoiceProvince"
                value={data.invoiceProvince}
                onChange={(e) => onChange({ invoiceProvince: e.target.value })}
                required={data.invoiceRequested}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
              >
                <option value="">— wybierz —</option>
                {VOIVODESHIPS.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={data.termsAccepted}
            onChange={(e) => onChange({ termsAccepted: e.target.checked })}
            required
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
          />
          <span className="text-sm text-slate-700">
            Akceptuję{" "}
            <Link href="/regulamin" className="font-medium text-brand-700 underline hover:text-brand-800" target="_blank">
              Regulamin usług stronyodzaraz.pl
            </Link>{" "}
            i{" "}
            <Link
              href="/polityka-prywatnosci"
              className="font-medium text-brand-700 underline hover:text-brand-800"
              target="_blank"
            >
              Politykę prywatności
            </Link>
            <span className="text-red-500"> *</span>
          </span>
        </label>

        {isConsumer && (
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={data.consumerWaiverAccepted}
              onChange={(e) => onChange({ consumerWaiverAccepted: e.target.checked })}
              required
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            <span className="text-sm text-slate-700">
              Wyrażam zgodę na rozpoczęcie realizacji usługi cyfrowej przed upływem 14 dni od zawarcia umowy i
              przyjmuję do wiadomości, że tracę prawo odstąpienia od umowy po pełnym rozpoczęciu realizacji.
              <span className="text-red-500"> *</span>
            </span>
          </label>
        )}

        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={data.portfolioConsent}
            onChange={(e) => onChange({ portfolioConsent: e.target.checked })}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
          />
          <span className="text-sm text-slate-700">
            Wyrażam zgodę na umieszczenie projektu (mock / z logo) w portfolio stronyodzaraz.pl.
          </span>
        </label>

        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={data.marketingConsent}
            onChange={(e) => onChange({ marketingConsent: e.target.checked })}
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
          />
          <span className="text-sm text-slate-700">
            Chcę otrzymywać informacje o promocjach i nowych pakietach (max 2×/mc).
          </span>
        </label>
      </section>

      <input
        type="text"
        name="website"
        value={data.website}
        onChange={(e) => onChange({ website: e.target.value })}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden
        className="hidden"
      />
    </div>
  );
}
