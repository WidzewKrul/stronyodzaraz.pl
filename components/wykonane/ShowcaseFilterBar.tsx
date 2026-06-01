import Link from "next/link";

type Props = {
  filters: Array<{ id: string; label: string }>;
  activeId: string;
};

export default function ShowcaseFilterBar({ filters, activeId }: Props) {
  return (
    <div className="sticky top-16 z-20 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 py-3 sm:px-6">
        {filters.map((f) => {
          const href = f.id === "all" ? "/wykonane" : `/wykonane?cat=${f.id}`;
          const active = activeId === f.id;
          return (
            <Link
              key={f.id}
              href={href}
              className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition ${
                active ? "bg-brand-600 text-white" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {f.label}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
