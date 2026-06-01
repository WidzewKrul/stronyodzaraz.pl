# stronyodzaraz.pl — wizja biznesowa

**Domena:** https://stronyodzaraz.pl  
**Model:** productized software house / agencja web B2B  
**Cena wejścia (marketing):** od 990 zł (Google Ads setup) · strony od 1 490 zł (landing) · katalog od 990 zł w portfolio  
**Stack produktu:** Next.js 15, Stripe Checkout, Resend, PostgreSQL, Coolify

---

## 1. Misja

**Strony od zaraz** — dostarczamy firmom w Polsce gotowe pakiety stron WWW, sklepów i usług marketingowych z **jasną ceną online**, bez tygodni wycen i „odezwę się z ofertą”.

Misja w jednym zdaniu: *Skrócić drogę od „potrzebuję strony/sklepu” do uruchomienia produkcji z 7–14 dni realizacji i pełną transparentnością scope.*

---

## 2. Problem rynkowy (dlaczego teraz)

| Ból klienta | Jak to wygląda dziś | Nasza odpowiedź |
|-------------|---------------------|-----------------|
| Niepewna wycena | 3 agencje, 3 widełki 3k–30k | Fixed price w katalogu |
| Długi sales | Spotkania, briefy, negocjacje | Checkout + brief PDF po płatności |
| Scope creep | „To dopłata” po podpisaniu | In/out of scope w OFERTA.md |
| Techniczny chaos | WordPress bez aktualizacji → hack | Opieka techniczna od 299 zł/mc |
| Sklep PL | Integracje P24/InPost rozproszone | Pakiety z integracjami w cenie |

---

## 3. ICP (Ideal Customer Profile)

### Segment A — Mikro i małe firmy usługowe (priorytet 70%)

- **Wielkość:** 1–15 osób, obrót do ~5 mln PLN/rok  
- **Branże:** gastronomia, beauty, medycyna, prawo, budowlanka, transport, edukacja, fitness  
- **Decydent:** właściciel / manager operacyjny — nie CTO  
- **Trigger zakupu:** nowa firma, rebrand, stara strona na Wixu, kontrola konkurencji online, start kampanii Google  
- **Budżet:** 1 500–8 000 zł jednorazowo + opcjonalnie 300–800 zł/mc opieka  

### Segment B — E-commerce starter (20%)

- Pierwszy sklep lub migracja z marketplace (Allegro → własny sklep)  
- Platforma: WooCommerce / Shoper / Shopify — wybór w pakiecie  
- Trigger: sezon sprzedażowy, własna marka, uniezależnienie od prowizji marketplace  

### Segment C — Firmy z istniejącym WP (10%)

- Potrzeba: migracja, naprawa po ataku, CWV, integracja, abonament  
- Wyższy LTV przez opiekę techniczną i upsell integracji  

### Anti-ICP (nie obsługujemy w self-serve)

- Enterprise RFP, przetargi publiczne, aplikacje mobilne natywne, długie retainery bez scope  
- Projekty &gt; 50k PLN custom — kierować na kontakt / partnerów  

---

## 4. USP (Unique Selling Proposition)

1. **Cena i scope online** — ~1800 kombinacji branża × usługa × pakiet w katalogu `/uslugi`  
2. **Realizacja 7–14 dni** — productized timeline, nie „2–3 miesiące”  
3. **Polski e-commerce out-of-the-box** — Przelewy24, BLIK, InPost, regulamin, RODO w pakietach sklepowych  
4. **Jeden checkout** — Stripe, faktura, brief automatyczny  
5. **Portfolio rodziny „*odzaraz*”** — zaufanie z haccpnajuz.pl, bhpodzaraz.pl, gotowyregulamin.pl (cross-sell B2B)  

**Claim główny:** *„Wybierz pakiet, zapłać, oddajemy w terminie — bez ukrytych kosztów.”*

---

## 5. Model przychodów

| Strumień | ARPU | Marża brutto (szac.) | Udział docelowy |
|----------|------|----------------------|-----------------|
| Strony WWW (Start/Pro/Landing) | 1 490–4 990 zł | 55–70% | 45% |
| Sklepy (Woo/Shopify/Shoper) | 5 990–14 990 zł | 50–65% | 25% |
| Opieka techniczna (MRR) | 299–799 zł/mc | 70–80% | 15% (LTV) |
| Marketing setup (Ads/GA4) | 990–2 490 zł | 60% | 8% |
| Integracje / migracje | 490–3 990 zł | 55% | 7% |

**Mechanika:**

- **Transakcyjny:** Stripe one-time → realizacja → 30 dni poprawek w scope  
- **Recurring:** opieka techniczna (docelowo Stripe Billing / faktura miesięczna)  
- **Upsell:** strona → opieka → Ads → integracje Allegro/BaseLinker  

**Unit economics (cel Rok 1):**

- CAC organic SEO: &lt; 150 zł  
- CAC paid: &lt; 400 zł przy AOV 3 500 zł  
- Payback: 1 zamówienie  

---

## 6. Pozycjonowanie konkurencyjne

### Mapa pozycji

```
                    WYSOKA CENA
                         │
    Agencje custom       │    Boutique / branding
    (5k–50k+, długi      │
     sales cycle)        │
                         │
TANI ────────────────────┼──────────────────── PREMIUM PRODUCTIZED
                         │              ★ stronyodzaraz.pl
    Freelancerzy         │    (fixed price, szybka realizacja)
    Fiverr / Useme       │
    (niska jakość PL)    │
                         │
                    NISKA CENA
```

### Konkurenci bezpośredni

| Typ | Przykłady | Nasza przewaga |
|-----|----------|----------------|
| Agencje lokalne | „Strony WWW Kraków” | Cena widoczna, szybciej |
| SaaS DIY | Wix, WebWave | Integracje PL, SEO, wsparcie |
| Marketplace usług | Useme, Fixly | Scope zdefiniowany, bez licytacji |
| Software house | 10+ osób | Brak min. budżetu 30k, self-serve |

### Konkurenci pośredni

- Hostinger / home.pl — hosting + „strona w 1 dzień” (słabe SEO, brak branżowości)  
- Shoper/Shopify PL — platforma, nie pełna realizacja „pod klucz”  

---

## 7. Propozycja wartości per kategoria

| Kategoria | Obietnica | KPI klienta |
|-----------|-----------|-------------|
| strony-internetowe | Strona gotowa w 7 dni | Formularze, telefony z www |
| sklepy-internetowe | Pierwsze zamówienie testowe | Konwersja checkout |
| wordpress | Stabilny WP | Uptime, brak hacków |
| shopify-shoper | Szybki start sprzedaży | Time-to-first-sale |
| reklama-marketing | Kampania z konwersjami | ROAS / CPA |
| opieka-techniczna | Spokój właściciela | Zero incydentów |
| integracje | Działające płatności/wysyłka | Odrzucone transakcje ↓ |
| migracje-naprawy | SEO zachowane po migracji | Ruch organiczny stabilny |

---

## 8. Roadmap biznesowy (12 miesięcy)

| Kwartał | Cel | Metryka |
|---------|-----|---------|
| Q2 2026 | Launch + 50 zamówień | 50 płatnych Stripe |
| Q3 2026 | pSEO 1800 URL indeksowanych | 10k sesji/mc organic |
| Q4 2026 | MRR opieka 30 klientów | 9k MRR |
| Q1 2027 | Partnerstwa (księgowi, doradcy) | 15% revenue affiliate |

---

## 9. Zasady marki

- **Język:** polski, konkretny, bez żargonu bez wyjaśnienia  
- **Ton:** partner techniczny, nie „kreatywna agencja z nagrodami”  
- **Kolor:** indigo `#4f46e5` — nowoczesny SaaS, odróżnienie od emerald portfolio HACCP  
- **Obietnice:** tylko to, co w scope pakietu (patrz OFERTA.md)  

---

## 10. Metryki sukcesu (North Star)

**North Star Metric:** liczba opłaconych zamówień z ukończonym briefem w 48h.

| Metryka | Cel 6 mc | Cel 12 mc |
|---------|----------|-----------|
| Zamówienia / mc | 30 | 80 |
| AOV | 3 200 zł | 3 800 zł |
| CR checkout | 2,5% | 3,5% |
| NPS po oddaniu | 45 | 55 |
| Churn opieka (mc) | &lt; 8% | &lt; 5% |

---

*Dokument żywy — aktualizuj przy zmianie cennika lub ICP. Powiązane: OFERTA.md, SEO-STRATEGIA.md, FUNNEL-MARKETING.md.*
