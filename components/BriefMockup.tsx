import { ClipboardList, FileText, Mail } from "lucide-react";

type Props = {
  title: string;
  className?: string;
};

/** CSS mockup briefu projektu — bez assetu graficznego. */
export default function BriefMockup({ title, className = "" }: Props) {
  return (
    <div className={`relative aspect-[16/10] overflow-hidden rounded-t-2xl bg-gradient-to-br from-brand-50 via-white to-sky-50 p-5 ${className}`}>
      <div className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-md">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-100 text-brand-700">
            <ClipboardList className="h-4 w-4" aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-slate-900">Brief projektu</p>
            <p className="truncate text-[10px] text-slate-500">{title}</p>
          </div>
        </div>
        <div className="mt-3 space-y-2">
          {["Dane firmy", "Preferencje designu", "Materiały"].map((row) => (
            <div key={row} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-brand-400" />
              <span className="text-[10px] text-slate-600">{row}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 flex items-center gap-2 rounded-lg bg-brand-50 px-2 py-1.5">
          <FileText className="h-3.5 w-3.5 text-brand-600" aria-hidden />
          <span className="text-[10px] font-medium text-brand-800">PDF + DOCX po wypełnieniu</span>
          <Mail className="ml-auto h-3.5 w-3.5 text-slate-400" aria-hidden />
        </div>
      </div>
    </div>
  );
}
