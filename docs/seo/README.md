# docs/seo — dane kontraktowe SEO

JSON w tym folderze to **specyfikacja przed kodem**. Generator stron (`lib/seo/*`) czyta te pliki — edycja copy bez zmiany logiki.

| Plik | Opis |
|------|------|
| `cities-tier.json` | Miasta z KEYWORDS-LOCAL — tier A/B/C, slug, województwo |
| `synonyms-branch.json` | branch (katalog) ↔ formy zawodu / synonimy w copy |
| `local-templates.json` | Warianty akapitów intro na landing `/l/{city}` |

**Nie commituj** surowych CSV z Keyword Planner — tylko wynik `mkt:keywords` w `marketing/queue/seo/`.

Powiązane: SEO-STACK.md · SEO-PROGRAMMATIC.md · SEO-ROADMAP.md
