# API wewnętrzne — spec (cron, build, callback)

**Auth:** `CRON_SECRET` / `BUILD_CALLBACK_SECRET` / `ADMIN_SECRET`  
**Base:** `https://stronyodzaraz.pl`

---

## Istniejące

| Method | Path | Auth | Funkcja |
|--------|------|------|---------|
| POST | `/api/cron/process` | Bearer CRON_SECRET | `processPendingJobs()` — brief PDF |
| POST | `/api/cron/drip` | Bearer CRON_SECRET | drip D+3/D+7 |
| POST | `/api/webhook` | Stripe signature | płatności |

---

## Nowe — build pipeline

### POST `/api/cron/build`

**Schedule:** `*/5 * * * *` (Coolify)

**Logika:**
1. Select orders: `status=SPEC_READY` OR (`status=FILLED` + `questionnaireData` complete + `siteSpec` null → generate spec first)
2. Limit 3 concurrent BUILDING globally
3. For each: `status=BUILDING`, spawn build job (HTTP to build worker OR exec queue)

**Response:**
```json
{ "processed": 2, "building": 2, "skipped": 0 }
```

---

### POST `/api/cron/qa`

**Schedule:** `*/30 * * * *`

**Logika:**
1. Select: `status=STAGING` AND `qaReport` IS NULL
2. Run Playwright + Lighthouse against `stagingUrl`
3. Pass → keep STAGING, set `qaReport`, trigger `sendStagingReviewEmail`
4. Fail → `status=QA_FAILED`, admin alert

---

### POST `/api/cron/brief-reminder`

**Schedule:** `0 10 * * *`

Orders: `FILLED` + brief incomplete + `createdAt` > 24h → `sendBriefReminderEmail`

---

### POST `/api/internal/build-callback`

**Auth:** HMAC `X-Build-Signature` = HMAC-SHA256(body, BUILD_CALLBACK_SECRET)

**Body:**
```json
{
  "orderId": "uuid",
  "status": "STAGING" | "BUILD_FAILED",
  "stagingUrl": "https://...",
  "buildLog": ["..."],
  "error": null
}
```

**Actions:**
- STAGING → update DB, enqueue QA cron (or inline)
- BUILD_FAILED → increment `buildAttempts`, alert admin if >= 3

---

### POST `/api/internal/generate-spec`

**Auth:** ADMIN_SECRET or internal only

**Body:** `{ "orderId": "uuid" }`

**Flow:** load questionnaire → OpenRouter → validate SiteSpec → save → status `SPEC_READY`

---

## Admin routes

Patrz [ADMIN-PANEL-SPEC.md](./ADMIN-PANEL-SPEC.md):

```
POST /api/admin/orders/[id]/trigger-build
POST /api/admin/orders/[id]/approve-staging
POST /api/admin/orders/[id]/mark-delivered
```

Auth: `Authorization: Bearer ${ADMIN_SECRET}`

---

## Build worker (osobny serwis)

Opcjonalny HTTP na VPS wewnętrzny:

```
POST http://wp-build-worker:8080/build
Authorization: Bearer BUILD_WORKER_SECRET
{
  "orderId": "...",
  "spec": { ... },
  "templateId": "wp-landing-restauracja",
  "targetUrl": "https://..."
}
```

Worker kończy → callback do Next.js.

**Alternatywa MVP:** cron wywołuje `ssh vps 'node /opt/build-site.mjs ...'` — bez osobnego serwisu.

---

## Status machine

```
PENDING → (stripe) → FILLED
FILLED + brief complete → (generate-spec) → SPEC_READY
SPEC_READY → (build) → BUILDING
BUILDING → (callback ok) → STAGING
STAGING → (qa ok) → STAGING + qaReport + email client
STAGING → (client approve / admin) → REVIEW → DELIVERED
BUILDING/STAGING → (fail) → BUILD_FAILED / QA_FAILED
```

---

## Rate limits

| Endpoint | Limit |
|----------|-------|
| cron/* | 1 req/min per job (Coolify schedule) |
| build-callback | 10/min per orderId |
| admin/* | 30/min per IP |

---

## Env

```env
CRON_SECRET=
BUILD_CALLBACK_SECRET=
BUILD_WORKER_URL=
BUILD_WORKER_SECRET=
ADMIN_SECRET=
OPENROUTER_API_KEY=
```

---

*Build script: [BUILD-SITE-SCRIPT-SPEC.md](./BUILD-SITE-SCRIPT-SPEC.md)*
