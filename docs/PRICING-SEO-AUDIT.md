# Audyt cen + SEO — rynek PL (maj 2026)

## Strategia: jeden produkt cyfrowy na branżę

Każdy sklep sprzedaje **jeden kompletny produkt cyfrowy per branch** (grupa `category + branch`), nie katalog fragmentów z upsellem tierów.

| Sklep | Cena kompletu | Grosze | Model |
|---|---|---|---|
| **haccpnajuz.pl** | **199 zł** | **19900** | Dokumentacja HACCP — {branch} |
| **bhpodzaraz.pl** | **179 zł** | **17900** | Dokumentacja BHP/PPOŻ/BDO — {branch} |
| **regulaminygotowe.pl** | **149 zł** | **14900** | Dokumenty prawne — {context} |

**Implementacja:** `lib/complete-kit.ts` → `normalizePrimaryProduct()` na wszystkich primary products z `buildCurationIndex`. `DEFAULT_PRICE_GROSZE = COMPLETE_KIT_PRICE_GROSZE`.

**Copy:** brak słowa „pakiet" w tekstach customer-facing. Tytuły SEO: `Dokumentacja HACCP — {branch}`, nie „pakiet GHP/GMP".

---

## Konkurencja — kluczowe gracze

### HACCP
- sklep-haccp.pl — 199 zł/pakiet sklep
- haccp-polska.pl — 250–750 zł netto
- haccpdlaciebie.pl — od 250 zł brutto
- **Przewaga nasza:** instant AI personalizacja, 199 zł flat per branża

### BHP/PPOŻ
- bhp-online.com — 55 zł/ORZ (pojedynczy dokument)
- szkoleniabhp-online.pl — 59 zł promo
- bhp-protex.pl — 99–190 zł
- luxcontrol.pl — 149 zł indywidualna
- **Przewaga nasza:** 179 zł komplet ORZ+instrukcje+rejestry, instant delivery

### Regulaminy/RODO
- creativa.legal — 349–749 zł pakiet
- rodonagotowo.pl — 599 zł
- legalgeek.pl — abonament roczny
- kingakonopelko.pl — 200+ zł wzór
- **Przewaga nasza:** 149 zł komplet regulamin+RODO per kontekst

---

## SEO — must-have per sklep

### Techniczne (już w boilerplate)
- [x] SSR/SSG PDP + kategorie
- [x] `seoTitle` + meta description per produkt (unified via complete-kit)
- [x] JSON-LD Product + FAQ
- [x] Sitemap.xml dynamiczny (tylko primary products)
- [x] Canonical URLs
- [x] Redirect non-primary → primary branch
- [x] `llms.txt` AEO
- [x] ConsentBanner (RODO analytics)
- [x] Core Web Vitals: next/image, font display swap, minimal JS

### Content SEO
- Homepage H1 z głównym keyword + geo intent
- FAQ pricing: single price anchor (199/179/149 zł)
- PDP: kit contents list jako spec produktu, nie upsell
- Internal linking: kategoria → branża → powiązane segmenty

### Keywords docelowe

**haccpnajuz.pl**
- dokumentacja haccp gotowa [branża]
- księga haccp [gastronomia/sklep]
- haccp sanepid wzór

**bhpodzaraz.pl**
- ocena ryzyka zawodowego [stanowisko]
- dokumentacja bhp gotowa
- instrukcja bhp [branża]
- dokumentacja ppoz

**regulaminygotowe.pl**
- regulamin sklepu internetowego wzór
- polityka prywatności rodo sklep
- regulamin allegro wzór 2026

---

## Curation — extractBranch per sklep

| Sklep | Format tytułu | extractBranch |
|---|---|---|
| haccp-sklep | `{branch} – {docType}` | część **przed** „ – " |
| ocenaryzyka | `{docType} – {branch}` | część **po** „ – " |
| regulaminygotowe | `{docType} – {context}` | część **po** „ – " |

### Liczby primary (maj 2026)
- haccpnajuz.pl: 3901 raw → **675** primary
- bhpodzaraz.pl: 3670 raw → **1106** primary
- regulaminygotowe.pl: 1242 raw → **210** primary

---

## Coolify deploy checklist

Per app:
1. Project + Postgres DB
2. GitHub repo connect (branch main)
3. Dockerfile build
4. Env vars z `.env` (Stripe, Resend, OpenRouter, DATABASE_URL, CRON_SECRET, SITE_URL)
5. Health check `/api/health` lub `/`
6. Scheduled: `curl -H "Authorization: Bearer $CRON_SECRET" https://{domena}/api/cron/process` co 1 min
7. Stripe webhook → `https://{domena}/api/webhook`
8. DNS A record → 57.131.49.251

**haccp-sklep:** app `ml0mhggy1pz99f4ncee2awas` — czeka na DNS haccpnajuz.pl
