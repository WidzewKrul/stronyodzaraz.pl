"use client";

import { useCart } from "@/components/CartProvider";
import { useRouter } from "next/navigation";
import { ShoppingCart, Zap } from "lucide-react";
import { useState } from "react";
import { trackAddToCart } from "@/lib/analytics";

type Props = {
  slug: string;
  title: string;
  category: string;
  priceGrosze: number;
};

export default function AddToCartBox({ slug, title, category, priceGrosze }: Props) {
  const { addItem, items } = useCart();
  const router = useRouter();
  const [justAdded, setJustAdded] = useState(false);
  const inCart = items.some((i) => i.slug === slug);

  function handleAdd() {
    addItem({ slug, title, category, priceGrosze });
    trackAddToCart({ slug, title, priceGrosze, category });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  function handleBuyNow() {
    addItem({ slug, title, category, priceGrosze });
    trackAddToCart({ slug, title, priceGrosze, category });
    router.push("/koszyk");
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleBuyNow}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-accent-500 px-4 py-3.5 text-sm font-bold text-white shadow-md shadow-accent-500/25 transition hover:bg-accent-600 hover:shadow-accent-600/30 active:scale-[0.98]"
      >
        <Zap className="h-4 w-4" aria-hidden />
        Kup teraz
      </button>
      <button
        type="button"
        onClick={handleAdd}
        disabled={inCart}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-300 hover:text-brand-700 disabled:cursor-default disabled:opacity-60"
      >
        <ShoppingCart className="h-4 w-4" aria-hidden />
        {inCart ? (justAdded ? "Dodano do koszyka!" : "Już w koszyku") : (justAdded ? "Dodano!" : "Dodaj do koszyka")}
      </button>
    </div>
  );
}
