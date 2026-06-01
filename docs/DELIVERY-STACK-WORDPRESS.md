# Delivery stack — WordPress (presety, build, patterns)

**Warstwa:** szablony stron/sklepów, automatyczny build, import treści.

---

## 1. Fundament motywu

| Element | Wybór | Wersja docelowa | Uzasadnienie |
|---------|-------|-----------------|--------------|
| Parent theme | **Astra** lub **GeneratePress** | latest stable | lightweight, CWV, Woo ready |
| Builder | **Gutenberg native** | WP 6.7+ | brak Elementor — [SZABLONY-WP-BIBLIOTEKA](./SZABLONY-WP-BIBLIOTEKA.md) |
| Child themes | `so-{branch}` | 8–12 szt. | mapowanie → `wykonane-mocki.json` |
| WooCommerce | tylko preset sklep | WC 9.x | P24 + InPost plugins pinned |

### Struktura child theme

```
theme/so-restauracja/
  style.css              # Template: astra
  functions.php          # enqueue, theme supports
  theme.json             # colors, typography (FSE partial)
  patterns/              # auto-register block patterns
    hero-restauracja.php
    menu-grid.php
    contact-cta.php
  templates/             # opcjonalnie FSE HTML templates
  assets/
    logo-placeholder.svg
```

**Rejestracja patterns:** folder `/patterns/` — auto-register WP 6.0+ ([Theme Handbook](https://developer.wordpress.org/themes/patterns/registering-patterns/)).

---

## 2. WordPress Playground Blueprints

**Rola:** definicja presetu w JSON — dev lokalny, dokumentacja, przyszły import do build script.

Schema: `https://playground.wordpress.net/blueprint-schema.json`

### Przykład `blueprint.json` — landing restauracja

```json
{
  "$schema": "https://playground.wordpress.net/blueprint-schema.json",
  "preferredVersions": { "php": "8.3", "wp": "latest" },
  "features": { "networking": true },
  "steps": [
    { "step": "login", "username": "admin", "password": "password" },
    {
      "step": "installTheme",
      "themeZipFile": {
        "resource": "url",
        "url": "https://github.com/stronyodzaraz/templates/releases/download/v1/so-restauracja.zip"
      },
      "options": { "activate": true }
    },
    {
      "step": "installPlugin",
      "pluginZipFile": { "resource": "wordpress.org/plugins", "slug": "fluentform" },
      "options": { "activate": true }
    },
    {
      "step": "installPlugin",
      "pluginZipFile": { "resource": "wordpress.org/plugins", "slug": "seo-by-rank-math" },
      "options": { "activate": true }
    },
    {
      "step": "setSiteOptions",
      "options": {
        "blogname": "{{SITE_NAME}}",
        "blogdescription": "{{TAGLINE}}",
        "timezone_string": "Europe/Warsaw",
        "WPLANG": "pl_PL"
      }
    },
    {
      "step": "runPHP",
      "code": "<?php require '/wordpress/wp-load.php'; /* apply SiteSpec pages */ ?>"
    }
  ]
}
```

**Dev lokalny:**

```bash
npx @wp-playground/cli start --blueprint=templates/wordpress/landing/restauracja/blueprint.json
# lub WPSmith: wpsmith new --blueprint=...
```

**Prod:** blueprint → transpiler → sekwencja WP-CLI (nie WASM SQLite).

Ref: [WPSmith](https://github.com/juanmaguitar/wpsmith), [Playground docs](https://developer.wordpress.com/docs/guides/how-to-create-custom-blueprints/).

---

## 3. WP-CLI — komendy build pipeline

### Provision nowej instalacji (kontener per klient)

```bash
# env: WP_URL, DB_NAME, DB_USER, DB_PASS
wp core download --locale=pl_PL
wp config create --dbname="$DB_NAME" --dbuser="$DB_USER" --dbpass="$DB_PASS" --dbhost=db
wp core install --url="$WP_URL" --title="Temp" --admin_user=admin --admin_password="$ADMIN_PASS" --admin_email=ops@bblikh.pl --skip-email
wp theme install astra --activate
wp theme install /templates/so-restauracja.zip --activate
wp plugin install fluentform seo-by-rank-math litespeed-cache wordfence --activate
wp language core install pl_PL --activate
```

### Multisite — nowy tenant

```bash
wp site create --slug="$ORDER_SLUG" --title="$SITE_NAME" --email="$CLIENT_EMAIL"
wp --url="${ORDER_SLUG}.waas.stronyodzaraz.pl theme activate so-restauracja
```

### Import treści z SiteSpec

```bash
# pages.json → wp post create
wp post create --post_type=page --post_title='Strona główna' --post_status=publish \
  --post_content="$(node scripts/render-blocks.js --page=home --spec=spec.json)"

# menu
wp menu create Primary
wp menu item add-custom Primary "$HOME_URL" "Strona główna"
wp menu location assign Primary primary
```

### Block patterns export/import

```bash
wp block pattern list --format=json > patterns-export.json
wp block pattern get so-restauracja/hero --format=json
wp block synced-pattern create --title="Hero {{brand}}" --content='<!-- wp:group -->...'
```

Package: [wp-cli/block-command](https://github.com/wp-cli/block-command) — bundled w WP-CLI 2.10+.

---

## 4. Roots stack (tier Pro — opcjonalnie)

| Tool | GitHub | Kiedy |
|------|--------|-------|
| **Bedrock** | [roots/bedrock](https://github.com/roots/bedrock) | Composer plugins, .env, git deploy |
| **Trellis** | [roots/trellis](https://github.com/roots/trellis) | Ansible, zero-downtime, LE SSL |
| **Sage** | [roots/sage](https://github.com/roots/sage) | custom theme od zera (Pro only) |

**Productized Landing:** **nie** Bedrock — za ciężkie. Child theme + patterns wystarczy.

**CI deploy Trellis:**

```yaml
# .github/workflows/deploy-client.yml
- uses: roots/setup-trellis-cli@v1
- run: trellis deploy production -e production
```

Ref: [Trellis docs](https://roots.io/trellis/docs/installation/), aktywny development 2026 (v1.30).

---

## 5. Wtyczki — pinned lista (wszystkie presety)

| Plugin | Landing | Start | Sklep | Rola |
|--------|---------|-------|-------|------|
| Fluent Forms | ✓ | ✓ | ✓ | formularz |
| Rank Math SEO | ✓ | ✓ | ✓ | meta, schema |
| LiteSpeed Cache / WP Super Cache | ✓ | ✓ | ✓ | performance |
| Wordfence | ✓ | ✓ | ✓ | security |
| WooCommerce | — | — | ✓ | sklep |
| Przelewy24 | — | — | ✓ | płatności PL |
| InPost | — | — | ✓ | paczkomaty |
| UpdraftPlus | WaaS | WaaS | WaaS | backup S3 |
| Cookie Notice / Complianz | ✓ | ✓ | ✓ | RODO banner |

**Zakazane:** Elementor, nulled, >15 aktywnych wtyczek.

Wersje pin w `templates/wordpress/shared/composer.json` (Bedrock path) lub `plugins.lock.json`.

---

## 6. Import produktów (sklep preset)

Brief field: `produktyCsv` lub Google Sheet URL.

```bash
# WooCommerce CSV
wp wc product_import ./content/products.csv --user=admin
wp wc tool run regenerate_lookup_tables --user=admin
```

AI normalizuje CSV z briefu → standard WC columns (SKU, Name, Regular price, Categories).

---

## 7. Migracja preset → hosting klienta

| Metoda | Kiedy | Tool |
|--------|-------|------|
| All-in-One WP Migration | one-shot handover | plugin export |
| WP Migrate DB Pro | dev → prod | CLI addon |
| Duplicator | pełny zip | one-click |
| Manual | WaaS wykup | Bedrock deploy + DB dump |

Automat post-DELIVERED: generuj Duplicator package → S3 signed URL w emailu handover.

---

## 8. GitHub repos — watchlist

| Repo | Stars | Użycie |
|------|-------|--------|
| [nezhar/wordpress-docker-compose](https://github.com/nezhar/wordpress-docker-compose) | 1k+ | Docker + wpcli service |
| [wokamoto/distroless-wp](https://github.com/wokamoto/distroless-wp) | | hardened images |
| [wp-cli/block-command](https://github.com/wp-cli/block-command) | | patterns CLI |
| [yojahny55/claude-wp-builder](https://github.com/yojahny55/claude-wp-builder) | | AI theme workflow ref |
| [mvtandas/wp-cli-mcp](https://github.com/mvtandas/wp-cli-mcp) | | MCP dla agentów |
| [InstaWP/iwp-wp-integration](https://github.com/InstaWP/iwp-wp-integration) | | Woo → auto site |

---

## 9. Preset manifest (schema)

```typescript
// packages/site-spec/src/template-manifest.ts
export const TemplateManifest = z.object({
  id: z.string(),                    // wp-landing-restauracja
  branch: z.enum(["restauracja", "dentysta", ...]),
  tiers: z.array(z.enum(["landing", "start", "pro", "sklep-start", "sklep-pro"])),
  parentTheme: z.string(),
  childThemeSlug: z.string(),
  blueprintPath: z.string(),
  wooCommerce: z.boolean().default(false),
  pages: z.array(z.object({ slug: z.string(), pattern: z.string() })),
  aiSlots: z.record(z.string()),     // slot → prompt hint
  demoUrl: z.string().optional(),    // /wykonane link
});
```

Mapowanie `branch` z briefu (`branza` field) → `templateId` via fuzzy match + AI fallback.

---

*Infra: [DELIVERY-STACK-INFRA.md](./DELIVERY-STACK-INFRA.md) · AI: [DELIVERY-STACK-AI-QA.md](./DELIVERY-STACK-AI-QA.md)*
