import Link from "next/link";
import type { Metadata } from "next";
import {
  getAllUslugi,
  getCategoryCounts,
  searchUslugi,
  getUslugiByCategory,
  CATEGORIES,
} from "@/lib/uslugi";
import { CATEGORY_CONFIGS } from "@/lib/uslugi-config";
import { Zap, FileDown, ShieldCheck } from "lucide-react";
import HeroBanner from "@/components/HeroBanner";
import SearchBar from "./SearchBar";
import ProductCard from "./ProductCard";
import ShopPagination from "./ShopPagination";

const PAGE_SIZE = 24;

type Props = { searchParams: Promise<{ q?: string; cat?: string; page?: string }> };

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q, cat } = await searchParams;
  if (q) {
    return {
      title: `Wyniki dla "${q}" — usługi web | stronyodzaraz.pl`,
      description: `Pakiety usług web pasujące do zapytania "${q}". Strony WordPress, sklepy, opieka techniczna.`,
      alternates: { canonical: "/uslugi" },
      robots: { index: false, follow: true },
    };
  }
  if (cat) {
    const category = CATEGORIES.find((c) => c.slug === cat);
    return {
      title: category
        ? `${category.title} — pakiety usług | stronyodzaraz.pl`
        : "Usługi web | stronyodzaraz.pl",
      description: category
        ? `${category.description}. Zamów online — jasna cena, realizacja 7–14 dni.`
        : "Strony WordPress, sklepy WooCommerce, Shopify, opieka techniczna.",
      alternates: { canonical: "/uslugi" },
    };
  }
  return {
    title: "Usługi web — strony, sklepy, WordPress, Shopify | stronyodzaraz.pl",
    description:
      "Katalog pakietów usług web B2B. Strony WordPress od 2 490 zł, sklepy WooCommerce od 5 990 zł. Zamówienie online, realizacja 7–14 dni.",
    alternates: { canonical: "/uslugi" },
  };
}

const TRUST_ITEMS = [
  { icon: Zap, text: "Realizacja 7–14 dni roboczych" },
  { icon: FileDown, text: "Jasna cena — zamów online" },
  { icon: ShieldCheck, text: "Gwarancja poprawek 30 dni" },
];

const ACCENT_STYLES: Record<string, { badge: string; badgeText: string }> = {
  rose: { badge: "bg-rose-100", badgeText: "text-rose-800" },
  amber: { badge: "bg-amber-100", badgeText: "text-amber-900" },
  sky: { badge: "bg-stone-100", badgeText: "text-stone-800" },
  emerald: { badge: "bg-emerald-100", badgeText: "text-emerald-800" },
  indigo: { badge: "bg-slate-100", badgeText: "text-slate-800" },
  violet: { badge: "bg-zinc-100", badgeText: "text-zinc-800" },
  slate: { badge: "bg-slate-100", badgeText: "text-slate-700" },
};

function catalogHref(cat?: string, q?: string, page?: number) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (cat) params.set("cat", cat);
  if (page && page > 1) params.set("page", String(page));
  const s = params.toString();
  return s ? `/uslugi?${s}` : "/uslugi";
}

export default async function GotowePismaPage({ searchParams }: Props) {
  const sp = await searchParams;
  const q = sp.q?.trim() ?? "";
  const activeCat = sp.cat ?? "";
  const page = Math.max(1, parseInt(sp.page ?? "1", 10) || 1);

  const all = getAllUslugi();
  const categoryCounts = getCategoryCounts();
  const countMap = new Map(categoryCounts.map((c) => [c.category, c.count]));

  let filtered = all;
  if (q) filtered = searchUslugi(q, activeCat || undefined);
  else if (activeCat) filtered = getUslugiByCategory(activeCat);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const products = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const activeCategoryTitle = activeCat
    ? (CATEGORIES.find((c) => c.slug === activeCat)?.title ?? activeCat)
    : "Wszystkie usługi";

  return (
    <>
      <HeroBanner
        variant="catalog"
        compact
        badge={`${all.length.toLocaleString("pl-PL")}+ pakietów usług web`}
        title="Katalog usług — strony i sklepy"
        subtitle="WordPress, WooCommerce, Shopify, opieka techniczna — wybierz pakiet, zamów online z jasną ceną."
      >
        <SearchBar defaultValue={q} defaultCat={activeCat} />
      </HeroBanner>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-8 gap-y-4 px-4 py-5 sm:grid-cols-3 sm:px-6">
          {TRUST_ITEMS.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2.5">
              <Icon className="h-5 w-5 shrink-0 text-brand-600" aria-hidden />
              <span className="text-sm font-medium text-slate-700">{text}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
          <aside className="lg:w-56 lg:shrink-0">
            <div className="rounded-xl border border-slate-200 bg-white p-4 lg:sticky lg:top-24">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-500">Kategorie</h2>
              <nav className="mt-3 space-y-0.5" aria-label="Kategorie usług">
                <Link
                  href={catalogHref(undefined, q || undefined)}
                  className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
                    !activeCat ? "bg-brand-50 text-brand-800" : "text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  Wszystkie
                  <span className="ml-1 text-slate-400">({all.length})</span>
                </Link>
                {CATEGORIES.map((c) => {
                  const count = countMap.get(c.slug) ?? 0;
                  if (count === 0) return null;
                  const isActive = activeCat === c.slug;
                  return (
                    <Link
                      key={c.slug}
                      href={catalogHref(c.slug, q || undefined)}
                      className={`block rounded-lg px-3 py-2 text-sm font-medium transition ${
                        isActive ? "bg-brand-50 text-brand-800" : "text-slate-700 hover:bg-slate-50"
                      }`}
                    >
                      {c.title}
                      <span className="ml-1 text-slate-400">({count})</span>
                    </Link>
                  );
                })}
              </nav>
            </div>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="mb-6 flex flex-wrap items-end justify-between gap-2">
              <div>
                <h2 className="text-lg font-bold text-slate-900">{activeCategoryTitle}</h2>
                <p className="mt-1 text-sm text-slate-600">
                  {total === 0 ? (
                    <>Brak wyników{q ? ` dla „${q}"` : ""}.</>
                  ) : (
                    <>
                      {total} {total === 1 ? "pakiet" : total < 5 ? "pakiety" : "pakietów"}
                      {q ? ` · szukasz: „${q}"` : ""}
                      {totalPages > 1 ? ` · strona ${safePage} z ${totalPages}` : ""}
                    </>
                  )}
                </p>
              </div>
            </div>

            {products.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
                <p className="text-slate-600">Nie znaleziono pakietów pasujących do kryteriów.</p>
                <Link href="/uslugi" className="mt-4 inline-block text-sm font-medium text-brand-700 hover:underline">
                  Pokaż wszystkie pakiety
                </Link>
              </div>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                  {products.map((pismo) => {
                    const cfg = CATEGORY_CONFIGS.find((c) => c.slug === pismo.category);
                    const catObj = CATEGORIES.find((c) => c.slug === pismo.category);
                    const a = cfg ? (ACCENT_STYLES[cfg.accent] ?? ACCENT_STYLES.slate) : ACCENT_STYLES.slate;
                    return (
                      <ProductCard
                        key={pismo.slug}
                        slug={pismo.slug}
                        title={pismo.seoTitle}
                        shortDesc={pismo.shortDesc}
                        category={pismo.category}
                        categoryTitle={catObj?.title ?? pismo.category}
                        priceGrosze={pismo.priceGrosze}
                        badgeClass={a.badge}
                        badgeTextClass={a.badgeText}
                      />
                    );
                  })}
                </div>
                <ShopPagination page={safePage} totalPages={totalPages} q={q || undefined} cat={activeCat || undefined} />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
