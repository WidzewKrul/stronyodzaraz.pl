# Domena, hosting, infrastruktura

**Dwa konteksty:** (A) **nasz** deploy stronyodzaraz.pl · (B) **klienta** — co dostaje w pakiecie vs upsell.

---

## A. Infrastruktura stronyodzaraz.pl (nasza)

### Domena

| Element | Wartość |
|---------|---------|
| Domena | `stronyodzaraz.pl` |
| Rejestrator | (twój — np. OVH, home.pl, Cloudflare Registrar) |
| DNS A `@` | `57.131.49.251` |
| www | CNAME `@` lub A ten sam |
| SSL | Coolify Let's Encrypt auto |
| E-mail operacyjny | `kontakt@bblikh.pl` (może być osobna skrzynka) |
| E-mail transakcyjny | `noreply@stronyodzaraz.pl` via Resend |

**Checklist domena:**
- [ ] Auto-renew włączone u rejestratora
- [ ] DNSSEC opcjonalnie
- [ ] Redirect www → apex lub odwrotnie (jeden canonical w Next)
- [ ] SPF + DKIM + **DMARC** dla Resend

### Hosting aplikacji

| Warstwa | Rozwiązanie |
|---------|-------------|
| App | Coolify na VPS `57.131.49.251` |
| Runtime | Next.js standalone, Node 20+ |
| DB | PostgreSQL (Coolify service) — zamówienia, briefy |
| Static assets | `public/` + Next image optimization |
| CDN (opcjonalnie) | Cloudflare przed VPS — cache, WAF, early hints |
| Backup DB | Coolify scheduled backup → S3/local |
| Monitoring | UptimeRobot + Coolify health |

**Nie potrzebujesz:** osobnego hostingu shared pod Next.js — wszystko na Coolify.

### Koszty infra (szac. miesięcznie)

| Pozycja | Koszt |
|---------|-------|
| VPS (już masz na 3 sklepy) | marginalny +1 app |
| Domena .pl | ~50 PLN/rok |
| Resend | free tier → paid przy volume |
| OpenRouter blog | ~5 USD/rok |
| Stripe | % od transakcji |
| GA4, GSC, IndexNow | free |

---

## B. Co klient dostaje — domena i hosting w pakietach

### Model domyślny (productized)

| Element | Start / Pro | Kto właściciel | Uwagi |
|---------|-------------|----------------|-------|
| **Domena** | Klient kupuje | Klient | Pomożemy podłączyć DNS — w scope |
| **Hosting WP** | 12 mc w cenie Pro LUB osobno | Po 12 mc klient przedłuża | Upsell hosting |
| **SSL** | Tak | — | Let’s Encrypt |
| **Poczta firmowa** | **Poza scope** | — | Upsell lub Google Workspace |
| **Konto WP admin** | Tak, przekazujemy | Klient | Po oddaniu |

### Copy na stronie (/technologia, FAQ)

> **Domena:** rejestrujesz u dowolnego registrar (np. home.pl, OVH). Podajemy nameservery lub rekordy A — konfigurujemy w cenie pakietu.  
> **Hosting:** możemy zapewnić hosting WordPress na 12 miesięcy w pakiecie Pro lub jako abonament od 49 zł/mc.  
> **Własny serwer:** wdrożenie na Twoim VPS/hostingu — możliwe, wymaga dostępu SSH/FTP w briefie.

---

## C. Upsell — domena i hosting

| Usługa | Cena ref. | Slug w katalogu |
|--------|-----------|-----------------|
| Rejestracja domeny .pl (rocznie) | 79–99 zł | `domena-rejestracja` (do dodania) |
| Konfiguracja DNS | w pakiecie / 199 zł | część wdrożenia |
| Hosting WP 12 mc | 490–990 zł/rok | `hosting-wordpress-12mc` |
| Hosting WP abonament | 49–99 zł/mc | z opieką lub osobno |
| Poczta Google Workspace setup | 299 zł | integracja |
| CDN Cloudflare setup | 490 zł | migracje-naprawy |
| Backup off-site | w opiece 299/mc | opieka-techniczna |

**Do katalogu:** rozważ dodanie 3–5 slugów hosting/domena w `services-catalog.json` — pSEO „hosting wordpress cena”.

---

## D. Techniczne info dla klienta (treść na /technologia)

### WordPress hosting — wymagania min.

- PHP 8.2+
- MariaDB 10.6+ / MySQL 8
- 512 MB RAM min (1 GB rekomendowane)
- cron WP co 15 min
- HTTPS obowiązkowy

### Shopify / Shoper

- Hosting w cenie SaaS — klient płaci abonament platformy osobno (poza naszym wdrożeniem)
- W briefu: kto płaci Shopify $39/mc itd.

### WooCommerce

- VPS lub managed WP hosting
- My recommendation w pakiecie: LiteSpeed, CyberFolks, home.pl Business — **bez konkretnej afiliacji na start**

---

## E. Przekazanie projektu (handover checklist)

Po oddaniu klient dostaje mail z:

- [ ] URL strony + login WP admin (1Password / PDF zaszyfrowany)
- [ ] Gdzie jest domena i kiedy wygasa
- [ ] Gdzie jest hosting i jak przedłużyć
- [ ] SSL — auto, nic nie robi
- [ ] GA4 — czy na jego konto czy nasze (preferuj **jego** konto)
- [ ] Backup — jak działa / link do opieki
- [ ] 30 dni poprawek — jak zgłosić (mail/kontakt)

Szablon maila: KONTAKT-AUTOMAT.md (do rozszerzenia).

---

## F. FAQ domena/hosting (na stronę)

1. **Czy muszę mieć domenę przed zamówieniem?** Nie — możesz kupić później; pracujemy na staging URL.  
2. **Czy hosting jest w cenie?** Podstawowa konfiguracja tak; abonament hostingu — patrz pakiet Pro lub opieka.  
3. **Czy strona będzie moja?** Tak — pełne prawa, dostępy po oddaniu.  
4. **Co jak nie przedłużę hostingu?** Strona offline — przypomnienie w opiece technicznej.  
5. **Czy przeniesiecie stronę na mój hosting?** Tak — pakiet migracji lub w scope Pro.

---

*Powiązane: OFERTA.md · PROJEKT-KOMPLETNY.md · TRUST-DEMO-FAQ.md*
