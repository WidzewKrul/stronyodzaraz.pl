# Support — playbook operacyjny

**Inbox:** kontakt@bblikh.pl  
**SLA:** [SUPPORT-SLA.md](./SUPPORT-SLA.md)  
**Szablony odpowiedzi:** [content/SUPPORT-SZABLONY-ODPOWIEDZI.json](./content/SUPPORT-SZABLONY-ODPOWIEDZI.json)

---

## Organizacja pracy

### Kanały (kolejność priorytetu)

1. **Email** — główny (`kontakt@bblikh.pl`)
2. **Stripe** — powiadomienia płatności / dispute
3. **Formularz** — trafia na email via Resend
4. **Telefon** — tylko P0, umówione szkolenie, eskalacja brief 48h

**Nie obsługuj:** Facebook DM, LinkedIn — odpowiedz „Napisz na kontakt@bblikh.pl”.

---

### Etykiety / filtry Gmail

| Etykieta | Reguła |
|----------|--------|
| `#zamowienie` | subject zawiera `#` + hex id |
| `#kontakt` | `[Kontakt]` / `[KONTAKT]` |
| `#p0` | ręcznie / `[P0]` |
| `#opieka` | klient WaaS / opieka aktywna |
| `#waiting` | czekamy na klienta |
| `#done` | zamknięte |

**Threading:** odpowiadaj w wątku — klient widzi historię.

---

## Workflow ticketu

```
1. Odbiór → oceń P0–P3 (SLA)
2. Zidentyfikuj orderId (Stripe / subject / email klienta w DB)
3. Odpowiedz szablonem (dopasuj) lub custom
4. Jeśli dev → fix → potwierdź klientowi
5. Zamknij — label #done
```

**Czas pierwszej odpowiedzi:** max SLA z SUPPORT-SLA.md (nawet jeśli „pracujemy nad tym”).

---

## Scenariusze A–Z

### A. „Gdzie mój brief / PDF?”

1. Sprawdź DB order + Resend Logs
2. Jeśli `[Brief PDF]` admin — wygeneruj ręcznie, wyślij
3. Szablon: `support_brief_resend`

### B. „Chcę zmienić treść na stronie” (w gwarancji)

1. Scope pakietu — poprawka TAK jeśli w scope
2. Nowa funkcja → upsell lub wycena
3. Szablon: `support_change_in_scope` / `support_out_of_scope`

### C. „Strona nie działa” (P0)

1. Ping URL, Coolify, DNS, SSL
2. Klient WaaS → WAAS-HOSTING-OPS.md
3. Klient własny hosting → wskazówki, opcjonalnie opieka
4. Szablon: `support_p0_ack` → potem `support_p0_resolved`

### D. „Chcę zwrot”

1. POLITYKA-ZWROTOW.md — który przypadek
2. Stripe refund partial/full
3. Szablon: `support_refund_process`

### E. „Nie pamiętam hasła WP”

1. Reset przez WP admin / link
2. Szkolenie było w pakiecie — Loom 5 min
3. Szablon: `support_wp_password`

### F. „Brief — co wpisać?”

1. BRIEF-DECISION-TREE.md
2. Szablon: `support_brief_help`

### G. „Płatność WaaS nie przeszła”

1. Stripe Customer Portal link
2. REGULAMIN-WAAS D+14
3. Szablon: `support_waas_payment`

### H. „Chargeback”

CHARGEBACK-SOP.md — **nie** odpowiadaj emocjonalnie, fakty + dokumentacja.

### I. „Ile trwa projekt?”

ONBOARDING + konkretna data z SOP. Szablon: `support_timeline`.

### J. Lead sprzedażowy (formularz)

Odpowiedź <24h, link do `/uslugi/{slug}`. Szablon: `support_lead_qualify`.

---

## Eskalacja wewnętrzna

| Warunek | Akcja |
|---------|-------|
| P0 >4h bez fix | SMS/telefon founder |
| Klient >10k | dedykowany kontakt w podpisie |
| Prawnik / wezwanie | stop — konsultacja prawna |
| Bug produkcyjny checkout | hotfix > content |

---

## Podpis maila support

```
—
Paweł · stronyodzaraz.pl
Strony i sklepy z jasną ceną online
kontakt@bblikh.pl · https://stronyodzaraz.pl
```

WaaS Pro: dodaj „Opiekun: …” jeśli ktoś inny przejmie.

---

## Metryki (miesięcznie)

| KPI | Cel |
|-----|-----|
| First response time P1 | <4h |
| P0 count | 0–1 |
| Tickets / aktywny projekt | <2 |
| NPS (opcjonalnie D+3) | >8 |

---

## Narzędzia

| Narzędzie | Użycie |
|-----------|--------|
| Gmail / Workspace | inbox |
| Stripe Dashboard | płatności, klient |
| Coolify | uptime, deploy |
| Resend Logs | dostarczalność |
| DB admin | order status |
| Loom | instrukcje WP |

**Backlog:** Crisp / Plain.com — shared inbox gdy >20 ticketów/mc.

---

## Godziny i auto-responder

Poza Pn–Pt 9–17 — auto-reply:

```
Dziękujemy za wiadomość. Odpowiadamy w dni robocze 9–17. 
Awaria strony (P0)? W temacie wpisz [P0] — monitorujemy częściej.
```

Weekend P0 WaaS Sklep: telefon w REGULAMIN-WAAS (jeśli obiecany tier).

---

*SLA szczegóły: SUPPORT-SLA.md · Emails: EMAIL-SYSTEM-MASTER.md*
