# Stripe — setup stronyodzaraz.pl

**Powiązane:** ENV-ALL-SHOPS.md · MRR-STRATEGIA.md · REGULAMIN-USLUG-WEB.md

---

## 1. Konto

- Dashboard: Stripe (PL) · tryb **Test** → potem **Live**
- Business: ByteBazaar Paweł Wenderlich, NIP 7282882108
- Webhook endpoint: `https://stronyodzaraz.pl/api/webhook`

---

## 2. Produkty one-shot (Checkout)

| Product name | Price ID env | Kwota brutto | Typ |
|--------------|--------------|--------------|-----|
| Pakiety z katalogu | dynamic z DB/catalog | per PDP | `payment` |

**Implementacja:** `priceGrosze` z katalogu → Stripe Price API on-the-fly lub pre-sync script.

### Test cards

- Success: `4242 4242 4242 4242`
- 3DS: `4000 0025 0000 3155`
- Decline: `4000 0000 0000 0002`

---

## 3. WaaS Subscriptions

| Plan | Setup Price | Monthly Price | Env vars |
|------|-------------|---------------|----------|
| WaaS Landing | 49000 groszy | 9900 groszy | `STRIPE_WAAS_LANDING_SETUP`, `STRIPE_WAAS_LANDING_MONTHLY` |
| WaaS Start | 99000 | 14900 | `STRIPE_WAAS_START_*` |
| WaaS Sklep | 299000 | 24900 | `STRIPE_WAAS_SKLEP_*` |
| Opieka Lite | — | 29900 | `STRIPE_OPIEKA_LITE_MONTHLY` |

**Flow mixed cart:**
```javascript
mode: 'subscription',
line_items: [
  { price: SETUP_PRICE_ID, quantity: 1 },
  { price: MONTHLY_PRICE_ID, quantity: 1 }
],
subscription_data: { trial_period_days: 0 } // start after deliver — use webhook to create sub later
```

**Rekomendacja:** Setup `payment` osobno → po `DELIVERED` email z linkiem Subscription Checkout.

---

## 4. Webhook events

| Event | Akcja |
|-------|-------|
| `checkout.session.completed` | Order PAID, email brief |
| `invoice.paid` | Renew MRR log |
| `invoice.payment_failed` | D+3 mail, WAAS-HOSTING-OPS |
| `customer.subscription.deleted` | Offboarding queue |
| `charge.dispute.created` | CHARGEBACK-SOP |

**Secret:** `STRIPE_WEBHOOK_SECRET` w env.

---

## 5. Customer Portal

Włącz w Stripe Dashboard:
- Update payment method
- Cancel subscription (po min 12 mc — manual override lub Stripe metadata)
- View invoices

Link w emailach opieki.

---

## 6. Faktury VAT

- Stripe Invoicing + pola NIP w checkout (`customer_tax_id`)
- Integracja Fakturownia — backlog P2

---

## 7. Checklist live

- [ ] Business verified
- [ ] Webhook live secret
- [ ] Test purchase 1 PLN pakiet
- [ ] Test refund flow
- [ ] Regulamin link w checkout
- [ ] Statement descriptor: `STRONYODZARAZ`

---

*WaaS pakiety: content/mrr-pakiety.json*
