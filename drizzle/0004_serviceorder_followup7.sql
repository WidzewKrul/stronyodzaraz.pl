-- Add dedicated day-7 drip flag so the D+7 upsell email is independent of the
-- D+3 send (previously both shared followUpSentAt, so D+7 never fired). Idempotent.
ALTER TABLE "ServiceOrder" ADD COLUMN IF NOT EXISTS "followUp7SentAt" timestamp;

--> statement-breakpoint

-- Index supporting the catch-up D+7 query (deliveredAt + followUp7SentAt).
CREATE INDEX IF NOT EXISTS "ServiceOrder_deliveredAt_followUp7_idx" ON "ServiceOrder"("deliveredAt", "followUp7SentAt");
