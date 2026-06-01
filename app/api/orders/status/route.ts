import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { orders, serviceOrders } from "@/lib/schema";
import { eq } from "drizzle-orm";
import { rateLimit, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const ip = clientIp(req);
  const rl = rateLimit(`order-status:${ip}`, 30, 60_000);
  if (!rl.ok) {
    return NextResponse.json({ error: "rate" }, {
      status: 429,
      headers: { "Retry-After": String(Math.ceil(rl.resetIn / 1000)) },
    });
  }

  const { searchParams } = new URL(req.url);
  const orderId = searchParams.get("order");
  const tool = searchParams.get("tool");
  const token = searchParams.get("token");
  const sessionId = searchParams.get("session_id");

  if (!orderId) return NextResponse.json({ error: "missing order" }, { status: 400 });

  // Service order flow (uslugi/koszyk checkout)
  if (tool === "uslugi" || !sessionId) {
    const serviceOrder = (await db.select().from(serviceOrders).where(eq(serviceOrders.id, orderId)).limit(1))[0];
    if (!serviceOrder) return NextResponse.json({ error: "not found" }, { status: 404 });

    const tokenOk = token && token === serviceOrder.formToken;
    const sessionOk = sessionId && sessionId === serviceOrder.stripeSessionId;
    if (!tokenOk && !sessionOk) {
      return NextResponse.json({ error: "forbidden" }, { status: 403 });
    }

    return NextResponse.json({
      status: serviceOrder.status,
      deliveredAt: serviceOrder.deliveredAt,
      error: serviceOrder.error,
    });
  }

  const order = (await db.select().from(orders).where(eq(orders.id, orderId)).limit(1))[0];
  if (!order) return NextResponse.json({ error: "not found" }, { status: 404 });
  if (order.stripeSessionId !== sessionId) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  return NextResponse.json({ status: order.status, deliveredAt: order.deliveredAt });
}
