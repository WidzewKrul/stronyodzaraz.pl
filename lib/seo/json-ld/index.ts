import type { Usluga } from "@/lib/uslugi";
import { siteUrl } from "@/lib/env";

const BASE = siteUrl();

// Stable @id for the single Organization entity. Every other node that needs to
// reference "the business" (Service provider, blog publisher) points here via
// { "@id": ORG_ID } instead of redefining the org — so Google merges them into one
// entity instead of seeing hundreds of near-duplicate business nodes.
export const ORG_ID = `${BASE}/#organization`;
const LOGO_URL = `${BASE}/images/brand/logo-mark.webp`;

export function buildProductJsonLd(pismo: Usluga, categoryTitle?: string) {
  const url = `${BASE}/uslugi/${pismo.category}/${pismo.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: pismo.seoTitle,
    description: pismo.shortDesc,
    sku: pismo.slug,
    url,
    brand: { "@type": "Brand", name: "stronyodzaraz.pl" },
    offers: {
      "@type": "Offer",
      price: (pismo.priceGrosze / 100).toFixed(2),
      priceCurrency: "PLN",
      availability: "https://schema.org/InStock",
      priceValidUntil: `${new Date().getFullYear() + 1}-12-31`,
      url,
      seller: { "@type": "Organization", name: "stronyodzaraz.pl" },
    },
    category: categoryTitle ?? pismo.category,
  };
}

export function buildBreadcrumbJsonLd(
  items: Array<{ name: string; item: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((entry, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: entry.name,
      item: entry.item.startsWith("http") ? entry.item : `${BASE}${entry.item}`,
    })),
  };
}

export function buildFaqJsonLd(faq: Array<{ q: string; a: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function buildBlogPostingJsonLd(post: {
  title: string;
  excerpt: string;
  publishedAt: string;
  slug: string;
  dateModified?: string;
  image?: string;
}) {
  const url = `${BASE}/blog/${post.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.dateModified ?? post.publishedAt,
    url,
    image: post.image ?? `${BASE}/opengraph-image`,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    author: { "@type": "Organization", name: "stronyodzaraz.pl", url: BASE },
    publisher: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "stronyodzaraz.pl",
      url: BASE,
      logo: { "@type": "ImageObject", url: LOGO_URL },
    },
  };
}

// Honest schema for a remote-only business: a Service offered in a given city,
// with the provider pointing at the single Organization entity (no fabricated
// address / LocalBusiness node per city).
export function buildLocalServiceJsonLd(cityName: string, cityGenitive?: string) {
  const genitive = cityGenitive ?? cityName;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Tworzenie stron i sklepów internetowych",
    name: `Strony i sklepy internetowe — ${cityName}`,
    description: `Strony i sklepy internetowe dla firm z ${genitive} — realizacja zdalna w całej Polsce, stała cena, 7–14 dni.`,
    provider: { "@type": "Organization", "@id": ORG_ID, name: "stronyodzaraz.pl", url: BASE },
    areaServed: { "@type": "City", name: cityName },
    url: BASE,
  };
}
