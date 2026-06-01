# MRR i monetyzacja recurring — strategia biznesu

**Cel:** z one-shot agency → **hybryda transakcyjna + MRR** (docelowo 25–40% revenue z abonamentów).

**Teza:** Landing/strona tanio w produkcji → **złap klienta na hostingu i opiece** na 24+ mc. Sklep → wyższy setup + wyższy MRR.

**Powiązane:** OFERTA.md · UPSELL-CROSSSELL.md · INFRA-DOMENA-HOSTING.md · KONKURENCJA-RESEARCH.md

---

## 1. Dlaczego MRR ma sens (u was)

| Fakt | Implikacja |
|------|------------|
| Landing WP = 3–6h z szablonu | Niski COGS → możesz obniżyć setup i **zarabiać na MRR** |
| Klient MŚP **nie chce** pilnować hostingu/DNS/update | Płaci za spokój, nie za kod |
| Rynek opieki PL: **200–800 zł/mc** (WebyJuice 299, Becht podobnie) | 99–299 zł/mc jest w widełkach |
| Wix bierze **39–149 zł/mc** bez „prawdziwego” WP | Możesz być drożej od Wixa, taniej od agencji |
| Churn strony = **śmierć biznesu** one-shot | MRR = przewidywalność, wyższa wycena firmy |
| Portfolio *odzaraz* | Cross-sell: HACCP klient → strona + opieka bundle |

**Nie musisz** rezygnować z one-time 2490/4990 — MRR to **druga warstwa**, nie zamiennik.

---

## 2. Trzy modele monetyzacji (rdzeń)

```
MODEL A — KLASYCZNY (obecny)
  Jednorazowo: 1490–14990 zł
  Opcjonalnie: Opieka 299/mc

MODEL B — WaaS (Website as a Service) ★ rekomendowany upsell
  Niski setup + obowiązkowy abonament 12 mc min
  Hosting u was + domena w bundle

MODEL C — PURE SUB (jak Wix) — P2, ryzykowne na start
  0–490 setup + 199–399/mc na zawsze
  Tylko landing / wizytówka
```

**Rekomendacja launch:** **A + B** równolegle. C na landing po 50 klientach WaaS.

---

## 3. MODEL B — WaaS: pakiety szczegółowo

### Filozofia cenowa

| Składnik | Koszt wasz (szac.) | Cena klient | Marża |
|----------|-------------------|-------------|-------|
| Hosting WP (slot na VPS) | 8–15 zł/mc | w bundle | wysoka przy skali |
| Domena .pl / rok | ~50 zł | 8 zł/mc amort. | niska |
| Update WP + backup | 20–40 min/mc | w bundle | średnia |
| Support mail | zmienny | w bundle | skaluje z procesem |
| **Razem COGS** | **~25–50 zł/mc** | | |

Przy **99 zł/mc** marża ~50–70 zł/mc **jeśli** proces zautomatyzowany.  
Przy **149 zł/mc** komfortowe.  
Przy **299 zł/mc** (Opieka Lite) — jak rynek, więcej scope.

### Propozycja pakietów WaaS (do katalogu)

| Pakiet | Setup (jednorazowo) | Abonament/mc | Min. okres | Co zawiera |
|--------|---------------------|--------------|------------|------------|
| **WaaS Landing** | **490 zł** | **99 zł** | 12 mc | 1 strona LP, hosting u nas, SSL, domena .pl (1. rok w setup), update WP, backup tyg., 1h prac/rok |
| **WaaS Start** | **990 zł** | **149 zł** | 12 mc | do 5 podstron, j.w. + GA4, formularze |
| **WaaS Sklep** | **2 990 zł** | **249 zł** | 12 mc | Woo do 50 prod., hosting, backup dzien., update, monitoring sklepu |
| **WaaS Pro** | **1 990 zł** | **199 zł** | 12 mc | do 10 podstron, backup dzien., 1h prac/mc w abonamencie |

**Twój pomysł 500 + 99/mc** ≈ **WaaS Landing** — sensowny. 490 brzmi bardziej productized niż 500.

### Alternatywa: „Build OR Subscribe”

| Ścieżka | Klient płaci | Dla kogo |
|---------|--------------|----------|
| **Kupuję** | 2490 jednorazowo + hosting osobno | Chce własność, własny hosting |
| **Wynajmuję** | 990 setup + 149/mc × 12 min | Chce all-in, mały budżet start |
| **Po 12 mc** | Przejście na 99/mc utrzymanie LUB wykup „własności” 990 zł | Retention + exit |

---

## 4. Co dokładnie jest „u nas na hostingu”

### Architektura (docelowa)

```
Coolify VPS (klient WP)
  ├── stronyodzaraz.pl (Next.js)     ← już jest
  ├── wp-clients/                    ← NOWE
  │     ├── klient-a → WP + domena
  │     ├── klient-b → WP multisite lub osobne kontenery
  └── backup S3 / restic co noc
```

**Opcje techniczne:**

| Opcja | Pro | Con |
|-------|-----|-----|
| **1 WP = 1 kontener** | izolacja, bezpieczeństwo | więcej RAM |
| **Multisite WP** | tanio | jeden hack = wszyscy |
| **Osobny tani VPS per 10 klientów** | skala | ops |

**Launch:** max **20–30 klientów WaaS** na jednym VPS 8GB — potem shard.

### Domena

| Model | Opis |
|-------|------|
| **Rekomendowany** | Domena **na klienta** (On behalf) — wy rejestrujecie, fakturujecie w setup; **właściciel formalny: klient** (NIP w WHOIS jeśli możliwe) |
| **Alternatywa** | Subdomena `klient.stronyodzaraz.pl` — tylko ultra-budget, **słabe SEO** |

**W bundle WaaS:** domena .pl rok 1 w setup, od roku 2: **99 zł/rok** lub wliczone w 149/mc.

### Co NIE dajecie w 99 zł/mc

- Nowe podstrony (→ godzina 150 zł lub upgrade plan)
- Copywriting
- Kampanie Ads
- Poczta `@domena.pl` (upsell Workspace 299 setup + klient płaci Google)

---

## 5. Unit economics — czy się spina?

### Scenariusz: 100 klientów WaaS Landing (490 + 99/mc)

| Pozycja | Miesięcznie |
|---------|------------|
| MRR | 9 900 zł |
| COGS hosting+backup (~35×100) | -3 500 zł |
| Support (0,5h/klient/rok amort.) | -2 000 zł |
| **Marża brutto** | **~4 400 zł/mc** |
| Setup jednorazowy (nowych 8/mc × 490) | +3 920 zł/mc średnio |

**Po 12 mc:** sam MRR ~10k przy 100 klientach = **biznes utrzymywalny** obok one-shot.

### Scenariusz: mix docelowy (rok 1)

| Strumień | Udział | Przychód/mc (cel) |
|----------|--------|-------------------|
| One-shot strony/sklepy | 60% | 45 000 zł |
| MRR opieka + WaaS | 30% | 22 500 zł |
| Integracje/Ads | 10% | 7 500 zł |
| **Razem** | | **~75 000 zł/mc** |

MRR 30% = **~22k** → np. 80 klientów × 149 + 30 × 299 opieka.

---

## 6. Jak przyciągnąć ludzi do MRR (lejek)

### A. Pre-checkout (PDP)

```
□ Dodaj hosting i opiekę — 149 zł/mc (pierwsze 12 mc w cenie bundle -20%)
  Oszczędzasz konfigurację DNS i update'y — my trzymamy stronę online.
```

Checkbox **pre-checked NIE** (RODO/UX) — default unchecked, copy z ceną.

### B. Post-purchase (najskuteczniejsze)

| Moment | Oferta |
|--------|--------|
| **Sukces Stripe** | „Dodaj WaaS teraz — pierwszy mc -50%” |
| **D+3 drip** | „Co jeśli hosting wygaśnie?” → WaaS |
| **D+14 po oddaniu** | „Przenieś na opiekę — 299/mc, pierwszy mc gratis” |
| **D+330** | „Domena wygasa za 35 dni” → renewal bundle |

### C. Pricing psychology

| Technika | Implementacja |
|----------|---------------|
| **Anchor** | Pokaż one-shot 2490 obok WaaS 990+149×12 = 2678 (porównywalne, ale rozłożone) |
| **Loss aversion** | „Bez opieki: średni koszt naprawy po hacku 1500–3000 zł” |
| **Default plan** | WaaS Start jako „Najczęściej wybierany” na landingach |
| **Exit offer** | Anulacja po 12 mc OK; wcześniej — opłata setup discount clawback 200 zł |

### D. Segmenty → który MRR

| Segment | Produkt MRR |
|---------|-------------|
| Nowa firma, mały budżet | WaaS Landing 490+99 |
| Restauracja po HACCP | WaaS Start + cross bundle |
| Sklep | WaaS Sklep 249/mc — **must** (więcej ryzyka) |
| „Mam developera” | Opieka Lite 299 bez hostingu u was |
| Po Wix failure | Migracja 1990 + WaaS Start |

### E. Cross-sell portfolio

Mail do klientów haccpnajuz:
> „Masz dokumentację HACCP — czas na stronę z rezerwacją. Pakiet od 490 zł + 99 zł/mc — hosting i domena po naszej stronie.”

---

## 7. Porównanie z rynkiem (research)

| Gracz | Model recurring | vs wy |
|-------|-----------------|-------|
| **Wix/WebWave** | 39–149 zł/mc DIY | Wy: drożej, ale **oni robią**, nie klient |
| **WebyJuice** | Opieka 299/mc | Wy: WaaS 99–149 all-in **tańsze wejście** |
| **Becht** | Opieka / hosting osobno | Wy: jeden checkout bundle |
| **home.pl** | hosting 15–50/mc bez opieki WP | Wy: WP maintenance w cenie |
| **Agencja** | 200–800/mc retainer | Wy: productized scope, bez godzinówek |

**Luka rynkowa:** **„Wix cena, agencja wykonanie, hosting wliczony”** — mało kto robi productized WaaS z publicznym cennikiem.

---

## 8. Stripe — implementacja płatności recurring

| Element | Rozwiązanie |
|---------|-------------|
| Setup fee | Stripe Checkout `mode: payment` |
| Abonament | Stripe **Billing** — Subscription z `trial` lub start po wdrożeniu |
| Min. 12 mc | Subscription schedule **lub** klauzula regulamin + roczna prepaid (-10%) |
| Faktura | Stripe Invoice + Fakturownia API |
| Anulacja | Portal klienta Stripe Customer Portal |
| Failed payment | D+3 retry → D+7 pause site (soft) → D+14 offboarding |

**Flow:**
1. Klient wybiera WaaS Landing w katalogu
2. Płaci 490 zł setup
3. Po oddaniu strony (webhook `project.delivered`) → email „Aktywuj opiekę” → Stripe Subscription 99/mc
4. **Lub:** checkout z line items: setup + subscription w jednym (Stripe mixed cart)

Env: `STRIPE_PRICE_WAAS_LANDING_SETUP`, `STRIPE_PRICE_WAAS_LANDING_MONTHLY`

---

## 9. Retencja i churn

| Cel | Metryka |
|-----|---------|
| Churn miesięczny WaaS | < 5% |
| Attach rate opieka (one-shot → MRR) | > 30% w 90 dni |
| LTV WaaS 24 mc | 99×24 + 490 = **2866 zł** |

### Dlaczego odchodzą (i fix)

| Powód churn | Fix |
|-------------|-----|
| „Za drogo” | Downgrade do 99 hosting-only |
| „Sam ogarnę” | Wykup własności + export 990 zł |
| Zamknięcie firmy | — |
| Słaba strona nie daje leadów | Upsell Ads, nie winien MRR |
| Nie używają | Raport kwartalny „Twoja strona: 847 wizyt” |

### Powody powrotu (win-back)

- D+60 po anulacji: „Reaktywacja — pierwszy mc 49 zł”
- Hack na self-host → „Migracja + opieka 199/mc pierwsze 3 mc”

---

## 10. Regulamin / prawne (must before launch WaaS)

- [ ] Subskrypcja: okres, wypowiedzenie, co po anulacji (export DB? 30 dni grace?)
- [ ] Własność treści: klient; własność kodu/motywu: licencja na czas trwania / wykup
- [ ] SLA uptime (realistyczne 99,5%, nie 99,99%)
- [ ] Limit prac w pakiecie (1h/mc Pro — więcej = dopłata)
- [ ] RODO: hosting = processor, umowa powierzenia

---

## 11. Roadmap MRR (fazy)

| Faza | Kiedy | Co |
|------|-------|-----|
| **0** | Launch | Opieka 299/mc one-shot upsell + drip (bez hostingu u was) |
| **1** | +2 mc | WaaS Landing 490+99 — **10 klientów pilot**, jeden VPS WP |
| **2** | +6 mc | WaaS Start/Sklep, Stripe Billing auto, portal klienta |
| **3** | +12 mc | 100+ MRR klientów, multisite lub shard VPS, prepaid roczne -10% |
| **4** | +18 mc | Partnerzy (księgowi) sprzedają WaaS white-label? |

---

## 12. Kiedy NIE sprzedawać WaaS

- Klient chce **własny VPS** i IT w firmie
- Sklep **>500 zamówień/mc** — dedykowany hosting
- Branża regulowana wymagająca on-prem
- Klient pyta tylko o najtańsze — daj one-shot landing bez MRR, bez marży na support

---

## 13. KPI dashboard MRR

| Metryka | Cel 6 mc | Cel 12 mc |
|---------|----------|-----------|
| MRR total | 8 000 zł | 25 000 zł |
| Nowe subskrypcje/mc | 8 | 15 |
| Churn/mc | <6% | <4% |
| ARPU MRR | 140 zł | 165 zł |
| Attach rate (strona→MRR) | 25% | 35% |
| CAC payback MRR | <4 mc | <3 mc |

---

## 14. Jedno zdanie

> **Sprzedaj stronę raz tanio w setupie, zarabiaj 24 miesiące na hostingu i spokoju klienta — bo landing kosztuje was 4 godziny, a lęk przed hackiem i DNS trwa wiecznie.**

---

*Cennik JSON: [content/mrr-pakiety.json](./content/mrr-pakiety.json) · Upsell: UPSELL-CROSSSELL.md*
