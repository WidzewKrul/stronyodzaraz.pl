# IndexNow — setup

**Cel:** szybsza indeksacja nowych URL (blog auto, nowe local).

---

## Kroki

1. Wygeneruj klucz: `openssl rand -hex 16` → np. `a1b2c3d4e5f6...`
2. Plik: `public/{KEY}.txt` — zawartość = sam klucz (jedna linia)
3. Env: `INDEXNOW_KEY={KEY}`
4. Submit URL: `https://api.indexnow.org/indexnow`

---

## Kiedy submit

| Event | URL batch |
|-------|-----------|
| Nowy post blog (cron) | `/blog/{slug}` |
| Deploy nowych local pages | `/l/*` batch max 100 |
| Launch | sitemap top 100 URL |

---

## Kod (backlog)

`lib/indexnow.ts`:
```typescript
await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    host: 'stronyodzaraz.pl',
    key: process.env.INDEXNOW_KEY,
    keyLocation: `https://stronyodzaraz.pl/${process.env.INDEXNOW_KEY}.txt`,
    urlList: urls,
  }),
});
```

Wywołanie z `/api/cron/blog` po publish.

---

## Bing Webmaster

Dodaj stronę + Import IndexNow key.

---

*SEO: SEO-STRATEGIA.md · PROJEKT-KOMPLETNY § IndexNow*
