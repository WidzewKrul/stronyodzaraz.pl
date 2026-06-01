# Delivery stack — infrastruktura (Coolify, Docker, SSL)

**Cel:** hosting staging + WaaS — wildcard subdomains, izolacja, backup.

---

## 1. Topologia produkcyjna

```
                    Cloudflare DNS
                    *.clients.stronyodzaraz.pl → VPS IP
                    *.waas.stronyodzaraz.pl    → VPS IP
                           │
                    ┌──────▼──────┐
                    │   Traefik   │  Coolify proxy (v3.x)
                    │   :443      │  DNS-01 wildcard cert
                    └──────┬──────┘
           ┌───────────────┼───────────────┐
           │               │               │
    ┌──────▼──────┐ ┌──────▼──────┐ ┌──────▼──────┐
    │ Next.js     │ │ WP Multisite│ │ WP Docker   │
    │ stronyodzaraz│ │ waas network│ │ sklep-{id}  │
    │ (Coolify)   │ │ (1 container)│ │ (per klient)│
    └──────┬──────┘ └──────┬──────┘ └──────┬──────┘
           │               │               │
           └───────────────┼───────────────┘
                    ┌──────▼──────┐
                    │ PostgreSQL  │  orders, siteSpec
                    │ MariaDB     │  WP databases
                    └─────────────┘
                    ┌─────────────┐
                    │ S3 / B2     │  backups, exports
                    └─────────────┘
```

---

## 2. VPS — rekomendacja

| Provider | Plan | Spec | Cena ~2026 | Uwagi |
|----------|------|------|------------|-------|
| **Hetzner** | CX32 / CPX32 | 4 vCPU, 8 GB | €7–12/m | best value EU |
| **Hetzner** | CPX41 | 8 vCPU, 16 GB | ~€25/m | 40+ WaaS |
| OVH | VPS Comfort | 4 vCPU, 8 GB | ~€12/m | PL support |
| Contabo | VPS M | 6 vCPU, 16 GB | ~€7/m | tańszy, support słabszy |

**Lokalizacja:** Falkenstein / Helsinki (latency PL OK).

**OS:** Ubuntu 24.04 LTS — Coolify requirement.

---

## 3. Coolify — layout serwisów

| Aplikacja Coolify | Typ | Domena |
|-------------------|-----|--------|
| stronyodzaraz-shop | Next.js Dockerfile | stronyodzaraz.pl |
| wp-waas-multisite | Docker Compose | *.waas.stronyodzaraz.pl |
| wp-build-worker | Docker Compose (internal) | brak public |
| mainwp-dashboard | WordPress | mainwp.internal / VPN |
| postgres-shared | Database | internal port |

**Scheduled tasks** — patrz [COOLIFY-JOBS.md](./COOLIFY-JOBS.md) + nowe build/qa crony.

---

## 4. Wildcard SSL — Traefik DNS-01

**Problem:** HTTP-01 nie działa dla `*.clients.stronyodzaraz.pl` — subdomeny nie istnieją przed cert request.

**Rozwiązanie:** DNS-01 challenge — Traefik tworzy TXT record via API.

### Cloudflare (rekomendowane)

1. Token: **Edit zone DNS** scoped do `stronyodzaraz.pl`
2. Coolify → Server → Proxy → Custom config:

```yaml
# fragment Traefik dynamic — ref: Coolify docs
command:
  - '--certificatesresolvers.letsencrypt.acme.dnschallenge.provider=cloudflare'
  - '--certificatesresolvers.letsencrypt.acme.dnschallenge.delaybeforecheck=0'
  - '--certificatesresolvers.letsencrypt.acme.storage=/traefik/acme.json'
environment:
  - CF_DNS_API_TOKEN=${CF_DNS_API_TOKEN}
labels:
  - traefik.http.routers.traefik.tls.domains[0].main=stronyodzaraz.pl
  - traefik.http.routers.traefik.tls.domains[0].sans=*.stronyodzaraz.pl,*.clients.stronyodzaraz.pl,*.waas.stronyodzaraz.pl
```

3. Aplikacje klienckie — **tls=true bez certResolver** → używają wildcard cert ([Industrial Monitor guide](https://industrialmonitordirect.com/blogs/knowledgebase/traefik-wildcard-ssl-certificates-lets-encrypt-dns-01-setup-guide)).

Refs:
- [Coolify wildcard docs](https://coolify.io/docs/knowledge-base/traefik/wildcard-certificates)
- [Eventuallymaking.io tutorial](https://eventuallymaking.io/p/2025-10-coolify-wildcard-ssl)

### Routing subdomain → kontener

```yaml
labels:
  - traefik.http.routers.wp-${ORDER_ID}.rule=Host(`${ORDER_ID}.clients.stronyodzaraz.pl`)
  - traefik.http.routers.wp-${ORDER_ID}.tls=true
  - traefik.http.services.wp-${ORDER_ID}.loadbalancer.server.port=80
```

---

## 5. Docker Compose — WP build worker

Bazowany na [nezhar/wordpress-docker-compose](https://github.com/nezhar/wordpress-docker-compose):

```yaml
# infra/wp-build/docker-compose.yml (doc)
services:
  wordpress:
    image: wordpress:6.7-php8.3-apache
    environment:
      WORDPRESS_DB_HOST: db
      WORDPRESS_DB_USER: wp
      WORDPRESS_DB_PASSWORD: ${DB_PASS}
      WORDPRESS_DB_NAME: wp_${ORDER_ID}
    volumes:
      - ./uploads/${ORDER_ID}:/var/www/html/wp-content/uploads
      - ../templates:/templates:ro
    networks:
      - coolify

  wpcli:
    image: wordpress:cli-2.11-php8.3
    user: "33:33"
    volumes_from:
      - wordpress
    environment:
      WORDPRESS_DB_HOST: db
    entrypoint: wp
    networks:
      - coolify

  db:
    image: mariadb:11
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: wp_${ORDER_ID}
    volumes:
      - dbdata_${ORDER_ID}:/var/lib/mysql

networks:
  coolify:
    external: true
```

**Build script** uruchamia: `docker compose -p wp-${ORDER_ID} run --rm wpcli core install ...`

---

## 6. WP Multisite — WaaS network

```bash
# jednorazowy setup na VPS
wp core multisite-install --url=waas.stronyodzaraz.pl --title="stronyodzaraz WaaS"
wp site create --slug=$CLIENT_SLUG --title="$NAME" --email=$EMAIL
# mapowanie: $CLIENT_SLUG.waas.stronyodzaraz.pl
```

**Domain mapping plugin:** opcjonalnie dla custom domain klienta (WaaS Pro).

**Backup:** UpdraftPlus → Backblaze B2 (`WAAS-HOSTING-OPS.md`).

---

## 7. Sieć wewnętrzna — build worker ↔ Next.js

| Połączenie | Metoda |
|------------|--------|
| Next.js → build API | `POST /api/internal/build` + `CRON_SECRET` |
| Build → Next.js webhook | `POST /api/internal/build-callback` + HMAC |
| Build → DB | shared Postgres connection string (status update) |

**Nie** wystawiaj Docker socket do Next.js container — osobny build worker service.

Opcja skali: **Redis queue** (BullMQ) między webhook a build worker.

---

## 8. Backup & disaster recovery

| Asset | Częstotliwość | Retencja | Tool |
|-------|---------------|----------|------|
| WP DB per site | daily | 7–30 dni | UpdraftPlus → B2 |
| wp-content/uploads | daily | 30 dni | B2 sync |
| Postgres (orders) | daily | 30 dni | Coolify backup / pg_dump |
| Template repo | git | forever | GitHub |
| Traefik acme.json | weekly | 4 tyg | copy offsite |

RTO WaaS P0: 4h · RPO: 24h (tier Landing).

---

## 9. Monitoring

| Tool | Cel | Koszt |
|------|-----|-------|
| **UptimeRobot** / Better Stack | HTTP check staging + prod | free tier |
| Coolify health | container restart | included |
| MainWP | WP core/plugin versions | self-hosted |
| Sentry | Next.js errors | optional |

Alert P0 → SMS/email → `SUPPORT-SLA.md`.

---

## 10. InstaWP jako infra bypass (MVP)

Jeśli własny Docker opóźnia launch >6 tyg.:

| Aspekt | Self-hosted | InstaWP |
|--------|-------------|---------|
| Provision time | 2–5 min | 30–90 s |
| Koszt @50 sites | ~€25 VPS | ~$50–150/m |
| Kontrola | pełna | API limits |
| WaaS long-term | ✓ | migrate off |

API: `POST /api/v2/sites/template` + blueprint slug — [docs](https://docs.instawp.com/en/article/create-a-site-via-api-fq00b5/).

CLI w CI: `@instawp/cli` — [instawp.com/cli](https://instawp.com/cli-for-wordpress/).

---

## 11. ENV — nowe zmienne

```env
# Build / WaaS
BUILD_WORKER_URL=http://wp-build-worker:8080
BUILD_CALLBACK_SECRET="..."
CF_DNS_API_TOKEN="..."
WAAS_MULTISITE_URL=https://waas.stronyodzaraz.pl
S3_BACKUP_BUCKET="stronyodzaraz-backups"
S3_BACKUP_KEY="..."

# InstaWP (optional MVP)
INSTAWP_API_TOKEN="..."
INSTAWP_TEMPLATE_LANDING_RESTAURACJA="slug-from-dashboard"

# Fleet
MAINWP_URL=https://mainwp.stronyodzaraz.pl
MAINWP_API_KEY="..."
```

Dopisać do `.env.example` przy implementacji.

---

## 12. Checklist infra przed auto-build

- [ ] Coolify na Hetzner Ubuntu 24.04
- [ ] Cloudflare DNS + API token
- [ ] Traefik wildcard cert działa (`*.clients.stronyodzaraz.pl`)
- [ ] Test subdomain → hello world container
- [ ] MariaDB persistent volume
- [ ] B2 bucket + lifecycle rules
- [ ] UptimeRobot na 3 URL
- [ ] `CRON_SECRET` + build callback secret

---

*Master: [DELIVERY-STACK-MASTER.md](./DELIVERY-STACK-MASTER.md)*
