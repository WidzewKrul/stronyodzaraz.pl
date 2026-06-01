# Proces realizacji — SOP (7–14 dni)

**Cel:** powtarzalna dostawa pakietów productized bez scope creep.

**Powiązane:** ONBOARDING-KLIENTA.md · HANDOVER-CHECKLIST.md · SZABLONY-WP-BIBLIOTEKA.md

---

## Timeline per pakiet

| Pakiet | Dni rob. | Rundy poprawek |
|--------|----------|----------------|
| Landing | 5–7 | 1 |
| Start | 7 | 1 |
| Pro | 14 | 2 |
| Sklep Start | 10–14 | 1 |
| Sklep Pro | 14–21 | 2 |
| Integracja | 2–5 | 0 |
| GA4/Ads setup | 3–5 | 0 |

**T0** = kompletny brief + materiały w systemie.

---

## Faza 0 — T-48h do T0 (po płatności)

| Krok | Kto | Akcja |
|------|-----|-------|
| 0.1 | Auto | Email potwierdzenie + link brief |
| 0.2 | Auto | Stripe webhook → status `PAID` w DB |
| 0.3 | Auto | D+1 reminder jeśli brak briefu |
| 0.4 | Ops | P0 eskalacja jeśli brak briefu D+2 |

---

## Faza 1 — Dzień 1 (setup projektu)

| # | Akcja | Output |
|---|-------|--------|
| 1 | Walidacja briefu vs scope pakietu | checklist OK / lista braków do klienta |
| 2 | Utworzenie staging URL | `staging-{id}.clients.stronyodzaraz.pl` lub subfolder |
| 3 | Instalacja WP + motyw z biblioteki branżowej | SZABLONY-WP-BIBLIOTEKA |
| 4 | Import treści z briefu (lub placeholder) | |
| 5 | Konfiguracja podstaw: SSL staging, formularz test | |
| 6 | Mail do klienta: „Projekt ruszył, termin {data}” | TRESCI-EMAILS → `project_started` |

**Czas:** 2–4h Landing/Start · 4–8h Sklep

---

## Faza 2 — Dni 2–4 (build)

| Pakiet | Prace |
|--------|-------|
| Landing | Hero, 3 sekcje, formularz, mapa, RODO banner |
| Start | + podstrony, menu, GA4, Search Console invite |
| Pro | + SEO meta, schema, blog template, CWV podstawowy |
| Sklep | Produkty CSV, kategorie, P24 sandbox, InPost, test order |

**Daily:** max 2 projekty równolegle per dev (productized limit).

---

## Faza 3 — Dzień 5–7 (review)

| # | Akcja |
|---|-------|
| 1 | Wewnętrzny QA: mobile, formularz, linki, 404 |
| 2 | Wyślij link staging + instrukcja uwag |
| 3 | Klient ma **5 dni rob.** na uwagi (runda 1) |
| 4 | Poprawki w scope — max czas 1–2 dni |

---

## Faza 4 — Dzień 8–10 (Pro/Sklep: runda 2)

Tylko Pro / Sklep Pro — druga runda uwag.

---

## Faza 5 — Wdrożenie (handover)

| # | Akcja | Doc |
|---|-------|-----|
| 1 | DNS na produkcję (Klient lub WaaS) | INFRA |
| 2 | Migracja staging → prod | |
| 3 | Test formularz + GA4 live | |
| 4 | Sklep: test order prod/sandbox → prod | |
| 5 | Szkolenie 30 min (call/nagranie) | |
| 6 | HANDOVER checklist + email | HANDOVER-CHECKLIST |
| 7 | Status `DELIVERED` → trigger drip D+3 | |
| 8 | Gwarancja 30 dni startuje | |

---

## Eskalacje

| Problem | Akcja |
|---------|-------|
| Brak logo/treści | Placeholder + klient zobowiązuje się dostarczyć w 30 dni |
| Scope creep w uwagach | „Poza pakietem — wycena 150/h lub upsell Pro” |
| Klient nie odpowiada 10 dni | Mail final + wdrożenie „as is” po uprzedzeniu |
| Opóźnienie z waszej winy | 1 dzień gratis opieki lub przeprosiny + priorytet |

---

## Narzędzia

| Tool | Użycie |
|------|--------|
| PostgreSQL orders | statusy |
| Notion/Trello opcjonalnie | kanban projektów |
| Coolify | deploy staging WP |
| Stripe | płatności |
| Resend | maile |

---

*Onboarding klienta: ONBOARDING-KLIENTA.md*
