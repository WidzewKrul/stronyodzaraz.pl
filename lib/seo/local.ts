import fs from "node:fs";
import path from "node:path";

export type CityTier = "A" | "B" | "C";

export type CityEntry = {
  name: string;
  slug: string;
  tier: CityTier;
  voivodeship: string;
  populationRank: number;
};

type CitiesTierFile = {
  tiers: {
    A: { categories: string[] };
  };
  cities: CityEntry[];
};

type LocalTemplatesFile = {
  cityGenitive: Record<string, string>;
  cityLocative: Record<string, string>;
  hubIntro: string[];
  categoryIntro: Record<string, string[]>;
  localFaq: Array<{ q: string; a: string }>;
  priceFromByCategory: Record<string, string>;
};

export type CityContext = {
  slug: string;
  context: string;
  sectors: string[];
  faq: Array<{ q: string; a: string }>;
};

type CityContextFile = { cities: CityContext[] };

let citiesCache: CitiesTierFile | null = null;
let templatesCache: LocalTemplatesFile | null = null;
let cityContextCache: Map<string, CityContext> | null = null;

function loadCitiesFile(): CitiesTierFile {
  if (citiesCache) return citiesCache;
  const filePath = path.join(process.cwd(), "docs", "seo", "cities-tier.json");
  citiesCache = JSON.parse(fs.readFileSync(filePath, "utf8")) as CitiesTierFile;
  return citiesCache;
}

function loadLocalTemplates(): LocalTemplatesFile {
  if (templatesCache) return templatesCache;
  const filePath = path.join(process.cwd(), "docs", "seo", "local-templates.json");
  templatesCache = JSON.parse(fs.readFileSync(filePath, "utf8")) as LocalTemplatesFile;
  return templatesCache;
}

export function getTierACities(): CityEntry[] {
  return loadCitiesFile().cities.filter((c) => c.tier === "A");
}

export function getCityBySlug(slug: string): CityEntry | undefined {
  const normalized = slug.trim().toLowerCase();
  return loadCitiesFile().cities.find((c) => c.slug === normalized);
}

export function getLocalCategories(): string[] {
  return loadCitiesFile().tiers.A.categories;
}

function hashString(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
  return h;
}

function pickRotated<T>(items: T[], seed: string): T {
  return items[hashString(seed) % items.length]!;
}

function fillLocalTemplate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? "");
}

export function getCityGenitive(city: CityEntry): string {
  const tpl = loadLocalTemplates();
  return tpl.cityGenitive[city.name] ?? city.name;
}

export function getCityLocative(city: CityEntry): string {
  const tpl = loadLocalTemplates();
  return tpl.cityLocative[city.name] ?? city.name;
}

/** Wspólny zestaw odmienionych form miasta do wypełniania szablonów PL. */
function cityVars(city: CityEntry): Record<string, string> {
  return {
    city: city.name,
    cityGenitive: getCityGenitive(city),
    cityLocative: getCityLocative(city),
    voivodeship: city.voivodeship,
  };
}

export function getHubIntro(city: CityEntry): string {
  const tpl = loadLocalTemplates();
  const raw = pickRotated(tpl.hubIntro, city.slug);
  return fillLocalTemplate(raw, cityVars(city));
}

export function getCategoryIntro(city: CityEntry, categorySlug: string): string {
  const tpl = loadLocalTemplates();
  const variants = tpl.categoryIntro[categorySlug] ?? tpl.categoryIntro["strony-internetowe"] ?? [];
  const priceFrom = tpl.priceFromByCategory[categorySlug] ?? "2490";
  const vars = {
    ...cityVars(city),
    categoryTitle: categorySlug,
    priceFrom,
  };
  const raw = pickRotated(variants, `${city.slug}:${categorySlug}`);
  return fillLocalTemplate(raw, vars);
}

export function getLocalFaq(city: CityEntry): Array<{ q: string; a: string }> {
  const tpl = loadLocalTemplates();
  const vars = cityVars(city);
  return tpl.localFaq.map((item) => ({
    q: fillLocalTemplate(item.q, vars),
    a: fillLocalTemplate(item.a, vars),
  }));
}

export function getPriceFromForCategory(categorySlug: string): string {
  const tpl = loadLocalTemplates();
  return tpl.priceFromByCategory[categorySlug] ?? "2490";
}

function loadCityContext(): Map<string, CityContext> {
  if (cityContextCache) return cityContextCache;
  const filePath = path.join(process.cwd(), "docs", "seo", "city-context.json");
  const parsed = JSON.parse(fs.readFileSync(filePath, "utf8")) as CityContextFile;
  cityContextCache = new Map(parsed.cities.map((c) => [c.slug, c]));
  return cityContextCache;
}

/** Unikalny lokalny kontekst (profil gospodarczy, branże, FAQ) dla miasta Tier-A. */
export function getCityContext(slug: string): CityContext | null {
  return loadCityContext().get(slug.trim().toLowerCase()) ?? null;
}

export function getLocalCityCategoryFaq(
  city: CityEntry,
  categoryTitle: string
): Array<{ q: string; a: string }> {
  const genitive = getCityGenitive(city);
  const locative = getCityLocative(city);
  const ctx = getCityContext(city.slug);
  const topSector = ctx?.sectors[0];
  const faq = [
    {
      q: `Ile kosztuje ${categoryTitle.toLowerCase()} w ${locative}?`,
      a: `Ta sama cena co w katalogu krajowym — bez dopłaty lokalnej. Pakiety od ${getPriceFromForCategory("strony-internetowe")} zł, realizacja 7–14 dni zdalnie.`,
    },
    {
      q: `Czy obsługujecie firmy z ${genitive}?`,
      a: `Tak — realizujemy projekty zdalnie dla klientów z ${genitive} i woj. ${city.voivodeship}. Brief online, wdrożenie bez spotkań stacjonarnych.`,
    },
  ];
  // Lokalne, branżowe pytanie — różne dla każdego miasta (sektor) i kategorii.
  if (topSector) {
    faq.push({
      q: `Realizujecie ${categoryTitle.toLowerCase()} dla branży ${topSector}?`,
      a: `Tak — w ${locative} obsługujemy m.in. firmy z branż ${(ctx?.sectors ?? []).slice(0, 3).join(", ")}. Pakiet dobieramy do specyfiki Twojego sektora, scope ustalamy w briefie po zakupie.`,
    });
  }
  return faq;
}

// Ujęcie kategorii pod konkretną branżę — łączone z sektorami danego miasta,
// żeby każda strona /l/{city}/{category} miała unikalną, użyteczną treść główną
// (różne sektory per miasto × różne ujęcie per kategoria).
const CATEGORY_USECASE: Record<string, { noun: string; value: string }> = {
  "strony-internetowe": { noun: "Strona firmowa", value: "responsywna, z formularzem leadowym i SEO on-page" },
  "sklepy-internetowe": { noun: "Sklep WooCommerce", value: "z Przelewy24, BLIK i InPost, gotowy do skalowania sprzedaży" },
  wordpress: { noun: "Wdrożenie WordPress", value: "elastyczny CMS, który aktualizujesz samodzielnie po szkoleniu" },
  "shopify-shoper": { noun: "Sklep na Shopify lub Shoper", value: "szybki start sprzedaży online bez technicznej obsługi" },
  "opieka-techniczna": { noun: "Opieka techniczna", value: "backup, aktualizacje wtyczek i monitoring bezpieczeństwa" },
  "reklama-marketing": { noun: "Kampania Google Ads i GA4", value: "pozyskiwanie klientów z wyszukiwarki od pierwszego tygodnia" },
  integracje: { noun: "Integracje e-commerce", value: "połączenie sklepu z płatnościami PL, kurierami i BaseLinker" },
  "migracje-naprawy": { noun: "Migracja i naprawa", value: "przeniesienie bez utraty pozycji w Google, naprawa po awarii" },
};

/** Zdania use-case łączące kategorię z realnymi sektorami danego miasta. */
export function getCityCategoryUseCases(city: CityEntry, categorySlug: string): string[] {
  const ctx = getCityContext(city.slug);
  const frame = CATEGORY_USECASE[categorySlug] ?? CATEGORY_USECASE["strony-internetowe"];
  return (ctx?.sectors ?? []).slice(0, 4).map(
    (sector) => `${frame.noun} — ${frame.value}. Dla firm z branży ${sector}.`
  );
}
