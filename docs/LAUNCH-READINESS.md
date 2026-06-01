# Launch readiness — stronyodzaraz.pl

> **Pełny checklist:** [PROJEKT-KOMPLETNY.md](./PROJEKT-KOMPLETNY.md)  
> **Po launch:** [MONITORING-MINIMAL.md](./MONITORING-MINIMAL.md)  
> **Indeks docs:** [DOCS-INDEX.md](./DOCS-INDEX.md)

| Sklep | Folder | Domena | Cena wejścia |
|-------|--------|--------|--------------|
| HACCP | `haccp-sklep/` | **haccpnajuz.pl** | 199 zł |
| BHP | `ocenaryzyka/` | **bhpodzaraz.pl** | 179 zł |
| Regulaminy | `regulaminygotowe/` | **gotowyregulamin.pl** | 149 zł |
| **Strony WWW** | `stronyodzaraz/` | **stronyodzaraz.pl** | od 990 zł |

---

## Skrót pre-prod (odhacz przed deploy)

### Build
- [ ] `npm run build` — zero błędów
- [ ] Logo w `public/images/brand/`
- [ ] ~435 URL (SCOPE-JEDNORAZOWY.md)

### Infra
- [ ] DNS A → `57.131.49.251`
- [ ] Coolify app + DB + SSL
- [ ] Cron process + drip
- [ ] `.env` live (ENV-ALL-SHOPS.md)

### Płatności i mail
- [ ] Stripe live + webhook
- [ ] Resend DNS (SPF, DKIM, **DMARC**)
- [ ] Smoke checkout + kontakt

### SEO jednorazowo
- [ ] sitemap.xml OK
- [ ] llms.txt = OFERTA.md ceny
- [ ] GSC sitemap
- [ ] GA4
- [ ] IndexNow batch

### Prawne
- [ ] Regulamin usług web (nie HACCP)
- [ ] RODO + NIP

---

## ENV skrót

```env
DATABASE_URL="postgresql://..."
STRIPE_SECRET_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."
RESEND_API_KEY="re_..."
SITE_URL="https://stronyodzaraz.pl"
NEXT_PUBLIC_BASE_URL="https://stronyodzaraz.pl"
CONTACT_EMAIL="kontakt@bblikh.pl"
CRON_SECRET="..."
NEXT_PUBLIC_GA_ID="G-..."
INDEXNOW_KEY="..."   # opcjonalnie — plik public/{key}.txt
```

Pełny szablon: [`../.env.example`](../.env.example) · [ENV-ALL-SHOPS.md](./ENV-ALL-SHOPS.md)

---

*Ten plik to skrót. Szczegóły: PROJEKT-KOMPLETNY.md*
