# Luki dokumentacji — audyt (domknięty)

**Stan:** dokumentacja **~92%** · implementacja spec **~80%** · 2026-05-31  
**Roadmap co dalej:** [DOCS-ROADMAP-v2.md](./DOCS-ROADMAP-v2.md)

**Indeks:** [DOCS-INDEX.md](./DOCS-INDEX.md)

---

## ✅ Uzupełnione w tej fali

### Prawne
- [REGULAMIN-USLUG-WEB.md](./REGULAMIN-USLUG-WEB.md)
- [REGULAMIN-WAAS.md](./REGULAMIN-WAAS.md)
- [POLITYKA-ZWROTOW.md](./POLITYKA-ZWROTOW.md)
- [RODO-POWIERZENIE-SZABLON.md](./RODO-POWIERZENIE-SZABLON.md)
- [CHARGEBACK-SOP.md](./CHARGEBACK-SOP.md)

### Operacje
- [PROCES-REALIZACJI-SOP.md](./PROCES-REALIZACJI-SOP.md)
- [ONBOARDING-KLIENTA.md](./ONBOARDING-KLIENTA.md)
- [HANDOVER-CHECKLIST.md](./HANDOVER-CHECKLIST.md)
- [WAAS-HOSTING-OPS.md](./WAAS-HOSTING-OPS.md)
- [SUPPORT-SLA.md](./SUPPORT-SLA.md)
- [BRIEF-DECISION-TREE.md](./BRIEF-DECISION-TREE.md)
- [SZABLONY-WP-BIBLIOTEKA.md](./SZABLONY-WP-BIBLIOTEKA.md)

### Tech
- [STRIPE-SETUP.md](./STRIPE-SETUP.md)
- [SCHEMA-MAP.md](./SCHEMA-MAP.md)
- [INDEXNOW-SETUP.md](./INDEXNOW-SETUP.md)

### Marketing / finanse
- [PARTNER-PROGRAM.md](./PARTNER-PROGRAM.md)
- [ADS-KREACJE.md](./ADS-KREACJE.md)
- [SOCIAL-PLAYBOOK.md](./SOCIAL-PLAYBOOK.md)
- [UNIT-ECONOMICS.md](./UNIT-ECONOMICS.md)
- [MARZA-PAKIETY.md](./MARZA-PAKIETY.md)
- [FINANSE-PROGNOZA.md](./FINANSE-PROGNOZA.md)

### Content JSON/MD
- [content/TRESCI-O-NAS.md](./content/TRESCI-O-NAS.md)
- [content/TRESCI-EMAILS.json](./content/TRESCI-EMAILS.json) — 18 szablonów
- [content/EMAIL-MAPIOWANIE.json](./content/EMAIL-MAPIOWANIE.json)
- [content/SUPPORT-SZABLONY-ODPOWIEDZI.json](./content/SUPPORT-SZABLONY-ODPOWIEDZI.json)
- [content/wykonane-mocki.json](./content/wykonane-mocki.json)
- [content/pdp-showcase-map.json](./content/pdp-showcase-map.json)
- [content/meta-szablony.json](./content/meta-szablony.json)
- [content/compare-start-pro.json](./content/compare-start-pro.json)
- [content/waas-katalog-slugs.json](./content/waas-katalog-slugs.json)
- [content/serp-baseline.json](./content/serp-baseline.json) — szablon pre-launch

---

### Prawne + komunikacja (pełne)
- [DOKUMENTY-PRAWNE-MASTER.md](./DOKUMENTY-PRAWNE-MASTER.md)
- [KOMUNIKACJA-KLIENT-MASTER.md](./KOMUNIKACJA-KLIENT-MASTER.md)
- [UMOWA-USLUG-WEB-SZABLON.md](./UMOWA-USLUG-WEB-SZABLON.md) · [UMOWA-WAAS-SZABLON.md](./UMOWA-WAAS-SZABLON.md)
- [POLITYKA-PRYWATNOSCI.md](./POLITYKA-PRYWATNOSCI.md) · [ZGODY-CHECKOUT.md](./ZGODY-CHECKOUT.md)
- [PROTOKOL-ODBIORU-SZABLON.md](./PROTOKOL-ODBIORU-SZABLON.md) · [OSWIADCZENIE-PRAWA-MATERIALOW.md](./OSWIADCZENIE-PRAWA-MATERIALOW.md)

### Email + support
- [EMAIL-SYSTEM-MASTER.md](./EMAIL-SYSTEM-MASTER.md) · RESEND · TRANSAKCJE-EMAIL-FLOW
- [SUPPORT-PLAYBOOK.md](./SUPPORT-PLAYBOOK.md)

### Auto-delivery + implementacja spec
- [DELIVERY-STACK-MASTER.md](./DELIVERY-STACK-MASTER.md) + WORDPRESS / INFRA / AI-QA
- [BUILD-SITE-SCRIPT-SPEC.md](./BUILD-SITE-SCRIPT-SPEC.md)
- [ADMIN-PANEL-SPEC.md](./ADMIN-PANEL-SPEC.md)
- [API-INTERNAL-SPEC.md](./API-INTERNAL-SPEC.md)
- [INSTAWP-INTEGRACJA.md](./INSTAWP-INTEGRACJA.md)
- [DELIVERY-STACK-SHOPIFY-SHOPER.md](./DELIVERY-STACK-SHOPIFY-SHOPER.md)
- [content/site-spec-example.json](./content/site-spec-example.json)
- [BLOG-POROWNANIA-OUTLINES.md](./BLOG-POROWNANIA-OUTLINES.md)

---

## 👤 Od Ciebie (nie da się w docs)

| Element | Akcja |
|---------|-------|
| Logo | `public/images/brand/` |
| Review regulaminu | prawnik opcjonalnie |
| WaaS day-1 vs +2 mc | decyzja biznesowa |
| Kto realizuje projekty | wpływa na SOP capacity |

---

## 💻 Kod — poza dokumentacją

| Element | Doc |
|---------|-----|
| `app/regulamin` ← REGULAMIN-USLUG-WEB | wkleić treść |
| `/wykonane`, `/demo`, `/technologia` | WYKONANE-PORTFOLIO |
| `lib/wykonane-content.ts` | wykonane-mocki.json |
| Blog cron, local SEO, upsell | PROJEKT-KOMPLETNY FAZA A |
| Stripe products live | STRIPE-SETUP |

---

## 📊 Po launch

1. Uzupełnij `content/serp-baseline.json` z GSC
2. `content/konkurencja-gracze.json` — SERP scrape
3. Case study → nowy typ w wykonane-katalog

---

## Metryka kompletności (po fali)

| Warstwa | % |
|---------|---|
| Strategia / marketing | **95%** |
| SEO / content plan | **95%** |
| UX / copy | **95%** |
| Treści JSON | **95%** |
| Auto-delivery stack | **88%** |
| Implementacja spec (API, admin, build) | **80%** |
| Kod zsynchronizowany | **~50%** |

**Stop docs gdy:** BUILD + ADMIN + API spec ✅ → **kod**

**Następny krok:** implementacja build pipeline lub InstaWP MVP.

---

*Poprzedni audyt: sekcje 1–12 zastąpione tym podsumowaniem.*
