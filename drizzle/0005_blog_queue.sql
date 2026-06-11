-- Durable blog generation queue (replaces ephemeral content/blog/queue.json).
-- Keyed by primaryKeyword so seeding is idempotent via ON CONFLICT DO NOTHING.
CREATE TABLE IF NOT EXISTS "BlogQueue" (
  "primaryKeyword" text PRIMARY KEY NOT NULL,
  "priority" integer NOT NULL DEFAULT 0,
  "category" text NOT NULL,
  "internalLinks" json NOT NULL,
  "status" text NOT NULL DEFAULT 'pending',
  "publishedSlug" text,
  "error" text,
  "updatedAt" timestamp DEFAULT now()
);
