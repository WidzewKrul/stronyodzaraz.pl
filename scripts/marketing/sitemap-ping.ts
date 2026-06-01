/**
 * scripts/marketing/sitemap-ping.ts
 * Pinguje sitemap do Google + Bing po deployu, oraz IndexNow dla nowych URL.
 *
 * npm run mkt:sitemap
 * npm run mkt:sitemap -- --indexnow-urls marketing/queue/seo/new-urls.txt
 */
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { parseArgs, logSection, logOk, logWarn, logErr, env } from './_lib';

const SITE = process.env.SITE_URL || 'https://stronyodzaraz.pl';

async function pingGoogle() {
  // Google sunset sitemap ping w 2023, ale Bing nadal działa.
  // Dla Google używamy GSC API (osobny skrypt mkt:gsc --submit-sitemap).
  logWarn('Google Sitemap Ping endpoint deprecated. Use `npm run mkt:gsc -- --submit-sitemap` (GSC API).');
}

async function pingBing() {
  const url = `https://www.bing.com/ping?sitemap=${encodeURIComponent(SITE + '/sitemap.xml')}`;
  const res = await fetch(url);
  if (res.ok) logOk(`Bing pinged: ${SITE}/sitemap.xml`);
  else logErr(`Bing ping failed ${res.status}`);
}

async function indexNow(urls: string[]) {
  const key = env('INDEXNOW_KEY');
  const host = new URL(SITE).host;
  const body = {
    host,
    key,
    keyLocation: `${SITE}/${key}.txt`,
    urlList: urls,
  };
  const res = await fetch('https://api.indexnow.org/IndexNow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  });
  if (res.ok || res.status === 202) logOk(`IndexNow accepted ${urls.length} URLs`);
  else logErr(`IndexNow failed ${res.status}: ${await res.text()}`);
}

async function main() {
  const args = parseArgs();
  logSection(`Pinging sitemap for ${SITE}`);
  await pingGoogle();
  await pingBing();

  const urlsFile = args['indexnow-urls'];
  if (urlsFile && typeof urlsFile === 'string') {
    const path = resolve(process.cwd(), urlsFile);
    if (!existsSync(path)) throw new Error(`File not found: ${path}`);
    const urls = readFileSync(path, 'utf8').split('\n').map(s => s.trim()).filter(Boolean);
    if (urls.length) {
      logSection(`IndexNow batch — ${urls.length} URLs`);
      await indexNow(urls);
    }
  } else {
    logWarn('Skip IndexNow — pass --indexnow-urls <file.txt> with one URL per line.');
  }
}

main().catch(e => { logErr(e.message); process.exit(1); });
