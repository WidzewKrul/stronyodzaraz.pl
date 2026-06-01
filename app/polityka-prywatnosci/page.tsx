import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Polityka prywatności",
  description: "Polityka prywatności serwisu stronyodzaraz.pl — RODO, cookies, przetwarzanie danych.",
  alternates: { canonical: "/polityka-prywatnosci" },
};

export default function PolitykaPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Polityka prywatności</h1>
      <p className="mt-2 text-sm text-slate-500">Wersja 1.0 · 31.05.2026</p>

      <article className="prose-legal mt-8 space-y-6 text-slate-700">
        <section>
          <h2 className="text-lg font-semibold text-slate-900">1. Administrator danych</h2>
          <p className="mt-3">
            Administratorem danych osobowych jest <strong>ByteBazaar Paweł Wenderlich</strong>, ul. Henryka
            Sienkiewicza 85/87/1, 90-057 Łódź, NIP: 7282882108 (dalej „Administrator”).
          </p>
          <p className="mt-2">
            Kontakt w sprawach RODO:{" "}
            <a href="mailto:kontakt@bblikh.pl" className="text-brand-700 underline">
              kontakt@bblikh.pl
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">2. Zakres przetwarzanych danych</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="py-2 pr-4 font-semibold text-slate-900">Kategoria</th>
                  <th className="py-2 pr-4 font-semibold text-slate-900">Przykłady</th>
                  <th className="py-2 font-semibold text-slate-900">Skąd</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2 pr-4 font-medium">Identyfikacja</td>
                  <td className="py-2 pr-4">imię, nazwisko, firma, NIP</td>
                  <td className="py-2">checkout, brief, formularz</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">Kontakt</td>
                  <td className="py-2 pr-4">e-mail, telefon</td>
                  <td className="py-2">checkout, formularz kontakt</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">Transakcyjne</td>
                  <td className="py-2 pr-4">ID zamówienia, status płatności, kwota</td>
                  <td className="py-2">Stripe</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">Techniczne</td>
                  <td className="py-2 pr-4">IP, User-Agent, cookies</td>
                  <td className="py-2">serwer, analytics (po zgodzie)</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">Brief projektu</td>
                  <td className="py-2 pr-4">treści biznesowe, preferencje, linki</td>
                  <td className="py-2">formularz po zakupie</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">Korespondencja</td>
                  <td className="py-2 pr-4">treść wiadomości</td>
                  <td className="py-2">e-mail, formularz</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">3. Cele i podstawy prawne (RODO)</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="py-2 pr-4 font-semibold text-slate-900">Cel</th>
                  <th className="py-2 pr-4 font-semibold text-slate-900">Podstawa</th>
                  <th className="py-2 font-semibold text-slate-900">Okres</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2 pr-4">Realizacja umowy (strona, sklep, opieka)</td>
                  <td className="py-2 pr-4">art. 6 ust. 1 lit. b</td>
                  <td className="py-2">do zakończenia umowy + przedawnienie roszczeń</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Faktury, księgowość</td>
                  <td className="py-2 pr-4">art. 6 ust. 1 lit. c</td>
                  <td className="py-2">5 lat (ustawa o rachunkowości)</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Obsługa zapytań, reklamacji</td>
                  <td className="py-2 pr-4">art. 6 ust. 1 lit. f (interes)</td>
                  <td className="py-2">3 lata od ostatniego kontaktu</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Marketing własny (newsletter — jeśli włączony)</td>
                  <td className="py-2 pr-4">art. 6 ust. 1 lit. a (zgoda)</td>
                  <td className="py-2">do wycofania</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Analityka (GA4, Pixel — po zgodzie)</td>
                  <td className="py-2 pr-4">art. 6 ust. 1 lit. a</td>
                  <td className="py-2">wg ustawień cookies</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">Drip upsell po projekcie</td>
                  <td className="py-2 pr-4">art. 6 ust. 1 lit. f — oferta usług powiązanych</td>
                  <td className="py-2">12 mc od oddania projektu</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">4. Odbiorcy danych (procesorzy)</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="py-2 pr-4 font-semibold text-slate-900">Podmiot</th>
                  <th className="py-2 pr-4 font-semibold text-slate-900">Rola</th>
                  <th className="py-2 pr-4 font-semibold text-slate-900">Lokalizacja</th>
                  <th className="py-2 font-semibold text-slate-900">Cel</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2 pr-4 font-medium">Stripe Payments Europe Ltd.</td>
                  <td className="py-2 pr-4">operator płatności</td>
                  <td className="py-2 pr-4">UE</td>
                  <td className="py-2">płatności, faktury</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">Resend, Inc.</td>
                  <td className="py-2 pr-4">poczta transakcyjna</td>
                  <td className="py-2 pr-4">USA (SCC)</td>
                  <td className="py-2">e-maile systemowe</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">Dostawca VPS (Hetzner/OVH)</td>
                  <td className="py-2 pr-4">hosting</td>
                  <td className="py-2 pr-4">UE</td>
                  <td className="py-2">aplikacja, baza</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">OpenRouter (opcj.)</td>
                  <td className="py-2 pr-4">AI API</td>
                  <td className="py-2 pr-4">USA</td>
                  <td className="py-2">generowanie briefów</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">Google LLC</td>
                  <td className="py-2 pr-4">Analytics/Ads</td>
                  <td className="py-2 pr-4">USA/UE</td>
                  <td className="py-2">po zgodzie cookies</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">Meta Platforms</td>
                  <td className="py-2 pr-4">Pixel</td>
                  <td className="py-2 pr-4">USA/UE</td>
                  <td className="py-2">po zgodzie cookies</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-slate-600">Lista aktualizowana — żądanie na kontakt@bblikh.pl.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">5. Przekazywanie poza EOG</h2>
          <p className="mt-3">
            Resend, OpenRouter, Google/Meta — na podstawie Standardowych Klauzul Umownych (SCC) lub decyzji
            adekwacyjności, w zakresie niezbędnym do usługi.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">6. Prawa osoby, której dane dotyczą</h2>
          <p className="mt-3">
            Masz prawo do: dostępu, sprostowania, usunięcia, ograniczenia, przenoszenia, sprzeciwu (art. 21), cofnięcia
            zgody (bez wpływu na wcześniejsze przetwarzanie), skargi do <strong>PUODO</strong>.
          </p>
          <p className="mt-2">
            Realizacja:{" "}
            <a href="mailto:kontakt@bblikh.pl" className="text-brand-700 underline">
              kontakt@bblikh.pl
            </a>{" "}
            — odpowiedź do 30 dni.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">7. Cookies</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[360px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="py-2 pr-4 font-semibold text-slate-900">Typ</th>
                  <th className="py-2 pr-4 font-semibold text-slate-900">Przykład</th>
                  <th className="py-2 font-semibold text-slate-900">Zgoda</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2 pr-4 font-medium">Niezbędne</td>
                  <td className="py-2 pr-4">sesja koszyka, CSRF</td>
                  <td className="py-2">nie wymaga</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">Analityczne</td>
                  <td className="py-2 pr-4">GA4</td>
                  <td className="py-2">tak — ConsentBanner</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium">Marketing</td>
                  <td className="py-2 pr-4">Meta Pixel</td>
                  <td className="py-2">tak — ConsentBanner</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-sm text-slate-600">Szczegóły: banner na stronie + ustawienia przeglądarki.</p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">8. Bezpieczeństwo</h2>
          <p className="mt-3">
            SSL/TLS, hasła hashowane, dostęp do produkcji ograniczony, backup bazy, aktualizacje bezpieczeństwa.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">9. Zautomatyzowane decyzje</h2>
          <p className="mt-3">
            Nie stosujemy zautomatyzowanego podejmowania decyzji wywołującego skutki prawne. Generowanie briefów AI
            wspiera proces — finalna decyzja po stronie człowieka.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">10. Dane w projekcie Klienta (WaaS)</h2>
          <p className="mt-3">
            Gdy utrzymujemy stronę Klienta — <strong>Klient jest Administratorem</strong> danych swoich użytkowników; my
            — Procesorem (umowa powierzenia na życzenie).
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">11. Zmiany polityki</h2>
          <p className="mt-3">
            Aktualna wersja na stronie z datą. Istotne zmiany — informacja e-mail do aktywnych klientów.
          </p>
        </section>
      </article>
    </div>
  );
}
