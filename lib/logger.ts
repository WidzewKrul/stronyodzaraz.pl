type Level = "debug" | "info" | "warn" | "error";

// Redact known-sensitive patterns from free-form strings before they hit logs
// or get persisted (e.g. in Order.lastError / ServiceOrder.error).
export function redactPII(input: string): string {
  if (!input) return input;
  return input
    // DB URLs with embedded credentials
    .replace(/postgres(?:ql)?:\/\/[^:]+:[^@]+@/gi, "postgres://***:***@")
    .replace(/mysql:\/\/[^:]+:[^@]+@/gi, "mysql://***:***@")
    // password / token / api_key in query strings or assignments
    .replace(/(password|passwd|pwd|secret|token|api[_-]?key)\s*[=:]\s*[^\s,&"']+/gi, "$1=***")
    // bearer tokens
    .replace(/Bearer\s+[A-Za-z0-9._\-]+/g, "Bearer ***")
    // Stripe-style keys
    .replace(/\b(sk|rk|pk|whsec|sk-or)[-_](?:live|test)?[_-]?[A-Za-z0-9]{10,}\b/g, "***REDACTED***")
    // Resend keys
    .replace(/\bre_[A-Za-z0-9]{20,}\b/g, "***REDACTED***")
    // email addresses — mask local part
    .replace(/\b([A-Za-z0-9._%+-]{1,3})[A-Za-z0-9._%+-]*@([A-Za-z0-9.-]+\.[A-Za-z]{2,})\b/g, "$1***@$2");
}

function redactMeta(meta?: Record<string, unknown>): Record<string, unknown> | undefined {
  if (!meta) return meta;
  const out: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(meta)) {
    if (typeof v === "string") {
      out[k] = redactPII(v);
    } else if (v instanceof Error) {
      out[k] = redactPII(v.message);
    } else {
      out[k] = v;
    }
  }
  return out;
}

function emit(level: Level, msg: string, meta?: Record<string, unknown>) {
  const line = {
    ts: new Date().toISOString(),
    level,
    msg: redactPII(msg),
    ...redactMeta(meta),
  };
  const out = JSON.stringify(line);
  if (level === "error") console.error(out);
  else if (level === "warn") console.warn(out);
  else console.log(out);
}

export const log = {
  debug: (msg: string, meta?: Record<string, unknown>) => {
    if (process.env.NODE_ENV === "development") emit("debug", msg, meta);
  },
  info: (msg: string, meta?: Record<string, unknown>) => emit("info", msg, meta),
  warn: (msg: string, meta?: Record<string, unknown>) => emit("warn", msg, meta),
  error: (msg: string, meta?: Record<string, unknown>) => emit("error", msg, meta),
};
