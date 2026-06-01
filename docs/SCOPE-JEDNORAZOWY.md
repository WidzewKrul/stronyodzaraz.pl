# stronyodzaraz.pl — scope jednorazowego buildu

**Zasada:** wszystko poniżej idzie **live w jednym deployu**. Potem tylko monitoring. Nie ma „fazy 2 za 3 miesiące”.

---

## 1. Strony i URL (co Google indeksuje)

### Warstwa A — must have (core)

| Typ | Liczba URL | Route |
|-----|------------|-------|
| Homepage | 1 | `/` |
| Katalog | 1 | `/uslugi` |
| Huby kategorii | 8 | `/uslugi/{category}` |
| PDP usług (primary) | **317** | `/uslugi/{category}/{slug}` |
| Blog listing | 1 | `/blog` |
| Artykuły blog | **10** | `/blog/{slug}` |
| Statyczne | 5 | `/o-nas`, `/kontakt`, `/regulamin`, `/polityka-prywatnosci`, `/koszyk`* |
| System | 2 | `/sitemap.xml`, `/robots.txt`, `/llms.txt` |

\* `/koszyk`, `/sukces` — **noindex**, w sitemap **nie**.

**Razem warstwa A: ~345 indeksowalnych URL**

### Warstwa B — local SEO (big bang, ten sam deploy)

| Typ | Liczba | Route |
|-----|--------|-------|
| Hub miasto tier A | 10 | `/l/{city}` |
| Miasto × kategoria | 80 | `/l/{city}/{category}` |

Miasta tier A: Warszawa, Kraków, Wrocław, Poznań, Gdańsk, Gdynia, Łódź, Katowice, Lublin, Szczecin.  
Dane: `docs/seo/cities-tier.json`, copy: `docs/seo/local-templates.json`.

**Razem z local: ~435 indeksowalnych URL**

### Warstwa C — świadomie NIE indeksujemy

| Co | Dlaczego |
|----|----------|
| 1814 − 317 = **~1497 secondary PDP** | canonical → primary (`catalog-curation`) |
| `/uslugi?q=`, filtry bez treści | noindex + canonical |
| `/api/*`, `/sukces` | disallow / noindex |
| 87 miast tier B/C jako osobne URL | tylko tier A; reszta → synonimy w copy PDP |
| Tier B blog „strona www {miasto}” | **pominięte** w modelu „zapomnij” — opcjonalne max 3 artykuły jeśli starczy czasu |

---

## 2. Funkcjonalność (must work day 1)

| Moduł | Opis | Auto po launch? |
|-------|------|-----------------|
| Katalog `/uslugi` | search, filtry, paginacja | tak (static) |
| Koszyk + Stripe Checkout | płatność online | tak |
| Webhook Stripe | `checkout.session.completed` → DB | tak |
| Brief po zakupie | formularz → PDF/DOCX email | tak (+ cron) |
| Formularz kontakt | `/api/kontakt` + auto-reply | tak |
| E-maile transakcyjne | potwierdzenie, brief, drip | tak (cron) |
| Cron process + drip | Coolify scheduled | tak |
| GA4 + ConsentBanner | analityka po zgodzie | tak |
| Schema.org | Product, FAQ, Breadcrumb, Org | tak (static) |
| Sitemap dynamic | z katalogu + blog + local | tak |

---

## 3. Copy i treść (jednorazowo)

| Element | Źródło | Uwagi |
|---------|--------|-------|
| 317 PDP title/meta/longDesc/FAQ | `product-content.ts` + generator | synonimy z `synonyms-branch.json` |
| 8 hubów kategorii | `uslugi-config.ts` | FAQ, process, forWhom |
| 10 blogów | `lib/blog.ts` | pillar + long-tail |
| Local 90 stron | `local-templates.json` | rotacja wariantów — nie spin |
| Homepage, o-nas, kontakt | page.tsx | — |
| Regulamin / RODO | strony prawne | **dostosować do usług**, nie HACCP |
| llms.txt | `public/llms.txt` | sync cen z OFERTA.md |

---

## 4. Assety

| Asset | Wymagany? |
|-------|-----------|
| Logo `public/images/brand/logo-mark.*` | **tak** |
| Hero / karty / OG | **nie** — CSS/Lucide/`opengraph-image.tsx` |
| Zdjęcia stock | opcjonalnie nigdy |

---

## 5. Integracje zewnętrzne (setup jednorazowy)

| Usługa | Co skonfigurować |
|--------|------------------|
| **DNS** | A `@` → 57.131.49.251 |
| **Coolify** | app + PostgreSQL + SSL + cron ×2 |
| **Stripe** | live keys, webhook, produkty dynamiczne z kodu |
| **Resend** | domena + SPF/DKIM/DMARC, from `noreply@stronyodzaraz.pl` |
| **Google Search Console** | property + sitemap |
| **GA4** | property + `NEXT_PUBLIC_GA_ID` |
| **IndexNow** | key file + batch URL (Bing/Yandex) |
| **Bing Webmaster** | import z GSC (5 min) |
| **OpenRouter** | opcjonalnie — generowanie briefu PDF |

---

## 6. Backlog kodu (żeby scope był kompletny)

Checklist implementacji — **przed deployem**:

- [ ] Logo w `public/images/brand/`
- [ ] `lib/seo/*` — metadata, json-ld, cities, synonyms loader
- [ ] Routes `/l/[city]`, `/l/[city]/[category]`
- [ ] Sitemap: warstwa A + B (~435 URL), **nie** 1814
- [ ] Sitemap: tylko **primary** PDP (317)
- [ ] Synonimy zawodu w `product-content.ts`
- [ ] Regulamin — copy usług web (nie dokumenty PDF)
- [ ] `keywords.ts` — intent web (nie HACCP)
- [ ] IndexNow key + `public/{key}.txt`
- [ ] noindex `/uslugi?q=`
- [ ] Coolify: 4. sklep w deploy script
- [ ] `.env` produkcyjny wypełniony
- [ ] `npm run build` zero błędów
- [ ] Smoke: checkout sandbox → webhook → email
- [ ] Smoke: kontakt → lead + auto-reply

Szczegóły kroków: **PROJEKT-KOMPLETNY.md**.

---

## 7. Definition of Done — scope zamknięty

Projekt uznajemy za **zakończony**, gdy:

1. ~435 URL zwraca 200, schema OK na próbce 10 URL  
2. Stripe live checkout działa end-to-end  
3. GSC: sitemap submitted, status „Success”  
4. GA4 zbiera ruch (test real-time)  
5. Cron odpala bez 401  
6. Regulamin/RODO/NIP na stronie  
7. **MONITORING-MINIMAL.md** — wiesz co sprawdzać 1×/miesiąc  

Potem: **nie dotykamy** — następny projekt portfolio.

---

*Powiązane: PROJEKT-KOMPLETNY.md · SEO-PROGRAMMATIC.md · OFERTA.md*
