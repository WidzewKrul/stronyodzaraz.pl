# stronyodzaraz.pl — kontakt i automatyzacja e-mail (Resend)

**Provider:** [Resend](https://resend.com) · **API:** `RESEND_API_KEY` · **From:** `noreply@stronyodzaraz.pl` (po weryfikacji DNS) · **Operacyjny:** `kontakt@bblikh.pl`

---

## 1. Przepływ formularza kontakt

### Endpoint

```
POST /api/kontakt
Content-Type: application/json
```

### Payload (Zod)

| Pole | Walidacja | Wymagane |
|------|-----------|----------|
| `name` | 2–100 znaków | tak |
| `email` | email | tak |
| `phone` | max 30 | nie |
| `projectType` | max 100 | nie |
| `budget` | max 50 | nie |
| `message` | 10–5000 znaków | tak |

### Rate limit

- Klucz: `kontakt:{ip}`  
- Limit: **5 żądań / 60 s** na IP (`lib/rate-limit`)  
- Odpowiedź 429: *„Zbyt wiele wiadomości…”*

### Sekwencja po POST

1. `sendContactEmail()` → skrzynka operacyjna (lead wewnętrzny)  
2. `sendContactAutoReply()` → potwierdzenie do klienta (błąd nie blokuje 200)  
3. JSON `{ ok: true }`

### Implementacja

- Route: `app/api/kontakt/route.ts`  
- UI: `app/kontakt/KontaktForm.tsx`  
- Logika maili: `lib/email.ts`

---

## 2. Szablony Resend (kontakt)

### A) Lead wewnętrzny — `sendContactEmail`

| Pole | Wartość |
|------|---------|
| **To** | `CONTACT_EMAIL` (env) |
| **Reply-To** | email klienta |
| **Subject** | `[stronyodzaraz.pl] Kontakt: {name}` |
| **Body** | name, email, phone, projectType, budget, message + timestamp |

### B) Auto-reply — `sendContactAutoReply`

| Pole | Wartość |
|------|---------|
| **To** | email klienta |
| **Subject** | `Otrzymaliśmy Twoją wiadomość — stronyodzaraz.pl` |
| **Treść** | Podziękowanie, czas odpowiedzi 24h w dni robocze, link do `/uslugi` |

**Tone:** krótko, po polsku, bez HTML-heavy marketingu.

---

## 3. E-maile transakcyjne (Stripe)

| Trigger | Funkcja (orient.) | Kiedy |
|---------|-------------------|-------|
| `checkout.session.completed` | potwierdzenie zamówienia | webhook `/api/webhook` |
| Brief | link do briefu PDF/form | po płatności |
| Status realizacji | cron `process` | wg statusu zamówienia |

Szczegóły generowania: `lib/email.ts` + `app/api/cron/process/route.ts`.

---

## 4. Drip / upsell (`/api/cron/drip`)

### Autoryzacja

```
Authorization: Bearer {CRON_SECRET}
```

lub query `?secret=` — patrz `lib/cron-auth.ts`.

### Harmonogram (zaimplementowane)

| Dzień po `deliveredAt` | Warunek | Akcja |
|------------------------|---------|-------|
| 3 | `status=DELIVERED`, brak `followUpSentAt` | `sendDripUpsellEmail` day=3 → opieka techniczna |
| 7 | brak `followUp7SentAt` | `sendDripUpsellEmail` day=7 → inny angle (Ads/integracje) |

Limit: 50 zamówień / przebieg cron.

### Coolify cron

```text
POST https://stronyodzaraz.pl/api/cron/drip
Schedule: 0 9 * * *   (codziennie 09:00)
Header: Authorization: Bearer <CRON_SECRET>
```

Osobny job dla `POST /api/cron/process` (generowanie / statusy).

---

## 5. DNS Resend (wymagane przed produkcją)

Dla domeny **stronyodzaraz.pl**:

| Rekord | Cel |
|--------|-----|
| SPF | Resend dashboard |
| DKIM | 3× CNAME z panelu Resend |
| DMARC | `v=DMARC1; p=none` → potem `quarantine` |

**From adresy:**

- `noreply@stronyodzaraz.pl` — transakcyjne, drip  
- Reply-To na leadach: klient lub `kontakt@bblikh.pl`

---

## 6. Eskalacja leadów

### SLA wewnętrzny

| Priorytet | Kryterium | Reakcja |
|-----------|-----------|---------|
| P0 | Zamówienie opłacone, brief brak &gt; 48h | Telefon / SMS jeśli numer w zamówieniu |
| P1 | Formularz + budget &gt; 5000 zł | Odpowiedź &lt; 4h robocze |
| P2 | Standard kontakt | &lt; 24h robocze |
| P3 | Spam / &lt; 10 znaków message | Ignoruj / filtr |

### Kanały eskalacji

1. E-mail na `CONTACT_EMAIL`  
2. (Opcjonalnie) Slack webhook — nie w repo, dodać w `sendContactEmail`  
3. Panel Stripe — zamówienia wysokiej wartości

### Tagowanie w subject

- `[KONTAKT]` — formularz  
- `[ZAMÓWIENIE #{id}]` — webhook  
- `[BRIEF BRAK]` — cron process alert (jeśli dodany)

---

## 7. Zmienne ENV

```env
RESEND_API_KEY="re_..."
CONTACT_EMAIL="kontakt@bblikh.pl"
SITE_URL="https://stronyodzaraz.pl"
CRON_SECRET="..."   # unikalny per sklep
```

---

## 8. Checklist przed launch

- [ ] Domena zweryfikowana w Resend  
- [ ] Test `POST /api/kontakt` → lead + auto-reply  
- [ ] Test webhook → mail potwierdzenia  
- [ ] Cron drip z `CRON_SECRET` w Coolify  
- [ ] SPF/DKIM pass (mail-tester.com)  
- [ ] Stopka: adres firmy, link wypisania (dla marketingu przyszłego)  

---

## 9. Backlog automatyzacji

| Feature | Opis |
|---------|------|
| Porzucony koszyk | Wymaga email pre-checkout |
| Brief reminder D+1 | Cron process |
| NPS po D+3 delivered | Link Typeform/Google Forms |
| Resend Audiences | Segment: kupili stronę vs sklep |

---

*Powiązane: [EMAIL-SYSTEM-MASTER.md](./EMAIL-SYSTEM-MASTER.md) · [RESEND-KONFIGURACJA.md](./RESEND-KONFIGURACJA.md) · [TRANSAKCJE-EMAIL-FLOW.md](./TRANSAKCJE-EMAIL-FLOW.md) · FUNNEL-MARKETING.md · `.env.example`*
