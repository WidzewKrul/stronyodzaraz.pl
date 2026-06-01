import fs from "node:fs";
import path from "node:path";
import { getStoreProductBySlug } from "@/lib/uslugi";

type FeaturedFile = {
  sectionTitle: string;
  sectionSubtitle: string;
  items: Array<{
    slug: string;
    category: string;
    cardTitle: string;
    cardLine: string;
  }>;
};

let cache: FeaturedFile | null = null;

function load(): FeaturedFile {
  if (!cache) {
    const filePath = path.join(process.cwd(), "docs", "content", "featured-products.json");
    cache = JSON.parse(fs.readFileSync(filePath, "utf8")) as FeaturedFile;
  }
  return cache;
}

export function getFeaturedSectionMeta() {
  const { sectionTitle, sectionSubtitle } = load();
  return { sectionTitle, sectionSubtitle };
}

export function getFeaturedProducts() {
  return load()
    .items.map((item) => {
      const product = getStoreProductBySlug(item.slug);
      if (!product) return null;
      return {
        ...item,
        priceGrosze: product.priceGrosze,
        seoTitle: product.seoTitle,
      };
    })
    .filter((x): x is NonNullable<typeof x> => Boolean(x));
}
