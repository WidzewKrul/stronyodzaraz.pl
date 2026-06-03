import Link from "next/link";
import type { WykonaneItem } from "@/lib/wykonane-content";
import { CATEGORY_LABELS } from "@/lib/wykonane-content";
import ShowcaseMock from "./ShowcaseMock";
import { ArrowRight } from "lucide-react";

type Props = {
  item: WykonaneItem;
  compact?: boolean;
};

export default function ShowcaseCard({ item, compact }: Props) {
  const categoryLabel = CATEGORY_LABELS[item.category] ?? item.category;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-200 hover:-translate-y-1 hover:border-brand-200 hover:shadow-lg">
      <Link href={`/wykonane/${item.slug}`} className="block overflow-hidden bg-slate-50">
        <div className={`transition duration-300 group-hover:scale-[1.01] ${compact ? "p-2" : "p-3"}`}>
          <ShowcaseMock item={item} compact />
        </div>
      </Link>
      <div className={`flex flex-1 flex-col ${compact ? "p-3" : "p-5"}`}>
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="rounded-full bg-brand-100 px-2.5 py-0.5 text-[11px] font-semibold text-brand-800">
            {categoryLabel}
          </span>
          <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-medium text-slate-600">
            {item.tier}
          </span>
        </div>
        <h3 className={`mt-3 font-bold text-slate-900 transition group-hover:text-brand-700 ${compact ? "text-sm" : "text-base"}`}>
          <Link href={`/wykonane/${item.slug}`}>
            {item.title}
          </Link>
        </h3>
        <p className="mt-0.5 text-xs text-slate-400">{item.fakeBrand}</p>
        {!compact && (
          <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 line-clamp-2">{item.scopeOneLiner}</p>
        )}
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm font-extrabold tracking-tight text-slate-900">
            od {item.priceFrom.toLocaleString("pl-PL")} {item.priceNote ?? "zł"}
          </p>
          <Link
            href={`/wykonane/${item.slug}`}
            className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 transition group-hover:text-brand-700"
          >
            Szczegóły <ArrowRight className="h-3 w-3 transition group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
