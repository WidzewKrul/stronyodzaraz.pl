# Analityka i konwersje (GA4 + Meta)

**Cel:** mierzyć lejek productized — od wejścia na PDP do `purchase` — bez śledzenia przed zgodą RODO.

**Powiązane:** FUNNEL-MARKETING.md §5 · MONITORING-MINIMAL.md · ConsentBanner w kodzie

---

## 1. Setup

| Element | Wartość |
|---------|---------|
| Property GA4 | `stronyodzaraz.pl` |
| Env | `NEXT_PUBLIC_GA_ID=G-XXXXXXXX` |
| Consent | GA4 ładuje się **po** akceptacji cookies (analytics) |
| Meta Pixel | opcjonalnie `NEXT_PUBLIC_META_PIXEL_ID` — ten sam consent gate |

---

## 2. Zdarzenia custom (dataLayer / gtag)

| Event | Kiedy | Params |
|-------|-------|--------|
| `view_item` | PDP mount | `item_id`, `item_name`, `price`, `item_category` |
| `view_item_list` | katalog / kategoria | `item_list_name` |
| `add_to_cart` | koszyk + | `items[]`, `value`, `currency: PLN` |
| `remove_from_cart` | koszyk − | `items[]` |
| `begin_checkout` | `/koszyk` submit | `value`, `items[]` |
| `add_payment_info` | Stripe redirect start | `payment_type: stripe` |
| `purchase` | `/sukces` | `transaction_id`, `value`, `items[]` |
| `generate_lead` | kontakt form OK | `form_name: contact` |
| `brief_started` | brief step 1 | `product_slug` |
| `brief_completed` | brief submit | `product_slug` |
| `select_content` | blog CTA box click | `content_type: cta_box`, `item_id: url` |
| `scroll_depth` | 50%, 90% blog | opcjonalnie P2 |

---

## 3. Konwersje w GA4 (oznacz jako conversion)

1. `purchase` — primary
2. `generate_lead` — secondary
3. `begin_checkout` — micro (opcjonalnie)
4. `brief_completed` — micro (post-purchase quality)

---

## 4. Lejek raportowania

```
Sessions
  → view_item (PDP)
  → add_to_cart
  → begin_checkout
  → purchase
```

**Benchmark docelowy:** CR session→purchase 2,5% (6 mc).

---

## 5. UTM conventions

| Kanał | utm_source | utm_medium | utm_campaign |
|-------|------------|------------|--------------|
| Google Ads brand | google | cpc | brand |
| Google Ads generic | google | cpc | strony-{cat} |
| Blog internal | (brak) | — | — |
| Portfolio cross | haccpnajuz | referral | footer |
| Email drip | resend | email | drip-d3-opieka |

---

## 6. Debug checklist (launch)

- [ ] Real-time: wejście na PDP → `view_item`
- [ ] Dodaj do koszyka → `add_to_cart`
- [ ] Test Stripe sandbox → `purchase` na sukces
- [ ] Odrzuć cookies → brak hitów GA4
- [ ] Akceptuj cookies → hity wracają
- [ ] GSC połączone z GA4

---

## 7. Co NIE śledzimy

- PII w event params (email, NIP)
- Brief field values
- Pełne query filtrów katalogu (noise)

---

*Marketing KPI: MARKETING-POZYCJONOWANIE.md §9 · Monitoring: MONITORING-MINIMAL.md*
