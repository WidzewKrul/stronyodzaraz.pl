# Boilerplate — sklep gotowych dokumentów

**Źródło prawdy:** `haccp-sklep` (haccpnajuz.pl)  
**Cel:** szybkie odpalenie kolejnych sklepów przez podmianę warstwy custom, bez przepisywania infra.

---

## Architektura

```
Zakup → koszyk (CheckoutCustomerForm) → Stripe → webhook
  → ServiceOrder (FILLED) → worker → template cache (Postgres)
  → personalizacja → PDF/DOCX → Resend
```

**Stack:** Next.js 16 · React 19 · Drizzle/Postgres · Stripe · Resend · OpenRouter (DeepSeek) · Tailwind 4 · Coolify Docker

---

## Co COPY 1:1 (infra — nie ruszać per sklep)

| Plik / folder | Opis |
|---|---|
| `middleware.ts` | Rate limit API, body size cap |
| `lib/cart.ts`, `components/CartProvider.tsx` | Koszyk localStorage |
| `app/koszyk/*`, `components/CheckoutCustomerForm.tsx` | Checkout z fakturą/NIP |
| `lib/checkout-schema.ts`, `lib/checkout-helpers.ts` | Walidacja Zod |
| `app/api/koszyk/checkout/route.ts` | Multi-item Stripe |
| `app/api/webhook/route.ts` | Stripe events + koszyk |
| `lib/rate-limit.ts`, `lib/cron-auth.ts` | Security |
| `lib/worker.ts` | Job queue (dostosuj import generatora) |
| `lib/tool-result-artifacts.ts` | PDF/DOCX + DejaVu fonts |
| `lib/email.ts` | Szablony (podmień copy/branding) |
| `lib/schema.ts` + migracje `drizzle/` | DB schema |
| `Dockerfile`, `scripts/migrate.mjs` | Deploy |
| `components/ConsentBanner.tsx`, `components/Analytics.tsx` | RODO + GA/Meta |
| `components/ScrollReveal.tsx` | Animacje scroll |
| `app/globals.css` | Tailwind theme tokens (zmień `--color-brand-*`) |
| `app/gotowe-pisma/ShopPagination.tsx`, `SearchBar.tsx` | Katalog UX |
| `app/gotowe-pisma/ProductCard.tsx` | Karta produktu SEO |
| `app/gotowe-pisma/[category]/[slug]/ProductTabs.tsx` | PDP tabs |
| `app/gotowe-pisma/[category]/[slug]/AddToCartBox.tsx` | CTA |
| `components/ProductReviews.tsx` | Opinie na PDP |
| `components/TrustBar.tsx` | Trust strip |
| `components/BrandLogo.tsx` | Logo (podmień asset) |
| `scripts/marketing/*` | CLI marketing (fix SITE_URL) |

---

## Co ADAPT (mechanizm ten sam, treść inna)

| Plik | Co zmienić |
|---|---|
| `lib/complete-kit.ts` | **`COMPLETE_KIT_PRICE_GROSZE`**, `normalizePrimaryProduct()`, unified SEO titles |
| `lib/catalog-curation.ts` | **`productTypePriority()`** + **`extractBranch()`** — słowa kluczowe i kierunek parsowania tytułu per sklep |
| `lib/product-seo.ts` | Wzorce tytułów SEO (`buildSeoTitle`, `buildSeoShortDesc`) |
| `lib/product-content.ts` | `categoryContext()`, FAQ, long desc — słownictwo branżowe |
| `lib/gotowe-pisma.ts` | `CATEGORIES`, `DEFAULT_PRICE_GROSZE` (= complete-kit price), import curation + normalize |
| `lib/gotowe-pisma-config.ts` | `CATEGORY_CONFIGS` — formularze, prompty AI, FAQ |
| `lib/haccp-generator.ts` → `lib/document-generator.ts` | Prompty szablonów (opcjonalna rename) |
| `lib/haccp-doc-kind.ts` | Typy dokumentów per vertical |
| `lib/site-images.ts` | Mapowanie hero/kategorii |
| `app/page.tsx` | Homepage copy + hero |
| `app/o-nas/page.tsx`, `app/kontakt/page.tsx` | Copy |
| `app/layout.tsx` | metadata, themeColor, JSON-LD |
| `components/Header.tsx`, `Footer.tsx` | Nav, linki |
| `public/llms.txt` | AEO — opis sklepu |
| `public/images/` | Assety WebP |
| `.env.example` | SITE_URL, domena, email |

---

## Co CUSTOM (unikalne per sklep)

| Asset | Opis |
|---|---|
| `docs/wzorydokument-products.json` | Katalog produktów (źródło slugów) |
| Domena + Stripe webhook URL | Coolify env |
| Kolory brand (`globals.css` @theme) | emerald / sky / violet |
| Logo + hero images | Gemini → `npm run images:optimize` |
| Copy homepage/FAQ/regulamin | Tone of voice branży |

---

## Curation — priorytety per sklep

Grupowanie: `category + branch`. Kierunek parsowania branch z tytułu zależy od sklepu (patrz `extractBranch` w `catalog-curation.ts`).

**Model sprzedaży:** jeden produkt cyfrowy per branch — `normalizePrimaryProduct()` ustawia unified SEO title, cenę kompletu i shortDesc. Brak tierów / upsell pakietów w copy.

### haccpnajuz.pl (HACCP) — 199 zł
```
branch przed „ – " · pakiet kompletny > pakiet haccp > księga haccp > analiza > procedura > checklist > karta > rejestr > other
```
3901 raw → **675** primary

### bhpodzaraz.pl (BHP/PPOŻ/BDO) — 179 zł
```
branch po „ – " · pakiet kompletny > pakiet > ORZ > instrukcja stanowiskowa > IBP > kpo+keo > other
```
3670 raw → **1106** primary

### regulaminygotowe.pl (RODO) — 149 zł
```
context po „ – " · pakiet > regulamin sklepu > regulamin serwisu > polityka prywatności > inne
```
1242 raw → **210** primary

---

## Checklist migracji (kolejność)

### Faza 1 — Przygotowanie
- [ ] Backup DB produkcyjnej (`pg_dump`)
- [ ] Freeze `docs/wzorydokument-products.json`
- [ ] Ustal domenę, email, cenę kompletu (`COMPLETE_KIT_PRICE_GROSZE` w `lib/complete-kit.ts`)

### Faza 2 — Rebase infra
- [ ] Skopiuj pliki z sekcji „COPY 1:1”
- [ ] Uruchom brakujące migracje Drizzle (`0001`, `0002`)
- [ ] `npm run build` — zero errors

### Faza 3 — Warstwa custom
- [ ] Podmień catalog JSON (zostaw w `docs/`)
- [ ] `gotowe-pisma.ts` + `gotowe-pisma-config.ts`
- [ ] `catalog-curation.ts` — priorytety branżowe
- [ ] `product-seo.ts` + `product-content.ts`
- [ ] Homepage, Header, Footer, layout metadata
- [ ] Assety + `site-images.ts`
- [ ] `.env.example` + `public/llms.txt`

### Faza 4 — Cleanup (NIE robić narzędzi /narzedzia)
- [ ] Usuń `app/narzedzia/`, `app/api/tools/`
- [ ] Usuń `lib/tools.ts`, `lib/tool-extras.ts`, `lib/tool-submission.ts`
- [ ] Usuń dead code: `lib/products.ts`, `lib/categories.ts`, `lib/*-pages.tsx`, `TopBar`, `SocialProof`
- [ ] Redirect `/narzedzia` → `/gotowe-pisma` w `next.config.ts`
- [ ] Usuń linki do narzędzia z Header/Footer/sitemap

### Faza 5 — Deploy
- [ ] Coolify app + Postgres + env
- [ ] Migracja DB przy starcie kontenera
- [ ] Stripe webhook `https://{domena}/api/webhook`
- [ ] Scheduled tasks: `cron-process` co 1 min
- [ ] DNS + HTTPS
- [ ] Smoke test: koszyk → płatność → email PDF

### Faza 6 — HQ polish (na końcu wszystkich sklepów)
- [ ] `npm audit fix` (bez `--force`)
- [ ] Usuń nieużywane deps
- [ ] Spójność nazewnictwa lib (document-generator vs haccp-generator)
- [ ] README per projekt
- [ ] GSC + sitemap submit

---

## Projekty

| Folder | Domena | JSON | Kategorie | Cena domyślna |
|---|---|---|---|---|
| `haccp-sklep` | haccpnajuz.pl | sklep1 / docs | 12 HACCP | 49 zł |
| `ocenaryzyka` | bhpodzaraz.pl | sklep2 / docs | bhp, ppoz, bdo | 89 zł |
| `regulaminygotowe` | regulaminygotowe.pl | sklep3 / docs | 13 RODO | 19 zł |

---

## Czego NIE robić

- **Nie** budować `/narzedzia` — tylko sklep gotowych dokumentów
- **Nie** kopiować `biznesnagotowopl-new` (usunięty)
- **Nie** pokazywać 3000+ produktów w katalogu — zawsze curation
- **Nie** wspominać abonamentu/Stripe/BLIK w UI (regulamin OK)
- **Nie** używać Claude cascade w generatorze — tylko DeepSeek retry

---

## Komendy

```bash
npm run build          # verify
npm run db:migrate     # lokalnie
npm run images:optimize  # WebP assety
npm run mkt:sitemap    # ping Google
```
