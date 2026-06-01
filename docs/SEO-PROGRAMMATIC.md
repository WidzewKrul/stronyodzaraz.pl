# stronyodzaraz.pl — programmatic SEO (playbook)

**Cel:** łapać long-tail na skali — branża × usługa × pakiet × miasto × modyfikator — bez doorway spam i kanibalizacji.

**Pliki słów:** `KEYWORDS-PLANNER.txt` (1357 linii) · `KEYWORDS-LOCAL.txt` (3807 linii) · `KEYWORDS-CLUSTER.md` (mapowanie)

---

## 1. Model wymiarów (macierz pSEO)

Każda fraza w Google to kombinacja wymiarów. Strona musi mieć **jeden primary URL** per intencja.

```
FRAZA = [MODYFIKATOR*] + USŁUGA + [PLATFORMa] + [BRANŻA/ZAWÓD] + [MIASTO] + [PAKIET]
```

| Wymiar | Przykłady | Skala | Gdzie łapiemy |
|--------|-----------|-------|---------------|
| **Usługa (core)** | strona internetowa, sklep internetowy, landing page, opieka WordPress | ~25 typów | PDP + hub kategorii |
| **Platforma** | WordPress, WooCommerce, Shopify, Shoper | 4 | PDP slug + H1 |
| **Branża / branża B2B** | restauracja, gabinet dentystyczny, kancelaria prawna | 47 w katalogu | PDP `/uslugi/{cat}/{slug}` |
| **Zawód (forma dopełniacza)** | dentysty, fryzjera, prawnika, mechanika | ~15 w planner + mapowanie na branch | PDP + synonim w copy |
| **Pakiet / tier** | Start, Pro, Landing, wizytówka | 3–5 per branch | Osobne PDP lub canonical → primary |
| **Miasto** | Kraków, Warszawa, Gdynia… | 87 w LOCAL | Landing lokalny (faza 2) |
| **Modyfikator intencji** | cena, cennik, szybko, opinie, ile kosztuje | 7 głównych | FAQ, blog, meta, sekcja cennik |

### Szacunkowa skala URL (realistyczna)

| Warstwa | URL | Indeksować |
|---------|-----|------------|
| PDP branża × usługa (curated primary) | ~317 | tak — faza 1 |
| PDP pełny katalog (secondary, redirect/canonical) | ~1814 | canonical → primary |
| Hub kategorii | 8 | tak |
| Blog pillar + cluster | 30–50 (12 mc) | tak |
| Landing **miasto × usługa** (tier A) | 10 miast × 8 usług = 80 | faza 2 |
| Landing **miasto × branża** (tier A, top branże) | 10 × 15 = 150 | faza 3 |
| Query param `?miasto=` bez unique content | ∞ | **nie** (noindex) |

---

## 2. Typy fraz — pattern library

### 2.1 Transakcyjne (T) — kup teraz

| Pattern | Przykład | Primary URL |
|---------|----------|-------------|
| `{usługa} {branża}` | strona wordpress restauracja | PDP |
| `{usługa} dla {branża}` | strona firmowa dla hotel | PDP |
| `strona dla {zawód}` | strona dla dentysty | PDP (branch: gabinet dentystyczny) |
| `{platforma} {branża}` | sklep woocommerce odzież | PDP |
| `{usługa} od zera` | sklep internetowy od zera | hub + blog |
| `zamów {usługa}` | zamów stronę www | homepage / kategoria |
| `pakiet {usługa}` | pakiet strona firmowa | PDP Start/Pro |

### 2.2 Komercyjne (C) — porównuje, szuka ceny

| Pattern | Przykład | Primary URL |
|---------|----------|-------------|
| `{usługa} cena` | strona internetowa cena | PDP + FAQ + tabela cennik |
| `{usługa} cennik` | sklep internetowy cennik | hub kategorii |
| `ile kosztuje {usługa}` | ile kosztuje strona www | blog pillar |
| `{usługa} cena 2026` | strona firmowa cena 2026 | blog (freshness) |
| `{platforma} vs {platforma}` | shopify vs woocommerce | blog |
| `tanie {usługa}` | tanie strony www | PDP wizytówka / Start |
| `{usługa} fixed price` | fixed price strona www | homepage (productized angle) |

### 2.3 Informacyjne (I) — edukacja, później konwersja

| Pattern | Przykład | Primary URL |
|---------|----------|-------------|
| `jak założyć {usługa}` | jak założyć sklep internetowy | blog |
| `{usługa} krok po kroku` | sklep od zera krok po kroku | blog |
| `co musi mieć strona {branża}` | co musi mieć strona restauracji | blog → link PDP |
| `{usługa} wymagania` | strona gabinetu wymagania RODO | blog |
| `checklist {usługa}` | checklist strona www | blog + lead magnet |

### 2.4 Lokalne (L) — miasto / „w pobliżu”

| Pattern | Przykład | Primary URL |
|---------|----------|-------------|
| `{usługa} {miasto}` | strona internetowa Kraków | landing `/l/krakow/strony-internetowe` (faza 2) |
| `{usługa} w {miasto}` | agencja web w Warszawa | j.w. |
| `{zawód} strona {miasto}` | dentysta strona Kraków | landing lub PDP + sekcja lokalna |
| `agencja {miasto}` | agencja interaktywna Gdańsk | landing lokalny |
| `software house {miasto}` | software house Wrocław | landing |
| `{usługa} {miasto} cena` | sklep internetowy Poznań cena | landing + schema Offer |

**Warianty z LOCAL (23 prefixy × 87 miast ≈ 3800 fraz):**

- agencja interaktywna · agencja web · agencja www
- strona internetowa · strona www · strona firmowa · profesjonalna strona www
- tworzenie stron www · tanie strony www · firma od stron www
- sklep internetowy · sklep WooCommerce · Shopify · Shoper
- landing page · WordPress · wdrożenie WordPress · migracja WordPress
- opieka techniczna WordPress · Google Ads · audyt SEO · pozycjonowanie strony
- integracja sklepu · software house

Każdy prefix występuje w dwóch formach: `{prefix} {Miasto}` oraz `{prefix} w {Miasto}` (dla części fraz).

### 2.5 Long-tail złożone (najwyższa konwersja, niski vol.)

| Pattern | Przykład | Gdzie |
|---------|----------|-------|
| `{usługa} {branża} {miasto}` | strona wordpress restauracja Kraków | landing lokalny + link do PDP |
| `{usługa} {branża} cena` | sklep woocommerce odzież cena | PDP |
| `{usługa} dla {zawód} {miasto}` | strona dla fryzjera Wrocław | landing |
| `{platforma} {branża} od zera` | shopify sklep kosmetyczny od zera | PDP |
| `{usługa} {branża} szybko` | landing page hotel szybko | PDP — trust pill „7–14 dni” |
| `{integracja} {branża}` | przelewy24 woocommerce restauracja | PDP integracje |

---

## 3. Mapowanie branża ↔ zawód ↔ slug

Katalog używa **`branch`** (mianownik: restauracja, gabinet dentystyczny). Google często szuka **dopełniacza zawodu** (restauracji, dentysty, fryzjera).

| branch (katalog) | Zawód / synonimy w treści | Przykładowy slug |
|------------------|---------------------------|------------------|
| restauracja | restauracji, gastronomii, lokalu | `strona-wordpress-restauracja` |
| bar | baru, pubu | `strona-firmowa-bar` |
| kawiarnia | kawiarni | `landing-page-kawiarnia` |
| gabinet dentystyczny | dentysty, stomatologa | `strona-wordpress-gabinet-dentystyczny` |
| gabinet lekarski | lekarza, przychodni | `strona-firmowa-gabinet-lekarski` |
| salon fryzjerski | fryzjera, barbera | `strona-wizytowka-salon-fryzjerski` |
| kancelaria prawna | prawnika, adwokata, kancelarii | `strona-wordpress-kancelaria-prawna` |
| hotel | hotelu, pensjonatu | `strona-firmowa-hotel` |
| warsztat samochodowy | mechanika, serwisu samochodowego | `sklep-internetowy-warsztat-samochodowy` |
| siłownia | siłowni, fitness, trenera | `landing-page-silownia` |
| szkoła | szkoły, przedszkola | `strona-firmowa-szkola` |
| firma budowlana | budowlańca, remontów | `strona-firmowa-firma-budowlana` |
| sklep odzieżowy | odzieżowego, butiku | `sklep-woocommerce-sklep-odziezowy` |

**Reguła copy:** w `longDesc`, FAQ i `seoTitle` naturalnie wpleć 2–3 warianty (mianownik + dopełniacz + synonim). Nie twórz osobnego URL per synonim.

**Pełna lista 47 branchy:** restauracja, bar, kawiarnia, pizzeria, food truck, cukiernia, piekarnia, gabinet lekarski, gabinet dentystyczny, gabinet fizjoterapii, gabinet weterynaryjny, kancelaria prawna, salon kosmetyczny, salon fryzjerski, hotel, pensjonat, agroturystyka, sklep odzieżowy, sklep kosmetyczny, sklep spożywczy, sklep meblowy, sklep biżuterii, sklep sportowy, sklep rowerowy, firma produkcyjna, firma budowlana, firma remontowa, firma transportowa, firma IT, firma B2B, agencja marketingowa, szkoła, przedszkole, siłownia, warsztat samochodowy, biuro architektoniczne, biuro rachunkowe, fotograf, elektryk, hydraulik, trener personalny, apteka, galeria sztuki, organizacja pozarządowa, startup.

---

## 4. Architektura URL — decyzja per fraza

```
                    ┌─────────────────┐
                    │  Zapytanie GSC  │
                    └────────┬────────┘
                             │
              ┌──────────────┼──────────────┐
              ▼              ▼              ▼
        ma {miasto}?    ma {branża}?   ogólne / I
              │              │              │
              ▼              ▼              ▼
     tier A miasto?    jest w catalog?   blog pillar
         │    │            │    │
        tak  nie          tak  nie
         │    │            │    │
         ▼    ▼            ▼    ▼
    landing  PDP+      PDP      nowy
    lokalny  wzmianka  primary  wpis blog
             w meta
```

### Faza 1 (teraz) — bez nowych route

| Typ frazy | Implementacja |
|-----------|---------------|
| `{usługa} {branża}` | Istniejące PDP — dopasuj `seoTitle` / H1 |
| `{usługa} cena/cennik` | FAQ schema + widoczna cena na PDP |
| `{zawód} strona` | Synonim w `longDesc` PDP |
| `{miasto}` | **Nie** osobny URL — wzmianka w meta tylko jeśli naturalna (np. „dla firm w całej Polsce”) |
| Porównania / ile kosztuje | Blog |

### Faza 2 (M3–M6) — local hub

Proponowana struktura:

```
/l/{miasto-slug}                          → hub miasta (lista usług + branże)
/l/{miasto-slug}/{kategoria}              → np. /l/krakow/strony-internetowe
/l/{miasto-slug}/{kategoria}/{branch}     → opcjonalnie top 15 branż tier A
```

**Alternatywa lżejsza:** `/uslugi/strony-internetowe/krakow` jako segment URL (bez query string).

**Minimum unique content na landing miasto (anti-doorway):**

- 150–250 słów unikalnego intro per miasto (nie spin)
- Lokalne FAQ (2–3 pytania: „Czy realizujecie zdalnie dla {miasto}?”, „Ile trwa strona dla firmy z {województwo}?”)
- Schema `LocalBusiness` z `areaServed` = miasto (bez fałszywego adresu fizycznego — jesteśmy remote-first)
- Case / testimonial z regionu (jeśli jest)
- Link do 6–12 PDP branżowych + CTA katalog

### Faza 3 (M6+) — pełna macierz miasto × branża

Tylko gdy landing `{miasto}` ma ruch > 100 imp/mc w GSC. Inaczej canonical do PDP + paragraph „Obsługujemy klientów z {miasto}”.

---

## 5. Tier miast (87 w KEYWORDS-LOCAL)

### Tier A — osobny landing (10)

Warszawa, Kraków, Wrocław, Poznań, Gdańsk, Gdynia, Łódź, Katowice, Lublin, Szczecin.

**Priorytet usług na landing:** strony-internetowe → sklepy → wordpress → opieka → reklama.

### Tier B — sekcja w blogu + internal link (20)

Białystok, Bydgoszcz, Częstochowa, Gliwice, Kielce, Olsztytyn, Opole, Radom, Rzeszów, Sosnowiec, Toruń, Tychy, Zabrze, Bielsko-Biała, Ruda Śląska (jeśli dodane), Płock, Elbląg, Wałbrzych, Włocławek, Zielona Góra.

**Format bloga:** „Strona internetowa {miasto} — ile kosztuje w 2026?” (1 artykuł per miasto, nie 23 artykuły per prefix).

### Tier C — tylko PDP + meta (reszta ~57)

Wzmianka „Realizacja zdalna — obsługujemy firmy z {miasto}” w rotowanym bloku na PDP (max 1 miasto per URL, losowane z tier C — **nie** 87 kopii tej samej strony).

---

## 6. Szablony on-page per typ strony

### PDP (`/uslugi/{category}/{slug}`)

```
Title:   {Usługa} dla {branch} — pakiet {tier} | stronyodzaraz.pl — od {cena} zł
H1:      {Usługa} dla {branch}
Meta:    Pakiet {tier} dla {branch}: {scope}. Stała cena {cena} zł, realizacja 7–14 dni. Zamów online.
```

**Long-tail w treści (naturalnie):**

- „Szukasz {synonim zawodu}? Ten pakiet…”
- „Ile kosztuje strona dla {branch}?” → FAQ
- „{Usługa} szybko” → trust pill realizacji
- „{Platforma} {branch}” w H2 sekcji „Technologia”

### Landing miasto (faza 2)

```
Title:   {Usługa} {Miasto} — od {cena_od} zł | stronyodzaraz.pl
H1:      {Usługa} w {Miasto}
Meta:    Strony i sklepy dla firm z {Miasto}. Productized packages, stała cena, realizacja zdalna 7–14 dni.
```

### Blog informacyjny

```
Title:   {Pytanie}? [Przewodnik 2026] | stronyodzaraz.pl
H1:      {Pytanie bez roku}
→ CTA box do PDP / kategorii co 800 słów
→ FAQ schema min. 3 pytania
```

---

## 7. Modyfikatory — jak łapać bez nowych URL

Każdy base keyword w planner ma **7 modyfikatorów** (×8 wariantów):

`cena` · `cennik` · `opinie` · `porównanie` · `szybko` · `dla małej firmy` · `dla startupu`

| Modyfikator | Gdzie w UI | Schema |
|-------------|------------|--------|
| cena / cennik | Hero cena + tabela pakietów + FAQ | `Offer` |
| szybko | Trust bar „7–14 dni” | — |
| dla małej firmy | Sekcja „Dla kogo” | — |
| dla startupu | Wariant copy startup / upsell Pro | — |
| opinie | `ProductReviews` + schema Review (gdy są) | `Review` |
| porównanie | Link do bloga vs / tabela Start vs Pro | — |

**Nie rób** `/uslugi/.../cena` ani `/opinie` — to kanibalizacja.

---

## 8. Internal linking programmatic

| Źródło | Cel | Anchor (rotacja) |
|--------|-----|------------------|
| PDP | Kategoria | „Więcej pakietów {kategoria}” |
| PDP | 3 sibling (ten sam branch) | tytuł usługi |
| PDP | Blog powiązany | „Ile kosztuje strona dla {branch}?” |
| Kategoria | Top 12 PDP imp z GSC | exact match title |
| Landing miasto | PDP branżowe | „Strona WordPress restauracja” |
| Blog | PDP + kategoria | kontekstowy long-tail |
| Homepage | 8 kategorii + 6 money PDP | mixed |

**Automatyzacja (backlog dev):**

- `relatedByBranch(slug, n=3)` — już częściowo na PDP
- `topByCategory(category, n=12)` — sortowanie po `priority` w JSON (pole do dodania)
- Breadcrumbs z `BreadcrumbList` — wdrożone

---

## 9. Kanibalizacja — macierz konfliktów

| Fraza A | Fraza B | Winner |
|---------|---------|--------|
| strona www | strona internetowa | Ten sam PDP — oba synonimy w copy |
| strona restauracja | strona wordpress restauracja | Bardziej specyficzny (wordpress) jeśli osobne PDP; inaczej canonical |
| strona restauracja Kraków | strona restauracja | Landing Kraków → link PDP |
| ile kosztuje strona | strona internetowa cena | Blog vs PDP — różne intencje OK |
| agencja Kraków | stronyodzaraz | Brand vs local — OK |
| tanie strony www Kraków | strona wizytówka | Landing + PDP wizytówka |

**Zasada:** jeśli 2 URL rankują na to samo zapytanie → po 60 dniach merge (canonical / 301 / redirect primary slug).

---

## 10. Curated vs full catalog (1814 → 317)

`lib/catalog-curation.ts` wybiera **1 primary PDP** per `{category}::{branch}`.

| Cel | Działanie |
|-----|-----------|
| Indeksacja | Sitemap: primary 317 + hub 8 + blog |
| Long-tail na secondary slug | 301 → primary **lub** canonical tag |
| GSC query pasuje do secondary | Dodaj frazę do `seoTitle` primary, nie przywracaj URL |

Typy produktów w grupie (priority sort): Start < Pro < Landing < wizytówka < integracja…

---

## 11. Pętla optymalizacji GSC (co tydzień)

1. **Queries** — filtr: impressions > 50, position 8–25 → dopisz do title/H1 PDP
2. **Queries** — impressions > 200, position > 30 → nowy blog lub landing miasto
3. **Pages** — CTR < 1.5%, position < 8 → przepisz title/meta (A/B co 4 tyg.)
4. **Pages** — 2+ URL na 1 query → canonical audit
5. **Indexing** — Coverage błędy, soft 404

Eksport słów z GSC → dopisuj do `KEYWORDS-PLANNER.txt` jeśli brakuje w pliku.

---

## 12. Backlog implementacji (kod)

| Priorytet | Feature | SEO impact |
|-----------|---------|------------|
| P0 | Synonimy zawodu w `product-content.ts` | zawód long-tail |
| P0 | FAQ per branch (generator) | cena / ile kosztuje |
| P1 | Route `/l/[city]/[category]` + JSON `cities.json` | 3800 local fraz tier A |
| P1 | `areaServed` rotator na PDP tier C | miasto bez doorway |
| P2 | Kalkulator wyceny (interactive) | „ile kosztuje” cluster |
| P2 | `priority` w services-catalog dla sitemap | crawl budget |

---

## 13. Przykłady mapowania fraza → URL (quick reference)

| Fraza | URL |
|-------|-----|
| strona wordpress restauracja | `/uslugi/strony-internetowe/strona-wordpress-restauracja` |
| sklep woocommerce odzież | `/uslugi/sklepy-internetowe/sklep-woocommerce-sklep-odziezowy` |
| strona dla dentysty | `/uslugi/strony-internetowe/strona-wordpress-gabinet-dentystyczny` |
| google ads setup restauracja | `/uslugi/reklama-marketing/google-ads-setup-restauracja` |
| opieka wordpress | `/uslugi/opieka-techniczna/opieka-wordpress-start` |
| integracja przelewy24 | `/uslugi/integracje/integracja-przelewy24-sklep-spozywczy` |
| strona internetowa kraków | `/l/krakow/strony-internetowe` (faza 2) |
| ile kosztuje strona www 2026 | `/blog/ile-kosztuje-strona-internetowa-2026` |
| shopify vs woocommerce | `/blog/shopify-vs-woocommerce-polska` |
| agencja interaktywna gdańsk | `/l/gdansk` hub (faza 2) |

---

*Powiązane: SEO-STRATEGIA.md · KEYWORDS-CLUSTER.md · AEO-GEO-LLM.md · KEYWORDS-PLANNER.txt · KEYWORDS-LOCAL.txt*
