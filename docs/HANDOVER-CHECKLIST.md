# Handover — checklist przekazania projektu

**Trigger:** staging zaakceptowany → wdrożenie prod → status `DELIVERED`

---

## Techniczne

- [ ] Strona live na docelowej domenie
- [ ] SSL aktywny (https)
- [ ] Formularz kontaktowy — test wysyłki OK
- [ ] Mapa Google (jeśli w scope) — poprawny pin
- [ ] GA4 — stream live, test event
- [ ] Search Console — property dodane (Pro)
- [ ] RODO: banner cookies + polityka link
- [ ] Sklep: test zamówienie end-to-end (P24 sandbox→prod)
- [ ] Sklep: regulamin + polityka w stopce
- [ ] 404 / favicon / meta title homepage

---

## Dostępy (mail zaszyfrowany lub 1Password link)

- [ ] WP admin URL + login + hasło tymczasowe (wymuszenie zmiany)
- [ ] Hosting panel (jeśli klient) lub info WaaS
- [ ] Domena: gdzie zarejestrowana, data wygaśnięcia
- [ ] GA4 property — właściciel klient
- [ ] Stripe sklepu (jeśli) — po stronie klienta

---

## Dokumenty dla klienta

- [ ] PDF „Instrukcja obsługi panelu” (1–2 strony)
- [ ] Nagranie szkolenia 30 min (Loom) — link
- [ ] Scope checklist — co było w pakiecie
- [ ] Gwarancja 30 dni — jak zgłosić poprawkę
- [ ] Upsell opieka / WaaS — link katalog (soft)

---

## Email handover (template)

→ `TRESCI-EMAILS.json` → `project_delivered`

Subject: `Twój projekt jest online — {domena}`

---

## Wewnętrzne

- [ ] Status DB `DELIVERED` + `deliveredAt`
- [ ] Cron drip D+3 zaplanowany
- [ ] Backup prod po wdrożeniu
- [ ] Projekt w archiwum active clients (WaaS) lub closed (one-shot)

---

*SOP: PROCES-REALIZACJI-SOP.md · WaaS: WAAS-HOSTING-OPS.md*
