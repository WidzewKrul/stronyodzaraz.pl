type Props = { className?: string };

const ROWS = [
  { label: "Cena", agency: "Wycena po 2–4 tygodniach", us: "Od razu w katalogu" },
  { label: "Scope", agency: "Często niejasny", us: "Lista w opisie pakietu" },
  { label: "Start", agency: "Spotkania i briefy", us: "Checkout + brief online" },
  { label: "Termin", agency: "2–3 miesiące", us: "7–14 dni roboczych" },
];

export default function ProductizedCompare({ className = "" }: Props) {
  return (
    <section className={`border-y border-slate-200 bg-slate-50 py-14 ${className}`}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-slate-900">Dlaczego pakiety zamiast wyceny?</h2>
        <p className="mt-2 text-center text-sm text-slate-600">
          Productized services — mniej ryzyka, szybsza decyzja zakupowa.
        </p>
        <div className="mt-8 overflow-hidden rounded-xl border border-slate-200 bg-white">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 font-semibold text-slate-600" />
                <th className="px-4 py-3 font-semibold text-slate-700">Agencja tradycyjna</th>
                <th className="bg-brand-50 px-4 py-3 font-semibold text-brand-900">stronyodzaraz.pl</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {ROWS.map((row) => (
                <tr key={row.label}>
                  <td className="px-4 py-3 font-medium text-slate-700">{row.label}</td>
                  <td className="px-4 py-3 text-slate-600">{row.agency}</td>
                  <td className="bg-brand-50/40 px-4 py-3 font-medium text-slate-900">{row.us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
