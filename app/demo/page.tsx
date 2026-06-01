import Link from "next/link";
import type { Metadata } from "next";
import BrowserMock from "@/components/wykonane/BrowserMock";
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

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">{pageMeta.h1}</h1>
        <p className="mt-4 text-lg text-slate-600">{pageMeta.intro}</p>
        <p className="mt-2 text-sm text-amber-800 rounded-lg bg-amber-50 border border-amber-200 px-3 py-2">
          {getDemoDisclaimer()}
        </p>
      </div>

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
