# System e-mail — master dokumentacja

**Provider:** [Resend](https://resend.com)  
**Kod:** `lib/email.ts` · **Szablony treści:** `content/TRESCI-EMAILS.json` · **Mapowanie:** `content/EMAIL-MAPIOWANIE.json`

**Powiązane:** [RESEND-KONFIGURACJA.md](./RESEND-KONFIGURACJA.md) · [TRANSAKCJE-EMAIL-FLOW.md](./TRANSAKCJE-EMAIL-FLOW.md) · [KONTAKT-AUTOMAT.md](./KONTAKT-AUTOMAT.md) (skrót operacyjny)

---

## Architektura

```
┌─────────────────┐     ┌──────────────┐     ┌─────────────────┐
│ Trigger         │────▶│ lib/email.ts │────▶│ Resend API      │
│ (webhook/cron/  │     │ wrapper HTML │     │ noreply@...     │
│  API route)     │     │ safeSend()   │     └────────┬────────┘
└─────────────────┘     └──────────────┘              │
                                                      ▼
                                            Klient / CONTACT_EMAIL
```

**From:** `stronyodzaraz.pl <noreply@stronyodzaraz.pl>` (`lib/env.ts` → `resendFrom()`)  
**Reply-To:** klient (lead wewnętrzny) lub brak (transakcyjne) — klient odpowiada → kontakt@bblikh.pl w treści  
**Operacyjny inbox:** `CONTACT_EMAIL` = kontakt@bblikh.pl

---

## Typy maili

| Kategoria | Liczba | Opt-out | HTML |
|-----------|--------|---------|------|
| Transakcyjne (zamówienie, brief) | 6 | nie | tak — wrapper indigo |
| Lifecycle projektu | 4 | nie | tak |
| Drip upsell | 3 | tak* | tak |
| Kontakt | 2 | nie | tak |
| WaaS billing | 2 | nie | tak |
| Admin alerty | 3 | — | tak |
| Support (ręczne) | 15+ | — | plain/HTML |

*Drip: link wypisania w stopce gdy włączysz marketing; upsell po projekcie = uzasadniony interes — krótki link „nie pisz więcej”.

---

## Funkcje w kodzie ↔ triggery

| Funkcja `lib/email.ts` | Trigger | Odbiorca | Status |
|------------------------|---------|----------|--------|
| `sendOrderConfirmationEmail` | webhook paid → worker | klient | ✅ kod |
| `deliverProjectBrief` | worker po generacji briefu | klient + załącznik PDF/DOCX | ✅ kod |
| `sendDripUpsellEmail` day 3/7 | `/api/cron/drip` | klient | ✅ kod (treść ≠ JSON — sync backlog) |
| `sendContactEmail` | `POST /api/kontakt` | CONTACT_EMAIL | ✅ kod |
| `sendContactAutoReply` | `POST /api/kontakt` | klient | ✅ kod |
| `sendAdminOrderFailedAlert` | worker error | CONTACT_EMAIL | ✅ kod |
| `sendAdminAttachmentFailureAlert` | brief bez PDF | CONTACT_EMAIL | ✅ kod |
| `brief_reminder_d1` | cron process | klient | ❌ do dodania |
| `project_started` | manual / cron | klient | ❌ do dodania |
| `staging_review` | manual | klient | ❌ do dodania |
| `project_delivered` | manual DELIVERED | klient | ❌ do dodania |
| `waas_payment_failed` | Stripe webhook | klient | ❌ do dodania |
| `scope_clarification` | manual | klient | ❌ ręcznie z szablonu |

**Backlog implementacji:** zsynchronizować `sendDripUpsellEmail` z `TRESCI-EMAILS.json` · dodać brakujące funkcje z mapy.

---

## Wrapper HTML (brand)

Wspólny layout w `wrapper()`:
- Header: `#4f46e5` indigo — „stronyodzaraz.pl — Strony i sklepy internetowe”
- Body: biały, max 600px, system font
- Footer: szary — stronyodzaraz.pl · WordPress · Shopify · Shoper
- CTA button: `#4f46e5`, radius 8px

**Plain text fallback:** Resend wysyła HTML-only obecnie — opcjonalnie `text` parallel dla deliverability.

---

## Placeholdery

| Placeholder | Źródło |
|-------------|--------|
| `{name}` / `{firstName}` | Stripe `customer_details.name` / brief |
| `{orderId}` | `serviceOrders.id` (skrót 8 w subject) |
| `{productName}` | `items[].name` |
| `{briefUrl}` | `{SITE_URL}/koszyk?order={id}` |
| `{stagingUrl}` | wpis manual / env per projekt |
| `{domain}` | brief / produkcja |
| `{deadline}` | SOP: T0 + dni pakietu |
| `{upsellUrl}` | `/uslugi?cat=opieka` lub konkretny slug |

---

## Rate limiting i błędy

| Mechanizm | Gdzie |
|-----------|-------|
| Kontakt 5/min/IP | `lib/rate-limit` + `/api/kontakt` |
| Brak `RESEND_API_KEY` | `safeSend` log warn, return false |
| Resend error | throw → catch w route (auto-reply nie blokuje 200) |
| Cron batch | max 50 zamówień / drip run |

**Retry:** brak auto-retry w kodzie — cron następnego dnia. Admin alert przy `[FAILED]`.

---

## Tagowanie subject (filtry Gmail)

| Prefix | Znaczenie |
|--------|-----------|
| `[Kontakt]` | formularz |
| `[KONTAKT]` | alias w JSON |
| `[FAILED]` | błąd zamówienia |
| `[Brief PDF]` | brak załącznika |
| `[ZWROT]` | klient — polityka zwrotów |
| `[GWARANCJA]` | poprawki po odbiorze |
| `[P0]` | support eskalacja |

Filtr Gmail: `label:stronyodzaraz` + reguły po prefix.

---

## Drip harmonogram

```
DELIVERED
  ├── D+3  sendDripUpsellEmail day=3  (materiały / checklist — kod)
  ├── D+7  sendDripUpsellEmail day=7  (opieka -20% — kod)
  └── D+14 cron.delivered.no_mrr      (WaaS offer — JSON, nie w kodzie)
```

Cron: `POST /api/cron/drip` · `0 9 * * *` · Bearer `CRON_SECRET`

---

## Testowanie

```bash
# lokalnie — Resend test mode / verified email only
curl -X POST http://localhost:3000/api/kontakt \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"twoj@email.pl","message":"Test wiadomości min 10 znaków"}'
```

Checklist: [RESEND-KONFIGURACJA.md §Testy](./RESEND-KONFIGURACJA.md)

---

## GDPR / marketing

- Transakcyjne — bez zgody marketingowej
- Drip upsell po umowie — art. 6(1)(f) — krótki link opt-out w stopce
- Newsletter (przyszłość) — Resend Audiences + double opt-in

---

## Roadmap kod

1. `lib/email-templates.ts` — load z `TRESCI-EMAILS.json` + replace placeholders
2. Cron `process` — brief_reminder_d1
3. Admin UI / Stripe webhook — project_delivered, waas_payment_failed
4. `Reply-To: kontakt@bblikh.pl` na wszystkich mailach do klienta

---

*Support odpowiedzi: SUPPORT-PLAYBOOK.md · content/SUPPORT-SZABLONY-ODPOWIEDZI.json*
