CREATE TYPE "public"."DocumentTemplateStatus" AS ENUM('GENERATING', 'READY', 'FAILED');--> statement-breakpoint
CREATE TABLE "DocumentTemplate" (
	"productSlug" text PRIMARY KEY NOT NULL,
	"markdownTemplate" text NOT NULL DEFAULT '',
	"docKind" text NOT NULL,
	"modelUsed" text,
	"status" "DocumentTemplateStatus" NOT NULL DEFAULT 'GENERATING',
	"hitCount" integer DEFAULT 0 NOT NULL,
	"generationAttempts" integer DEFAULT 0 NOT NULL,
	"lastError" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "DocumentTemplate_status_idx" ON "DocumentTemplate" USING btree ("status");
