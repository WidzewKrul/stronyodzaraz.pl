import Link from "next/link";
import { Lock } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-20 border-t border-slate-200 bg-slate-900 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2.5">
            <BrandLogo variant="mark" href="/" />
            <span className="text-base font-bold text-white">stronyodzaraz.pl</span>
          </div>
          <p className="mt-4 max-w-md text-sm leading-6 text-slate-400">
            Polska agencja web B2B. Strony WordPress, sklepy WooCommerce, Shopify i Shoper —
            productized packages z jasną ceną i realizacją 7–14 dni.
          </p>
          <p className="mt-4 inline-flex items-center gap-1.5 text-xs text-slate-500">
            <Lock className="h-3.5 w-3.5" aria-hidden />
            Połączenie szyfrowane SSL · Płatności Stripe
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Usługi</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/uslugi" className="hover:text-white">Wszystkie pakiety</Link></li>
            <li><Link href="/uslugi/strony-internetowe" className="hover:text-white">Strony internetowe</Link></li>
            <li><Link href="/uslugi/sklepy-internetowe" className="hover:text-white">Sklepy internetowe</Link></li>
            <li><Link href="/uslugi/opieka-techniczna" className="hover:text-white">Opieka techniczna</Link></li>
            <li><Link href="/wykonane" className="hover:text-white">Wykonane</Link></li>
            <li><Link href="/demo" className="hover:text-white">Demo</Link></li>
            <li><Link href="/technologia" className="hover:text-white">Technologia</Link></li>
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Informacje</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link href="/o-nas" className="hover:text-white">O nas</Link></li>
            <li><Link href="/wykonane" className="hover:text-white">Wykonane</Link></li>
            <li><Link href="/demo" className="hover:text-white">Demo</Link></li>
            <li><Link href="/technologia" className="hover:text-white">Technologia</Link></li>
            <li><Link href="/kontakt" className="hover:text-white">Kontakt</Link></li>
            <li><Link href="/regulamin" className="hover:text-white">Regulamin</Link></li>
            <li><Link href="/polityka-prywatnosci" className="hover:text-white">Polityka prywatności</Link></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800">
        <div className="mx-auto flex max-w-7xl items-center justify-center px-4 py-5 sm:px-6">
          <p className="text-xs text-slate-500">© {year} stronyodzaraz.pl</p>
        </div>
      </div>
    </footer>
  );
}
