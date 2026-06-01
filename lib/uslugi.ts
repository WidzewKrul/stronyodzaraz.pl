import fs from "node:fs";
import path from "node:path";
import {
  buildCurationIndex,
  getPrimarySlugForProduct as resolvePrimarySlug,
  type CurationIndex,
} from "./catalog-curation";
import { normalizePrimaryProduct } from "./complete-kit";
import { buildSeoShortDesc, buildSeoTitle } from "./product-seo";

const SOURCE_FILE_PATH = path.join(process.cwd(), "docs", "services-catalog.json");

type RawProduct = {
  slug: string;
  title: string;
  category: string;
  categoryLabel?: string;
  subcategory?: string;
  branch?: string;
  priceGrosze?: number;
  tags?: string[];
};

export interface Usluga {
  slug: string;
  title: string;
  seoTitle: string;
  shortDesc: string;
  longDesc: string;
  priceGrosze: number;
  currency: "PLN";
  category: string;
  branch?: string;
  tags: string[];
}

export type UslugaCategory = {
  slug: string;
  title: string;
  description: string;
};

export const CATEGORIES: UslugaCategory[] = [
  { slug: "strony-internetowe", title: "Strony internetowe", description: "Profesjonalne strony WordPress, landing page i strony firmowe dla polskich firm B2B i B2C" },
  { slug: "sklepy-internetowe", title: "Sklepy internetowe", description: "Sklepy WooCommerce, Shopify i Shoper — od zera, z polskimi płatnościami i kurierami" },
  { slug: "wordpress", title: "WordPress", description: "Wdrożenie, motywy, wtyczki, SEO i optymalizacja WordPress dla firm" },
  { slug: "shopify-shoper", title: "Shopify i Shoper", description: "Sklepy Shopify i Shoper z integracjami InPost, BLIK, Allegro i polskim fakturowaniem" },
  { slug: "reklama-marketing", title: "Reklama i marketing", description: "Google Ads, Meta Ads, Google Analytics 4 — setup kampanii i analityki" },
  { slug: "opieka-techniczna", title: "Opieka techniczna", description: "Abonament WordPress, backup, aktualizacje, monitoring i wsparcie techniczne" },
  { slug: "integracje", title: "Integracje", description: "WooCommerce + Przelewy24, Shopify + InPost, BaseLinker, Google Merchant Center" },
  { slug: "migracje-naprawy", title: "Migracje i naprawy", description: "Migracja sklepu, naprawa WordPress, przyspieszenie strony, audyt bezpieczeństwa" },
];

function buildLongDescription(title: string, category: string, branch?: string): string {
  const b = branch ?? "Twojej firmy";
  const templates: Record<string, string> = {
    "strony-internetowe": `${title} — profesjonalna strona internetowa dla ${b}. WordPress, responsywność, SSL, formularz kontaktowy i Google Analytics 4 w cenie pakietu.\n\nStawiamy strony od zera — projekt, wdrożenie, testy i uruchomienie. Nie musisz znać się na technologii: podajesz brief po zakupie (logo, kolory, treści), my budujemy i oddajemy gotową stronę w ustalonym terminie.\n\nPakiet obejmuje: konfigurację hostingu, instalację WordPress, motyw dopasowany do branży, podstawowe SEO on-page, szkolenie z panelu administracyjnego.`,
    "sklepy-internetowe": `${title} — kompletny sklep internetowy dla ${b}. Polskie płatności (Przelewy24, BLIK, PayU), kurierzy (InPost, DPD), fakturowanie i panel zamówień.\n\nBudujemy sklep od zera: produkty, kategorie, płatności, wysyłka, regulamin sklepu i polityka prywatności. Po wdrożeniu szkolimy z obsługi panelu — możesz sam dodawać produkty i zarządzać zamówieniami.\n\nRealizacja 7–14 dni roboczych w zależności od pakietu. Gwarancja poprawek 30 dni po oddaniu projektu.`,
    wordpress: `${title} — wdrożenie i konfiguracja WordPress dla ${b}. Instalacja, motyw, wtyczki, bezpieczeństwo, backup i optymalizacja wydajności.\n\nWordPress to najpopularniejsza platforma w Polsce — pełna kontrola nad treścią, najlepsze SEO i natywne integracje z polskim rynkiem (PayU, Przelewy24, InPost).`,
    "shopify-shoper": `${title} — sklep na platformie SaaS dla ${b}. Szybki start, stabilny hosting, polskie płatności i integracje kurierskie.\n\nShopify i Shoper to platformy subskrypcyjne — nie musisz dbać o serwer, aktualizacje ani bezpieczeństwo infrastruktury. My konfigurujemy wszystko od A do Z.`,
    "reklama-marketing": `${title} — profesjonalny setup kampanii reklamowej dla ${b}. Konto Google Ads / Meta Ads, konwersje, pierwsza kampania i raport wyników.\n\nNie zostawiamy Cię z pustym kontem — konfigurujemy tracking, tworzymy strukturę kampanii i przekazujemy dokumentację.`,
    "opieka-techniczna": `${title} — abonamentowa opieka techniczna dla ${b}. Backup codzienny, aktualizacje wtyczek, monitoring uptime, wsparcie mailowe.\n\nTwoja strona lub sklep pod stałą opieką — nie musisz martwić się o aktualizacje, hacki ani awarie.`,
    integracje: `${title} — profesjonalna integracja systemów dla ${b}. Konfiguracja, testy płatności/wysyłki, dokumentacja.\n\nPolskie integracje e-commerce wymagają doświadczenia — źle skonfigurowana bramka płatności to utracone zamówienia.`,
    "migracje-naprawy": `${title} — migracja lub naprawa dla ${b}. Przeniesienie danych, przekierowania 301, testy, hardening bezpieczeństwa.\n\nBezpieczna migracja bez utraty SEO i zamówień. Przy naprawie — audyt, cleanup malware, aktualizacja i zabezpieczenie.`,
  };
  return templates[category] ?? templates["strony-internetowe"];
}

let _fullCache: Usluga[] | null = null;
let _curationCache: CurationIndex | null = null;

function loadFullCatalog(): Usluga[] {
  if (_fullCache) return _fullCache;
  const raw = fs.readFileSync(SOURCE_FILE_PATH, "utf8");
  const items = JSON.parse(raw) as RawProduct[];
  _fullCache = items
    .filter((item) => item.slug && item.title)
    .map((item) => {
      const title = item.title.trim();
      const category = item.category || "strony-internetowe";
      const branch = item.branch?.trim() || undefined;
      const seoTitle = buildSeoTitle(title, category);
      const base = {
        slug: item.slug.trim().toLowerCase(),
        title,
        seoTitle,
        priceGrosze: item.priceGrosze ?? 249000,
        currency: "PLN" as const,
        category,
        branch,
        tags: item.tags ?? [category],
      };
      return {
        ...base,
        shortDesc: buildSeoShortDesc(base),
        longDesc: buildLongDescription(title, category, branch),
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title, "pl"));
  return _fullCache;
}

function getCurationIndex(): CurationIndex {
  if (!_curationCache) {
    const raw = buildCurationIndex(loadFullCatalog());
    _curationCache = {
      ...raw,
      primaryProducts: raw.primaryProducts.map(normalizePrimaryProduct),
    };
  }
  return _curationCache;
}

export function getAllUslugi(): Usluga[] {
  return getCurationIndex().primaryProducts;
}

export function getUslugaBySlug(slug: string): Usluga | null {
  return loadFullCatalog().find((p) => p.slug === slug.trim().toLowerCase()) ?? null;
}

export function getStoreProductBySlug(slug: string): Usluga | null {
  const primarySlug = getPrimarySlugForProduct(slug);
  return getAllUslugi().find((p) => p.slug === primarySlug) ?? null;
}

export function getPrimarySlugForProduct(slug: string): string {
  return resolvePrimarySlug(slug, getCurationIndex());
}

export function isPrimaryProductSlug(slug: string): boolean {
  return getCurationIndex().primarySlugs.has(slug.trim().toLowerCase());
}

export function getUslugiByCategory(category: string, limit?: number): Usluga[] {
  const results = getAllUslugi().filter((p) => p.category === category);
  return limit ? results.slice(0, limit) : results;
}

export function searchUslugi(query: string, category?: string): Usluga[] {
  const q = query.toLowerCase().trim();
  let items = getAllUslugi();
  if (category) items = items.filter((p) => p.category === category);
  if (!q) return items;
  return items.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.seoTitle.toLowerCase().includes(q) ||
      (p.branch?.toLowerCase().includes(q) ?? false) ||
      p.slug.includes(q),
  );
}

export function getCategoryCounts(): Array<{ category: string; count: number }> {
  const counts = new Map<string, number>();
  for (const p of getAllUslugi()) {
    counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
  }
  return Array.from(counts.entries())
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);
}

export function getCuratedProductCount(): number {
  return getAllUslugi().length;
}
