import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Check } from "lucide-react";
import {
  getUslugiByCategory,
  CATEGORIES,
} from "@/lib/uslugi";
import { CATEGORY_CONFIGS } from "@/lib/uslugi-config";
import HeroBanner from "@/components/HeroBanner";
import ProductCard from "../ProductCard";

type Props = { params: Promise<{ category: string }> };

const ACCENT_STYLES: Record<string, { badge: string; badgeText: string; iconBg: string; checkColor: string }> = {
  rose: { badge: "bg-rose-100", badgeText: "text-rose-800", iconBg: "bg-rose-100", checkColor: "text-rose-600" },
  amber: { badge: "bg-amber-100", badgeText: "text-amber-900", iconBg: "bg-amber-100", checkColor: "text-amber-600" },
  sky: { badge: "bg-sky-100", badgeText: "text-sky-800", iconBg: "bg-sky-100", checkColor: "text-sky-600" },
  emerald: { badge: "bg-emerald-100", badgeText: "text-emerald-800", iconBg: "bg-emerald-100", checkColor: "text-emerald-600" },
  indigo: { badge: "bg-indigo-100", badgeText: "text-indigo-800", iconBg: "bg-indigo-100", checkColor: "text-indigo-600" },
  violet: { badge: "bg-violet-100", badgeText: "text-violet-800", iconBg: "bg-violet-100", checkColor: "text-violet-600" },
  slate: { badge: "bg-slate-100", badgeText: "text-slate-700", iconBg: "bg-slate-100", checkColor: "text-slate-600" },
};

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) return {};
  const cfg = CATEGORY_CONFIGS.find((c) => c.slug === category);
  const tagline = cfg?.tagline ?? cat.description;
  return {
    title: `${cat.title} — pakiety usług web | stronyodzaraz.pl`,
    description: `${tagline}. Zamów online — jasna cena, realizacja 7–14 dni. ${cat.description}.`,
    alternates: { canonical: `/uslugi/${category}` },
  };
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = CATEGORIES.find((c) => c.slug === category);
  if (!cat) notFound();

  const cfg = CATEGORY_CONFIGS.find((c) => c.slug === category);
  const pisma = getUslugiByCategory(category);
  const a = cfg ? (ACCENT_STYLES[cfg.accent] ?? ACCENT_STYLES.slate) : ACCENT_STYLES.slate;
  const Icon = cfg?.icon;

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `${cat.title} — pakiety usług web`,
    itemListElement: pisma.slice(0, 10).map((p, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: p.title,
      url: `/uslugi/${category}/${p.slug}`,
    })),
  };

  const faqJsonLd = cfg && cfg.faq.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: cfg.faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      <HeroBanner
        variant="category"
        compact
        icon={Icon}
        badge={cat.title}
        title={cat.title}
        subtitle={cfg?.tagline ?? cat.description}
      >
        <nav aria-label="Breadcrumb" className="mb-2 text-xs text-white/75">
          <Link href="/" className="hover:text-white">Strona główna</Link>
          <span className="mx-1.5">/</span>
          <Link href="/uslugi" className="hover:text-white">Katalog</Link>
          <span className="mx-1.5">/</span>
          <span className="font-medium text-white">{cat.title}</span>
        </nav>
        <p className="text-sm font-semibold text-white/90">{pisma.length} pakietów w tej kategorii</p>
      </HeroBanner>

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {pisma.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
            <p className="text-slate-600">Brak pakietów w tej kategorii.</p>
            <Link href="/uslugi" className="mt-4 inline-block text-sm font-medium text-brand-700 hover:underline">
              Wróć do wszystkich kategorii
            </Link>
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {pisma.map((pismo) => (
              <ProductCard
                key={pismo.slug}
                slug={pismo.slug}
                title={pismo.seoTitle}
                shortDesc={pismo.shortDesc}
                category={pismo.category}
                categoryTitle={cat.title}
                priceGrosze={pismo.priceGrosze}
                badgeClass={a.badge}
                badgeTextClass={a.badgeText}
              />
            ))}
          </div>
        )}
      </section>

      {cfg && (
        <section className="border-t border-slate-100 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
            <h2 className="mb-8 text-xl font-bold text-slate-900">Jak to działa</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {cfg.process.map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-700 text-sm font-bold text-white">
                    {i + 1}
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-900">{step.title}</h3>
                    <p className="mt-1 text-sm leading-6 text-slate-600">{step.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {cfg && cfg.forWhom.length > 0 && (
        <section className="border-t border-slate-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
            <h2 className="mb-6 text-xl font-bold text-slate-900">Dla kogo</h2>
            <ul className="grid gap-3 sm:grid-cols-2">
              {cfg.forWhom.map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                  <Check className={`mt-0.5 h-4 w-4 shrink-0 ${a.checkColor}`} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {cfg && cfg.faq.length > 0 && (
        <section className="border-t border-slate-100 bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
            <h2 className="mb-6 text-xl font-bold text-slate-900">Najczęstsze pytania</h2>
            <div className="space-y-3">
              {cfg.faq.map((item) => (
                <details key={item.q} className="group rounded-xl border border-slate-200 bg-white">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 px-5 py-4 font-semibold text-slate-900 marker:content-none">
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
        </section>
      )}
    </>
  );
}
