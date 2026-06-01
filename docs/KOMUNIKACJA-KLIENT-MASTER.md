# Komunikacja z klientem — master

**Jeden dokument spinający:** prawo → płatność → maile → support → zamknięcie projektu.

---

## Mapa dokumentów

| Obszar | Dokument |
|--------|----------|
| **Prawo — index** | [DOKUMENTY-PRAWNE-MASTER.md](./DOKUMENTY-PRAWNE-MASTER.md) |
| Regulamin sklep | [REGULAMIN-USLUG-WEB.md](./REGULAMIN-USLUG-WEB.md) |
| Regulamin WaaS | [REGULAMIN-WAAS.md](./REGULAMIN-WAAS.md) |
| Polityka prywatności | [POLITYKA-PRYWATNOSCI.md](./POLITYKA-PRYWATNOSCI.md) |
| Zwroty | [POLITYKA-ZWROTOW.md](./POLITYKA-ZWROTOW.md) |
| Umowa projekt | [UMOWA-USLUG-WEB-SZABLON.md](./UMOWA-USLUG-WEB-SZABLON.md) |
| Umowa WaaS | [UMOWA-WAAS-SZABLON.md](./UMOWA-WAAS-SZABLON.md) |
| RODO powierzenie | [RODO-POWIERZENIE-SZABLON.md](./RODO-POWIERZENIE-SZABLON.md) |
| Protokół odbioru | [PROTOKOL-ODBIORU-SZABLON.md](./PROTOKOL-ODBIORU-SZABLON.md) |
| Checkboxy checkout | [ZGODY-CHECKOUT.md](./ZGODY-CHECKOUT.md) |
| **Email — index** | [EMAIL-SYSTEM-MASTER.md](./EMAIL-SYSTEM-MASTER.md) |
| Resend DNS | [RESEND-KONFIGURACJA.md](./RESEND-KONFIGURACJA.md) |
| Stripe → mail | [TRANSAKCJE-EMAIL-FLOW.md](./TRANSAKCJE-EMAIL-FLOW.md) |
| Treści maili | [content/TRESCI-EMAILS.json](./content/TRESCI-EMAILS.json) |
| Mapowanie kod | [content/EMAIL-MAPIOWANIE.json](./content/EMAIL-MAPIOWANIE.json) |
| Kontakt API | [KONTAKT-AUTOMAT.md](./KONTAKT-AUTOMAT.md) |
| **Support** | [SUPPORT-PLAYBOOK.md](./SUPPORT-PLAYBOOK.md) |
| SLA | [SUPPORT-SLA.md](./SUPPORT-SLA.md) |
| Szablony odpowiedzi | [content/SUPPORT-SZABLONY-ODPOWIEDZI.json](./content/SUPPORT-SZABLONY-ODPOWIEDZI.json) |
| **Operacje** | [ONBOARDING-KLIENTA.md](./ONBOARDING-KLIENTA.md) |
| SOP realizacji | [PROCES-REALIZACJI-SOP.md](./PROCES-REALIZACJI-SOP.md) |
| Handover | [HANDOVER-CHECKLIST.md](./HANDOVER-CHECKLIST.md) |
| Chargeback | [CHARGEBACK-SOP.md](./CHARGEBACK-SOP.md) |

---

## Timeline klienta (co dostaje i kiedy)

```
D0  Płatność Stripe
    ├── Regulamin + polityka (checkbox)
    ├── Email: potwierdzenie zamówienia
    └── Email: brief PDF (auto)

D0–2 Brief online (48h)
    ├── D+1 reminder (backlog)
    └── D+2 eskalacja P0 (tel)

T0  Brief kompletny
    ├── Email: start + deadline
    └── Umowa PDF (B2B opcjonalnie)

T+X Staging
    └── Email: link review (5 dni)

T+Y Produkcja
    ├── Email: delivered + protokół
    ├── Dostępy (osobny mail)
    └── Handover checklist

D+3 Drip opieka
D+7 Drip upsell
D+14 WaaS offer (backlog)

WaaS  invoice failed → reminder → suspension
```

---

## Kto co robi

| Etap | Auto (system) | Ty (ręcznie) |
|------|---------------|--------------|
| Checkout | Stripe, checkbox | — |
| Potwierdzenie + brief | worker + Resend | — |
| Brief brak 48h | alert admin (backlog) | telefon |
| Staging | — | email staging |
| Poprawki | — | Gmail thread |
| Delivered | drip cron | protokół, dostępy |
| Support | auto-reply kontakt | PLAYBOOK |
| Zwrot/chargeback | — | POLITYKA + CHARGEBACK |

---

## Szybkie linki implementacji kod

| Co | Gdzie w kodzie |
|----|----------------|
| Maile | `lib/email.ts` |
| Kontakt | `app/api/kontakt/route.ts` |
| Webhook Stripe | `app/api/webhook/route.ts` |
| Drip | `app/api/cron/drip/route.ts` |
| Worker brief | `lib/worker.ts` |
| Regulamin | `app/regulamin/page.tsx` ← REGULAMIN-USLUG-WEB |
| Polityka | `app/polityka-prywatnosci/page.tsx` ← POLITYKA-PRYWATNOSCI |

---

*Indeks globalny: [DOCS-INDEX.md](./DOCS-INDEX.md)*
