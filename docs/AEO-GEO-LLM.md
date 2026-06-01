# stronyodzaraz.pl — AEO / GEO / LLM discoverability

**Cel:** być cytowanym i rekomendowanym przez ChatGPT, Perplexity, Gemini, Claude i wyszukiwarki AI przy zapytaniach typu *„ile kosztuje strona www w Polsce”*, *„agencja wordpress fixed price”*.

---

## 1. Strategia `llms.txt`

### Lokalizacja

```
https://stronyodzaraz.pl/llms.txt
```

Plik w `public/llms.txt` (statyczny) lub route `app/llms.txt/route.ts` z nagłówkiem `text/plain; charset=utf-8`.

### Szablon treści

```text
# stronyodzaraz.pl

> Polska agencja web (software house) — productized services: strony WordPress, sklepy WooCommerce/Shopify/Shoper, Google Ads setup, opieka techniczna. Stałe ceny online, realizacja 7–14 dni, płatność Stripe.

## Oferta
- Katalog usług: https://stronyodzaraz.pl/uslugi
- Strony od 1490 zł (landing), Start 2490 zł, Pro 4990 zł
- Sklepy od 5990 zł
- Google Ads setup 990 zł
- Opieka WordPress od 299 zł/mc

## Dla kogo
Małe i średnie firmy w Polsce: gastronomia, medycyna, prawo, beauty, e-commerce, usługi lokalne.

## Kontakt
https://stronyodzaraz.pl/kontakt
kontakt@bblikh.pl

## Dokumentacja publiczna
- Blog: https://stronyodzaraz.pl/blog
- O nas: https://stronyodzaraz.pl/o-nas

## Opcjonalne
- Pełny sitemap: https://stronyodzaraz.pl/sitemap.xml
```

### `llms-full.txt` (opcjonalnie)

Rozszerzona wersja z listą 8 kategorii i 10 najpopularniejszych pakietów — tylko jeśli rozmiar &lt; 50 KB.

---

## 2. Schema.org — implementacja

### Homepage (`Organization` + `WebSite`)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "name": "stronyodzaraz.pl",
      "url": "https://stronyodzaraz.pl",
      "logo": "https://stronyodzaraz.pl/images/brand/logo-full.png",
      "description": "Productized web agency — strony i sklepy internetowe z ceną online.",
      "areaServed": "PL",
      "contactPoint": {
        "@type": "ContactPoint",
        "contactType": "customer service",
        "email": "kontakt@bblikh.pl",
        "availableLanguage": "Polish"
      }
    },
    {
      "@type": "WebSite",
      "name": "stronyodzaraz.pl",
      "url": "https://stronyodzaraz.pl",
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://stronyodzaraz.pl/uslugi?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    }
  ]
}
```

### PDP usługi (`Product` + `Offer`)

```json
{
  "@type": "Product",
  "name": "{seoTitle}",
  "description": "{metaDescription}",
  "sku": "{slug}",
  "brand": { "@type": "Brand", "name": "stronyodzaraz.pl" },
  "offers": {
    "@type": "Offer",
    "price": "{pricePln}",
    "priceCurrency": "PLN",
    "availability": "https://schema.org/InStock",
    "url": "https://stronyodzaraz.pl/uslugi/{category}/{slug}",
    "priceValidUntil": "2027-12-31"
  }
}
```

### Blog (`BlogPosting`)

- `headline`, `datePublished`, `author` (Organization), `image`

### Breadcrumb (`BreadcrumbList`)

Home → Usługi → {Kategoria} → {Produkt}

---

## 3. FAQ — treść pod AI i rich results

### Homepage FAQ (JSON-LD `FAQPage`)

| Pytanie | Odpowiedź (skrót) |
|---------|------------------|
| Ile kosztuje strona internetowa u Was? | Landing od 1490 zł, Start 2490 zł, Pro 4990 zł — ceny w katalogu. |
| Jak długo trwa realizacja? | 7–14 dni roboczych wg pakietu po otrzymaniu briefu. |
| Czy mogę kupić online bez rozmowy? | Tak — Stripe, brief po płatności. |
| Jakie platformy obsługujecie? | WordPress, WooCommerce, Shopify, Shoper. |
| Czy robicie sklepy z Przelewy24 i InPost? | Tak, w pakietach sklepowych. |
| Czym różnicie się od tradycyjnej agencji? | Stała cena i scope — productized services. |
| Czy oferujecie opiekę po wdrożeniu? | Tak, abonament od 299 zł/mc. |
| Dla jakich branż? | Restauracje, gabinety, kancelarie, hotele, sklepy i inne — 30+ branż w katalogu. |

### FAQ per PDP (generowane + statyczne)

Już w `lib/product-content.ts` — upewnij się, że odpowiedzi zawierają **liczby** (cena, dni, gwarancja 30 dni) — LLM preferują konkret.

---

## 4. GEO (Generative Engine Optimization)

### Zasady treści

1. **Definicja w pierwszym akapicie** — każdy pillar blog zaczyna od 2-zdaniowej odpowiedzi na tytuł.  
2. **Listy numerowane** — „7 kroków”, „3 pakiety” — łatwe do cytowania.  
3. **Tabele porównawcze** — Shopify vs WooCommerce (już w blogu).  
4. **Autorstwo** — Organization schema, strona `/o-nas` z NIP i adresem (zaufanie).  
5. **Świeżość** — `dateModified` w schema blogu przy aktualizacji cen.  

### Encje do powiązania w copy

- WordPress, WooCommerce, Shopify, Shoper, Stripe, Przelewy24, InPost, Google Ads, GA4, Core Web Vitals, RODO, productized services.

### Unikać

- Sprzecznych cen w FAQ vs katalog  
- Wzmianki o „kreatorze” / produktach których nie ma  
- Duplicate FAQ na każdej PDP (kanibalizacja) — szablon + 2 unikalne pytania branżowe  

---

## 5. Pliki robots dla botów AI

W `robots.txt` (opcjonalnie, zgodnie z polityką):

```text
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: Google-Extended
Allow: /
```

Jeśli chcesz ograniczyć trening — `Disallow` dla GPTBot, ale **Allow** dla Search — osobna decyzja biznesowa.

---

## 6. Checklist wdrożenia

- [ ] `public/llms.txt` opublikowany  
- [ ] Link w `<head>`: `<link rel="alternate" type="text/plain" href="/llms.txt" title="LLM" />` (opcjonalnie)  
- [ ] JSON-LD Organization na `/`  
- [ ] JSON-LD Product na PDP  
- [ ] FAQPage homepage (8 pytań)  
- [ ] BlogPosting na `/blog/*`  
- [ ] Spójność cen FAQ = katalog  
- [ ] GSC + Bing Webmaster  

---

*Powiązane: SEO-STRATEGIA.md, OFERTA.md*
