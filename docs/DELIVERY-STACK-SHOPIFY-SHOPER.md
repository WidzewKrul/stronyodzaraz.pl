# Delivery stack — Shopify & Shoper

**Kiedy:** pakiet sklep na Shopify/Shoper (nie WooCommerce).  
**Auto level:** **40–50%** — theme settings + produkty CSV; reszta manual/P24 merchant.

---

## Shopify

### Architektura

```
SiteSpec → shopify-theme-settings.json
        → products.csv (Admin import)
        → manual: P24 app, domain connect
Staging: *.myshopify.com (dev store) lub Shopify Partners preview
```

### Theme

| Opcja | Auto | Uwagi |
|-------|------|-------|
| Dawn (free) | ✓ settings JSON | Shopify CLI `theme push` |
| Custom child | repo `templates/shopify/dawn-moda/` | settings_schema overrides |
| Liquid gen AI | ❌ | tylko settings + copy w metafields |

### Shopify CLI pipeline

```bash
shopify theme init --clone-url=https://github.com/Shopify/dawn
# apply settings from spec:
node scripts/shopify-apply-spec.mjs --spec=spec.json --theme-path=./dawn
shopify theme push --store=${DEV_STORE} --theme=123456
```

### Produkty

```bash
# Admin API GraphQL bulk import (backlog)
# MVP: CSV export z SiteSpec → ręczny import Admin
```

GraphQL ref: [Shopify Admin API productsCreate](https://shopify.dev/docs/api/admin-graphql)

### Co NIE auto

- P24 / PayU production credentials klienta
- Custom domain DNS (instrukcja: DNS-KLIENT — backlog)
- Regulamin sklepu klienta (treść po stronie klienta)

### Koszt dev store

Partners account — free development stores.

---

## Shoper

### Architektura

Shoper = hosted SaaS, **brak** pełnego theme CLI jak Shopify.

| Element | Metoda |
|---------|--------|
| Szablon | Wybór z marketplace Shoper + kolory w panelu |
| Produkty | CSV import panel admin |
| Copy | ręcznie / API Shoper REST (plan Premium+) |

### Shoper REST API (jeśli klient Premium)

```
POST /webapi/rest/products
Authorization: Bearer {token}
```

**Auto build:** skrypt generuje CSV + PDF instrukcja „klik po kliku” dla klienta — uczciwy messaging na PDP.

### Blueprint w repo

```
templates/shoper/
  README.md           # checklist manual
  products.csv.tpl    # Mustache z SiteSpec
  panel-screenshots/  # instrukcja PL
```

---

## SiteSpec rozszerzenie (sklep SaaS)

```typescript
platform: z.enum(["wordpress", "shopify", "shoper"]),
shopify: z.object({
  storeHandle: z.string().optional(),
  collections: z.array(z.object({ title: z.string(), products: z.array(...) })),
}).optional(),
```

AI generuje te same `brand`, `pages` (About, Contact) — mapowane na Shopify Pages API.

---

## Verdict productized

| Platforma | Auto staging | Rekomendacja |
|-----------|--------------|--------------|
| WooCommerce | **80%** | default PL sklep |
| Shopify | **50%** | moda, export, klient ma Shopify |
| Shoper | **30%** | tylko gdy klient wymaga Shoper |

**Marketing:** na PDP jasno — „Shopify: setup + szkolenie, import produktów; pełna automatyzacja = Woo”.

---

*WP path: [DELIVERY-STACK-WORDPRESS.md](./DELIVERY-STACK-WORDPRESS.md)*
