import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sql } from "drizzle-orm";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Lightweight liveness/readiness probe: confirms the process is up AND the DB is
// reachable, without rendering a full page (cheaper than hitting "/"). Used by the
// Docker HEALTHCHECK. Never throws — returns 503 on DB failure so the orchestrator
// can react instead of getting a hung request.
export async function GET() {
  try {
    await db.execute(sql`select 1`);
    return NextResponse.json({ ok: true, db: "up" });
  } catch {
    return NextResponse.json({ ok: false, db: "down" }, { status: 503 });
  }
}
