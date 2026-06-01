"use client";

import { useEffect, useState } from "react";
import { CONSENT_KEY, type Consent } from "@/lib/analytics";

export default function ConsentBanner() {
  const [consent, setConsent] = useState<Consent>("unknown");

  useEffect(() => {
    try {
      const stored = localStorage.getItem(CONSENT_KEY) as Consent | null;
      if (stored === "accepted" || stored === "rejected") setConsent(stored);
    } catch { }
  }, []);

  if (consent !== "unknown") return null;

  const set = (v: Consent) => {
    try {
      localStorage.setItem(CONSENT_KEY, v);
    } catch { }
    setConsent(v);
    if (v === "accepted") window.dispatchEvent(new Event("consent-accepted"));
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-4" role="region" aria-label="Zgoda na pliki cookies">
      <div className="mx-auto flex max-w-4xl flex-col items-stretch gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-lg md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-slate-700">
          Używamy plików cookies, żeby poprawiać jakość strony. Akceptując zgadzasz się na statystyki i reklamy. Szczegóły w{" "}
          <a href="/polityka-prywatnosci" className="text-brand-700 underline">polityce prywatności</a>.
        </p>
        <div className="flex w-full flex-col gap-2 sm:flex-row md:w-auto md:shrink-0">
          <button type="button" onClick={() => set("rejected")} className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
            Tylko niezbędne
          </button>
          <button type="button" onClick={() => set("accepted")} className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">
            Akceptuję
          </button>
        </div>
      </div>
    </div>
  );
}
