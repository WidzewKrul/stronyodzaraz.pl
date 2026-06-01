import Link from "next/link";
import { ExternalLink } from "lucide-react";

const SITES = [
  {
    name: "haccpnajuz.pl",
    desc: "Dokumentacja sanitarna dla gastronomii",
    href: "https://haccpnajuz.pl",
  },
  {
    name: "bhpodzaraz.pl",
    desc: "BHP i PPOŻ dla firm",
    href: "https://bhpodzaraz.pl",
  },
  {
    name: "gotowyregulamin.pl",
    desc: "Regulaminy sklepu i RODO",
    href: "https://gotowyregulamin.pl",
  },
  {
    name: "stronyodzaraz.pl",
    desc: "Strony i sklepy internetowe (tu jesteś)",
    href: "/",
    internal: true,
  },
] as const;

type Props = { className?: string };

export default function PortfolioOdZaraz({ className = "" }: Props) {
  return (
    <section className={`py-14 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-slate-900">Część ekosystemu usług dla firm w Polsce</h2>
        <p className="mx-auto mt-2 max-w-xl text-center text-sm text-slate-600">
          Rodzina serwisów *odzaraz* — od dokumentacji po strony i sklepy online.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SITES.map((site) => (
            <div key={site.name} className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <p className="font-bold text-slate-900">{site.name}</p>
              <p className="mt-2 text-sm text-slate-600">{site.desc}</p>
              {"internal" in site && site.internal ? (
                <Link href={site.href} className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-700">
                  Strona główna
                </Link>
              ) : (
                <a
                  href={site.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-700"
                >
                  Odwiedź <ExternalLink className="h-3 w-3" aria-hidden />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
