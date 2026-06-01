import fs from "node:fs";
import path from "node:path";
import type { BlogPost } from "@/lib/blog";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function parseFrontmatter(raw: string): { meta: Record<string, string>; body: string } {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/.exec(raw);
  if (!match) return { meta: {}, body: raw };
  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const m = /^([a-zA-Z]+):\s*(.*)$/.exec(line.trim());
    if (m) meta[m[1]] = m[2].replace(/^["']|["']$/g, "");
  }
  return { meta, body: match[2].trim() };
}

export function loadGeneratedBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return [];
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith(".md"));
  const posts: BlogPost[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(BLOG_DIR, file), "utf8");
    const { meta, body } = parseFrontmatter(raw);
    const slug = meta.slug ?? file.replace(/\.md$/, "");
    if (!meta.title || !slug) continue;
    posts.push({
      slug,
      title: meta.title,
      excerpt: meta.excerpt ?? "",
      publishedAt: meta.publishedAt ?? new Date().toISOString().slice(0, 10),
      readMinutes: Number(meta.readMinutes) || 8,
      tags: meta.tags ? meta.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      bodyMd: body,
    });
  }

  return posts;
}

export function saveGeneratedBlogPost(article: BlogPost): string {
  fs.mkdirSync(BLOG_DIR, { recursive: true });
  const filePath = path.join(BLOG_DIR, `${article.slug}.md`);
  const frontmatter = [
    "---",
    `slug: ${article.slug}`,
    `title: ${JSON.stringify(article.title)}`,
    `excerpt: ${JSON.stringify(article.excerpt)}`,
    `publishedAt: ${article.publishedAt}`,
    `readMinutes: ${article.readMinutes}`,
    `tags: ${article.tags.join(", ")}`,
    "---",
    "",
    article.bodyMd,
    "",
  ].join("\n");
  fs.writeFileSync(filePath, frontmatter, "utf8");
  return filePath;
}

export function blogSlugExists(slug: string): boolean {
  const inFs = fs.existsSync(path.join(BLOG_DIR, `${slug}.md`));
  return inFs;
}
