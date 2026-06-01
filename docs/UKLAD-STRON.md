# Układ stron — wireframe i kolejność sekcji

**Zasada:** każdy typ strony ma **stały szablon** — użytkownik po 2. wizycie wie gdzie szukać ceny i CTA.

**Design system:** UI-UX-DESIGN-SYSTEM.md · **Copy:** COPY-TONE-OF-VOICE.md

---

## 1. Globalny layout

```
┌─────────────────────────────────────────────┐
│ Header [Logo] [Usługi|O nas|Blog] [Koszyk]  │ sticky
├─────────────────────────────────────────────┤
│                                             │
│              MAIN CONTENT                   │
│                                             │
├─────────────────────────────────────────────┤
│ Footer: kategorie · legal · portfolio · NIP │
└─────────────────────────────────────────────┘
│ ConsentBanner (fixed bottom, 1×)            │
```

**Header rozszerzenie (P1):** link „Kontakt” w nav (obecnie tylko footer).

---

## 2. Homepage `/`

```
[HeroBanner — gradient + H1 + 2 CTA + trust pills + BrowserMockup lg]
[TrustBar — 4 filary]
[PlatformBadges — WP · Woo · Shopify · Shoper · Stripe]     ← NOWE
[Sekcja: Usługi — 8 kafelków CategoryTileArt]               ← jest
[Sekcja: Jak to działa — 3 kroki]                          ← jest
[DemoShowcase — 3 branże + link /demo]                      ← NOWE
[Sekcja: Cennik tabela]                                     ← jest
[Sekcja: Dlaczego productized — 3 kolumny vs agencja]       ← NOWE
[Sekcja: Portfolio *odzaraz* — 4 karty]                     ← NOWE
[Sekcja: Blog teaser — 3 karty]                             ← NOWE
[Sekcja: FAQ — 6–8 pytań]                                   ← jest
[CtaBand — gradient brand „Wybierz pakiet”]                 ← jest
```

**Above the fold (mobile):** H1 + cena od + CTA katalog + 1 trust pill.

---

## 3. Katalog `/uslugi`

```
[HeroBanner compact — H1 + SearchBar]
[Trust strip — 3 punkty jedna linia]
[Layout 2-col lg:]
  [Sidebar: lista kategorii + liczniki]
  [Main: tytuł + liczba wyników + siatka ProductCard + paginacja]
[Sekcja dolna: FAQ ogólne katalogu — 4 pyt]                 ← NOWE opcjonalnie
```

---

## 4. Hub kategorii `/uslugi/{category}`

```
[HeroBanner category — icon + H1 + tagline + breadcrumb]
[Siatka ProductCard — wszystkie pakiety kategorii]
[Sekcja: Jak to działa — process z config]
[Sekcja: Dla kogo — bullet list]
[Sekcja: FAQ accordion — config faq]
[CtaBand — „Zobacz wszystkie pakiety {category}”]
```

---

## 5. PDP `/uslugi/{category}/{slug}`

```
[Gradient hero bg — breadcrumb]
[Grid lg: 2-col]
  [LEFT 60%:]
    - badge kategorii + icon
    - H1 seoTitle
    - tagline + shortDesc
    - trust pills (3)
    - ProductTabs: Opis | Co zawiera | Proces | Dostawa | Dla kogo | FAQ
  [RIGHT 40% sticky:]
    - BriefMockup / mini demo
    - CENA duża
    - AddToCartBox
    - UpsellBox (1 pakiet)                                    ← NOWE
    - microcopy: „Gwarancja 30 dni · Stripe · Faktura VAT”
[ProductReviews]
[Related — 3 ProductCard]
[Sekcja: Artykuł blog powiązany — 1 link]                     ← NOWE
```

**Mobile PDP:** sticky bottom bar „{cena} — Dodaj do koszyka” (backlog P1).

---

## 6. Local `/l/{city}`

```
[HeroBanner — „Strony i sklepy w {City}”]
[Intro paragraph — z local-templates.json rotacja]
[Grid 8 kategorii → /l/{city}/{category}]
[FAQ local 3 pyt — schema]
[Linki: top 6 PDP branżowych]
[CtaBand]
```

---

## 7. Local `/l/{city}/{category}`

```
[HeroBanner compact]
[Intro categoryIntro z JSON]
[Lista 12 PDP tej kategorii — ProductCard]
[FAQ 2 pyt miasto + usługa]
[Link powrotu: inne kategorie w {city}]
```

---

## 8. Blog listing `/blog`

```
[H1: Poradnik — strony, sklepy, WordPress]
[Grid artykułów: obraz placeholder gradient, title, excerpt, date, read time]
[Tag cloud — opcjonalnie P2]
[Sekcja: „Popularne” 3 pinned]
```

---

## 9. Blog artykuł `/blog/{slug}`

```
[Breadcrumb]
[H1 title]
[Meta: data · read time · tagi]
[Prose body — prose-haccp → rename prose-blog]
[CTA box — szablon żółty/br brand „Zobacz pakiet {category}”]
[FAQ w artykule — jeśli wygenerowane]
[Related posts — 3]
[Upsell inline — 1 ProductCard]
```

---

## 10. `/o-nas`

```
[Hero prosty — H1 + misja 1 akapit]
[Sekcja: Productized model — diagram 3 kroków]
[Sekcja: Portfolio *odzaraz* — 4 sklepy]
[Sekcja: Dla kogo pracujemy — ICP bullets]
[Sekcja: Liczby — 317+ pakietów, 8 kategorii, 47 branż]
[Sekcja: Zespół / process — „remote-first, Polska” bez fake zdjęć zespołu]
[CtaBand → katalog]
```

---

## 11. `/technologia` (nowa)

```
[H1: Technologia i hosting]
[Grid 2×2: WordPress | WooCommerce | Shopify | Shoper]
[Sekcja: Bezpieczeństwo — SSL, backup, RODO]
[Sekcja: Hosting i domena — dla klienta]
[Sekcja: Integracje PL — logo P24, InPost, Allegro]
[FAQ techniczne — 8 pytań]
[Link → opieka techniczna PDP]
```

---

## 12. `/demo` (nowa)

```
[H1: Przykładowe układy stron]
[DemoShowcase — 3 duże karty pełnej szerokości]
[Disclaimer: „Ilustracja układu — projekt dopasowujemy do branży”]
[CTA → katalog po branży]
```

---

## 13. `/kontakt`

```
[2-col lg:]
  [Formularz: name, email, phone, projectType, budget, message]
  [Sidebar:]
    - dane kontaktowe
    - czas odpowiedzi 24h
    - FAQ kontakt 3 pyt
    - „Wolisz od razu kupić?” → katalog
```

---

## 14. Koszyk `/koszyk`

```
[Lista pozycji — tytuł, cena, usuń]
[Upsell row — opieka WP checkbox]                             ← NOWE
[Podsumowanie + Stripe checkout button]
[Trust: Stripe, regulamin link, zwroty info]
```

---

## 15. Nowe sekcje globalne (komponenty wielokrotnego użytku)

| Komponent | Używany na |
|-----------|------------|
| `CtaBand` | home, kategoria, local, o-nas, blog koniec |
| `PortfolioOdZaraz` | home, o-nas |
| `PlatformBadges` | home, technologia, footer opcjonalnie |
| `DemoShowcase` | home, /demo |
| `BlogTeaser` | home |
| `CompareStartPro` | PDP strony, blog cennik |
| `ProcessTimeline` | o-nas, kategoria |
| `UpsellBox` | PDP, koszyk |

---

## 16. Kolejność implementacji layoutu

1. Homepage brakujące sekcje (Platform, Demo, Blog teaser, Portfolio)
2. PDP UpsellBox + blog link
3. `/technologia` + `/demo`
4. `/l/*` local
5. Blog CTA box + related
6. Koszyk upsell row
7. Mobile sticky PDP bar

---

*SEO struktura nagłówków: jeden H1 per page, H2 sekcje, H3 w tabs*
