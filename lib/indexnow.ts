import { siteUrl } from "@/lib/env";
import { log } from "@/lib/logger";

function resolveIndexNowKey(): string | null {
  const fromEnv = process.env.INDEXNOW_KEY?.trim();
  if (fromEnv) return fromEnv;
  return null;
}

/** Submit URLs to Bing IndexNow (best-effort). */
export async function submitIndexNow(urls: string[]): Promise<{ ok: boolean; skipped?: boolean }> {
  const key = resolveIndexNowKey();
  if (!key || urls.length === 0) {
    log.warn("[indexnow] skipped — no key or empty urls");
    return { ok: false, skipped: true };
  }

  const base = siteUrl();
  const host = new URL(base).host;
  const absolute = urls.map((u) => (u.startsWith("http") ? u : `${base.replace(/\/$/, "")}${u.startsWith("/") ? u : `/${u}`}`));

  const res = await fetch("https://api.indexnow.org/IndexNow", {
    method: "POST",
    headers: { "Content-Type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key,
      keyLocation: `${base.replace(/\/$/, "")}/${key}.txt`,
      urlList: absolute,
    }),
  });

  if (res.ok || res.status === 202) return { ok: true };
  log.warn("[indexnow] failed", { status: res.status, body: await res.text() });
  return { ok: false };
}
