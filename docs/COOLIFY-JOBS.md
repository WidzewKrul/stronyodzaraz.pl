# Coolify — scheduled jobs (wszystkie)

**Ważne:** używamy **Coolify Scheduled Tasks** na aplikacji — nie crontab na hoście, nie osobny worker container (chyba że później skala).

Application: **stronyodzaraz.pl** → Scheduled Tasks → Add

---

## Wymagane joby

### 1. `process-pending-jobs`

Przetwarza kolejkę briefów / PDF po zamówieniu.

| Pole | Wartość |
|------|---------|
| **Name** | `process-pending-jobs` |
| **Command** | `curl -sf -X POST -H "Authorization: Bearer ${CRON_SECRET}" https://stronyodzaraz.pl/api/cron/process` |
| **Schedule** | `*/10 * * * *` (co 10 min) |
| **Timeout** | 120 s |
| **Enabled** | yes |

Endpoint: `app/api/cron/process/route.ts` → `processPendingJobs()`

---

### 2. `drip-upsell-emails`

Maile D+3 i D+7 po oddaniu projektu.

| Pole | Wartość |
|------|---------|
| **Name** | `drip-upsell-emails` |
| **Command** | `curl -sf -X POST -H "Authorization: Bearer ${CRON_SECRET}" https://stronyodzaraz.pl/api/cron/drip` |
| **Schedule** | `0 9 * * *` (codziennie 09:00 Europe/Warsaw) |
| **Timeout** | 180 s |

Env Coolify: `CRON_SECRET` musi być w **Environment Variables** aplikacji (curl go widzi jeśli task run in container — alternatywnie hardcode secret w command z env injection Coolify).

**Coolify tip:** w UI Scheduled Task często jest pole „Custom Docker Command” — użyj:

```bash
curl -sf -X POST \
  -H "Authorization: Bearer $CRON_SECRET" \
  https://stronyodzaraz.pl/api/cron/drip
```

Upewnij się że `CRON_SECRET` jest dostępny w kontekście taska (Coolify → Application → Environment → „Available at Runtime”).

---

### 3. `blog-generate-weekly` ⭐ nowy

Generuje 1 artykuł blog z OpenRouter.

| Pole | Wartość |
|------|---------|
| **Name** | `blog-generate-weekly` |
| **Command** | `curl -sf -X POST -H "Authorization: Bearer $CRON_SECRET" https://stronyodzaraz.pl/api/cron/blog` |
| **Schedule** | `0 6 * * 1` (poniedziałek 06:00) |
| **Timeout** | 300 s (OpenRouter może trwać) |

**Opcjonalnie 2×/tydzień:**

| Name | Schedule |
|------|----------|
| `blog-generate-thu` | `0 6 * * 4` |

Endpoint: **do implementacji** `app/api/cron/blog/route.ts` — patrz BLOG-AUTOMAT.md

---

### 4. `indexnow-new-content` (opcjonalny)

Jeśli blog cron nie woła IndexNow wewnętrznie — osobny job:

| Schedule | `30 6 * * 1` (pon 6:30, po blog) |
| Command | wywołanie wewnętrzne lub `npm run mkt:sitemap -- --indexnow-urls ...` |

Lepiej: IndexNow **wewnątrz** `/api/cron/blog` po sukcesie.

---

## Joby infrastrukturalne (Coolify global)

| Co | Gdzie | Schedule |
|----|-------|----------|
| **PostgreSQL backup** | Coolify → Database → Backups | daily 3:00 |
| **SSL renew** | automat Let's Encrypt | auto |
| **Docker cleanup** | Coolify server settings | weekly |

---

## Autoryzacja cron

Wszystkie endpointy używają `lib/cron-auth.ts`:

```
Authorization: Bearer {CRON_SECRET}
```

- Secret **unikalny** per sklep portfolio
- Rotacja: 1×/rok opcjonalnie
- **Nigdy** w query string (`?secret=`)

Test ręczny:

```bash
curl -X POST https://stronyodzaraz.pl/api/cron/process \
  -H "Authorization: Bearer TWOJ_SECRET"
# → {"ok":true,...}
```

---

## Monitoring jobów

| Sygnał | Akcja |
|--------|-------|
| Coolify task **Failed** | sprawdź log taska, timeout, OPENROUTER key |
| `blog` zwraca 500 | queue pusta / OpenRouter quota |
| `process` stuck | DB connection, worker error |
| `drip` sent=0 przez 30 dni | OK jeśli brak zamówień |

Opcjonalnie: webhook Discord/Slack z Coolify notifications.

---

## Różnica: Scheduled Task vs cron w kodzie

| | Coolify Scheduled Task | node-cron w app |
|--|------------------------|-----------------|
| Restart app | task nadal działa | ginie z procesem |
| Scale horizontal | 1 task na instancję — OK | duplikaty |
| **Rekomendacja** | ✅ używaj Coolify | ❌ nie dodawaj |

---

## Checklist setup Coolify (stronyodzaraz)

- [ ] Utwórz app + DB (UUID wpisz w ENV-ALL-SHOPS)
- [ ] Env vars z `.env.example`
- [ ] Deploy pierwszy build OK
- [ ] Dodaj 3 scheduled tasks (process, drip, blog)
- [ ] Test każdego curl ręcznie
- [ ] Włącz backup DB

---

*Powiązane: BLOG-AUTOMAT.md · PROJEKT-KOMPLETNY.md · ENV-ALL-SHOPS.md*
