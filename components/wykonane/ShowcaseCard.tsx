import Link from "next/link";
import type { WykonaneItem } from "@/lib/wykonane-content";
import { CATEGORY_LABELS } from "@/lib/wykonane-content";
import ShowcaseMock from "./ShowcaseMock";

type Props = {
  item: WykonaneItem;
  compact?: boolean;
};

export default function ShowcaseCard({ item, compact }: Props) {
  const categoryLabel = CATEGORY_LABELS[item.category] ?? item.category;

  return (
    <article className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-brand-200 hover:shadow-md">
      <Link href={`/wykonane/${item.slug}`} className="block">
        <div className={compact ? "p-2" : "p-3"}>
          <ShowcaseMock item={item} compact />
        </div>
      </Link>
      <div className={`flex flex-1 flex-col ${compact ? "p-3" : "p-4"}`}>
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold text-brand-800">
            {categoryLabel}
          </span>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-600">
            {item.tier}
          </span>
        </div>
        <h3 className={`mt-2 font-bold text-slate-900 ${compact ? "text-sm" : "text-base"}`}>
          <Link href={`/wykonane/${item.slug}`} className="hover:text-brand-700">
            {item.title}
          </Link>
        </h3>
        <p className="mt-1 text-xs text-slate-500">{item.fakeBrand}</p>
        {!compact && <p className="mt-2 flex-1 text-sm text-slate-600 line-clamp-2">{item.scopeOneLiner}</p>}
        <p className="mt-3 text-sm font-bold text-slate-900">
          od {item.priceFrom.toLocaleString("pl-PL")} {item.priceNote ?? "zł"}
        </p>
        <Link
          href={`/wykonane/${item.slug}`}
          className="mt-3 text-xs font-semibold text-brand-700 hover:text-brand-800"
        >
          Zobacz szczegóły →
        </Link>
      </div>
    </article>
  );
}
