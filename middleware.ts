import { NextRequest, NextResponse } from "next/server";
import { rateLimit, clientIp } from "@/lib/rate-limit";

const MAX_API_BODY_BYTES = 100 * 1024;

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const ip = clientIp(req);
  const rl = rateLimit(`api-global:${ip}`, 60, 60_000);
  if (!rl.ok) {
    return NextResponse.json({ error: "Too many requests." }, {
      status: 429,
      headers: {
        "Retry-After": String(Math.ceil(rl.resetIn / 1000)),
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  if (req.method === "POST") {
    const raw = req.headers.get("content-length");
    if (raw) {
      const len = parseInt(raw, 10);
      if (Number.isFinite(len) && len > MAX_API_BODY_BYTES) {
        return NextResponse.json({ error: "Payload too large." }, {
          status: 413,
          headers: { "X-Robots-Tag": "noindex, nofollow" },
        });
      }
    }
  }

  const res = NextResponse.next();
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  return res;
}

export const config = {
  matcher: "/api/:path*",
};
