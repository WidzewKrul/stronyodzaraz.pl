import fs from "node:fs";
import path from "node:path";
import { z } from "zod";
import { generateWithOpenRouter } from "@/lib/openrouter";
import { getBlogPostBySlug, type BlogPost } from "@/lib/blog";
import { blogSlugExists, saveGeneratedBlogPost } from "@/lib/blog-fs";
import { submitIndexNow } from "@/lib/indexnow";

const articleSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/).max(80),
  title: z.string().min(20).max(70),
  excerpt: z.string().min(120).max(165),
  primaryKeyword: z.string(),
  tags: z.array(z.string()).min(2).max(5),
  readMinutes: z.number().int().min(5).max(20),
  bodyMd: z.string().min(500),
  internalLinks: z.array(z.string()).min(2),
  suggestedCategory: z.enum([
    "strony-internetowe",
    "sklepy-internetowe",
    "wordpress",
    "shopify-shoper",
    "reklama-marketing",
    "opieka-techniczna",
    "integracje",
    "migracje-naprawy",
  ]),
});

const SYSTEM_PATH = path.join(process.cwd(), "docs", "blog", "prompts", "system-blog.md");

function loadSystemPrompt(): string {
  return fs.readFileSync(SYSTEM_PATH, "utf8");
}

function parseJsonContent(raw: string): unknown {
  const trimmed = raw.trim();
  const fence = /^```(?:json)?\s*([\s\S]*?)```$/m.exec(trimmed);
  const jsonText = fence ? fence[1].trim() : trimmed;
  return JSON.parse(jsonText);
}

export type GenerateBlogInput = {
  primaryKeyword: string;
  category: string;
  internalLinks: string[];
};

export type GenerateBlogResult =
  | { ok: true; slug: string; title: string; path: string }
  | { ok: false; error: string };

export async function generateAndPublishBlogArticle(input: GenerateBlogInput): Promise<GenerateBlogResult> {
  if (!process.env.OPENROUTER_API_KEY) {
    return { ok: false, error: "OPENROUTER_API_KEY is not configured" };
  }

  const system = loadSystemPrompt();
  const user = [
    `Fraza główna: ${input.primaryKeyword}`,
    `Kategoria hub: ${input.category}`,
    `Linki wewnętrzne (użyj min. 2 w markdown): ${input.internalLinks.join(", ")}`,
    "Zwróć wyłącznie JSON zgodny ze schematem (slug, title, excerpt, primaryKeyword, tags, readMinutes, bodyMd, internalLinks, suggestedCategory).",
  ].join("\n");

  let raw: string;
  try {
    raw = await generateWithOpenRouter(
      [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      { temperature: 0.5, maxTokens: 8000 },
    );
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }

  let parsed: z.infer<typeof articleSchema>;
  try {
    parsed = articleSchema.parse(parseJsonContent(raw));
  } catch (err) {
    return { ok: false, error: `Validation failed: ${err instanceof Error ? err.message : String(err)}` };
  }

  if (getBlogPostBySlug(parsed.slug) || blogSlugExists(parsed.slug)) {
    return { ok: false, error: `Slug already exists: ${parsed.slug}` };
  }

  const post: BlogPost = {
    slug: parsed.slug,
    title: parsed.title,
    excerpt: parsed.excerpt,
    publishedAt: new Date().toISOString().slice(0, 10),
    readMinutes: parsed.readMinutes,
    tags: parsed.tags,
    bodyMd: parsed.bodyMd,
  };

  const filePath = saveGeneratedBlogPost(post);
  await submitIndexNow([`/blog/${post.slug}`]);

  return { ok: true, slug: post.slug, title: post.title, path: filePath };
}
