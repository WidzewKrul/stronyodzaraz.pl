"use client";

import { useState } from "react";
import { Check } from "lucide-react";

type TabId = "opis" | "zawiera" | "jak" | "dostawa" | "dla-kogo" | "faq";

const TABS: { id: TabId; label: string }[] = [
  { id: "opis", label: "Opis" },
  { id: "zawiera", label: "Co zawiera" },
  { id: "jak", label: "Jak to działa" },
  { id: "dostawa", label: "Dostawa" },
  { id: "dla-kogo", label: "Dla kogo" },
  { id: "faq", label: "FAQ" },
];

type Props = {
  title: string;
  longDesc: string;
  tagline?: string;
  whatYouGet: string[];
  forWhom: string[];
  process: { title: string; body: string }[];
  faq: { q: string; a: string }[];
  delivery?: { title: string; body: string }[];
  checkColor: string;
  badgeClass: string;
  badgeTextClass: string;
  iconBgClass: string;
};

function renderLongDescBlocks(longDesc: string) {
  return longDesc.split("\n\n").filter(Boolean).map((block, i) => {
    if (block.startsWith("## ")) {
      return (
        <h2 key={i} className="mt-8 first:mt-0 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          {block.slice(3)}
        </h2>
      );
    }
    if (block.startsWith("### ")) {
      return (
        <h3 key={i} className="mt-6 text-lg font-semibold text-slate-900">
          {block.slice(4)}
        </h3>
      );
    }
    return (
      <p key={i} className="leading-7 text-slate-600">
        {block}
      </p>
    );
  });
}

export default function ProductTabs({
  title,
  longDesc,
  tagline,
  whatYouGet,
  forWhom,
  process,
  faq,
  delivery,
  checkColor,
  badgeClass,
  badgeTextClass,
  iconBgClass,
}: Props) {
  const availableTabs = TABS.filter((t) => {
    if (t.id === "dla-kogo") return forWhom.length > 0;
    if (t.id === "faq") return faq.length > 0;
    return true;
  });

  const [active, setActive] = useState<TabId>(availableTabs[0]?.id ?? "opis");

  return (
    <section className="border-t border-slate-200 bg-white" aria-label={`Szczegóły dokumentu: ${title}`}>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div
          className="sticky top-16 z-20 -mx-4 mb-0 flex gap-1 overflow-x-auto border-b border-slate-200 bg-white/95 px-4 pb-px backdrop-blur-sm sm:static sm:mx-0 sm:bg-transparent sm:backdrop-blur-none"
          role="tablist"
          aria-label="Zakładki dokumentu"
        >
          {availableTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              id={`tab-${tab.id}`}
              aria-controls={`panel-${tab.id}`}
              aria-selected={active === tab.id}
              onClick={() => setActive(tab.id)}
              className={`shrink-0 rounded-t-xl px-4 py-3 text-sm font-medium transition ${
                active === tab.id
                  ? "-mb-px border border-b-white border-slate-200 bg-white text-brand-800 shadow-sm"
                  : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div
          id={`panel-${active}`}
          role="tabpanel"
          aria-labelledby={`tab-${active}`}
          className="rounded-b-2xl border border-t-0 border-slate-200 bg-white p-6 sm:p-10"
        >
          {active === "opis" && (
            <div className="prose prose-slate max-w-none space-y-5">
              {tagline ? <p className="text-base font-medium text-slate-800">{tagline}</p> : null}
              {renderLongDescBlocks(longDesc)}
            </div>
          )}

          {active === "zawiera" && (
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Co zawiera pakiet „{title}"</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Jasny, stały zakres — bez ukrytych dopłat. Poniżej dokładnie to, co dostajesz w ramach pakietu
                i czym zajmujemy się po Twojej stronie.
              </p>
              <ul className="mt-8 grid gap-4 sm:grid-cols-2">
                {whatYouGet.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50 p-4 transition hover:border-slate-200 hover:bg-white">
                    <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${badgeClass} ${badgeTextClass}`}>
                      {i + 1}
                    </span>
                    <span className="text-sm leading-6 text-slate-700">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {active === "jak" && (
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Jak zamówić „{title}"</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Formularz po polsku, pliki na e-mail — całość zajmuje ok. 5–10 minut.
              </p>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {process.map((step, i) => (
                  <div key={i} className="flex gap-4 rounded-xl border border-slate-100 bg-slate-50/50 p-5">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white ${iconBgClass}`}>
                      {i + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{step.title}</h3>
                      <p className="mt-2 text-sm leading-6 text-slate-600">{step.body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {active === "dostawa" && (
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Realizacja i przekazanie — „{title}"</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Po opłacie dostajesz brief online, a my realizujemy pakiet zdalnie. Gotowy projekt przekazujemy wraz z dostępami,
                instrukcją i wsparciem we wdrożeniu.
              </p>
              <ul className="mt-8 space-y-4 text-sm text-slate-700">
                {(delivery ?? []).map((item) => (
                  <li key={item.title} className="flex gap-3 rounded-xl border border-slate-100 bg-slate-50 p-5">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${checkColor}`} aria-hidden />
                    <div>
                      <p className="font-semibold text-slate-900">{item.title}</p>
                      <p className="mt-1.5 leading-6 text-slate-600">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {active === "dla-kogo" && (
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Dla kogo jest ten pakiet?</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                Dla firm i przedsiębiorców, którzy potrzebują profesjonalnej strony lub sklepu szybko, w stałej cenie
                i bez tygodni wycen — z gotowym wdrożeniem online.
              </p>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {forWhom.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 rounded-lg border border-slate-100 bg-slate-50/50 px-4 py-3 text-sm leading-6 text-slate-700">
                    <Check className={`mt-0.5 h-4 w-4 shrink-0 ${checkColor}`} aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {active === "faq" && (
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Najczęstsze pytania</h2>
              <p className="mt-3 text-sm text-slate-600">
                Koszt, termin dostawy, zgodność z przepisami i to, co dostajesz po zamówieniu.
              </p>
              <div className="mt-8 space-y-3">
                {faq.map((item) => (
                  <details key={item.q} className="faq-item group rounded-xl border border-slate-200 bg-slate-50/50 open:border-brand-200 open:bg-white open:shadow-sm">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold text-slate-900 [&::-webkit-details-marker]:hidden">
                      {item.q}
                      <svg
                        className="h-4 w-4 shrink-0 text-slate-400 transition group-open:rotate-180"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        aria-hidden
                      >
                        <path d="m6 9 6 6 6-6" />
                      </svg>
                    </summary>
                    <div className="border-t border-slate-100 px-5 pb-4 pt-3 text-sm leading-7 text-slate-600">
                      {item.a}
                    </div>
                  </details>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
