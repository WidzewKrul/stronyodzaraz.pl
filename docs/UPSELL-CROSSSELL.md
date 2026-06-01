# Upsell i cross-sell — macierz

**Cel:** zwiększyć AOV i LTV **automatycznie** — na PDP, w koszyku, w mailach drip, w blogu CTA.

---

## 1. Macierz główna (po zakupie / na PDP)

| Klient kupił | Upsell natychmiast (PDP/koszyk) | Cross-sell D+3 email | Cross-sell D+7 email |
|--------------|--------------------------------|----------------------|----------------------|
| **Strona Start** | → Pro (+2500 zł scope) | Google Ads setup 990 | Opieka WP 299/mc |
| **Strona Pro** | Copywriting (+990) | Google Ads | Opieka WP |
| **Landing** | → Start (+1000) | Strona pełna | Ads |
| **Sklep Start** | → Sklep Pro | Integracja P24/InPost jeśli brak | Opieka + Merchant Center |
| **Sklep Pro** | BaseLinker / Allegro | Ads Performance Max | Opieka |
| **WordPress wdrożenie** | Opieka 299/mc | CWV optymalizacja | Backup premium |
| **Google Ads setup** | Meta Ads 990 | Opieka kampanii (retainer) | Landing pod Ads |
| **Opieka WP** | Integracja / nowe podstrony | Audyt bezpieczeństwa | Sklep (jeśli B2C potential) |
| **Integracja P24** | InPost, GA4 | Kolejna integracja | — |
| **Migracja** | Opieka 12 mc promo | SEO audit | Ads |

---

## 2. UI — gdzie pokazać

### PDP — `UpsellBox` (do kodu)

```
┌─────────────────────────────────────┐
│ 💡 Często dokładane razem          │
│ Opieka WordPress — 299 zł/mc       │
│ [Dodaj do koszyka]  [Porównaj]     │
└─────────────────────────────────────┘
```

Reguły:
- Max **1 upsell** nad fold na PDP
- Related products poniżej = cross-sell ta sama branża (już jest)
- Upsell = **inna kategoria** komplementarna

### Koszyk

- Mini-suggest przed checkout: „Dodaj opiekę WP -10% przy pierwszym mc”
- Nie blokuj checkout — opcjonalny checkbox

### Blog CTA box (szablon markdown)

```markdown
---
**Potrzebujesz {usługa}?** Pakiet od {cena} zł — [Zobacz w katalogu](/uslugi/...).
---
```

OpenRouter prompt wstawia automatycznie.

---

## 3. E-mail drip (już jest szkielet)

Plik: `lib/email.ts` → `sendDripUpsellEmail`

**Rozszerzyć copy per `order.category`:**

| Day | Temat maila | CTA |
|-----|-------------|-----|
| D+3 | „Ochrona strony po wdrożeniu” | opieka-techniczna |
| D+7 | „Pozyskaj klientów z Google” | google-ads-setup |

Mapowanie category → suggested slug: tabela w §1.

---

## 4. Bundle logic (opcjonalnie P2)

| Bundle | Skład | Cena promo | Oszczędność |
|--------|-------|------------|-------------|
| **WaaS Landing** | setup 490 + 99/mc ×12 min | — | MRR core — patrz MRR-STRATEGIA.md |
| **WaaS Start** | setup 990 + 149/mc ×12 min | — | all-in strona |
| **Start + Opieka 3 mc** | strona one-shot + opieka | -10% opieki | LTV bridge |
| **Sklep + Ads** | sklep start + ads setup | 6790 zamiast 6980 | 190 zł |
| **Pro + GA4 + Ads** | strona pro + analityka + ads | custom w katalogu |
| **Roczna prepaid WaaS** | 12 mc z góry | -10% | cashflow |

**WaaS szczegóły:** [MRR-STRATEGIA.md](./MRR-STRATEGIA.md) · [content/mrr-pakiety.json](./content/mrr-pakiety.json)

---

## 5. Cross-sell portfolio *odzaraz*

| Sytuacja klienta | Rekomendacja |
|------------------|--------------|
| Gastronomia + strona | haccpnajuz.pl w stopce maila |
| Sklep internetowy | gotowyregulamin.pl regulamin sklepu |
| Firma z pracownikami | bhpodzaraz.pl |

Nie agresywnie — 1 linia w drip „Zobacz też: …”.

---

## 6. FAQ upsell (obiekcje)

| Obiekcja | Odpowiedź |
|----------|-----------|
| „Nie teraz opieka” | OK, możesz dokupić później w katalogu |
| „Za drogi Pro” | Start wystarczy na start, upgrade możliwy |
| „Sam ogarnę Ads” | Pakiet setup = oszczędzasz 5–10h + błędy konwersji |

---

## 7. Implementacja backlog

- [ ] `lib/upsell.ts` — mapa category → suggestedUpsells[]
- [ ] `UpsellBox.tsx` na PDP
- [ ] Koszyk: optional addon
- [ ] Rozszerzyć `sendDripUpsellEmail` per category
- [ ] Blog prompt: CTA z upsell slug

---

*Powiązane: FUNNEL-MARKETING.md · KONTAKT-AUTOMAT.md · OFERTA.md*
