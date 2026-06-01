# Indeks: szkielet → treść → kod

**Status:** ✅ kompletne na launch (2026-05-31)

---

## Mapa główna

| Szkielet | Plik treści | Kod | Status |
|----------|-------------|-----|--------|
| Demo / demo-mockups | `demo-mockups.json` | DemoShowcase, /demo | ✅ |
| Wykonane 17 | `wykonane-katalog.json` + `wykonane-mocki.json` | /wykonane | ✅ |
| Sekcje home | `TRESCI-SEKCJI.md` | app/page.tsx | ✅ |
| /o-nas | `TRESCI-O-NAS.md` | app/o-nas | ✅ |
| /technologia | `technologia-sekcje.json` | app/technologia | ✅ |
| Emails | `TRESCI-EMAILS.json` + `EMAIL-MAPIOWANIE.json` | lib/email.ts | ✅ partial kod |
| Support | `SUPPORT-SZABLONY-ODPOWIEDZI.json` | Gmail manual | ✅ |
| Meta SEO | `meta-szablony.json` | lib/seo/metadata.ts | ✅ |
| Compare Start/Pro | `compare-start-pro.json` | CompareStartPro | ✅ |
| PDP → showcase | `pdp-showcase-map.json` | PDP link box | ✅ |
| Upsell | `upsell-map.json` | lib/upsell.ts | ✅ |
| Featured | `featured-products.json` | lib/featured-products.ts | ✅ |
| WaaS katalog | `waas-katalog-slugs.json` + `mrr-pakiety.json` | services-catalog | ✅ |
| MRR copy | `TRESCI-MRR.md` | WaaS pages | ✅ |
| Regulamin | `REGULAMIN-USLUG-WEB.md` | app/regulamin | ✅ doc → 💻 kod |
| Polityka | `POLITYKA-PRYWATNOSCI.md` | app/polityka-prywatnosci | ✅ doc → 💻 kod |
| Umowy PDF | `UMOWA-*.md`, `PROTOKOL-*.md` | — wysyłka manual | ✅ |
| WaaS legal | `REGULAMIN-WAAS.md` | checkout WaaS | ✅ |
| SOP | `PROCES-REALIZACJI-SOP.md` | — internal | ✅ |
| SERP baseline | `serp-baseline.json` | — post-launch | 🔶 szablon |

---

## Kolejność implementacji

```
1. lib/wykonane-content.ts ← wykonane-mocki.json + wykonane-katalog.json
2. lib/email.ts ← TRESCI-EMAILS.json
3. lib/seo/metadata.ts ← meta-szablony.json
4. app/regulamin + polityka ← REGULAMIN + POLITYKA-PRYWATNOSCI
5. lib/email.ts ← TRESCI-EMAILS + EMAIL-MAPIOWANIE (backlog funkcji)
6. app/wykonane + /demo + /technologia
7. UpsellBox ← upsell-map.json
8. Stripe ← STRIPE-SETUP.md
```

---

*Audyt: [DOCS-LUKI.md](./DOCS-LUKI.md)*
