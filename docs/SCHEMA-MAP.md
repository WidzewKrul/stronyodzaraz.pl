# Schema.org — mapa per route

**Powiązane:** AEO-GEO-LLM.md · SEO-STACK.md

---

## Mapa

| Route | Schema types | Uwagi |
|-------|--------------|-------|
| `/` | Organization, WebSite, FAQPage, HowTo | home ma JSON-LD ✅ |
| `/uslugi` | CollectionPage, ItemList | |
| `/uslugi/{cat}` | CollectionPage, BreadcrumbList | |
| `/uslugi/{cat}/{slug}` | Product, Offer, FAQPage?, BreadcrumbList | Offer price z katalogu |
| `/blog` | Blog, ItemList | |
| `/blog/{slug}` | BlogPosting, BreadcrumbList | author Organization |
| `/wykonane` | CollectionPage, ItemList | nie Product |
| `/wykonane/{slug}` | WebPage, Offer (link PDP), BreadcrumbList | |
| `/l/{city}` | WebPage, FAQPage?, BreadcrumbList | |
| `/l/{city}/{cat}` | WebPage, BreadcrumbList | |
| `/o-nas` | Organization, AboutPage | |
| `/kontakt` | ContactPage, Organization | |
| `/technologia` | WebPage, FAQPage | |
| `/demo` | WebPage | |
| `/koszyk`, `/sukces` | — | noindex, brak schema |

---

## Implementacja

```
lib/seo/json-ld/
  organization.ts
  product.ts
  breadcrumb.ts
  faq.ts
  blog-posting.ts
```

Opcjonalnie: `schema-dts` dla type safety.

---

## Pola Product/Offer (PDP)

```json
{
  "@type": "Product",
  "name": "{seoTitle}",
  "description": "{metaDescription}",
  "brand": { "@type": "Brand", "name": "stronyodzaraz.pl" },
  "offers": {
    "@type": "Offer",
    "price": "{price}",
    "priceCurrency": "PLN",
    "availability": "https://schema.org/InStock",
    "url": "{canonical}"
  }
}
```

**Bez** Review do pierwszych prawdziwych opinii.

---

## FAQ

- Max 8 FAQ per page — FAQ-MASTER warstwy
- Identyczne FAQ nie duplikować na 317 PDP — 2 specyficzne + 4 generyczne max

---

*Builder meta: content/meta-szablony.json*
