import type { MetadataRoute } from "next";
import { getAllSitemapPaths } from "@/lib/seo/sitemap-urls";
import { siteUrl } from "@/lib/env";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteUrl();
  const now = new Date();

  return (await getAllSitemapPaths()).map((entry) => ({
    url: `${base}${entry.path}`,
    lastModified: entry.lastModified ?? now,
    priority: entry.priority,
    changeFrequency: entry.changeFrequency,
  }));
}
