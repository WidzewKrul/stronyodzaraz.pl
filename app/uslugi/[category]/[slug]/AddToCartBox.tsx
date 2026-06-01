"use client";

import { useCart } from "@/components/CartProvider";
import { useRouter } from "next/navigation";
import { ShoppingCart, Zap } from "lucide-react";
import { useState } from "react";

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
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  function handleBuyNow() {
    addItem({ slug, title, category, priceGrosze });
    router.push("/koszyk");
  }

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={handleBuyNow}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-brand-700 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-800"
      >
        <Zap className="h-4 w-4" aria-hidden />
        Kup teraz
      </button>
      <button
        type="button"
        onClick={handleAdd}
        disabled={inCart}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-300 px-4 py-3 text-sm font-semibold text-slate-700 transition hover:border-brand-400 hover:text-brand-700 disabled:cursor-default disabled:opacity-60"
      >
        <ShoppingCart className="h-4 w-4" aria-hidden />
        {inCart ? (justAdded ? "Dodano do koszyka!" : "Już w koszyku") : (justAdded ? "Dodano!" : "Dodaj do koszyka")}
      </button>
    </div>
  );
}
