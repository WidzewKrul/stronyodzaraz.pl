import { NextRequest, NextResponse } from "next/server";
import { processPendingJobs } from "@/lib/worker";
import { checkCronAuth } from "@/lib/cron-auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const unauth = checkCronAuth(req);
  if (unauth) return unauth;
  const result = await processPendingJobs();
  return NextResponse.json({ ok: true, ...result });
}

export async function GET(req: NextRequest) {
  return POST(req);
}
