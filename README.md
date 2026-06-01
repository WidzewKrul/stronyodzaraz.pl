# stronyodzaraz.pl

Polska agencja web B2B — strony WordPress, sklepy WooCommerce/Shopify/Shoper. Productized packages, checkout Stripe, realizacja 7–14 dni.

## Stack

- Next.js 16 · React 19 · Tailwind 4
- PostgreSQL · Drizzle · Stripe · Resend

## Dev

```bash
npm ci
cp .env.example .env.local   # uzupełnij klucze
npm run db:push
npm run dev
```

Build produkcyjny: `npm run build` (output `standalone` — patrz `Dockerfile`).

## Deploy (Coolify)

- Repo: ten katalog jako root aplikacji
- Port **3000**, health `GET /`
- Crony: `POST /api/cron/process`, `/api/cron/drip`, `/api/cron/blog` (Bearer `CRON_SECRET`)

Dokumentacja operacyjna: `docs/PROJEKT-KOMPLETNY.md`, `docs/COOLIFY-JOBS.md`.

## Kontakt

kontakt@bblikh.pl · [stronyodzaraz.pl](https://stronyodzaraz.pl)
