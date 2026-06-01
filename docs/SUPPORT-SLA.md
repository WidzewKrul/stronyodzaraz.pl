# Support i SLA — wewnętrzny

**Godziny:** Pon–Pt 9:00–17:00 (CET)  
**Kontakt klienta:** kontakt@bblikh.pl  
**Playbook:** [SUPPORT-PLAYBOOK.md](./SUPPORT-PLAYBOOK.md)

---

## Plany opieki — SLA klienta

| Plan | Odpowiedź | Rozwiązanie P1 | P0 uptime |
|------|-----------|----------------|-----------|
| **Brak opieki** (po projekcie) | 48h rob. | best effort | — |
| **Opieka Lite** 299/mc | 24h rob. | 48h | — |
| **WaaS Landing** 99/mc | 48h rob. | 72h | 99% |
| **WaaS Start** 149/mc | 24h rob. | 48h | 99,5% |
| **WaaS Sklep** 249/mc | 24h rob. | 24h | 99,9% |

**P0 (strona down):** WaaS Start/Sklep — reakcja **2h rob.** · Landing — **4h rob.**

---

## Priorytety ticketów

| P | Opis | Przykład | SLA odpowiedzi | SLA rozwiązania |
|---|------|----------|----------------|-----------------|
| **P0** | Strona/sklep niedostępna | 502, DNS expired, white screen | 2h rob. (WaaS Sklep) | 8h rob. |
| **P1** | Kluczowa funkcja broken | formularz, checkout sklepu | 4h | 24h |
| **P2** | Błąd treści, layout, SEO meta | literówka, zdjęcie | 24h | 48h |
| **P3** | Pytanie „jak edytować” | WP admin, produkt | 48h | instrukcja / Loom |

**P0 poza godzinami:** auto-reply + monitoring uptime (UptimeRobot) → SMS jeśli skonfigurowany.

---

## Co wchodzi / nie wchodzi w SLA

### W scope supportu (opieka/WaaS)

- Przywrócenie z backupu
- Update WP/wtyczek po teście
- Naprawa po update (rollback)
- SSL renewal
- Formularz nie wysyła (konfiguracja WP)
- Godziny dev w pakiecie (1–2h/mc)

### Poza scope (wycena / upsell)

- Nowe podstrony, sekcje, redesign
- Copywriting, zdjęcia produktów
- SEO pozycjonowanie, Ads
- Poczta @domena (Google Workspace setup)
- Migracja na inny hosting (wykup WaaS)
- Problemy u operatora Klienta (hosting własny bez opieki)

---

## Kanały

| Kanał | Obsługa | Uwagi |
|-------|---------|-------|
| Email kontakt@ | ✅ główny | Reply-To z Resend |
| Formularz /kontakt | ✅ → email | rate limit 5/min |
| Telefon | ⚠️ P0, szkolenie | numer w handover |
| Stripe dispute | ✅ CHARGEBACK-SOP | termin 7 dni |
| Social DM | ❌ | przekieruj na email |

---

## Proces eskalacji

```
P3 → P2 jeśli blokuje biznes
P2 → P1 jeśli utrata leadów/sprzedaży
P1 → P0 jeśli cała strona down
P0 >4h → founder + komunikat status klientowi co 2h
```

Klient B2B >10k — dedykowany podpis + priorytet P1=2h.

---

## Komunikaty status (P0)

**Ack (w 2h):**
```
Widzimy problem z {domena}. Diagnozujemy — update w ciągu 2h.
```

**Resolved:**
```
Przywrócono działanie. Przyczyna: {krótko}. 
Backup/prevent: {co zrobiliśmy}.
```

---

## Narzędzia

| Tool | Cel |
|------|-----|
| UptimeRobot / Better Stack | alert P0 |
| Coolify logs | deploy errors |
| Stripe | płatności WaaS |
| Resend logs | mail delivery |
| Gmail labels | #p0 #opieka |

Backlog: shared inbox (Crisp), status page.

---

## KPI wewnętrzne

| Metryka | Cel miesięczny |
|---------|----------------|
| P0 incydenty | ≤2 |
| Średni czas P1 | <12h |
| Tickety/project delivered | <3 |
| CSAT (opcjonalnie) | brak formalnego — NPS D+3 |

---

*Operacje WaaS: WAAS-HOSTING-OPS.md · Szablony: content/SUPPORT-SZABLONY-ODPOWIEDZI.json*
