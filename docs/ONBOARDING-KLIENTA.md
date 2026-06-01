# Onboarding klienta — po płatności

**Trigger:** `checkout.session.completed` → status `PAID`

---

## Sekwencja automatyczna (0–48h)

```
T+0 min    Email: potwierdzenie + link brief + numer zamówienia
T+24h      Reminder brief (jeśli brak)
T+48h      Escalation P0 + telefon jeśli tel w checkout
T+48h+     T0 — start realizacji (SOP)
```

Szablony: `content/TRESCI-EMAILS.json`

---

## Co potrzebujemy od klienta (brief)

### Wymagane zawsze

- [ ] Nazwa firmy, NIP (faktura)
- [ ] Branża / opis działalności (2–3 zdania)
- [ ] Email i telefon na stronie
- [ ] Preferencje kolory/styl (lub „zaufaj nam”)
- [ ] Akceptacja placeholder logo/treści jeśli brak materiałów

### Per kategoria

| Kategoria | Dodatkowo |
|-----------|-----------|
| Strony | Adres, mapa, lista podstron, treści lub „placeholder” |
| Sklep | CSV produktów lub lista do 50, dane P24, polityka zwrotów |
| Integracja | Dostępy sandbox API |
| Migracja | FTP/stary WP admin, lista URL |
| Ads/GA4 | Dostęp do Google konta lub zaproszenie admin |

---

## Co robimy my (w 24h od T0)

- [ ] Potwierdzenie terminu realizacji (data konkretna)
- [ ] Staging URL
- [ ] Kontakt jednej osoby (mail)

---

## Komunikacja

| Kanał | Zasada |
|-------|--------|
| Email | główny — kontakt@bblikh.pl |
| Telefon | tylko P0 / umówione szkolenie |
| Czas odpowiedzi | 24h rob. (48h opieka Lite) |

---

## Decyzje w briefie → scope

Patrz **BRIEF-DECISION-TREE.md** — gdy klient prosi więcej niż pakiet.

---

## WaaS vs one-shot

| Model | Po handover |
|-------|-------------|
| One-shot | Dostępy u klienta + drip opieka |
| WaaS | Hosting u nas + aktywacja Stripe Subscription |

---

*SOP realizacji: PROCES-REALIZACJI-SOP.md*
