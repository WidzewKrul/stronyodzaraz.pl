import { desc, eq } from "drizzle-orm";
import type { BlogPost } from "@/lib/blog";
import { blogPosts } from "@/lib/schema";
import { log } from "@/lib/logger";

// IMPORTANT: the production build runs in a Docker stage WITHOUT DATABASE_URL.
// `lib/db.ts` throws synchronously at import time when DATABASE_URL is missing,
// so we must import it lazily inside try/catch — never at module top-level —
// otherwise generateStaticParams would crash the build instead of falling back
// to static-only content.
async function getDb() {
  const { db } = await import("@/lib/db");
  return db;
}

function readMinutesFromBody(bodyMd: string): number {
  const wordCount = bodyMd.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(4, Math.round(wordCount / 200));
}

function toDateString(value: Date): string {
  return value.toISOString().slice(0, 10);
}

/** Published DB posts, newest first. Returns [] if the DB is unreachable. */
export async function loadDbBlogPosts(): Promise<BlogPost[]> {
  try {
    const db = await getDb();
    const rows = await db
      .select()
      .from(blogPosts)
      .where(eq(blogPosts.published, true))
      .orderBy(desc(blogPosts.publishedAt));

    return rows.map((row) => ({
      slug: row.slug,
      title: row.title,
      excerpt: row.excerpt,
      publishedAt: toDateString(row.publishedAt),
      readMinutes: readMinutesFromBody(row.bodyMd),
      tags: row.tags ?? [],
      bodyMd: row.bodyMd,
    }));
  } catch (err) {
    log.warn("[blog-db] loadDbBlogPosts failed, falling back to static", {
      error: err instanceof Error ? err.message : String(err),
    });
    return [];
  }
}

/** True if a post with this slug exists in the DB. Returns false on error. */
export async function dbBlogSlugExists(slug: string): Promise<boolean> {
  try {
    const db = await getDb();
    const rows = await db
      .select({ slug: blogPosts.slug })
      .from(blogPosts)
      .where(eq(blogPosts.slug, slug))
      .limit(1);
    return rows.length > 0;
  } catch (err) {
    log.warn("[blog-db] dbBlogSlugExists failed", {
      error: err instanceof Error ? err.message : String(err),
    });
    return false;
  }
}

/** Insert a generated post (published). No-op if the slug already exists. */
export async function saveDbBlogPost(post: BlogPost): Promise<void> {
  const db = await getDb();
  await db
    .insert(blogPosts)
    .values({
      slug: post.slug,
      title: post.title,
      excerpt: post.excerpt,
      bodyMd: post.bodyMd,
      tags: post.tags,
      published: true,
      publishedAt: new Date(post.publishedAt),
    })
    .onConflictDoNothing({ target: blogPosts.slug });
}
