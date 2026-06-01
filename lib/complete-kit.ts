import type { Usluga } from "./uslugi";
import { extractBranch } from "./catalog-curation";

export type ServiceVertical =
  | "strony"
  | "sklepy"
  | "wordpress"
  | "shopify"
  | "marketing"
  | "opieka"
  | "integracja"
  | "migracja";

const DEFAULT_PRICES: Record<string, number> = {
  "strony-internetowe": 249000,
  "sklepy-internetowe": 599000,
  wordpress: 249000,
  "shopify-shoper": 799000,
  "reklama-marketing": 99000,
  "opieka-techniczna": 29900,
  integracje: 49000,
  "migracje-naprawy": 99000,
};

function verticalLabel(vertical: ServiceVertical): string {
  switch (vertical) {
    case "strony":
      return "Strona internetowa";
    case "sklepy":
      return "Sklep internetowy";
    case "wordpress":
      return "WordPress";
    case "shopify":
      return "Shopify / Shoper";
    case "marketing":
      return "Reklama online";
    case "opieka":
      return "Opieka techniczna";
    case "integracja":
      return "Integracja";
    case "migracja":
      return "Migracja / naprawa";
  }
}

export function verticalFromCategory(category: string): ServiceVertical {
  switch (category) {
    case "strony-internetowe":
      return "strony";
    case "sklepy-internetowe":
      return "sklepy";
    case "wordpress":
      return "wordpress";
    case "shopify-shoper":
      return "shopify";
    case "reklama-marketing":
      return "marketing";
    case "opieka-techniczna":
      return "opieka";
    case "integracje":
      return "integracja";
    case "migracje-naprawy":
      return "migracja";
    default:
      return "strony";
  }
}

export function getDefaultPriceGrosze(category: string): number {
  return DEFAULT_PRICES[category] ?? 249000;
}

export function buildUnifiedSeoTitle(branch: string, vertical: ServiceVertical): string {
  return `${verticalLabel(vertical)} — ${branch}`;
}

export function buildUnifiedShortDesc(branch: string, vertical: ServiceVertical): string {
  const text = `${verticalLabel(vertical)} dla „${branch}" — pakiet z jasnym scope, realizacja 7–14 dni, gwarancja poprawek 30 dni. Zamów online na stronyodzaraz.pl.`;
  if (text.length <= 160) return text;
  return text.slice(0, 157).trimEnd() + "…";
}

export function getKitContentsList(vertical: ServiceVertical): string[] {
  switch (vertical) {
    case "strony":
      return [
        "Projekt i wdrożenie strony WordPress",
        "Responsywny motyw dopasowany do branży",
        "Do 5–10 podstron (zależnie od pakietu)",
        "Formularz kontaktowy + mapa Google",
        "Google Analytics 4 + Search Console",
        "Certyfikat SSL i konfiguracja hostingu",
        "Podstawowe SEO on-page",
        "Szkolenie z panelu administracyjnego",
      ];
    case "sklepy":
      return [
        "Sklep WooCommerce / Shopify / Shoper od zera",
        "Konfiguracja produktów i kategorii",
        "Polskie płatności: Przelewy24, BLIK, PayU",
        "Integracja kurierów: InPost, DPD",
        "Regulamin sklepu + polityka prywatności",
        "Fakturowanie (inFakt / wFirma)",
        "Szkolenie z obsługi zamówień",
        "Gwarancja poprawek 30 dni",
      ];
    case "opieka":
      return [
        "Codzienny backup strony/sklepu",
        "Aktualizacje WordPress, motywu i wtyczek",
        "Monitoring uptime 24/7",
        "2–4h wsparcia technicznego miesięcznie",
        "Raport miesięczny ze stanu strony",
        "Priorytetowa reakcja na awarie",
      ];
    default:
      return [
        "Analiza wymagań i brief projektu",
        "Realizacja zgodnie z pakietem",
        "Testy przed oddaniem",
        "Dokumentacja i szkolenie",
        "Gwarancja poprawek 30 dni",
        "Wsparcie mailowe po wdrożeniu",
      ];
  }
}

function rewriteLongDescOpening(p: Usluga, seoTitle: string, branch: string): string {
  const opening = `${seoTitle} to productized service dla „${branch}" — jasny scope, stała cena, realizacja w ustalonym terminie. Zamawiasz online, wypełniasz brief, my budujemy.\n\n`;
  const body = p.longDesc.replace(/^[^\n]+\n\n/, "");
  return opening + body;
}

export function normalizePrimaryProduct(p: Usluga): Usluga {
  const branch = extractBranch(p);
  const vertical = verticalFromCategory(p.category);
  const seoTitle = buildUnifiedSeoTitle(branch, vertical);
  return {
    ...p,
    seoTitle,
    shortDesc: buildUnifiedShortDesc(branch, vertical),
    priceGrosze: p.priceGrosze || getDefaultPriceGrosze(p.category),
    longDesc: rewriteLongDescOpening(p, seoTitle, branch),
  };
}
