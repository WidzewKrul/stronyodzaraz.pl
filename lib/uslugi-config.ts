import type { LucideIcon } from "lucide-react";
import {
  Globe,
  ShoppingCart,
  Code2,
  Store,
  Megaphone,
  Wrench,
  Plug,
  RefreshCw,
} from "lucide-react";

export type CategoryConfig = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  accent: "indigo" | "rose" | "amber" | "emerald" | "sky" | "violet" | "slate";
  tagline: string;
  whatYouGet: string[];
  forWhom: string[];
  process: { title: string; body: string }[];
  faq: { q: string; a: string }[];
  formFields: FormField[];
  systemPromptTemplate: string;
};

export type FormField = {
  name: string;
  label: string;
  type: "text" | "textarea" | "select" | "email" | "date";
  required: boolean;
  placeholder?: string;
  help?: string;
  options?: string[];
  maxLength?: number;
};

const BASE_BRIEF_FIELDS: FormField[] = [
  { name: "nazwaFirmy", label: "Nazwa firmy", type: "text", required: true, placeholder: "np. Restauracja Smak", maxLength: 120 },
  { name: "branza", label: "Branża / typ działalności", type: "text", required: true, placeholder: "np. restauracja, sklep odzieżowy", maxLength: 100 },
  { name: "domena", label: "Preferowana domena (jeśli masz)", type: "text", required: false, placeholder: "np. mojafirma.pl", help: "Jeśli nie masz domeny — pomożemy wybrać" },
  { name: "emailKontakt", label: "E-mail kontaktowy na stronie", type: "email", required: true, placeholder: "kontakt@firma.pl" },
  { name: "telefon", label: "Telefon kontaktowy", type: "text", required: false, placeholder: "+48 123 456 789" },
  { name: "adres", label: "Adres firmy (opcjonalnie)", type: "text", required: false, placeholder: "ul. Przykładowa 1, 00-001 Warszawa" },
  { name: "kolory", label: "Preferowane kolory / styl", type: "text", required: false, placeholder: "np. granat + biel, nowoczesny minimalizm" },
  { name: "konkurencja", label: "Strony konkurencji (inspiracja)", type: "textarea", required: false, placeholder: "Linki do stron, które Ci się podobają", maxLength: 500 },
  { name: "tresci", label: "Treści do strony", type: "textarea", required: false, placeholder: "Opis firmy, usługi, historia — lub napisz 'potrzebuję copywritingu'", maxLength: 2000 },
  { name: "materialy", label: "Materiały (logo, zdjęcia)", type: "textarea", required: false, placeholder: "Link do Google Drive / Dropbox z logo i zdjęciami", maxLength: 500 },
  { name: "dodatkowe", label: "Dodatkowe wymagania", type: "textarea", required: false, placeholder: "Integracje, języki, specjalne funkcje...", maxLength: 1000 },
];

const BRIEF_PROMPT = `Jesteś project managerem polskiej agencji web stronyodzaraz.pl. Generujesz BRIEF PROJEKTU (podsumowanie zamówienia) po polsku — profesjonalny, zwięzły, gotowy do przekazania zespołowi realizacyjnemu.`;

export const CATEGORY_CONFIGS: CategoryConfig[] = [
  {
    slug: "strony-internetowe",
    title: "Strony internetowe",
    description: "Profesjonalne strony WordPress, landing page i strony firmowe",
    icon: Globe,
    accent: "indigo",
    tagline: "Strona internetowa od zera — WordPress, responsywność, SEO on-page",
    whatYouGet: [
      "Projekt i wdrożenie strony WordPress",
      "Responsywny motyw dopasowany do branży",
      "Formularz kontaktowy + mapa Google",
      "Google Analytics 4 + Search Console",
      "Certyfikat SSL i konfiguracja hostingu",
      "Szkolenie z panelu administracyjnego",
    ],
    forWhom: [
      "Małe i średnie firmy B2B",
      "Restauracje, hotele, gabinety",
      "Firmy usługowe i lokalne",
      "Startupy potrzebujące profesjonalnej wizytówki online",
    ],
    process: [
      { title: "Zamów pakiet online", body: "Wybierz pakiet, opłać Stripe, wypełnij brief z danymi firmy i preferencjami." },
      { title: "Projekt i akceptacja", body: "Przygotowujemy projekt graficzny — akceptujesz lub zgłaszasz poprawki (2 rundy w cenie)." },
      { title: "Wdrożenie i oddanie", body: "Budujemy stronę, testujemy, szkolimy z panelu. Oddajemy gotową stronę w 7–14 dni." },
    ],
    faq: [
      { q: "Ile trwa realizacja strony?", a: "Pakiet Start: 7 dni roboczych. Pakiet Pro: 14 dni roboczych. Termin liczony od momentu dostarczenia kompletnego briefu i materiałów." },
      { q: "Czy muszę mieć własny hosting?", a: "Nie — możemy skonfigurować hosting w cenie pakietu lub wdrożyć na Twoim serwerze." },
      { q: "Co jeśli nie mam logo ani treści?", a: "Możemy przygotować placeholder logo i podstawowe treści — lub zaproponować copywriting jako upsell." },
    ],
    formFields: BASE_BRIEF_FIELDS,
    systemPromptTemplate: BRIEF_PROMPT,
  },
  {
    slug: "sklepy-internetowe",
    title: "Sklepy internetowe",
    description: "Sklepy WooCommerce, Shopify i Shoper z polskimi integracjami",
    icon: ShoppingCart,
    accent: "emerald",
    tagline: "Sklep internetowy od zera — płatności PL, InPost, fakturowanie",
    whatYouGet: [
      "Sklep WooCommerce / Shopify / Shoper",
      "Konfiguracja produktów i kategorii",
      "Przelewy24, BLIK, PayU",
      "InPost, DPD — kurierzy",
      "Regulamin + polityka prywatności",
      "Szkolenie z obsługi zamówień",
    ],
    forWhom: [
      "Sklepy odzieżowe, kosmetyczne, spożywcze",
      "Producenci sprzedający online",
      "Firmy przechodzące z offline do e-commerce",
    ],
    process: [
      { title: "Zamów pakiet sklepu", body: "Wybierz platformę (WooCommerce/Shopify/Shoper), opłać, wypełnij brief." },
      { title: "Konfiguracja sklepu", body: "Produkty, płatności, wysyłka, wygląd — wszystko konfigurujemy." },
      { title: "Testy i launch", body: "Testujemy zamówienie end-to-end, szkolimy, uruchamiamy sklep." },
    ],
    faq: [
      { q: "Shopify czy WooCommerce?", a: "WooCommerce — pełna kontrola, najlepsze polskie integracje. Shopify — szybszy start, mniej technicznej obsługi. Doradzimy na briefie." },
      { q: "Ile produktów w pakiecie Start?", a: "Do 20 produktów w pakiecie Start. Więcej — pakiet Pro lub dopłata per produkt." },
    ],
    formFields: [
      ...BASE_BRIEF_FIELDS,
      { name: "platforma", label: "Preferowana platforma", type: "select", required: true, options: ["WooCommerce (WordPress)", "Shopify", "Shoper", "Nie wiem — doradźcie"] },
      { name: "liczbaProduktow", label: "Szacowana liczba produktów", type: "text", required: false, placeholder: "np. 50" },
      { name: "platnosci", label: "Metody płatności", type: "select", required: false, options: ["Przelewy24 + BLIK", "PayU", "Stripe", "Wszystkie powyższe"] },
    ],
    systemPromptTemplate: BRIEF_PROMPT,
  },
  {
    slug: "wordpress",
    title: "WordPress",
    description: "Wdrożenie, motywy, wtyczki, SEO WordPress",
    icon: Code2,
    accent: "sky",
    tagline: "WordPress dla firm — wdrożenie, optymalizacja, bezpieczeństwo",
    whatYouGet: ["Instalacja i konfiguracja WordPress", "Motyw i wtyczki", "Bezpieczeństwo i backup", "Optymalizacja wydajności", "SEO on-page"],
    forWhom: ["Firmy z istniejącym WordPressem", "Nowe projekty na WordPress", "Blogi firmowe i portale"],
    process: [
      { title: "Brief i analiza", body: "Zbieramy wymagania, analizujemy obecny stan (jeśli istnieje)." },
      { title: "Wdrożenie", body: "Instalacja, konfiguracja, motyw, wtyczki." },
      { title: "Testy i szkolenie", body: "Testy, dokumentacja, szkolenie z panelu." },
    ],
    faq: [{ q: "Czy mogę sam edytować treści?", a: "Tak — WordPress ma intuicyjny panel. Szkolimy z obsługi po wdrożeniu." }],
    formFields: BASE_BRIEF_FIELDS,
    systemPromptTemplate: BRIEF_PROMPT,
  },
  {
    slug: "shopify-shoper",
    title: "Shopify i Shoper",
    description: "Sklepy SaaS z polskimi integracjami",
    icon: Store,
    accent: "violet",
    tagline: "Shopify i Shoper — szybki start e-commerce w Polsce",
    whatYouGet: ["Setup sklepu Shopify/Shoper", "Theme i branding", "Polskie płatności i kurierzy", "Szkolenie panelu"],
    forWhom: ["Marki D2C", "Sklepy międzynarodowe", "Firmy chcące uniknąć zarządzania serwerem"],
    process: [
      { title: "Zamówienie", body: "Wybierz pakiet, opłać, brief." },
      { title: "Konfiguracja", body: "Sklep, produkty, płatności, wysyłka." },
      { title: "Launch", body: "Testy, szkolenie, uruchomienie." },
    ],
    faq: [{ q: "Shoper czy Shopify dla Polski?", a: "Shoper — natywne integracje PL (Allegro, InPost). Shopify — lepszy na export i skalowanie międzynarodowe." }],
    formFields: BASE_BRIEF_FIELDS,
    systemPromptTemplate: BRIEF_PROMPT,
  },
  {
    slug: "reklama-marketing",
    title: "Reklama i marketing",
    description: "Google Ads, Meta Ads, GA4 setup",
    icon: Megaphone,
    accent: "amber",
    tagline: "Setup kampanii reklamowych i analityki",
    whatYouGet: ["Konto Google Ads / Meta Ads", "Konfiguracja konwersji", "Pierwsza kampania", "Raport wyników"],
    forWhom: ["Firmy startujące z reklamą online", "Sklepy potrzebujące ruchu", "Usługi lokalne"],
    process: [
      { title: "Brief", body: "Cele, budżet, grupa docelowa." },
      { title: "Setup", body: "Konta, tracking, kampania." },
      { title: "Raport", body: "Przekazanie dokumentacji i pierwszych wyników." },
    ],
    faq: [{ q: "Czy prowadzicie kampanie na stałe?", a: "Setup to jednorazowa usługa. Prowadzenie kampanii — osobna umowa abonamentowa." }],
    formFields: BASE_BRIEF_FIELDS,
    systemPromptTemplate: BRIEF_PROMPT,
  },
  {
    slug: "opieka-techniczna",
    title: "Opieka techniczna",
    description: "Abonament WordPress — backup, aktualizacje, wsparcie",
    icon: Wrench,
    accent: "slate",
    tagline: "Twoja strona pod stałą opieką techniczną",
    whatYouGet: ["Backup codzienny", "Aktualizacje WP/wtyczek", "Monitoring 24/7", "2–4h support/mc", "Raport miesięczny"],
    forWhom: ["Firmy bez własnego IT", "Sklepy wymagające stabilności", "Strony po wdrożeniu u nas"],
    process: [
      { title: "Audyt wstępny", body: "Sprawdzamy stan strony przed objęciem opieką." },
      { title: "Konfiguracja monitoringu", body: "Backup, alerty, harmonogram aktualizacji." },
      { title: "Abonament", body: "Miesięczna opieka — anulujesz kiedy chcesz." },
    ],
    faq: [{ q: "Co wchodzi w 2h supportu?", a: "Poprawki treści, drobne zmiany CSS, pomoc z wtyczkami, diagnostyka awarii." }],
    formFields: [
      { name: "urlStrony", label: "Adres URL strony", type: "text", required: true, placeholder: "https://twojastrona.pl" },
      { name: "platforma", label: "Platforma", type: "select", required: true, options: ["WordPress", "WooCommerce", "Shopify", "Shoper", "Inna"] },
      { name: "dostepPanel", label: "Dostęp do panelu (login/hasło w bezpiecznym kanale)", type: "textarea", required: false, placeholder: "Prześlemy bezpieczny link do haseł po zamówieniu", maxLength: 200 },
      ...BASE_BRIEF_FIELDS.slice(0, 3),
    ],
    systemPromptTemplate: BRIEF_PROMPT,
  },
  {
    slug: "integracje",
    title: "Integracje",
    description: "WooCommerce + Przelewy24, Shopify + InPost, BaseLinker",
    icon: Plug,
    accent: "indigo",
    tagline: "Polskie integracje e-commerce — płatności, kurierzy, marketplace",
    whatYouGet: ["Konfiguracja integracji", "Testy płatności/wysyłki", "Dokumentacja"],
    forWhom: ["Sklepy bez polskich płatności", "Firmy na Allegro + własny sklep", "Sklepy wymagające BaseLinker"],
    process: [
      { title: "Analiza", body: "Sprawdzamy obecną konfigurację sklepu." },
      { title: "Integracja", body: "Instalacja, konfiguracja, testy." },
      { title: "Weryfikacja", body: "Testowe zamówienie end-to-end." },
    ],
    faq: [{ q: "Ile trwa integracja Przelewy24?", a: "1–2 dni robocze po otrzymaniu dostępu do sklepu i konta Przelewy24." }],
    formFields: BASE_BRIEF_FIELDS,
    systemPromptTemplate: BRIEF_PROMPT,
  },
  {
    slug: "migracje-naprawy",
    title: "Migracje i naprawy",
    description: "Migracja sklepu, naprawa WordPress, przyspieszenie",
    icon: RefreshCw,
    accent: "rose",
    tagline: "Migracja bez utraty SEO — naprawa i hardening WordPress",
    whatYouGet: ["Migracja danych", "Przekierowania 301", "Testy", "Audyt bezpieczeństwa"],
    forWhom: ["Sklepy zmieniające platformę", "Zhakowane strony WordPress", "Wolne strony wymagające optymalizacji"],
    process: [
      { title: "Audyt", body: "Analiza obecnego stanu." },
      { title: "Migracja/naprawa", body: "Przeniesienie danych lub cleanup." },
      { title: "Weryfikacja", body: "Testy, SEO check, oddanie." },
    ],
    faq: [{ q: "Czy stracię pozycje w Google po migracji?", a: "Przy prawidłowych 301 i zachowaniu URL-i — nie. Robimy audyt SEO przed i po migracji." }],
    formFields: BASE_BRIEF_FIELDS,
    systemPromptTemplate: BRIEF_PROMPT,
  },
];

export function getCategoryConfig(slug: string): CategoryConfig | undefined {
  return CATEGORY_CONFIGS.find((c) => c.slug === slug);
}
