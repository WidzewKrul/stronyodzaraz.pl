import type { Usluga } from "@/lib/uslugi";

export function buildProductJsonLd(pismo: Usluga, categoryTitle?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: pismo.seoTitle,
    description: pismo.shortDesc,
    brand: { "@type": "Brand", name: "stronyodzaraz.pl" },
    offers: {
      "@type": "Offer",
      price: (pismo.priceGrosze / 100).toFixed(2),
      priceCurrency: "PLN",
      availability: "https://schema.org/InStock",
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
      item: entry.item,
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
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    url: `/blog/${post.slug}`,
    author: { "@type": "Organization", name: "stronyodzaraz.pl" },
    publisher: { "@type": "Organization", name: "stronyodzaraz.pl" },
  };
}

export function buildLocalBusinessJsonLd(cityName: string) {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "stronyodzaraz.pl",
    description: `Strony i sklepy internetowe dla firm z ${cityName} — realizacja zdalna w całej Polsce.`,
    url: "https://stronyodzaraz.pl",
    email: "kontakt@bblikh.pl",
    areaServed: {
      "@type": "City",
      name: cityName,
    },
    priceRange: "$$",
  };
}
