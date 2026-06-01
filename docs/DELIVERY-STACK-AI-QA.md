# Delivery stack — AI pipeline, QA, fleet management

---

## 1. AI pipeline — SiteSpec

### Flow

```
questionnaireData (JSON z briefu)
  → normalize + validate (Zod)
  → OpenRouter chat completion (system + user prompt)
  → SiteSpec JSON
  → Zod validate output
  → save DB serviceOrders.siteSpec
  → trigger buildEngine
```

### Model routing (masz w `.env.example`)

| Task | Model | Uzasadnienie |
|------|-------|--------------|
| SiteSpec + copy PL | `deepseek/deepseek-v4-flash` | tani, szybki |
| Scope conflict / brief review | `anthropic/claude-sonnet-4` fallback | lepsze reasoning |
| Template picker (branch) | flash | klasyfikacja |

**Koszt orientacyjny:** ~$0.002–0.01 / projekt Landing.

### SiteSpec schema (Zod)

```typescript
export const SiteSpecSchema = z.object({
  version: z.literal("1.0"),
  templateId: z.string(), // wp-landing-restauracja
  brand: z.object({
    name: z.string(),
    tagline: z.string(),
    colors: z.object({
      primary: z.string().regex(/^#[0-9a-fA-F]{6}$/),
      accent: z.string().regex(/^#[0-9a-fA-F]{6}$/),
    }),
  }),
  contact: z.object({
    email: z.string().email(),
    phone: z.string().optional(),
    address: z.string().optional(),
  }),
  pages: z.array(z.object({
    slug: z.string(),
    title: z.string(),
    sections: z.array(z.object({
      id: z.string(),       // hero, about, services, contact
      blocks: z.record(z.union([z.string(), z.array(z.string())])),
    })),
  })),
  seo: z.object({
    title: z.string().max(60),
    description: z.string().max(160),
  }),
  assets: z.object({
    logoUrl: z.string().url().optional(),
    useStockPhotos: z.boolean(),
    stockKeywords: z.array(z.string()).optional(),
  }),
  integrations: z.object({
    ga4: z.boolean().default(true),
    contactFormEmail: z.string().email(),
  }),
});
```

### System prompt (skrót)

```
Jesteś generator SiteSpec dla stronyodzaraz.pl.
Zwracasz WYŁĄCZNIE valid JSON zgodny ze schematem.
Wybierz templateId z listy: [wp-landing-restauracja, wp-landing-dentysta, ...].
Nie wymyślaj templateId spoza listy.
Copy po polsku, ton: COPY-TONE-OF-VOICE.md.
Jeśli brak treści w briefie — useStockPhotos: true, sensowne placeholdery.
Nie generuj HTML, PHP, CSS.
```

### Template picker (deterministyczny + AI)

```typescript
function suggestTemplateId(branza: string, tier: string): string[] {
  const map: Record<string, string> = {
    restauracja: "wp-landing-restauracja",
    gastronomia: "wp-landing-restauracja",
    dentysta: "wp-landing-dentysta",
    stomatolog: "wp-landing-dentysta",
    // ...
  };
  const normalized = branza.toLowerCase();
  for (const [key, id] of Object.entries(map)) {
    if (normalized.includes(key)) return [id];
  }
  return []; // → AI wybiera z pełnej listy
}
```

### Guardrails

| Check | Akcja |
|-------|-------|
| JSON parse fail | retry 2×, potem admin alert |
| templateId unknown | fallback `wp-landing-uslugi` |
| Scope overflow w briefu | flag `scopeReviewRequired` → email scope_clarification |
| PII w prompt log | redact via `lib/logger` redactPII |

---

## 2. Render SiteSpec → Gutenberg blocks

**Nie LLM** — deterministyczny renderer:

```typescript
// lib/site-builder/render-blocks.ts
export function renderHomePage(spec: SiteSpec, template: TemplateManifest): string {
  const hero = template.patterns.hero
    .replace("{{headline}}", escapeHtml(spec.brand.name))
    .replace("{{subline}}", escapeHtml(spec.brand.tagline));
  // ... concat patterns
  return hero + about + contact;
}
```

Patterns stored as HTML comments `<!-- wp:group -->` w `templates/.../patterns/`.

Ref: [claude-wp-builder](https://github.com/yojahny55/claude-wp-builder) — section-by-section approach.

---

## 3. MCP / agent tooling (dev ops)

| Tool | Repo | Użycie |
|------|------|--------|
| **wp-cli-mcp** | [mvtandas/wp-cli-mcp](https://github.com/mvtandas/wp-cli-mcp) | Cursor/Claude → wp commands |
| **WordPress MCP** | Automattic (REST) | content CRUD |
| **MainWP Abilities API** | [docs](https://docs.mainwp.com/api-reference/abilities-api/overview) | 62 abilities WP 6.9+ |

**Dev workflow:** agent z MCP poprawia preset lokalnie, commit do `templates/`.

**Prod:** **nie** MCP live na prod — tylko scripted build.

---

## 4. QA automatyczne

### Warstwa A — Smoke (Playwright)

```typescript
// tests/qa/staging.spec.ts
import { test, expect } from "@playwright/test";

test("staging homepage", async ({ page }) => {
  const url = process.env.QA_STAGING_URL!;
  const res = await page.goto(url);
  expect(res?.status()).toBe(200);
  await expect(page.locator("h1")).toBeVisible();
  await expect(page.locator('form, [type="submit"]')).toBeVisible();
});

test("contact form submits", async ({ page }) => {
  await page.goto(process.env.QA_STAGING_URL! + "/kontakt");
  await page.fill('[name="email"]', "qa@test.local");
  // ...
});
```

Uruchomienie post-build: `QA_STAGING_URL=https://abc123.clients... npx playwright test tests/qa/`

### Warstwa B — Lighthouse (CDP)

```typescript
// scripts/lighthouse-audit.ts — pattern z Unlighthouse
import lighthouse from "lighthouse";
import * as chromeLauncher from "chrome-launcher";

const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });
const result = await lighthouse(url, {
  port: chrome.port,
  onlyCategories: ["performance", "accessibility", "seo"],
});
const perf = result.lhr.categories.performance.score!;
if (perf < 0.7) throw new Error(`Perf ${perf} below threshold`);
```

**Playwright integration:** `--remote-debugging-port=9222` — [Unlighthouse guide](https://unlighthouse.dev/learn-lighthouse/playwright).

**Workers:** `--workers=1` dla Lighthouse (port conflict).

### Warstwa C — Visual regression (opcjonalnie)

- Percy / Chromatic — overkill na start
- Playwright screenshot compare vs baseline per template

### QA report JSON (DB)

```json
{
  "passed": true,
  "checks": [
    { "id": "http_200", "ok": true },
    { "id": "form_exists", "ok": true },
    { "id": "lighthouse_perf", "ok": true, "score": 0.82 },
    { "id": "ssl_valid", "ok": true },
    { "id": "no_lorem", "ok": true }
  ],
  "screenshotPath": "s3://qa/abc123.png"
}
```

Fail → status `QA_FAILED` → admin queue, **nie** mail do klienta.

---

## 5. Lighthouse CI (opcjonalnie w GitHub Actions)

Dla presetów w repo — nie per klient:

```yaml
# .github/workflows/preset-qa.yml
- uses: treosh/lighthouse-ci-action@v12
  with:
    urls: |
      https://preset-restauracja-demo.clients.stronyodzaraz.pl
    configPath: ./lighthouserc.js
```

`lighthouserc.js`:

```javascript
module.exports = {
  ci: {
    assert: {
      assertions: {
        "categories:performance": ["error", { minScore: 0.75 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:seo": ["error", { minScore: 0.9 }],
      },
    },
  },
};
```

Ref: [treosh/lighthouse-ci-action](https://github.com/treosh/lighthouse-ci-action).

---

## 6. Fleet management — MainWP

**Wybrany:** MainWP self-hosted ([mainwp.com](https://mainwp.com/)) — unlimited sites, flat cost, REST API.

### Setup

1. `mainwp.stronyodzaraz.pl` — osobna instalacja WP na Coolify
2. Child plugin na każdym WaaS site (auto-install w build script)
3. API keys → bulk update niedziela 03:00

### API — przykład list sites

```bash
curl -H "Authorization: Bearer $MAINWP_API_KEY" \
  "https://mainwp.stronyodzaraz.pl/wp-json/mainwp/v2/sites"
```

### Abilities API (WP 6.9+)

Discovery: `GET /wp-json/wp-abilities/v1/abilities` — 62 MainWP abilities.

Use case: przyszły agent „update all Fluent Forms sites”.

### Alternatywy

| Tool | Model | Verdict |
|------|-------|---------|
| ManageWP | SaaS $2/site | drogie @ scale |
| WP Umbrella | flat/site | prostsze, mniej API |
| InfiniteWP | self-hosted | mniej aktywny rozwój |

Ref: [DEV.to comparison 2025](https://dev.to/devautomation/mainwp-vs-managewp-vs-custom-scripts-how-i-manage-15-wordpress-sites-in-2025-4n67).

---

## 7. Obserwowalność build pipeline

| Event | Gdzie log |
|-------|-----------|
| SiteSpec generated | Postgres `siteSpec` + structured log |
| Build started/finished | `buildLog` text column |
| QA result | `qaReport` jsonb |
| Email staging sent | Resend dashboard |
| Client approved | `approvedAt` |

**Admin UI (backlog):** `/admin/orders` — lista BUILDING/QA_FAILED z retry button.

---

## 8. npm packages — delivery stack

| Pakiet | Rola | Priorytet |
|--------|------|-----------|
| `zod` | SiteSpec validate | ✅ masz |
| `lighthouse` | QA audit | P1 |
| `@playwright/test` | smoke tests | P1 |
| `chrome-launcher` | lighthouse helper | P1 |
| `bullmq` + `ioredis` | build queue (scale) | P2 |
| `@instawp/cli` | MVP provision | P2 optional |
| `sharp` | resize upload logo | P2 |
| `unzipper` | theme zip extract | P2 |

**Nie dodawaj:** `playwright-lighthouse` (thin wrapper, poorly maintained per Unlighthouse).

---

## 9. Cron endpoints (nowe)

| Endpoint | Trigger | Akcja |
|----------|---------|-------|
| `POST /api/cron/build` | */5 min | orders SPEC_READY → BUILDING |
| `POST /api/cron/qa` | */30 min | STAGING without qaReport → run QA |
| `POST /api/internal/build-callback` | build worker | BUILDING → STAGING/QA_FAILED |

Auth: `CRON_SECRET` / HMAC `BUILD_CALLBACK_SECRET`.

---

## 10. Test plan stacku (przed prod)

| # | Test |
|---|------|
| 1 | Brief testowy → SiteSpec valid JSON |
| 2 | SiteSpec → render blocks → WP post content |
| 3 | build-site.mjs lokalnie → localhost WP |
| 4 | Coolify subdomain + SSL green padlock |
| 5 | Playwright smoke pass |
| 6 | Lighthouse perf >0.75 |
| 7 | Email staging_review auto |
| 8 | MainWP widzi nowy site |

---

*Master: [DELIVERY-STACK-MASTER.md](./DELIVERY-STACK-MASTER.md) · WP: [DELIVERY-STACK-WORDPRESS.md](./DELIVERY-STACK-WORDPRESS.md)*
