# Resend — konfiguracja kompletna

**Konto:** resend.com · **Domena produkcyjna:** stronyodzaraz.pl  
**Env:** `RESEND_API_KEY` · **From:** `noreply@stronyodzaraz.pl`

---

## 1. Onboarding Resend

1. Załóż konto Resend (plan Free: 100 maili/dzień — wystarczy dev; Production: Pro gdy >3000/mc).
2. **Domains → Add Domain** → `stronyodzaraz.pl`
3. Dodaj rekordy DNS u rejestratora domeny (Cloudflare / OVH / home.pl):

| Typ | Host | Wartość |
|-----|------|---------|
| TXT | `@` lub `stronyodzaraz.pl` | SPF z panelu Resend |
| CNAME | `resend._domainkey` | z panelu |
| CNAME | `resend2._domainkey` | z panelu |
| CNAME | `resend3._domainkey` | z panelu |
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:dmarc@bblikh.pl` |

4. **Verify** — status Verified zielony.
5. **API Keys** → Create → `RESEND_API_KEY=re_...` — tylko server-side, nigdy `NEXT_PUBLIC_`.

---

## 2. Adresy From / Reply

| Adres | Użycie | Reply-To |
|-------|--------|----------|
| `noreply@stronyodzaraz.pl` | transakcyjne, drip, auto-reply | `kontakt@bblikh.pl` (w treści + opcjonalnie header) |
| `kontakt@bblikh.pl` | **nie wysyłaj przez Resend** — odbiór leadów | — |

**Uwaga:** `noreply@` — klienci i tak odpowiadają; ustaw **Reply-To: kontakt@bblikh.pl** w kodzie (backlog).

**Forward:** skonfiguruj `kontakt@bblikh.pl` u swojego providera mail (Google Workspace / bblikh.pl MX).

---

## 3. Limity i deliverability

| Plan | Limit | Uwagi |
|------|-------|-------|
| Free | 100/d, 3000/m | dev/staging |
| Pro | 50k/m | launch |
| Batch | API batch | masowe (nie używamy na start) |

**Deliverability:**
- Nie wysyłaj marketingu z `noreply@` bez opt-in
- mail-tester.com po DNS — cel ≥9/10
- Unikaj samego obrazka — HTML tekstowy dominuje
- Linki tylko na własną domenę + Stripe

---

## 4. Załączniki

`deliverProjectBrief` — PDF + DOCX base64:
- Max rozmiar Resend: **40MB** łącznie
- Fallback: `.md` + alert admin `[Brief PDF]`

Typy: `application/pdf`, `application/vnd.openxmlformats-officedocument.wordprocessingml.document`

---

## 5. Webhooks Resend (opcjonalnie)

Resend → Webhooks → `email.delivered`, `email.bounced`, `email.complained`

Endpoint (backlog): `POST /api/webhook/resend` — log bounce → oznacz email w DB invalid.

---

## 6. Coolify / produkcja

```env
RESEND_API_KEY=re_live_...
CONTACT_EMAIL=kontakt@bblikh.pl
SITE_URL=https://stronyodzaraz.pl
```

Secrets w Coolify — nie w repo. Rotacja klucza: nowy key → deploy → revoke stary.

---

## 7. Testy przed launch

| # | Test | Oczekiwane |
|---|------|------------|
| 1 | Formularz kontakt | lead na CONTACT_EMAIL + auto-reply |
| 2 | Stripe test checkout | potwierdzenie zamówienia |
| 3 | Worker brief | PDF w załączniku |
| 4 | Cron drip (secret) | mail day 3 tylko DELIVERED |
| 5 | SPF/DKIM | PASS w nagłówkach |
| 6 | Odpowiedź klienta na mail | trafia na kontakt@ (Reply-To) |

**Narzędzia:** mail-tester.com · Resend Logs · Gmail „Pokaż oryginał”

---

## 8. Troubleshooting

| Problem | Fix |
|---------|-----|
| Domain not verified | DNS propagation 24–48h, sprawdź CNAME flattening |
| 403 invalid from | From musi być z verified domain |
| Mail w spam | DMARC p=quarantine po 2 tyg.; SPF all |
| RESEND_API_KEY missing | log `[email] RESEND_API_KEY missing` — silent fail |
| Klient nie dostaje | Resend Logs → bounced → popraw email |

---

## 9. Staging / dev

- Użyj tego samego API key + verified domain **lub** Resend test addresses
- Nie wysyłaj drip cron na produkcję z dev DB
- `CONTACT_EMAIL` na dev → twój osobisty

---

*Mapa maili: EMAIL-SYSTEM-MASTER.md · Treści: content/TRESCI-EMAILS.json*
