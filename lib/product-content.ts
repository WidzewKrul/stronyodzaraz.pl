import type { Usluga } from "./uslugi";
import type { CategoryConfig } from "./uslugi-config";
import { extractBranch } from "./catalog-curation";
import { getKitContentsList, verticalFromCategory } from "./complete-kit";
import { inferServiceKind, type ServiceKind } from "./service-kind";

function serviceKindLabel(kind: ServiceKind): string {
  const labels: Record<ServiceKind, string> = {
    strona: "stronę internetową",
    sklep: "sklep internetowy",
    wordpress: "wdrożenie WordPress",
    opieka: "opiekę techniczną",
    marketing: "setup kampanii reklamowej",
    integracja: "integrację systemów",
    migracja: "migrację / naprawę",
    general: "usługę web",
  };
  return labels[kind];
}

function categoryContext(category: string): { sector: string; focus: string } {
  const ctx: Record<string, { sector: string; focus: string }> = {
    "strony-internetowe": { sector: "firmy", focus: "profesjonalna strona WordPress z formularzem kontaktowym, responsywnością i podstawowym SEO" },
    "sklepy-internetowe": { sector: "sklepu online", focus: "sklep z polskimi płatnościami (Przelewy24, BLIK), kurierami (InPost) i fakturowaniem" },
    wordpress: { sector: "WordPress", focus: "wdrożenie, motyw, wtyczki, bezpieczeństwo i optymalizacja wydajności" },
    "shopify-shoper": { sector: "sklepu SaaS", focus: "Shopify lub Shoper z polskimi integracjami i szybkim startem sprzedaży" },
    "reklama-marketing": { sector: "marketingu online", focus: "Google Ads, Meta Ads lub Google Analytics 4 — setup i pierwsza kampania" },
    "opieka-techniczna": { sector: "utrzymania strony", focus: "backup, aktualizacje, monitoring uptime i wsparcie techniczne w abonamencie" },
    integracje: { sector: "integracji e-commerce", focus: "połączenie sklepu z Przelewy24, InPost, Allegro, BaseLinker lub fakturowaniem" },
    "migracje-naprawy": { sector: "migracji", focus: "bezpieczne przeniesienie sklepu/strony, przekierowania 301, naprawa po ataku lub optymalizacja CWV" },
  };
  return ctx[category] ?? ctx["strony-internetowe"];
}

export function buildProductLongDesc(pismo: Usluga, config: CategoryConfig): string {
  const branch = extractBranch(pismo);
  const ctx = categoryContext(pismo.category);
  const kind = inferServiceKind(pismo.title, pismo.slug, pismo.category);
  return `${pismo.seoTitle} to productized service dla ${branch} — ${serviceKindLabel(kind)} z jasnym scope i stałą ceną.\n\n${pismo.longDesc}\n\nRealizacja obejmuje ${ctx.focus}. Dla sektora ${ctx.sector} przygotowujemy rozwiązanie dopasowane do specyfiki branży ${branch}.`;
}

export function buildWhatYouGet(pismo: Usluga, config: CategoryConfig): string[] {
  const vertical = verticalFromCategory(pismo.category);
  const kit = getKitContentsList(vertical);
  if (kit.length >= 5) return kit;
  return config.whatYouGet;
}

export function buildForWhom(pismo: Usluga, config: CategoryConfig): string[] {
  const branch = extractBranch(pismo);
  return [...config.forWhom, `Firmy i przedsiębiorstwa z branży: ${branch}`];
}

export function buildProcess(pismo: Usluga, config: CategoryConfig): { title: string; body: string }[] {
  return config.process;
}

export function buildProductFaq(pismo: Usluga, config: CategoryConfig): { q: string; a: string }[] {
  const branch = extractBranch(pismo);
  const price = (pismo.priceGrosze / 100).toFixed(0);
  return [
    ...config.faq,
    {
      q: `Ile kosztuje ${pismo.seoTitle.toLowerCase()}?`,
      a: `Pakiet w katalogu kosztuje ${price} zł brutto. Cena jest stała — bez ukrytych kosztów. Płatność online przez Stripe.`,
    },
    {
      q: "Jak zamówić usługę?",
      a: "Dodaj pakiet do koszyka, opłać online, wypełnij brief projektu (dane firmy, preferencje, materiały). Potwierdzenie i brief PDF otrzymasz na e-mail.",
    },
    {
      q: `Czy realizujecie projekty dla branży ${branch}?`,
      a: `Tak — mamy doświadczenie z projektami dla ${branch} i podobnych firm. Brief pozwala nam dopasować rozwiązanie do Twojej specyfiki.`,
    },
  ];
}

export function buildDeliveryContent(_pismo: Usluga): { title: string; body: string }[] {
  return [
    { title: "Potwierdzenie zamówienia", body: "E-mail natychmiast po płatności Stripe." },
    { title: "Brief projektu", body: "Uzupełniasz formularz z danymi firmy i wymaganiami." },
    { title: "Brief PDF", body: "Podsumowanie zamówienia w PDF/DOCX na e-mail." },
    { title: "Kontakt PM", body: "Project manager kontaktuje się w ciągu 24h roboczych." },
    { title: "Realizacja", body: "Budowa projektu w terminie 7–14 dni roboczych." },
    { title: "Oddanie + szkolenie", body: "Przekazanie projektu i szkolenie z panelu administracyjnego." },
    { title: "Gwarancja", body: "30 dni poprawek w scope pakietu." },
  ];
}
