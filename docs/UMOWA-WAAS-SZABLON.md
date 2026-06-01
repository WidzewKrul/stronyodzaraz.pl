# Umowa WaaS — strona w abonamencie (szablon)

**Status:** szablon PDF — **wymagany** przy WaaS B2B z hostingiem u Usługodawcy.  
**Uzupełnia:** REGULAMIN-WAAS.md · RODO-POWIERZENIE-SZABLON.md

---

## UMOWA WEBSITE AS A SERVICE (WaaS)

zawarta **{DATA}** między Usługodawcą (ByteBazaar Paweł Wenderlich, dane jak w UMOWA-USLUG-WEB) a Klientem ({dane Klienta}).

---

### §1. Przedmiot

1. Usługodawca **wdraża** (Setup) i **utrzymuje** stronę/sklep Klienta na infrastrukturze Usługodawcy.
2. Pakiet: **{WaaS Landing / WaaS Start / WaaS Sklep}** — szczegóły w `mrr-pakiety.json` i Załączniku nr 1.
3. Regulamin WaaS (REGULAMIN-WAAS.md) stanowi integralną część umowy.

---

### §2. Opłaty

| Składnik | Kwota | Cykl |
|----------|-------|------|
| Setup (jednorazowo) | {490 / 990 / 2990} zł brutto | płatność przed startem wdrożenia |
| Abonament | {99 / 149 / 249} zł brutto | miesięcznie, Stripe Subscription |
| Okres minimalny abonamentu | **12 miesięcy** od uruchomienia produkcji | — |
| Wykup (transfer po 12 mc) | 990 zł brutto | opcjonalnie |

Abonament **startuje** w miesiącu uruchomienia produkcji, nie w miesiącu Setup.

---

### §3. Zakres abonamentu

Wliczone (per pakiet — patrz Załącznik nr 1):

- hosting VPS współdzielony / dedykowany kontener
- SSL Let's Encrypt
- backup: {daily / weekly} · retencja {7 / 30} dni
- aktualizacje WordPress core, motyw, wtyczki (test → prod)
- monitoring uptime
- reakcja awarie: {48h / 24h} robocze
- godziny prac w pakiecie: {0 / 1h / 2h} mc

**Poza abonamentem:** nowe podstrony, copy, Ads, poczta @domena (opcjonalny upsell), integracje spoza listy.

---

### §4. Domena

1. Rok 1: {w Setup / Klient własna / odnowienie 99 zł}.
2. DNS — Klient deleguje nameservery lub rekordy A/CNAME wg instrukcji.
3. Klient zachowuje **własność domeny** (rejestrator u Klienta), chyba że Umowa stanowi inaczej.

---

### §5. Dane i RODO

1. Strony zawierają **Umowę powierzenia przetwarzania danych** (RODO-POWIERZENIE-SZABLON.md) — Załącznik nr 2.
2. Klient jest Administratorem danych użytkowników formularzy/sklepu; Usługodawca — Procesorem w zakresie hostingu.

---

### §6. Płatności i wstrzymanie

1. Płatność abonamentu z góry — Stripe automatyczne pobranie.
2. Brak płatności: D+3 email · D+7 email · **D+14 wstrzymanie strony** (strona informacyjna) · D+30 rozwiązanie + okres 30 dni na export.
3. Wcześniejsze rozwiązanie przed 12 mc: opłata **200 zł** + należności do końca bieżącego miesiąca.

Szablony maili: `content/TRESCI-EMAILS.json` → `waas_payment_failed`, `waas_suspension`.

---

### §7. Zakończenie i export

1. Po 12 mc — wypowiedzenie z **30-dniowym** okresem wypowiedzenia na koniec miesiąca.
2. **Wykup 990 zł:** pełne FTP, baza, eksport WP, dokumentacja dostępów — transfer na hosting Klienta.
3. Bez wykupu: export plików w ciągu 30 dni od zakończenia; potem usunięcie z serwera.
4. Usługodawca nie blokuje domeny Klienta.

---

### §8. SLA

Patrz SUPPORT-SLA.md — tier WaaS. Kompensata przy downtime >72h z winy Usługodawcy: rabat proporcjonalny do abonamentu (max 100% jednego miesiąca).

---

### §9. Podpisy

Jak w UMOWA-USLUG-WEB-SZABLON.md.

---

## Załącznik nr 1 — Pakiet {NAZWA}

Skopiuj `includes` z `content/mrr-pakiety.json` dla slug `{waas-landing}`.

---

## Załącznik nr 2

[RODO-POWIERZENIE-SZABLON.md](./RODO-POWIERZENIE-SZABLON.md) — wypełniony danymi Klienta.

---

*Ops: WAAS-HOSTING-OPS.md · Finanse: MRR-STRATEGIA.md*
