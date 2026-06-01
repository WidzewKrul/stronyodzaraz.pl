import Link from "next/link";

type Props = {
  page: number;
  totalPages: number;
  q?: string;
  cat?: string;
};

function pageHref(page: number, q?: string, cat?: string) {
  const params = new URLSearchParams();
  if (q) params.set("q", q);
  if (cat) params.set("cat", cat);
  if (page > 1) params.set("page", String(page));
  const s = params.toString();
  return s ? `/uslugi?${s}` : "/uslugi";
}

export default function ShopPagination({ page, totalPages, q, cat }: Props) {
  if (totalPages <= 1) return null;

  const pages: number[] = [];
  const start = Math.max(1, page - 2);
  const end = Math.min(totalPages, page + 2);
  for (let p = start; p <= end; p++) pages.push(p);

  return (
    <nav className="mt-10 flex flex-wrap items-center justify-center gap-2" aria-label="Paginacja">
      {page > 1 ? (
        <Link
          href={pageHref(page - 1, q, cat)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700"
        >
          ← Poprzednia
        </Link>
      ) : null}
      {pages.map((p) => (
        <Link
          key={p}
          href={pageHref(p, q, cat)}
          className={`min-w-[2.5rem] rounded-lg border px-3 py-2 text-center text-sm font-medium transition ${
            p === page
              ? "border-brand-600 bg-brand-600 text-white"
              : "border-slate-200 text-slate-700 hover:border-brand-300"
          }`}
          aria-current={p === page ? "page" : undefined}
        >
          {p}
        </Link>
      ))}
      {page < totalPages ? (
        <Link
          href={pageHref(page + 1, q, cat)}
          className="rounded-lg border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700"
        >
          Następna →
        </Link>
      ) : null}
    </nav>
  );
}
