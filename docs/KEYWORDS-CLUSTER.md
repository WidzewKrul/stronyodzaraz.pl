# stronyodzaraz.pl — klastry słów kluczowych → kategorie / slugi

Mapowanie intencji wyszukiwania na strukturę URL katalogu (`/uslugi/{category}/{slug}`).

**Legenda intencji:** `T` transakcyjna · `C` komercyjna · `I` informacyjna · `L` lokalna

---

## Kategoria: `strony-internetowe`

| Klaster | Przykładowe frazy | Intencja | URL pattern | Priorytet |
|---------|-------------------|----------|-------------|-----------|
| Strona firmowa ogólna | strona firmowa, strona www dla firmy | T/C | `strona-firmowa-{branch}` | P0 |
| WordPress branżowy | strona wordpress restauracja | T | `strona-wordpress-{branch}` | P0 |
| Landing | landing page, strona one page | T | `landing-page-{branch}` | P0 |
| Wizytówka | strona wizytówka, mała strona www | T | `strona-wizytowka-{branch}` | P1 |
| Cennik / ile kosztuje | ile kosztuje strona internetowa 2026 | I/C | `/blog/ile-kosztuje-strona-internetowa-2026` | P0 |

**Slugi przykładowe:**

- `/uslugi/strony-internetowe/strona-wordpress-restauracja`
- `/uslugi/strony-internetowe/landing-page-gabinet-dentystyczny`

**Branches w katalogu (wybór):** restauracja, bar, kawiarnia, gabinet lekarski, kancelaria prawna, hotel, firma budowlana, szkoła, siłownia…

---

## Kategoria: `sklepy-internetowe`

| Klaster | Przykładowe frazy | Intencja | URL pattern |
|---------|-------------------|----------|-------------|
| Sklep od zera | sklep internetowy od zera, założenie sklepu | T/C | `sklep-internetowy-{branch}` |
| WooCommerce branża | sklep woocommerce odzież | T | `sklep-woocommerce-{branch}` |
| Koszt sklepu | ile kosztuje sklep internetowy | I | blog + hub kategorii |
| Sklep branżowy | sklep online kosmetyki, sklep meblowy | T | branch w slug |

**Blog:** `/blog/sklep-internetowy-od-zera-krok-po-kroku`

---

## Kategoria: `wordpress`

| Klaster | Frazy | URL pattern |
|---------|-------|-------------|
| Wdrożenie WP | wdrożenie wordpress, strona wordpress | `wordpress-wdrozenie-{branch}` |
| Motyw / design | motyw wordpress na zamówienie | `wordpress-motyw-{branch}` |
| Bezpieczeństwo | zabezpieczenie wordpress, wordpress hack | `wordpress-bezpieczenstwo` (ogólne) |

---

## Kategoria: `shopify-shoper`

| Klaster | Frazy | URL pattern |
|---------|-------|-------------|
| Shopify PL | sklep shopify polska, wdrożenie shopify | `shopify-sklep-{branch}` |
| Shoper | sklep shoper, shoper allegro | `shoper-sklep-{branch}` |
| Porównanie | shopify vs woocommerce | `/blog/shopify-vs-woocommerce-polska` |

---

## Kategoria: `reklama-marketing`

| Klaster | Frazy | Cena ref. | URL pattern |
|---------|-------|-----------|-------------|
| Google Ads setup | kampania google ads, google ads dla firm | 990 zł | `google-ads-setup-{branch}` |
| GA4 | google analytics 4 wdrożenie | 490–790 zł | `ga4-setup-{branch}` |
| Meta Ads | facebook ads, instagram ads firma | 990+ zł | `meta-ads-setup-{branch}` |

**Blog:** `/blog/google-ads-dla-firm-lokalnych`

---

## Kategoria: `opieka-techniczna`

| Klaster | Frazy | URL pattern |
|---------|-------|-------------|
| Abonament WP | opieka techniczna wordpress, utrzymanie strony | `opieka-wordpress-{tier}` |
| Backup | backup strony www automatyczny | w pakiecie opieki |
| Aktualizacje | aktualizacje wordpress profesjonalnie | hub + blog |

**Blog:** `/blog/wordpress-opieka-techniczna-po-co`

---

## Kategoria: `integracje`

| Klaster | Frazy | URL pattern |
|---------|-------|-------------|
| Przelewy24 | woocommerce przelewy24, integracja p24 | `integracja-przelewy24-{branch}` |
| InPost | inpost woocommerce paczkomaty | `integracja-inpost-{branch}` |
| Allegro | allegro sklep integracja | `integracja-allegro` |
| BaseLinker | baselinker woocommerce | `integracja-baselinker` |

**Blog:** `/blog/integracja-woocommerce-przelewy24-inpost`

---

## Kategoria: `migracje-naprawy`

| Klaster | Frazy | URL pattern |
|---------|-------|-------------|
| Migracja sklepu | migracja shoper woocommerce | `migracja-sklep-{from}-{to}` |
| SEO migracja | migracja strony bez utraty seo | blog + `migracja-seo` |
| CWV / speed | core web vitals wordpress | `optymalizacja-cwv` |
| Po ataku | naprawa strony po ataku wordpress | `naprawa-wordpress-hack` |

**Blog:** `/blog/migracja-sklepu-bez-utraty-seo`, `/blog/core-web-vitals-wordpress-przyspieszenie`

---

## Mapowanie `service kind` → miniatury (GEMINI)

| Kind (`lib/service-kind.ts`) | Kategoria dominująca | Plik asset |
|------------------------------|---------------------|------------|
| strona | strony-internetowe | `doc-types/strona.webp` |
| sklep | sklepy-internetowe | `doc-types/sklep.webp` |
| wordpress | wordpress | `doc-types/wordpress.webp` |
| opieka | opieka-techniczna | `doc-types/opieka.webp` |
| marketing | reklama-marketing | `doc-types/marketing.webp` |
| integracja | integracje | `doc-types/integracja.webp` |
| migracja | migracje-naprawy | `doc-types/migracja.webp` |
| general | * | `doc-types/general.webp` |

---

## Klastry lokalne (miasto × usługa)

Plik **KEYWORDS-LOCAL.txt** — 3807 linii, format `{usługa} {miasto}` lub `{usługa} w {miasto}`.

**Pełna strategia tierów i URL:** SEO-PROGRAMMATIC.md §5

### 23 prefixy usługowe (×87 miast)

| Prefix | Kategoria docelowa | Landing faza 2 |
|--------|-------------------|----------------|
| strona internetowa, strona www, strona firmowa | strony-internetowe | tak |
| profesjonalna strona www, tworzenie stron www, tanie strony www | strony-internetowe | tak |
| firma od stron www | strony-internetowe | hub miasto |
| landing page | strony-internetowe | tak |
| WordPress, wdrożenie WordPress, migracja WordPress | wordpress | tak |
| opieka techniczna WordPress | opieka-techniczna | tak |
| sklep internetowy, sklep WooCommerce | sklepy-internetowe | tak |
| Shopify, Shoper | shopify-shoper | tak |
| integracja sklepu | integracje | opcjonalnie |
| Google Ads, audyt SEO, pozycjonowanie strony | reklama-marketing / blog | blog + hub |
| agencja interaktywna, agencja web, agencja www, software house | homepage / o-nas | hub miasto |

### Tier miast

| Tier | Miasta | Strategia URL |
|------|--------|---------------|
| **A** (10) | Warszawa, Kraków, Wrocław, Poznań, Gdańsk, Gdynia, Łódź, Katowice, Lublin, Szczecin | `/l/{slug}/{kategoria}` — unique intro 150+ słów |
| **B** (20) | Białystok, Bydgoszcz, Częstochowa, Gliwice, Kielce, Olsztyn, Opole, Radom, Rzeszów, Toruń… | Blog „strona www {miasto}” + link do katalogu |
| **C** (~57) | reszta z LOCAL | Rotowany `areaServed` na PDP — **bez** osobnego URL |

### Miasto + branża (triple long-tail)

| Pattern | Przykład | URL |
|---------|----------|-----|
| `{usługa} {branża} {miasto}` | strona wordpress restauracja kraków | landing `/l/krakow/...` → link PDP |
| `{zawód} {miasto}` | strona dla dentysty warszawa | landing + PDP gabinet dentystyczny |
| `{sklep} {branża} {miasto}` | sklep internetowy odzież poznań | landing + PDP sklep odzieżowy |

**Anti-doorway:** nie generuj 87 × 47 = 4089 URL bez unikalnej treści. Max ~150 landingów lokalnych w roku 1.

---

## Klastry zawód / branża (bez miasta)

Mapowanie **dopełniacz zawodu** → `branch` w katalogu:

| Fraza (planner) | branch | Slug primary |
|-----------------|--------|--------------|
| strona dla restauracji | restauracja | `strona-wordpress-restauracja` |
| strona dla dentysty | gabinet dentystyczny | `strona-wordpress-gabinet-dentystyczny` |
| strona dla fryzjera | salon fryzjerski | `strona-wizytowka-salon-fryzjerski` |
| strona dla gabinetu | gabinet lekarski | `strona-firmowa-gabinet-lekarski` |
| strona dla kancelarii | kancelaria prawna | `strona-wordpress-kancelaria-prawna` |
| strona dla hotelu | hotel | `strona-firmowa-hotel` |
| strona dla siłowni | siłownia | `landing-page-silownia` |
| strona dla szkoły | szkoła | `strona-firmowa-szkola` |

**Rozszerzenie:** każdy z 47 branchy w katalogu powinien mieć w `longDesc` min. 3 formy: mianownik, dopełniacz, synonim branżowy.

---

## Modyfikatory long-tail (×7 per keyword)

Z **KEYWORDS-PLANNER.txt** — każdy base keyword rozwidlany:

| Modyfikator | Intencja | Gdzie łapać |
|-------------|----------|-------------|
| `cena` / `cennik` | C | Cena na PDP + FAQ „Ile kosztuje…” |
| `szybko` | T | Trust „7–14 dni” |
| `dla małej firmy` | C | Sekcja „Dla kogo” |
| `dla startupu` | C | Wariant copy + pakiet Pro |
| `opinie` | C | ProductReviews |
| `porównanie` | I/C | Blog + tabela Start vs Pro |

**Nie twórz** osobnych slugów `/cena` `/opinie`.

---

## Klastry informacyjne → blog (nie katalog)

| Fraza | Artykuł docelowy |
|-------|------------------|
| productized services | `/blog/productized-services-agencja-web` |
| ile kosztuje strona 2026 | `/blog/ile-kosztuje-strona-internetowa-2026` |
| strona dla restauracji co musi mieć | `/blog/strona-www-dla-restauracji-co-musi-miec` |

---

## Reguły cluster merge (SEO ops)

1. GSC: Query z CTR &gt; 3% i pozycja 5–15 → dopisz w `seoTitle` PDP  
2. Query z impressions &gt; 500 i pozycja &gt; 30 → nowy wpis blog  
3. Duplikat intencji na 2 PDP → canonical na tańszy / bardziej specyficzny pakiet  
4. Branża bez zamówień 90 dni → obniż priorytet w sitemap `priority`  

---

*Import słów: KEYWORDS-PLANNER.txt (1357+ linii) · Lokalne: KEYWORDS-LOCAL.txt (3800+ linii) · Playbook: **SEO-PROGRAMMATIC.md***
