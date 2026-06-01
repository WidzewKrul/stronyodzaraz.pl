# Nowe sekcje — specyfikacja treści i komponentów

**Status:** do implementacji · każda sekcja ma **copy**, **cel**, **komponent**, **SEO**.

**Układ:** UKLAD-STRON.md · **Design:** UI-UX-DESIGN-SYSTEM.md

---

## 1. Homepage — brakujące sekcje

### 1.1 PlatformBadges

**Cel:** authority techniczna w 3 sekundy.

```
Sekcja: „Technologie, które wdrażamy”
Logos: WordPress · WooCommerce · Shopify · Shoper · Stripe · Google Analytics
Komponent: PlatformBadges.tsx (simple-icons)
Styl: szary rząd, hover kolor brand
Link: /technologia
```

---

### 1.2 DemoShowcase (skrót)

**Cel:** wizualizacja bez prawdziwych klientów.

```
H2: Zobacz przykładowe układy
3 karty: Restauracja | Gabinet | Sklep online
Każda: mini browser mock + 3 bullet co zawiera układ
Disclaimer: „Ilustracja — projekt dopasowujemy do Twojej branży”
CTA: Zobacz więcej → /demo
CTA2 per karta → PDP branżowy
```

Copy bullets restauracja: Menu, mapa, rezerwacja, mobile-first.

---

### 1.3 Dlaczego productized (vs agencja)

**Cel:** psychologia — redukcja strachu przed wyceną.

```
H2: Dlaczego pakiety zamiast wyceny?
Tabela 3 kolumny:
| | Agencja tradycyjna | stronyodzaraz.pl |
| Cena | wycena 2–4 tyg | od razu w katalogu |
| Scope | często niejasny | lista w pakiecie |
| Start | spotkania | checkout + brief |
| Termin | 2–3 miesiące | 7–14 dni |
```

---

### 1.4 PortfolioOdZaraz

**Cel:** social proof portfolio rodziny.

```
H2: Część ekosystemu usług dla firm w Polsce
4 karty:
- haccpnajuz.pl — dokumentacja HACCP gastronomia
- bhpodzaraz.pl — BHP i PPOŻ
- gotowyregulamin.pl — regulaminy sklepu i RODO
- stronyodzaraz.pl — strony i sklepy (Tu jesteś)
Styl: border, logo tekstowe, link external
```

---

### 1.5 BlogTeaser

**Cel:** internal linking + authority.

```
H2: Poradnik — strony, sklepy, e-commerce
3 karty: najnowsze z getBlogPosts()
Każda: gradient thumb, title, excerpt, read time
Link: /blog
```

---

## 2. PDP — UpsellBox

```
Pozycja: pod AddToCartBox, nad microcopy trust
Nagłówek: „Często dokładane razem”
1 produkt z lib/upsell.ts mapy
Mini: tytuł, cena, 1 linia scope, button „Dodaj do koszyka”
Reguła: nie więcej niż 1 upsell (paradox of choice)
```

Przykład strona Start → Opieka WordPress 299 zł/mc.

---

## 3. PDP — sekcja „Czego nie ma w pakiecie”

**Cel:** redukcja refundów, zwiększenie zaufania (honesty).

```
W ProductTabs lub pod scope:
H3: Poza zakresem tego pakietu
Bullets z OFERTA.md per vertical:
- Copywriting > 800 słów
- Sesja zdjęciowa
- Wielojęzyczność
- Integracje custom poza listą
Link: „Potrzebujesz więcej? [Kontakt](/kontakt) lub Pakiet Pro”
```

---

## 4. Strona `/demo` (skrót)

Teaser 3 branż + link do pełnego portfolio:

```
H1: Przykładowe układy stron i sklepów
Intro: (z demo-mockups.json pageMeta.demoPage)
3× mini DemoBrowserMock
CTA główny: Zobacz wszystkie 17 przykładów → /wykonane
FAQ: 2 pyt
```

**Pełne portfolio:** [WYKONANE-PORTFOLIO.md](./WYKONANE-PORTFOLIO.md) — `/wykonane` + 17 detail pages.

---

## 5. Strona `/wykonane` (portfolio)

→ patrz **WYKONANE-PORTFOLIO.md**, **UKLAD-WYKONANE.md**, `content/wykonane-katalog.json`

---

## 6. Strona `/technologia`

Sekcje szczegółowo — patrz UKLAD-STRON §11.

**Dodatkowa sekcja: Stack diagram**

```
ASCII / mermaid w doc, w UI prosty grid:
Frontend: WordPress theme, React (headless opcjonalnie)
Commerce: WooCommerce, Shopify, Shoper
Płatności: Stripe (nasz checkout), P24/PayU (sklep klienta)
Hosting: Coolify/VPS klienta — wyjaśnienie
```

---

## 6. Strona `/cennik` (opcjonalna)

**Canonical:** `/uslugi` lub sekcja home — **nie duplikuj** jeśli identyczna tabela.

Jeśli osobna URL:
```
H1: Cennik pakietów strony i sklepu 2026
Tabela wszystkich tierów (Landing, Start, Pro, Sklep, Opieka, Ads)
Kolumny: Pakiet | Cena | Termin | Link PDP
FAQ: 4 pyt cennik
Schema: OfferCatalog (opcjonalnie)
```

---

## 7. Sekcja CompareStartPro

```
Komponent tabela 2 kolumny
Wiersze: podstrony, SEO, blog, rundy poprawek, termin, cena
Highlight Pro kolumna (subtle bg brand-50)
CTA pod każdą kolumną → filtr katalogu
Użycie: blog „ile kosztuje”, PDP strony Start
```

---

## 8. ProcessTimeline (o-nas)

```
4 kroki poziomo (mobile vertical):
1. Wybierz pakiet online
2. Zapłać Stripe + brief 48h
3. Projekt i akceptacja (2 rundy)
4. Wdrożenie + szkolenie + gwarancja 30 dni
Ikony: Search, CreditCard, Palette, Rocket
```

---

## 9. Mobile sticky PDP bar

```
fixed bottom-0, bg-white border-t shadow
Left: cena formatPrice
Right: button „Dodaj do koszyka”
Pokazuj gdy scroll > buy box original (IntersectionObserver)
tylko mobile md:hidden
```

---

## 10. Sekcja „Popularne pakiety” (katalog + home opcjonalnie)

```
6 kart curated slugów:
- strona-wordpress-restauracja
- strona-wordpress-gabinet-dentystyczny
- sklep-woocommerce-sklep-odziezowy
- google-ads-setup (generic)
- opieka-wordpress-start
- landing-page-restauracja
Hardcoded lista w lib/featured-products.ts
```

---

## 11. Footer rozszerzony

```
Kolumna 1: Brand + 1 zdanie USP
Kolumna 2: Usługi (8 linków kategorii)
Kolumna 3: Firma (O nas, Blog, Kontakt, Technologia, Demo)
Kolumna 4: Prawne + NIP + mail
Kolumna 5: Portfolio *odzaraz* (4 linki)
Dół: © rok, Stripe badge, RODO
```

---

## 12. Priorytet implementacji sekcji

| P | Sekcja | Strona |
|---|--------|--------|
| P0 | UpsellBox | PDP |
| P0 | BlogTeaser | Home |
| P0 | PortfolioOdZaraz | Home, o-nas |
| P0 | PlatformBadges | Home |
| P1 | DemoShowcase + `/demo` | Home, skrót 3 branż |
| **P0** | **`/wykonane` hub + 17 detail** | **portfolio pełne** |
| P1 | `/technologia` | nowa route |
| P1 | CompareStartPro | blog + PDP |
| P1 | Poza scope | PDP tabs |
| P1 | Footer rozszerzony | global |
| P2 | Mobile sticky bar | PDP |
| P2 | Popularne pakiety | home, katalog |
| P2 | /cennik | optional |

---

*Copy do sekcji: COPY-TONE-OF-VOICE.md · Trust: TRUST-DEMO-FAQ.md*
