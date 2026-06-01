# Delivery stack — master (automatyzacja projektów)

**Cel:** pełna mapa technologii od briefu klienta do stagingu/produkcji — z researchu (GitHub, docs vendorów, community 2025–2026).

**Powiązane:**
- [AUTOMATYZACJA-DELIVERY.md](./AUTOMATYZACJA-DELIVERY.md) — flow biznesowy
- [DELIVERY-STACK-WORDPRESS.md](./DELIVERY-STACK-WORDPRESS.md) — WP, presety, WP-CLI
- [DELIVERY-STACK-INFRA.md](./DELIVERY-STACK-INFRA.md) — Coolify, Docker, SSL
- [DELIVERY-STACK-AI-QA.md](./DELIVERY-STACK-AI-QA.md) — AI SiteSpec, QA, fleet

---

## Rekomendowany stack stronyodzaraz (decyzja)

| Warstwa | Wybór | Alternatywa |
|---------|-------|-------------|
| **Sklep / checkout** | Next.js 16 (repo) | — |
| **Brief + orchestracja** | Postgres + worker (`lib/worker.ts`) | — |
| **AI copy / routing** | OpenRouter (DeepSeek) → SiteSpec JSON | Claude API direct |
| **Presety stron** | WP child themes + Gutenberg patterns (repo `templates/`) | FSE block themes |
| **Build engine** | WP-CLI w Docker (self-hosted) | InstaWP API (szybszy MVP) |
| **Staging URL** | `{orderId}.clients.stronyodzaraz.pl` | InstaWP temp URL |
| **Hosting WaaS** | Hetzner VPS + Coolify + Traefik wildcard | InstaWP managed |
| **SSL wildcard** | Let's Encrypt DNS-01 (Cloudflare API) | HTTP-01 per site (nie skaluje) |
| **Fleet ops** | MainWP self-hosted + własne crony | WP Umbrella ($) |
| **QA gate** | Playwright + Lighthouse (workers=1) | Manual QA only (MVP) |
| **Email** | Resend | — |
| **Płatności** | Stripe | — |

**Filozofia:** self-hosted first (marża WaaS), InstaWP jako **plan B / MVP** jeśli build engine opóźnia launch o >6 tyg.

---

## Architektura docelowa (3 repo / 3 warstwy)

```
┌─────────────────────────────────────────────────────────────┐
│  stronyodzaraz/          Next.js — sklep, brief, webhook    │
│  lib/site-orchestrator/  trigger build, status, emails      │
└──────────────────────────────┬──────────────────────────────┘
                               │ HTTP internal / queue
┌──────────────────────────────▼──────────────────────────────┐
│  stronyodzaraz-templates/    presets, blueprints, themes    │
│  templates/wp/landing/restauracja/                          │
│  blueprints/restauracja.json  (Playground-compatible)       │
└──────────────────────────────┬──────────────────────────────┘
                               │ wp-cli / blueprint steps
┌──────────────────────────────▼──────────────────────────────┐
│  stronyodzaraz-build/        Docker image: php+wp-cli+nginx │
│  Coolify service OR cron worker on VPS                      │
│  *.clients.stronyodzaraz.pl                                 │
└─────────────────────────────────────────────────────────────┘
```

Monorepo na MVP OK — split gdy `templates/` > 500MB (motywy + demo media).

---

## Multisite vs kontener per klient — verdict

| Kryterium | WP Multisite | Docker per klient |
|-----------|--------------|-------------------|
| Koszt RAM przy 50 klientach | **Niższy** (~1 WP) | Wyższy (~50×) |
| Izolacja / security | **Słaba** — jeden fatal error = cała sieć | **Silna** |
| Różne wtyczki per klient | Trudne | Łatwe |
| Offboarding / export | **Bolesny** | `docker export` + DB dump |
| Automatyczny provision | `wp site create` — szybki | `docker compose up` — wolniejszy |
| WaaS productized | OK tier Landing | **Lepsze** tier Sklep/Pro |

**Rekomendacja stronyodzaraz:**

| Tier | Hosting |
|------|---------|
| Landing WaaS 99/mc | **Multisite** subdomain `{slug}.waas.stronyodzaraz.pl` |
| Start/Pro one-shot | Staging multisite → export na hosting klienta |
| Sklep WaaS 249/mc | **Osobny kontener** lub osobny VPS shared |
| Klient własny hosting | Export ZIP + Duplicator / WP Migrate |

Źródła: [WP Umbrella comparison](https://wp-umbrella.com/blog/wordpress-multisite-vs-separate-installs/), [TopSyde multi-tenancy](https://topsyde.com/blog/wordpress-multitenancy-architecture).

---

## Build engine — 3 ścieżki (od najtańszej do najszybszej)

### Ścieżka A — Self-hosted WP-CLI (docelowo)

**Koszt:** ~0 marginal · **Czas implementacji:** 6–10 tyg.

1. Blueprint JSON (Playground schema) opisuje preset
2. Build script tłumaczy blueprint → sekwencja `wp` commands na MySQL
3. Traefik routing na subdomain

GitHub refs:
- [nezhar/wordpress-docker-compose](https://github.com/nezhar/wordpress-docker-compose) — WP-CLI service pattern
- [wp-cli/block-command](https://github.com/wp-cli/block-command) — import/export patterns
- [WordPress Playground blueprint schema](https://wordpress.github.io/wordpress-playground/blueprints)

### Ścieżka B — InstaWP API (MVP / proof)

**Koszt:** ~$0.50–2 / site · **Czas:** 1–2 tyg. integracji

```http
POST https://app.instawp.io/api/v2/sites/template
Authorization: Bearer {token}
{"template_slug": "so-landing-restauracja", "site_name": "{orderId}", "is_reserved": true}
```

Poll `task_id` → URL staging → webhook do stronyodzaraz.

Refs:
- [InstaWP API docs](https://docs.instawp.com/en/article/create-a-site-via-api-fq00b5/)
- [iwp-wp-integration](https://github.com/InstaWP/iwp-wp-integration) — WooCommerce → auto site (wzorzec)

**Minus:** vendor lock, koszt przy skali, migracja na własny VPS.

### Ścieżka C — Bedrock + Trellis (Pro / dev-heavy)

**Kiedy:** custom theme per klient Pro 4990+, nie productized Landing.

- [roots/bedrock](https://github.com/roots/bedrock) — Composer, env, struktura
- [roots/trellis](https://github.com/roots/trellis) — Ansible deploy, zero-downtime

Overkill dla 1490 Landing — użyj child theme + patterns.

---

## Presety — format kontraktu

Każdy preset = **3 pliki**:

```
templates/wordpress/landing/restauracja/
  manifest.json       # id, branch, tier, requiredBriefFields
  blueprint.json      # Playground steps (dev + dokumentacja)
  theme/              # child theme Astra/GeneratePress
  content/
    pages.json        # Gutenberg block markup per page
    menus.json
    options.json      # blogname, blogdescription, theme_mods
```

**AI wypełnia:** `content/pages.json` sloty z SiteSpec — **nie** generuje PHP.

**Import produkcyjny:**

```bash
wp theme activate so-restauracja
wp option update blogname "Restauracja U Kucharza"
wp post create --post_type=page --post_title="Strona główna" --post_content="$(cat content/home.html)"
wp menu create "Primary"
# ... lub: wp import content.xml --authors=skip
```

---

## Orchestracja w Next.js (rozszerzenie worker)

Nowe statusy DB — patrz AUTOMATYZACJA-DELIVERY.md.

```typescript
// lib/site-orchestrator/pipeline.ts (docelowy)
export async function runBuildPipeline(orderId: string) {
  const order = await loadOrder(orderId);
  const spec = await generateSiteSpec(order.questionnaireData, order.toolSlug);
  await db.update(...).set({ siteSpec: spec, status: "BUILDING" });

  const result = await buildEngine.execute({
    templateId: spec.templateId,
    spec,
    targetUrl: `${orderId}.clients.stronyodzaraz.pl`,
  });

  if (result.qa.pass) {
    await sendStagingReviewEmail(...);
    await db.update(...).set({ status: "STAGING", stagingUrl: result.url });
  } else {
    await notifyAdminQaFailed(...);
  }
}
```

Trigger: cron `process` gdy `questionnaireData` complete **i** `siteSpec` null.

---

## Coolify — nowe joby (po build engine)

| Job | Schedule | Endpoint |
|-----|----------|----------|
| `process-pending-jobs` | */10 | istniejący |
| `build-site-queue` | */5 | `POST /api/cron/build` (nowy) |
| `qa-staging-sites` | */30 | `POST /api/cron/qa` |
| `fleet-updates` | 0 3 * * 0 | MainWP bulk update niedziela |

Patrz [COOLIFY-JOBS.md](./COOLIFY-JOBS.md) — dopisać po implementacji.

---

## Koszty infrastruktury (szacunek 2026)

| Skala | VPS | RAM | Klientów WaaS | Koszt/mc |
|-------|-----|-----|---------------|----------|
| MVP | Hetzner CX32 | 8 GB | 5–10 multisite | ~€8 |
| Growth | Hetzner CPX41 | 16 GB | 20–40 | ~€25 |
| Scale | 2× CPX41 + DB | 32 GB | 80+ | ~€60 |

+ Cloudflare Pro (opcjonalnie DNS API) · Resend Pro przy >3k maili.

InstaWP przy 50 site/mc ≈ $25–100+ vs self-hosted €25.

---

## Roadmap implementacji stacku

| Faza | Deliverable | Stack component |
|------|-------------|-----------------|
| **S0** | 1 preset restauracja ręcznie | SZABLONY-WP |
| **S1** | `blueprint.json` + lokalny `wp-now` | Playground |
| **S2** | `build-site.mjs` + Docker compose dev | WP-CLI |
| **S3** | SiteSpec AI + Zod | OpenRouter |
| **S4** | Coolify wildcard `*.clients.` | Traefik DNS-01 |
| **S5** | Worker hook + statusy DB | worker.ts |
| **S6** | Playwright QA gate | DELIVERY-STACK-AI-QA |
| **S7** | MainWP dashboard | fleet |
| **S8** | 12 presetów branżowych | templates/ |

**Alternatywna ścieżka S1–S4:** InstaWP API zamiast S2+S4 — launch auto-staging w 2 tyg., migrate na self-hosted w S5.

---

## Anti-patterns (z researchu)

| Nie rób | Dlaczego |
|---------|----------|
| AI generuje cały motyw PHP | niedeterministyczne, support hell |
| Elementor w presetach | DOM bloat, CWV, licencje |
| Playground SQLite → prod bez migracji | [InstaWP/Kinsta](https://instawp.com/wordpress-playground/) — inny stack |
| 317 presetów | utrzymanie niemożliwe |
| Multisite dla sklepów Woo różnych merchantów | P24 credentials per klient |
| HTTP-01 cert per subdomain | rate limit LE, wolne |

---

## Bibliografia / linki

| Zasób | URL |
|-------|-----|
| WordPress Playground Blueprints | https://developer.wordpress.com/docs/guides/how-to-create-custom-blueprints/ |
| WP-CLI block patterns | https://github.com/wp-cli/block-command |
| Roots Bedrock | https://github.com/roots/bedrock |
| Roots Trellis | https://github.com/roots/trellis |
| InstaWP API | https://docs.instawp.com/en/article/api-overview-c68mai/ |
| InstaWP CLI | https://instawp.com/cli-for-wordpress/ |
| Coolify wildcard SSL | https://coolify.io/docs/knowledge-base/traefik/wildcard-certificates |
| MainWP | https://mainwp.com/ |
| WPSmith (Playground CLI) | https://github.com/juanmaguitar/wpsmith |
| wp-cli-mcp (AI + WP-CLI) | https://github.com/mvtandas/wp-cli-mcp |
| claude-wp-builder | https://github.com/yojahny55/claude-wp-builder |
| Lighthouse + Playwright | https://unlighthouse.dev/learn-lighthouse/playwright |

---

*Ostatnia aktualizacja: 2026-05-31 · research pass 1*
