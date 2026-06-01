# Biblioteka szablonów WordPress

**Cel:** realizacja Start w 4–6h przez powtarzalny motyw + child theme.

---

## Stack bazowy

| Element | Wybór |
|---------|-------|
| Motyw parent | **Astra** lub **GeneratePress** (lightweight, CWV) |
| Page builder | **Gutenberg native** — unikaj Elementor (wolne) |
| Formularz | WPForms Lite / Fluent Forms free |
| SEO | Rank Math free |
| Cache | LiteSpeed Cache (jeśli hosting LS) lub WP Super Cache |
| Security | Wordfence free + limit login |
| Backup | UpdraftPlus → S3 (WaaS) |

---

## Child themes per branża

| Branża | Preset | Kolory default |
|--------|--------|----------------|
| restauracja | `so-restauracja` | amber #ea580c |
| dentysta | `so-dentysta` | sky #0284c7 |
| gabinet / usługi | `so-uslugi` | indigo #4f46e5 |
| prawo / B2B | `so-b2b` | slate #1e293b |
| sklep moda | `so-sklep-moda` | violet #7c3aed |
| sklep spożywczy | `so-sklep-food` | green #16a34a |
| warsztat / lokal | `so-lokal` | zinc #52525b |
| hotel | `so-hotel` | emerald #059669 |

**Repo wewnętrzne:** `wp-themes/stronyodzaraz-{branch}/` — backlog git submodule.

---

## Proces customizacji (1 projekt)

1. Clone child preset
2. Brief: logo, kolory → CSS variables
3. Import demo content JSON (strony placeholder)
4. Podmiana tekstów z briefu
5. QA mobile

**Czas:** Landing 3h · Start 5h · Pro 10h

---

## WooCommerce preset

- Motyw: Astra + Woo
- Płatności: P24 plugin
- Wysyłka: InPost official
- Strony: regulamin template link gotowyregulamin.pl cross-sell

---

## Zakazane

- nulled plugins
- Elementor Pro bez licencji klienta
- 40+ wtyczek

---

*SOP: PROCES-REALIZACJI-SOP.md · Demo: wykonane-mocki.json*
