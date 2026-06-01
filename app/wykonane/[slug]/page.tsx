import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ShowcaseMock from "@/components/wykonane/ShowcaseMock";
import ShowcaseCard from "@/components/wykonane/ShowcaseCard";
import {
  getAllWykonaneItems,
  getWykonaneBySlug,
  getMockDisclaimer,
  CATEGORY_LABELS,
} from "@/lib/wykonane-content";
import { buildMetaFromTemplate } from "@/lib/seo/metadata";
import { buildBreadcrumbJsonLd, buildFaqJsonLd } from "@/lib/seo/json-ld";
import { siteUrl } from "@/lib/env";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllWykonaneItems().map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = getWykonaneBySlug(slug);
  if (!item) return { title: "Nie znaleziono" };

  const meta = buildMetaFromTemplate("wykonane_detail", {
    showcaseTitle: item.title,
    tier: item.tier,
    scopeOneLiner: item.scopeOneLiner,
    priceFrom: String(item.priceFrom),
    deliveryDays: item.deliveryDays,
  });

  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: `/wykonane/${item.slug}` },
  };
}

export default async function WykonaneDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = getWykonaneBySlug(slug);
  if (!item) notFound();

  const categoryLabel = CATEGORY_LABELS[item.category] ?? item.category;
  const related = item.relatedSlugs
    .map((s) => getWykonaneBySlug(s))
    .filter((x): x is NonNullable<typeof x> => Boolean(x))
    .slice(0, 3);

  const pdpHref = `/uslugi/${item.pdpCategory}/${item.pdpSlug}`;
  const base = siteUrl();

  const creativeWorkJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: item.title,
    description: item.scopeOneLiner,
    url: `${base}/wykonane/${item.slug}`,
    creator: { "@type": "Organization", name: "stronyodzaraz.pl" },
  };

  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: item.title,
    description: item.scopeOneLiner,
    provider: { "@type": "Organization", name: "stronyodzaraz.pl" },
    areaServed: "PL",
    offers: {
      "@type": "Offer",
      price: item.priceFrom,
      priceCurrency: "PLN",
    },
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd([
    { name: "Strona główna", item: "/" },
    { name: "Wykonane", item: "/wykonane" },
    { name: item.title, item: `/wykonane/${item.slug}` },
  ]);

  const faqJsonLd = item.faq.length > 0 ? buildFaqJsonLd(item.faq) : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(creativeWorkJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      ) : null}

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <nav aria-label="Breadcrumb" className="text-xs text-slate-500">
          <Link href="/" className="hover:text-brand-700">
            Strona główna
          </Link>
          <span className="mx-1.5">/</span>
          <Link href="/wykonane" className="hover:text-brand-700">
            Wykonane
          </Link>
          <span className="mx-1.5">/</span>
          <span className="text-slate-700">{item.title}</span>
        </nav>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_320px] lg:items-start">
          <div>
            <div className="flex flex-wrap gap-2">
              <span className="rounded-full bg-brand-50 px-2.5 py-0.5 text-xs font-semibold text-brand-800">
                {categoryLabel}
              </span>
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                {item.tier}
              </span>
            </div>
            <h1 className="mt-4 text-3xl font-extrabold text-slate-900">{item.title}</h1>
            <p className="mt-2 text-lg text-slate-600">{item.tagline}</p>
            <p className="mt-1 text-sm text-slate-500">{item.fakeBrand}</p>

            <div className="mt-8">
              <ShowcaseMock item={item} />
            </div>

            <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              {getMockDisclaimer()}
            </div>

            <section className="mt-10">
              <h2 className="text-xl font-bold text-slate-900">Co zawiera ten przykład</h2>
              <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
                {item.scopeDelivered.map((line) => (
                  <li key={line}>{line}</li>
                ))}
              </ul>
            </section>

            <section className="mt-10">
              <h2 className="text-xl font-bold text-slate-900">Technologie</h2>
              <div className="mt-3 flex flex-wrap gap-2">
                {item.stack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </section>

            {item.faq.length > 0 && (
              <section className="mt-10">
                <h2 className="text-xl font-bold text-slate-900">FAQ</h2>
                <dl className="mt-4 space-y-4">
                  {item.faq.map((f) => (
                    <div key={f.q}>
                      <dt className="font-semibold text-slate-900">{f.q}</dt>
                      <dd className="mt-1 text-slate-700">{f.a}</dd>
                    </div>
                  ))}
                </dl>
              </section>
            )}

            {related.length > 0 && (
              <section className="mt-12 border-t border-slate-100 pt-10">
                <h2 className="text-lg font-bold text-slate-900">Podobne przykłady</h2>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {related.map((rel) => (
                    <ShowcaseCard key={rel.slug} item={rel} compact />
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="lg:sticky lg:top-24">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
              <p className="text-sm text-slate-500">Pakiet od</p>
              <p className="text-3xl font-extrabold text-slate-900">
                {item.priceFrom.toLocaleString("pl-PL")} {item.priceNote ?? "zł"}
              </p>
              {item.deliveryDays !== "—" && item.deliveryDays !== "ongoing" && (
                <p className="mt-2 text-sm text-slate-600">Realizacja: {item.deliveryDays} dni rob.</p>
              )}
              {item.deliveryDays === "ongoing" && (
                <p className="mt-2 text-sm text-slate-600">Abonament miesięczny</p>
              )}
              <Link
                href={pdpHref}
                className="mt-5 flex w-full items-center justify-center rounded-lg bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700"
              >
                Zamów ten pakiet
              </Link>
              <p className="mt-4 text-center text-xs text-slate-500">Gwarancja poprawek 30 dni w scope pakietu</p>
            </div>
          </aside>
        </div>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-slate-200 bg-white p-3 shadow-lg lg:hidden">
        <div className="mx-auto flex max-w-lg items-center justify-between gap-3">
          <div>
            <p className="text-xs text-slate-500">od {item.priceFrom.toLocaleString("pl-PL")} zł</p>
            <p className="text-sm font-bold text-slate-900">{item.tier}</p>
          </div>
          <Link
            href={pdpHref}
            className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white"
          >
            Zamów pakiet
          </Link>
        </div>
      </div>
    </>
  );
}
