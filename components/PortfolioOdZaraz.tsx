import Link from "next/link";
import { ExternalLink, Globe } from "lucide-react";

const SITES = [
  {
    name: "haccpnajuz.pl",
    desc: "Dokumentacja HACCP dla gastronomii",
    href: "https://haccpnajuz.pl",
    tag: "Gastronomia",
    tagColor: "bg-emerald-100 text-emerald-800",
    dotColor: "bg-emerald-500",
  },
  {
    name: "bhpodzaraz.pl",
    desc: "BHP i PPOŻ dla firm",
    href: "https://bhpodzaraz.pl",
    tag: "Bezpieczeństwo",
    tagColor: "bg-amber-100 text-amber-800",
    dotColor: "bg-amber-500",
  },
  {
    name: "gotowyregulamin.pl",
    desc: "Regulaminy sklepu i RODO",
    href: "https://gotowyregulamin.pl",
    tag: "Prawo",
    tagColor: "bg-sky-100 text-sky-800",
    dotColor: "bg-sky-500",
  },
  {
    name: "stronyodzaraz.pl",
    desc: "Strony i sklepy internetowe",
    href: "/",
    tag: "Web",
    tagColor: "bg-brand-100 text-brand-800",
    dotColor: "bg-brand-500",
    internal: true,
  },
] as const;

type Props = { className?: string };

export default function PortfolioOdZaraz({ className = "" }: Props) {
  return (
    <section className={`py-14 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 ring-1 ring-brand-200/60">
            <Globe className="h-3.5 w-3.5" />
            Ekosystem *odzaraz
          </span>
          <h2 className="mt-3 text-2xl font-bold text-slate-900">Część ekosystemu usług dla firm w Polsce</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-slate-500">
            Rodzina serwisów, które pomagają polskim firmom prowadzić działalność online — od dokumentacji po strony i sklepy.
          </p>
        </div>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SITES.map((site) => (
            <div
              key={site.name}
              className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-200 hover:shadow-md"
            >
              <div className="flex items-start justify-between gap-2">
                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${site.tagColor}`}>
                  {site.tag}
                </span>
                <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${site.dotColor} ring-2 ring-white shadow-sm`} aria-hidden />
              </div>
              <p className="mt-3 font-bold text-slate-900">{site.name}</p>
              <p className="mt-1 text-sm text-slate-500">{site.desc}</p>
              {"internal" in site && site.internal ? (
                <Link href={site.href} className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 transition group-hover:text-brand-700">
                  Jesteś tutaj <span aria-hidden>✓</span>
                </Link>
              ) : (
                <a
                  href={site.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 transition group-hover:text-brand-700"
                >
                  Odwiedź <ExternalLink className="h-3 w-3 transition group-hover:translate-x-0.5" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
