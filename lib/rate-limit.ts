type Bucket = { count: number; resetAt: number };

const store = new Map<string, Bucket>();

export type RateLimitResult = {
  ok: boolean;
  remaining: number;
  resetIn: number;
};

export function rateLimit(key: string, max: number, windowMs: number): RateLimitResult {
  const now = Date.now();
  const current = store.get(key);
  if (!current || current.resetAt < now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { ok: true, remaining: max - 1, resetIn: windowMs };
  }
  if (current.count >= max) {
    return { ok: false, remaining: 0, resetIn: current.resetAt - now };
  }
  current.count += 1;
  return { ok: true, remaining: max - current.count, resetIn: current.resetAt - now };
}

export function cleanupRateLimit() {
  const now = Date.now();
  for (const [k, v] of store) if (v.resetAt < now) store.delete(k);
}

if (typeof globalThis !== "undefined") {
  const g = globalThis as unknown as { __rlTimer?: NodeJS.Timeout };
  if (!g.__rlTimer) {
    g.__rlTimer = setInterval(cleanupRateLimit, 60_000);
    if (typeof g.__rlTimer.unref === "function") g.__rlTimer.unref();
  }
}

export function clientIp(req: Request): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}
