import { NextRequest, NextResponse } from "next/server";
import { checkCronAuth } from "@/lib/cron-auth";
import { generateAndPublishBlogArticle } from "@/lib/blog-generate";
import { pickNextPendingItem, markQueueItem } from "@/lib/blog-queue";
import { log } from "@/lib/logger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function handler(req: NextRequest) {
  const unauth = checkCronAuth(req);
  if (unauth) return unauth;

  const next = pickNextPendingItem();
  if (!next) {
    return NextResponse.json({ ok: true, skipped: true, reason: "no_pending_items" });
  }

  const { item, index } = next;
  markQueueItem(index, { status: "generating" });

  const result = await generateAndPublishBlogArticle({
    primaryKeyword: item.primaryKeyword,
    category: item.category,
    internalLinks: item.internalLinks,
  });

  if (!result.ok) {
    markQueueItem(index, { status: "failed", error: result.error });
    log.warn("[cron/blog] failed", { keyword: item.primaryKeyword, error: result.error });
    return NextResponse.json({ ok: false, error: result.error }, { status: 500 });
  }

  markQueueItem(index, { status: "published", publishedSlug: result.slug });
  return NextResponse.json({ ok: true, slug: result.slug, title: result.title });
}

export const POST = handler;
export const GET = handler;
