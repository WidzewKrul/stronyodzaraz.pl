export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
export const ANALYTICS_ENABLED = Boolean(GA_ID) || Boolean(META_PIXEL_ID);

export type Consent = "accepted" | "rejected" | "unknown";
export const CONSENT_KEY = "stronyodzaraz.pl.consent.v1";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
  }
}

function gtag(...args: unknown[]) {
  if (typeof window === "undefined" || !window.gtag) return;
  window.gtag(...args);
}

function fbq(...args: unknown[]) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq(...args);
}

export function trackAddToCart(item: { slug: string; title: string; priceGrosze: number; category: string }) {
  const price = item.priceGrosze / 100;
  gtag("event", "add_to_cart", {
    currency: "PLN",
    value: price,
    items: [{ item_id: item.slug, item_name: item.title, item_category: item.category, price, quantity: 1 }],
  });
  fbq("track", "AddToCart", { content_ids: [item.slug], content_name: item.title, value: price, currency: "PLN" });
}

export function trackBeginCheckout(items: Array<{ slug: string; title: string; priceGrosze: number; category: string }>) {
  const value = items.reduce((s, i) => s + i.priceGrosze / 100, 0);
  gtag("event", "begin_checkout", {
    currency: "PLN",
    value,
    items: items.map((i) => ({ item_id: i.slug, item_name: i.title, item_category: i.category, price: i.priceGrosze / 100, quantity: 1 })),
  });
  fbq("track", "InitiateCheckout", { value, currency: "PLN", num_items: items.length });
}

export function trackPurchase(orderId: string, items: Array<{ slug: string; title: string; priceGrosze: number; category: string }>) {
  const value = items.reduce((s, i) => s + i.priceGrosze / 100, 0);
  gtag("event", "purchase", {
    transaction_id: orderId,
    currency: "PLN",
    value,
    items: items.map((i) => ({ item_id: i.slug, item_name: i.title, item_category: i.category, price: i.priceGrosze / 100, quantity: 1 })),
  });
  fbq("track", "Purchase", { value, currency: "PLN" });
}
