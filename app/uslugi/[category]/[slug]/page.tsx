import { notFound, redirect } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  getStoreProductBySlug,
  getUslugaBySlug,
  getUslugiByCategory,
  getAllUslugi,
  getPrimarySlugForProduct,
  isPrimaryProductSlug,
  CATEGORIES,
} from "@/lib/uslugi";
import { buildMetaFromTemplate, formatPricePln, clipAtWord } from "@/lib/seo/metadata";
import { getCategoryConfig, CATEGORY_CONFIGS } from "@/lib/uslugi-config";
import {
  buildProductLongDesc,
  buildWhatYouGet,
  buildForWhom,
  buildProcess,
  buildProductFaq,
  buildDeliveryContent,
} from "@/lib/product-content";
import { TRUST_PILLS_WEB } from "@/lib/service-visuals";
import BriefMockup from "@/components/BriefMockup";
import AddToCartBox from "./AddToCartBox";
import ProductTabs from "./ProductTabs";
import ProductCard from "../../ProductCard";
import ProductReviews from "@/components/ProductReviews";
import PdpShowcaseLink from "@/components/PdpShowcaseLink";
import UpsellBox from "@/components/UpsellBox";
import { getUpsellForProduct } from "@/lib/upsell";

function formatPrice(grosze: number): string {
  return (grosze / 100).toFixed(2).replace(".", ",") + " zł";
}

type Props = { params: Promise<{ category: string; slug: string }> };

const ACCENT_STYLES: Record<
  string,
  {
    badge: string;
    badgeText: string;
    gradient: string;
    iconBg: string;
    checkColor: string;
  }
> = {
  rose: {
    badge: "bg-rose-100",
    badgeText: "text-rose-800",
    gradient: "from-rose-50 via-white to-pink-50/30",
    iconBg: "bg-rose-600",
    checkColor: "text-rose-600",
  },
  amber: {
    badge: "bg-amber-100",
    badgeText: "text-amber-900",
    gradient: "from-amber-50 via-white to-yellow-50/30",
    iconBg: "bg-amber-500",
    checkColor: "text-amber-600",
  },
  sky: {
    badge: "bg-sky-100",
    badgeText: "text-sky-800",
    gradient: "from-sky-50 via-white to-blue-50/30",
    iconBg: "bg-sky-600",
    checkColor: "text-sky-600",
  },
  emerald: {
    badge: "bg-emerald-100",
    badgeText: "text-emerald-800",
    gradient: "from-emerald-50 via-white to-green-50/30",
    iconBg: "bg-emerald-600",
    checkColor: "text-emerald-600",
  },
  indigo: {
    badge: "bg-indigo-100",
    badgeText: "text-indigo-800",
    gradient: "from-indigo-50 via-white to-purple-50/30",
    iconBg: "bg-indigo-600",
    checkColor: "text-indigo-600",
  },
  violet: {
    badge: "bg-violet-100",
    badgeText: "text-violet-800",
    gradient: "from-violet-50 via-white to-purple-50/30",
    iconBg: "bg-violet-600",
    checkColor: "text-violet-600",
  },
  slate: {
    badge: "bg-slate-100",
    badgeText: "text-slate-700",
    gradient: "from-slate-50 via-white to-gray-50/30",
    iconBg: "bg-slate-600",
    checkColor: "text-slate-600",
  },
};

const RELATED_ACCENT_STYLES: Record<string, { badge: string; badgeText: string }> = {
  rose: { badge: "bg-rose-100", badgeText: "text-rose-800" },
  amber: { badge: "bg-amber-100", badgeText: "text-amber-900" },
  sky: { badge: "bg-stone-100", badgeText: "text-stone-800" },
  emerald: { badge: "bg-emerald-100", badgeText: "text-emerald-800" },
  indigo: { badge: "bg-slate-100", badgeText: "text-slate-800" },
  violet: { badge: "bg-zinc-100", badgeText: "text-zinc-800" },
  slate: { badge: "bg-slate-100", badgeText: "text-slate-700" },
};

export const revalidate = 86400;
export const dynamicParams = true;

export async function generateStaticParams() {
  return getAllUslugi()
    .filter((p) => isPrimaryProductSlug(p.slug))
    .map((p) => ({ category: p.category, slug: p.slug }));
}


export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug, category } = await params;
  const normalized = slug.trim().toLowerCase();
  const raw = getUslugaBySlug(normalized);
  if (!raw) return { title: "Nie znaleziono" };

  const primarySlug = getPrimarySlugForProduct(normalized);
  const pismo = getStoreProductBySlug(normalized);
  if (!pismo) return { title: "Nie znaleziono" };

  const isPrimary = isPrimaryProductSlug(normalized);
  const canonicalPath = `/uslugi/${pismo.category}/${primarySlug}`;
  const meta = buildMetaFromTemplate("pdp", {
    seoTitle: pismo.seoTitle,
    productName: pismo.seoTitle,
    branch: pismo.branch ?? "Twojej firmy",
    scopeShort: clipAtWord(pismo.shortDesc, 95),
    priceFormatted: formatPricePln(pismo.priceGrosze),
    deliveryDays: "7–14",
  });

  return {
    title: meta.title,
    description: meta.description,
    keywords: [pismo.seoTitle, category, "strona internetowa", "WordPress", "sklep internetowy"].filter(Boolean),
    alternates: { canonical: canonicalPath },
    ...(isPrimary
      ? {}
      : {
          robots: { index: false, follow: true },
        }),
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: canonicalPath,
      type: "website",
    },
  };
}

export default async function UslugaPage({ params }: Props) {
  const { category, slug } = await params;
  const raw = getUslugaBySlug(slug);
  if (!raw) notFound();

  const primarySlug = getPrimarySlugForProduct(slug);
  if (primarySlug !== slug) {
    redirect(`/uslugi/${raw.category}/${primarySlug}`);
  }

  const pismo = getStoreProductBySlug(slug);
  if (!pismo) notFound();

  const cat = CATEGORIES.find((c) => c.slug === category) ?? CATEGORIES.find((c) => c.slug === pismo.category);
  const cfg = getCategoryConfig(pismo.category) ?? CATEGORY_CONFIGS[0];
  const a = cfg ? (ACCENT_STYLES[cfg.accent] ?? ACCENT_STYLES.slate) : ACCENT_STYLES.slate;
  const CategoryIcon = cfg?.icon;
  const related = getUslugiByCategory(pismo.category, 8).filter((p) => p.slug !== pismo.slug).slice(0, 3);

  const longDesc = buildProductLongDesc(pismo, cfg);
  const whatYouGet = buildWhatYouGet(pismo, cfg);
  const forWhom = buildForWhom(pismo, cfg);
  const process = buildProcess(pismo, cfg);
  const faq = buildProductFaq(pismo, cfg);
  const delivery = buildDeliveryContent(pismo);

  // Rolling validity ~1 year out so the price offer never silently expires in
  // Google's eyes (priceValidUntil is required for the price rich result).
  const priceValidUntil = `${new Date().getFullYear() + 1}-12-31`;

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: pismo.seoTitle,
    description: pismo.shortDesc,
    brand: { "@type": "Brand", name: "stronyodzaraz.pl" },
    offers: {
      "@type": "Offer",
      url: `/uslugi/${pismo.category}/${pismo.slug}`,
      price: (pismo.priceGrosze / 100).toFixed(2),
      priceCurrency: "PLN",
      priceValidUntil,
      availability: "https://schema.org/InStock",
      seller: { "@type": "Organization", name: "stronyodzaraz.pl" },
    },
    category: cat?.title ?? pismo.category,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Strona główna", item: "/" },
      { "@type": "ListItem", position: 2, name: "Usługi", item: "/uslugi" },
      ...(cat ? [{ "@type": "ListItem", position: 3, name: cat.title, item: `/uslugi/${cat.slug}` }] : []),
      { "@type": "ListItem", position: cat ? 4 : 3, name: pismo.seoTitle, item: `/uslugi/${pismo.category}/${pismo.slug}` },
    ],
  };

  const upsell = getUpsellForProduct(pismo.slug, pismo.category);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      {/* HERO */}
      <section className={`bg-gradient-to-br ${a.gradient}`}>
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-8 text-xs text-slate-500">
            <Link href="/" className="hover:text-slate-900">Strona główna</Link>
            <span className="mx-1.5">/</span>
            <Link href="/uslugi" className="hover:text-slate-900">Usługi</Link>
            {cat && (
              <>
                <span className="mx-1.5">/</span>
                <Link href={`/uslugi/${cat.slug}`} className="hover:text-slate-900">{cat.title}</Link>
              </>
            )}
            <span className="mx-1.5">/</span>
            <span className="text-slate-700">{pismo.seoTitle}</span>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-start lg:gap-14">
            {/* LEFT */}
            <div className="animate-fade-up">
              <div className="flex items-center gap-3">
                {CategoryIcon && (
                  <span className={`inline-flex h-11 w-11 items-center justify-center rounded-2xl ${a.iconBg} text-white shadow-sm`}>
                    <CategoryIcon className="h-5 w-5" aria-hidden />
                  </span>
                )}
                {cat && (
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ${a.badge} ${a.badgeText}`}>
                    {cat.title}
                  </span>
                )}
              </div>

              <h1 className="mt-5 text-3xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-[2.5rem] lg:leading-[1.15]">
                {pismo.seoTitle}
              </h1>

              {cfg?.tagline && (
                <p className="mt-3 text-base font-medium text-slate-700">{cfg.tagline}</p>
              )}

              <p className="mt-4 text-slate-600 leading-7">{pismo.shortDesc}</p>

              {/* Trust pills */}
              <ul className="mt-6 flex flex-wrap gap-2">
                {TRUST_PILLS_WEB.map(({ icon: Icon, text }) => (
                  <li
                    key={text}
                    className="inline-flex items-center gap-2 rounded-full border border-slate-200/80 bg-white/80 px-3.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm backdrop-blur-sm"
                  >
                    <Icon className="h-3.5 w-3.5 shrink-0 text-brand-600" aria-hidden />
                    {text}
                  </li>
                ))}
              </ul>
            </div>

            {/* RIGHT sticky buy card */}
            <div className="animate-fade-up animation-delay-200 lg:sticky lg:top-24">
              <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-lg ring-1 ring-slate-100">
                <BriefMockup title={pismo.seoTitle} />
                <div className="p-6 sm:p-7">
                <div className="mb-5">
                  <span className="text-3xl font-extrabold tracking-tight text-slate-900">{formatPrice(pismo.priceGrosze)}</span>
                </div>
                <AddToCartBox
                  slug={pismo.slug}
                  title={pismo.seoTitle}
                  category={pismo.category}
                  priceGrosze={pismo.priceGrosze}
                />
                <PdpShowcaseLink pdpSlug={pismo.slug} category={pismo.category} />
                {upsell && <UpsellBox offer={upsell} />}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TABS — Opis, Co zawiera, Jak to działa, Dostawa, Dla kogo, FAQ */}
      <ProductTabs
        title={pismo.seoTitle}
        longDesc={longDesc}
        tagline={cfg?.tagline}
        whatYouGet={whatYouGet}
        forWhom={forWhom}
        process={process}
        faq={faq}
        delivery={delivery}
        checkColor={a.checkColor}
        badgeClass={a.badge}
        badgeTextClass={a.badgeText}
        iconBgClass={a.iconBg}
      />

      <ProductReviews />

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-slate-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
            <h2 className="mb-8 text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">Podobne pakiety</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((p) => {
                const relCfg = CATEGORY_CONFIGS.find((c) => c.slug === p.category);
                const relCat = CATEGORIES.find((c) => c.slug === p.category);
                const ra = relCfg ? (RELATED_ACCENT_STYLES[relCfg.accent] ?? RELATED_ACCENT_STYLES.slate) : RELATED_ACCENT_STYLES.slate;
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
          </div>
        </section>
      )}
    </>
  );
}
