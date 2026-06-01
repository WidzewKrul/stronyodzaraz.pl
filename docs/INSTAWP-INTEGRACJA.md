# InstaWP — integracja MVP

**Cel:** staging w 1–2 tyg. bez własnego Docker build engine.  
**Master:** [DELIVERY-STACK-MASTER.md](./DELIVERY-STACK-MASTER.md) § Ścieżka B

---

## Flow

```
brief complete
  → generate SiteSpec (OpenRouter)
  → POST InstaWP /api/v2/sites/template
  → poll task_id until ready
  → stagingUrl = site.url
  → update serviceOrders
  → QA (Playwright)
  → email staging_review
```

---

## Setup

1. Konto [instawp.com](https://instawp.com) — Agency plan
2. Utwórz **Blueprint** z preset restauracja (ręcznie raz w UI)
3. API token: Dashboard → API → Create token (scope: sites)
4. Env:

```env
INSTAWP_API_TOKEN=re_...
INSTAWP_TEMPLATE_LANDING_RESTAURACJA=your-template-slug
INSTAWP_WEBHOOK_SECRET=...  # optional
```

---

## Create site

```typescript
async function provisionInstaWpSite(params: {
  templateSlug: string;
  siteName: string;
  reserved: boolean;
}) {
  const res = await fetch("https://app.instawp.io/api/v2/sites/template", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.INSTAWP_API_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      template_slug: params.templateSlug,
      site_name: params.siteName,
      is_reserved: params.reserved,
    }),
  });
  const data = await res.json();
  if (!data.is_pool && data.task_id) {
    return await pollTask(data.task_id);
  }
  return data;
}

async function pollTask(taskId: string, maxAttempts = 60) {
  for (let i = 0; i < maxAttempts; i++) {
    await sleep(5000);
    const res = await fetch(`https://app.instawp.io/api/v2/tasks/${taskId}/status`, {
      headers: { Authorization: `Bearer ${process.env.INSTAWP_API_TOKEN}` },
    });
    const data = await res.json();
    if (data.status === "completed") return data.site;
    if (data.status === "failed") throw new Error(data.message);
  }
  throw new Error("InstaWP timeout");
}
```

Ref: [Create a Site via API](https://docs.instawp.com/en/article/create-a-site-via-api-fq00b5/)

---

## Apply SiteSpec po provision

InstaWP site ma WP admin + WP-CLI via SSH ([CLI docs](https://instawp.com/cli-for-wordpress/)):

```bash
instawp ssh ${SITE_ID} -- wp option update blogname "Restauracja U Kucharza"
# lub SSH key z dashboard
```

**Backlog:** InstaWP API patch site options — jeśli dostępne w v2.

**MVP:** manual copy paste przez admin **lub** SSH script post-provision.

---

## WooCommerce shortcut

Plugin [InstaWP/iwp-wp-integration](https://github.com/InstaWP/iwp-wp-integration) — wzorzec WooCommerce order → auto site.

My: Stripe webhook → ten sam endpoint pattern, metadata `serviceOrderId`.

---

## Migracja off InstaWP

Po akceptacji klienta:
1. InstaWP „Go Live” / export
2. Import na własny VPS (WAAS-HOSTING-OPS.md)
3. Update `productionUrl` w DB

---

## Koszty vs self-hosted

| Sites/mc | InstaWP ~ | Hetzner self ~ |
|----------|-----------|----------------|
| 10 | $20–40 | €8 |
| 50 | $80–150 | €25 |

**Strategia:** InstaWP do pierwszych 20 klientów → migrate build engine.

---

## Checklist integracji

- [ ] Blueprint per templateId (8 szt.)
- [ ] `lib/instawp/client.ts`
- [ ] Hook w cron/build zamiast `build-site.mjs`
- [ ] Map `templateSlug` w templates-manifest.json → `instawpTemplateSlug`
- [ ] Test end-to-end brief → URL

---

*Self-hosted alternative: [BUILD-SITE-SCRIPT-SPEC.md](./BUILD-SITE-SCRIPT-SPEC.md)*
