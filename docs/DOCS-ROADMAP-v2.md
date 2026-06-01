# Dokumentacja — co jeszcze da się pisać (v2)

**Stan ogólny:** ~**88%** na launch + auto-delivery. Reszta to **specy kodu**, platformy alternatywne i content operacyjny post-launch.

**Indeks:** [DOCS-INDEX.md](./DOCS-INDEX.md)

---

## ✅ Domknięte (nie duplikuj)

| Warstwa | Docs |
|---------|------|
| Strategia / marketing / psychologia | 15+ plików |
| SEO architektura | SEO-*, docs/seo/*.json |
| UX / copy / sekcje | UI-UX, UKLAD, content/* |
| Prawo / umowy / komunikacja | DOKUMENTY-PRAWNE, KOMUNIKACJA, EMAIL-* |
| Operacje / SOP / support | PROCES, ONBOARDING, SUPPORT-* |
| Finanse / konkurencja / MRR | UNIT-ECONOMICS, KONKURENCJA, MRR |
| Auto-delivery stack | DELIVERY-STACK-*, AUTOMATYZACJA, templates-manifest |

---

## 📝 Sensowne do dopisania (docs → potem kod)

| Priorytet | Doc | Po co |
|-----------|-----|-------|
| **P0** | [BUILD-SITE-SCRIPT-SPEC.md](./BUILD-SITE-SCRIPT-SPEC.md) | pseudokod build engine krok po kroku |
| **P0** | [ADMIN-PANEL-SPEC.md](./ADMIN-PANEL-SPEC.md) | `/admin/orders` — statusy, retry, approve |
| **P0** | [API-INTERNAL-SPEC.md](./API-INTERNAL-SPEC.md) | cron build/qa/callback — kontrakty HTTP |
| **P1** | [DELIVERY-STACK-SHOPIFY-SHOPER.md](./DELIVERY-STACK-SHOPIFY-SHOPER.md) | sklepy non-WP |
| **P1** | [INSTAWP-INTEGRACJA.md](./INSTAWP-INTEGRACJA.md) | MVP path API + webhook |
| **P1** | [content/site-spec-example.json](./content/site-spec-example.json) | przykład AI output |
| **P2** | [BLOG-POROWNANIA-OUTLINES.md](./BLOG-POROWNANIA-OUTLINES.md) | 10 artykułów vs konkurencja |
| **P2** | [RUNBOOK-AWARIE.md](./RUNBOOK-AWARIE.md) | P0 playbook techniczny |
| **P2** | [DNS-KLIENT-INSTRUKCJE.md](./DNS-KLIENT-INSTRUKCJE.md) | szablony maili DNS dla klienta |
| **P2** | [SZKOLENIE-WP-SCRIPTS.md](./SZKOLENIE-WP-SCRIPTS.md) | Loom outline 30 min |
| **P3** | DELIVERY-STACK-STATIC.md | Astro landing ultra-light |
| **P3** | FAKTURY-WFIRMA.md | integracja księgowa (poza repo) |

---

## 👤 Tylko od Ciebie (nie AI docs)

- Logo, zdjęcia zespołu, real case study (nie mock)
- Review prawnik regulaminu
- Decyzja: InstaWP MVP vs self-hosted day-1
- Kto robi projekty (capacity SOP)
- GSC dane → serp-baseline.json

---

## 💻 Docs skończone gdy kod istnieje

Te pliki mają sens **po** implementacji (albo jako spec przed — zaznaczone P0):

| Feature | Spec doc | Kod |
|---------|----------|-----|
| Build pipeline | BUILD-SITE-SCRIPT-SPEC | `scripts/build-site.mjs` |
| Admin | ADMIN-PANEL-SPEC | `app/admin/*` |
| SiteSpec | DELIVERY-STACK-AI-QA | `lib/site-spec/*` |
| /wykonane | WYKONANE-PORTFOLIO | routes |
| Blog cron | BLOG-AUTOMAT | `/api/cron/blog` |

**Reguła:** jak spec P0 gotowy → **stop docs, start kod** dla tego modułu.

---

## Metryka

| Warstwa | Było | Teraz |
|---------|------|-------|
| Biznes / marketing | 95% | 95% |
| SEO | 95% | 95% |
| Operacje / prawo | 90% | 92% |
| Auto-delivery | 60% | **88%** |
| **Implementacja spec** | 40% | **75%** (po tej fali P0) |
| Kod zsynchronizowany | ~50% | ~50% |

---

## Kiedy przestać pisać docs

```
✅ Spec BUILD + ADMIN + API internal gotowe
✅ Regulamin/polityka wklejone w app/
→ IMPLEMENTACJA do pierwszego auto-stagingu
→ docs tylko przy zmianie scope
```

---

*Poprzedni audyt: [DOCS-LUKI.md](./DOCS-LUKI.md)*
