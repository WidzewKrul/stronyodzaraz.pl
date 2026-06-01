import Link from "next/link";
import { getCompareStartPro } from "@/lib/compare-content";

type Props = { className?: string };

export default function CompareStartPro({ className = "" }: Props) {
  const data = getCompareStartPro();

  return (
    <section className={`py-14 ${className}`}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-slate-900">{data.h2}</h2>
        <p className="mt-2 text-center text-sm text-slate-600">{data.subtitle}</p>
        <div className="mt-8 overflow-hidden rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-600" />
                {data.columns.map((col, i) => (
                  <th
                    key={col}
                    className={`px-4 py-3 font-semibold text-slate-900 ${i === data.highlightColumn ? "bg-brand-50" : ""}`}
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.rows.map((row) => (
                <tr key={row.label}>
                  <td className="px-4 py-3 font-medium text-slate-700">{row.label}</td>
                  <td className="px-4 py-3 text-slate-600">{row.start}</td>
                  <td className="bg-brand-50/50 px-4 py-3 font-medium text-slate-900">{row.pro}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link
            href={data.ctaStart.href}
            className="rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-800 hover:border-brand-300"
          >
            {data.ctaStart.label}
          </Link>
          <Link
            href={data.ctaPro.href}
            className="rounded-lg bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-brand-700"
          >
            {data.ctaPro.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
