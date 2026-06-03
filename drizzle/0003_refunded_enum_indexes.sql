-- Add REFUNDED value to ServiceOrderStatus enum (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_enum
    WHERE enumtypid = 'public."ServiceOrderStatus"'::regtype
    AND enumlabel = 'REFUNDED'
  ) THEN
    ALTER TYPE "ServiceOrderStatus" ADD VALUE 'REFUNDED';
  END IF;
END $$;

--> statement-breakpoint

-- Add index on stripePaymentId for O(1) refund lookups
CREATE INDEX IF NOT EXISTS "ServiceOrder_stripePaymentId_idx" ON "ServiceOrder"("stripePaymentId");

--> statement-breakpoint

-- Add composite index for drip email queries (deliveredAt + followUpSentAt)
CREATE INDEX IF NOT EXISTS "ServiceOrder_deliveredAt_followUp_idx" ON "ServiceOrder"("deliveredAt", "followUpSentAt");
