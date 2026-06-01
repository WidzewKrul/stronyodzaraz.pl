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
  hubIntro: string[];
  categoryIntro: Record<string, string[]>;
  localFaq: Array<{ q: string; a: string }>;
  priceFromByCategory: Record<string, string>;
};

let citiesCache: CitiesTierFile | null = null;
let templatesCache: LocalTemplatesFile | null = null;

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

export function getHubIntro(city: CityEntry): string {
  const tpl = loadLocalTemplates();
  const vars = {
    city: city.name,
    cityGenitive: getCityGenitive(city),
    voivodeship: city.voivodeship,
  };
  const raw = pickRotated(tpl.hubIntro, city.slug);
  return fillLocalTemplate(raw, vars);
}

export function getCategoryIntro(city: CityEntry, categorySlug: string): string {
  const tpl = loadLocalTemplates();
  const variants = tpl.categoryIntro[categorySlug] ?? tpl.categoryIntro["strony-internetowe"] ?? [];
  const priceFrom = tpl.priceFromByCategory[categorySlug] ?? "2490";
  const vars = {
    city: city.name,
    cityGenitive: getCityGenitive(city),
    voivodeship: city.voivodeship,
    categoryTitle: categorySlug,
    priceFrom,
  };
  const raw = pickRotated(variants, `${city.slug}:${categorySlug}`);
  return fillLocalTemplate(raw, vars);
}

export function getLocalFaq(city: CityEntry): Array<{ q: string; a: string }> {
  const tpl = loadLocalTemplates();
  const vars = {
    city: city.name,
    cityGenitive: getCityGenitive(city),
    voivodeship: city.voivodeship,
  };
  return tpl.localFaq.map((item) => ({
    q: fillLocalTemplate(item.q, vars),
    a: fillLocalTemplate(item.a, vars),
  }));
}

export function getPriceFromForCategory(categorySlug: string): string {
  const tpl = loadLocalTemplates();
  return tpl.priceFromByCategory[categorySlug] ?? "2490";
}

export function getLocalCityCategoryFaq(
  city: CityEntry,
  categoryTitle: string
): Array<{ q: string; a: string }> {
  const vars = { city: city.name, voivodeship: city.voivodeship };
  return [
    {
      q: `Ile kosztuje ${categoryTitle.toLowerCase()} w ${city.name}?`,
      a: `Ta sama cena co w katalogu krajowym — bez dopłaty lokalnej. Pakiety od ${getPriceFromForCategory("strony-internetowe")} zł, realizacja 7–14 dni zdalnie.`,
    },
    {
      q: `Czy obsługujecie firmy z ${city.name}?`,
      a: fillLocalTemplate(
        "Tak — realizujemy projekty zdalnie dla klientów z {city} i woj. {voivodeship}. Brief online, wdrożenie bez spotkań stacjonarnych.",
        vars
      ),
    },
  ];
}
