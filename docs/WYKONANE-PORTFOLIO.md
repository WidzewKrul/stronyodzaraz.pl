# /wykonane — portfolio przykładów (master spec)

**URL:** `/wykonane` · opcjonalnie alias `/realizacje` → 301 na `/wykonane`  
**Detail:** `/wykonane/[slug]` — pełny mock + scope + CTA do PDP

**Naming:** na launch **„Przykładowe układy i projekty”** — nie „Nasze realizacje” dopóki nie ma prawdziwych klientów ze zgodą. Po 5+ case study: rebrand sekcji na „Wybrane realizacje” + mix mock + real.

**Powiązane:** TRUST-DEMO-FAQ.md · content/wykonane-katalog.json · UKLAD-STRON.md

---

## 1. Cel biznesowy

| Cel | Jak strona to realizuje |
|-----|-------------------------|
| **Zaufanie** | Klient widzi *co dostaje* w pakiecie — nie abstrakcję „strona www” |
| **Konwersja** | Każdy przykład → CTA „Zamów ten pakiet” → PDP money |
| **SEO** | Long-tail: „przykład strony restauracji”, „jak wygląda sklep woocommerce” |
| **Internal linking** | Hub łączy 8 kategorii usług + 16 showcase → PDP |
| **Upsell** | Porównanie Start vs Pro vs Sklep na detail page |

---

## 2. Architektura informacji

```
/wykonane                          HUB — filtry + grid 16 kart
    │
    ├── /wykonane/landing-warsztat-samochodowy
    ├── /wykonane/strona-restauracja-wordpress
    ├── /wykonane/sklep-woocommerce-moda
    ├── /wykonane/opieka-wordpress-dashboard
    ├── /wykonane/integracja-inpost-sklep
    └── … (16 slugów — patrz wykonane-katalog.json)

/demo                              SKRÓT — 3 hero branże + link „Zobacz wszystkie” → /wykonane
```

**Różnica `/demo` vs `/wykonane`:**
- `/demo` — szybki podgląd 3 branż (restauracja, dentysta, sklep) dla homepage teaser
- `/wykonane` — **pełny katalog** wszystkich typów usług z filtrami i detail pages

---

## 3. UX — hub `/wykonane`

### Sekcje (kolejność)

```
1. HeroBanner compact
   H1: Przykładowe układy stron, sklepów i usług
   Sub: Zobacz typową strukturę projektu w każdej kategorii — od landing page po opiekę techniczną.
   Disclaimer pill: Ilustracje — każdy projekt dopasowujemy do Twojej firmy

2. FilterBar (sticky mobile)
   [Wszystkie] [Strony] [Sklepy] [WordPress] [Shopify/Shoper] [Marketing] [Opieka] [Integracje] [Migracje]
   + opcjonalnie tier: Landing | Start | Pro | Sklep

3. Stats strip
   16 przykładów · 8 kategorii · 317+ pakietów w katalogu

4. ShowcaseGrid
   16× ShowcaseCard (mock thumbnail + badge kategoria + tier + fake brand)

5. CompareCTA
   „Nie wiesz co wybrać?” → tabela Start vs Pro + link /uslugi

6. PortfolioOdZaraz (skrót)
   Ekosystem *odzaraz* — cross-trust

7. FAQ (4 pyt)
   Czy to gotowe szablony? / Czy mogę mieć inny układ? / Ile trwa realizacja? / Czy to wasze realizacje?

8. CTA końcowy
   Zobacz pakiety i ceny → /uslugi
```

### ShowcaseCard (karta w gridzie)

| Element | Opis |
|---------|------|
| Thumbnail | Mini `DemoBrowserMock` variant=card (aspect 16/10) |
| Badge | kategoria kolorowa (accent z uslugi-config) |
| Tier pill | Landing / Start / Pro / Sklep / Usługa |
| Tytuł | fake brand + typ: „Restauracja U Kucharza — strona Start” |
| 1-liner | scope hook: „Menu, mapa, rezerwacja, GA4” |
| Link | → `/wykonane/{slug}` |

**Hover:** lift + border brand · **Grid:** 1 col mobile, 2 md, 3 lg

### FilterBar — logika

- Filtr = `categorySlug` z JSON · multi-select NIE (proste)
- URL sync: `/wykonane?cat=sklepy-internetowe` — shareable, canonical bez query = hub
- Empty state: „Brak w tej kategorii” — nie powinno wystąpić przy 16 itemach

---

## 4. UX — detail `/wykonane/[slug]`

```
1. Breadcrumb: Wykonane > {kategoria} > {tytuł}

2. Header row
   Left: H1 + tagline + tier badge + czas realizacji
   Right: cena od + button „Zamów pakiet” (sticky sidebar desktop)

3. Full DemoBrowserMock (variant=full, wszystkie sekcje z JSON)

4. Disclaimer box (amber border)
   To ilustracja typowego scope pakietu {tier}. Projektujemy pod Twoją markę.

5. Co zawiera ten przykład (checklist scope)
   6–10 bulletów z JSON scopeDelivered

6. Stack / technologie (ikony)
   WordPress, WooCommerce, P24… per item

7. CompareStartPro (jeśli dotyczy strony) — opcjonalnie

8. Related showcases (3 z tej samej kategorii)

9. Upsell hint (1 linia)
   „Często dokładane: Opieka WordPress 299 zł/mc”

10. CTA duży → PDP slug z JSON

11. FAQ (2 specyficzne per item)
```

**Mobile:** sticky bottom bar — cena + „Zamów pakiet” (jak PDP)

---

## 5. Typy mockupów (16 showcase)

Nie wszystko to „strona w przeglądarce”. Rozróżniamy **variant**:

| Variant | Użycie | Komponent |
|---------|--------|-----------|
| `browser` | strony, landing, sklepy | `DemoBrowserMock` |
| `dashboard` | opieka, GA4, Ads | `DemoDashboardMock` |
| `flow` | integracje (InPost, P24) | `DemoFlowMock` |
| `split` | migracja before/after | `DemoSplitMock` |

### Mapowanie kategoria → showcase count

| Kategoria | Liczba | Przykłady |
|-----------|--------|-----------|
| strony-internetowe | 4 | landing warsztat, restauracja Start, dentysta Pro, kancelaria B2B |
| sklepy-internetowe | 3 | Woo moda, sklep spożywczy, Woo B2B hurt |
| shopify-shoper | 2 | Shopify kosmetyki, Shoper elektronika |
| wordpress | 1 | panel WP — edycja treści (szkolenie) |
| reklama-marketing | 2 | GA4 dashboard, Google Ads kampania |
| opieka-techniczna | 2 | dashboard opieki (uptime, backup), raport miesięczny |
| integracje | 2 | InPost checkout flow, P24 + BLIK |
| migracje | 1 | before/after + mapa 301 |

**Razem: 17** (wordpress jako cross-cut + strony)

---

## 6. Copy i framing prawny

### DO pisania

- „Przykładowy układ”
- „Typowa struktura pakietu {tier}”
- „Ilustracja scope — projekt custom w ramach pakietu”
- „Marki fikcyjne — służą prezentacji układu sekcji”

### NIE pisać (do czasu realnych klientów)

- „Nasza realizacja dla…”
- „Klient X zwiększył sprzedaż o 40%”
- Logo prawdziwych firm bez zgody
- Screenshoty cudzych stron z internetu

### Migracja po pierwszych klientach

1. Dodaj `type: "case-study"` obok `type: "mock"` w JSON
2. Case study = zdjęcie real + metryka + zgoda
3. Hub filtr: „Przykłady” | „Realizacje klientów”
4. Schema `CreativeWork` / `Review` tylko dla real

---

## 7. SEO

### Meta hub

```
title: Przykładowe strony, sklepy i projekty — portfolio układów | stronyodzaraz.pl
description: Zobacz jak wyglądają typowe projekty: landing page, strona WordPress, sklep WooCommerce, opieka techniczna, integracje. Stałe ceny pakietów w katalogu.
canonical: /wykonane
```

### Meta detail (template)

```
title: {title} — przykład {tier} | stronyodzaraz.pl
description: {scopeOneLiner}. Pakiet {tier} od {priceFrom} zł. Realizacja {deliveryDays} dni.
```

### Schema

- Hub: `CollectionPage` + `ItemList` (16 elementów)
- Detail: `WebPage` + `Offer` (link do PDP) — **nie** `Product` (to nie produkt, to showcase)

### Internal linking

| Z | Do |
|---|-----|
| Home DemoShowcase | /wykonane |
| Header nav | Wykonane (P1) |
| PDP „Zobacz przykład” | matching showcase slug |
| Blog artykuły branżowe | related showcase |
| /technologia | showcase wordpress + integracje |
| Footer | Wykonane |

---

## 8. Komponenty (kod — backlog)

| Komponent | Plik |
|-----------|------|
| `WykonaneHub` | `app/wykonane/page.tsx` |
| `WykonaneDetail` | `app/wykonane/[slug]/page.tsx` |
| `ShowcaseCard` | `components/showcase/ShowcaseCard.tsx` |
| `ShowcaseFilterBar` | `components/showcase/ShowcaseFilterBar.tsx` |
| `DemoBrowserMock` | `components/showcase/DemoBrowserMock.tsx` |
| `DemoDashboardMock` | `components/showcase/DemoDashboardMock.tsx` |
| `DemoFlowMock` | `components/showcase/DemoFlowMock.tsx` |
| `DemoSplitMock` | `components/showcase/DemoSplitMock.tsx` |
| Data | `lib/wykonane-content.ts` ← import `wykonane-katalog.json` |

---

## 9. Priorytet implementacji

| P | Co |
|---|-----|
| P0 | JSON katalog 17 itemów + 3 browser mocki (restauracja, dentysta, sklep) |
| P0 | Hub `/wykonane` grid + filtry |
| P1 | Detail pages + breadcrumb |
| P1 | Dashboard mock (opieka + GA4) |
| P1 | Flow mock (InPost) |
| P2 | Split mock (migracja) |
| P2 | Link z PDP „Zobacz przykład układu” |
| P3 | Zamiana mock → case study (gdy klienci) |

---

## 10. Metryki

| Sygnał | Interpretacja |
|--------|---------------|
| Wysoki traffic /wykonane, niski click PDP | Słaby CTA lub cena niewidoczna na detail |
| Filter „opieka” popularny | Segment burned-by-freelancer |
| Detail → PDP CR | Benchmark 8–12% (wyżej niż blog) |

---

*Treści: [content/wykonane-katalog.json](./content/wykonane-katalog.json) · Mocki browser: [content/wykonane-mocki/](./content/wykonane-mocki/)*
