# stronyodzaraz.pl — monitoring minimalny

**Cel:** ~15 min **raz w miesiącu** + Coolify task failures. Blog i drip lecą same.

**Automatyzacja:** [BLOG-AUTOMAT.md](./BLOG-AUTOMAT.md) · [COOLIFY-JOBS.md](./COOLIFY-JOBS.md)

---

## Co sprawdzasz (checklist miesięczny)

| # | Gdzie | Co patrzysz | Alarm jeśli |
|---|-------|-------------|-------------|
| 1 | **Coolify** | App status Running, ostatni deploy | Down / restart loop |
| 2 | **Stripe → Webhooks** | Failed deliveries (30 dni) | > 0 failed |
| 3 | **Resend → Emails** | Bounce rate | > 5% |
| 4 | **GSC → Pages** | Coverage errors | nowe 404 / soft 404 |
| 5 | **GA4 → Reports** | Users last 28 days | spadek do 0 (tracking broken) |
| 6 | **Coolify → Scheduled Tasks** | blog / drip / process last run | Failed |
| 7 | **GET /** | ręcznie | nie 200 |

**Nie otwieraj:** Keyword Planner, title A/B, blog editor, kodu — chyba że punkt 1–6 coś pokaże.

---

## Alerty automatyczne (opcjonalnie, jednorazowy setup)

| Narzędzie | Co monitoruje | Koszt |
|-----------|---------------|-------|
| **UptimeRobot** / **Better Stack** | `GET https://stronyodzaraz.pl/` co 5 min | free tier |
| **Stripe** | email przy failed webhook | włączone w Stripe |
| **GlitchTip/Sentry** | błędy JS/API | opcjonalnie `SENTRY_DSN` |

Jeśli uptime monitor jest skonfigurowany — miesięczny checklist skraca się do Stripe + Resend + szybki GA4.

---

## Co robić gdy coś padnie

| Problem | Akcja | Czas |
|---------|-------|------|
| Strona down | Coolify restart / redeploy | 15 min |
| Webhook fail | Stripe → retry; sprawdź `STRIPE_WEBHOOK_SECRET` | 30 min |
| Maile nie wychodzą | Resend DNS / quota | 30 min |
| GA4 = 0 | ConsentBanner / `GA_ID` w env | 15 min |
| 404 w GSC | czy URL powinien istnieć; fix lub 301 | incydent |

**Nie rób:** redesignu, nowych landingów, refaktoru SEO — tylko naprawa.

---

## Co świadomie ignorujesz

- Pozycje słów kluczowych (Senuto/Ahrefs)
- CTR i optymalizacja title
- Nowe artykuły blog
- Local tier B/C
- Konkurencja
- Core Web Vitals (chyba że PageSpeed < czerwony na home)

SEO rośnie samo z ~435 URL — albo nie. To akceptowalne w modelu portfolio.

---

## Kiedy wrócić do projektu (wyjątki)

| Sygnał | Akcja |
|--------|-------|
| **> 5 płatności/mc** z organic | rozważ **nowy** projekt upsell, nie patch |
| Klient prosi o custom poza katalogiem | osobna wycena poza sklepem |
| Google manual action | awaryjnie — patrz PROJEKT-KOMPLETNY § ryzyka |

---

## Roczny check (1×/rok, 30 min)

- [ ] SSL cert ważny (Coolify auto)
- [ ] Regulamin daty / NIP aktualne
- [ ] `.env` secrets rotacja (CRON_SECRET opcjonalnie)
- [ ] `npm audit` + deploy security patch Next.js

---

*Powiązane: PROJEKT-KOMPLETNY.md · DOCS-INDEX.md*
