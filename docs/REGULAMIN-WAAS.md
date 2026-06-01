# Regulamin — WaaS (strona w abonamencie)

**Dotyczy pakietów:** WaaS Landing, WaaS Start, WaaS Sklep — patrz `content/mrr-pakiety.json`  
**Uzupełnia:** REGULAMIN-USLUG-WEB.md

---

## §W1. Definicje WaaS

| Termin | Znaczenie |
|--------|-----------|
| **WaaS** | Website as a Service — strona/sklep utrzymywana u Usługodawcy za abonament |
| **Setup** | jednorazowa opłata wdrożeniowa |
| **Abonament** | opłata miesięczna |
| **Okres minimalny** | 12 miesięcy od uruchomienia produkcji |
| **Wykup** | jednorazowa opłata transferu pełnych dostępów (990 zł po 12 mc) |

---

## §W2. Zawarcie umowy WaaS

1. Umowa = opłata Setup + akceptacja regulaminu + aktywacja subskrypcji Stripe (lub pierwsza faktura abonamentu po oddaniu strony).
2. Abonament rozpoczyna się **po wdrożeniu na produkcję** (nie od dnia Setup).
3. Klient akceptuje **okres minimalny 12 miesięcy** abonamentu.

---

## §W3. Co wchodzi w abonament

Per pakiet — lista w `mrr-pakiety.json` → `includes`. Ogólnie:

- hosting WordPress u Usługodawcy
- SSL, backup, aktualizacje WP/wtyczek (test przed prod)
- monitoring uptime
- domena .pl — rok 1 w Setup; od roku 2: odnowienie 99 zł/rok lub w wyższych planach wliczone
- reakcja na awarie wg SLA (48h Landing, 24h Start/Sklep)

**Poza abonamentem:** nowe podstrony, copy, Ads, poczta @domena, integracje spoza listy Setup.

---

## §W4. Płatności

1. Setup — jednorazowo Stripe.
2. Abonament — Stripe Subscription, pobranie miesięczne z góry.
3. Brak płatności: D+3 przypomnienie → D+7 drugie → D+14 **wstrzymanie strony** (landing page z informacją) → D+30 zakończenie umowy i usunięcie po 30 dniach grace na export.
4. Roczna prepaid — -10%, płatność z góry za 12 mc.

---

## §W5. Wypowiedzenie

1. **Po okresie minimalnym (12 mc):** wypowiedzenie z 30-dniowym okresem wypowiedzenia na koniec miesiąca — przez e-mail lub Stripe Customer Portal.
2. **Przed upływem 12 mc:** wcześniejsze rozwiązanie możliwe z opłatą **200 zł** (koszt setup discount) + należności do końca bieżącego miesiąca.
3. Po wypowiedzeniu Klient ma **30 dni** na export (wykup 990 zł obejmuje pełny transfer + 1h wsparcia migracji).

---

## §W6. Własność

1. **Treści** — Klient.
2. **W trakcie abonamentu** — Usługodawca utrzymuje infrastrukturę; Klient ma dostęp admin WP (read/write treści).
3. **Po wykupie** — pełne dostępy hosting + pliki; Usługodawca nie utrzymuje kopii po 30 dniach (backup ostatni dostępny w grace).
4. **Bez wykupu** — po zakończeniu umowy strona wyłączona; dane usunięte po 30 dniach (backup archiwalny 90 dni wyłącznie dla recovery dispute).

---

## §W7. SLA

| Plan | Uptime docelowy | Reakcja |
|------|-----------------|---------|
| WaaS Landing 99 | 99,5% | 48h rob. |
| WaaS Start 149 | 99,5% | 24h rob. |
| WaaS Sklep 249 | 99,9% | 8h rob. krytyczne |

Wyłączenia: planowany maintenance (max 2h/mc, noc), force majeure, awarie upstream (VPS provider), DNS Klienta.

---

## §W8. Odpowiedzialność

1. Maksymalna odpowiedzialność Usługodawcy = **3× ostatnia opłata abonamentu** (wyłączone umyślne naruszenie).
2. Brak odpowiedzialności za utracone przychody sklepu.
3. Klient odpowiada za treści publikowane na stronie.

---

## §W9. Zmiana ceny abonamentu

1. Podwyżka max **1× rocznie**, z **60-dniowym** wyprzedzeniem e-mail.
2. Klient może wypowiedzieć bez kary podwyżki przed datą wejścia nowej ceny.

---

*Stripe: patrz STRIPE-SETUP.md · Ops: WAAS-HOSTING-OPS.md*
