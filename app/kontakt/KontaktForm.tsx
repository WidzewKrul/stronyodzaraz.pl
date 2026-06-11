"use client";

import { useState } from "react";
import Link from "next/link";
import { contactEmail } from "@/lib/env";

const email = contactEmail();

export default function KontaktForm() {
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/kontakt", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: fd.get("name"),
          email: fd.get("email"),
          phone: fd.get("phone") || undefined,
          projectType: fd.get("projectType") || undefined,
          budget: fd.get("budget") || undefined,
          message: fd.get("message"),
        }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Błąd wysyłki");
      }
      setStatus("ok");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Nie udało się wysłać");
    }
  }

  return (
    <>
      <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">Napisz do nas</h2>
      <p className="mt-3 text-slate-600">
        Masz pytanie o pakiet, custom projekt lub status zamówienia? Napisz — odpowiadamy w ciągu 24h roboczych.
        Szybciej? <Link href="/uslugi" className="font-medium text-brand-700 hover:underline">Zamów pakiet online</Link> z jasną ceną.
      </p>

      {status === "ok" ? (
        <div role="status" aria-live="polite" className="mt-8 rounded-xl border border-emerald-200 bg-emerald-50 p-6 text-emerald-900">
          <p className="font-semibold">Wiadomość wysłana!</p>
          <p className="mt-2 text-sm">Potwierdzenie trafi też na Twój e-mail. Odpowiemy w ciągu 24h roboczych.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Imię i nazwisko *
              <input name="name" required className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              E-mail *
              <input name="email" type="email" required className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            </label>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              Telefon
              <input name="phone" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              Typ projektu
              <select name="projectType" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
                <option value="">Wybierz...</option>
                <option>Strona internetowa</option>
                <option>Sklep internetowy</option>
                <option>WordPress / opieka</option>
                <option>Reklama Google/Meta</option>
                <option>Inne</option>
              </select>
            </label>
          </div>
          <label className="block text-sm font-medium text-slate-700">
            Budżet (orientacyjny)
            <select name="budget" className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
              <option value="">Nie wiem / do ustalenia</option>
              <option>do 3 000 zł</option>
              <option>3 000 – 7 000 zł</option>
              <option>7 000 – 15 000 zł</option>
              <option>powyżej 15 000 zł</option>
            </select>
          </label>
          <label className="block text-sm font-medium text-slate-700">
            Wiadomość *
            <textarea name="message" required rows={5} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" placeholder="Opisz projekt, branżę, deadline..." />
          </label>
          {status === "error" && <p role="alert" className="text-sm text-red-600">{errorMsg}</p>}
          <button
            type="submit"
            disabled={status === "loading"}
            className="rounded-lg bg-brand-700 px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-800 disabled:opacity-60"
          >
            {status === "loading" ? "Wysyłanie..." : "Wyślij wiadomość"}
          </button>
        </form>
      )}

      <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-6">
        <p className="text-sm font-medium uppercase tracking-wider text-slate-500">E-mail bezpośredni</p>
        <p className="mt-2 text-xl font-bold">
          <a href={`mailto:${email}`} className="text-brand-700 hover:text-brand-900">{email}</a>
        </p>
      </div>
    </>
  );
}
