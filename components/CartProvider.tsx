"use client";

import { createContext, useCallback, useContext, useEffect, useState } from "react";
import { type CartItem, cartAddItem, cartClear, cartRemoveItem, getCart } from "@/lib/cart";

type CartCtx = {
  items: CartItem[];
  count: number;
  addItem: (item: CartItem) => void;
  removeItem: (slug: string) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartCtx>({
  items: [],
  count: 0,
  addItem: () => {},
  removeItem: () => {},
  clearCart: () => {},
});

export function useCart() {
  return useContext(CartContext);
}

export default function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    setItems(getCart());
  }, []);

  const addItem = useCallback((item: CartItem) => {
    cartAddItem(item);
    setItems(getCart());
  }, []);

  const removeItem = useCallback((slug: string) => {
    cartRemoveItem(slug);
    setItems(getCart());
  }, []);

  const clearCart = useCallback(() => {
    cartClear();
    setItems([]);
  }, []);

  return (
    <CartContext.Provider value={{ items, count: items.length, addItem, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
