import type { MetadataRoute } from "next";
import { getAllSitemapPaths } from "@/lib/seo/sitemap-urls";
import { siteUrl } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();
  const now = new Date();

  return getAllSitemapPaths().map((entry) => ({
    url: `${base}${entry.path}`,
    lastModified: entry.lastModified ?? now,
    priority: entry.priority,
    changeFrequency: entry.changeFrequency,
  }));
}
