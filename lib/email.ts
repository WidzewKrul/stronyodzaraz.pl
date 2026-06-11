import { Resend } from "resend";
import { log } from "./logger";
import { resendFrom, contactEmail, siteUrl as getSiteUrl } from "./env";
import { buildToolResultAttachments } from "./tool-result-artifacts";
import { getDripTemplate } from "./drip-templates";

const apiKey = process.env.RESEND_API_KEY;
const from = resendFrom();
const contact = contactEmail();
const siteUrl = getSiteUrl();

const resend = apiKey ? new Resend(apiKey) : null;

export type OrderItem = { slug: string; name: string; priceGrosze: number; quantity: number };
type EmailAttachment = { filename: string; content: string; contentType?: string };

export type BriefDeliveryResult = {
  sent: boolean;
  pdfOk: boolean;
  docxOk: boolean;
  fallbackUsed: boolean;
  error?: string;
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function wrapper(title: string, body: string, footer?: string): string {
  return `<!doctype html><html lang="pl"><head><meta charset="utf-8"/><title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:0;background:#f8fafc;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;color:#0f172a;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:24px 0;">
<tr><td align="center">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">
    <tr><td style="padding:24px 28px;background:#4f46e5;color:#fff;font-weight:700;font-size:18px;">stronyodzaraz.pl — Strony i sklepy internetowe</td></tr>
    <tr><td style="padding:28px;">${body}</td></tr>
    <tr><td style="padding:20px 28px;background:#f1f5f9;font-size:12px;color:#64748b;">
      ${footer ?? ""}
      stronyodzaraz.pl · WordPress · Shopify · Shoper
    </td></tr>
  </table>
</td></tr></table>
</body></html>`;
}

async function safeSend(params: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
  attachments?: EmailAttachment[];
}): Promise<boolean> {
  if (!resend) {
    log.warn("[email] RESEND_API_KEY missing", { to: params.to, subject: params.subject });
    return false;
  }
  // Bounded retry with backoff so a transient Resend hiccup (429/5xx/network) on a
  // one-shot send (contact form, auto-reply, drip) doesn't permanently drop the message.
  const MAX_ATTEMPTS = 3;
  let lastErr: unknown;
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const res = await resend.emails.send({
        from,
        to: params.to,
        subject: params.subject,
        html: params.html,
        replyTo: params.replyTo,
        attachments: params.attachments,
      });
      if ("error" in res && res.error) {
        throw new Error(String(res.error.message ?? res.error));
      }
      return true;
    } catch (err) {
      lastErr = err;
      if (attempt < MAX_ATTEMPTS) {
        await new Promise((r) => setTimeout(r, 400 * attempt));
      }
    }
  }
  throw lastErr instanceof Error ? lastErr : new Error(String(lastErr));
}

export async function sendAdminOrderFailedAlert(params: {
  orderId: string;
  email: string;
  toolSlug: string;
  error: string;
}) {
  const html = wrapper(
    "Zamówienie nieudane",
    `<h1 style="margin:0 0 12px;font-size:20px;color:#b91c1c;">Zamówienie nieudane</h1>
     <p style="margin:0 0 8px;color:#334155;"><strong>ID:</strong> ${escapeHtml(params.orderId)}</p>
     <p style="margin:0 0 8px;color:#334155;"><strong>E-mail klienta:</strong> ${escapeHtml(params.email)}</p>
     <p style="margin:0 0 8px;color:#334155;"><strong>Usługa:</strong> ${escapeHtml(params.toolSlug)}</p>
     <pre style="white-space:pre-wrap;background:#fef2f2;padding:12px;border-radius:8px;color:#991b1b;">${escapeHtml(params.error)}</pre>`,
  );
  await safeSend({
    to: contact,
    subject: `[FAILED] ${params.orderId.slice(0, 8)} — ${params.toolSlug.replace(/^uslugi:/, "")}`,
    html,
    replyTo: params.email,
  });
}

export async function sendAdminAttachmentFailureAlert(params: {
  orderId: string;
  email: string;
  toolSlug: string;
  errors: string[];
}) {
  const html = wrapper(
    "Błąd załączników briefu",
    `<h1 style="margin:0 0 12px;font-size:20px;color:#b45309;">PDF/DOCX briefu nie wygenerowano</h1>
     <p><strong>ID:</strong> ${escapeHtml(params.orderId)}</p>
     <p><strong>Klient:</strong> ${escapeHtml(params.email)}</p>
     <ul>${params.errors.map((e) => `<li>${escapeHtml(e)}</li>`).join("")}</ul>`,
  );
  await safeSend({ to: contact, subject: `[Brief PDF] ${params.orderId.slice(0, 8)}`, html });
}

export async function deliverProjectBrief(params: {
  to: string;
  firstName?: string | null;
  documentTitle: string;
  orderId: string;
  toolSlug: string;
  resultMarkdown: string;
  fromCache?: boolean;
}): Promise<BriefDeliveryResult> {
  let attachments: EmailAttachment[] | undefined;
  let pdfOk = false;
  let docxOk = false;
  let fallbackUsed = false;

  try {
    const built = await buildToolResultAttachments({
      toolName: params.documentTitle,
      toolSlug: params.toolSlug,
      orderId: params.orderId,
      resultMarkdown: params.resultMarkdown,
    });
    pdfOk = built.pdfOk;
    docxOk = built.docxOk;

    if (pdfOk && docxOk) {
      attachments = built.attachments.map((item) => ({
        filename: item.filename,
        content: item.content.toString("base64"),
        contentType: item.contentType,
      }));
    } else {
      fallbackUsed = true;
      attachments = built.attachments
        .filter((item) => item.filename.endsWith(".md"))
        .map((item) => ({
          filename: item.filename,
          content: item.content.toString("base64"),
          contentType: item.contentType,
        }));
      await sendAdminAttachmentFailureAlert({
        orderId: params.orderId,
        email: params.to,
        toolSlug: params.toolSlug,
        errors: built.errors.length ? built.errors : ["PDF/DOCX build failed"],
      }).catch(() => {});
    }
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { sent: false, pdfOk: false, docxOk: false, fallbackUsed: true, error: msg };
  }

  const greeting = params.firstName?.trim() ? `Cześć ${escapeHtml(params.firstName.trim())},` : "Cześć,";
  const attachmentNote =
    pdfOk && docxOk
      ? `<p style="margin:0 0 16px;color:#334155;line-height:1.6;">Zamówienie <strong>#${params.orderId.slice(0, 8)}</strong> — w załączniku brief projektu w <strong>PDF i DOCX</strong>.</p>`
      : `<p style="margin:0 0 16px;color:#334155;line-height:1.6;">Zamówienie <strong>#${params.orderId.slice(0, 8)}</strong> — brief projektu poniżej.</p>`;

  const html = wrapper(
    "Brief projektu gotowy",
    `<p style="margin:0 0 12px;color:#334155;font-size:15px;">${greeting}</p>
     <h1 style="margin:0 0 12px;font-size:22px;">${escapeHtml(params.documentTitle)}</h1>
     ${attachmentNote}
     <p style="margin:0 0 16px;color:#334155;line-height:1.6;">Skontaktujemy się w ciągu <strong>24h roboczych</strong> z potwierdzeniem terminu realizacji. Przygotuj materiały (logo, treści, zdjęcia) — przyspieszy to prace.</p>
     <p style="margin:0;color:#64748b;font-size:13px;">Realizacja: 7–14 dni roboczych w zależności od pakietu.</p>`,
  );

  try {
    const sent = await safeSend({
      to: params.to,
      subject: `${params.documentTitle} · zamówienie #${params.orderId.slice(0, 8)}`,
      html,
      attachments,
    });
    return { sent: !!sent, pdfOk, docxOk, fallbackUsed };
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return { sent: false, pdfOk, docxOk, fallbackUsed, error: msg };
  }
}

export async function sendOrderConfirmationEmail(params: {
  to: string;
  firstName?: string | null;
  orderId: string;
  items: OrderItem[];
}) {
  const list = params.items.map((i) => `<li>${escapeHtml(i.name)} — ${(i.priceGrosze / 100).toFixed(2)} zł</li>`).join("");
  const greeting = params.firstName?.trim() ? `Cześć ${escapeHtml(params.firstName.trim())},` : "Cześć,";
  const html = wrapper(
    "Potwierdzenie zamówienia",
    `<p style="margin:0 0 12px;">${greeting}</p>
     <h1 style="margin:0 0 12px;font-size:22px;">Dziękujemy za zamówienie!</h1>
     <p style="color:#334155;line-height:1.6;">Zamówienie <strong>#${params.orderId.slice(0, 8)}</strong> zostało opłacone.</p>
     <ul style="margin:16px 0;padding-left:18px;color:#334155;">${list}</ul>
     <p style="color:#334155;line-height:1.6;"><strong>Następny krok:</strong> uzupełnij brief projektu w koszyku (dane firmy, preferencje, materiały). Po wypełnieniu otrzymasz brief PDF na e-mail.</p>
     <p style="margin-top:20px;"><a href="${siteUrl}/koszyk" style="display:inline-block;background:#4f46e5;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600;">Wypełnij brief projektu</a></p>`,
  );
  await safeSend({ to: params.to, subject: `Potwierdzenie zamówienia #${params.orderId.slice(0, 8)}`, html, replyTo: contact });
}

export async function sendDripUpsellEmail(params: {
  to: string;
  orderId: string;
  day: 3 | 7;
  category?: string | null;
}) {
  const tpl = getDripTemplate(params.day, params.category ?? "strony-internetowe");
  const ctaUrl = `${siteUrl}${tpl.ctaPath.startsWith("/") ? tpl.ctaPath : `/${tpl.ctaPath}`}`;
  const portfolio = tpl.portfolioLine
    ? `<p style="margin-top:16px;font-size:13px;color:#64748b;">${tpl.portfolioLine}</p>`
    : "";
  const body = `<h1 style="margin:0 0 12px;font-size:22px;">${escapeHtml(tpl.headline)}</h1>
    ${tpl.bodyHtml}
    <p style="margin-top:20px;"><a href="${ctaUrl}" style="display:inline-block;background:#4f46e5;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600;">${escapeHtml(tpl.ctaLabel)}</a></p>
    ${portfolio}`;
  const unsubLink = `<p style="margin-top:12px;font-size:11px;color:#94a3b8;">Nie chcesz więcej wiadomości? <a href="${siteUrl}/kontakt" style="color:#94a3b8;">Napisz do nas</a> z tematem "Rezygnacja".</p>`;
  await safeSend({
    to: params.to,
    subject: tpl.subject,
    html: wrapper("stronyodzaraz.pl", body, unsubLink),
    replyTo: contact,
  });
}

export async function sendContactEmail(params: {
  from: string;
  name: string;
  phone?: string;
  projectType?: string;
  budget?: string;
  message: string;
}) {
  const html = wrapper(
    "Nowa wiadomość z formularza",
    `<p><strong>Od:</strong> ${escapeHtml(params.name)} &lt;${escapeHtml(params.from)}&gt;</p>
     ${params.phone ? `<p><strong>Telefon:</strong> ${escapeHtml(params.phone)}</p>` : ""}
     ${params.projectType ? `<p><strong>Typ projektu:</strong> ${escapeHtml(params.projectType)}</p>` : ""}
     ${params.budget ? `<p><strong>Budżet:</strong> ${escapeHtml(params.budget)}</p>` : ""}
     <div style="white-space:pre-wrap;color:#334155;margin-top:12px;">${escapeHtml(params.message)}</div>`,
  );
  await safeSend({ to: contact, subject: `[Kontakt] ${params.name}`, html, replyTo: params.from });
}

export async function sendContactAutoReply(params: { to: string; name: string }) {
  const html = wrapper(
    "Dziękujemy za wiadomość",
    `<p>Cześć ${escapeHtml(params.name)},</p>
     <p style="color:#334155;line-height:1.6;">Dziękujemy za kontakt ze stronyodzaraz.pl. Odpowiemy w ciągu <strong>24 godzin roboczych</strong>.</p>
     <p style="color:#334155;line-height:1.6;">Chcesz szybciej? Przeglądaj gotowe pakiety z ceną online:</p>
     <p style="margin-top:16px;"><a href="${siteUrl}/uslugi" style="display:inline-block;background:#4f46e5;color:#fff;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:600;">Zobacz pakiety i ceny</a></p>`,
  );
  await safeSend({ to: params.to, subject: "Otrzymaliśmy Twoją wiadomość — stronyodzaraz.pl", html });
}

/** @deprecated */
export const deliverHaccpOrder = deliverProjectBrief;
export type HaccpDeliveryResult = BriefDeliveryResult;
export const sendHaccpDeliveryEmail = deliverProjectBrief;
