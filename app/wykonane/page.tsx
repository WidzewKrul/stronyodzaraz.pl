import Link from "next/link";
import type { Metadata } from "next";
import { LayoutGrid } from "lucide-react";
import HeroBanner from "@/components/HeroBanner";
import ShowcaseFilterBar from "@/components/wykonane/ShowcaseFilterBar";
import ShowcaseCard from "@/components/wykonane/ShowcaseCard";
import {
  getAllWykonaneItems,
  getWykonaneByCategory,
  getWykonaneFilters,
  getWykonaneHubFaq,
  getWykonaneHubMeta,
} from "@/lib/wykonane-content";
import { buildMetaFromTemplate } from "@/lib/seo/metadata";
import { buildFaqJsonLd } from "@/lib/seo/json-ld";

type Props = { searchParams: Promise<{ cat?: string }> };

export async function generateMetadata(): Promise<Metadata> {
  const meta = buildMetaFromTemplate("wykonane_hub", {});
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: "/wykonane" },
  };
}

export default async function WykonaneHubPage({ searchParams }: Props) {
  const sp = await searchParams;
  const activeCat = sp.cat?.trim() || "all";
  const hubMeta = getWykonaneHubMeta();
  const filters = getWykonaneFilters();
  const items =
    activeCat === "all" || !filters.some((f) => f.id === activeCat)
      ? getAllWykonaneItems()
      : getWykonaneByCategory(activeCat);
  const hubFaq = getWykonaneHubFaq();
  const faqJsonLd = buildFaqJsonLd(hubFaq);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <HeroBanner
        variant="category"
        icon={LayoutGrid}
        badge={`${hubMeta.stats.showcaseCount} przykładów · ${hubMeta.stats.categoryCount} kategorii`}
        title={hubMeta.hubTitle}
        subtitle={hubMeta.hubSubtitle}
        compact
      >
        <span className="mt-4 inline-flex rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs text-white/90">
          {hubMeta.disclaimer}
        </span>
      </HeroBanner>

      <div className="border-b border-slate-100 bg-slate-50">
        <div className="mx-auto flex max-w-7xl flex-wrap justify-center gap-8 px-4 py-6 text-center sm:px-6">
          <div>
            <p className="text-2xl font-extrabold text-slate-900">{hubMeta.stats.showcaseCount}</p>
            <p className="text-xs text-slate-500">przykładów układów</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">{hubMeta.stats.categoryCount}</p>
            <p className="text-xs text-slate-500">kategorii usług</p>
          </div>
          <div>
            <p className="text-2xl font-extrabold text-slate-900">{hubMeta.stats.catalogRef}</p>
            <p className="text-xs text-slate-500">w katalogu online</p>
          </div>
        </div>
      </div>

      <ShowcaseFilterBar filters={filters} activeId={activeCat} />

      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <p className="mb-6 text-sm text-slate-500">
          {items.length} {items.length === 1 ? "przykład" : "przykładów"}
        </p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <ShowcaseCard key={item.slug} item={item} />
          ))}
        </div>
      </div>

      <section className="border-t border-slate-100 bg-white">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6">
          <h2 className="text-lg font-bold text-slate-900">Nie wiesz, co wybrać?</h2>
          <p className="mt-2 text-slate-600">Porównaj pakiety Start i Pro albo przejdź do pełnego katalogu z cenami.</p>
          <Link
            href="/uslugi"
            className="mt-5 inline-flex rounded-lg bg-brand-600 px-5 py-2.5 font-semibold text-white hover:bg-brand-700"
          >
            Zobacz pakiety i ceny
          </Link>
        </div>
      </section>

      <section className="border-t border-slate-100 bg-slate-50">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
          <h2 className="text-xl font-bold text-slate-900">FAQ</h2>
          <dl className="mt-6 space-y-6">
            {hubFaq.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-slate-900">{item.q}</dt>
                <dd className="mt-2 text-slate-700">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
