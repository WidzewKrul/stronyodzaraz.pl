import { db } from "./db";
import { documentTemplates, orders, serviceOrders } from "./schema";
import { eq, lt, and, sql, isNotNull, isNull, or } from "drizzle-orm";
import { deliverProjectBrief, sendAdminOrderFailedAlert } from "./email";
import {
  buildPersonalizedDocument,
  extractProductSlugFromToolSlug,
  questionnaireFromOrder,
} from "./project-brief-generator";
import { log, redactPII } from "./logger";

const MAX_GEN_ATTEMPTS = 3;
const MAX_DELIVERY_ATTEMPTS = 5;
const STUCK_GENERATING_MS = 10 * 60 * 1000;
const STUCK_TEMPLATE_MS = 15 * 60 * 1000;

export type ProcessResult = {
  filledProcessed: number;
  failedRetried: number;
  paidDelivered: number;
  deliveryRetried: number;
  failedMarked: number;
  templateRetried: number;
};

export async function processPendingJobs(): Promise<ProcessResult> {
  const result: ProcessResult = {
    filledProcessed: 0,
    failedRetried: 0,
    paidDelivered: 0,
    deliveryRetried: 0,
    failedMarked: 0,
    templateRetried: 0,
  };

  const filled = await db
    .select()
    .from(serviceOrders)
    .where(
      and(
        eq(serviceOrders.status, "FILLED"),
        lt(serviceOrders.generateAttempts, MAX_GEN_ATTEMPTS),
        isNull(serviceOrders.resultMarkdown),
      ),
    )
    .limit(10);

  for (const order of filled) {
    try {
      await runGenerate(order.id);
      result.filledProcessed++;
    } catch (err) {
      log.error("[worker] generate failed", { orderId: order.id, err: String(err) });
    }
  }

  const exhausted = await db
    .select()
    .from(serviceOrders)
    .where(
      and(
        eq(serviceOrders.status, "FILLED"),
        sql`${serviceOrders.generateAttempts} >= ${MAX_GEN_ATTEMPTS}`,
        isNull(serviceOrders.deliveredAt),
      ),
    )
    .limit(10);

  for (const order of exhausted) {
    await markOrderFailed(order.id, order.error ?? "Przekroczono limit prób generowania", order);
    result.failedMarked++;
  }

  const pendingDelivery = await db
    .select()
    .from(serviceOrders)
    .where(
      and(
        isNotNull(serviceOrders.resultMarkdown),
        isNull(serviceOrders.deliveredAt),
        lt(serviceOrders.deliveryAttempts, MAX_DELIVERY_ATTEMPTS),
        or(
          eq(serviceOrders.status, "FILLED"),
          eq(serviceOrders.status, "GENERATING"),
          eq(serviceOrders.status, "COMPLETED"),
        ),
      ),
    )
    .limit(10);

  for (const order of pendingDelivery) {
    try {
      await runDeliveryOnly(order);
      result.deliveryRetried++;
    } catch (err) {
      log.error("[worker] delivery retry failed", { orderId: order.id, err: String(err) });
    }
  }

  const stuck = await db
    .select()
    .from(serviceOrders)
    .where(
      and(
        eq(serviceOrders.status, "GENERATING"),
        lt(serviceOrders.updatedAt, new Date(Date.now() - STUCK_GENERATING_MS)),
        lt(serviceOrders.generateAttempts, MAX_GEN_ATTEMPTS),
      ),
    )
    .limit(10);

  for (const order of stuck) {
    const resetStatus = order.resultMarkdown ? "FILLED" : "FILLED";
    await db
      .update(serviceOrders)
      .set({ status: resetStatus, error: "Reset po zawieszeniu generowania" })
      .where(eq(serviceOrders.id, order.id));
    result.failedRetried++;
  }

  const stuckTemplates = await db
    .select()
    .from(documentTemplates)
    .where(
      and(
        eq(documentTemplates.status, "GENERATING"),
        lt(documentTemplates.updatedAt, new Date(Date.now() - STUCK_TEMPLATE_MS)),
      ),
    )
    .limit(5);

  for (const tpl of stuckTemplates) {
    await db
      .update(documentTemplates)
      .set({ status: "FAILED", lastError: "Reset po zawieszeniu generowania szablonu" })
      .where(eq(documentTemplates.productSlug, tpl.productSlug));
    result.templateRetried++;
  }

  const failedTemplates = await db
    .select()
    .from(documentTemplates)
    .where(
      and(
        eq(documentTemplates.status, "FAILED"),
        lt(documentTemplates.generationAttempts, 3),
        lt(documentTemplates.updatedAt, new Date(Date.now() - 30 * 60 * 1000)),
      ),
    )
    .limit(5);

  for (const tpl of failedTemplates) {
    await db
      .update(documentTemplates)
      .set({ status: "GENERATING", lastError: null })
      .where(eq(documentTemplates.productSlug, tpl.productSlug));
    result.templateRetried++;
  }

  const paid = await db
    .select()
    .from(orders)
    .where(and(eq(orders.status, "PAID"), lt(orders.deliveryAttempts, MAX_DELIVERY_ATTEMPTS)))
    .limit(5);

  for (const order of paid) {
    await db
      .update(orders)
      .set({
        status: "FAILED",
        lastError: "Legacy shop order — use gotowe-pisma flow",
        deliveryAttempts: sql`${orders.deliveryAttempts} + 1`,
      })
      .where(eq(orders.id, order.id));
    result.paidDelivered++;
  }

  return result;
}

async function markOrderFailed(
  orderId: string,
  error: string,
  order?: { email: string; toolSlug: string; id: string },
) {
  await db
    .update(serviceOrders)
    .set({ status: "FAILED", error: redactPII(error) })
    .where(eq(serviceOrders.id, orderId));

  if (order) {
    try {
      await sendAdminOrderFailedAlert({
        orderId: order.id,
        email: order.email,
        toolSlug: order.toolSlug,
        error,
      });
    } catch (err) {
      log.error("[worker] admin alert failed", { orderId, err: String(err) });
    }
  }
}

async function runGenerate(orderId: string) {
  const [order] = await db
    .update(serviceOrders)
    .set({ status: "GENERATING", generateAttempts: sql`${serviceOrders.generateAttempts} + 1` })
    .where(eq(serviceOrders.id, orderId))
    .returning();

  if (!order) return;

  if (!order.toolSlug.startsWith("uslugi:")) {
    await markOrderFailed(orderId, "Unknown tool", order);
    return;
  }

  if (order.resultMarkdown) {
    await runDeliveryOnly(order);
    return;
  }

  await runUslugaGenerate(order);
}

async function runUslugaGenerate(order: {
  id: string;
  toolSlug: string;
  email: string;
  questionnaireData: unknown;
  resultMarkdown?: string | null;
  generateAttempts?: number;
}) {
  const productSlug = extractProductSlugFromToolSlug(order.toolSlug);
  const questionnaire = questionnaireFromOrder(order.questionnaireData);

  try {
    const { markdown, title, fromCache } = await buildPersonalizedDocument(productSlug, questionnaire);

    await db
      .update(serviceOrders)
      .set({ resultMarkdown: markdown, error: null })
      .where(eq(serviceOrders.id, order.id));

    await runDeliveryOnly({
      ...order,
      resultMarkdown: markdown,
      documentTitle: title,
      fromCache,
    });
  } catch (err) {
    const msg = redactPII(err instanceof Error ? err.message : String(err));
    const [current] = await db
      .select({ generateAttempts: serviceOrders.generateAttempts })
      .from(serviceOrders)
      .where(eq(serviceOrders.id, order.id))
      .limit(1);

    const attempts = current?.generateAttempts ?? order.generateAttempts ?? 0;
    const failed = attempts >= MAX_GEN_ATTEMPTS;

    await db
      .update(serviceOrders)
      .set({
        status: failed ? "FAILED" : "FILLED",
        error: msg,
      })
      .where(eq(serviceOrders.id, order.id));

    if (failed) {
      await sendAdminOrderFailedAlert({
        orderId: order.id,
        email: order.email,
        toolSlug: order.toolSlug,
        error: msg,
      });
    }
    throw err;
  }
}

async function runDeliveryOnly(order: {
  id: string;
  toolSlug: string;
  email: string;
  firstName?: string | null;
  resultMarkdown?: string | null;
  documentTitle?: string;
  fromCache?: boolean;
  deliveryAttempts?: number;
}) {
  if (!order.resultMarkdown) {
    throw new Error("Brak resultMarkdown — nie można dostarczyć bez regeneracji");
  }

  const productSlug = extractProductSlugFromToolSlug(order.toolSlug);
  const title = order.documentTitle ?? productSlug;

  await db
    .update(serviceOrders)
    .set({ deliveryAttempts: sql`${serviceOrders.deliveryAttempts} + 1` })
    .where(eq(serviceOrders.id, order.id));

  const delivery = await deliverProjectBrief({
    to: order.email,
    firstName: order.firstName,
    documentTitle: title,
    orderId: order.id,
    toolSlug: order.toolSlug,
    resultMarkdown: order.resultMarkdown,
    fromCache: order.fromCache,
  });

  if (!delivery.sent) {
    const msg = delivery.error ?? "Nie udało się wysłać e-maila";
    const attempts = (order.deliveryAttempts ?? 0) + 1;
    if (attempts >= MAX_DELIVERY_ATTEMPTS) {
      await markOrderFailed(order.id, msg, {
        id: order.id,
        email: order.email,
        toolSlug: order.toolSlug,
      });
    } else {
      await db
        .update(serviceOrders)
        .set({ status: "FILLED", error: msg })
        .where(eq(serviceOrders.id, order.id));
    }
    throw new Error(msg);
  }

  await db
    .update(serviceOrders)
    .set({
      status: "COMPLETED",
      deliveredAt: new Date(),
      error: null,
    })
    .where(eq(serviceOrders.id, order.id));

  log.info("[worker] order delivered", {
    orderId: order.id,
    productSlug,
    pdfOk: delivery.pdfOk,
    docxOk: delivery.docxOk,
    fallback: delivery.fallbackUsed,
  });
}

export function kickoffGenerate(orderId: string): void {
  runGenerate(orderId).catch((err) => {
    log.error("[worker] kickoff generate failed", { orderId, err: String(err) });
  });
}
