import Link from "next/link";
import { Lock, Mail } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { getTierACities } from "@/lib/seo/local";

export default function Footer() {
  const year = new Date().getFullYear();
  const cities = getTierACities();
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-4">
        {/* Brand column */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <BrandLogo variant="mark" href="/" />
            <span className="text-base font-bold text-white">stronyodzaraz.pl</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
            Polska agencja web B2B. Strony WordPress, sklepy WooCommerce, Shopify i Shoper —
            productized packages z jasną ceną i realizacją 7–14 dni.
          </p>
          {/* Social links */}
          <div className="mt-5 flex items-center gap-2">
            <a
              href="https://www.facebook.com/stronyodzaraz"
              aria-label="Facebook"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-slate-400 transition hover:border-brand-500 hover:bg-brand-900/40 hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/stronyodzaraz"
              aria-label="LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-slate-400 transition hover:border-brand-500 hover:bg-brand-900/40 hover:text-white"
            >
              <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <Link
              href="/kontakt"
              aria-label="Kontakt e-mail"
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-700 bg-slate-800 text-slate-400 transition hover:border-brand-500 hover:bg-brand-900/40 hover:text-white"
            >
              <Mail className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-5 inline-flex items-center gap-1.5 text-xs text-slate-500">
            <Lock className="h-3.5 w-3.5" aria-hidden />
            Połączenie szyfrowane SSL · Płatności Stripe
          </p>
        </div>

        {/* Services */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Usługi</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/uslugi" className="text-slate-400 transition hover:text-white">Wszystkie pakiety</Link></li>
            <li><Link href="/uslugi/strony-internetowe" className="text-slate-400 transition hover:text-white">Strony internetowe</Link></li>
            <li><Link href="/uslugi/sklepy-internetowe" className="text-slate-400 transition hover:text-white">Sklepy internetowe</Link></li>
            <li><Link href="/uslugi/opieka-techniczna" className="text-slate-400 transition hover:text-white">Opieka techniczna</Link></li>
            <li><Link href="/wykonane" className="text-slate-400 transition hover:text-white">Wykonane</Link></li>
            <li><Link href="/demo" className="text-slate-400 transition hover:text-white">Demo</Link></li>
            <li><Link href="/technologia" className="text-slate-400 transition hover:text-white">Technologia</Link></li>
            <li><Link href="/blog" className="text-slate-400 transition hover:text-white">Blog</Link></li>
          </ul>
        </div>

        {/* Info */}
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Informacje</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/o-nas" className="text-slate-400 transition hover:text-white">O nas</Link></li>
            <li><Link href="/kontakt" className="text-slate-400 transition hover:text-white">Kontakt</Link></li>
            <li><Link href="/regulamin" className="text-slate-400 transition hover:text-white">Regulamin</Link></li>
            <li><Link href="/polityka-prywatnosci" className="text-slate-400 transition hover:text-white">Polityka prywatności</Link></li>
          </ul>
          {/* CTA */}
          <div className="mt-6 rounded-xl border border-brand-800/50 bg-brand-900/30 p-4">
            <p className="text-xs font-semibold text-brand-300">Masz pytania?</p>
            <p className="mt-1 text-xs text-slate-500">Napisz do nas — odpiszemy w 24h.</p>
            <Link href="/kontakt" className="mt-3 inline-flex rounded-lg bg-accent-500 px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-accent-600">
              Napisz do nas →
            </Link>
          </div>
        </div>
      </div>

      {cities.length > 0 && (
        <div className="border-t border-slate-800/60">
          <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Obsługujemy firmy w miastach</p>
            <ul className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {cities.map((c) => (
                <li key={c.slug}>
                  <Link href={`/l/${c.slug}`} className="text-slate-400 transition hover:text-white">
                    Strony i sklepy {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      <div className="border-t border-slate-800/60">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-5 sm:px-6">
          <p className="text-xs text-slate-400">© {year} stronyodzaraz.pl — Wszelkie prawa zastrzeżone</p>
          <p className="text-xs text-slate-400">NIP / KRS · Polska agencja web B2B</p>
        </div>
      </div>
    </footer>
  );
}
