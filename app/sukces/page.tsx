import Link from "next/link";
import type { Metadata } from "next";
import ClearCart from "./ClearCart";

export const metadata: Metadata = {
  title: "Dziękujemy za zakup",
  robots: { index: false, follow: false },
};

type SP = Promise<{ order?: string; session_id?: string; tool?: string }>;

export default async function SukcesPage({ searchParams }: { searchParams: SP }) {
  const sp = await searchParams;
  return (
    <div className="mx-auto max-w-2xl px-4 py-24 text-center sm:px-6">
      <ClearCart orderId={sp.order} sessionId={sp.session_id} tool={sp.tool} />
      <div className="relative mx-auto flex h-24 w-24 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-brand-100 opacity-40" />
        <div className="absolute inset-2 rounded-full bg-brand-100 opacity-60" />
        <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-brand-600 text-white shadow-lg">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
      </div>
      <h1 className="mt-4 text-3xl font-bold text-slate-900">Dziękujemy za zakup</h1>
      <p className="mt-2 text-slate-600">
        Płatność została zaksięgowana. Wyślemy link do briefu online — uzupełnij go w ciągu 48 h, aby rozpocząć realizację.
        {sp.order ? <> Numer zamówienia: <strong>#{sp.order}</strong>.</> : null}
      </p>
      <p className="mt-2 text-sm text-slate-500">
        Jeśli wiadomość nie dotarła w ciągu 10 minut, sprawdź folder SPAM lub napisz do nas:{" "}
        <a href="mailto:kontakt@bblikh.pl" className="text-brand-700 underline">kontakt@bblikh.pl</a>.
      </p>

      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/uslugi" className="rounded-lg bg-brand-600 px-5 py-2.5 font-semibold text-white hover:bg-brand-700">
          Katalog usług
        </Link>
        <Link href="/" className="rounded-lg border border-slate-200 px-5 py-2.5 font-semibold text-slate-800 hover:border-brand-300 hover:text-brand-700">
          Strona główna
        </Link>
      </div>
    </div>
  );
}
