# build-site.mjs — specyfikacja skryptu

**Cel:** deterministyczny build WP staging z `SiteSpec` + `templateId`.  
**Stack:** [DELIVERY-STACK-WORDPRESS.md](./DELIVERY-STACK-WORDPRESS.md) · [DELIVERY-STACK-INFRA.md](./DELIVERY-STACK-INFRA.md)

---

## CLI

```bash
node scripts/build-site.mjs \
  --order-id=abc123 \
  --spec=./tmp/abc123-spec.json \
  --url=https://abc123.clients.stronyodzaraz.pl \
  --mode=multisite|container \
  [--dry-run]
```

Exit codes: `0` OK · `1` validation · `2` wp-cli fail · `3` QA fail

---

## Pipeline (kroki)

```
1. loadSpec()           → Zod validate SiteSpec
2. loadManifest()       → templates-manifest.json + template files
3. provision()          → multisite OR docker compose up
4. installCore()        → wp core / plugins / theme (idempotent)
5. applyBrand()         → options, theme_mods, CSS vars
6. importPages()        → render blocks → wp post create
7. importMenus()        → wp menu *
8. importMedia()        → logo URL fetch + wp media import (optional)
9. configurePlugins()   → Rank Math, Fluent Forms recipient
10. smokeLocal()        → curl localhost / wp option get
11. writeOutput()       → staging URL, buildLog, qa stub
12. callback()          → POST /api/internal/build-callback
```

---

## Pseudokod

```javascript
#!/usr/bin/env node
import { readFileSync } from "fs";
import { execSync } from "child_process";

const args = parseArgs(process.argv);
const spec = SiteSpecSchema.parse(JSON.parse(readFileSync(args.spec)));
const manifest = loadTemplateManifest(spec.templateId);

async function main() {
  const log = [];
  try {
    log.push(step("provision", () => provisionSite(args)));
    log.push(step("theme", () => runWp(`theme install ${manifest.parentTheme} --activate`)));
    log.push(step("child", () => runWp(`theme install ${manifest.themeZip} --activate`)));
    log.push(step("plugins", () => installPinnedPlugins(manifest.plugins)));
    log.push(step("options", () => applySiteOptions(spec)));
    log.push(step("pages", () => importPages(spec, manifest)));
    log.push(step("menus", () => importMenus(spec, manifest)));
    if (spec.assets.logoUrl) {
      log.push(step("logo", () => importLogo(spec.assets.logoUrl)));
    }
    await callback({ orderId: args.orderId, status: "STAGING", stagingUrl: args.url, buildLog: log });
    process.exit(0);
  } catch (err) {
    await callback({ orderId: args.orderId, status: "BUILD_FAILED", error: String(err), buildLog: log });
    process.exit(2);
  }
}

function runWp(cmd, { url } = {}) {
  const prefix = args.mode === "container"
    ? `docker compose -p wp-${args.orderId} run --rm wpcli`
    : `wp --url=${url ?? args.url}`;
  return execSync(`${prefix} ${cmd}`, { encoding: "utf8", stdio: ["pipe", "pipe", "pipe"] });
}

function importPages(spec, manifest) {
  for (const page of spec.pages) {
    const html = renderPageBlocks(page, manifest);
    runWp(`post create --post_type=page --post_title='${esc(page.title)}' --post_name='${page.slug}' --post_status=publish --post_content='${esc(html)}'`);
  }
  // front page
  const home = spec.pages.find(p => p.slug === "strona-glowna" || p.slug === "home");
  if (home) {
    const id = runWp(`post list --name=${home.slug} --field=ID --post_type=page`).trim();
    runWp(`option update show_on_front page`);
    runWp(`option update page_on_front ${id}`);
  }
}
```

---

## Idempotencja

| Krok | Jeśli już istnieje |
|------|-------------------|
| `wp core install` | skip if `wp core is-installed` |
| theme/plugins | `wp plugin is-installed` → skip install |
| pages | `--post_name` exists → `wp post update` zamiast create |
| multisite site | `wp site list` contains slug → skip create |

Retry build na tym samym `orderId` = update, nie duplikat DB.

---

## Multisite vs container

| `mode` | `provisionSite()` |
|--------|-------------------|
| `multisite` | `wp site create --slug=${orderId.slice(0,8)}` |
| `container` | `docker compose -f infra/wp-build/compose.yml -p wp-${orderId} up -d` |

URL pattern: `{slug}.waas.stronyodzaraz.pl` vs `{orderId}.clients.stronyodzaraz.pl`

---

## Output callback

```json
{
  "orderId": "uuid",
  "status": "STAGING",
  "stagingUrl": "https://...",
  "buildLog": ["provision:ok", "theme:ok", "pages:ok"],
  "durationMs": 124000
}
```

HMAC: `X-Build-Signature: sha256=...` body + `BUILD_CALLBACK_SECRET`.

---

## Env wymagane

```env
WP_MULTISITE_URL=https://waas.stronyodzaraz.pl
WP_CLI_PATH=wp
BUILD_CALLBACK_URL=https://stronyodzaraz.pl/api/internal/build-callback
BUILD_CALLBACK_SECRET=...
MYSQL_ROOT_PASSWORD=...  # container mode
```

---

## Test lokalny

```bash
# 1. docker compose up db + wordpress dev
# 2. wygeneruj spec test:
node scripts/fixtures/generate-test-spec.mjs > tmp/test-spec.json
# 3. dry-run:
node scripts/build-site.mjs --order-id=test --spec=tmp/test-spec.json --url=http://localhost:8080 --dry-run
```

---

*Orchestrator: [API-INTERNAL-SPEC.md](./API-INTERNAL-SPEC.md)*
