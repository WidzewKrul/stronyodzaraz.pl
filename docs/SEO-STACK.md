# stronyodzaraz.pl — stack SEO i plan techniczny

**Zasada:** najpierw kompletna dokumentacja → potem kod w jednym sprincie. Ten plik odpowiada na: *co pod SEO, jakie biblioteki, co zostawić natywnie w Next.js*.

**Powiązane:** SEO-STRATEGIA.md · SEO-PROGRAMMATIC.md · KEYWORDS-CLUSTER.md · AEO-GEO-LLM.md

---

## 1. Warstwy SEO (co musi działać)

```
┌─────────────────────────────────────────────────────────┐
│  AEO / LLM     llms.txt, FAQ schema, jawne ceny         │
├─────────────────────────────────────────────────────────┤
│  pSEO          317+ PDP, katalog, synonimy branż/zawód  │
├─────────────────────────────────────────────────────────┤
│  Local         tier A/B/C miast (faza 2+)               │
├─────────────────────────────────────────────────────────┤
│  On-page       title, meta, H1, internal links          │
├─────────────────────────────────────────────────────────┤
│  Technical     sitemap, robots, canonical, CWV, HTTPS   │
├─────────────────────────────────────────────────────────┤
│  Ops           GSC, IndexNow, keyword loop, monitoring    │
└─────────────────────────────────────────────────────────┘
```

Każda warstwa ma **osobny doc** — nie mieszaj strategii z implementacją.

| Warstwa | Dokument | Kod dziś |
|---------|----------|----------|
| Strategia 12 mc | SEO-STRATEGIA.md | — |
| Macierz fraz / URL | SEO-PROGRAMMATIC.md | — |
| Klastry → slug | KEYWORDS-CLUSTER.md | `lib/product-seo.ts` |
| Schema + AI | AEO-GEO-LLM.md | `layout.tsx`, PDP scripts |
| Stack (ten plik) | SEO-ROADMAP.md | fazy implementacji |
| Słowa (surowe) | KEYWORDS-PLANNER.txt, KEYWORDS-LOCAL.txt | `scripts/marketing/keywords.ts` |

---

## 2. Audit: co już jest w projekcie

### Next.js native (zostawiamy — to fundament)

| Feature | Plik | Status |
|---------|------|--------|
| Metadata API | `app/layout.tsx`, `generateMetadata` na stronach | OK |
| Sitemap | `app/sitemap.ts` | OK — ale flat, bez indexów |
| Robots | `app/robots.ts` | OK — brak noindex filtrów |
| OG image | `app/opengraph-image.tsx` | OK — edge, indigo |
| Favicon | `app/icon.tsx`, `apple-icon.tsx` | OK |
| JSON-LD | inline `<script>` na layout / PDP / home | OK — do refaktoru opcjonalnie |

### Własny kod SEO (core pSEO)

| Moduł | Rola |
|-------|------|
| `lib/product-seo.ts` | title, shortDesc, truncate |
| `lib/complete-kit.ts` | szablony unified title/desc per vertical |
| `lib/catalog-curation.ts` | 1814 → 317 primary PDP |
| `lib/product-content.ts` | longDesc, FAQ, process — anty thin content |
| `lib/uslugi.ts` | load catalog, categories |
| `docs/services-catalog.json` | źródło prawdy slugów |

### Skrypty ops (już w repo)

| Skrypt | Co robi | Uwaga |
|--------|---------|-------|
| `npm run mkt:keywords` | CSV z Keyword Planner → JSON plan | **Do update:** klasyfikacja intent nadal z HACCP/PUP — przepisać na web |
| `npm run mkt:sitemap` | Bing ping + IndexNow batch | GSC wymaga osobnego skryptu (patrz §5) |
| `npm run mkt:blog` | generowanie blogów | OK |

### Zainstalowane, **nieużywane**

| Pakiet | Verdict |
|--------|---------|
| `polskie-miejscowosci` | **Nie używać na pSEO** — 90k+ miejscowości (wsie). Na local SEO wystarczy **curated lista 87 miast** z KEYWORDS-LOCAL. Pakiet można usunąć albo zostawić tylko do lookup województwa. |

---

## 3. Biblioteki npm — co tak, co nie

### ✅ Rekomendowane (dodać przed fazą 2)

| Pakiet | Po co | Priorytet |
|--------|-------|-----------|
| **`schema-dts`** | Typy TypeScript dla JSON-LD (Product, FAQPage, LocalBusiness) — zero runtime, mniej błędów w schema | P1 |
| **`@sindresorhus/slugify`** | Slug miasta: `Kraków` → `krakow`, `Bielsko-Biała` → `bielsko-biala` | P1 (local routes) |

### ⚠️ Opcjonalne (rozważ, nie must-have)

| Pakiet | Po co | Kiedy |
|--------|-------|-------|
| **`next-sitemap`** | Sitemap **index** + chunki po 50k URL | Gdy local > 500 URL **lub** pełny katalog 1814 indeksowany naraz |
| **`react-schemaorg`** | Deklaratywny JSON-LD w JSX | Tylko jeśli refaktorujesz 10+ miejsc ze script — inaczej overkill |
| **`googleapis`** | GSC API: submit sitemap, export queries | Skrypt `mkt:gsc` — ops, nie runtime strony |

### ❌ Nie instaluj (duplikat / legacy App Router)

| Pakiet | Dlaczego nie |
|--------|--------------|
| **`next-seo`** | Zbudowany pod Pages Router (`DefaultSeo`, `NextSeo`). W App Router masz `metadata` / `generateMetadata` — duplikacja i konflikty. |
| **`next-seo-pro`** / **`@meta-seo/*`** | To samo — wrapper na co Next robi natywnie. |
| **`gatsby-plugin-sitemap`** itd. | Inny stack. |
| **`react-helmet`** | Przed App Router — deprecated pattern. |
| **`nextjs-google-analytics`** | Masz własny `Analytics.tsx` + Consent — wystarczy gtag snippet. |
| **CMS (Contentful, Sanity) na pSEO** | 317+ PDP z JSON + generator copy — CMS spowolni i skomplikuje. Blog może być MDX w repo. |
| **`polskie-miejscowosci` na masowe URL** | Doorway risk — 90k wsi bez unique content. |

### Zostaje bez nowych libów

| Obszar | Rozwiązanie |
|--------|-------------|
| Title / meta | `generateMetadata` + `lib/product-seo.ts` |
| Canonical | `alternates.canonical` w metadata |
| OG images | `next/og` ImageResponse |
| Sitemap < 5000 URL | natywny `app/sitemap.ts` |
| Walidacja danych SEO | **Zod** (już masz) — schematy dla `cities-tier.json`, `services-catalog` |
| Synonimy zawodu | własny `docs/seo/synonyms-branch.json` + generator copy |

---

## 4. Narzędzia zewnętrzne (poza npm)

| Narzędzie | Rola | Koszt |
|-----------|------|-------|
| **Google Search Console** | indeksacja, queries, CTR loop | free |
| **IndexNow** (Bing/Yandex) | szybka indeksacja nowych URL | free — już w `mkt:sitemap` |
| **Google Rich Results Test** | walidacja schema | free |
| **PageSpeed Insights / CrUX** | CWV | free |
| **Cloudflare** (opcjonalnie) | CDN, cache, early hints | free tier |
| **Senuto / Ahrefs / Semstorm** | pozycje, konkurencja PL | płatne — jedno wystarczy |
| **Keyword Planner** | export CSV → `mkt:keywords` | free (konto Ads) |
| **Screaming Frog** | crawl staging przed launch | free do 500 URL |

**Nie potrzebujesz** dedykowanej „SEO platformy” w kodzie — GSC + własne skrypty wystarczą na skalę 2–5k URL.

---

## 5. Architektura docelowa (spec — bez implementacji)

Po dopracowaniu docs, kod pojawi się w tej strukturze:

```
lib/seo/
  metadata.ts          # buildMetadata({ type, slug, city? }) — jeden entry point
  json-ld/
    organization.ts
    product.ts
    faq.ts
    breadcrumb.ts
    local-business.ts  # faza 2 — areaServed per miasto
  templates/
    pdp-title.ts
    pdp-description.ts
    local-title.ts     # faza 2
    local-intro.ts     # unikalne intro per miasto (warianty z JSON)
  synonyms.ts          # branch ↔ zawód ↔ dopełniacz
  cities.ts            # load docs/seo/cities-tier.json
  canonical.ts         # reguły canonical / noindex

docs/seo/
  cities-tier.json     # tier A/B/C — slug, nazwa, województwo
  synonyms-branch.json # mapowanie zawód → branch
  local-templates.json # warianty akapitów (rotacja, nie spin)
  url-decision-tree.md # skrót z SEO-PROGRAMMATIC §4

app/
  sitemap.ts           # → rozbicie na sitemap index gdy > 5000
  robots.ts            # + disallow ?q= ?cat= jeśli bez canonical
  l/[city]/page.tsx    # faza 2
  l/[city]/[category]/page.tsx
```

**Jeden entry point** `buildMetadata()` — żeby nie rozjechały się title na 36 plikach page.tsx.

---

## 6. Schema.org — strategia

| Typ | Gdzie | Lib |
|-----|-------|-----|
| Organization + WebSite + SearchAction | homepage layout | ręczny JSON → potem `schema-dts` |
| Product + Offer | PDP | już jest — dodać `priceValidUntil`, `url` |
| FAQPage | PDP, home, kategoria | już jest |
| BreadcrumbList | kategoria, PDP | już jest |
| BlogPosting | blog | dodać na `/blog/[slug]` |
| LocalBusiness / Service | landing `/l/{city}` | faza 2 — **bez fake address**; `areaServed` + `serviceType` |

**Nie pakuj** w `@graph` wszystkiego na każdej stronie — tylko relevant types (Google guidelines).

Walidacja przed launch: Rich Results Test na 5 URL (home, kategoria, PDP, blog, kontakt).

---

## 7. Sitemap — skala w czasie

| Faza | URL count | Rozwiązanie |
|------|-----------|-------------|
| Launch | ~350 (317 PDP + hub + static + blog) | `app/sitemap.ts` flat — OK |
| + Local tier A | +80 | nadal flat |
| + Local tier A×branża top | +150 | flat (~580 total) |
| Pełny local 87×8 | +696 | rozważ `generateSitemaps()` Next 15+ lub `next-sitemap` |
| Full catalog 1814 | +1500 | **nie indeksuj** secondary — tylko primary 317 |

**Reguła:** sitemap = tylko URL które **chcesz** w indeksie. Reszta canonical → primary.

Opcjonalnie: pole `seoIndex: boolean` w `services-catalog.json` per slug.

---

## 8. Robots i parametry URL

| URL | robots |
|-----|--------|
| `/`, `/uslugi`, `/uslugi/{cat}`, PDP | index |
| `/blog/*` | index |
| `/l/*` (faza 2) | index |
| `/koszyk`, `/sukces`, `/api/*` | noindex / disallow |
| `/uslugi?q=` | **noindex** + canonical `/uslugi` |
| `/uslugi?cat=` | index OK jeśli unikalna treść; inaczej canonical |
| `/uslugi?page=2+` | index OK z paginacją (rel next/prev opcjonalnie) |

Do dopisania w `robots.ts` / metadata filtrów — **spec w SEO-PROGRAMMATIC §4**.

---

## 9. Dane referencyjne (`docs/seo/`)

Pliki JSON = kontrakt przed kodem. Patrz:

- `docs/seo/README.md` — opis folderu
- `docs/seo/cities-tier.json` — 87 miast z tierem
- `docs/seo/synonyms-branch.json` — zawód ↔ branch

Generator copy **czyta JSON**, nie hardcode w TS — łatwa edycja bez deploy logiki.

---

## 10. Co poprawić w istniejących skryptach (przed kodem stron)

| Plik | Problem | Doc fix |
|------|---------|---------|
| `scripts/marketing/keywords.ts` | `classifyIntent()` — segmenty PUP/ARiMR/HACCP | Przepisać reguły na web (strona/sklep/local/cena) — opis w SEO-ROADMAP fazie 0 |
| `app/sitemap.ts` | wszystkie PDP equal priority 0.6 | priority z `cities-tier` / GSC — spec poniżej |
| `keywords.ts` output | `marketing/queue/seo/` | udokumentować flow CSV → plan → blog queue |

---

## 11. CWV a SEO (techniczne rankingi)

Bez dodatkowych libów:

- `next/image` + WebP (już)
- font `display: swap` (sprawdź layout)
- static/ISR na PDP — `revalidate = 86400` (już na slug page)
- unikaj ciężkich client components na above-fold
- standalone deploy + opcjonalnie Cloudflare cache HTML

Cel z SEO-STRATEGIA: LCP < 2.5s — to wpływa na crawl i ranking.

---

## 12. Checklist: docs complete przed kodem

- [x] SEO-STRATEGIA.md — strategia 12 mc
- [x] SEO-PROGRAMMATIC.md — macierz fraz
- [x] KEYWORDS-CLUSTER.md — klastry
- [x] SEO-STACK.md — ten plik
- [ ] SEO-ROADMAP.md — fazy implementacji z zależnościami
- [ ] docs/seo/cities-tier.json
- [ ] docs/seo/synonyms-branch.json
- [ ] docs/seo/local-templates.json (warianty intro)
- [ ] Przepisać opis `mkt:keywords` intent rules (w ROADMAP)
- [ ] AEO-GEO-LLM.md — sync z aktualnymi cenami

Gdy wszystkie checkboxy ✅ → jeden sprint kodu: `lib/seo/*` + ewentualnie `/l/[city]`.

---

*Ostatnia aktualizacja: maj 2026*
