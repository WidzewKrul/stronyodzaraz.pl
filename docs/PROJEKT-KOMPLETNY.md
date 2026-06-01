# stronyodzaraz.pl — PROJEKT KOMPLETNY (build → deploy → automat → koniec ręcznej pracy)

**Filozofia:** budujesz **pełną** platformę B2B raz — ~435 URL, trust, demo, upsell, checkout. Deploy. Google. Potem **automat** dokłada blog (OpenRouter), drip sprzedaje upsell, Coolify crony robi resztę. Ty monitorujesz 15 min/miesiąc.

**Indeks:** [DOCS-INDEX.md](./DOCS-INDEX.md)  
**Co na stronie:** [STRONA-PELNA-MAPA.md](./STRONA-PELNA-MAPA.md)  
**Blog auto:** [BLOG-AUTOMAT.md](./BLOG-AUTOMAT.md) · [COOLIFY-JOBS.md](./COOLIFY-JOBS.md)  
**Po launch:** [MONITORING-MINIMAL.md](./MONITORING-MINIMAL.md)

---

## Czego NIE robisz ręcznie po launch

| ❌ Ręcznie | ✅ Zamiast tego |
|-----------|-----------------|
| Pisanie bloga co tydzień | `/api/cron/blog` + OpenRouter + kolejka |
| Upsell mailami | cron drip D+3/D+7 |
| Brief PDF | cron process |
| Indeksacja każdego posta | IndexNow w cron blog |
| Optymalizacja SEO co tydzień | 435 URL + auto blog = compound |

**Wyjątek:** awaria, webhook fail, strona down.

---

## FAZA A2 — Automatyzacja content (w tym samym sprincie co launch)

| # | Zadanie | Doc |
|---|---------|-----|
| 1 | `app/api/cron/blog/route.ts` | BLOG-AUTOMAT |
| 2 | `scripts/marketing/blog.ts` CLI | BLOG-AUTOMAT §8 |
| 3 | `content/blog/*.md` loader | BLOG-AUTOMAT |
| 4 | Coolify task `blog-generate-weekly` | COOLIFY-JOBS |
| 5 | `docs/blog/queue/seed-queue.json` → runtime queue | 40 tematów ✅ |
| 6 | Prompt `docs/blog/prompts/system-blog.md` | ✅ |
| 7 | Napraw TAG_TO_CATEGORY blog (HACCP → web) | STRONA-PELNA-MAPA |

---

## FAZA A3 — Trust, demo, upsell (strona profesjonalna)

| # | Zadanie | Doc |
|---|---------|-----|
| 1 | `/technologia` — hosting, stack, FAQ tech | INFRA-DOMENA-HOSTING |
| 2 | `/demo` — 3 mockupy branż CSS | TRUST-DEMO-FAQ |
| 3 | `UpsellBox` na PDP | UPSELL-CROSSSELL |
| 4 | Portfolio *odzaraz* na /o-nas | TRUST-DEMO-FAQ |
| 5 | Blog teaser na homepage | STRONA-PELNA-MAPA |
| 6 | Platform badges home | STRONA-PELNA-MAPA |
| 7 | Rozszerzyć drip email per category | UPSELL-CROSSSELL |

---

## FAZA A — Kod (jedna passada przed deploy)

### A1. Core strony (status → co domknąć)

| Element | Pliki | Status |
|---------|-------|--------|
| Homepage hero + sekcje | `app/page.tsx`, `HeroBanner` | ✅ CSS |
| Katalog `/uslugi` | `app/uslugi/*` | ✅ |
| 8 hubów kategorii | `app/uslugi/[category]/` | ✅ |
| PDP template | `app/uslugi/[category]/[slug]/` | ✅ — sprawdź resztki copy HACCP |
| Blog 10 wpisów | `lib/blog.ts` | ✅ |
| O nas, kontakt | `app/o-nas`, `app/kontakt` | ✅ |
| Regulamin, RODO | `app/regulamin`, `polityka-prywatnosci` | ⚠️ **dostosuj do usług web** |
| Koszyk, sukces | `app/koszyk`, `sukces` | ✅ |
| Logo | `BrandLogo` + `public/images/brand/` | ⚠️ **wrzuć plik logo** |

### A2. SEO big bang (do zrobienia w kodzie)

| # | Zadanie | Doc |
|---|---------|-----|
| 1 | `lib/seo/metadata.ts` — jeden builder title/meta | SEO-STACK.md |
| 2 | `lib/seo/json-ld/*` + opcjonalnie `schema-dts` | AEO-GEO-LLM.md |
| 3 | Loader `docs/seo/synonyms-branch.json` → `product-content.ts` | SCOPE §3 |
| 4 | Routes `/l/[city]` + `/l/[city]/[category]` (10×8) | cities-tier.json |
| 5 | Sitemap ~435 URL (primary PDP + local + blog) | SCOPE-JEDNORAZOWY.md |
| 6 | **Nie** indeksuj 1497 secondary PDP — canonical w metadata | SEO-PROGRAMMATIC §10 |
| 7 | noindex `?q=` na katalogu | SEO-STACK §8 |
| 8 | BlogPosting schema na blog | AEO |
| 9 | `@sindresorhus/slugify` dla city slug | SEO-STACK |
| 10 | IndexNow: `{INDEXNOW_KEY}.txt` w `public/` | poniżej § IndexNow |

### A3. Checkout i automatyzacja

| # | Zadanie | Doc |
|---|---------|-----|
| 1 | Stripe Checkout → `/api/uslugi/checkout`, `/api/koszyk/checkout` | BOILERPLATE |
| 2 | Webhook `POST /api/webhook` | ENV-ALL-SHOPS |
| 3 | Brief generator + email PDF/DOCX | KONTAKT-AUTOMAT |
| 4 | Cron `process` + `drip` | LAUNCH-READINESS |
| 5 | Rate limit kontakt | KONTAKT-AUTOMAT |

### A4. Build gate

```bash
cd stronyodzaraz
npm run build   # zero errors
```

---

## FAZA B — Assety i copy (1–2h)

- [ ] Logo → `public/images/brand/logo-mark.webp` (lub png/svg)
- [ ] Sprawdź ceny w `public/llms.txt` = **OFERTA.md**
- [ ] NIP, nazwa firmy, adres korespondencyjny na `/o-nas` + stopka
- [ ] Regulamin: usługi web, terminy 7–14 dni, zwroty (usługa rozpoczęta = inna polityka niż PDF)
- [ ] Polityka prywatności: Stripe, GA4, Resend, formularz
- [ ] E-mail `kontakt@bblikh.pl` widoczny i działający

Assety graficzne poza logo: **nie potrzebne** (GEMINI-ASSETS-BRIEF.md).

---

## FAZA C — Infra (Coolify + DNS)

### C1. DNS (u rejestratora stronyodzaraz.pl)

| Rekord | Wartość |
|--------|---------|
| A `@` | `57.131.49.251` |
| A/CNAME `www` | ten sam IP lub CNAME `@` |

### C2. PostgreSQL

- [ ] Nowa baza `stronyodzaraz` w Coolify
- [ ] `DATABASE_URL` w env produkcyjnym
- [ ] `npm run db:push` lub migrate na prod (jednorazowo)

### C3. Coolify app

- [ ] Next.js standalone, port 3000
- [ ] Domena `stronyodzaraz.pl` + SSL Let's Encrypt
- [ ] Health: `GET /` → 200
- [ ] Dodać do `scripts/coolify-deploy-shops.py` (4. sklep)
- [ ] Auto-deploy z repo (opcjonalnie)

### Coolify Scheduled Tasks (4 joby)

Patrz **[COOLIFY-JOBS.md](./COOLIFY-JOBS.md)** — process co 10 min, drip 09:00, **blog poniedziałek 06:00**.

| Job | Schedule |
|-----|----------|
| process | `*/10 * * * *` |
| drip | `0 9 * * *` |
| **blog** | `0 6 * * 1` |

### C5. ENV produkcyjny

Pełny szablon: `.env.example` + [ENV-ALL-SHOPS.md](./ENV-ALL-SHOPS.md).

Checklist:

- [ ] `SITE_URL` = `https://stronyodzaraz.pl`
- [ ] Stripe **live** keys (nie test na prod)
- [ ] `STRIPE_WEBHOOK_SECRET` z endpointu live
- [ ] `RESEND_API_KEY`
- [ ] `NEXT_PUBLIC_GA_ID`
- [ ] `CRON_SECRET`
- [ ] `OPENROUTER_API_KEY` (jeśli brief AI)

---

## FAZA D — Stripe + Resend (jednorazowy setup)

### Stripe

1. Dashboard → Developers → API keys → **live** `sk_live_`, `pk_live_`
2. Webhooks → Add endpoint:  
   `https://stronyodzaraz.pl/api/webhook`  
   Event: **`checkout.session.completed`**
3. Skopiuj `whsec_` → `STRIPE_WEBHOOK_SECRET`
4. Ustawienia firmy: nazwa, NIP na fakturach (jeśli Stripe Invoicing)
5. **Test sandbox** przed live: checkout → webhook log → email

### Resend

1. Dodaj domenę `stronyodzaraz.pl`
2. DNS u rejestratora (Resend pokaże rekordy):
   - SPF (TXT)
   - DKIM (CNAME ×2)
   - **DMARC** (TXT `_dmarc`) — często zapomniane
3. From: `noreply@stronyodzaraz.pl`
4. Test: `POST /api/kontakt` → lead na `CONTACT_EMAIL` + auto-reply do klienta

---

## FAZA E — Prawne i zaufanie

- [ ] Regulamin świadczenia usług (scope, terminy, reklamacje, odstąpienie — usługa cyfrowa/wykonana na zamówienie)
- [ ] Polityka prywatności (RODO, cookies, GA4 consent)
- [ ] NIP / dane podmiotu w stopce
- [ ] ConsentBanner → GA4 ładuje się **po** zgodzie
- [ ] Linki regulamin + RODO w stopce checkout

---

## FAZA F — SEO / Google (jednorazowo, ~2h)

### F1. Przed pierwszym pingiem

- [ ] `https://stronyodzaraz.pl/robots.txt` — allow `/`, disallow `/api/`
- [ ] `https://stronyodzaraz.pl/sitemap.xml` — ~435 URL, otwiera się w przeglądarce
- [ ] `https://stronyodzaraz.pl/llms.txt` — aktualne ceny
- [ ] Rich Results Test na 5 URL (home, kategoria, PDP, blog, `/l/warszawa`)
- [ ] PageSpeed mobile — LCP < 3s (nie perfekcjonizm, próg OK)

### F2. Google Search Console

1. [search.google.com/search-console](https://search.google.com/search-console)
2. Dodaj property: **URL prefix** `https://stronyodzaraz.pl`
3. Weryfikacja: DNS TXT **lub** plik HTML (Coolify static)
4. Sitemaps → Submit: `https://stronyodzaraz.pl/sitemap.xml`
5. **Request indexing** ręcznie (max ~10/dzień) — priorytet:
   - `/`
   - `/uslugi`
   - 8× `/uslugi/{category}`
   - `/blog/ile-kosztuje-strona-internetowa-2026`
   - `/l/warszawa`, `/l/krakow`

Reszta wejdzie z sitemap — **nie musisz** requestować 435 ręcznie.

### F3. Google Analytics 4

1. [analytics.google.com](https://analytics.google.com) → nowy property `stronyodzaraz.pl`
2. Web stream → skopiuj `G-XXXXXXXX`
3. W Coolify: `NEXT_PUBLIC_GA_ID=G-...`
4. Redeploy → test Real-time po akceptacji cookies

### F4. Bing Webmaster Tools

1. [bing.com/webmasters](https://www.bing.com/webmasters)
2. Import site from GSC (najszybsze)
3. Albo ręcznie + submit sitemap

### F5. IndexNow (batch — jednorazowo po deploy)

```bash
# Wygeneruj klucz
openssl rand -hex 16
# → zapisz jako INDEXNOW_KEY w env
# → plik public/{key}.txt z treścią = sam klucz

npm run mkt:sitemap
# + przygotuj new-urls.txt ze wszystkimi URL z sitemap
npm run mkt:sitemap -- --indexnow-urls marketing/queue/seo/all-urls.txt
```

Alternatywa: jednorazowy skrypt curl — ważne żeby **raz** wysłać batch po deploy.

### F6. Opcjonalne (5 min each, nie obowiązkowe)

| Co | Po co |
|----|-------|
| Katalog Panorama Firm / KRS | 1 backlink NAP |
| Link ze stopki haccpnajuz / bhpodzaraz / gotowyregulamin | cross-sell portfolio |
| LinkedIn / FB strona firmy | nie SEO, opcjonalnie |

**Nie rób:** Google Business Profile z fałszywym adresem — jesteś remote-first; ewentualnie Service Area bez adresu.

---

## FAZA G — Launch day runbook (kolejność, ~3h)

```
Godz. 0:00  npm run build lokalnie — ostatni raz
Godz. 0:15  git push / deploy Coolify
Godz. 0:30  Smoke test (lista poniżej)
Godz. 1:00  Stripe webhook test (live payment 1 zł lub refund)
Godz. 1:30  GSC: sitemap + 10× request indexing
Godz. 1:45  GA4 real-time test
Godz. 2:00  IndexNow batch
Godz. 2:15  Bing import
Godz. 2:30  Ostatni przegląd mobile — koniec. Zamykamy projekt.
```

### Smoke test (must pass)

| # | Test | Oczekiwane |
|---|------|------------|
| 1 | `GET /` | 200, logo/hero |
| 2 | `GET /uslugi` | karty usług |
| 3 | `GET /uslugi/strony-internetowe/strona-wordpress-restauracja` | cena, CTA, schema |
| 4 | `GET /l/warszawa/strony-internetowe` | local intro, linki PDP |
| 5 | `GET /sitemap.xml` | XML, >400 url |
| 6 | Dodaj do koszyka → checkout Stripe **test** | redirect Stripe |
| 7 | `POST /api/kontakt` | 200 + mail |
| 8 | Stripe Dashboard → Webhooks → test event | 200 |
| 9 | `GET /robots.txt` | sitemap link |
| 10 | `GET /llms.txt` | plain text OK |

---

## FAZA H — D+1 do D+7 (jednorazowo, potem stop)

| Dzień | Akcja | Potem |
|-------|-------|-------|
| D+1 | GSC → Coverage — czy są błędy 404 | — |
| D+2 | Stripe webhook log — 0 failed | — |
| D+3 | Resend — 0 hard bounces | — |
| D+7 | GSC → Performance — czy są impresje | **koniec aktywnej pracy** |

Po D+7: tylko [MONITORING-MINIMAL.md](./MONITORING-MINIMAL.md).

---

## FAZA I — Zamknięcie projektu

Projekt **zamknięty**, gdy wszystkie ✅:

### Kod & infra
- [ ] Build prod OK
- [ ] ~435 URL live
- [ ] Checkout live działa
- [ ] Cron 200
- [ ] Maile działają

### Google
- [ ] GSC sitemap Success
- [ ] GA4 zbiera dane
- [ ] IndexNow wysłany

### Prawne
- [ ] Regulamin + RODO + NIP

### Docs
- [ ] PORTFOLIO-NAMING.md — wpis stronyodzaraz ✅
- [ ] Ten checklist wydrukowany / odhaczony

**Następny krok:** kolejny projekt w `/Volumes/T7/PROJEKTY/leg/...` — **nie** wracamy tu co tydzień.

---

## Szybkie linki zewnętrzne (panel admin)

| Panel | URL |
|-------|-----|
| Coolify | (twój host) |
| Stripe | https://dashboard.stripe.com |
| Resend | https://resend.com/emails |
| GSC | https://search.google.com/search-console |
| GA4 | https://analytics.google.com |
| Bing | https://www.bing.com/webmasters |
| PageSpeed | https://pagespeed.web.dev |

---

## Ryzyka — ostatnia lista

| Ryzyko | Mitygacja |
|--------|-----------|
| .env skopiowany z HACCP | Osobny webhook, CRON_SECRET, SITE_URL |
| 1814 thin URL w Google | Tylko 317 primary + canonical |
| Regulamin HACCP na stronie WWW | Faza B — przepisać |
| Webhook fail silent | Stripe email alerts + 1×/mies check |
| Brak DMARC | Resend deliverability spada |

---

*Powiązane: DOCS-INDEX · SCOPE-JEDNORAZOWY · MONITORING-MINIMAL · ENV-ALL-SHOPS · LAUNCH-READINESS*
