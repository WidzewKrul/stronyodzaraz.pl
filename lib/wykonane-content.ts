import fs from "node:fs";
import path from "node:path";

export type WykonaneItem = {
  slug: string;
  category: string;
  tier: string;
  mockVariant: "browser" | "dashboard" | "flow" | "split";
  mockRef: string;
  title: string;
  fakeBrand: string;
  tagline: string;
  scopeOneLiner: string;
  scopeDelivered: string[];
  stack: string[];
  deliveryDays: string;
  priceFrom: number;
  priceNote?: string;
  pdpSlug: string;
  pdpCategory: string;
  relatedSlugs: string[];
  faq: Array<{ q: string; a: string }>;
};

type WykonaneCatalog = {
  meta: {
    hubTitle: string;
    hubSubtitle: string;
    disclaimer: string;
    stats: { showcaseCount: number; categoryCount: number; catalogRef: string };
  };
  filters: Array<{ id: string; label: string }>;
  items: WykonaneItem[];
  hubFaq: Array<{ q: string; a: string }>;
};

type WykonaneMocki = {
  disclaimer: string;
  browser: Record<string, BrowserMockData>;
  dashboard: Record<string, DashboardMockData>;
  flow: Record<string, FlowMockData>;
  split: Record<string, SplitMockData>;
};

export type BrowserMockData = {
  icon?: string;
  gradient: string;
  accentHex?: string;
  fakeBrand: string;
  fakeTagline?: string;
  browserUrl: string;
  nav: string[];
  hero: {
    headline: string;
    subline: string;
    ctaPrimary: string;
    ctaSecondary?: string;
  };
  sections: Array<Record<string, unknown>>;
};

export type DashboardMockData = {
  title: string;
  status: string;
  kpis: Array<{ label: string; value: string }>;
  main: Record<string, unknown>;
};

export type FlowMockData = {
  title: string;
  steps: Array<{ icon: string; label: string }>;
  footer: Record<string, unknown>;
};

export type SplitMockData = {
  title: string;
  before: { label: string; badges: string[]; issues: string[] };
  after: { label: string; badges: string[]; features: string[] };
  redirects: Array<{ from: string; to: string }>;
};

type PdpShowcaseMap = {
  defaultShowcase: string;
  map: Record<string, string>;
  byCategoryDefault: Record<string, string>;
};

let catalogCache: WykonaneCatalog | null = null;
let mockiCache: WykonaneMocki | null = null;
let pdpMapCache: PdpShowcaseMap | null = null;

function readJson<T>(relativePath: string): T {
  const filePath = path.join(process.cwd(), "docs", "content", relativePath);
  return JSON.parse(fs.readFileSync(filePath, "utf8")) as T;
}

function loadCatalog(): WykonaneCatalog {
  if (!catalogCache) {
    catalogCache = readJson<WykonaneCatalog>("wykonane-katalog.json");
  }
  return catalogCache;
}

function loadMocki(): WykonaneMocki {
  if (!mockiCache) {
    mockiCache = readJson<WykonaneMocki>("wykonane-mocki.json");
  }
  return mockiCache;
}

function loadPdpMap(): PdpShowcaseMap {
  if (!pdpMapCache) {
    pdpMapCache = readJson<PdpShowcaseMap>("pdp-showcase-map.json");
  }
  return pdpMapCache;
}

export function getWykonaneHubMeta() {
  return loadCatalog().meta;
}

export function getWykonaneFilters() {
  return loadCatalog().filters;
}

export function getWykonaneHubFaq() {
  return loadCatalog().hubFaq;
}

export function getAllWykonaneItems(): WykonaneItem[] {
  return loadCatalog().items;
}

export function getWykonaneBySlug(slug: string): WykonaneItem | undefined {
  return loadCatalog().items.find((i) => i.slug === slug.trim().toLowerCase());
}

export function getWykonaneByCategory(categoryId: string): WykonaneItem[] {
  if (categoryId === "all") return getAllWykonaneItems();
  return getAllWykonaneItems().filter((i) => i.category === categoryId);
}

export function getMockDisclaimer(): string {
  return loadMocki().disclaimer;
}

export function getBrowserMock(ref: string): BrowserMockData | undefined {
  return loadMocki().browser[ref];
}

export function getDashboardMock(ref: string): DashboardMockData | undefined {
  return loadMocki().dashboard[ref];
}

export function getFlowMock(ref: string): FlowMockData | undefined {
  return loadMocki().flow[ref];
}

export function getSplitMock(ref: string): SplitMockData | undefined {
  return loadMocki().split[ref];
}

export function getShowcaseSlugForPdp(pdpSlug: string, category?: string): string | undefined {
  const map = loadPdpMap();
  const normalized = pdpSlug.trim().toLowerCase();
  if (map.map[normalized]) return map.map[normalized];
  if (category && map.byCategoryDefault[category]) return map.byCategoryDefault[category];
  return map.defaultShowcase;
}

export const CATEGORY_LABELS: Record<string, string> = {
  "strony-internetowe": "Strony internetowe",
  "sklepy-internetowe": "Sklepy internetowe",
  wordpress: "WordPress",
  "shopify-shoper": "Shopify / Shoper",
  "reklama-marketing": "Reklama i marketing",
  "opieka-techniczna": "Opieka techniczna",
  integracje: "Integracje",
  migracje: "Migracje i naprawy",
};
