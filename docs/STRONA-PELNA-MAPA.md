# stronyodzaraz.pl — mapa kompletnej strony

**Cel:** jednorazowo zbudować **pełny** produkt B2B — nie landing z katalogiem, tylko profesjonalna platforma sprzedaży usług z automatycznym contentem w tle.

**Powiązane:** BLOG-AUTOMAT.md · TRUST-DEMO-FAQ.md · UPSELL-CROSSSELL.md · INFRA-DOMENA-HOSTING.md · COOLIFY-JOBS.md

---

## 1. Architektura strony (wszystkie sekcje)

```
/                          Money page + trust + FAQ + CTA
/uslugi                    Katalog + search + filtry
/uslugi/{category}         Hub branżowy + FAQ kategorii + proces
/uslugi/{cat}/{slug}       PDP + upsell box + demo mockup + reviews
/l/{city}                  Local hub (tier A)
/l/{city}/{category}       Local × usługa
/blog                      Listing + tagi + „najpopularniejsze”
/blog/{slug}               Artykuł SEO + CTA + related + schema
/o-nas                     Zaufanie, zespół/process, portfolio rodziny *odzaraz*
/kontakt                   Formularz + dane + FAQ kontakt
/regulamin · /polityka     Prawne
/koszyk · /sukces          Checkout flow (noindex)
/demo                      Opcjonalnie: galeria mockupów / interaktywne demo
/technologia               Stack, hosting, bezpieczeństwo (trust techniczny)
/cennik                    Tabela pakietów (redirect lub sekcja — jeden canonical)
```

---

## 2. Homepage — wymagane bloki

| # | Sekcja | Cel konwersji / SEO |
|---|--------|---------------------|
| 1 | **Hero** | H1 money keyword + 2 CTA (katalog, o nas) |
| 2 | **TrustBar** | 4 filary (platformy, termin, gwarancja, Stripe) — ✅ jest |
| 3 | **Logo cloud / platformy** | WordPress, WooCommerce, Shopify, Shoper, Stripe, GA4 |
| 4 | **Kategorie usług** | 8 kafelków → hub — ✅ jest |
| 5 | **Jak to działa** | 3 kroki checkout → brief → oddanie — ✅ jest |
| 6 | **Demo / podgląd** | Browser mockup lub karuzela 3 branż (restauracja, gabinet, sklep) |
| 7 | **Cennik skrót** | Tabela Start/Pro/Sklep + link do katalogu — ✅ jest |
| 8 | **Social proof** | Licznik pakietów, „portfolio *odzaraz*”, placeholder opinii |
| 9 | **FAQ** | 6–8 pytań money + schema FAQPage — ✅ jest |
| 10 | **Blog teaser** | 3 najnowsze artykuły z `/blog` |
| 11 | **CTA końcowy** | „Wybierz pakiet” — ✅ jest |
| 12 | **Stopka** | NIP, mail, linki prawne, 3 sklepy siostrzane |

---

## 3. PDP usługi — wymagane elementy

| Element | Status | Doc |
|---------|--------|-----|
| H1 + cena + AddToCart | ✅ | — |
| BriefMockup / demo wizualne | ✅ CSS | TRUST-DEMO-FAQ |
| Trust pills (30 dni, 7–14 dni, platformy) | ✅ | — |
| Tabs: opis, scope, proces, FAQ, dostawa | ✅ | — |
| **Upsell box** | ⚠️ do kodu | UPSELL-CROSSSELL |
| **Cross-sell** (3 related) | ✅ | — |
| ProductReviews | ✅ placeholder | TRUST-DEMO-FAQ |
| Schema Product + Offer + FAQ | ✅ | AEO |
| „Co NIE wchodzi” (scope out) | ⚠️ w product-content | OFERTA.md |
| Link do artykułu blog powiązanego | ⚠️ do kodu | BLOG-AUTOMAT |

---

## 4. Strony zaufania i techniczne (nowe)

### `/o-nas` — rozszerzyć o:

- Kim jesteśmy (remote-first PL, productized)
- **Portfolio 4 sklepów** *odzaraz* (cross-trust)
- Proces pracy (brief → projekt → wdrożenie → szkolenie)
- Gwarancja 30 dni — plain language
- NIP, forma prawna, kontakt

### `/technologia` (nowa strona — docelowo)

| Sekcja | Treść |
|--------|-------|
| Stack | WordPress, WooCommerce, Shopify, Shoper — kiedy co |
| Bezpieczeństwo | SSL, backup, aktualizacje, RODO |
| Hosting | Co dostarczamy vs co klient ma (patrz INFRA-DOMENA-HOSTING) |
| Performance | CWV, cache, CDN — obietnica Pro |
| Integracje PL | P24, InPost, Allegro — lista |
| FAQ techniczne | 5–8 pytań |

### Demo / mockupy (bez prawdziwych klientów na start)

| Typ | Implementacja |
|-----|---------------|
| **Browser mockup** | HeroBanner — ✅ |
| **Brief mockup** | BriefMockup PDP — ✅ |
| **3× branża demo** | `/demo` lub sekcja home: restauracja / dentysta / sklep — CSS + Lucide |
| **Before/after CWV** | statyczna grafika „PageSpeed 45 → 92” — opcjonalnie SVG |
| **Wideo** | **nie na launch** — za drogie w utrzymaniu |

Realne case study dodajesz **tylko** gdy masz klienta i zgodę.

---

## 5. FAQ — warstwy (gdzie co)

| Warstwa | Ilość | Źródło |
|---------|-------|--------|
| Homepage | 6–8 | `app/page.tsx` + schema |
| Każdy hub kategorii | 4–6 | `uslugi-config.ts` |
| Każde PDP | 4–6 | `product-content.ts` generator |
| `/technologia` | 5–8 | nowa strona |
| `/kontakt` | 3–4 | obok formularza |
| Blog | FAQ w artykule | OpenRouter prompt |

**Master lista pytań:** TRUST-DEMO-FAQ.md § FAQ master

---

## 6. Blog — rola w stronie

- **Launch:** 10 artykułów w `lib/blog.ts`
- **Potem:** +1–2 / tydzień automat (OpenRouter + cron) — patrz BLOG-AUTOMAT.md
- Każdy artykuł: 1200–2000 słów, 2–4 linki wewnętrzne do PDP/kategorii, CTA box, BlogPosting schema
- Blog listing: tagi, „popularne”, search opcjonalnie później

---

## 7. E-mail i automatyzacja po zakupie

| Trigger | Akcja | Job |
|---------|-------|-----|
| Checkout OK | Potwierdzenie + link brief | webhook |
| Brief wypełniony | PDF/DOCX brief | cron process |
| D+3 po oddaniu | Upsell opieka/Ads | cron drip |
| D+7 | Cross-sell integracja | cron drip |

Copy upsell: UPSELL-CROSSSELL.md · KONTAKT-AUTOMAT.md

---

## 8. Analityka i monitoring

| Narzędzie | Co mierzymy |
|-----------|-------------|
| GA4 | ruch, konwersje checkout, scroll blog |
| GSC | impresje long-tail (pasywnie) |
| Stripe | revenue, failed webhooks |
| UptimeRobot | downtime alert |

Szczegóły: MONITORING-MINIMAL.md — rozszerzone o blog queue health.

---

## 9. Backlog implementacji strony (priorytet)

### P0 — launch
- [ ] Logo
- [ ] `/l/*` local 90 URL
- [ ] lib/seo/*
- [ ] Regulamin usług web
- [ ] Upsell box na PDP
- [ ] Blog teaser na home
- [ ] BlogPosting schema
- [ ] Naprawa TAG_TO_CATEGORY w blog (resztki HACCP)

### P1 — tydzień po launch
- [ ] `/technologia`
- [ ] `/demo` (3 mockupy branż)
- [ ] Portfolio *odzaraz* na o-nas
- [ ] Platform badges na home
- [ ] Blog automat (cron + OpenRouter)

### P2 — gdy są klienci
- [ ] Prawdziwe case study
- [ ] Opinie klientów (ProductReviews z DB)
- [ ] Wideo testimonial

---

## 10. Checklist „strona kompletna”

Strona uznana za **profesjonalną i kompletną**, gdy:

- [ ] ~435 URL + blog rośnie automatycznie
- [ ] Każda kategoria ma hub z FAQ i procesem
- [ ] PDP ma demo, cenę, scope, upsell, related
- [ ] Home ma trust + demo + FAQ + blog teaser
- [ ] o-nas + technologia + regulamin + RODO
- [ ] Checkout → brief → drip działa
- [ ] Crony/blog job na Coolify Scheduled Tasks
- [ ] Cross-linki do 3 sklepów portfolio

---

*Indeks: DOCS-INDEX.md · Master: PROJEKT-KOMPLETNY.md*
