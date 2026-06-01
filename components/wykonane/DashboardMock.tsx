import type { DashboardMockData } from "@/lib/wykonane-content";

type Props = { data: DashboardMockData; compact?: boolean };

export default function DashboardMock({ data, compact }: Props) {
  const main = data.main;
  const mainType = main.type as string;

  return (
    <div className={`overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-lg ${compact ? "text-[10px]" : ""}`}>
      <div className="flex items-center justify-between border-b border-slate-700 px-4 py-3">
        <p className="text-sm font-semibold text-white">{data.title}</p>
        <span className="rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
          {data.status}
        </span>
      </div>
      <div className="grid gap-3 p-4 sm:grid-cols-[140px_1fr]">
        <aside className="hidden space-y-2 sm:block">
          {["Panel", "Strony", "Media", "Ustawienia"].map((label) => (
            <div key={label} className="rounded-lg bg-slate-800 px-2 py-1.5 text-[10px] text-slate-400">
              {label}
            </div>
          ))}
        </aside>
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-2">
            {data.kpis.map((kpi) => (
              <div key={kpi.label} className="rounded-lg bg-slate-800 p-2">
                <p className="text-[9px] text-slate-400">{kpi.label}</p>
                <p className="text-xs font-bold text-white">{kpi.value}</p>
              </div>
            ))}
          </div>
          <div className="rounded-lg border border-slate-700 bg-slate-800/80 p-3">
            {mainType === "editor" && (
              <>
                <p className="text-[10px] text-slate-400">Edytor</p>
                <p className="mt-1 text-sm font-semibold text-white">{String(main.pageTitle)}</p>
                <ul className="mt-2 space-y-1">
                  {(main.blocks as string[]).map((b) => (
                    <li key={b} className="rounded bg-slate-700/50 px-2 py-1 text-[10px] text-slate-300">
                      {b}
                    </li>
                  ))}
                </ul>
              </>
            )}
            {mainType === "chart" && (
              <>
                <p className="text-[10px] text-slate-400">{String(main.label)}</p>
                <div className="mt-2 flex h-16 items-end gap-1">
                  {[40, 65, 55, 80, 70, 90, 75].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t bg-brand-500/80" style={{ height: `${h}%` }} />
                  ))}
                </div>
                <div className="mt-2 flex gap-2 text-[9px] text-slate-400">
                  {(main.sources as string[]).map((s) => (
                    <span key={s}>{s}</span>
                  ))}
                </div>
              </>
            )}
            {mainType === "stats" && (
              <div className="flex gap-6">
                <div>
                  <p className="text-[10px] text-slate-400">Konwersje</p>
                  <p className="text-xl font-bold text-white">{String(main.conversions)}</p>
                </div>
                <div>
                  <p className="text-[10px] text-slate-400">Kliknięcia</p>
                  <p className="text-xl font-bold text-white">{String(main.clicks)}</p>
                </div>
              </div>
            )}
            {mainType === "checklist" && (
              <ul className="space-y-2">
                {(main.items as Array<{ label: string; ok?: boolean; value?: string }>).map((item) => (
                  <li key={item.label} className="flex justify-between text-[11px] text-slate-300">
                    <span>{item.label}</span>
                    <span className={item.ok ? "text-emerald-400" : "text-slate-400"}>
                      {item.value ?? (item.ok ? "✓" : "—")}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {mainType === "table" && (
              <table className="w-full text-left text-[10px] text-slate-300">
                <tbody>
                  {(main.rows as string[][]).map((row, i) => (
                    <tr key={i} className="border-t border-slate-700 first:border-0">
                      {row.map((cell, j) => (
                        <td key={j} className="py-1.5 pr-2">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
