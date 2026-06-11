import { chromium, devices } from "@playwright/test";
import fs from "node:fs";

const OUT = "/tmp/sodz-shots";
fs.mkdirSync(OUT, { recursive: true });
const BASE = "http://127.0.0.1:3100";

const PAGES = [
  ["home", "/"],
  ["uslugi", "/uslugi"],
  ["kategoria", "/uslugi/strony-internetowe"],
  ["pdp", "/uslugi/strony-internetowe/strona-start"],
  ["koszyk", "/koszyk"],
  ["kontakt", "/kontakt"],
  ["wykonane", "/wykonane"],
  ["blog", "/blog"],
  ["local", "/l/warszawa"],
  ["local-cat", "/l/krakow/sklepy-internetowe"],
  ["technologia", "/technologia"],
];

async function shoot(label, ctx, suffix) {
  const page = await ctx.newPage();
  for (const [name, path] of PAGES) {
    try {
      await page.goto(BASE + path, { waitUntil: "networkidle", timeout: 20000 });
      const accept = page.getByRole("button", { name: /Akceptuję/i });
      if (await accept.count()) await accept.click().catch(() => {});
      await page.screenshot({ path: `${OUT}/${name}-${suffix}.png`, fullPage: true });
    } catch (e) {
      console.log(`FAIL ${name}-${suffix}: ${e.message}`);
    }
  }
  await page.close();
}

const browser = await chromium.launch();
const desktop = await browser.newContext({ viewport: { width: 1366, height: 900 } });
const mobile = await browser.newContext({ ...devices["Pixel 5"] });
await shoot("desktop", desktop, "d");
await shoot("mobile", mobile, "m");
await browser.close();
console.log("shots written to", OUT);
