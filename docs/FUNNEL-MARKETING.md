# stronyodzaraz.pl — funnel marketingowy

**Model:** self-serve ecommerce usług B2B · **Główna konwersja:** opłacony Stripe checkout · **Drugorzędna:** lead z formularza kontakt

---

## 1. Mapa lejka

```
Świadomość (SEO/Ads/Referral)
    ↓
Landing / Blog / PDP long-tail
    ↓
Katalog /uslugi (porównanie pakietów)
    ↓
Koszyk → Checkout Stripe
    ↓
Brief projektu (48h)
    ↓
Realizacja → Oddanie
    ↓
Upsell: opieka techniczna / Ads / integracje
```

---

## 2. Psychologia konwersji

| Zasada | Implementacja na stronie |
|--------|--------------------------|
| **Jasna cena** | Cena na karcie i PDP, bez „zapytaj” |
| **Redukcja ryzyka** | 30 dni poprawek, Stripe, NIP na stopce |
| **Anchoring** | Pokazuj Pro obok Start (wyższy pakiet pierwszy wizualnie) |
| **Urgency (etyczna)** | „Realizacja od 7 dni po briefie” — nie fałszywy timer |
| **Social proof** | Licznik pakietów w katalogu, opinie (gdy zebrane) |
| **Authority** | Blog pillar, portfolio rodziny *odzaraz* |
| **Reciprocity** | Darmowa treść blog + jasny scope przed zakupem |

### Obiekcje i odpowiedzi (microcopy)

| Obiekcja | Odpowiedź w UI |
|----------|----------------|
| „Za tanio = słaba jakość” | Scope list „Co dostajesz”, realizacje |
| „Nie znam się na tech” | Brief prowadzony krok po kroku |
| „A jeśli nie pasuje?” | 30 dni poprawek w pakiecie |
| „Wolę rozmowę” | CTA kontakt obok „Dodaj do koszyka” |

---

## 3. CTA — hierarchia

| Priorytet | Tekst | Gdzie |
|-----------|-------|-------|
| P0 | **Wybierz pakiet** / **Dodaj do koszyka** | PDP, karty katalogu |
| P1 | **Zobacz katalog usług** | Homepage hero secondary |
| P2 | **Bezpłatna konsultacja** | Kontakt (nie „darmowa strona”) |
| P3 | **Porównaj pakiety Start i Pro** | Blog, PDP |

**Unikać:** „Pobierz za darmo”, „Wyceń projekt” jako primary CTA.

---

## 4. Drip email (Resend)

### Trigger: porzucony koszyk (jeśli email znany — faza 2)

| Dzień | Temat | Treść |
|-------|-------|-------|
| D+0 | Twój pakiet czeka | Link do koszyka, powtórzenie ceny i scope |
| D+2 | Pytania przed zakupem? | FAQ + link kontakt |
| D+5 | Oferta ważna | Ostatnia przypominajka (bez fałszywego expiry) |

### Trigger: zakup opłacony

| Kiedy | Temat |
|-------|-------|
| Natychmiast | Potwierdzenie zamówienia #{id} |
| +1h | Wypełnij brief projektu (link) |
| D+1 | Przypomnienie briefu (jeśli brak) |
| Po oddaniu | Projekt gotowy + ankieta NPS |
| D+14 po oddaniu | Upsell opieka techniczna |

### Trigger: formularz kontakt

| Kiedy | Temat |
|-------|-------|
| Natychmiast | Auto-reply: otrzymaliśmy wiadomość |
| Wewnętrznie | Lead do skrzynki operacyjnej |

Implementacja cron: `/api/cron/drip` (patrz KONTAKT-AUTOMAT.md).

---

## 5. Zdarzenia analityczne (GA4)

### Konfiguracja

- Ładowanie GA4 po zgodzie cookies (`ConsentBanner`)
- `NEXT_PUBLIC_GA_ID` w `.env`

### Eventy (nazwy rekomendowane)

| Event | Kiedy | Parametry |
|-------|-------|-----------|
| `view_item` | PDP usługi | `item_id`, `price`, `category` |
| `add_to_cart` | Dodanie do koszyka | `item_id`, `value` |
| `begin_checkout` | Wejście w Stripe | `value`, `currency` |
| `purchase` | Webhook sukces / thank you | `transaction_id`, `value` |
| `generate_lead` | Formularz kontakt OK | `project_type`, `budget` |
| `search` | Wyszukiwarka katalogu | `search_term` |
| `select_category` | Klik kategoria | `category` |
| `view_blog` | Artykuł | `article_slug` |

### Konwersje (oznacz w GA4)

- **Primary:** `purchase`  
- **Secondary:** `generate_lead`  
- **Micro:** `add_to_cart`, `begin_checkout`  

### Meta Pixel (opcjonalnie)

- `Purchase`, `Lead`, `AddToCart` — mirror GA4 przy `NEXT_PUBLIC_META_PIXEL_ID`

---

## 6. Retargeting

| Kanał | Audience | Kreacja |
|-------|----------|---------|
| Google Ads | Odwiedzili /uslugi bez purchase | Pakiet Start od X zł |
| Meta | 180 dni visitors | Carousel 3 kategorii |
| RLSA | Search brand + generic | Wyższy bid na „stronyodzaraz” |

---

## 7. Metryki funnel

| Etap | KPI | Cel |
|------|-----|-----|
| Sesja → PDP | 40% | |
| PDP → add_to_cart | 8% | |
| Cart → checkout | 60% | |
| Checkout → purchase | 75% | |
| **Łącznie sesja → purchase** | **2,5%** | 3,5% po 6 mc |

---

## 8. Testy A/B (backlog)

1. Hero: cena „od 1490 zł” vs „realizacja 7 dni”  
2. Karta produktu: ze zdjęciem vs bez  
3. Checkout: trust badges nad vs pod przyciskiem  
4. PDP: FAQ nad vs pod „Co dostajesz”  

---

*Powiązane: KONTAKT-AUTOMAT.md, SEO-STRATEGIA.md*
