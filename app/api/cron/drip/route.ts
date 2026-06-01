import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { orders } from "@/lib/schema";
import { and, eq, isNull, lte, gte } from "drizzle-orm";
import { sendDripUpsellEmail } from "@/lib/email";
import { checkCronAuth } from "@/lib/cron-auth";
import { log } from "@/lib/logger";
import { extractCategoryFromOrderItems } from "@/lib/drip-templates";
import { getUslugaBySlug } from "@/lib/uslugi";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function handler(req: NextRequest) {
  const unauth = checkCronAuth(req);
  if (unauth) return unauth;

  const now = Date.now();
  const threeDays = new Date(now - 3 * 24 * 60 * 60 * 1000);
  const fourDays = new Date(now - 4 * 24 * 60 * 60 * 1000);
  const sevenDays = new Date(now - 7 * 24 * 60 * 60 * 1000);
  const eightDays = new Date(now - 8 * 24 * 60 * 60 * 1000);

  let sent = 0;
  let failed = 0;

  const plusThree = await db
    .select()
    .from(orders)
    .where(
      and(
        eq(orders.status, "DELIVERED"),
        isNull(orders.followUpSentAt),
        lte(orders.deliveredAt, threeDays),
        gte(orders.deliveredAt, fourDays),
      ),
    )
    .limit(50);

  for (const o of plusThree) {
    try {
      const category = extractCategoryFromOrderItems(o.items, (slug) => getUslugaBySlug(slug)?.category ?? null);
      await sendDripUpsellEmail({ to: o.email, orderId: o.id, day: 3, category });
      await db.update(orders).set({ followUpSentAt: new Date() }).where(eq(orders.id, o.id));
      sent++;
    } catch (err) {
      failed++;
      log.warn("[cron/drip] day3 failed", { orderId: o.id, err: String(err) });
    }
  }

  const plusSeven = await db
    .select()
    .from(orders)
    .where(
      and(
        eq(orders.status, "DELIVERED"),
        isNull(orders.followUp7SentAt),
        lte(orders.deliveredAt, sevenDays),
        gte(orders.deliveredAt, eightDays),
      ),
    )
    .limit(50);

  for (const o of plusSeven) {
    try {
      const category = extractCategoryFromOrderItems(o.items, (slug) => getUslugaBySlug(slug)?.category ?? null);
      await sendDripUpsellEmail({ to: o.email, orderId: o.id, day: 7, category });
      await db.update(orders).set({ followUp7SentAt: new Date() }).where(eq(orders.id, o.id));
      sent++;
    } catch (err) {
      failed++;
      log.warn("[cron/drip] day7 failed", { orderId: o.id, err: String(err) });
    }
  }

  return NextResponse.json({ ok: true, sent, failed });
}

export const POST = handler;
export const GET = handler;
