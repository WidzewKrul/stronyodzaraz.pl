import type { FlowMockData } from "@/lib/wykonane-content";
import { LucideByName } from "./LucideByName";

type Props = { data: FlowMockData; compact?: boolean };

export default function FlowMock({ data, compact }: Props) {
  const footer = data.footer;
  const footerType = footer.type as string;

  return (
    <div className={`rounded-xl border border-slate-200 bg-white p-4 shadow-lg ${compact ? "" : "sm:p-6"}`}>
      <p className="text-sm font-semibold text-slate-900">{data.title}</p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        {data.steps.map((step, i) => (
          <div key={step.label} className="flex flex-1 min-w-[72px] flex-col items-center">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-100 text-brand-700">
              <LucideByName name={step.icon} className="h-5 w-5" />
            </div>
            <p className="mt-1 text-center text-[10px] font-medium text-slate-700">{step.label}</p>
            {i < data.steps.length - 1 ? (
              <span className="absolute hidden sm:block" aria-hidden />
            ) : null}
          </div>
        ))}
      </div>
      <div className="relative mt-2 hidden h-0.5 bg-brand-200 sm:block">
        <div className="absolute inset-x-8 top-0 h-full bg-brand-300" />
      </div>
      <div className="mt-4 rounded-lg bg-slate-50 p-3 text-center">
        {footerType === "paczkomaty" && (
          <div className="flex flex-wrap justify-center gap-2">
            {(footer.points as string[]).map((p) => (
              <span key={p} className="rounded border border-slate-200 bg-white px-2 py-1 text-[10px] font-mono text-slate-600">
                {p}
              </span>
            ))}
          </div>
        )}
        {footerType === "badge" && (
          <p className="text-xs text-slate-600">{String(footer.text)}</p>
        )}
      </div>
    </div>
  );
}
