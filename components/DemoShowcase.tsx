import Link from "next/link";
import BrowserMock from "@/components/wykonane/BrowserMock";
import { getDemoDisclaimer, getDemoHomeMeta, getDemos, demoToBrowserMock } from "@/lib/demo-content";

export default function DemoShowcase() {
  const meta = getDemoHomeMeta();
  const demos = getDemos();

  return (
    <section className="border-y border-slate-200 bg-white py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">{meta.h2}</h2>
          <p className="mx-auto mt-2 max-w-2xl text-slate-600">{meta.subtitle}</p>
          <p className="mx-auto mt-2 max-w-xl text-xs text-slate-500">{getDemoDisclaimer()}</p>
        </div>
        <div className="mt-10 grid gap-8 lg:grid-cols-3">
          {demos.map((demo) => (
            <article key={demo.id} className="flex flex-col rounded-xl border border-slate-200 bg-slate-50 p-4">
              <p className="mb-3 text-sm font-semibold text-slate-900">{demo.label}</p>
              <BrowserMock data={demoToBrowserMock(demo)} compact />
              <ul className="mt-4 flex-1 space-y-1.5 text-sm text-slate-600">
                {demo.bulletsCard.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span className="text-brand-600">✓</span>
                    {b}
                  </li>
                ))}
              </ul>
              <Link
                href={`/uslugi/${demo.pdpCategory}/${demo.pdpSlug}`}
                className="mt-4 text-sm font-semibold text-brand-700 hover:text-brand-800"
              >
                {demo.ctaLabel} →
              </Link>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href={meta.linkAll.href}
            className="inline-flex rounded-lg border border-brand-200 bg-brand-50 px-5 py-2.5 text-sm font-semibold text-brand-800 hover:bg-brand-100"
          >
            {meta.linkAll.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
