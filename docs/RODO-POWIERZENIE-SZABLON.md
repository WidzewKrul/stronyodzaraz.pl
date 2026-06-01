# Umowa powierzenia przetwarzania danych (RODO) — szablon

**Kiedy:** Klient korzysta z WaaS (hosting u was) lub przekazuje dane formularzy na serwerze Usługodawcy.

**Status:** szablon — review prawnika przed użyciem. Można wysłać PDF po aktywacji WaaS.

---

## Strony

**Administrator (Klient):**  
{nazwa firmy}, {adres}, NIP: {nip}, reprezentant: {osoba}

**Processor (Usługodawca):**  
ByteBazaar Paweł Wenderlich, ul. Henryka Sienkiewicza 85/87/1, 90-057 Łódź, NIP: 7282882108

---

## §1. Przedmiot

1. Processor przetwarza dane osobowe wyłącznie w celu **utrzymania strony/sklepu**, backupów, formularzy kontaktowych Klienta — na podstawie dokumentowanych instrukcji Administratora.
2. Zakres: dane użytkowników formularzy (imię, email, tel), logi serwera, cookies analytics jeśli skonfigurowane na koncie Klienta.

---

## §2. Obowiązki Processora

1. Przetwarzanie zgodnie z RODO i instrukcją Administratora.
2. Poufność osób upoważnionych.
3. Środki techniczne: SSL, backup szyfrowany, dostęp SSH ograniczony, aktualizacje bezpieczeństwa.
4. **Sub-processors:** VPS provider (OVH/Hetzner/etc.), Stripe (płatności sklepu Klienta — osobno u Klienta), Resend wyłącznie dla maili systemowych stronyodzaraz — lista aktualizowana na żądanie.
5. Wsparcie DPIA na żądanie — w scope opieki Pro.
6. Usunięcie/kopia danych po zakończeniu umowy — 30 dni.

---

## §3. Obowiązki Administratora

1. Podstawa prawna przetwarzania u swoich użytkowników (formularze, sklep).
2. Polityka prywatności na stronie.
3. Cookie banner zgodny z PECR/ePrivacy.

---

## §4. Naruszenia

Processor zgłasza naruszenie **w 24h** od wykrycia na email Administratora.

---

## §5. Czas trwania

Od aktywacji WaaS / hostingu do usunięcia danych po zakończeniu umowy + 30 dni.

---

## §6. Podpisy

Administrator: _________________ Data: _______

Processor: Paweł Wenderlich Data: _______

---

*Alternatywa light: klauzula w REGULAMIN-WAAS §W10 + link do tego szabuntu na żądanie B2B.*
