# stronyodzaraz.pl — strategia SEO

> **Model portfolio:** SEO robimy **raz** przy buildzie (~435 URL), wrzucamy do Google i **nie wracamy**. Kalendarz 12 mc poniżej = kontekst rynkowy, nie plan pracy.  
> **Checklist:** [PROJEKT-KOMPLETNY.md](./PROJEKT-KOMPLETNY.md) · [SCOPE-JEDNORAZOWY.md](./SCOPE-JEDNORAZOWY.md)

**Cel organic (pasywny):** indeks ~435 URL, long-tail z katalogu + local tier A — bez ciągłej optymalizacji.

---

## 1. Architektura pSEO (programmatic SEO)

### Warstwy URL

```
/                           → money page (agregacja + trust)
/uslugi                     → hub katalogu (8 kategorii)
/uslugi/{category}          → hub kategorii + filtry branż
/uslugi/{category}/{slug}   → long-tail: branża × typ usługi × pakiet (~1814 URL)
/blog/{slug}                → topical authority (10+ artykułów, rozbudowa)
/{strony-statyczne}         → kontakt, o-nas, regulamin, polityka
```

### Źródło danych

- `docs/services-catalog.json` — 1814 rekordów (slug, category, branch, priceGrosze)  
- Generowanie meta: `lib/uslugi.ts`, `lib/product-content.ts`  
- Sitemap: dynamiczny z katalogu + blog  

### Szablon tytułu (PDP usługi)

```
{seoTitle} | stronyodzaraz.pl — od {cena} zł, realizacja 7–14 dni
```

Przykład: *„Strona WordPress dla restauracja — pakiet Start | stronyodzaraz.pl — od 2490 zł”*

### Szablon meta description

```
Pakiet {nazwa} dla {branża}: {scope skrót}. Stała cena {cena} zł, płatność online, brief po zakupie. {kategoria}.
```

### Internal linking

**Pełna spec:** [INTERNAL-LINKING.md](./INTERNAL-LINKING.md) — silosy, anchor rotation, automatyzacja `relatedByBranch`, blog `internalLinks`, crawl budget.

Skrót:

| Z | Do | Anchor |
|---|-----|--------|
| Homepage | Top 8 kategorii | „Strony internetowe”, „Sklepy”… |
| Kategoria | 12–24 top PDP tej kategorii | tytuł usługi |
| PDP | Kategoria + 3 sibling (ta sama branch) | „Więcej dla {branża}” |
| Blog | PDP / kategoria | kontekstowy link w treści |
| Footer | /uslugi, /blog, /kontakt | branded + generic |

### Kanibalizacja — zasady

- **Jedna intencja = jeden primary URL** — nie duplikuj „strona www Kraków” na 50 PDP; lokalne → landing `/l/{miasto}` (faza 2), patrz **SEO-PROGRAMMATIC.md §4–5**  
- **noindex** na: koszyk, sukces, parametry filtrów bez wartości (`?sort=`, `?miasto=` bez unique landing)  
- **canonical** na PDP = self; na filtrach kategorii = `/uslugi/{category}` gdy tylko query string  
- **Synonimy** (strona www = strona internetowa, dentysty = gabinet dentystyczny) → ten sam URL, warianty w copy

### Macierz long-tail (skrót)

Pełny playbook: **SEO-PROGRAMMATIC.md**

| Wymiar | Skala | Warstwa URL |
|--------|-------|-------------|
| usługa × branża × pakiet | ~1814 → 317 primary | `/uslugi/{cat}/{slug}` |
| zawód (dopełniacz) | ~15+ synonimów | ten sam PDP + copy |
| miasto | 87 × 23 prefixy ≈ 3800 fraz | landing `/l/{miasto}` (faza 2) |
| modyfikator (cena, szybko…) | ×7 per base keyword | FAQ + blog, nie osobny URL |

---

## 2. Klastry treści (topical map)

| Klastr | Kategoria slug | Vol. szac. | Priorytet |
|--------|----------------|------------|-----------|
| Strony firmowe | strony-internetowe | bardzo wysoki | P0 |
| Sklepy PL | sklepy-internetowe | wysoki | P0 |
| WordPress utrzymanie | wordpress, opieka-techniczna | średni | P1 |
| Shopify vs Woo | shopify-shoper | średni | P1 |
| Marketing setup | reklama-marketing | średni | P1 |
| Integracje PL | integracje | niski–średni | P2 |
| Migracje / CWV | migracje-naprawy | niski | P2 |

Szczegóły mapowania słów → slug: **KEYWORDS-CLUSTER.md**

---

## 3. Kalendarz contentu — 12 miesięcy

### Faza 1: Launch (M1–M2)

| Tydzień | Typ | Temat | Cel SEO |
|---------|-----|-------|---------|
| W1 | Blog pillar | Ile kosztuje strona www 2026 | Money keyword |
| W2 | Blog | Shopify vs WooCommerce PL | Porównanie |
| W3 | Blog | Productized services agencja | Brand + differentiation |
| W4 | On-page | Audyt 8 hubów kategorii | Indeksacja kategorii |
| W5–W8 | pSEO | Indeksacja 1814 PDP (sitemap ping GSC) | Long-tail masowy |

### Faza 2: Authority (M3–M6)

| Miesiąc | 4× artykuły blog (propozycje) |
|---------|-------------------------------|
| M3 | Google Ads lokalne; Opieka WP po co; Strona restauracji; WooCommerce P24 |
| M4 | Migracja SEO 301; Core Web Vitals; Strona gabinetu; Shoper vs Shopify |
| M5 | Sklep od zera krok po kroku; Integracja InPost; Landing pod Ads; RODO cookies |
| M6 | Case study (anonim); Cennik sklep 2026; Freelancer vs agencja; Hosting WP |

### Faza 3: Local + link (M7–M9)

| Miesiąc | Działanie |
|---------|-----------|
| M7 | Landingi **miasto × usługa** tier A (10 miast) — `/l/{miasto}/{kategoria}` |
| M7b | Artykuły blog tier B: „strona www {miasto} 2026” (20 miast) |
| M8 | Digital PR: zestawienie „cennik stron www 2026” (link bait) |
| M9 | Guest post: księgowość / doradztwo dla MŚP |
| M9b | Landing **miasto × top branża** tylko gdy GSC imp > 100/mc |

### Faza 4: Optymalizacja (M10–M12)

| Miesiąc | Działanie |
|---------|-----------|
| M10 | Przepisanie PDP z CTR &lt; 1% (title/meta) |
| M11 | Rozszerzenie FAQ schema (AEO) |
| M12 | Kalkulator wyceny (interactive) — link magnet |

---

## 4. Technical SEO — checklist

### Core

- [ ] `robots.txt` — allow `/`, disallow `/api/`, `/koszyk` opcjonalnie  
- [ ] `sitemap.xml` — dynamic, lastmod z catalog  
- [ ] HTTPS + HSTS na Coolify  
- [ ] Canonical na wszystkich PDP  
- [ ] `hreflang` — tylko `pl` (jednojęzyczny)  

### Performance (ranking factor)

| Metryka | Cel |
|---------|-----|
| LCP | &lt; 2,5 s |
| INP | &lt; 200 ms |
| CLS | &lt; 0,1 |
| TTFB | &lt; 600 ms (CDN/static) |

- Obrazy WebP, `next/image`, lazy below fold  
- Font subset PL, `display: swap`  
- Standalone build na Coolify — cache statycznych z CDN (opcjonalnie Cloudflare)  

### Structured data

- `Organization` + `WebSite` + `SearchAction` na homepage  
- `Product` + `Offer` na PDP (cena, availability)  
- `FAQPage` na PDP i homepage  
- `BreadcrumbList` na kategoria → PDP  
- `BlogPosting` na `/blog/[slug]`  

Szczegóły: **AEO-GEO-LLM.md**

### Indeksacja

1. Google Search Console — property `stronyodzaraz.pl`  
2. Submit sitemap D+1 po deploy  
3. Monitor Coverage — naprawa 404, soft 404  
4. Request indexing top 50 URL (money pages)  

---

## 5. Link building (Polska)

| Taktyka | Realność | Uwagi |
|---------|----------|-------|
| Portfolio / realizacje | wysoka | Case z domenami klientów (za zgodą) |
| Katalogi firm | średnia | Panorama Firm, KRS — NAP spójny |
| Partnerzy księgowi | wysoka | Cross-promo dokumenty + strony |
| Reddit / BHW | niska bez wartości | Tylko autentyczne odpowiedzi — patrz KONKURENCJA-RESEARCH.md |
| Guest posting | średnia | Branżowe blogi MŚP |

---

## 6. KPI i raportowanie

| Raport | Częstotliwość | Narzędzie |
|--------|---------------|-----------|
| Pozycje top 50 kw | tygodniowo | GSC + Senuto/Ahrefs |
| Ruch organic | tygodniowo | GA4 |
| Indeks URL | miesięcznie | GSC Coverage |
| CR organic → checkout | miesięcznie | GA4 funnel |
| Core Web Vitals | miesięcznie | PageSpeed + CrUX |

---

## 7. Ryzyka SEO

| Ryzyko | Mitygacja |
|--------|-----------|
| Thin content na PDP | Unikalny `longDesc`, FAQ, branch-specific copy |
| Doorway local | Nie masować miast bez unique content |
| Manual action AI content | Redakcja pillarów; szablony z wariantami |
| Kanibalizacja hub vs PDP | Jasna hierarchia linków |

---

*Pliki: KEYWORDS-PLANNER.txt, KEYWORDS-LOCAL.txt, KEYWORDS-CLUSTER.md, **SEO-PROGRAMMATIC.md**, **SEO-STACK.md**, **SEO-ROADMAP.md**, `docs/seo/`*
