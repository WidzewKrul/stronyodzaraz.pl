# Internal linking — strategia i automatyzacja

**Cel:** PageRank wewnętrzny + UX ścieżek zakupowych · każda strona min. 3 linki wewnętrzne · money pages (PDP, katalog) max link equity.

**Powiązane:** SEO-PROGRAMMATIC.md · KEYWORDS-CLUSTER.md · BLOG-AUTOMAT.md

---

## 1. Hierarchia link equity

```
                    [Homepage]  priority 1.0
                         │
        ┌────────────────┼────────────────┐
        │                │                │
   [/uslugi hub]   [/blog pillar]   [/l/warszawa]
   priority 0.9     priority 0.7     priority 0.75
        │
   [/uslugi/{cat}]  priority 0.8
        │
   [/uslugi/{cat}/{slug}]  priority 0.6
        │
   [blog long-tail]  priority 0.6
```

**Zasada:** link **w górę** (breadcrumb) + **w bok** (related) + **w dół** (hub → PDP).

---

## 2. Typy linków

| Typ | Anchor | Przykład |
|-----|--------|----------|
| **Nav** | branded / generic | Header: Usługi, Blog |
| **Breadcrumb** | kategoria name | Katalog > Strony > PDP |
| **Contextual** | long-tail partial | „zobacz pakiet WordPress dla restauracji” |
| **CTA box** | action | „Zamów pakiet od 2490 zł” |
| **Related products** | title PDP | 3 karty sibling |
| **Blog → money** | mixed | „[katalog sklepów](/uslugi?cat=sklepy)” |
| **Footer** | generic | 8 kategorii, legal, portfolio |
| **Cross-portfolio** | branded | haccpnajuz.pl |

---

## 3. Reguły anchor text

| Do | Anchor OK | Anchor unikaj |
|----|-----------|---------------|
| PDP | „Strona WordPress restauracja”, „pakiet Start” | „kliknij tutaj”, „więcej” |
| Kategoria | „Strony internetowe”, „Sklepy online” | exact spam „strona www tanio” |
| Blog | tytuł artykułu | „czytaj więcej” solo |
| Local | „Strony internetowe Warszawa” | „Warszawa” solo |

**Rotacja:** 3 warianty anchor na ten sam URL w całej domenie (synonimy).

---

## 4. Mapa linków per typ strony

### Homepage → wychodzące (min.)

| Cel | Anchor przykład |
|-----|-----------------|
| /uslugi | Zobacz pakiety i ceny |
| 8× /uslugi/{cat} | kafelki kategorii |
| /blog | 3 teaser titles |
| /o-nas | O nas |
| /kontakt | (footer) |
| Top 3 PDP money | opcjonalnie sekcja „Popularne” |

### PDP → wychodzące (min.)

| Cel | Ilość |
|-----|-------|
| Hub kategorii | 1 breadcrumb |
| 3 related PDP (ten branch) | 3 |
| 1 blog artykuł powiązany | 1 |
| /uslugi | 1 footer/breadcrumb |
| Upsell PDP | 1 |

### Blog → wychodzące (min.)

| Cel | Ilość |
|-----|-------|
| PDP money | 2 contextual |
| Hub kategoria | 1 |
| /uslugi lub /kontakt | 1 CTA |
| 3 related posts | 3 |

### Local `/l/{city}`

| Cel | Ilość |
|-----|-------|
| 8× /l/{city}/{cat} | 8 |
| 6 top PDP branżowych | 6 |
| /uslugi | 1 |

---

## 5. Automatyzacja (kod)

| Mechanizm | Plik docelowy | Logika |
|-----------|---------------|--------|
| `relatedByBranch(slug, n=3)` | PDP | ten sam branch, inny typ usługi |
| `topByCategory(cat, n=12)` | hub | sort priority / curated |
| `blogRelated(slug, n=3)` | blog | wspólne tagi |
| `blogToPdp(keyword)` | blog generator | map z KEYWORDS-CLUSTER |
| `localToPdp(city, cat, n=12)` | local page | getUslugiByCategory slice |
| Footer `CATEGORY_LINKS` | layout | statyczne 8 |
| Breadcrumb JSON-LD | każda PDP | auto |

### Blog OpenRouter prompt

Wymuszaj w JSON: `internalLinks: ["/uslugi/...", ...]` min 2 — patrz BLOG-AUTOMAT.md.

### PDP longDesc generator

Wpleć 1 link markdown do sibling + 1 do kategorii — `product-content.ts` backlog.

---

## 6. Hub pages jako silosy

Każda z 8 kategorii = **silos tematyczny**:

```
/uslugi/strony-internetowe (hub)
    ├── PDP × N (branch × typ)
    ├── blog tag „strony www”
    └── /l/{city}/strony-internetowe
```

**Linkowanie między silosami:** tylko przez upsell (strona → opieka) lub homepage — nie spam cross-category na każdym PDP.

---

## 7. Linki do portfolio *odzaraz*

| Z | Do | Kiedy |
|---|-----|-------|
| /o-nas | 3 sklepy | zawsze |
| Blog gastronomia | haccpnajuz.pl | contextual 1× |
| Blog sklep | gotowyregulamin.pl | regulamin |
| Footer | wszystkie 4 | sitewide |

`rel="noopener"` na external · nie `nofollow` na portfolio siostrzane (trust transfer).

---

## 8. Kanibalizacja — link hygiene

| Sytuacja | Reguła |
|----------|--------|
| 2 PDP ten sam intent | canonical → primary, link tylko primary |
| Blog vs PDP ta fraza | blog linkuje **do** PDP jako CTA |
| /uslugi?q= | noindex, nie linkuj z contentu |
| Parametry filtrów | canonical /uslugi/{cat} |

---

## 9. Crawl budget — priorytet w sitemap + internal links

**Więcej linków wewnętrznych do:**

1. Top 20 PDP revenue potential (Start/Pro strony, sklepy)
2. 8 hubów kategorii
3. 10 pillar blog
4. 10 local tier A hub

**Mniej linków do:** secondary PDP (canonical only), archiwalne tagi.

---

## 10. Checklist wdrożenia

- [ ] Breadcrumb na kategoria, PDP, blog, local
- [ ] Footer: 8 kategorii + 4 portfolio
- [ ] PDP: related 3 + upsell 1
- [ ] Blog: CTA box + 2 money links w treści
- [ ] Homepage: blog teaser + kategorie
- [ ] Local: 12 PDP links
- [ ] JSON-LD BreadcrumbList everywhere
- [ ] Blog generator waliduje internalLinks

---

## 11. Monitoring (GSC, pasywnie)

Co 3 mc: Export „Links” + „Top linking text” — czy anchor nie over-optimized.

---

*Macierz fraz: SEO-PROGRAMMATIC.md · Klastry: KEYWORDS-CLUSTER.md*
