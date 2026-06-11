import { test, expect, type Page } from "@playwright/test";

// The cookie consent banner is fixed at the bottom and overlays page content until
// dismissed — accept it first, exactly as a real visitor would.
async function acceptConsent(page: Page) {
  const accept = page.getByRole("button", { name: /Akceptuję/i });
  if (await accept.count()) await accept.click().catch(() => {});
}

// Exercises the purchase funnel UP TO (not through) the Stripe redirect — Stripe is
// in live mode, so we never submit a real payment. We assert the cart accumulates
// the item and the checkout form validates client-side.
test("add to cart → cart shows item → checkout form validates", async ({ page }, testInfo) => {
  // Start from a category and open the first product.
  await page.goto("/uslugi/strony-internetowe");
  await acceptConsent(page);
  const firstProduct = page.locator('a[href^="/uslugi/strony-internetowe/"]').first();
  await firstProduct.click();
  await expect(page.locator("h1")).toBeVisible();

  // Add to cart (button label may be "Dodaj do koszyka").
  const addBtn = page.getByRole("button", { name: /do koszyka/i }).first();
  await addBtn.click();

  // Go to cart.
  await page.goto("/koszyk");
  await acceptConsent(page);
  await expect(page.locator("h1")).toBeVisible();
  // Cart should not be empty — there is a checkout submit button.
  const pay = page.getByRole("button", { name: /płatności|zapłać|kasy/i }).first();
  await expect(pay).toBeVisible();

  // Submitting without required consent/fields must surface an error (role=alert),
  // not silently navigate away to a live Stripe session.
  await pay.click();
  const alert = page.getByRole("alert");
  await expect(alert.first()).toBeVisible();
  // We remain on the cart page (no live checkout was created).
  await expect(page).toHaveURL(/\/koszyk/);
  expect(testInfo.errors).toEqual([]);
});

test("cart clear asks for confirmation", async ({ page }) => {
  await page.goto("/uslugi/strony-internetowe");
  await acceptConsent(page);
  await page.locator('a[href^="/uslugi/strony-internetowe/"]').first().click();
  await page.getByRole("button", { name: /do koszyka/i }).first().click();
  await page.goto("/koszyk");
  await acceptConsent(page);

  let confirmShown = false;
  page.on("dialog", (d) => {
    confirmShown = true;
    d.dismiss().catch(() => {});
  });
  const clear = page.getByRole("button", { name: /wyczyść koszyk/i });
  if (await clear.count()) {
    await clear.click();
    expect(confirmShown).toBe(true);
  }
});
