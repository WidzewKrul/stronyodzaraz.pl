import type { Metadata } from "next";
import Link from "next/link";
import { Code2, Globe, Shield, Users, Zap, Building2 } from "lucide-react";
import HeroBanner from "@/components/HeroBanner";
import Breadcrumbs from "@/components/Breadcrumbs";
import PortfolioOdZaraz from "@/components/PortfolioOdZaraz";

export const metadata: Metadata = {
  title: "O nas — polska agencja web B2B",
  description:
    "stronyodzaraz.pl — software house specjalizujący się w stronach WordPress, sklepach WooCommerce, Shopify i Shoper. Productized services, realizacja 7–14 dni.",
  alternates: { canonical: "/o-nas" },
};

const STACK = ["WordPress", "WooCommerce", "Shopify", "Shoper", "Next.js", "Stripe", "Google Analytics 4", "Resend"];
const VALUES = [
  { icon: Zap, title: "Productized services", desc: "Jasna cena, jasny scope — bez tygodni wycen i ukrytych kosztów." },
  { icon: Shield, title: "Gwarancja działania", desc: "30 dni poprawek w scope pakietu. Opieka techniczna w abonamencie." },
  { icon: Globe, title: "Polskie integracje", desc: "Przelewy24, BLIK, PayU, InPost, Allegro, BaseLinker, fakturowanie." },
  { icon: Users, title: "B2B first", desc: "Projekty dla firm — restauracji, sklepów, gabinetów, produkcji, usług lokalnych." },
];

export default function ONasPage() {
  const orgServiceJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "stronyodzaraz.pl",
    description: "Polska agencja web — strony i sklepy internetowe od zera.",
    url: "https://stronyodzaraz.pl/o-nas",
    areaServed: "PL",
    priceRange: "$$",
    knowsAbout: STACK,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgServiceJsonLd) }} />

      <HeroBanner
        variant="category"
        icon={Building2}
        badge="Polska agencja web B2B · od 2024"
        title="O nas — kim jesteśmy i jak pracujemy"
        subtitle="Productized software house specjalizujący się w stronach WordPress, sklepach WooCommerce, Shopify i Shoper. Jasna cena, realizacja 7–14 dni."
        compact
      />

      <Breadcrumbs items={[{ label: "O nas" }]} />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <p className="mt-4 text-lg text-slate-600">
          <strong>stronyodzaraz.pl</strong> to polska agencja web B2B. Stawiamy strony i sklepy internetowe od zera —
          WordPress, WooCommerce, Shopify, Shoper. Nie outsourcing z Indii, nie freelancer z OLX — productized software house
          z jasnymi pakietami i realizacją 7–14 dni.
        </p>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900">Kim jesteśmy</h2>
          <p className="mt-3 text-slate-600 leading-relaxed">
            Budujemy długoterminowy biznes SEO wokół usług web dla polskich firm. Każdy pakiet ma stałą cenę, opisany scope
            i proces zamówienia online. Klient wybiera usługę, płaci Stripe, wypełnia brief — my realizujemy projekt i przekazujemy
            gotową stronę lub sklep z szkoleniem z panelu.
          </p>
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900">Portfolio ekosystemu</h2>
          <p className="mt-3 text-slate-600">
            Zobacz przykładowe układy stron i sklepów — ilustracja scope pakietów przed zakupem.
          </p>
          <Link href="/wykonane" className="mt-4 inline-flex font-semibold text-brand-700 hover:underline">
            Przykładowe układy →
          </Link>
        </section>

        <PortfolioOdZaraz className="mt-8" />

        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900">Stack technologiczny</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {STACK.map((t) => (
              <span key={t} className="rounded-full bg-brand-50 px-3 py-1 text-sm font-medium text-brand-800">{t}</span>
            ))}
          </div>
        </section>

        <section className="mt-12 grid gap-6 sm:grid-cols-2">
          {VALUES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="rounded-xl border border-slate-200 bg-white p-5">
              <Icon className="h-6 w-6 text-brand-600" aria-hidden />
              <h3 className="mt-3 font-semibold text-slate-900">{title}</h3>
              <p className="mt-1 text-sm text-slate-600">{desc}</p>
            </div>
          ))}
        </section>

        <section className="mt-12">
          <h2 className="text-xl font-bold text-slate-900">Proces pracy</h2>
          <ol className="mt-4 space-y-3 text-slate-600">
            <li><strong>1. Discovery</strong> — brief po zakupie, analiza wymagań</li>
            <li><strong>2. Design</strong> — projekt graficzny, 2 rundy poprawek</li>
            <li><strong>3. Development</strong> — wdrożenie WordPress/Shopify/WooCommerce</li>
            <li><strong>4. Testy</strong> — responsywność, formularze, płatności (sklepy)</li>
            <li><strong>5. Launch</strong> — uruchomienie, szkolenie, przekazanie dostępów</li>
            <li><strong>6. Opieka</strong> — opcjonalny abonament techniczny</li>
          </ol>
        </section>

        <div className="relative mt-12 overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-violet-900 to-indigo-950 p-8 text-center text-white shadow-2xl">
          <div className="animate-blob absolute -right-10 -top-10 h-40 w-40 rounded-full bg-violet-500/20 blur-2xl" aria-hidden />
          <Code2 className="relative mx-auto h-10 w-10 text-violet-300" aria-hidden />
          <h2 className="relative mt-4 text-xl font-bold">Gotowy na współpracę?</h2>
          <p className="relative mt-2 text-white/70">Przeglądaj pakiety z ceną online lub napisz do nas.</p>
          <div className="relative mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/uslugi" className="rounded-xl bg-accent-500 px-6 py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-accent-600">
              Katalog usług
            </Link>
            <Link href="/kontakt" className="rounded-xl border border-white/30 px-6 py-2.5 text-sm font-semibold transition hover:bg-white/10">
              Kontakt
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
