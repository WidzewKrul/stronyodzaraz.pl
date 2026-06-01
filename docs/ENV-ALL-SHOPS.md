# ENV — wszystkie sklepy portfolio (jedno miejsce)

**Pliki lokalne (gitignored):**
- `haccp-sklep/.env` → **haccpnajuz.pl**
- `ocenaryzyka/.env` → **bhpodzaraz.pl**
- `regulaminygotowe/.env` → **gotowyregulamin.pl**
- `stronyodzaraz/.env` → **stronyodzaraz.pl**

Coolify sync: `python3 scripts/coolify-deploy-shops.py` (czyta pliki + nadpisuje `DATABASE_URL`, `SITE_URL`).

**Launch stronyodzaraz:** [PROJEKT-KOMPLETNY.md](./PROJEKT-KOMPLETNY.md) Faza C–D.

---

## Co MUSISZ dostarczyć (×4 sklepy, osobne klucze Stripe!)

| Zmienna | Skąd wziąć | Uwagi |
|---------|------------|-------|
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Developers → API keys | **Osobny Stripe account lub osobny webhook per domena** |
| `STRIPE_WEBHOOK_SECRET` | Stripe → Webhooks → endpoint | URL: `https://{DOMENA}/api/webhook` |
| `STRIPE_PUBLISHABLE_KEY` | Stripe Dashboard | Opcjonalny w kodzie (Checkout redirect) |
| `RESEND_API_KEY` | resend.com → API Keys | Jeden klucz może obsłużyć 3 domeny |
| `OPENROUTER_API_KEY` | openrouter.ai → Keys | Generowanie PDF/DOCX po zakupie |
| `CRON_SECRET` | Wygeneruj: `openssl rand -hex 32` | **Inny per sklep** — cron job w Coolify |

### Resend — weryfikacja domen (wymagane do wysyłki)

Dodaj i zweryfikuj DNS w Resend dla:
- `haccpnajuz.pl` → from: `noreply@haccpnajuz.pl`
- `bhpodzaraz.pl` → from: `noreply@bhpodzaraz.pl`
- `gotowyregulamin.pl` → from: `noreply@gotowyregulamin.pl`
- `stronyodzaraz.pl` → from: `noreply@stronyodzaraz.pl`

Kontakt operacyjny (regulamin, stopka): **kontakt@bblikh.pl** — może być osobna skrzynka.

---

## DNS (u rejestratora domen)

Każda domena → **A record `@` → `57.131.49.251`**

Opcjonalnie `www` → CNAME `@` lub A ten sam IP.

---

## Stripe webhooks (4 endpointy)

| Domena | Endpoint URL | Events |
|--------|--------------|--------|
| haccpnajuz.pl | `https://haccpnajuz.pl/api/webhook` | `checkout.session.completed` |
| bhpodzaraz.pl | `https://bhpodzaraz.pl/api/webhook` | j.w. |
| gotowyregulamin.pl | `https://gotowyregulamin.pl/api/webhook` | j.w. |
| stronyodzaraz.pl | `https://stronyodzaraz.pl/api/webhook` | j.w. |

Whsec wklej do `STRIPE_WEBHOOK_SECRET` w odpowiednim `.env`.

---

## Szablony `.env` per sklep

### haccpnajuz.pl (`haccp-sklep/.env`)

```env
DATABASE_URL="postgresql://..."          # Coolify nadpisuje internal URL
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
RESEND_API_KEY="re_..."
OPENROUTER_API_KEY="sk-or-..."
OPENROUTER_MODEL="deepseek/deepseek-v4-flash"
OPENROUTER_MODEL_FALLBACK="anthropic/claude-sonnet-4"
SITE_URL="https://haccpnajuz.pl"
NEXT_PUBLIC_BASE_URL="https://haccpnajuz.pl"
CONTACT_EMAIL="kontakt@bblikh.pl"
CRON_SECRET="..."
NEXT_PUBLIC_GA_ID=""
NEXT_PUBLIC_META_PIXEL_ID=""
NEXT_PUBLIC_SENTRY_DSN=""
SENTRY_DSN=""
```

### bhpodzaraz.pl (`ocenaryzyka/.env`)

```env
DATABASE_URL="postgresql://..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
RESEND_API_KEY="re_..."
RESEND_FROM="bhpodzaraz.pl <noreply@bhpodzaraz.pl>"
OPENROUTER_API_KEY="sk-or-..."
OPENROUTER_MODEL="deepseek/deepseek-chat-v3-0324"
SITE_URL="https://bhpodzaraz.pl"
NEXT_PUBLIC_BASE_URL="https://bhpodzaraz.pl"
CONTACT_EMAIL="kontakt@bblikh.pl"
CRON_SECRET="..."
NEXT_PUBLIC_GA_ID=""
NEXT_PUBLIC_META_PIXEL_ID=""
```

### gotowyregulamin.pl (`regulaminygotowe/.env`)

```env
DATABASE_URL="postgresql://..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
RESEND_API_KEY="re_..."
OPENROUTER_API_KEY="sk-or-..."
OPENROUTER_MODEL="deepseek/deepseek-chat-v3-0324"
SITE_URL="https://gotowyregulamin.pl"
NEXT_PUBLIC_BASE_URL="https://gotowyregulamin.pl"
CONTACT_EMAIL="kontakt@bblikh.pl"
CRON_SECRET="..."
NEXT_PUBLIC_GA_ID=""
NEXT_PUBLIC_META_PIXEL_ID=""
NEXT_PUBLIC_SENTRY_DSN=""
SENTRY_DSN=""
```

### stronyodzaraz.pl (`stronyodzaraz/.env`)

```env
DATABASE_URL="postgresql://..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_PUBLISHABLE_KEY="pk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
RESEND_API_KEY="re_..."
RESEND_FROM="stronyodzaraz.pl <noreply@stronyodzaraz.pl>"
OPENROUTER_API_KEY="sk-or-..."
OPENROUTER_MODEL="deepseek/deepseek-v4-flash"
OPENROUTER_MODEL_FALLBACK="anthropic/claude-sonnet-4"
SITE_URL="https://stronyodzaraz.pl"
NEXT_PUBLIC_BASE_URL="https://stronyodzaraz.pl"
CONTACT_EMAIL="kontakt@bblikh.pl"
CRON_SECRET="..."
NEXT_PUBLIC_GA_ID="G-..."
INDEXNOW_KEY=""
NEXT_PUBLIC_META_PIXEL_ID=""
NEXT_PUBLIC_SENTRY_DSN=""
SENTRY_DSN=""
```

---

## Coolify (auto)

| Domena | App UUID | DB UUID |
|--------|----------|---------|
| haccpnajuz.pl | `ml0mhggy1pz99f4ncee2awas` | `alykmqy89jeg1dhbvhnzba07` |
| bhpodzaraz.pl | `m7ebbqobzbn52j6be5kklsle` | `j13xlep1ms7a13kmc5doanyy` |
| gotowyregulamin.pl | `blk1notlbuxkccvoz8y0pcaj` | `gdkemkyshzn7zyxkgrciib04` |
| stronyodzaraz.pl | **TBD — utwórz w Coolify** | **TBD** |

Deploy wszystkich:
```bash
python3 scripts/coolify-deploy-shops.py
```

---

## Checklist po ustawieniu env

- [ ] DNS A → 57.131.49.251 (**4 domeny**)
- [ ] Resend: **4 domeny** zweryfikowane (+ DMARC każda)
- [ ] Stripe: **4 webhooki** + whsec w .env
- [ ] `.env` wypełnione lokalnie (**4 pliki**)
- [ ] `python3 scripts/coolify-deploy-shops.py` (po dodaniu stronyodzaraz)
- [ ] Smoke stronyodzaraz: checkout + kontakt — patrz PROJEKT-KOMPLETNY.md
