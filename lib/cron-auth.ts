import { NextRequest, NextResponse } from "next/server";
import { siteUrl } from "./env";

export function checkCronAuth(req: NextRequest): NextResponse | null {
  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return NextResponse.json({ error: "Cron is not configured" }, { status: 500 });
  }
  // Accept Bearer token from Authorization header or x-cron-secret header only.
  // Query param removed: secrets in URLs appear in access logs, Referer headers, and CDN caches.
  const header = req.headers.get("authorization") ?? req.headers.get("x-cron-secret");
  const provided = header?.replace(/^Bearer\s+/i, "").trim() ?? "";

  // Constant-time comparison to prevent timing attacks.
  const secretBuf = Buffer.from(secret, "utf8");
  const providedBuf = Buffer.from(provided.padEnd(secret.length, "\0").slice(0, secret.length), "utf8");
  const valid = provided.length === secret.length && require("crypto").timingSafeEqual(secretBuf, providedBuf);

  if (!valid) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

function safeHost(value: string | null | undefined): string {
  if (!value) return "";
  try {
    return new URL(value).host.toLowerCase();
  } catch {
    return "";
  }
}

export function assertSameOrigin(req: Request, opts?: { strict?: boolean }): NextResponse | null {
  if (req.method === "GET" || req.method === "HEAD") return null;

  const allowed = new Set<string>();
  const add = (h: string) => {
    if (!h) return;
    allowed.add(h);
    allowed.add(h.replace(/^www\./, ""));
    if (!h.startsWith("www.")) allowed.add("www." + h);
  };

  add(safeHost(siteUrl()));
  add(safeHost(req.url));
  const fwdHost = req.headers.get("x-forwarded-host");
  if (fwdHost) add(fwdHost.toLowerCase());

  allowed.add("localhost:3000");
  allowed.add("127.0.0.1:3000");

  const originHost = safeHost(req.headers.get("origin"));
  const refererHost = safeHost(req.headers.get("referer"));

  if (!originHost && !refererHost) {
    if (opts?.strict) {
      return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
    }
    return null;
  }

  if ((originHost && allowed.has(originHost)) || (refererHost && allowed.has(refererHost))) {
    return null;
  }
  return NextResponse.json({ error: "Forbidden origin" }, { status: 403 });
}

export function assertSameOriginStrict(req: Request): NextResponse | null {
  return assertSameOrigin(req, { strict: true });
}
