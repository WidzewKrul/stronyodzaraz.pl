"use client";

import Link from "next/link";
import { Lightbulb, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/components/CartProvider";
import type { UpsellOffer } from "@/lib/upsell";

type Props = { offer: UpsellOffer };

function formatPrice(grosze: number): string {
  return (grosze / 100).toFixed(2).replace(".", ",") + " zł";
}

export default function UpsellBox({ offer }: Props) {
  const { addItem, items } = useCart();
  const [justAdded, setJustAdded] = useState(false);
  const inCart = items.some((i) => i.slug === offer.slug);
  const href = `/uslugi/${offer.category}/${offer.slug}`;

  function handleAdd() {
    addItem({
      slug: offer.slug,
      title: offer.title,
      category: offer.category,
      priceGrosze: offer.priceGrosze,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 2000);
  }

  return (
    <div className="mt-5 rounded-xl border border-amber-200/80 bg-amber-50/60 p-4">
      <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-amber-900">
        <Lightbulb className="h-3.5 w-3.5" aria-hidden />
        Często dokładane razem
      </p>
      <p className="mt-2 text-sm font-semibold text-slate-900">
        <Link href={href} className="hover:text-brand-700">
          {offer.title}
        </Link>
        <span className="ml-1.5 font-bold text-brand-700">{formatPrice(offer.priceGrosze)}</span>
      </p>
      <p className="mt-1 text-xs leading-relaxed text-slate-600">{offer.oneLiner}</p>
      <div className="mt-3 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={handleAdd}
          disabled={inCart}
          className="inline-flex items-center gap-1.5 rounded-lg bg-brand-700 px-3 py-2 text-xs font-semibold text-white hover:bg-brand-800 disabled:opacity-60"
        >
          <ShoppingCart className="h-3.5 w-3.5" aria-hidden />
          {inCart ? (justAdded ? "Dodano!" : "W koszyku") : "Dodaj do koszyka"}
        </button>
        <Link
          href={href}
          className="inline-flex items-center rounded-lg border border-slate-300 px-3 py-2 text-xs font-semibold text-slate-700 hover:border-brand-400"
        >
          Porównaj
        </Link>
      </div>
    </div>
  );
}
