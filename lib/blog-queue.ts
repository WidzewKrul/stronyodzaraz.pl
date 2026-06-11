import fs from "node:fs";
import path from "node:path";
import { desc, eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { blogQueue } from "@/lib/schema";
import { log } from "@/lib/logger";

export type QueueItem = {
  priority: number;
  primaryKeyword: string;
  category: string;
  internalLinks: string[];
  status: "pending" | "generating" | "published" | "failed";
  publishedSlug?: string;
  error?: string;
};

type SeedFile = { version: number; items: QueueItem[] };

const SEED_PATH = path.join(process.cwd(), "docs", "blog", "queue", "seed-queue.json");

let seeded = false;

/**
 * Seed the BlogQueue table from the bundled seed file on first use.
 * `docs/` IS available in the runtime image. Only inserts keywords whose row
 * does not already exist (onConflictDoNothing), so it's safe to re-run.
 */
async function ensureSeeded(): Promise<void> {
  if (seeded) return;
  seeded = true;
  try {
    const seed = JSON.parse(fs.readFileSync(SEED_PATH, "utf8")) as SeedFile;
    if (!seed.items?.length) return;
    await db
      .insert(blogQueue)
      .values(
        seed.items.map((it) => ({
          primaryKeyword: it.primaryKeyword,
          priority: it.priority,
          category: it.category,
          internalLinks: it.internalLinks,
          status: it.status ?? "pending",
          publishedSlug: it.publishedSlug,
          error: it.error,
        })),
      )
      .onConflictDoNothing({ target: blogQueue.primaryKeyword });
  } catch (err) {
    // Allow a retry on the next call if seeding failed transiently.
    seeded = false;
    log.warn("[blog-queue] seeding failed", {
      error: err instanceof Error ? err.message : String(err),
    });
  }
}

function toQueueItem(row: typeof blogQueue.$inferSelect): QueueItem {
  return {
    priority: row.priority,
    primaryKeyword: row.primaryKeyword,
    category: row.category,
    internalLinks: row.internalLinks,
    status: row.status as QueueItem["status"],
    publishedSlug: row.publishedSlug ?? undefined,
    error: row.error ?? undefined,
  };
}

/** Highest-priority pending item, or null if none. */
export async function pickNextPendingItem(): Promise<{ item: QueueItem } | null> {
  await ensureSeeded();
  const rows = await db
    .select()
    .from(blogQueue)
    .where(eq(blogQueue.status, "pending"))
    .orderBy(desc(blogQueue.priority))
    .limit(1);
  if (rows.length === 0) return null;
  return { item: toQueueItem(rows[0]) };
}

/** Update a queue row by its primaryKeyword. */
export async function markQueueItem(
  primaryKeyword: string,
  patch: Partial<QueueItem>,
): Promise<void> {
  const update: Partial<typeof blogQueue.$inferInsert> = {};
  if (patch.priority !== undefined) update.priority = patch.priority;
  if (patch.category !== undefined) update.category = patch.category;
  if (patch.internalLinks !== undefined) update.internalLinks = patch.internalLinks;
  if (patch.status !== undefined) update.status = patch.status;
  if (patch.publishedSlug !== undefined) update.publishedSlug = patch.publishedSlug;
  if (patch.error !== undefined) update.error = patch.error;
  await db.update(blogQueue).set(update).where(eq(blogQueue.primaryKeyword, primaryKeyword));
}
