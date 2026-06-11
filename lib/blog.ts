import { loadDbBlogPosts } from "@/lib/blog-db";

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  readMinutes: number;
  tags: string[];
  bodyMd: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "ile-kosztuje-strona-internetowa-2026",
    title: "Ile kosztuje strona internetowa w 2026 — cennik i pakiety",
    excerpt: "Strona WordPress od 2 490 zł, Pro od 4 990 zł. Porównanie pakietów, co wchodzi w cenę i czego unikać u „tanich” wykonawców.",
    publishedAt: "2026-05-01",
    readMinutes: 8,
    tags: ["strony www", "cennik", "WordPress"],
    bodyMd: `## Ile kosztuje strona internetowa w Polsce w 2026

Profesjonalna strona firmowa kosztuje **2 490–4 990 zł** w modelu productized (pakiet Start/Pro). Agencje custom quote: 5 000–30 000 zł.

### Pakiet Start (2 490 zł)
WordPress, 5 podstron, responsywność, SSL, formularz, GA4. Realizacja 7 dni.

### Pakiet Pro (4 990 zł)
+ SEO on-page, blog, schema.org, 10 podstron, optymalizacja Core Web Vitals. Realizacja 14 dni.

### Co wpływa na cenę
- Liczba podstron i języków
- Sklep vs wizytówka
- Copywriting i zdjęcia stock
- Integracje (CRM, rezerwacje)

[Zobacz pakiety w katalogu](/uslugi?cat=strony-internetowe).`,
  },
  {
    slug: "shopify-vs-woocommerce-polska",
    title: "Shopify vs WooCommerce w Polsce — co wybrać w 2026",
    excerpt: "Porównanie kosztów, integracji PL (Przelewy24, InPost, Allegro) i SEO. Kiedy Shopify, kiedy WooCommerce.",
    publishedAt: "2026-05-03",
    readMinutes: 10,
    tags: ["Shopify", "WooCommerce", "e-commerce"],
    bodyMd: `## Shopify vs WooCommerce — szybkie podsumowanie

**WooCommerce (WordPress):** pełna kontrola, natywne integracje PL, najlepsze SEO. Wymaga hostingu i opieki technicznej.

**Shopify:** szybki start, stabilny hosting, mniej technicznej obsługi. Integracje PL przez aplikacje (dodatkowy koszt).

**Shoper:** polski SaaS, Allegro/InPost out-of-the-box — idealny na start na rynku krajowym.

[Pakiety sklepów](/uslugi?cat=sklepy-internetowe).`,
  },
  {
    slug: "wordpress-opieka-techniczna-po-co",
    title: "Opieka techniczna WordPress — po co płacić abonament",
    excerpt: "Backup, aktualizacje, monitoring — dlaczego samodzielna obsługa WP kończy się hackiem lub awarią sklepu.",
    publishedAt: "2026-05-05",
    readMinutes: 6,
    tags: ["WordPress", "opieka techniczna", "bezpieczeństwo"],
    bodyMd: `## Dlaczego opieka techniczna ma sens

WordPress wymaga regularnych aktualizacji wtyczek, motywu i core. Brak aktualizacji = luka bezpieczeństwa.

Abonament od **299 zł/mc** obejmuje: backup codzienny, aktualizacje, monitoring uptime, 2h supportu.

[Opieka techniczna](/uslugi?cat=opieka-techniczna).`,
  },
  {
    slug: "sklep-internetowy-od-zera-krok-po-kroku",
    title: "Sklep internetowy od zera — krok po kroku dla firmy",
    excerpt: "Od wyboru platformy po pierwsze zamówienie: domena, płatności, kurierzy, regulamin, Google Merchant Center.",
    publishedAt: "2026-05-07",
    readMinutes: 12,
    tags: ["sklep internetowy", "e-commerce", "poradnik"],
    bodyMd: `## 7 kroków do sklepu online

1. Wybór platformy (WooCommerce / Shopify / Shoper)
2. Domena i hosting
3. Produkty i kategorie
4. Płatności: Przelewy24, BLIK, PayU
5. Wysyłka: InPost, DPD
6. Regulamin + RODO
7. Test zamówienia end-to-end

Pakiet Sklep Start od **5 990 zł** — [katalog](/uslugi?cat=sklepy-internetowe).`,
  },
  {
    slug: "google-ads-dla-firm-lokalnych",
    title: "Google Ads dla firm lokalnych — setup od 990 zł",
    excerpt: "Jak skonfigurować kampanię Search i Performance Max z konwersjami — bez przepalania budżetu.",
    publishedAt: "2026-05-10",
    readMinutes: 7,
    tags: ["Google Ads", "marketing", "B2B"],
    bodyMd: `## Google Ads setup — co robimy w pakiecie 990 zł

- Konto Google Ads + link z GA4
- Konfiguracja konwersji (zakup, formularz, telefon)
- Struktura kampanii Search
- Raport startowy

[Pakiet Google Ads](/uslugi?cat=reklama-marketing).`,
  },
  {
    slug: "integracja-woocommerce-przelewy24-inpost",
    title: "WooCommerce + Przelewy24 + InPost — jak podłączyć",
    excerpt: "Konfiguracja polskich płatności i paczkomatów w sklepie WooCommerce — typowe błędy i testy.",
    publishedAt: "2026-05-12",
    readMinutes: 8,
    tags: ["WooCommerce", "integracje", "InPost"],
    bodyMd: `## Integracja krok po kroku

1. Konto Przelewy24 + weryfikacja sklepu
2. Wtyczka WooCommerce Przelewy24
3. InPost — metoda wysyłki + mapa paczkomatów
4. Test płatności sandbox → produkcja

[Pakiet integracji od 490 zł](/uslugi?cat=integracje).`,
  },
  {
    slug: "migracja-sklepu-bez-utraty-seo",
    title: "Migracja sklepu bez utraty SEO — przekierowania 301",
    excerpt: "Przeniesienie z Shoper na WooCommerce (lub odwrotnie) — produkty, URL-e, Google Search Console.",
    publishedAt: "2026-05-15",
    readMinutes: 9,
    tags: ["migracja", "SEO", "e-commerce"],
    bodyMd: `## Migracja sklepu — checklist

- Eksport produktów i klientów
- Mapowanie starych URL → nowe (301)
- Test płatności i wysyłki
- Zmiana domeny w GSC

[Pakiet migracji od 1 990 zł](/uslugi?cat=migracje-naprawy).`,
  },
  {
    slug: "core-web-vitals-wordpress-przyspieszenie",
    title: "Core Web Vitals WordPress — jak przyspieszyć stronę",
    excerpt: "LCP, INP, CLS — cache, obrazy WebP, lazy load, hosting. Pakiet optymalizacji od 790 zł.",
    publishedAt: "2026-05-18",
    readMinutes: 8,
    tags: ["WordPress", "CWV", "performance"],
    bodyMd: `## Przyspieszenie WordPress

- Cache (LiteSpeed / WP Rocket)
- WebP + lazy load obrazów
- Minimalizacja wtyczek
- CDN dla statycznych assetów

[Pakiet przyspieszenia](/uslugi?cat=migracje-naprawy).`,
  },
  {
    slug: "strona-www-dla-restauracji-co-musi-miec",
    title: "Strona WWW dla restauracji — co musi mieć",
    excerpt: "Menu online, rezerwacje, mapa, SEO lokalne, integracja z Google Maps i social media.",
    publishedAt: "2026-05-20",
    readMinutes: 6,
    tags: ["restauracja", "strony www", "branża"],
    bodyMd: `## Must-have strony restauracji

- Menu z cenami (aktualne!)
- Godziny otwarcia + mapa Google
- Rezerwacje (formularz lub integracja)
- Zdjęcia lokalu i dań
- Mobile-first (80% ruchu z telefonu)

[Strony dla gastronomii](/uslugi/strony-internetowe).`,
  },
  {
    slug: "productized-services-agencja-web",
    title: "Productized services — dlaczego agencja z fixed price wygrywa",
    excerpt: "Koniec z „wyceń projekt”. Jasny scope, stała cena, szybsza decyzja zakupowa — model stronyodzaraz.pl.",
    publishedAt: "2026-05-25",
    readMinutes: 5,
    tags: ["biznes", "agencja", "B2B"],
    bodyMd: `## Productized services w agencji web

Zamiast tygodni wycen i negocjacji — **pakiet z ceną online**. Klient wie co dostaje, ile płaci, kiedy oddajemy.

To skraca sales cycle z tygodni do minut (Stripe checkout).

[Przeglądaj pakiety](/uslugi).`,
  },
];

async function mergeBlogPosts(): Promise<BlogPost[]> {
  const generated = await loadDbBlogPosts();
  const slugs = new Set(BLOG_POSTS.map((p) => p.slug));
  return [...BLOG_POSTS, ...generated.filter((p) => !slugs.has(p.slug))].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
  );
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return mergeBlogPosts();
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return (await mergeBlogPosts()).find((p) => p.slug === slug);
}

/** Alias for blog pages */
export async function getAllBlogPostsForRoutes(): Promise<BlogPost[]> {
  return mergeBlogPosts();
}

/** @deprecated use getAllBlogPostsForRoutes() */
export const POSTS = BLOG_POSTS;

export async function getPost(slug: string): Promise<BlogPost | undefined> {
  return getBlogPostBySlug(slug);
}
