# Admin panel — spec `/admin/orders`

**Cel:** wewnętrzny dashboard zamówień — status build, retry, approve staging.  
**Auth:** na start — Basic Auth Coolify / env `ADMIN_SECRET` header. Później: Clerk / magic link.

---

## Routes

| Route | Opis |
|-------|------|
| `/admin` | redirect → `/admin/orders` |
| `/admin/orders` | lista filtr po status |
| `/admin/orders/[id]` | detail + akcje |
| `/admin/orders/[id]/build-log` | raw log |

**Middleware:** `middleware.ts` — block `/admin/*` bez auth.

---

## Lista zamówień

### Kolumny

| Kolumna | Źródło |
|---------|--------|
| ID | `serviceOrders.id` (skrót 8) |
| Email | `email` |
| Pakiet | `toolSlug` → nazwa z katalogu |
| Status | badge kolorowy |
| Staging | link jeśli `stagingUrl` |
| Utworzono | `createdAt` |
| Termin | obliczony z SOP |

### Filtry

- Status: ALL / PAID / BUILDING / STAGING / QA_FAILED / DELIVERED
- Pakiet: kategoria dropdown
- Search: email, order id

### Sort

Domyślnie: `updatedAt DESC`. P0 eskalacje (brief brak 48h) — czerwony badge na górze (query).

---

## Detail page — sekcje

### 1. Header

- Status timeline (visual): PAID → FILLED → SPEC_READY → BUILDING → STAGING → REVIEW → DELIVERED
- CTA buttons (zależne od status):

| Status | Akcje |
|--------|-------|
| FILLED | „Generuj SiteSpec” · „Wyślij reminder brief” |
| SPEC_READY | „Uruchom build” |
| BUILDING | „Anuluj” (kill job) · refresh |
| STAGING | „Wyślij ponownie staging mail” · „Approve → deploy” |
| QA_FAILED | „Retry build” · „Retry QA” · „Force send (override)” |
| REVIEW | „Mark DELIVERED” |

### 2. Brief

- Render `questionnaireData` jako tabela
- Link PDF brief jeśli `resultMarkdown`
- Flag scope: `scopeReviewRequired`

### 3. SiteSpec

- JSON viewer (collapsible)
- `templateId`, kolory preview swatch

### 4. Build

- `buildLog` monospace
- `buildAttempts`, last error
- Link staging URL (external)

### 5. QA

- `qaReport` — checklist pass/fail
- Screenshot thumbnail jeśli S3

### 6. Stripe

- Link Stripe Dashboard payment
- Refund button → otwiera Stripe (nie w app)

### 7. Notatki wewnętrzne

- Textarea `internalNotes` (nowa kolumna JSON lub text)

---

## API actions (server actions / routes)

```
POST /api/admin/orders/[id]/generate-spec
POST /api/admin/orders/[id]/trigger-build
POST /api/admin/orders/[id]/retry-qa
POST /api/admin/orders/[id]/approve-staging
POST /api/admin/orders/[id]/mark-delivered
```

Auth: `Authorization: Bearer ${ADMIN_SECRET}`

Każda akcja → audit log (nowa tabela `AdminAuditLog` opcjonalnie).

---

## DB — nowe kolumny (reminder)

```sql
-- serviceOrders rozszerzenie
siteSpec JSONB,
templateId TEXT,
stagingUrl TEXT,
productionUrl TEXT,
buildAttempts INT DEFAULT 0,
buildLog TEXT,
qaReport JSONB,
internalNotes TEXT,
scopeReviewRequired BOOLEAN DEFAULT false,
approvedAt TIMESTAMP,
approvedBy TEXT
```

Status enum rozszerzyć: `SPEC_READY`, `BUILDING`, `STAGING`, `QA_FAILED`, `REVIEW`.

---

## UI stack

- Tailwind jak reszta strony
- **Bez** shadcn unless already in repo — proste tabele + buttons
- Server Components + form actions Next.js 16

---

## MVP scope (v1)

- [ ] Lista + detail read-only
- [ ] Przycisk „trigger build” → cron endpoint
- [ ] Link staging
- [ ] Mark DELIVERED manual

**v2:** QA viewer, approve workflow, notes.

---

*API: [API-INTERNAL-SPEC.md](./API-INTERNAL-SPEC.md)*
