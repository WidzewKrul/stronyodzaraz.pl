# Regulamin — usługi web (strony, sklepy, opieka)

**Status:** treść do wklejenia w `app/regulamin/page.tsx` (zastępuje copy HACCP).  
**Wersja:** 1.0 · 2026-05-31  
**Sprzedawca:** ByteBazaar Paweł Wenderlich, ul. Henryka Sienkiewicza 85/87/1, 90-057 Łódź, NIP: 7282882108, kontakt@bblikh.pl

**Powiązane:** REGULAMIN-WAAS.md · POLITYKA-ZWROTOW.md · OFERTA.md

---

## §1. Postanowienia ogólne

1. Regulamin określa zasady sprzedaży usług informatycznych (projektowanie, wdrożenie i utrzymanie stron internetowych, sklepów, integracji) w serwisie **stronyodzaraz.pl** (dalej „Serwis”).
2. Usługodawcą jest ByteBazaar Paweł Wenderlich (dalej „Usługodawca”).
3. Kontakt: kontakt@bblikh.pl.
4. Serwis działa w modelu **productized** — Klient wybiera pakiet o określonym scope i cenie, opłaca Stripe, uzupełnia brief online.
5. Usługodawca nie świadczy doradztwa prawnego, podatkowego ani gwarancji konkretnych wyników biznesowych (sprzedaż, pozycje Google, ROAS).

---

## §2. Definicje

| Termin | Znaczenie |
|--------|-----------|
| **Klient** | osoba fizyczna, prawna lub jednostka bez osobowości prawnej |
| **Pakiet** | usługa o zdefiniowanym scope i cenie w katalogu `/uslugi` |
| **Brief** | formularz online z danymi firmy, materiałami i wymaganiami |
| **Scope** | zakres prac w pakiecie — patrz opis pakietu i OFERTA.md |
| **Staging** | wersja testowa przed publikacją |
| **Produkcja** | wdrożenie na docelowej domenie/hostingu |
| **Operator płatności** | Stripe Payments Europe Ltd. |

---

## §3. Zawarcie umowy

1. Umowa zawierana jest z chwilą **zaksięgowania płatności** Stripe za wybrany Pakiet.
2. Przed płatnością Klient akceptuje regulamin i politykę prywatności.
3. Ceny są **brutto** (z VAT). Faktura VAT na życzenie — dane NIP w checkout lub briefie.
4. Po płatności Klient otrzymuje e-mail z linkiem do **briefu** — uzupełnienie w **48 godzin roboczych** uruchamia liczenie terminu realizacji.

---

## §4. Realizacja usługi

1. **Termin** liczony od dnia otrzymania kompletnego briefu i materiałów (logo, treści — lub zgodnie z scope pakietu).
2. Terminy orientacyjne: Landing 5–7 dni rob., Start 7 dni, Pro 14 dni, Sklep 10–21 dni — wg opisu pakietu.
3. Opóźnienie Klienta w briefie/materiałach **przesuwa termin** proporcjonalnie.
4. Realizacja obejmuje wyłącznie **scope pakietu**. Prace poza scope — wycena osobna lub upsell z katalogu.
5. Klient ma prawo do **rund poprawek** w pakiecie (1–2 wg tieru) w zakresie zamówionego scope.
6. **Gwarancja 30 dni** — poprawki błędów i dopasowanie w scope po oddaniu projektu (nie nowe funkcje).

---

## §5. Obowiązki Klienta

1. Dostarczenie prawdziwych danych w briefie.
2. Materiały (logo, teksty, zdjęcia) lub akceptacja placeholder/stock w scope.
3. Dostęp do hostingu/domeny lub współpraca przy konfiguracji DNS.
4. Terminowa akceptacja stagingu (domyślnie 5 dni rob. bez uwag = akceptacja).
5. Weryfikacja treści prawnych (regulamin sklepu, RODO) — szablony w scope, treści merytoryczne po stronie Klienta.

---

## §6. Prawo odstąpienia (konsument)

1. Dla usług cyfrowych wykonywanych **w całości** po wyraźnej zgodzie konsumenta — **brak prawa odstąpienia** po rozpoczęciu realizacji (art. 38 pkt 1 ustawy o prawach konsumenta).
2. Przy checkout Klient zaznacza zgodę na rozpoczęcie przed upływem 14 dni i przyjmuje do wiadomości utratę prawa odstąpienia.
3. **Przed rozpoczęciem prac** (brak briefu w 48h, brak akceptacji startu) — możliwy zwrot po odjęciu kosztów obsługi max 10% kwoty lub 150 zł (niższe).

Szczegóły: POLITYKA-ZWROTOW.md.

---

## §7. Reklamacje i gwarancja

1. Reklamacje: kontakt@bblikh.pl — opis, numer zamówienia, data.
2. Termin rozpatrzenia: **14 dni roboczych**.
3. Gwarancja 30 dni: naprawa błędów w scope; nie obejmuje nowych funkcji, zmiany designu poza rundami poprawek.
4. Usługodawca nie odpowiada za: awarie hostingu Klienta, działania third-party (Stripe, P24), treści dostarczone przez Klienta naruszające prawo.

---

## §8. Własność i licencja

1. Po **pełnej zapłacie** i oddaniu projektu Klient otrzymuje dostępy administratora.
2. Treści (teksty, logo) — własność Klienta.
3. Motyw, konfiguracja, kod wdrożenia — licencja na użytkowanie dla Klienta; komponenty third-party (motywy premium, wtyczki) — wg licencji producenta.
4. W modelu **WaaS** (abonament) — patrz REGULAMIN-WAAS.md.

---

## §9. Hosting i domena

1. Domyślnie Klient jest właścicielem domeny; Usługodawca pomaga w DNS w scope.
2. Hosting może być po stronie Klienta lub w abonamencie WaaS.
3. Usługodawca nie odpowiada za wygaśnięcie domeny/hostingu po stronie Klienta bez aktywnej opieki.

---

## §10. Ochrona danych

1. RODO — polityka prywatności `/polityka-prywatnosci`.
2. Przy hostingu u Usługodawcy — umowa powierzenia: RODO-POWIERZENIE-SZABLON.md.

---

## §11. Postanowienia końcowe

1. Regulamin dostępny w Serwisie; zmiany publikowane z 14-dniowym wyprzedzeniem dla trwających umów (nie pogarszające warunków).
2. Prawo polskie; spory — sąd właściwy dla siedziby Usługodawcy; konsument — wg ustawy.
3. Integralna część: OFERTA (scope pakietów), REGULAMIN-WAAS (jeśli dotyczy).

---

*Implementacja: skopiuj sekcje do JSX `app/regulamin/page.tsx`. Review prawnika zalecany przed Stripe live.*
