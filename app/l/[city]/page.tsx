import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Globe } from "lucide-react";
import HeroBanner from "@/components/HeroBanner";
import { CATEGORIES, getUslugiByCategory } from "@/lib/uslugi";
import { getCategoryConfig, CATEGORY_CONFIGS } from "@/lib/uslugi-config";
import ProductCard from "@/app/uslugi/ProductCard";
import {
  getCityBySlug,
  getLocalCategories,
  getHubIntro,
  getLocalFaq,
  getPriceFromForCategory,
} from "@/lib/seo/local";
import { buildMetaFromTemplate } from "@/lib/seo/metadata";
import { buildBreadcrumbJsonLd, buildFaqJsonLd, buildLocalBusinessJsonLd } from "@/lib/seo/json-ld";

type Props = { params: Promise<{ city: string }> };

export async function generateStaticParams() {
  const { getTierACities } = await import("@/lib/seo/local");
  return getTierACities().map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city || city.tier !== "A") return { title: "Nie znaleziono" };

  const meta = buildMetaFromTemplate("local_city", {
    cityName: city.name,
    priceFrom: getPriceFromForCategory("strony-internetowe"),
  });

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/l/${city.slug}` },
  };
}

const ACCENT_STYLES: Record<string, { badge: string; badgeText: string }> = {
  rose: { badge: "bg-rose-100", badgeText: "text-rose-800" },
  amber: { badge: "bg-amber-100", badgeText: "text-amber-900" },
  sky: { badge: "bg-stone-100", badgeText: "text-stone-800" },
  emerald: { badge: "bg-emerald-100", badgeText: "text-emerald-800" },
  indigo: { badge: "bg-slate-100", badgeText: "text-slate-800" },
  violet: { badge: "bg-zinc-100", badgeText: "text-zinc-800" },
  slate: { badge: "bg-slate-100", badgeText: "text-slate-700" },
};

export default async function LocalCityPage({ params }: Props) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  if (!city || city.tier !== "A") notFound();

  const intro = getHubIntro(city);
  const faq = getLocalFaq(city);
  const localCategories = getLocalCategories();

  const featured = localCategories
    .slice(0, 3)
    .flatMap((cat) => getUslugiByCategory(cat, 2))
    .slice(0, 6);

  const jsonLd = [
    buildLocalBusinessJsonLd(city.name),
    buildBreadcrumbJsonLd([
      { name: "Strona główna", item: "/" },
      { name: city.name, item: `/l/${city.slug}` },
    ]),
    buildFaqJsonLd(faq),
  ];

  return (
    <>
      {jsonLd.map((schema, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      ))}

      <HeroBanner
        variant="category"
        icon={Globe}
        badge={`Obsługa zdalna · ${city.voivodeship}`}
        title={
          <>
            Strony i sklepy internetowe — <span className="text-brand-200">{city.name}</span>
          </>
        }
        subtitle="Stała cena w katalogu, realizacja 7–14 dni, brief online po płatności."
      />

      <section className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <p className="text-lg leading-8 text-slate-700">{intro}</p>
      </section>

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <h2 className="text-xl font-bold text-slate-900">Kategorie usług w {city.name}</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {localCategories.map((catSlug) => {
              const cat = CATEGORIES.find((c) => c.slug === catSlug);
              if (!cat) return null;
              const cfg = getCategoryConfig(catSlug);
              const a = cfg ? (ACCENT_STYLES[cfg.accent] ?? ACCENT_STYLES.slate) : ACCENT_STYLES.slate;
              return (
                <Link
                  key={catSlug}
                  href={`/l/${city.slug}/${catSlug}`}
                  className="rounded-xl border border-slate-200 bg-white p-5 transition hover:border-brand-300 hover:shadow-sm"
                >
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${a.badge} ${a.badgeText}`}>
                    {cat.title}
                  </span>
                  <p className="mt-3 text-sm text-slate-600 line-clamp-3">{cat.description}</p>
                  <p className="mt-3 text-xs font-semibold text-brand-700">Zobacz pakiety →</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {featured.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
          <h2 className="text-xl font-bold text-slate-900">Popularne pakiety dla firm z {city.name}</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => {
              const relCfg = CATEGORY_CONFIGS.find((c) => c.slug === p.category);
              const relCat = CATEGORIES.find((c) => c.slug === p.category);
              const ra = relCfg ? (ACCENT_STYLES[relCfg.accent] ?? ACCENT_STYLES.slate) : ACCENT_STYLES.slate;
              return (
                <ProductCard
                  key={p.slug}
                  slug={p.slug}
                  title={p.seoTitle}
                  shortDesc={p.shortDesc}
                  category={p.category}
                  categoryTitle={relCat?.title ?? p.category}
                  priceGrosze={p.priceGrosze}
                  badgeClass={ra.badge}
                  badgeTextClass={ra.badgeText}
                />
              );
            })}
          </div>
        </section>
      )}

      <section className="border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <h2 className="text-xl font-bold text-slate-900">FAQ — {city.name}</h2>
          <dl className="mt-6 space-y-6">
            {faq.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-slate-900">{item.q}</dt>
                <dd className="mt-2 text-slate-700">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-brand-50">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6">
          <h2 className="text-lg font-bold text-slate-900">Gotowy na stronę lub sklep?</h2>
          <p className="mt-2 text-slate-600">Wybierz pakiet, opłać online — brief wyślemy na e-mail.</p>
          <Link
            href="/uslugi"
            className="mt-5 inline-flex rounded-lg bg-brand-600 px-5 py-2.5 font-semibold text-white hover:bg-brand-700"
          >
            Przeglądaj katalog usług
          </Link>
        </div>
      </section>
    </>
  );
}
