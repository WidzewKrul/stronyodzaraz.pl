# Treści sekcji — copy gotowe do wklejenia

**Zasada:** tekst poniżej idzie 1:1 do JSX / markdown. Bez placeholderów typu „Lorem ipsum”.

---

## Homepage — nowe sekcje

### PlatformBadges

```
H2: Technologie, które wdrażamy
Sub: WordPress, WooCommerce, Shopify i polskie integracje — w jednym miejscu.
Link pod rzędem: Dowiedz się więcej o stacku → /technologia
```

### DemoShowcase

→ meta z `demo-mockups.json` → `pageMeta.homeSection`

### Dlaczego pakiety (vs agencja)

```
H2: Dlaczego pakiety zamiast wyceny?
Sub: Większość agencji zaczyna od spotkań i PDF-a z wyceną. My od razu pokazujemy cenę i scope.

| | Agencja tradycyjna | stronyodzaraz.pl |
| Cena | Wycena po 2–4 tygodniach spotkań | Stała cena w katalogu — widzisz przed płatnością |
| Scope | Często „do ustalenia” w umowie | Lista w pakiecie + sekcja „poza scope” |
| Start projektu | Umowa, zaliczka, kick-off | Checkout Stripe + brief online |
| Termin realizacji | Często 2–3 miesiące | 7–14 dni od kompletnego briefu |
| Poprawki | Godzinówka lub „change request” | 30 dni poprawek w scope pakietu |

CTA pod tabelą: Zobacz pakiety i ceny → /uslugi
```

### Portfolio *odzaraz*

```
H2: Część ekosystemu usług dla firm w Polsce
Sub: stronyodzaraz.pl to jeden z serwisów *odzaraz* — dokumentacja, compliance i strony dla MŚP.

Karta 1:
  Tytuł: haccpnajuz.pl
  Opis: Dokumentacja HACCP i procedury dla gastronomii — gotowe pakiety online.
  Link: https://haccpnajuz.pl

Karta 2:
  Tytuł: bhpodzaraz.pl
  Opis: Dokumentacja BHP, ocena ryzyka i szkolenia dla firm.
  Link: https://bhpodzaraz.pl

Karta 3:
  Tytuł: gotowyregulamin.pl
  Opis: Regulaminy sklepu, polityka prywatności i RODO dla e-commerce.
  Link: https://gotowyregulamin.pl

Karta 4:
  Tytuł: stronyodzaraz.pl
  Opis: Strony i sklepy internetowe — productized packages z jasną ceną.
  Link: / (current, badge „Tu jesteś”)
```

### BlogTeaser

```
H2: Poradnik — strony, sklepy, e-commerce
Sub: Praktyczne artykuły o kosztach, technologiach i wdrożeniach — bez lania wody.
Link: Wszystkie artykuły → /blog
(Karty: dynamiczne z getBlogPosts(3))
```

---

## Strona `/demo`

→ `demo-mockups.json` → `pageMeta.demoPage` + 3× full DemoBrowserMock

---

## Strona `/technologia`

→ pełny copy w `technologia-sekcje.json`

---

## Footer rozszerzony

```
Kolumna 1 — Brand:
  stronyodzaraz.pl
  Strony i sklepy internetowe od zera — jasna cena, realizacja w terminie.

Kolumna 2 — Usługi:
  Strony internetowe · Sklepy online · WordPress · Shopify i Shoper
  Opieka techniczna · Reklama i marketing · Integracje · Migracje

Kolumna 3 — Firma:
  O nas · Blog · Kontakt · Technologia · Demo

Kolumna 4 — Prawne:
  Regulamin · Polityka prywatności
  kontakt@stronyodzaraz.pl
  NIP: [UZUPEŁNIĆ]

Kolumna 5 — Portfolio:
  haccpnajuz.pl · bhpodzaraz.pl · gotowyregulamin.pl · stronyodzaraz.pl

Stopka dolna:
  © {year} stronyodzaraz.pl · Płatności obsługuje Stripe
```

---

## CompareStartPro (tabela)

```
H2: Start czy Pro — co wybrać?

| | Pakiet Start | Pakiet Pro |
| Cena od | 2 490 zł | 4 990 zł |
| Podstrony | do 5 | do 10 |
| SEO on-page | podstawowe meta | title, meta, H1, schema LocalBusiness |
| Blog | — | szablon bloga |
| Rundy poprawek | 1 | 2 |
| Termin | 7 dni roboczych | 14 dni roboczych |
| Szkolenie z panelu | 30 min | 30 min |

CTA Start: Wybierz Start → /uslugi?cat=strony-internetowe
CTA Pro: Wybierz Pro → /uslugi?cat=strony-internetowe
```

---

## ProcessTimeline (/o-nas)

```
H2: Jak wygląda współpraca?

Krok 1 — Wybierz pakiet online
  Przeglądasz katalog, porównujesz scope i cenę. Bez rozmowy wstępnej.

Krok 2 — Zapłać Stripe i wypełnij brief
  Płatność kartą lub BLIK. Brief online w 48h — dane firmy, materiały, preferencje.

Krok 3 — Projekt i akceptacja
  Budujemy na stagingu. 1–2 rundy poprawek w zależności od pakietu.

Krok 4 — Wdrożenie i przekazanie
  Produkcja, SSL, szkolenie z panelu. 30 dni gwarancji poprawek w scope.
```

---

## PDP — „Poza zakresem pakietu” (generyczne)

```
H3: Poza zakresem tego pakietu

- Copywriting powyżej limitu słów pakietu (szczegóły w scope powyżej)
- Profesjonalna sesja zdjęciowa lub wideo
- Wersje językowe (np. EN/DE) poza jednym językiem
- Integracje spoza listy w pakiecie (ERP, Allegro, custom API)
- Stała opieka po okresie gwarancji — dostępna jako abonament

Potrzebujesz więcej? Napisz przez formularz kontaktowy lub wybierz Pakiet Pro / upsell w koszyku.
```

---

## Mobile sticky PDP

```
Lewo: {formatPrice} brutto
Prawo: button „Dodaj do koszyka”
```

---

*Demo dane: demo-mockups.json · Technologia: technologia-sekcje.json*
