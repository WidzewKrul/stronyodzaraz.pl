export type CartItem = {
  slug: string;
  title: string;
  category: string;
  priceGrosze: number;
};

const KEY = "stronyodzaraz_cart";

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(KEY) ?? "[]") as CartItem[];
  } catch {
    return [];
  }
}

export function setCart(items: CartItem[]): void {
  localStorage.setItem(KEY, JSON.stringify(items));
}

export function cartAddItem(item: CartItem): void {
  const items = getCart();
  if (!items.some((i) => i.slug === item.slug)) {
    setCart([...items, item]);
  }
}

export function cartRemoveItem(slug: string): void {
  setCart(getCart().filter((i) => i.slug !== slug));
}

export function cartClear(): void {
  localStorage.removeItem(KEY);
}
