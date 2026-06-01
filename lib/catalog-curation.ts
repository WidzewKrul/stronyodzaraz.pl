import type { Usluga } from "./uslugi";

export type CurationIndex = {
  primaryProducts: Usluga[];
  slugToPrimary: Map<string, string>;
  primarySlugs: Set<string>;
};

export function extractBranch(pismo: Pick<Usluga, "title" | "branch">): string {
  if (pismo.branch?.trim()) return pismo.branch.trim();
  const dash = pismo.title.indexOf(" — ");
  if (dash > 0) return pismo.title.slice(dash + 3).trim().replace(/ — pakiet .+$/, "").replace(/ — .+$/, "");
  const dla = pismo.title.match(/dla (.+?)(?: —|$)/i);
  if (dla) return dla[1].trim();
  return pismo.title.trim();
}

/** Lower score = higher priority when picking primary product per branch group. */
export function productTypePriority(title: string, slug: string): number {
  const t = `${title} ${slug}`.toLowerCase();
  if (t.includes("pakiet kompletny") || t.includes("pakiet pro") || t.includes("— pakiet pro")) return 1;
  if (t.includes("pakiet start") || t.includes("— pakiet start")) return 2;
  if (t.includes("wdrożenie") || t.includes("wdrozenie")) return 3;
  if (t.includes("pro")) return 4;
  if (t.includes("start")) return 5;
  if (t.includes("abonament")) return 6;
  if (t.includes("integracja")) return 7;
  if (t.includes("migracja")) return 8;
  if (t.includes("setup")) return 9;
  return 99;
}

export function buildCurationIndex(products: Usluga[]): CurationIndex {
  const groups = new Map<string, Usluga[]>();

  for (const p of products) {
    const branch = extractBranch(p);
    const key = `${p.category}::${branch.toLowerCase()}`;
    const list = groups.get(key) ?? [];
    list.push(p);
    groups.set(key, list);
  }

  const primarySlugs = new Set<string>();
  const slugToPrimary = new Map<string, string>();
  const primaryProducts: Usluga[] = [];

  for (const group of groups.values()) {
    const sorted = [...group].sort((a, b) => {
      const pa = productTypePriority(a.title, a.slug);
      const pb = productTypePriority(b.title, b.slug);
      if (pa !== pb) return pa - pb;
      return a.slug.localeCompare(b.slug, "pl");
    });
    const primary = sorted[0];
    primarySlugs.add(primary.slug);
    primaryProducts.push(primary);
    for (const p of group) {
      slugToPrimary.set(p.slug, primary.slug);
    }
  }

  primaryProducts.sort((a, b) => a.title.localeCompare(b.title, "pl"));

  return { primaryProducts, slugToPrimary, primarySlugs };
}

export function isPrimaryProduct(slug: string, index: CurationIndex): boolean {
  return index.primarySlugs.has(slug.trim().toLowerCase());
}

export function getPrimarySlugForProduct(slug: string, index: CurationIndex): string {
  const normalized = slug.trim().toLowerCase();
  return index.slugToPrimary.get(normalized) ?? normalized;
}
