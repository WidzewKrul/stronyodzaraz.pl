# Psychologia konwersji B2B

**ICP:** właściciel MŚP, 35–55 lat, decyduje sam · boi się: przepłacić, zostać oszukanym, technicznego bagna · chce: przewidywalność, fakturę, termin.

**Powiązane:** FUNNEL-MARKETING.md · COPY-TONE-OF-VOICE.md · UPSELL-CROSSSELL.md

---

## 1. Model decyzji zakupowej (usługa web)

```
Problem (brak strony / stara strona / chcę sklep)
    ↓
Szukaj info (Google, znajomy, AI)
    ↓
Porównaj 2–3 opcje (cena, zaufanie, termin)
    ↓
Obiekcje (czy ogarną, czy tanie = słabe)
    ↓
Decyzja: self-serve checkout LUB kontakt
    ↓
Post-purchase: brief → relief → upsell opieka
```

**Nasz edge:** skracamy fazę porównania przez **fixed price + scope online**.

---

## 2. Heurystyki Cialdini — mapowanie na UI

| Heurystyka | Implementacja | Gdzie |
|------------|---------------|-------|
| **Reciprocity** | Darmowy blog, FAQ, poradniki | /blog, homepage FAQ |
| **Commitment** | Mały krok: koszyk → checkout (nie od razu 5000 zł rozmowa) | funnel |
| **Social proof** | 317+ pakietów, portfolio *odzaraz*, opinie (później) | home, o-nas |
| **Authority** | Technologia, proces, blog pillar cennik | /technologia, blog |
| **Liking** | Język „Ty”, bez arogancji, polski support | copy |
| **Scarcity** | **Etyczna:** termin liczony od briefu — nie fake „zostało 2 miejsca” | trust pills |

---

## 3. Biasy poznawcze — wykorzystanie etyczne

| Bias | Jak pomagamy klientowi | UI |
|------|------------------------|-----|
| **Anchoring** | Pro wyżej cenowo obok Start | tabela cennik, related |
| **Loss aversion** | „Gwarancja 30 dni poprawek” | PDP |
| **Default effect** | Pre-select pakiet Start w porównaniu | blog tabela |
| **Paradox of choice** | 317 PDP ale filtrowane kategoria+search | katalog |
| **Endowment** | Koszyk — „Twój pakiet czeka” (drip P2) | email |
| **Status quo bias** | „Migracja bez utraty SEO” | blog, migracje |

**Nie wykorzystuj:** dark patterns, ukryte koszty, pre-checked upsell bez jasnej ceny.

---

## 4. Obiekcje B2B — macierz pełna

| Obiekcja | Emocja | Odpowiedź | Element UI |
|----------|--------|-----------|------------|
| Ile kosztuje? | niepewność | cena na karcie | ProductCard, PDP |
| Czy zdążycie? | presja czasu | 7–14 dni + SLA | trust pill |
| Czy będzie moja? | kontrola | handover checklist | FAQ, /technologia |
| Co jeśli źle? | strach | 30 dni poprawek | FAQ, regulamin |
| Nie znam WP | kompetencja | szkolenie + opieka | FAQ, upsell opieka |
| Za tanio | jakość | scope list szczegółowy | ProductTabs |
| Wolę agencję z miasta | zaufanie | remote PL, portfolio | /o-nas, /l/ |
| Potrzebuję faktury | formalność | Stripe + NIP | stopka, checkout |
| RODO/cookies | compliance | banner + polityka | ConsentBanner |
| Co po wdrożeniu? | lęk porzucenia | opieka 299/mc | UpsellBox, drip |

---

## 5. Hierarchia dowodów zaufania (trust stacking)

Kolejność budowania zaufania na stronie (góra → dół):

1. **Profesjonalny design** (indigo, spójność) — 3 sekundy
2. **Jasna cena** — 10 sekund
3. **Konkretny scope** — 30 sekund
4. **Termin + gwarancja** — 1 minuta
5. **Proces 3 kroków** — zrozumienie flow
6. **Portfolio / liczby** — social proof
7. **FAQ** — rozwianie wątpliwości
8. **Blog** — authority długoterminowa

---

## 6. Psychologia ceny

| Technika | Implementacja |
|----------|---------------|
| **Charm pricing** | 2 490 zł OK (nie 2 499 — PL B2B woli okrągłe) |
| **Price framing** | „od 2 490 zł” hero, dokładna na PDP |
| **Bundle value** | Start vs Pro tabela „co dostajesz więcej” |
| **Relative comparison** | „Freelancer 150/h × 40h = 6000 vs Pro 4990 fixed” — blog |
| **Payment trust** | Logo Stripe, „bezpieczna płatność kartą/BLIK” |

**Unikaj:** przekreślone ceny fake „było 9999”.

---

## 7. Psychologia formularza brief / kontakt

| Zasada | Brief po zakupie | Kontakt |
|--------|------------------|---------|
| Progress bar | krok 1/4 | — |
| Opcjonalne pola jasno | phone optional | tak |
| Krótkie etykiety | label nad input | tak |
| Potwierdzenie | email natychmiast | auto-reply |
| Błąd przyjazny | po polsku, co poprawić | tak |

---

## 8. Segmenty psychograficzne

| Segment | Motywacja | Komunikat |
|---------|-----------|-----------|
| **Starter** | pierwsza strona, budżet | Landing, Start, „od 1490” |
| **Grower** | sklep, skalowanie | Sklep Pro, integracje |
| **Burned** | zła agencja w przeszłości | fixed price, gwarancja, scope |
| **Tech-savvy** | wie czego chce | Pro, technologia, stack |
| **Local service** | fryzjer, dentysta | branża PDP, /l/ |

Mapowanie reklam/landing: patrz MARKETING-POZYCJONOWANIE.md.

---

## 9. Emocje po zakupie (retention)

| Moment | Emocja docelowa | Touchpoint |
|--------|-----------------|------------|
| Po płatności | ulga „zrobione” | email potwierdzenie |
| Brief | zaangażowanie | formularz prosty |
| W trakcie | cierpliwość | status mail (opcjonalnie) |
| Oddanie | satysfakcja | szkolenie + dostępy |
| D+3 | FOMO utraty wsparcia | drip opieka |
| D+7 | ambicja wzrostu | drip Ads |

---

## 10. Metryki psychologiczne (proxy)

| Sygnał | Co znaczy |
|--------|-----------|
| Wysoki bounce PDP | brak ceny/trust above fold |
| Długi time on page blog, brak click | słaby CTA box |
| add_to_cart bez checkout | obiekcja ceny lub brak trust checkout |
| Kontakt zamiast checkout | segment „wolę rozmowę” — OK |

---

*CTA hierarchy: FUNNEL-MARKETING.md §3 · Upsell timing: UPSELL-CROSSSELL.md*
