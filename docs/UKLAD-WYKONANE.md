# /wykonane — układ stron (wireframe)

**Powiązane:** WYKONANE-PORTFOLIO.md · UKLAD-STRON.md

---

## Hub `/wykonane`

```
[Header global]

[HeroBanner compact — variant indigo]
  badge: 17 przykładów · 8 kategorii
  H1: Przykładowe układy stron, sklepów i usług
  sub + disclaimer pill

[ShowcaseFilterBar — sticky top-16 mobile]
  scroll horizontal chips

[Stats strip — 3 liczby]

[ShowcaseGrid — 17 kart]
  ShowcaseCard × 17

[Sekcja Compare — skrót Start vs Pro]
  link: Pełny cennik → /uslugi

[PortfolioOdZaraz — 4 karty]

[FAQ — 4 pyt hubFaq z JSON]

[CTA: Zobacz pakiety i ceny]

[Footer global]
```

---

## Detail `/wykonane/[slug]`

```
[Header]

[Breadcrumb: Wykonane > {kategoria} > {tytuł}]

[Layout 2-col lg]
  LEFT (2/3):
    [Badge tier + kategoria]
    H1: {title}
    p tagline
    [Mock full — variant browser|dashboard|flow|split]

    [Disclaimer amber box]

    H2: Co zawiera ten przykład
    ul scopeDelivered

    H2: Technologie
    [Stack icons row]

    [CompareStartPro — if tier Start|Pro]

    H2: Podobne przykłady
    [3× ShowcaseCard compact]

    FAQ × 2

  RIGHT (1/3 sticky):
    [Card sticky]
      cena od {priceFrom}
      termin {deliveryDays}
      button → PDP
      upsell 1 linia
      trust: gwarancja 30 dni

[Mobile sticky bar — cena + CTA]

[Footer]
```

---

## Nav — gdzie linkować

| Miejsce | Label | Priorytet |
|---------|-------|-----------|
| Header | Wykonane | P1 (obok Blog) |
| Home DemoShowcase | Zobacz wszystkie → /wykonane | P0 |
| Footer kolumna Firma | Wykonane | P1 |
| PDP sidebar | „Zobacz przykład układu” (if showcase exists) | P2 |
| /o-nas | CTA „Zobacz przykładowe układy” | P1 |

---

## /demo — relacja (skrót)

```
/demo
  3 karty (restauracja, dentysta, sklep) — z demo-mockups.json
  CTA duży: Zobacz wszystkie 17 przykładów → /wykonane
  FAQ × 2
```

`/demo` zostaje lekką wersją dla home funnel. `/wykonane` = pełne portfolio.

---

## Sitemap

```
/wykonane          priority 0.85
/wykonane/*        priority 0.75 (17 URL)
/demo              priority 0.7
```

---

*Treści: wykonane-katalog.json*
