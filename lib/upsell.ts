import fs from "node:fs";
import path from "node:path";
import { getUslugaBySlug } from "@/lib/uslugi";

type UpsellRule = { upsellSlug: string; oneLiner: string };

type UpsellMapFile = {
  rules: { maxUpsellsPerPdp: number; fallbackSlug: string; fallbackCategory: string };
  map: Record<string, UpsellRule>;
  defaultByCategory: Record<string, UpsellRule>;
};

export type UpsellOffer = {
  slug: string;
  category: string;
  title: string;
  priceGrosze: number;
  oneLiner: string;
};

const MAP_PATH = path.join(process.cwd(), "docs", "content", "upsell-map.json");

let _map: UpsellMapFile | null = null;

function loadMap(): UpsellMapFile {
  if (_map) return _map;
  _map = JSON.parse(fs.readFileSync(MAP_PATH, "utf8")) as UpsellMapFile;
  return _map;
}

function normalizeCategory(category: string): string {
  if (category === "migracje") return "migracje-naprawy";
  return category;
}

function resolveRule(productSlug: string, category: string): UpsellRule {
  const data = loadMap();
  const cat = normalizeCategory(category);
  return (
    data.map[productSlug] ??
    data.defaultByCategory[cat] ??
    data.defaultByCategory[category] ?? {
      upsellSlug: data.rules.fallbackSlug,
      oneLiner: "Opieka techniczna po wdrożeniu — od 299 zł/mc.",
    }
  );
}

/** Max 1 upsell per PDP — complementary package from upsell-map.json */
export function getUpsellForProduct(productSlug: string, category: string): UpsellOffer | null {
  const rule = resolveRule(productSlug.trim().toLowerCase(), category);
  const product = getUslugaBySlug(rule.upsellSlug);
  if (!product) return null;
  if (product.slug === productSlug.trim().toLowerCase()) return null;

  return {
    slug: product.slug,
    category: product.category,
    title: product.seoTitle,
    priceGrosze: product.priceGrosze,
    oneLiner: rule.oneLiner,
  };
}
