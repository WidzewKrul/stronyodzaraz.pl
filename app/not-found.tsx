import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
      {/* Inline illustration */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 200 140"
        className="mx-auto w-48 text-brand-200"
        aria-hidden="true"
      >
        <rect x="20" y="30" width="160" height="100" rx="10" fill="currentColor" opacity="0.4" />
        <rect x="20" y="30" width="160" height="22" rx="10" fill="currentColor" />
        <circle cx="36" cy="41" r="5" fill="white" opacity="0.8" />
        <circle cx="52" cy="41" r="5" fill="white" opacity="0.5" />
        <circle cx="68" cy="41" r="5" fill="white" opacity="0.3" />
        <text x="100" y="98" textAnchor="middle" fontSize="38" fontWeight="800" fill="#4f46e5" opacity="0.7">404</text>
      </svg>

      <p className="mt-4 text-sm font-semibold uppercase tracking-wider text-brand-700">404</p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900">Nie znaleziono strony</h1>
      <p className="mt-2 text-slate-600">Taka strona nie istnieje lub została przeniesiona.</p>
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/" className="rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-brand-700">Strona główna</Link>
        <Link href="/uslugi" className="rounded-lg border border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700 hover:border-brand-300 hover:text-brand-700">Katalog usług</Link>
      </div>
    </div>
  );
}
