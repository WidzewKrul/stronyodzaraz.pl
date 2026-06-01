# Wykonane — specyfikacja mocków (4 typy × 17 projektów)

**Implementacja:** każdy `mockRef` z `wykonane-katalog.json` → obiekt w `wykonane-mocki.json` lub osobne pliki.

---

## Typ A — `DemoBrowserMock` (10 projektów)

Strony, landingi, sklepy. Chrome + hero gradient + sekcje body.

| mockRef | fakeBrand | Gradient | Kluczowe sekcje body |
|---------|-----------|----------|----------------------|
| `restauracja` | U Kucharza | amber→rose | menu, info-bar, galeria |
| `dentysta` | DentalCare | sky→teal | usługi 3col, zespół, trust |
| `sklep-moda` | ModaPark | violet→fuchsia | chips kategorii, produkty 3, P24/InPost |
| `landing-warsztat` | AutoSerwis Kowalski | slate→zinc | hero CTA, 4 usługi ikony, cennik 3 wiersze, formularz |
| `kancelaria` | Nowak i Wspólnicy | slate-800→indigo-900 | hero stonowany, 4 obszary prawa, zespół 2, formularz |
| `hotel` | Pod Sosnami | emerald→teal | hero góry, pokoje 3 karty, galeria, mapa, rezerwacja |
| `sklep-spozywczy` | Smaki Regionu | lime→green | kategorie spożywcze, produkty lokalne, dostawa info |
| `sklep-b2b` | HurtMet | blue→indigo | login B2B banner, cennik netto, katalog 6 prod |
| `shopify-kosmetyki` | PureSkin | pink→rose | hero beauty, bestsellery, Shopify checkout badge |
| `shoper-elektronika` | TechPoint | cyan→blue | filtry parametrów, grid produktów tech, Shoper logo |

### landing-warsztat — copy

```
Hero: „Twój samochód w dobrych rękach”
Sub: Mechanika · geometria · klimatyzacja · opony
CTA: Umów wizytę | Zadzwoń

Usługi (4 ikony): Przegląd · Hamulce · Silnik · Klimatyzacja

Cennik:
  Wymiana oleju od 149 zł
  Geometria kół od 120 zł
  Diagnostyka od 80 zł

Formularz: Imię, tel, marka auta, opis usterki
Stopka: ul. Warsztatowa 5 · Pn–Pt 8–18
```

### kancelaria — copy

```
Hero: „Prawo biznesowe i obsługa firm”
Sub: Spory · umowy · prawo pracy · nieruchomości

Obszary: Prawo spółek | Prawo pracy | Nieruchomości | Spory sądowe

Zespół: Mec. Jan Nowak · Mec. Anna Kowalska

CTA: Umów konsultację
Kolory: granat #1e293b, akcent gold #ca8a04
```

### hotel — copy

```
Hero: „Wypoczynek blisko natury”
Sub: Pokoje · śniadania · basen · parking

Pokoje: Standard 280 zł | Superior 380 zł | Apartament 520 zł

Sekcja: Atrakcje w okolicy (3 bullet)
CTA: Sprawdź dostępność
```

### sklep-spozywczy — copy

```
Hero: „Produkty z polskich gospodarstw”
Kategorie: Nabiał | Mięso | Warzywa | Przetwory
Produkty: Ser kozi 24 zł | Kiełbasa domowa 32 zł | Miód lipowy 28 zł
Info: Dostawa w promieniu 30 km · min. 80 zł
```

### sklep-b2b — copy

```
Banner: „Zaloguj się po ceny hurtowe”
Produkty z ceną netto: Śruba M8 — 0,42 zł netto (hurt)
Min. zamówienie 500 zł netto
```

### shopify-kosmetyki — copy

```
Hero: „Pielęgnacja skóry bez kompromisów”
Produkty: Serum wit. C 89 zł | Krem SPF50 69 zł | Tonik 49 zł
Badge: „Powered by Shopify”
```

### shoper-elektronika — copy

```
Hero: „Elektronika użytkowa i AGD”
Filtry: Marka | Cena | RAM | Ekran
Produkty: Laptop 3499 zł | Słuchawki 299 zł | Monitor 899 zł
```

---

## Typ B — `DemoDashboardMock` (5 projektów)

Panel admin — **nie** browser chrome. Wygląd jak SaaS dashboard (sidebar + cards + wykres).

| mockRef | Tytuł panelu | Widgety |
|---------|--------------|---------|
| `wp-panel` | WordPress — Edytuj stronę | sidebar WP menu, edytor tytułu + blok tekstu, przycisk Opublikuj |
| `ga4-dashboard` | Google Analytics 4 | wykres sesji 7 dni, top 3 strony, konwersje 12, źródła: Organic/Direct/Ads |
| `google-ads` | Google Ads | kampania „Strona firmowa”, CTR 4,2%, koszt 847 zł, 23 konwersje, status Active |
| `opieka-dashboard` | Opieka stronyodzaraz | uptime 99,9%, ostatni backup wczoraj, WP 6.7.2 ✓, wtyczki 12/12 OK, 0.3h zużyte |
| `opieka-raport` | Raport styczeń 2026 | tabela: 4 update, 4 backup OK, uptime 100%, 0 incydentów, rekomendacja: aktualizacja motywu |

### Wspólny layout dashboard

```
┌────────┬──────────────────────────────────────┐
│ sidebar│  Header: {tytuł}          [status ●] │
│  icons │  ┌────────┐ ┌────────┐ ┌────────┐   │
│        │  │ KPI 1  │ │ KPI 2  │ │ KPI 3  │   │
│        │  └────────┘ └────────┘ └────────┘   │
│        │  ┌─────────────────────────────────┐ │
│        │  │ wykres / tabela / lista         │ │
│        │  └─────────────────────────────────┘ │
└────────┴──────────────────────────────────────┘
```

**Kolory:** tło `slate-50`, sidebar `slate-900`, akcent `brand-600`.

---

## Typ C — `DemoFlowMock` (2 projekty)

Diagram kroków poziomo (mobile: pionowo). Ikony + strzałki.

### flow-inpost

```
[Koszyk] → [Dane] → [Wybierz Paczkomat 🗺️] → [P24/BLIK] → [Potwierdzenie ✓]

Pod spodem mini mapa z 3 pinami paczkomatów (placeholder)
Labels: WAW01 · WAW02 · WAW03
```

### flow-p24

```
[Zamówienie 249 zł] → [Przelewy24] → [BLIK / Karta / Przelew] → [Opłacono ✓]

Badge pod diagramem: Sandbox test OK · Webhook skonfigurowany
```

**Styl:** karty kroków `rounded-xl border`, aktywny krok `border-brand-500 bg-brand-50`.

---

## Typ D — `DemoSplitMock` (1 projekt)

### migracja-split

```
┌─────────────────────┬─────────────────────┐
│ PRZED (2018)        │ PO (WordPress 2026) │
│ szara, nierespons.  │ nowoczesny, mobile  │
│ brak SSL badge      │ 🔒 SSL              │
│ menu rozjechane     │ czysta nawigacja    │
│ wolne ładowanie     │ CWV zielone         │
└─────────────────────┴─────────────────────┘

Pod spodem: Mapa 301
  /stara-oferta.html → /uslugi/oferta
  /kontakt.php → /kontakt
  /index.html → /
```

**Przed:** celowo „brzydszy” — szary bg, Comic Sans **NIE** (zbyt żartobliwe) — użyj `text-xs`, brak spacing, czerwony badge „Not secure”.

**Po:** brand gradient header, czytelna typografia.

---

## Relacja z demo-mockups.json

| Plik | Scope |
|------|-------|
| `demo-mockups.json` | 3 skróty na `/demo` + home teaser |
| `wykonane-katalog.json` | 17 itemów metadane + PDP |
| `wykonane-mocki.json` | pełne dane wizualne wszystkich mockRef |

`restauracja`, `dentysta`, `sklep-moda` — **współdzielone** między oboma (DRY w kodzie: jeden source).

---

## Plik danych — struktura `wykonane-mocki.json`

```json
{
  "browser": { "restauracja": { ... }, "landing-warsztat": { ... } },
  "dashboard": { "ga4-dashboard": { ... } },
  "flow": { "flow-inpost": { ... } },
  "split": { "migracja-split": { ... } }
}
```

Implementacja: `getWykonaneMock(mockRef, variant)` w `lib/wykonane-content.ts`.

---

## a11y i performance

- Wszystkie mocki dekoracyjne: `aria-hidden="true"`
- Bez iframe, bez obrazów — pure CSS/Tailwind
- Lazy render detail mock dopiero below fold OK — hub thumbnails mogą być static SVG/CSS
- Max wysokość full mock: 480px desktop, scroll wewnętrzny jeśli więcej sekcji

---

*Master UX: [WYKONANE-PORTFOLIO.md](../WYKONANE-PORTFOLIO.md)*
