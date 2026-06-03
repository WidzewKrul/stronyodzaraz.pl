import Link from "next/link";
import { truncateSeoTitle } from "@/lib/product-seo";
import ServiceThumb from "@/components/ServiceThumb";

function formatPrice(grosze: number): string {
  return (grosze / 100).toFixed(2).replace(".", ",") + " zł";
}

type Props = {
  slug: string;
  title: string;
  shortDesc?: string;
  category: string;
  categoryTitle: string;
  priceGrosze: number;
  badgeClass: string;
  badgeTextClass: string;
  tags?: string[];
};

export default function ProductCard({
  slug,
  title,
  shortDesc,
  category,
  categoryTitle,
  priceGrosze,
  badgeClass,
  badgeTextClass,
}: Props) {
  const href = `/uslugi/${category}/${slug}`;
  const displayTitle = truncateSeoTitle(title);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg">
      <Link href={href} tabIndex={-1} aria-hidden="true" className="block overflow-hidden">
        <ServiceThumb slug={slug} title={title} category={category} className="group-hover:scale-[1.01] transition duration-300" />
      </Link>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <span className={`mb-2 inline-block self-start rounded-full px-2.5 py-0.5 text-[11px] font-semibold ${badgeClass} ${badgeTextClass}`}>
          {categoryTitle}
        </span>
        <Link href={href} className="flex-1 text-sm font-semibold leading-snug text-slate-900 transition hover:text-brand-700 sm:text-[15px]">
          {displayTitle}
        </Link>
        {shortDesc ? (
          <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-500">{shortDesc}</p>
        ) : null}
        <div className="mt-4 flex items-baseline justify-between gap-2">
          <p className="text-lg font-extrabold tracking-tight text-slate-900">{formatPrice(priceGrosze)}</p>
        </div>
        <Link
          href={href}
          aria-label={`Zamów pakiet: ${displayTitle}`}
          className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-accent-500 px-3 py-2.5 text-xs font-semibold text-white shadow-sm shadow-accent-500/20 transition hover:bg-accent-600 active:scale-95 focus-visible:ring-2 focus-visible:ring-accent-400 focus-visible:ring-offset-2"
        >
          Zamów pakiet →
        </Link>
      </div>
    </article>
  );
}
