/** D+3 / D+7 drip copy per purchased category — UPSELL-CROSSSELL.md */

export type DripCategory =
  | "strony-internetowe"
  | "sklepy-internetowe"
  | "wordpress"
  | "shopify-shoper"
  | "reklama-marketing"
  | "opieka-techniczna"
  | "integracje"
  | "migracje-naprawy";

type DripTemplate = {
  subject: string;
  headline: string;
  bodyHtml: string;
  ctaLabel: string;
  ctaPath: string;
  portfolioLine?: string;
};

const DEFAULT_CATEGORY: DripCategory = "strony-internetowe";

const D3: Record<DripCategory, DripTemplate> = {
  "strony-internetowe": {
    subject: "Checklist materiałów do Twojej strony",
    headline: "Przyspiesz realizację — checklist materiałów",
    bodyHtml: `<p style="color:#334155;line-height:1.6;">Przygotuj: logo (PNG/SVG), teksty o firmie, zdjęcia, preferencje kolorystyczne, 2–3 linki inspiracji. Brakuje copy? Odpisz — pomożemy.</p>`,
    ctaLabel: "Zobacz opiekę WordPress",
    ctaPath: "/uslugi/opieka-techniczna",
  },
  "sklepy-internetowe": {
    subject: "Checklist produktów i integracji sklepu",
    headline: "Co przygotować przed startem sklepu",
    bodyHtml: `<p style="color:#334155;line-height:1.6;">Lista produktów (CSV lub Excel), cenniki wysyłki, logo, regulamin sklepu, konto Przelewy24/InPost jeśli masz. Przyspieszy to wdrożenie o kilka dni.</p>`,
    ctaLabel: "Integracje e-commerce",
    ctaPath: "/uslugi/integracje",
    portfolioLine: "Regulamin sklepu online: <a href=\"https://gotowyregulamin.pl\" style=\"color:#4f46e5;\">gotowyregulamin.pl</a>",
  },
  wordpress: {
    subject: "Materiały do wdrożenia WordPress",
    headline: "Checklist przed wdrożeniem WP",
    bodyHtml: `<p style="color:#334155;line-height:1.6;">Dostęp do hostingu, domena, treści podstron, logo. Jeśli migrujesz — dane logowania do starej strony.</p>`,
    ctaLabel: "Opieka techniczna WordPress",
    ctaPath: "/uslugi/opieka-techniczna",
  },
  "shopify-shoper": {
    subject: "Checklist startu Shopify / Shoper",
    headline: "Przygotuj sklep SaaS szybciej",
    bodyHtml: `<p style="color:#334155;line-height:1.6;">Konto platformy, lista produktów, zdjęcia, dane firmy do płatności. Jeśli masz domenę — dostęp DNS.</p>`,
    ctaLabel: "Pakiety Shopify i Shoper",
    ctaPath: "/uslugi/shopify-shoper",
  },
  "reklama-marketing": {
    subject: "Dostęp do kont reklamowych — checklist",
    headline: "Przed startem kampanii",
    bodyHtml: `<p style="color:#334155;line-height:1.6;">Dostęp do Google Ads / Meta Business, strona docelowa live, GA4 — przyspieszymy konfigurację trackingu i pierwszej kampanii.</p>`,
    ctaLabel: "Pakiety Google Ads",
    ctaPath: "/uslugi/reklama-marketing",
  },
  "opieka-techniczna": {
    subject: "Dostępy do opieki technicznej",
    headline: "Co przekazać do abonamentu",
    bodyHtml: `<p style="color:#334155;line-height:1.6;">URL strony, dostęp admin WP/hosting, lista krytycznych wtyczek. Backup włączymy w pierwszym tygodniu.</p>`,
    ctaLabel: "Google Ads na gotową stronę",
    ctaPath: "/uslugi/reklama-marketing",
  },
  integracje: {
    subject: "Dane do integracji płatności / kurierów",
    headline: "Checklist integracji",
    bodyHtml: `<p style="color:#334155;line-height:1.6;">Klucze API Przelewy24/PayU, konto InPost, środowisko testowe sklepu. Po integracji warto zabezpieczyć sklep abonamentem.</p>`,
    ctaLabel: "Opieka po integracji",
    ctaPath: "/uslugi/opieka-techniczna",
  },
  "migracje-naprawy": {
    subject: "Dostępy do migracji / audytu",
    headline: "Przygotuj migrację bez przestojów",
    bodyHtml: `<p style="color:#334155;line-height:1.6;">FTP/SSH, baza danych, lista starych URL (jeśli masz). Po migracji polecamy monitoring 301 i opiekę.</p>`,
    ctaLabel: "Opieka techniczna",
    ctaPath: "/uslugi/opieka-techniczna",
  },
};

const D7: Record<DripCategory, DripTemplate> = {
  "strony-internetowe": {
    subject: "Google Ads — więcej klientów na gotową stronę",
    headline: "Pozyskaj klientów z Google",
    bodyHtml: `<p style="color:#334155;line-height:1.6;">Strona gotowa? Setup Google Ads od <strong>990 zł</strong> — konto, konwersje, pierwsza kampania pod Twoją branżę.</p>`,
    ctaLabel: "Google Ads setup",
    ctaPath: "/uslugi/reklama-marketing",
    portfolioLine: undefined,
  },
  "sklepy-internetowe": {
    subject: "Performance Max i Merchant Center",
    headline: "Ruch na sklep — Ads + Merchant",
    bodyHtml: `<p style="color:#334155;line-height:1.6;">Po starcie sklepu warto włączyć Google Ads Performance Max i feed produktów. Setup od 990 zł + opieka sklepu od 299 zł/mc.</p>`,
    ctaLabel: "Marketing e-commerce",
    ctaPath: "/uslugi/reklama-marketing",
    portfolioLine: "Regulamin sklepu: <a href=\"https://gotowyregulamin.pl\" style=\"color:#4f46e5;\">gotowyregulamin.pl</a>",
  },
  wordpress: {
    subject: "Core Web Vitals — optymalizacja po wdrożeniu",
    headline: "Przyspiesz WordPress (CWV)",
    bodyHtml: `<p style="color:#334155;line-height:1.6;">Po wdrożeniu warto zoptymalizować LCP i cache — pakiet CWV w kategorii migracji/napraw lub abonament opieki z monitoringiem.</p>`,
    ctaLabel: "Migracje i optymalizacja",
    ctaPath: "/uslugi/migracje-naprawy",
  },
  "shopify-shoper": {
    subject: "Meta Ads + analityka sklepu SaaS",
    headline: "Rozszerz kanały sprzedaży",
    bodyHtml: `<p style="color:#334155;line-height:1.6;">Meta Ads setup od 990 zł + GA4 pod Twój sklep — więcej konwersji z social i lepszy ROAS.</p>`,
    ctaLabel: "Meta Ads i GA4",
    ctaPath: "/uslugi/reklama-marketing",
  },
  "reklama-marketing": {
    subject: "Landing pod kampanię — wyższy Quality Score",
    headline: "Dedykowany landing pod Ads",
    bodyHtml: `<p style="color:#334155;line-height:1.6;">Kampania działa lepiej z landingiem dopasowanym do reklamy. Pakiety landing od 1490 zł w katalogu stron.</p>`,
    ctaLabel: "Landing page",
    ctaPath: "/uslugi/strony-internetowe",
  },
  "opieka-techniczna": {
    subject: "Nowe podstrony i integracje w abonamencie",
    headline: "Rozbuduj stronę bez ryzyka",
    bodyHtml: `<p style="color:#334155;line-height:1.6;">W ramach opieki możesz dokupić podstrony, integracje lub audyt bezpieczeństwa. Sklep B2C? Sprawdź pakiety e-commerce.</p>`,
    ctaLabel: "Sklepy internetowe",
    ctaPath: "/uslugi/sklepy-internetowe",
  },
  integracje: {
    subject: "Kolejna integracja lub opieka",
    headline: "Dokończ ekosystem sklepu",
    bodyHtml: `<p style="color:#334155;line-height:1.6;">Masz P24? Dodaj InPost lub BaseLinker. Po integracjach — abonament opieki od 299 zł/mc.</p>`,
    ctaLabel: "Katalog integracji",
    ctaPath: "/uslugi/integracje",
  },
  "migracje-naprawy": {
    subject: "SEO audit i Google Ads po migracji",
    headline: "Utrzymaj ruch po migracji",
    bodyHtml: `<p style="color:#334155;line-height:1.6;">Po migracji warto zweryfikować indeksację i włączyć kampanie na nowe URL. Opieka 12 mc promo w katalogu.</p>`,
    ctaLabel: "Google Ads setup",
    ctaPath: "/uslugi/reklama-marketing",
  },
};

export function normalizeDripCategory(raw?: string | null): DripCategory {
  let c = (raw ?? "").trim();
  if (c === "migracje") c = "migracje-naprawy";
  if (c in D3) return c as DripCategory;
  return DEFAULT_CATEGORY;
}

export function getDripTemplate(day: 3 | 7, category: string): DripTemplate {
  const cat = normalizeDripCategory(category);
  return day === 3 ? D3[cat] : D7[cat];
}

export function extractCategoryFromOrderItems(
  items: unknown,
  lookupCategory?: (slug: string) => string | null,
): string | null {
  if (!Array.isArray(items) || items.length === 0) return null;
  const first = items[0] as Record<string, unknown>;
  if (typeof first.category === "string") return first.category;
  if (typeof first.slug === "string") {
    const slug = first.slug as string;
    const fromTool =
      typeof first.toolSlug === "string" && (first.toolSlug as string).startsWith("uslugi:")
        ? (first.toolSlug as string).slice("uslugi:".length)
        : slug;
    return lookupCategory?.(fromTool) ?? null;
  }
  return null;
}
