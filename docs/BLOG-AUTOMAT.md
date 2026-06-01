# Blog automatyczny — OpenRouter + kolejka + SEO

**Cel:** co tydzień (lub co 3 dni) **nowy artykuł SEO** bez ręcznego pisania. Ty ustawiasz raz: prompt, kolejkę, Coolify job — reszta leci.

**Stack:** OpenRouter (`lib/openrouter.ts`, `scripts/marketing/_lib.ts`) · kolejka JSON · endpoint `/api/cron/blog` · rebuild/ISR · IndexNow

---

## 1. Architektura (docelowa)

```
KEYWORDS-PLANNER.txt / GSC export
        ↓
docs/blog/queue/pending.json     ← tematy z priorytetem
        ↓
Coolify Scheduled Task (co 7 dni)
        ↓ POST /api/cron/blog
OpenRouter (prompt + model)
        ↓
Walidacja Zod (title, slug, excerpt, bodyMd, tags, links)
        ↓
Zapis: content/blog/{slug}.md  LUB  tabela blog_posts
        ↓
IndexNow (1 URL) + opcjonalnie redeploy
        ↓
Sitemap auto (next build / dynamic read)
```

### Faza launch vs automat

| Faza | Co |
|------|-----|
| **Launch** | 10 postów w `lib/blog.ts` (ręcznie napisane / już są) |
| **T+7 dni** | Włącz cron blog + migracja na `content/blog/*.md` |
| **Steady state** | 1–2 posty/tydzień z kolejki, zero ręcznej pracy |

---

## 2. Modele OpenRouter

| Alias | Model | Kiedy |
|-------|-------|-------|
| `fast` | `deepseek/deepseek-v4-flash` | draft artykułu, koszt ~0.01–0.05 PLN/post |
| `quality` | `anthropic/claude-sonnet-4` | rewrite / pillar co miesiąc |
| `research` | `openai/gpt-4o-mini` | outline z keyword data |

**Env:** `OPENROUTER_API_KEY`, `OPENROUTER_MODEL`, `OPENROUTER_MODEL_FALLBACK`

**HTTP-Referer w requestach:** zmień z `biznesnagotowo.pl` na `https://stronyodzaraz.pl` w `_lib.ts` przy implementacji.

---

## 3. System prompt (blog SEO)

Plik: `docs/blog/prompts/system-blog.md`

```markdown
Jesteś redaktorem SEO dla stronyodzaraz.pl — polskiej agencji web B2B (productized packages).

ZASADY:
- Język: polski, profesjonalny, bez hype i bez „ jako AI”
- Długość: 1200–2000 słów markdown
- Struktura: H2/H3, listy, tabela jeśli porównanie
- SEO: naturalnie użyj frazy głównej {primaryKeyword} 3–5×
- Linki wewnętrzne: min. 2 do /uslugi/... lub /uslugi/{cat}/{slug} — podane w {internalLinks}
- CTA: na końcu sekcja „Co dalej” z linkiem do katalogu
- Ceny: zgodne z OFERTA.md (Start 2490, Pro 4990, sklep 5990, Ads 990, opieka 299/mc)
- NIE: obietnice #1 w Google, gwarancja pozycji, treści HACCP/sanepid
- FAQ: 3 pytania na końcu (## FAQ)

OUTPUT: JSON zgodny ze schematem article-output.schema.json
```

---

## 4. Schemat outputu (Zod / JSON)

Plik: `docs/blog/prompts/article-output.schema.json`

```json
{
  "slug": "kebab-case-max-60",
  "title": "max 70 znaków, fraza główna na początku",
  "excerpt": "150-160 znaków meta description",
  "primaryKeyword": "string",
  "tags": ["max 4 tagi"],
  "readMinutes": 8,
  "bodyMd": "pełny markdown artykułu",
  "internalLinks": ["/uslugi/strony-internetowe", "/uslugi/..."],
  "suggestedCategory": "strony-internetowe | sklepy-internetowe | ..."
}
```

---

## 5. Kolejka tematów

Plik: `docs/blog/queue/seed-queue.json` — 40+ tematów na ~6–12 mc.

**Priorytet kolejki:**

1. Money keywords (ile kosztuje, cennik 2026)
2. Porównania (Shopify vs Woo, freelancer vs agencja)
3. Branżowe (strona dla dentysty, sklep kosmetyczny)
4. Techniczne (CWV, migracja 301, integracja P24)
5. Local (strona www Warszawa — jeśli nie ma landing /l/)
6. Long-tail niszowe z KEYWORDS-PLANNER

**Status wpisu:** `pending` → `generating` → `published` → `failed`

---

## 6. Endpoint cron blog

```
POST /api/cron/blog
Authorization: Bearer {CRON_SECRET}
```

**Logika (do implementacji):**

1. Auth `checkCronAuth` (jak process/drip)
2. Weź 1 wpis `pending` z najwyższym `priority`
3. Zbuduj prompt: system + user z keyword + internalLinks z KEYWORDS-CLUSTER
4. `openrouterChat({ model: 'fast', jsonMode: true })`
5. Parse + Zod validate
6. Sprawdź unikalność slug
7. Zapisz markdown + frontmatter
8. IndexNow 1 URL
9. Oznacz queue `published`
10. Return `{ ok, slug, title }`

**Limit:** max 1 post na wywołanie (anti-spam, anti-koszt).

---

## 7. Coolify Scheduled Tasks (nie crontab na serwerze)

Coolify → Application → **Scheduled Tasks**:

| Name | Command / URL | Schedule | Uwagi |
|------|---------------|----------|-------|
| `process-jobs` | `curl -sf -X POST -H "Authorization: Bearer $CRON_SECRET" https://stronyodzaraz.pl/api/cron/process` | `*/10 * * * *` | brief PDF |
| `drip-emails` | `curl -sf -X POST -H "Authorization: Bearer $CRON_SECRET" https://stronyodzaraz.pl/api/cron/drip` | `0 9 * * *` | upsell D+3/D+7 |
| **`blog-generate`** | `curl -sf -X POST -H "Authorization: Bearer $CRON_SECRET" https://stronyodzaraz.pl/api/cron/blog` | `0 6 * * 1` | **poniedziałek 6:00** = 1 post/tydz |
| `blog-generate-2x` | (opcjonalnie) ten sam URL | `0 6 * * 4` | czwartek — jeśli chcesz 2/tydz |

**Alternatywa:** Coolify „Command” type z wget/curl w kontenerze — **nie** klasyczny cron OS.

Po dodaniu posta:
- **Opcja A:** `onDemandRevalidation` / ISR — post widoczny bez full rebuild
- **Opcja B:** webhook Coolify redeploy (cięższe, prostsze mentalnie)

Rekomendacja: **Opcja A** — czytaj `content/blog/*.md` w runtime lub przy build z cache.

---

## 8. CLI ręczny (dev / nadgarstek)

```bash
# Jeden artykuł z keyword (bez czekania na cron)
npm run mkt:blog -- --keyword "ile kosztuje sklep internetowy 2026"

# Z kolejki
npm run mkt:blog -- --from-queue

# Dry-run (prompt bez zapisu)
npm run mkt:blog -- --keyword "..." --dry-run
```

Skrypt `scripts/marketing/blog.ts` — **do utworzenia** wg tego doca (package.json już ma `"mkt:blog"`).

---

## 9. SEO checklist per artykuł

- [ ] Title ≤ 70 znaków, fraza główna
- [ ] Meta excerpt 150–160
- [ ] H1 = title (w template)
- [ ] Min. 2 linki do `/uslugi/...`
- [ ] 1 link do `/kontakt` lub katalogu w CTA
- [ ] BlogPosting schema (author, datePublished, dateModified)
- [ ] Obraz OG — generowany `opengraph-image` dynamic per route lub domyślny
- [ ] IndexNow po publish
- [ ] Tag → hub mapowanie (naprawić HACCP TAG_TO_CATEGORY)

---

## 10. Taktyka tematów (12 mc bez ręcznej pracy)

| Miesiąc | Typ contentu | Szt/tydz |
|---------|--------------|----------|
| 1–2 | Pillary + cennik + porównania platform | 1 |
| 3–4 | Branżowe (47 branchy rotacja) | 1 |
| 5–6 | Integracje techniczne (P24, InPost, GA4) | 1 |
| 7–8 | Local + „strona www {miasto}” (tier B blog) | 1 |
| 9–12 | Long-tail z GSC (export → dopisz do queue) | 1 |

**Co 3 miesiące:** ręcznie (15 min) wrzuć 10 keywordów z GSC do `pending.json` — reszta automat.

---

## 11. Koszty OpenRouter (szacunek)

| Post | Tokeny | Koszt |
|------|--------|-------|
| 1500 słów draft | ~3k out | ~0.02–0.08 USD |
| 52 posty/rok | — | **~3–5 USD/rok** |

Znikomy vs wartość SEO.

---

## 12. Backlog kodu blog

- [ ] `scripts/marketing/blog.ts`
- [ ] `app/api/cron/blog/route.ts`
- [ ] `content/blog/` + loader (zamiast hardcoded array)
- [ ] `docs/blog/queue/seed-queue.json`
- [ ] Napraw `TAG_TO_CATEGORY` w `blog/[slug]/page.tsx`
- [ ] Coolify task `blog-generate`
- [ ] IndexNow hook po publish

---

*Powiązane: COOLIFY-JOBS.md · STRONA-PELNA-MAPA.md · KEYWORDS-CLUSTER.md*
