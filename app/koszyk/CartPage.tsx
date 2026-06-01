"use client";

import { useCart } from "@/components/CartProvider";
import CheckoutCustomerForm, { type CheckoutCustomerData } from "@/components/CheckoutCustomerForm";
import { getCategoryConfig, type FormField } from "@/lib/uslugi-config";
import Link from "next/link";
import { Trash2, ShoppingCart } from "lucide-react";
import { useEffect, useState } from "react";

function formatPrice(grosze: number): string {
  return (grosze / 100).toFixed(2).replace(".", ",") + " zł";
}

function ItemFields({
  slug,
  fields,
  values,
  onChange,
}: {
  slug: string;
  fields: FormField[];
  values: Record<string, string>;
  onChange: (name: string, value: string) => void;
}) {
  if (fields.length === 0) return null;
  return (
    <div className="mt-4 space-y-3 border-t border-slate-100 pt-4">
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Dane do briefu</p>
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={`${slug}-${field.name}`} className="mb-1 block text-xs font-semibold text-slate-700">
            {field.label}{" "}
            {field.required ? (
              <span className="text-red-500">*</span>
            ) : (
              <span className="font-normal text-slate-400">(opcjonalnie)</span>
            )}
          </label>
          {field.type === "textarea" ? (
            <textarea
              id={`${slug}-${field.name}`}
              value={values[field.name] ?? ""}
              onChange={(e) => onChange(field.name, e.target.value)}
              required={field.required}
              rows={3}
              maxLength={field.maxLength}
              placeholder={field.placeholder}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          ) : field.type === "select" && field.options ? (
            <select
              id={`${slug}-${field.name}`}
              value={values[field.name] ?? ""}
              onChange={(e) => onChange(field.name, e.target.value)}
              required={field.required}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            >
              <option value="">— wybierz —</option>
              {field.options.map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
          ) : (
            <input
              id={`${slug}-${field.name}`}
              type={field.type === "email" ? "email" : field.type === "date" ? "date" : "text"}
              value={values[field.name] ?? ""}
              onChange={(e) => onChange(field.name, e.target.value)}
              required={field.required}
              placeholder={field.placeholder}
              className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-brand-400 focus:ring-2 focus:ring-brand-100"
            />
          )}
          {field.help && <p className="mt-1 text-xs text-slate-500">{field.help}</p>}
        </div>
      ))}
    </div>
  );
}

const initialCustomer: CheckoutCustomerData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  invoiceRequested: false,
  invoiceName: "",
  invoiceTaxId: "",
  invoiceStreet: "",
  invoiceCity: "",
  invoicePostalCode: "",
  invoiceProvince: "",
  termsAccepted: false,
  consumerWaiverAccepted: false,
  portfolioConsent: true,
  marketingConsent: false,
  website: "",
};

export default function CartPage() {
  const { items, removeItem, clearCart } = useCart();

  const [customer, setCustomer] = useState<CheckoutCustomerData>(initialCustomer);
  const [prefillData, setPrefillData] = useState<Record<string, Record<string, string>>>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const total = items.reduce((sum, i) => sum + i.priceGrosze, 0);

  function patchCustomer(patch: Partial<CheckoutCustomerData>) {
    setCustomer((prev) => ({ ...prev, ...patch }));
  }

  function setField(slug: string, name: string, value: string) {
    setPrefillData((prev) => ({
      ...prev,
      [slug]: { ...(prev[slug] ?? {}), [name]: value },
    }));
  }

  // Smart prefill: invoiceName → nazwaFirmy when invoice checked
  useEffect(() => {
    if (!customer.invoiceRequested || !customer.invoiceName.trim()) return;
    setPrefillData((prev) => {
      let changed = false;
      const next = { ...prev };
      for (const item of items) {
        const cfg = getCategoryConfig(item.category);
        const hasNazwaFirmy = cfg?.formFields?.some((f) => f.name === "nazwaFirmy");
        if (!hasNazwaFirmy) continue;
        const current = next[item.slug]?.nazwaFirmy ?? "";
        if (!current.trim()) {
          next[item.slug] = { ...(next[item.slug] ?? {}), nazwaFirmy: customer.invoiceName };
          changed = true;
        }
      }
      return changed ? next : prev;
    });
  }, [customer.invoiceRequested, customer.invoiceName, items]);

  async function handleCheckout(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (items.length === 0) return;
    if (!customer.firstName.trim()) { setError("Podaj imię."); return; }
    if (!customer.lastName.trim()) { setError("Podaj nazwisko."); return; }
    if (!customer.email.trim()) { setError("Podaj adres e-mail."); return; }
    if (!customer.termsAccepted) { setError("Zaakceptuj regulamin i politykę prywatności."); return; }
    if (!customer.invoiceRequested && !customer.consumerWaiverAccepted) {
      setError("Zaakceptuj zgodę na rozpoczęcie realizacji przed upływem 14 dni.");
      return;
    }

    if (customer.invoiceRequested) {
      if (!customer.invoiceName.trim()) { setError("Podaj nazwę firmy do faktury."); return; }
      if (!customer.invoiceTaxId.trim()) { setError("Podaj NIP."); return; }
      if (!customer.invoiceStreet.trim()) { setError("Podaj ulicę do faktury."); return; }
      if (!customer.invoiceCity.trim()) { setError("Podaj miasto do faktury."); return; }
      if (!customer.invoicePostalCode.trim()) { setError("Podaj kod pocztowy do faktury."); return; }
      if (!customer.invoiceProvince) { setError("Wybierz województwo do faktury."); return; }
    }

    for (const item of items) {
      const cfg = getCategoryConfig(item.category);
      const fields = cfg?.formFields ?? [];
      for (const f of fields) {
        if (f.required && !prefillData[item.slug]?.[f.name]?.trim()) {
          setError(`Uzupełnij pole „${f.label}" dla pakietu „${item.title}".`);
          return;
        }
      }
    }

    setLoading(true);
    try {
      const res = await fetch("/api/koszyk/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: customer.email.trim(),
          firstName: customer.firstName.trim(),
          lastName: customer.lastName.trim(),
          phone: customer.phone.trim() || undefined,
          invoiceRequested: customer.invoiceRequested,
          invoiceName: customer.invoiceRequested ? customer.invoiceName.trim() : undefined,
          invoiceTaxId: customer.invoiceRequested ? customer.invoiceTaxId.trim() : undefined,
          invoiceStreet: customer.invoiceRequested ? customer.invoiceStreet.trim() : undefined,
          invoiceCity: customer.invoiceRequested ? customer.invoiceCity.trim() : undefined,
          invoicePostalCode: customer.invoiceRequested ? customer.invoicePostalCode.trim() : undefined,
          invoiceProvince: customer.invoiceRequested ? customer.invoiceProvince : undefined,
          termsAccepted: true,
          consumerWaiverAccepted: customer.invoiceRequested ? false : customer.consumerWaiverAccepted,
          portfolioConsent: customer.portfolioConsent,
          marketingConsent: customer.marketingConsent,
          website: customer.website,
          items: items.map((item) => ({
            slug: item.slug,
            prefillData: prefillData[item.slug] ?? {},
          })),
        }),
      });

      const data = await res.json();
      if (!res.ok) { setError(data.error ?? "Wystąpił błąd. Spróbuj ponownie."); return; }
      if (data.url) window.location.href = data.url;
    } catch {
      setError("Błąd połączenia. Sprawdź internet i spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
        <ShoppingCart className="mx-auto h-16 w-16 text-slate-300" aria-hidden />
        <h1 className="mt-4 text-2xl font-bold text-slate-900">Koszyk jest pusty</h1>
        <p className="mt-2 text-slate-600">Dodaj pakiety usług, które chcesz zamówić.</p>
        <Link
          href="/uslugi"
          className="mt-6 inline-flex items-center gap-2 rounded-lg bg-brand-600 px-5 py-2.5 font-semibold text-white hover:bg-brand-700"
        >
          Przeglądaj usługi
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-extrabold text-slate-900">Koszyk</h1>
      <p className="mt-1 text-sm text-slate-500">
        {items.length} {items.length === 1 ? "pakiet" : items.length < 5 ? "pakiety" : "pakietów"}
      </p>

      <form onSubmit={handleCheckout} className="mt-8 grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
        <div className="space-y-8">
          <CheckoutCustomerForm data={customer} onChange={patchCustomer} />

          {/* Section 3: Pakiety w koszyku */}
          <section>
            <h2 className="mb-4 text-base font-bold text-slate-900">Pakiety w koszyku</h2>
            <div className="space-y-4">
              {items.map((item) => {
                const cfg = getCategoryConfig(item.category);
                const fields = cfg?.formFields ?? [];
                return (
                  <div key={item.slug} className="rounded-xl border border-slate-200 bg-white p-5">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <Link
                          href={`/uslugi/${item.category}/${item.slug}`}
                          className="text-sm font-semibold text-slate-900 hover:text-brand-700"
                        >
                          {item.title}
                        </Link>
                        <p className="mt-1 text-sm font-bold text-slate-900">{formatPrice(item.priceGrosze)}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.slug)}
                        className="shrink-0 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-red-600"
                        aria-label={`Usuń ${item.title} z koszyka`}
                      >
                        <Trash2 className="h-4 w-4" aria-hidden />
                      </button>
                    </div>
                    <ItemFields
                      slug={item.slug}
                      fields={fields}
                      values={prefillData[item.slug] ?? {}}
                      onChange={(name, value) => setField(item.slug, name, value)}
                    />
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Section 5: Podsumowanie (sticky) */}
        <div className="space-y-4 lg:sticky lg:top-24">
          <div className="rounded-xl border border-slate-200 bg-white p-5">
            <h2 className="text-base font-bold text-slate-900">Podsumowanie</h2>

            <ul className="mt-4 space-y-2 text-sm text-slate-700">
              {items.map((item) => (
                <li key={item.slug} className="flex justify-between gap-2">
                  <span className="truncate">{item.title}</span>
                  <span className="shrink-0 font-medium">{formatPrice(item.priceGrosze)}</span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex items-baseline justify-between border-t border-slate-100 pt-4">
              <span className="text-sm font-semibold text-slate-700">Razem</span>
              <span className="text-xl font-extrabold text-slate-900">{formatPrice(total)}</span>
            </div>

            {error && (
              <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-4 w-full rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-700 disabled:opacity-60"
            >
              {loading ? "Przekierowanie..." : "Przejdź do bezpiecznej płatności"}
            </button>

            <p className="mt-3 text-center text-xs text-slate-500">
              Płatność obsługiwana przez Stripe. Dane karty nie przechowujemy na naszych serwerach.
            </p>
          </div>

          <button
            type="button"
            onClick={clearCart}
            className="w-full rounded-lg border border-slate-200 px-4 py-2 text-xs font-medium text-slate-500 transition hover:border-red-200 hover:text-red-600"
          >
            Wyczyść koszyk
          </button>
        </div>
      </form>
    </div>
  );
}
