#!/usr/bin/env node
/**
 * Generates docs/services-catalog.json for programmatic SEO (~500+ raw → ~400 primary after curation)
 */
import fs from "node:fs";
import path from "node:path";

const BRANCHES = [
  { slug: "restauracja", label: "restauracja" },
  { slug: "bar", label: "bar" },
  { slug: "kawiarnia", label: "kawiarnia" },
  { slug: "pizzeria", label: "pizzeria" },
  { slug: "food-truck", label: "food truck" },
  { slug: "gabinet-lekarski", label: "gabinet lekarski" },
  { slug: "gabinet-dentystyczny", label: "gabinet dentystyczny" },
  { slug: "fizjoterapia", label: "gabinet fizjoterapii" },
  { slug: "kancelaria-prawna", label: "kancelaria prawna" },
  { slug: "salon-kosmetyczny", label: "salon kosmetyczny" },
  { slug: "salon-fryzjerski", label: "salon fryzjerski" },
  { slug: "hotel", label: "hotel" },
  { slug: "pensjonat", label: "pensjonat" },
  { slug: "agroturystyka", label: "agroturystyka" },
  { slug: "sklep-odziezowy", label: "sklep odzieżowy" },
  { slug: "sklep-kosmetyczny", label: "sklep kosmetyczny" },
  { slug: "sklep-spozywczy", label: "sklep spożywczy" },
  { slug: "sklep-meble", label: "sklep meblowy" },
  { slug: "sklep-bizuteria", label: "sklep biżuterii" },
  { slug: "sklep-sportowy", label: "sklep sportowy" },
  { slug: "produkcja", label: "firma produkcyjna" },
  { slug: "firma-budowlana", label: "firma budowlana" },
  { slug: "firma-transportowa", label: "firma transportowa" },
  { slug: "firma-it", label: "firma IT" },
  { slug: "agencja-marketingowa", label: "agencja marketingowa" },
  { slug: "szkola", label: "szkoła" },
  { slug: "przedszkole", label: "przedszkole" },
  { slug: "silownia", label: "siłownia" },
  { slug: "warsztat-samochodowy", label: "warsztat samochodowy" },
  { slug: "architekt", label: "biuro architektoniczne" },
  { slug: "fotograf", label: "fotograf" },
  { slug: "trener-personalny", label: "trener personalny" },
  { slug: "uslugi-remontowe", label: "firma remontowa" },
  { slug: "hydraulik", label: "hydraulik" },
  { slug: "elektryk", label: "elektryk" },
  { slug: "weterynarz", label: "gabinet weterynaryjny" },
  { slug: "apteka", label: "apteka" },
  { slug: "biuro-rachunkowe", label: "biuro rachunkowe" },
  { slug: "firma-b2b", label: "firma B2B" },
  { slug: "startup", label: "startup" },
  { slug: "ngo", label: "organizacja pozarządowa" },
  { slug: "galeria-sztuki", label: "galeria sztuki" },
  { slug: "sklep-rowerowy", label: "sklep rowerowy" },
  { slug: "cukiernia", label: "cukiernia" },
  { slug: "piekarnia", label: "piekarnia" },
];

const CATEGORY_TEMPLATES = {
  "strony-internetowe": [
    { prefix: "Strona WordPress", variants: ["Start", "Pro", "Landing"], prices: [249000, 499000, 149000] },
    { prefix: "Strona firmowa", variants: ["Start", "Pro"], prices: [249000, 499000] },
    { prefix: "Strona wizytówka", variants: ["Start"], prices: [199000] },
    { prefix: "Landing page", variants: ["Start", "Pro"], prices: [149000, 299000] },
  ],
  "sklepy-internetowe": [
    { prefix: "Sklep WooCommerce", variants: ["Start", "Pro"], prices: [599000, 899000] },
    { prefix: "Sklep Shopify", variants: ["Start", "Pro"], prices: [799000, 1199000] },
    { prefix: "Sklep Shoper", variants: ["Start"], prices: [699000] },
    { prefix: "Sklep internetowy", variants: ["Start", "Pro"], prices: [599000, 899000] },
  ],
  "wordpress": [
    { prefix: "Wdrożenie WordPress", variants: ["Start", "Pro"], prices: [249000, 499000] },
    { prefix: "Motyw WordPress", variants: ["custom"], prices: [399000] },
    { prefix: "Wtyczki WordPress", variants: ["instalacja"], prices: [49000] },
    { prefix: "WordPress SEO", variants: ["on-page"], prices: [99000] },
  ],
  "shopify-shoper": [
    { prefix: "Sklep Shopify", variants: ["wdrożenie", "migracja"], prices: [799000, 199000] },
    { prefix: "Sklep Shoper", variants: ["wdrożenie", "migracja"], prices: [699000, 199000] },
    { prefix: "Shopify theme", variants: ["customizacja"], prices: [299000] },
  ],
  "reklama-marketing": [
    { prefix: "Google Ads", variants: ["setup", "audyt"], prices: [99000, 149000] },
    { prefix: "Meta Ads", variants: ["setup"], prices: [99000] },
    { prefix: "Google Analytics 4", variants: ["setup"], prices: [49000] },
    { prefix: "Kampania reklamowa", variants: ["Start"], prices: [99000] },
  ],
  "opieka-techniczna": [
    { prefix: "Opieka WordPress", variants: ["abonament", "premium"], prices: [29900, 49900] },
    { prefix: "Opieka sklep internetowy", variants: ["abonament"], prices: [49900] },
    { prefix: "Backup strony", variants: ["miesięczny"], prices: [9900] },
    { prefix: "Monitoring strony", variants: ["24/7"], prices: [19900] },
  ],
  "integracje": [
    { prefix: "WooCommerce Przelewy24", variants: ["integracja"], prices: [49000] },
    { prefix: "WooCommerce InPost", variants: ["integracja"], prices: [49000] },
    { prefix: "WooCommerce PayU", variants: ["integracja"], prices: [49000] },
    { prefix: "Shopify InPost", variants: ["integracja"], prices: [49000] },
    { prefix: "Shopify Allegro", variants: ["integracja"], prices: [79000] },
    { prefix: "BaseLinker", variants: ["integracja"], prices: [99000] },
    { prefix: "Google Merchant Center", variants: ["integracja"], prices: [49000] },
  ],
  "migracje-naprawy": [
    { prefix: "Migracja sklepu", variants: ["standard"], prices: [199000] },
    { prefix: "Migracja WordPress", variants: ["standard"], prices: [99000] },
    { prefix: "Naprawa WordPress", variants: ["hack recovery"], prices: [99000] },
    { prefix: "Przyspieszenie strony", variants: ["Core Web Vitals"], prices: [79000] },
    { prefix: "Audyt bezpieczeństwa", variants: ["WordPress"], prices: [49000] },
  ],
};

const INTEGRATION_STANDALONE = [
  { slug: "integracja-woocommerce-przelewy24", title: "Integracja WooCommerce + Przelewy24", category: "integracje", price: 49000 },
  { slug: "integracja-woocommerce-inpost", title: "Integracja WooCommerce + InPost paczkomaty", category: "integracje", price: 49000 },
  { slug: "integracja-woocommerce-payu", title: "Integracja WooCommerce + PayU", category: "integracje", price: 49000 },
  { slug: "integracja-shopify-inpost", title: "Integracja Shopify + InPost", category: "integracje", price: 49000 },
  { slug: "integracja-shopify-blik", title: "Integracja Shopify + BLIK płatności", category: "integracje", price: 49000 },
  { slug: "integracja-shopify-allegro", title: "Integracja Shopify + Allegro", category: "integracje", price: 79000 },
  { slug: "integracja-shoper-allegro", title: "Integracja Shoper + Allegro", category: "integracje", price: 79000 },
  { slug: "integracja-baselinker-sklep", title: "Integracja BaseLinker ze sklepem", category: "integracje", price: 99000 },
  { slug: "integracja-google-merchant-center", title: "Integracja Google Merchant Center", category: "integracje", price: 49000 },
  { slug: "integracja-wordpress-ga4", title: "Integracja WordPress + Google Analytics 4", category: "integracje", price: 49000 },
  { slug: "integracja-sklep-infakt", title: "Integracja sklepu z inFakt", category: "integracje", price: 49000 },
  { slug: "integracja-sklep-wfirma", title: "Integracja sklepu z wFirma", category: "integracje", price: 49000 },
  { slug: "shopify-vs-woocommerce", title: "Shopify vs WooCommerce — porównanie platform", category: "integracje", price: 0, branch: "porównanie" },
  { slug: "shoper-vs-shopify", title: "Shoper vs Shopify — porównanie dla Polski", category: "integracje", price: 0, branch: "porównanie" },
];

const products = [];

for (const [category, templates] of Object.entries(CATEGORY_TEMPLATES)) {
  if (category === "integracje") {
    for (const item of INTEGRATION_STANDALONE) {
      products.push({
        slug: item.slug,
        title: item.title,
        category: item.category,
        branch: item.branch ?? "integracja",
        priceGrosze: item.price || 49000,
        tags: [category, "integracja"],
      });
    }
    continue;
  }

  for (const branch of BRANCHES) {
    for (const tmpl of templates) {
      for (let i = 0; i < tmpl.variants.length; i++) {
        const variant = tmpl.variants[i];
        const price = tmpl.prices[i] ?? tmpl.prices[0];
        const isPrimary = variant === "Pro" || variant === "Start" || variant === "wdrożenie";
        const titleSuffix = variant === "Start" || variant === "Pro" ? ` — pakiet ${variant}` : ` — ${variant}`;
        const slug = `${tmpl.prefix.toLowerCase().replace(/\s+/g, "-")}-${branch.slug}${variant !== "Start" && variant !== "Pro" ? `-${variant.replace(/\s+/g, "-")}` : variant === "Pro" ? "-pro" : ""}`.replace(/--+/g, "-");
        const title = `${tmpl.prefix} dla ${branch.label}${titleSuffix}`;

        products.push({
          slug: slug.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9-]/g, "-").replace(/-+/g, "-"),
          title,
          category,
          branch: branch.label,
          priceGrosze: price,
          tags: [category, branch.slug, variant.toLowerCase()],
          ...(isPrimary && variant === "Pro" ? { subcategory: "pakiet-kompletny" } : {}),
        });
      }
    }
  }
}

// Dedupe slugs
const seen = new Set();
const deduped = products.filter((p) => {
  if (seen.has(p.slug)) return false;
  seen.add(p.slug);
  return true;
});

const outPath = path.join(process.cwd(), "docs", "services-catalog.json");
fs.writeFileSync(outPath, JSON.stringify(deduped, null, 2));
console.log(`Generated ${deduped.length} products → ${outPath}`);
