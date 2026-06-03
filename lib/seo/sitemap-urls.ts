import { getAllUslugi, CATEGORIES } from "@/lib/uslugi";
import { getAllBlogPostsForRoutes } from "@/lib/blog";
import { getAllWykonaneItems } from "@/lib/wykonane-content";
import { getTierACities, getLocalCategories } from "@/lib/seo/local";
import { siteUrl } from "@/lib/env";

export type SitemapUrlEntry = {
  path: string;
  priority?: number;
  changeFrequency?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  lastModified?: Date;
};

export function getStaticSitemapPaths(): SitemapUrlEntry[] {
  return [
    { path: "/", priority: 1.0, changeFrequency: "weekly" },
    { path: "/uslugi", priority: 0.9, changeFrequency: "daily" },
    { path: "/wykonane", priority: 0.85, changeFrequency: "weekly" },
    { path: "/demo", priority: 0.7, changeFrequency: "monthly" },
    { path: "/technologia", priority: 0.7, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" },
    { path: "/kontakt", priority: 0.4, changeFrequency: "yearly" },
    { path: "/o-nas", priority: 0.4, changeFrequency: "yearly" },
    { path: "/regulamin", priority: 0.3, changeFrequency: "yearly" },
    { path: "/polityka-prywatnosci", priority: 0.3, changeFrequency: "yearly" },
  ];
}

export function getCategorySitemapPaths(): SitemapUrlEntry[] {
  return CATEGORIES.map((c) => ({
    path: `/uslugi/${c.slug}`,
    priority: 0.8,
    changeFrequency: "weekly" as const,
  }));
}

export function getPrimaryPdpSitemapPaths(): SitemapUrlEntry[] {
  return getAllUslugi().map((p) => ({
    path: `/uslugi/${p.category}/${p.slug}`,
    // Higher priority for top-priced and recurring packages (money pages).
    priority: p.priceGrosze >= 500_000 || p.category === "opieka-techniczna" ? 0.8 : 0.6,
    changeFrequency: "monthly" as const,
  }));
}

export function getBlogSitemapPaths(): SitemapUrlEntry[] {
  return getAllBlogPostsForRoutes().map((p) => ({
    path: `/blog/${p.slug}`,
    priority: 0.6,
    changeFrequency: "monthly" as const,
    lastModified: new Date(p.publishedAt),
  }));
}

export function getLocalSitemapPaths(): SitemapUrlEntry[] {
  const cities = getTierACities();
  const categories = getLocalCategories();
  const paths: SitemapUrlEntry[] = [];

  for (const city of cities) {
    paths.push({
      path: `/l/${city.slug}`,
      priority: 0.7,
      changeFrequency: "monthly",
    });
    for (const cat of categories) {
      paths.push({
        path: `/l/${city.slug}/${cat}`,
        priority: 0.65,
        changeFrequency: "monthly",
      });
    }
  }

  return paths;
}

export function getWykonaneSitemapPaths(): SitemapUrlEntry[] {
  return getAllWykonaneItems().map((item) => ({
    path: `/wykonane/${item.slug}`,
    priority: 0.75,
    changeFrequency: "monthly" as const,
  }));
}

export function getAllSitemapPaths(): SitemapUrlEntry[] {
  return [
    ...getStaticSitemapPaths(),
    ...getCategorySitemapPaths(),
    ...getPrimaryPdpSitemapPaths(),
    ...getWykonaneSitemapPaths(),
    ...getLocalSitemapPaths(),
    ...getBlogSitemapPaths(),
  ];
}

export function getSitemapUrlCount(): number {
  return getAllSitemapPaths().length;
}

export function toAbsoluteSitemapUrl(path: string): string {
  const base = siteUrl().replace(/\/$/, "");
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}
