import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { serviceOrders } from "@/lib/schema";
import { and, eq, isNull, lte, gte, isNotNull } from "drizzle-orm";
import { sendDripUpsellEmail } from "@/lib/email";
import { checkCronAuth } from "@/lib/cron-auth";
import { log } from "@/lib/logger";
import { getDripTemplate } from "@/lib/drip-templates";
import { getUslugaBySlug } from "@/lib/uslugi";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function categoryFromToolSlug(toolSlug: string): string | null {
  const slug = toolSlug.startsWith("uslugi:") ? toolSlug.slice("uslugi:".length) : toolSlug;
  return getUslugaBySlug(slug)?.category ?? null;
}

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
    .from(serviceOrders)
    .where(
      and(
        eq(serviceOrders.status, "COMPLETED"),
        isNotNull(serviceOrders.deliveredAt),
        isNull(serviceOrders.followUpSentAt),
        lte(serviceOrders.deliveredAt, threeDays),
        gte(serviceOrders.deliveredAt, fourDays),
      ),
    )
    .limit(50);

  for (const o of plusThree) {
    try {
      const category = categoryFromToolSlug(o.toolSlug);
      await sendDripUpsellEmail({ to: o.email, orderId: o.id, day: 3, category });
      await db.update(serviceOrders).set({ followUpSentAt: new Date() }).where(eq(serviceOrders.id, o.id));
      sent++;
    } catch (err) {
      failed++;
      log.warn("[cron/drip] day3 failed", { orderId: o.id, err: String(err) });
    }
  }

  const plusSeven = await db
    .select()
    .from(serviceOrders)
    .where(
      and(
        eq(serviceOrders.status, "COMPLETED"),
        isNotNull(serviceOrders.deliveredAt),
        isNull(serviceOrders.followUpSentAt),
        lte(serviceOrders.deliveredAt, sevenDays),
        gte(serviceOrders.deliveredAt, eightDays),
      ),
    )
    .limit(50);

  for (const o of plusSeven) {
    try {
      const category = categoryFromToolSlug(o.toolSlug);
      await sendDripUpsellEmail({ to: o.email, orderId: o.id, day: 7, category });
      await db.update(serviceOrders).set({ followUpSentAt: new Date() }).where(eq(serviceOrders.id, o.id));
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
