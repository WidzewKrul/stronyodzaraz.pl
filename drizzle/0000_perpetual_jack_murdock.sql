CREATE TYPE "public"."OrderStatus" AS ENUM('PENDING', 'PAID', 'DELIVERED', 'FAILED', 'REFUNDED');--> statement-breakpoint
CREATE TYPE "public"."ServiceOrderStatus" AS ENUM('PENDING', 'PAID', 'FILLED', 'GENERATING', 'COMPLETED', 'FAILED');--> statement-breakpoint
CREATE TABLE "BlogPost" (
	"id" text PRIMARY KEY NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"excerpt" text NOT NULL,
	"bodyMd" text NOT NULL,
	"coverEmoji" text,
	"tags" text[] DEFAULT '{}'::text[] NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"publishedAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "BlogPost_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
CREATE TABLE "NewsletterSubscriber" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"source" text,
	"confirmed" boolean DEFAULT false NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "NewsletterSubscriber_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "Order" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"firstName" text NOT NULL,
	"lastName" text NOT NULL,
	"province" text NOT NULL,
	"city" text NOT NULL,
	"street" text NOT NULL,
	"postalCode" text NOT NULL,
	"items" json NOT NULL,
	"subtotalGrosze" integer DEFAULT 0 NOT NULL,
	"discountGrosze" integer DEFAULT 0 NOT NULL,
	"totalGrosze" integer NOT NULL,
	"currency" text DEFAULT 'PLN' NOT NULL,
	"status" "OrderStatus" DEFAULT 'PENDING' NOT NULL,
	"stripeSessionId" text,
	"stripePaymentId" text,
	"promotionCode" text,
	"invoiceRequested" boolean DEFAULT false NOT NULL,
	"invoiceName" text,
	"invoiceTaxId" text,
	"invoiceProvince" text,
	"invoiceCity" text,
	"invoiceStreet" text,
	"invoicePostalCode" text,
	"termsAcceptedAt" timestamp,
	"termsAcceptedIp" text,
	"invoiceId" text,
	"invoiceUrl" text,
	"invoiceStatus" text,
	"deliveryAttempts" integer DEFAULT 0 NOT NULL,
	"lastError" text,
	"deliveredAt" timestamp,
	"followUpSentAt" timestamp,
	"followUp7SentAt" timestamp,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Order_stripeSessionId_unique" UNIQUE("stripeSessionId")
);
--> statement-breakpoint
CREATE TABLE "ProcessedEvent" (
	"id" text PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "Referral" (
	"id" text PRIMARY KEY NOT NULL,
	"code" text NOT NULL,
	"ownerEmail" text NOT NULL,
	"visits" integer DEFAULT 0 NOT NULL,
	"conversions" integer DEFAULT 0 NOT NULL,
	"totalGrosze" integer DEFAULT 0 NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "Referral_code_unique" UNIQUE("code")
);
--> statement-breakpoint
CREATE TABLE "ServiceOrder" (
	"id" text PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"toolSlug" text NOT NULL,
	"priceGrosze" integer NOT NULL,
	"currency" text DEFAULT 'PLN' NOT NULL,
	"status" "ServiceOrderStatus" DEFAULT 'PENDING' NOT NULL,
	"stripeSessionId" text,
	"stripePaymentId" text,
	"promotionCode" text,
	"questionnaireData" json,
	"formToken" text NOT NULL,
	"resultMarkdown" text,
	"generateAttempts" integer DEFAULT 0 NOT NULL,
	"deliveryAttempts" integer DEFAULT 0 NOT NULL,
	"error" text,
	"deliveredAt" timestamp,
	"followUpSentAt" timestamp,
	"invoiceId" text,
	"invoiceUrl" text,
	"createdAt" timestamp DEFAULT now() NOT NULL,
	"updatedAt" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "ServiceOrder_stripeSessionId_unique" UNIQUE("stripeSessionId"),
	CONSTRAINT "ServiceOrder_formToken_unique" UNIQUE("formToken")
);
--> statement-breakpoint
CREATE TABLE "Testimonial" (
	"id" text PRIMARY KEY NOT NULL,
	"author" text NOT NULL,
	"location" text,
	"role" text,
	"productSlug" text,
	"toolSlug" text,
	"rating" integer DEFAULT 5 NOT NULL,
	"content" text NOT NULL,
	"published" boolean DEFAULT true NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX "BlogPost_published_publishedAt_idx" ON "BlogPost" USING btree ("published","publishedAt");--> statement-breakpoint
CREATE INDEX "Order_email_idx" ON "Order" USING btree ("email");--> statement-breakpoint
CREATE INDEX "Order_status_idx" ON "Order" USING btree ("status");--> statement-breakpoint
CREATE INDEX "Order_status_deliveryAttempts_idx" ON "Order" USING btree ("status","deliveryAttempts");--> statement-breakpoint
CREATE INDEX "ProcessedEvent_createdAt_idx" ON "ProcessedEvent" USING btree ("createdAt");--> statement-breakpoint
CREATE INDEX "Referral_ownerEmail_idx" ON "Referral" USING btree ("ownerEmail");--> statement-breakpoint
CREATE INDEX "ServiceOrder_email_idx" ON "ServiceOrder" USING btree ("email");--> statement-breakpoint
CREATE INDEX "ServiceOrder_status_idx" ON "ServiceOrder" USING btree ("status");--> statement-breakpoint
CREATE INDEX "ServiceOrder_toolSlug_idx" ON "ServiceOrder" USING btree ("toolSlug");--> statement-breakpoint
CREATE INDEX "ServiceOrder_status_generateAttempts_idx" ON "ServiceOrder" USING btree ("status","generateAttempts");--> statement-breakpoint
CREATE INDEX "Testimonial_published_idx" ON "Testimonial" USING btree ("published");--> statement-breakpoint
CREATE INDEX "Testimonial_productSlug_idx" ON "Testimonial" USING btree ("productSlug");--> statement-breakpoint
CREATE INDEX "Testimonial_toolSlug_idx" ON "Testimonial" USING btree ("toolSlug");