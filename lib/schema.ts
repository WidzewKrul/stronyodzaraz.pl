import { pgTable, pgEnum, text, integer, boolean, timestamp, json, index, uniqueIndex } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const orderStatusEnum = pgEnum("OrderStatus", ["PENDING", "PAID", "DELIVERED", "FAILED", "REFUNDED"]);
export const serviceOrderStatusEnum = pgEnum("ServiceOrderStatus", ["PENDING", "PAID", "FILLED", "GENERATING", "COMPLETED", "FAILED", "REFUNDED"]);
export const documentTemplateStatusEnum = pgEnum("DocumentTemplateStatus", ["GENERATING", "READY", "FAILED"]);

export const orders = pgTable("Order", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull(),
  firstName: text("firstName").notNull(),
  lastName: text("lastName").notNull(),
  province: text("province").notNull(),
  city: text("city").notNull(),
  street: text("street").notNull(),
  postalCode: text("postalCode").notNull(),
  items: json("items").notNull(),
  subtotalGrosze: integer("subtotalGrosze").notNull().default(0),
  discountGrosze: integer("discountGrosze").notNull().default(0),
  totalGrosze: integer("totalGrosze").notNull(),
  currency: text("currency").notNull().default("PLN"),
  status: orderStatusEnum("status").notNull().default("PENDING"),
  stripeSessionId: text("stripeSessionId").unique(),
  stripePaymentId: text("stripePaymentId"),
  promotionCode: text("promotionCode"),
  invoiceRequested: boolean("invoiceRequested").notNull().default(false),
  invoiceName: text("invoiceName"),
  invoiceTaxId: text("invoiceTaxId"),
  invoiceProvince: text("invoiceProvince"),
  invoiceCity: text("invoiceCity"),
  invoiceStreet: text("invoiceStreet"),
  invoicePostalCode: text("invoicePostalCode"),
  termsAcceptedAt: timestamp("termsAcceptedAt"),
  termsAcceptedIp: text("termsAcceptedIp"),
  invoiceId: text("invoiceId"),
  invoiceUrl: text("invoiceUrl"),
  invoiceStatus: text("invoiceStatus"),
  deliveryAttempts: integer("deliveryAttempts").notNull().default(0),
  lastError: text("lastError"),
  deliveredAt: timestamp("deliveredAt"),
  followUpSentAt: timestamp("followUpSentAt"),
  followUp7SentAt: timestamp("followUp7SentAt"),
  createdAt: timestamp("createdAt").notNull().default(sql`now()`),
  updatedAt: timestamp("updatedAt").notNull().default(sql`now()`).$onUpdateFn(() => new Date()),
}, (t) => [
  index("Order_email_idx").on(t.email),
  index("Order_status_idx").on(t.status),
  index("Order_status_deliveryAttempts_idx").on(t.status, t.deliveryAttempts),
]);

export const serviceOrders = pgTable("ServiceOrder", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull(),
  firstName: text("firstName").notNull().default(""),
  lastName: text("lastName"),
  phone: text("phone"),
  checkoutGroupId: text("checkoutGroupId"),
  invoiceRequested: boolean("invoiceRequested").notNull().default(false),
  invoiceName: text("invoiceName"),
  invoiceTaxId: text("invoiceTaxId"),
  invoiceStreet: text("invoiceStreet"),
  invoiceCity: text("invoiceCity"),
  invoicePostalCode: text("invoicePostalCode"),
  invoiceProvince: text("invoiceProvince"),
  termsAcceptedAt: timestamp("termsAcceptedAt"),
  termsAcceptedIp: text("termsAcceptedIp"),
  toolSlug: text("toolSlug").notNull(),
  priceGrosze: integer("priceGrosze").notNull(),
  currency: text("currency").notNull().default("PLN"),
  status: serviceOrderStatusEnum("status").notNull().default("PENDING"),
  stripeSessionId: text("stripeSessionId").unique(),
  stripePaymentId: text("stripePaymentId"),
  promotionCode: text("promotionCode"),
  questionnaireData: json("questionnaireData"),
  formToken: text("formToken").notNull().unique().$defaultFn(() => crypto.randomUUID()),
  resultMarkdown: text("resultMarkdown"),
  generateAttempts: integer("generateAttempts").notNull().default(0),
  deliveryAttempts: integer("deliveryAttempts").notNull().default(0),
  error: text("error"),
  deliveredAt: timestamp("deliveredAt"),
  followUpSentAt: timestamp("followUpSentAt"),
  invoiceId: text("invoiceId"),
  invoiceUrl: text("invoiceUrl"),
  createdAt: timestamp("createdAt").notNull().default(sql`now()`),
  updatedAt: timestamp("updatedAt").notNull().default(sql`now()`).$onUpdateFn(() => new Date()),
}, (t) => [
  index("ServiceOrder_email_idx").on(t.email),
  index("ServiceOrder_status_idx").on(t.status),
  index("ServiceOrder_toolSlug_idx").on(t.toolSlug),
  index("ServiceOrder_status_generateAttempts_idx").on(t.status, t.generateAttempts),
  index("ServiceOrder_stripePaymentId_idx").on(t.stripePaymentId),
  index("ServiceOrder_deliveredAt_followUp_idx").on(t.deliveredAt, t.followUpSentAt),
]);

export const processedEvents = pgTable("ProcessedEvent", {
  id: text("id").primaryKey(),
  type: text("type").notNull(),
  createdAt: timestamp("createdAt").notNull().default(sql`now()`),
}, (t) => [
  index("ProcessedEvent_createdAt_idx").on(t.createdAt),
]);

export const newsletterSubscribers = pgTable("NewsletterSubscriber", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  email: text("email").notNull().unique(),
  source: text("source"),
  confirmed: boolean("confirmed").notNull().default(false),
  createdAt: timestamp("createdAt").notNull().default(sql`now()`),
  updatedAt: timestamp("updatedAt").notNull().default(sql`now()`).$onUpdateFn(() => new Date()),
});

export const testimonials = pgTable("Testimonial", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  author: text("author").notNull(),
  location: text("location"),
  role: text("role"),
  productSlug: text("productSlug"),
  toolSlug: text("toolSlug"),
  rating: integer("rating").notNull().default(5),
  content: text("content").notNull(),
  published: boolean("published").notNull().default(true),
  createdAt: timestamp("createdAt").notNull().default(sql`now()`),
}, (t) => [
  index("Testimonial_published_idx").on(t.published),
  index("Testimonial_productSlug_idx").on(t.productSlug),
  index("Testimonial_toolSlug_idx").on(t.toolSlug),
]);

export const blogPosts = pgTable("BlogPost", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  excerpt: text("excerpt").notNull(),
  bodyMd: text("bodyMd").notNull(),
  coverEmoji: text("coverEmoji"),
  tags: text("tags").array().notNull().default(sql`'{}'::text[]`),
  published: boolean("published").notNull().default(true),
  publishedAt: timestamp("publishedAt").notNull().default(sql`now()`),
  updatedAt: timestamp("updatedAt").notNull().default(sql`now()`).$onUpdateFn(() => new Date()),
}, (t) => [
  index("BlogPost_published_publishedAt_idx").on(t.published, t.publishedAt),
]);

export const referrals = pgTable("Referral", {
  id: text("id").primaryKey().$defaultFn(() => crypto.randomUUID()),
  code: text("code").notNull().unique(),
  ownerEmail: text("ownerEmail").notNull(),
  visits: integer("visits").notNull().default(0),
  conversions: integer("conversions").notNull().default(0),
  totalGrosze: integer("totalGrosze").notNull().default(0),
  createdAt: timestamp("createdAt").notNull().default(sql`now()`),
}, (t) => [
  index("Referral_ownerEmail_idx").on(t.ownerEmail),
]);

export const documentTemplates = pgTable("DocumentTemplate", {
  productSlug: text("productSlug").primaryKey(),
  markdownTemplate: text("markdownTemplate").notNull().default(""),
  docKind: text("docKind").notNull(),
  modelUsed: text("modelUsed"),
  status: documentTemplateStatusEnum("status").notNull().default("GENERATING"),
  hitCount: integer("hitCount").notNull().default(0),
  generationAttempts: integer("generationAttempts").notNull().default(0),
  lastError: text("lastError"),
  createdAt: timestamp("createdAt").notNull().default(sql`now()`),
  updatedAt: timestamp("updatedAt").notNull().default(sql`now()`).$onUpdateFn(() => new Date()),
}, (t) => [
  index("DocumentTemplate_status_idx").on(t.status),
]);

export type Order = typeof orders.$inferSelect;
export type ServiceOrder = typeof serviceOrders.$inferSelect;
export type NewOrder = typeof orders.$inferInsert;
export type NewServiceOrder = typeof serviceOrders.$inferInsert;
