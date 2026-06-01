import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HeroBanner from "@/components/HeroBanner";
import { CATEGORIES, getUslugiByCategory } from "@/lib/uslugi";
import { getCategoryConfig, CATEGORY_CONFIGS } from "@/lib/uslugi-config";
import ProductCard from "@/app/uslugi/ProductCard";
import {
  getCityBySlug,
  getLocalCategories,
  getCategoryIntro,
  getLocalCityCategoryFaq,
  getPriceFromForCategory,
} from "@/lib/seo/local";
import { buildMetaFromTemplate } from "@/lib/seo/metadata";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo/json-ld";

type Props = { params: Promise<{ city: string; category: string }> };

export async function generateStaticParams() {
  const { getTierACities, getLocalCategories } = await import("@/lib/seo/local");
  const cities = getTierACities();
  const categories = getLocalCategories();
  return cities.flatMap((city) => categories.map((category) => ({ city: city.slug, category })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city: citySlug, category: categorySlug } = await params;
  const city = getCityBySlug(citySlug);
  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  if (!city || city.tier !== "A" || !category) return { title: "Nie znaleziono" };

  const intro = getCategoryIntro(city, categorySlug);
  const meta = buildMetaFromTemplate("local_city_category", {
    categoryTitle: category.title,
    cityName: city.name,
    priceFrom: getPriceFromForCategory(categorySlug),
    localIntroShort: intro.slice(0, 155),
  });

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/l/${city.slug}/${categorySlug}` },
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

export default async function LocalCityCategoryPage({ params }: Props) {
  const { city: citySlug, category: categorySlug } = await params;
  const city = getCityBySlug(citySlug);
  const category = CATEGORIES.find((c) => c.slug === categorySlug);
  const localCategories = getLocalCategories();

  if (!city || city.tier !== "A" || !category || !localCategories.includes(categorySlug)) {
    notFound();
  }

  const cfg = getCategoryConfig(categorySlug);
  const CategoryIcon = cfg?.icon;
  const intro = getCategoryIntro(city, categorySlug);
  const faq = getLocalCityCategoryFaq(city, category.title);
  const products = getUslugiByCategory(categorySlug, 12);

  const jsonLd = [
    buildBreadcrumbJsonLd([
      { name: "Strona główna", item: "/" },
      { name: city.name, item: `/l/${city.slug}` },
      { name: category.title, item: `/l/${city.slug}/${categorySlug}` },
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
        icon={CategoryIcon}
        badge={`${city.name} · ${category.title}`}
        title={`${category.title} — ${city.name}`}
        subtitle={intro}
        compact
      />

      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <h2 className="text-xl font-bold text-slate-900">Pakiety {category.title.toLowerCase()} dla {city.name}</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => {
            const relCfg = CATEGORY_CONFIGS.find((c) => c.slug === p.category);
            const ra = relCfg ? (ACCENT_STYLES[relCfg.accent] ?? ACCENT_STYLES.slate) : ACCENT_STYLES.slate;
            return (
              <ProductCard
                key={p.slug}
                slug={p.slug}
                title={p.seoTitle}
                shortDesc={p.shortDesc}
                category={p.category}
                categoryTitle={category.title}
                priceGrosze={p.priceGrosze}
                badgeClass={ra.badge}
                badgeTextClass={ra.badgeText}
              />
            );
          })}
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <h2 className="text-lg font-bold text-slate-900">FAQ</h2>
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

      <section className="border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Inne kategorie w {city.name}
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {localCategories
              .filter((c) => c !== categorySlug)
              .map((catSlug) => {
                const cat = CATEGORIES.find((c) => c.slug === catSlug);
                if (!cat) return null;
                return (
                  <Link
                    key={catSlug}
                    href={`/l/${city.slug}/${catSlug}`}
                    className="rounded-full border border-slate-200 px-3 py-1.5 text-sm text-slate-700 hover:border-brand-300 hover:text-brand-700"
                  >
                    {cat.title}
                  </Link>
                );
              })}
            <Link
              href={`/l/${city.slug}`}
              className="rounded-full border border-brand-200 bg-brand-50 px-3 py-1.5 text-sm font-medium text-brand-700"
            >
              ← Wszystkie kategorie
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
