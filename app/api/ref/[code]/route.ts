import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { referrals } from "@/lib/schema";
import { eq, sql } from "drizzle-orm";
import { siteUrl } from "@/lib/env";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function GET(req: NextRequest, { params }: { params: Promise<{ code: string }> }) {
  const ip = clientIp(req);
  const rl = rateLimit(`ref:${ip}`, 30, 60_000);
  if (!rl.ok) {
    return NextResponse.json({ error: "Too many requests." }, {
      status: 429,
      headers: { "Retry-After": String(Math.ceil(rl.resetIn / 1000)) },
    });
  }

  const { code } = await params;
  const safe = code.replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 32);
  const base = siteUrl();

  const res = NextResponse.redirect(base);
  if (!safe) return res;

  res.cookies.set("ref", safe, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });

  try {
    await db
      .insert(referrals)
      .values({ code: safe, ownerEmail: "unknown@stronyodzaraz.pl", visits: 1 })
      .onConflictDoUpdate({
        target: referrals.code,
        set: { visits: sql`${referrals.visits} + 1` },
      });
  } catch {}

  return res;
}
