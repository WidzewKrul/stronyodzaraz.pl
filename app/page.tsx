import Link from "next/link";
import type { Metadata } from "next";
import { Search, ClipboardList, Rocket, Shield, Clock, Zap } from "lucide-react";
import TrustBar from "@/components/TrustBar";
import HeroBanner from "@/components/HeroBanner";
import PlatformBadges from "@/components/PlatformBadges";
import DemoShowcase from "@/components/DemoShowcase";
import ProductizedCompare from "@/components/ProductizedCompare";
import CompareStartPro from "@/components/CompareStartPro";
import FeaturedProducts from "@/components/FeaturedProducts";
import BlogTeaser from "@/components/BlogTeaser";
import PortfolioOdZaraz from "@/components/PortfolioOdZaraz";
import CategoryTileArt from "@/components/CategoryTileArt";
import { getCuratedProductCount, CATEGORIES } from "@/lib/uslugi";
import { CATEGORY_CONFIGS } from "@/lib/uslugi-config";

export const metadata: Metadata = {
  title: "Strony i sklepy internetowe od zera — WordPress, Shopify, Shoper",
  description:
    "Polska agencja web B2B. Productized packages — jasna cena, Stripe checkout, realizacja 7–14 dni. WordPress, WooCommerce, Shopify, opieka techniczna.",
  alternates: { canonical: "/" },
};

const FAQ = [
  {
    q: "Ile kosztuje strona internetowa?",
    a: "Pakiet Strona Start od 2 490 zł, Strona Pro od 4 990 zł. Sklep WooCommerce od 5 990 zł, Shopify od 7 990 zł. Ceny stałe — widzisz je przed płatnością w katalogu.",
  },
  {
    q: "Jak długo trwa realizacja?",
    a: "Strony: 7–14 dni roboczych. Sklepy: 14 dni. Termin liczony od momentu dostarczenia kompletnego briefu i materiałów (logo, treści).",
  },
  {
    q: "Czy mogę zamówić online bez rozmowy?",
    a: "Tak — wybierz pakiet w katalogu, opłać Stripe, wypełnij brief projektu. Skontaktujemy się w 24h z potwierdzeniem terminu.",
  },
  {
    q: "WordPress czy Shopify?",
    a: "WordPress/WooCommerce — pełna kontrola, najlepsze polskie integracje (Przelewy24, InPost). Shopify/Shoper — szybszy start, mniej technicznej obsługi. Doradzimy na briefie.",
  },
];

const STEPS = [
  { icon: Search, title: "Wybierz pakiet", desc: "Przeglądaj katalog usług — strony, sklepy, opieka, integracje. Cena widoczna od razu." },
  { icon: ClipboardList, title: "Zapłać i wypełnij brief", desc: "Płatność Stripe, potem formularz: dane firmy, branża, preferencje, materiały." },
  { icon: Rocket, title: "Realizacja i oddanie", desc: "Budujemy projekt w 7–14 dni. Szkolenie z panelu + gwarancja poprawek 30 dni." },
];

const PACKAGES = [
  { name: "Strona Start", price: "2 490 zł", href: "/uslugi?cat=strony-internetowe" },
  { name: "Strona Pro", price: "4 990 zł", href: "/uslugi?cat=strony-internetowe" },
  { name: "Sklep WooCommerce", price: "5 990 zł", href: "/uslugi?cat=sklepy-internetowe" },
  { name: "Sklep Shopify", price: "7 990 zł", href: "/uslugi?cat=shopify-shoper" },
  { name: "Opieka WordPress", price: "299 zł/mc", href: "/uslugi?cat=opieka-techniczna" },
  { name: "Google Ads Setup", price: "990 zł", href: "/uslugi?cat=reklama-marketing" },
];

export default function HomePage() {
  const count = getCuratedProductCount();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const howToJsonLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Jak zamówić stronę lub sklep internetowy online",
    totalTime: "P14D",
    step: STEPS.map((s, i) => ({
      "@type": "HowToStep",
      position: i + 1,
      name: s.title,
      text: s.desc,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }} />

      <HeroBanner
        variant="home"
        badge={`${count.toLocaleString("pl-PL")}+ pakietów · WordPress · Shopify · Shoper`}
        title={
          <>
            Strony i sklepy internetowe
            <span className="block text-white/95">od zera — z gwarancją działania</span>
          </>
        }
        subtitle="Polska agencja web B2B. Productized packages — jasna cena, zamówienie online, realizacja 7–14 dni."
      >
        <div className="flex flex-wrap gap-3">
          <Link href="/uslugi" className="inline-flex items-center rounded-lg bg-white px-6 py-3 text-sm font-semibold text-brand-800 shadow-sm hover:bg-brand-50">
            Zobacz pakiety i ceny
          </Link>
          <Link href="/o-nas" className="inline-flex items-center rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm hover:bg-white/20">
            O nas
          </Link>
        </div>
        <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/85">
          <span className="flex items-center gap-1.5"><Shield className="h-4 w-4" /> Gwarancja 30 dni</span>
          <span className="flex items-center gap-1.5"><Clock className="h-4 w-4" /> 7–14 dni realizacji</span>
          <span className="flex items-center gap-1.5"><Zap className="h-4 w-4" /> Płatność Stripe</span>
        </div>
      </HeroBanner>

      <TrustBar />

      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <PlatformBadges variant="light" />
        </div>
      </section>

      <DemoShowcase />

      <section className="border-y border-slate-200 bg-slate-50 py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-slate-900 sm:text-3xl">Usługi</h2>
          <p className="mx-auto mt-2 max-w-xl text-center text-slate-600">Wybierz kategorię — każdy pakiet z jasną ceną i scope.</p>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {CATEGORIES.map((cat) => {
              const cfg = CATEGORY_CONFIGS.find((c) => c.slug === cat.slug);
              const Icon = cfg?.icon;
              if (!Icon) return null;
              return (
                <Link
                  key={cat.slug}
                  href={`/uslugi/${cat.slug}`}
                  className="group overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-brand-300 hover:shadow-md"
                >
                  <CategoryTileArt categorySlug={cat.slug} icon={Icon} />
                  <div className="p-4">
                    <div className="flex items-center gap-2">
                      <Icon className="h-5 w-5 text-brand-600" aria-hidden />
                      <h3 className="font-semibold text-slate-900">{cat.title}</h3>
                    </div>
                    <p className="mt-1 line-clamp-2 text-sm text-slate-600">{cat.description}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <ProductizedCompare />

      <section className="py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-slate-900">Jak to działa</h2>
          <div className="mt-10 grid gap-8 md:grid-cols-3">
            {STEPS.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-slate-200 bg-white p-6 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-brand-700">
                  <Icon className="h-6 w-6" aria-hidden />
                </div>
                <h3 className="mt-4 font-semibold text-slate-900">{title}</h3>
                <p className="mt-2 text-sm text-slate-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-slate-900">Cennik pakietów</h2>
          <div className="mt-8 overflow-hidden rounded-xl border border-slate-200">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-4 py-3 font-semibold">Pakiet</th>
                  <th className="px-4 py-3 font-semibold">Cena od</th>
                  <th className="hidden px-4 py-3 font-semibold sm:table-cell">Akcja</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {PACKAGES.map((p) => (
                  <tr key={p.name} className="hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">{p.name}</td>
                    <td className="px-4 py-3 text-brand-700 font-semibold">{p.price}</td>
                    <td className="hidden px-4 py-3 sm:table-cell">
                      <Link href={p.href} className="text-brand-700 hover:underline">Zamów →</Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <CompareStartPro className="bg-white" />

      <FeaturedProducts />

      <BlogTeaser />

      <PortfolioOdZaraz className="bg-slate-50" />

      <section className="py-14">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-slate-900">FAQ</h2>
          <dl className="mt-8 space-y-4">
            {FAQ.map((item) => (
              <div key={item.q} className="rounded-xl border border-slate-200 bg-white p-5">
                <dt className="font-semibold text-slate-900">{item.q}</dt>
                <dd className="mt-2 text-sm text-slate-600">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="bg-brand-700 py-14 text-white">
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6">
          <h2 className="text-2xl font-bold sm:text-3xl">Gotowy na stronę lub sklep?</h2>
          <p className="mx-auto mt-3 max-w-xl text-brand-100">Wybierz pakiet, zapłać online, wypełnij brief — resztą zajmiemy się my.</p>
          <Link href="/uslugi" className="mt-6 inline-flex rounded-lg bg-white px-8 py-3 text-sm font-semibold text-brand-800 hover:bg-brand-50">
            Przeglądaj katalog usług
          </Link>
        </div>
      </section>
    </>
  );
}
