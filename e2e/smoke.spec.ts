import { test, expect, type Page } from "@playwright/test";

const ROUTES = [
  "/",
  "/uslugi",
  "/uslugi/strony-internetowe",
  "/uslugi/sklepy-internetowe",
  "/wykonane",
  "/demo",
  "/technologia",
  "/o-nas",
  "/blog",
  "/kontakt",
  "/koszyk",
  "/regulamin",
  "/polityka-prywatnosci",
  "/l/warszawa",
  "/l/krakow/strony-internetowe",
];

// Collect any failed network responses + console errors while a page loads.
function attachErrorCollectors(page: Page) {
  const errors: string[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`console: ${msg.text()}`);
  });
  page.on("response", (res) => {
    const url = res.url();
    // Ignore third-party (analytics/stripe) and acceptable 304s.
    if (res.status() >= 400 && url.startsWith("http://127.0.0.1")) {
      errors.push(`http ${res.status()}: ${url}`);
    }
  });
  return errors;
}

test.describe("page smoke + assets", () => {
  for (const route of ROUTES) {
    test(`loads ${route} with one h1, no broken images, no app errors`, async ({ page }) => {
      const errors = attachErrorCollectors(page);
      const resp = await page.goto(route, { waitUntil: "networkidle" });
      expect(resp?.status(), `status for ${route}`).toBeLessThan(400);

      // Exactly one <h1>.
      const h1Count = await page.locator("h1").count();
      expect(h1Count, `h1 count on ${route}`).toBe(1);

      // Every <img> actually decoded (naturalWidth > 0).
      const brokenImgs = await page.evaluate(() =>
        Array.from(document.querySelectorAll("img"))
          .filter((img) => !img.complete || img.naturalWidth === 0)
          .map((img) => img.currentSrc || img.src),
      );
      expect(brokenImgs, `broken images on ${route}`).toEqual([]);

      // No horizontal overflow (text/elements fit the viewport).
      const overflow = await page.evaluate(() => {
        const de = document.documentElement;
        return de.scrollWidth - de.clientWidth;
      });
      expect(overflow, `horizontal overflow px on ${route}`).toBeLessThanOrEqual(2);

      expect(errors, `runtime errors on ${route}`).toEqual([]);
    });
  }
});

test("primary navigation works", async ({ page }, testInfo) => {
  await page.goto("/");
  if (testInfo.project.name === "mobile") {
    await page.getByRole("button", { name: /menu/i }).click();
  }
  await page.getByRole("link", { name: "Usługi", exact: true }).first().click();
  await expect(page).toHaveURL(/\/uslugi/);
  await expect(page.locator("h1")).toBeVisible();
});

const OG_ROUTES = [
  "/opengraph-image",
  "/uslugi/strony-internetowe/landing-page-apteka-pro/opengraph-image",
  "/l/warszawa/opengraph-image",
];

test("dynamic OG images render as 1200x630 PNGs", async ({ request }) => {
  for (const og of OG_ROUTES) {
    const res = await request.get(og);
    expect(res.status(), `status ${og}`).toBe(200);
    expect(res.headers()["content-type"], `type ${og}`).toContain("image/png");
    const buf = await res.body();
    expect(buf.length, `bytes ${og}`).toBeGreaterThan(2000);
    // PNG magic number.
    expect(buf.subarray(0, 4).toString("hex")).toBe("89504e47");
  }
});

test("skip-to-content link is reachable and targets main", async ({ page }) => {
  await page.goto("/");
  await page.keyboard.press("Tab");
  const skip = page.getByRole("link", { name: /Przejdź do treści/i });
  await expect(skip).toBeFocused();
  await expect(page.locator("#main")).toHaveCount(1);
});
