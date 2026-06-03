import Link from "next/link";
import type { Metadata } from "next";
import { Cpu } from "lucide-react";
import HeroBanner from "@/components/HeroBanner";
import Breadcrumbs from "@/components/Breadcrumbs";
import { LucideByName } from "@/components/wykonane/LucideByName";
import {
  getTechnologiaMeta,
  getTechnologiaPlatforms,
  getTechnologiaIntegrations,
  getTechnologiaHosting,
  getTechnologiaHandover,
  getTechnologiaFaq,
  getTechnologiaCta,
} from "@/lib/technologia-content";
import { buildMetaFromTemplate } from "@/lib/seo/metadata";
import { buildFaqJsonLd } from "@/lib/seo/json-ld";

export async function generateMetadata(): Promise<Metadata> {
  const meta = buildMetaFromTemplate("technologia", {});
  const t = getTechnologiaMeta();
  return {
    title: meta.title || t.title,
    description: meta.description || t.description,
    alternates: { canonical: "/technologia" },
  };
}

export default function TechnologiaPage() {
  const tMeta = getTechnologiaMeta();
  const platforms = getTechnologiaPlatforms();
  const integrations = getTechnologiaIntegrations();
  const hosting = getTechnologiaHosting();
  const handover = getTechnologiaHandover();
  const faq = getTechnologiaFaq();
  const cta = getTechnologiaCta();
  const faqJsonLd = buildFaqJsonLd(faq);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <HeroBanner
        variant="catalog"
        icon={Cpu}
        badge="WordPress · Shopify · Shoper · Next.js"
        title={tMeta.h1}
        subtitle={tMeta.intro}
        compact
      />
      <Breadcrumbs items={[{ label: "Technologia" }]} />

      <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6" />

      <section className="border-y border-slate-100 bg-slate-50 py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {platforms.map((p) => (
              <article key={p.id} className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
                    <LucideByName name={p.icon} className="h-5 w-5" />
                  </span>
                  <div>
                    <h2 className="font-bold text-slate-900">{p.name}</h2>
                    <p className="text-sm text-slate-600">{p.tagline}</p>
                  </div>
                </div>
                <ul className="mt-4 space-y-2 text-sm text-slate-700">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-2">
                      <span className="text-brand-600">✓</span>
                      {b}
                    </li>
                  ))}
                </ul>
                <Link href={p.linkCategory} className="mt-4 inline-block text-sm font-semibold text-brand-700">
                  Pakiety {p.name} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <h2 className="text-xl font-bold text-slate-900">{integrations.h2}</h2>
        <ul className="mt-4 space-y-3">
          {integrations.items.map((item) => (
            <li key={item.name} className="rounded-lg border border-slate-200 p-4">
              <p className="font-semibold text-slate-900">{item.name}</p>
              <p className="mt-1 text-sm text-slate-600">{item.context}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-y border-slate-100 bg-slate-50 py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6">
          <h2 className="text-xl font-bold text-slate-900">{hosting.h2}</h2>
          <div className="mt-4 space-y-3 text-slate-700">
            {hosting.paragraphs.map((p) => (
              <p key={p} dangerouslySetInnerHTML={{ __html: p.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>") }} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <h2 className="text-xl font-bold text-slate-900">{handover.h2}</h2>
        <ul className="mt-4 list-disc space-y-2 pl-6 text-slate-700">
          {handover.checklist.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <h2 className="text-xl font-bold text-slate-900">FAQ</h2>
        <dl className="mt-6 space-y-4">
          {faq.map((item) => (
            <div key={item.q}>
              <dt className="font-semibold text-slate-900">{item.q}</dt>
              <dd className="mt-1 text-slate-700">{item.a}</dd>
            </div>
          ))}
        </dl>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href={cta.primary.href} className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">
            {cta.primary.label}
          </Link>
          <Link href={cta.secondary.href} className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800">
            {cta.secondary.label}
          </Link>
        </div>
      </section>
    </>
  );
}
