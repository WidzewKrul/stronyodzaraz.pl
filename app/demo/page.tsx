import Link from "next/link";
import type { Metadata } from "next";
import { Layers } from "lucide-react";
import BrowserMock from "@/components/wykonane/BrowserMock";
import HeroBanner from "@/components/HeroBanner";
import { buildMetaFromTemplate } from "@/lib/seo/metadata";
import { buildFaqJsonLd } from "@/lib/seo/json-ld";
import { getDemoDisclaimer, getDemoPageMeta, getDemos, demoToBrowserMock } from "@/lib/demo-content";

export async function generateMetadata(): Promise<Metadata> {
  const meta = buildMetaFromTemplate("demo", {});
  return {
    title: meta.title,
    description: meta.description,
    alternates: { canonical: "/demo" },
  };
}

export default function DemoPage() {
  const pageMeta = getDemoPageMeta();
  const demos = getDemos();
  const faqJsonLd = buildFaqJsonLd(pageMeta.faq);
  const demoCount = demos.length;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <HeroBanner
        variant="catalog"
        icon={Layers}
        badge={`${demoCount} szablonów · WordPress · Shopify · WooCommerce`}
        title={pageMeta.h1}
        subtitle={pageMeta.intro}
        compact
      >
        <p className="inline-flex items-center gap-2 rounded-xl border border-amber-300/30 bg-amber-400/10 px-3 py-2 text-xs text-amber-200">
          <span className="text-amber-300">ℹ</span>
          {getDemoDisclaimer()}
        </p>
      </HeroBanner>

      <div className="mx-auto max-w-7xl space-y-16 px-4 pb-16 sm:px-6">
        {demos.map((demo) => (
          <section key={demo.id} className="grid gap-8 lg:grid-cols-2 lg:items-start">
            <div>
              <h2 className="text-xl font-bold text-slate-900">{demo.label}</h2>
              <p className="mt-1 text-slate-600">{demo.fakeBrand}</p>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {demo.bulletsCard.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-brand-600">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                href={`/uslugi/${demo.pdpCategory}/${demo.pdpSlug}`}
                className="mt-5 inline-flex rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
              >
                {demo.ctaLabel}
              </Link>
            </div>
            <BrowserMock data={demoToBrowserMock(demo)} />
          </section>
        ))}
      </div>

      <section className="border-t border-slate-200 bg-brand-50 py-12">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <Link
            href="/wykonane"
            className="inline-flex rounded-lg bg-brand-600 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-700"
          >
            Zobacz wszystkie 17 przykładów układów →
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h2 className="text-xl font-bold text-slate-900">FAQ</h2>
        <dl className="mt-6 space-y-4">
          {pageMeta.faq.map((item) => (
            <div key={item.q}>
              <dt className="font-semibold text-slate-900">{item.q}</dt>
              <dd className="mt-1 text-slate-700">{item.a}</dd>
            </div>
          ))}
        </dl>
      </section>
    </>
  );
}
