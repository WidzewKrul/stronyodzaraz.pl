# WaaS — hosting i operacje

**Powiązane:** REGULAMIN-WAAS.md · INFRA-DOMENA-HOSTING.md · MRR-STRATEGIA.md

---

## Architektura

```
VPS clients-wp (Coolify) — 57.131.49.251 lub osobny node
├── Traefik reverse proxy
├── wp-client-{id} kontener × N
├── MariaDB shared lub per client (prefer per client P1)
└── restic backup → S3 / Backblaze B2
```

**Limit startowy:** 20–30 stron na VPS 8GB RAM. Potem drugi node.

---

## Provisioning nowego klienta WaaS

1. Po `DELIVERED` + sub aktywna → utwórz slot `{clientId}`
2. WP install z motywem prod (migrate ze staging)
3. DNS: A record → VPS lub CNAME `clients.stronyodzaraz.pl`
4. SSL Let's Encrypt auto
5. Wpisać do rejestru: `clients-registry.json` (internal)

---

## Backup

| Typ | Częstotliwość | Retencja |
|-----|---------------|----------|
| Pliki + DB | codziennie 03:00 | 30 dni |
| Pre-update | przed każdym update WP | 7 dni |

Restore test: 1× kwartał losowy klient.

---

## Update WP

1. Staging clone lub backup
2. Update core → motyw → wtyczki (security first)
3. Smoke test: homepage, formularz, checkout (sklep)
4. Prod deploy jeśli OK
5. Log w raporcie miesięcznym (opieka)

**Okno:** wtorek/czwartek 02:00–06:00.

---

## Monitoring

- UptimeRobot — HTTP 5 min
- Alert email jeśli down >5 min
- WP health w cron tygodniowym

---

## Failed payment (Stripe)

| Dzień | Akcja |
|-------|-------|
| 0 | Stripe retry auto |
| 3 | Email „problem z płatnością” + link portal |
| 7 | Drugi email + banner admin WP |
| 14 | Strona → landing „maintenance — contact” |
| 30 | Offboarding + backup do klienta na żądanie 14 dni |

---

## Offboarding

1. Export All-in-One WP Migration → link 7 dni
2. Wykup 990 zł — pełny transfer DNS instrukcja
3. Usunięcie kontenera D+30 po zakończeniu
4. Domena: przypomnienie o transferze jeśli u was

---

## Rejestr klientów (pola)

```json
{
  "clientId": "uuid",
  "domain": "example.pl",
  "plan": "waas-start",
  "stripeSubscriptionId": "sub_...",
  "containerName": "wp-client-xxx",
  "backupLast": "ISO date",
  "wpVersion": "6.7.2"
}
```

---

*Regulamin: REGULAMIN-WAAS.md · RODO: RODO-POWIERZENIE-SZABLON.md*
