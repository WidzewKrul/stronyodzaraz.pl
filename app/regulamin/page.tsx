import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Regulamin usług",
  description:
    "Regulamin usług informatycznych stronyodzaraz.pl — strony internetowe, sklepy, opieka techniczna i integracje.",
  alternates: { canonical: "/regulamin" },
};

export default function RegulaminPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Regulamin usług stronyodzaraz.pl</h1>
      <p className="mt-2 text-sm text-slate-500">Wersja 1.0 · obowiązuje od 31.05.2026</p>

      <article className="prose-legal mt-8 space-y-6 text-slate-700">
        <section>
          <h2 className="text-lg font-semibold text-slate-900">§1. Postanowienia ogólne</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6">
            <li>
              Regulamin określa zasady sprzedaży usług informatycznych (projektowanie, wdrożenie i utrzymanie stron
              internetowych, sklepów, integracji) w serwisie <strong>stronyodzaraz.pl</strong> (dalej „Serwis”).
            </li>
            <li>Usługodawcą jest ByteBazaar Paweł Wenderlich (dalej „Usługodawca”).</li>
            <li>
              Kontakt:{" "}
              <a href="mailto:kontakt@bblikh.pl" className="text-brand-700 underline">
                kontakt@bblikh.pl
              </a>
              .
            </li>
            <li>
              Serwis działa w modelu <strong>productized</strong> — Klient wybiera pakiet o określonym scope i cenie,
              opłaca Stripe, uzupełnia brief online.
            </li>
            <li>
              Usługodawca nie świadczy doradztwa prawnego, podatkowego ani gwarancji konkretnych wyników biznesowych
              (sprzedaż, pozycje Google, ROAS).
            </li>
          </ol>
          <p className="mt-3 text-sm text-slate-600">
            Sprzedawca: ByteBazaar Paweł Wenderlich, ul. Henryka Sienkiewicza 85/87/1, 90-057 Łódź, NIP: 7282882108
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">§2. Definicje</h2>
          <div className="mt-3 overflow-x-auto">
            <table className="w-full min-w-[480px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-left">
                  <th className="py-2 pr-4 font-semibold text-slate-900">Termin</th>
                  <th className="py-2 font-semibold text-slate-900">Znaczenie</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-2 pr-4 font-medium text-slate-900">Klient</td>
                  <td className="py-2">osoba fizyczna, prawna lub jednostka bez osobowości prawnej</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium text-slate-900">Pakiet</td>
                  <td className="py-2">usługa o zdefiniowanym scope i cenie w katalogu /uslugi</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium text-slate-900">Brief</td>
                  <td className="py-2">formularz online z danymi firmy, materiałami i wymaganiami</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium text-slate-900">Scope</td>
                  <td className="py-2">zakres prac w pakiecie — patrz opis pakietu</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium text-slate-900">Staging</td>
                  <td className="py-2">wersja testowa przed publikacją</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium text-slate-900">Produkcja</td>
                  <td className="py-2">wdrożenie na docelowej domenie/hostingu</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-medium text-slate-900">Operator płatności</td>
                  <td className="py-2">Stripe Payments Europe Ltd.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">§3. Zawarcie umowy</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6">
            <li>Umowa zawierana jest z chwilą <strong>zaksięgowania płatności</strong> Stripe za wybrany Pakiet.</li>
            <li>
              Przed płatnością Klient akceptuje regulamin i{" "}
              <Link href="/polityka-prywatnosci" className="text-brand-700 underline">
                politykę prywatności
              </Link>
              .
            </li>
            <li>Ceny są <strong>brutto</strong> (z VAT). Faktura VAT na życzenie — dane NIP w checkout lub briefie.</li>
            <li>
              Po płatności Klient otrzymuje e-mail z linkiem do <strong>briefu</strong> — uzupełnienie w{" "}
              <strong>48 godzin roboczych</strong> uruchamia liczenie terminu realizacji.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">§4. Realizacja usługi</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6">
            <li>
              Termin liczony od dnia otrzymania kompletnego briefu i materiałów (logo, treści — lub zgodnie z scope
              pakietu).
            </li>
            <li>
              Terminy orientacyjne: Landing 5–7 dni rob., Start 7 dni, Pro 14 dni, Sklep 10–21 dni — wg opisu pakietu.
            </li>
            <li>Opóźnienie Klienta w briefie/materiałach <strong>przesuwa termin</strong> proporcjonalnie.</li>
            <li>
              Realizacja obejmuje wyłącznie <strong>scope pakietu</strong>. Prace poza scope — wycena osobna lub upsell
              z katalogu.
            </li>
            <li>
              Klient ma prawo do <strong>rund poprawek</strong> w pakiecie (1–2 wg tieru) w zakresie zamówionego scope.
            </li>
            <li>
              <strong>Gwarancja 30 dni</strong> — poprawki błędów i dopasowanie w scope po oddaniu projektu (nie nowe
              funkcje).
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">§5. Obowiązki Klienta</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6">
            <li>Dostarczenie prawdziwych danych w briefie.</li>
            <li>Materiały (logo, teksty, zdjęcia) lub akceptacja placeholder/stock w scope.</li>
            <li>Dostęp do hostingu/domeny lub współpraca przy konfiguracji DNS.</li>
            <li>Terminowa akceptacja stagingu (domyślnie 5 dni rob. bez uwag = akceptacja).</li>
            <li>
              Weryfikacja treści prawnych (regulamin sklepu, RODO) — szablony w scope, treści merytoryczne po stronie
              Klienta.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">§6. Prawo odstąpienia (konsument)</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6">
            <li>
              Dla usług cyfrowych wykonywanych <strong>w całości</strong> po wyraźnej zgodzie konsumenta —{" "}
              <strong>brak prawa odstąpienia</strong> po rozpoczęciu realizacji (art. 38 pkt 1 ustawy o prawach
              konsumenta).
            </li>
            <li>
              Przy checkout Klient zaznacza zgodę na rozpoczęcie przed upływem 14 dni i przyjmuje do wiadomości utratę
              prawa odstąpienia.
            </li>
            <li>
              <strong>Przed rozpoczęciem prac</strong> (brak briefu w 48h, brak akceptacji startu) — możliwy zwrot po
              odjęciu kosztów obsługi max 10% kwoty lub 150 zł (niższe).
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">§7. Reklamacje i gwarancja</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6">
            <li>
              Reklamacje:{" "}
              <a href="mailto:kontakt@bblikh.pl" className="text-brand-700 underline">
                kontakt@bblikh.pl
              </a>{" "}
              — opis, numer zamówienia, data.
            </li>
            <li>
              Termin rozpatrzenia: <strong>14 dni roboczych</strong>.
            </li>
            <li>
              Gwarancja 30 dni: naprawa błędów w scope; nie obejmuje nowych funkcji, zmiany designu poza rundami
              poprawek.
            </li>
            <li>
              Usługodawca nie odpowiada za: awarie hostingu Klienta, działania third-party (Stripe, P24), treści
              dostarczone przez Klienta naruszające prawo.
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">§8. Własność i licencja</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6">
            <li>Po <strong>pełnej zapłacie</strong> i oddaniu projektu Klient otrzymuje dostępy administratora.</li>
            <li>Treści (teksty, logo) — własność Klienta.</li>
            <li>
              Motyw, konfiguracja, kod wdrożenia — licencja na użytkowanie dla Klienta; komponenty third-party (motywy
              premium, wtyczki) — wg licencji producenta.
            </li>
            <li>
              W modelu <strong>WaaS</strong> (abonament) — szczegóły w sekcji{" "}
              <a href="#waas" className="text-brand-700 underline">
                §9 WaaS
              </a>
              .
            </li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">§9. Hosting i domena</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6">
            <li>Domyślnie Klient jest właścicielem domeny; Usługodawca pomaga w DNS w scope.</li>
            <li>Hosting może być po stronie Klienta lub w abonamencie WaaS.</li>
            <li>Usługodawca nie odpowiada za wygaśnięcie domeny/hostingu po stronie Klienta bez aktywnej opieki.</li>
          </ol>
        </section>

        <section id="waas">
          <h2 className="text-lg font-semibold text-slate-900">WaaS — opieka abonamentowa</h2>
          <p className="mt-3">
            Abonament opieki technicznej (WaaS) podlega osobnym warunkom: okres minimalny 12 miesięcy, zasady
            wstrzymania strony przy braku płatności, backup i aktualizacje wg opisu pakietu w katalogu. Szczegóły przy
            zakupie pakietu z kategorii opieka techniczna.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">§10. Ochrona danych</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6">
            <li>
              RODO —{" "}
              <Link href="/polityka-prywatnosci" className="text-brand-700 underline">
                polityka prywatności
              </Link>
              .
            </li>
            <li>Przy hostingu u Usługodawcy — umowa powierzenia przetwarzania danych na życzenie Klienta.</li>
          </ol>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-slate-900">§11. Postanowienia końcowe</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-6">
            <li>
              Regulamin dostępny w Serwisie; zmiany publikowane z 14-dniowym wyprzedzeniem dla trwających umów (nie
              pogarszające warunków).
            </li>
            <li>
              Prawo polskie; spory — sąd właściwy dla siedziby Usługodawcy; konsument — wg ustawy. Konsument może
              skorzystać z platformy ODR:{" "}
              <a
                href="https://ec.europa.eu/consumers/odr"
                className="text-brand-700 underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                ec.europa.eu/consumers/odr
              </a>
              .
            </li>
            <li>Integralna część: opisy pakietów w katalogu /uslugi oraz warunki WaaS (jeśli dotyczy).</li>
          </ol>
        </section>
      </article>
    </div>
  );
}
