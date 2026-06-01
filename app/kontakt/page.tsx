import type { Metadata } from "next";
import Link from "next/link";
import KontaktForm from "./KontaktForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Skontaktuj się ze stronyodzaraz.pl — strony WordPress, sklepy internetowe, opieka techniczna. Odpowiadamy w 24h.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-4 text-xs text-slate-500">
        <Link href="/" className="hover:text-brand-700">Strona główna</Link>
        <span className="mx-1.5">/</span>
        <span className="text-slate-700">Kontakt</span>
      </nav>
      <KontaktForm />
    </div>
  );
}
