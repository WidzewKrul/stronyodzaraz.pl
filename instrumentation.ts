export async function register() {
  if (process.env.NEXT_RUNTIME !== "nodejs") return;

  const required = ["DATABASE_URL", "STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET", "RESEND_API_KEY", "CRON_SECRET"];
  const missing = required.filter((k) => !process.env[k]);
  if (missing.length > 0) {
    console.error(`[startup] Missing required env vars: ${missing.join(", ")}`);
    if (process.env.NODE_ENV === "production") {
      throw new Error(`Missing required env vars: ${missing.join(", ")}`);
    }
  }

  // Optional integrations — not fatal, but warn at boot so a misconfiguration
  // surfaces here instead of as recurring runtime failures in the cron jobs.
  const optional = ["OPENROUTER_API_KEY", "INDEXNOW_KEY"];
  const missingOptional = optional.filter((k) => !process.env[k]);
  if (missingOptional.length > 0) {
    console.warn(`[startup] Missing optional env vars (AI/IndexNow features degraded): ${missingOptional.join(", ")}`);
  }
}
