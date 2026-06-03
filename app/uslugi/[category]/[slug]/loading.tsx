export default function PdpLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-4 h-4 w-64 animate-pulse rounded bg-slate-200" />
      <div className="grid gap-10 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <div className="aspect-video w-full animate-pulse rounded-2xl bg-slate-200" />
          <div className="space-y-3">
            <div className="h-8 w-3/4 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-full animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-5/6 animate-pulse rounded bg-slate-200" />
            <div className="h-4 w-4/6 animate-pulse rounded bg-slate-200" />
          </div>
        </div>
        <div className="space-y-4 rounded-2xl border border-slate-200 p-6">
          <div className="h-8 w-32 animate-pulse rounded bg-slate-200" />
          <div className="h-12 w-full animate-pulse rounded-lg bg-slate-200" />
          <div className="h-12 w-full animate-pulse rounded-lg bg-slate-200" />
        </div>
      </div>
    </div>
  );
}
