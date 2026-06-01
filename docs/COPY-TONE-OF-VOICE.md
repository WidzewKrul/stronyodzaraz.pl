# Copy i tone of voice

**Głos marki:** konkretny polski B2B · jak dobry PM — mówi co dostajesz, za ile, w jakim terminie · zero „innowacyjnych rozwiązań” i „kompleksowej obsługi”.

**Nie:** agencja kreatywna z buzzwordami · **Tak:** software house z cennikiem.

---

## 1. Zasady ogólne

| Zasada | Przykład dobry | Przykład zły |
|--------|----------------|--------------|
| Konkret > ogólnik | „Realizacja 7 dni roboczych” | „Szybka realizacja” |
| Cena widoczna | „2 490 zł brutto” | „Indywidualna wycena” |
| Ty / Państwo | „Twój sklep”, „Twoja strona” | „Klient otrzymuje…” |
| Krótkie zdania | max 20 słów w bullet | ściana tekstu |
| Aktywna forma | „Budujemy stronę WordPress” | „Strona zostanie zbudowana” |
| PL terminologia | „sklep internetowy”, „strona firmowa” | „website”, „deliverables” |

**Słowa zakazane (primary copy):** synergia, holistyczny, disrupcyjny, world-class, najlepsi na rynku, lider, #1 w Google.

**Słowa OK w SEO:** profesjonalna strona www, agencja interaktywna (w blogu long-tail).

---

## 2. Naming pakietów

| Tier | Zawsze pisz | Unikaj |
|------|-------------|--------|
| Landing | „Landing page” lub „Pakiet Landing” | one-pager |
| Start | „Pakiet Start” | basic, mini |
| Pro | „Pakiet Pro” | premium plus |
| Sklep | „Sklep Start / Pro” | e-commerce package |

W PDP H1: `{Usługa} — {branża}` nie „Pakiet Start dla…”.

---

## 3. Szablony copy per typ strony

### Hero homepage

```
H1: Strony i sklepy internetowe od zera — z gwarancją działania
Sub: Polska agencja web B2B. Productized packages — jasna cena,
     zamówienie online, realizacja 7–14 dni.
Badge: {N}+ pakietów · WordPress · Shopify · Shoper
CTA1: Zobacz pakiety i ceny
CTA2: O nas
```

### ProductCard CTA

```
Zamów pakiet
```

Nie: „Kup teraz”, „Dodaj do koszyka” na karcie (koszyk dopiero PDP — opcjonalnie ujednolicić).

### PDP shortDesc (generator)

```
{Vertical} dla „{branch}” — pakiet z jasnym scope, realizacja 7–14 dni,
gwarancja poprawek 30 dni. Zamów online na stronyodzaraz.pl.
```

### Trust pill

```
Realizacja 7–14 dni · Gwarancja 30 dni · WordPress · Shopify · Shoper
```

### CtaBand

```
H2: Gotowy na stronę lub sklep?
Sub: Wybierz pakiet, zapłać online, wypełnij brief — resztą zajmiemy się my.
CTA: Przeglądaj katalog usług
```

### Blog CTA box (markdown)

```markdown
---
**Szukasz {usługa} dla swojej firmy?**  
Pakiet od **{cena} zł** — stała cena, realizacja 7–14 dni.  
→ [Zobacz pakiety w katalogu](/uslugi?cat={category})
---
```

### E-mail potwierdzenie (skrót)

```
Temat: Zamówienie #{id} potwierdzone — stronyodzaraz.pl
Body: Dziękujemy za płatność {kwota}. Następny krok: wypełnij brief
      projektu (link, ważny 48h). Realizacja liczona od kompletnego briefu.
```

---

## 4. Microcopy UI

| Element | Tekst |
|---------|-------|
| Koszyk pusty | „Koszyk jest pusty. [Przeglądaj usługi](/uslugi)” |
| Search placeholder | „Szukaj: WordPress, sklep, opieka, migracja…” |
| Formularz sukces | „Wiadomość wysłana. Odpowiemy w 24h robocze.” |
| Consent accept | „Akceptuję i przechodzę dalej” |
| Consent reject | „Tylko niezbędne” |
| 404 | „Nie znaleziono strony. [Katalog usług](/uslugi)” |
| Loading checkout | „Przekierowanie do Stripe…” |

---

## 5. SEO copy (title / meta)

### Wzory

```
PDP title:  {Usługa} — {branch} | stronyodzaraz.pl — od {cena} zł
PDP meta:   Pakiet dla {branch}: {scope 1 linia}. Stała cena {cena} zł,
            realizacja 7–14 dni. Zamów online.
Blog title: {Fraza pytająca}? [Przewodnik 2026] | stronyodzaraz.pl
Local title: {Usługa} {Miasto} — od {cena_od} zł | stronyodzaraz.pl
```

**Długości:** title ≤ 60 znaków idealnie, meta 150–160.

---

## 6. Synonimy branż (SEO natural)

Używaj rotacji z `docs/seo/synonyms-branch.json` w longDesc:

- restauracja → gastronomia, lokalu, restauracji
- gabinet dentystyczny → dentysty, stomatologa
- kancelaria prawna → prawnika, kancelarii

**Nie** stuffuj — max 2 warianty na akapit.

---

## 7. Obiekcje — gotowe bloki copy

### „Za tanio”

> Pakiet ma **określony scope** — wiesz co dostajesz. Pro ma więcej podstron i SEO. Porównaj [Start i Pro](/uslugi?cat=strony-internetowe).

### „Wolę rozmowę”

> Możesz [napisać do nas](/kontakt) — ale większość klientów wybiera szybszą ścieżkę: pakiet online + brief.

### „Nie znam się na tech”

> Brief prowadzi Cię krok po kroku. Po oddaniu dostajesz szkolenie z panelu (30 min w pakiecie Start).

---

## 8. Checklist redakcyjny przed publish

- [ ] Cena w PLN brutto gdzie relevant
- [ ] Termin 7–14 dni (nie „szybko”)
- [ ] CTA aktywne czasowniki
- [ ] Brak HACCP/sanepid (inna marka)
- [ ] Link wewnętrzny min. 1 na stronę
- [ ] Faktura VAT / Stripe wzmianka na money pages

---

*Psychologia: PSYCHOLOGIA-KONWERSJI.md · Blog prompt: docs/blog/prompts/system-blog.md*
