import type { SplitMockData } from "@/lib/wykonane-content";

type Props = { data: SplitMockData; compact?: boolean };

export default function SplitMock({ data, compact }: Props) {
  return (
    <div className={`overflow-hidden rounded-xl border border-slate-200 shadow-lg ${compact ? "text-[10px]" : ""}`}>
      <p className="border-b border-slate-200 bg-slate-50 px-4 py-2 text-sm font-semibold text-slate-900">{data.title}</p>
      <div className="grid sm:grid-cols-2">
        <div className="border-b border-slate-200 bg-red-50/50 p-4 sm:border-b-0 sm:border-r">
          <p className="text-xs font-bold uppercase tracking-wide text-red-800">{data.before.label}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {data.before.badges.map((b) => (
              <span key={b} className="rounded bg-red-100 px-1.5 py-0.5 text-[10px] text-red-800">
                {b}
              </span>
            ))}
          </div>
          <ul className="mt-3 space-y-1 text-xs text-slate-600">
            {data.before.issues.map((issue) => (
              <li key={issue}>✕ {issue}</li>
            ))}
          </ul>
          <div className="mt-3 h-24 rounded border border-dashed border-red-200 bg-white/80" />
        </div>
        <div className="bg-emerald-50/50 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-800">{data.after.label}</p>
          <div className="mt-2 flex flex-wrap gap-1">
            {data.after.badges.map((b) => (
              <span key={b} className="rounded bg-emerald-100 px-1.5 py-0.5 text-[10px] text-emerald-800">
                {b}
              </span>
            ))}
          </div>
          <ul className="mt-3 space-y-1 text-xs text-slate-700">
            {data.after.features.map((f) => (
              <li key={f}>✓ {f}</li>
            ))}
          </ul>
          <div className="mt-3 h-24 rounded border border-emerald-200 bg-gradient-to-br from-brand-600 to-indigo-700 opacity-90" />
        </div>
      </div>
      <div className="border-t border-slate-200 bg-slate-50 px-4 py-3">
        <p className="mb-2 text-[10px] font-semibold uppercase text-slate-500">Przekierowania 301</p>
        <ul className="space-y-1 font-mono text-[10px] text-slate-600">
          {data.redirects.map((r) => (
            <li key={r.from}>
              {r.from} → {r.to}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
