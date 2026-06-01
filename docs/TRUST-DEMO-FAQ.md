# Trust, demo, FAQ — specyfikacja

**Cel:** klient B2B widzi profesjonalizm **bez** prawdziwych case study na start. Demo = CSS mockupy + proces + liczby + portfolio rodziny.

---

## 1. Trust elements (implementacja)

### Tier 1 — must have na launch

| Element | Gdzie | Implementacja |
|---------|-------|---------------|
| **TrustBar** | Home | ✅ 4 ikony |
| **Stała cena + Stripe** | PDP, home | ✅ |
| **Gwarancja 30 dni** | Home, PDP pills, FAQ | ✅ |
| **Termin 7–14 dni** | Wszędzie spójnie | ✅ |
| **NIP + dane firmy** | Stopka, /o-nas | ⚠️ uzupełnić |
| **Regulamin + RODO** | Stopka | ⚠️ przepisać pod usługi |
| **Platformy** | Home, PDP | PlatformBadges — ✅ komponent |
| **Licznik pakietów** | Home hero, katalog | „317+ pakietów” — ✅ |
| **Portfolio *odzaraz*** | /o-nas, opcjonalnie home | 4 sklepy — linki |

### Tier 2 — po launch (P1)

| Element | Gdzie |
|---------|-------|
| **ProductReviews** | PDP — placeholder → prawdziwe po 1. kliencie |
| **„Dlaczego my vs freelancer”** | /o-nas lub blog |
| **Badge płatności** | Stopka: Stripe, Visa/MC |
| **Proces wizualny** | Timeline 4 kroki z ikonami |
| **SLA box** | PDP Pro: „14 dni lub poprawka gratis” |

### Tier 3 — gdy są klienci

- Case study z metryką (CWV przed/po, czas wdrożenia)
- Logo klientów (za zgodą)
- Wideo 60s screen recording panelu WP

---

## 2. Demo / mockupy (bez prawdziwych stron)

### Co pokazujemy

| Demo | Opis | Gdzie |
|------|------|-------|
| **Browser mockup** | Generic SaaS layout | HeroBanner |
| **Brief mockup** | Formularz briefu po zakupie | PDP BriefMockup |
| **Portfolio /wykonane** | **17 przykładów — strony, sklepy, opieka, integracje, migracje** | **`/wykonane`, `/wykonane/[slug]`** |
| **Skrót 3 branże** | restauracja, dentysta, sklep | `/demo`, home teaser |

Pełna spec portfolio: **WYKONANE-PORTFOLIO.md** · treści: **content/wykonane-katalog.json**

### Jak budować (bez Gemini)

- Komponent `DemoShowcase.tsx` — 3 karty, CSS gradient + Lucide
- Każda karta: mini browser chrome + fake content (jak HeroBanner)
- Podpis: „Przykładowy układ — Twój projekt dopasowujemy do branży”
- CTA: „Zamów pakiet dla {branża}” → PDP

**Nie pisz** „nasza realizacja dla X” dopóki nie masz X.

### Interaktywne demo (opcjonalnie P2)

- iframe sandbox z statycznym HTML (ciężkie w utrzymaniu) — **pomiń na start**
- Lepsze: 3 screenshoty WebP wygenerowane **raz** z CSS export

---

## 3. Social proof — copy do użycia (legal-safe)

| Typ | Przykład copy |
|-----|---------------|
| Liczba | „317+ gotowych pakietów w katalogu” |
| Portfolio | „Część rodziny serwisów *odzaraz* — tysiące firm w Polsce” |
| Proces | „Setki briefów projektowych — sprawdzony workflow” |
| Bezpieczeństwo | „Płatność przez Stripe · faktura VAT” |

**Unikaj:** „500+ zadowolonych klientów stronyodzaraz” dopóki nie masz liczby.

---

## 4. FAQ — master lista (copy-paste do generatorów)

### Ogólne (homepage)

1. Ile kosztuje strona internetowa? → Start 2490, Pro 4990, link katalog  
2. Jak długo trwa realizacja? → 7–14 dni od briefu  
3. Czy mogę zamówić online bez rozmowy? → tak, Stripe + brief  
4. WordPress czy Shopify? → krótkie porównanie + doradzimy  
5. Co jeśli nie mam logo/treści? → placeholder / upsell copy  
6. Czy dajecie fakturę VAT? → tak, Stripe / dane na fakturze  
7. Jaka jest gwarancja? → 30 dni poprawek w scope  
8. Czy obsługujecie moje miasto? → remote, cała Polska  

### Techniczne (/technologia)

1. Czy hosting jest w cenie? → patrz INFRA-DOMENA-HOSTING  
2. Kto jest właścicielem strony? → klient, przekazanie dostępów  
3. Czy mogę sam edytować treści? → tak, szkolenie z WP  
4. Backup? → w pakiecie opieki / podstawowy przy wdrożeniu  
5. RODO i cookies? → banner + polityka w pakiecie  
6. SSL? → tak, Let’s Encrypt  
7. Migracja z innej strony? → pakiet migracji  
8. Co z domeną? → klient kupuje / pomożemy (upsell)  

### Sklep

1. Ile kosztuje sklep? → od 5990  
2. Jakie płatności PL? → P24, BLIK, PayU  
3. InPost / DPD? → w pakiecie  
4. Allegro sync? → upsell integracja  
5. Ile produktów w Start? → do 50  

### Po zakupie

1. Co po płatności? → brief w 48h  
2. Ile rund poprawek? → 1–2 w pakiecie  
3. Szkolenie? → 30 min wideo/call w cenie  

---

## 5. ProductReviews — strategia

**Launch:** 3–5 anonimowych „przykładowych” recenzji = **NIE** (wprowadza w błąd).

**Launch:** komponent z tekstem „Opinie zbieramy po pierwszych realizacjach” lub ukryty.

**Po 1. kliencie:** prośba o opinię mail D+14 (drip rozszerzenie).

Schema `Review` tylko z prawdziwymi danymi.

---

## 6. Cross-trust portfolio *odzaraz*

| Sklep | Co linkujemy | Anchor |
|-------|--------------|--------|
| haccpnajuz.pl | „Dokumentacja HACCP dla gastronomii” | trust B2B food |
| bhpodzaraz.pl | „Dokumentacja BHP” | trust compliance |
| gotowyregulamin.pl | „Regulaminy sklepu i RODO” | trust e-commerce prawo |

Sekcja na `/o-nas`: „Nasze serwisy dla firm w Polsce” — 4 karty.

---

*Powiązane: STRONA-PELNA-MAPA.md · UPSELL-CROSSSELL.md · OFERTA.md*
