# Dokumenty prawne — master index

**Cel:** jeden punkt wejścia — co podpisujesz z klientem, co jest na stronie, co wysyłasz PDF-em.

**Sprzedawca:** ByteBazaar Paweł Wenderlich, ul. Henryka Sienkiewicza 85/87/1, 90-057 Łódź, NIP: 7282882108  
**Kontakt:** kontakt@bblikh.pl · **Transakcyjne:** noreply@stronyodzaraz.pl

---

## Model prawny (productized)

```
Checkout Stripe
  ├── akceptacja Regulaminu (checkbox)
  ├── akceptacja Polityki prywatności (checkbox)
  ├── [konsument] Zgoda na start przed 14 dniami (checkbox)
  └── płatność = zawarcie umowy (REGULAMIN §3)

Opcjonalnie PDF (B2B / WaaS / na życzenie):
  ├── Umowa o świadczenie usług web
  ├── Umowa WaaS
  ├── Umowa powierzenia RODO
  ├── Protokół odbioru
  └── Oświadczenie o prawach do materiałów
```

**Zasada:** dla B2C online **regulamin + checkout wystarczy**. Dla firm >5k zł lub WaaS — **umowa PDF + RODO powierzenie**.

---

## Mapa dokumentów

| Dokument | Typ | Gdzie | Kiedy |
|----------|-----|-------|-------|
| [REGULAMIN-USLUG-WEB.md](./REGULAMIN-USLUG-WEB.md) | regulamin sklepu | `/regulamin` | każdy checkout |
| [REGULAMIN-WAAS.md](./REGULAMIN-WAAS.md) | regulamin WaaS | link w checkout WaaS | subskrypcja |
| [POLITYKA-PRYWATNOSCI.md](./POLITYKA-PRYWATNOSCI.md) | RODO info | `/polityka-prywatnosci` | każdy użytkownik |
| [POLITYKA-ZWROTOW.md](./POLITYKA-ZWROTOW.md) | zwroty | link z regulaminu | reklamacje |
| [ZGODY-CHECKOUT.md](./ZGODY-CHECKOUT.md) | teksty checkboxów | checkout UI | implementacja |
| [UMOWA-USLUG-WEB-SZABLON.md](./UMOWA-USLUG-WEB-SZABLON.md) | umowa PDF | email po płatności (B2B) | opcjonalnie |
| [UMOWA-WAAS-SZABLON.md](./UMOWA-WAAS-SZABLON.md) | umowa abonament | po aktywacji WaaS | **wymagane WaaS B2B** |
| [RODO-POWIERZENIE-SZABLON.md](./RODO-POWIERZENIE-SZABLON.md) | DPA | z WaaS / hosting u nas | WaaS, formularze u nas |
| [PROTOKOL-ODBIORU-SZABLON.md](./PROTOKOL-ODBIORU-SZABLON.md) | protokół | przy DELIVERED | każdy projekt |
| [OSWIADCZENIE-PRAWA-MATERIALOW.md](./OSWIADCZENIE-PRAWA-MATERIALOW.md) | oświadczenie | brief / handover | gdy klient dostarcza logo/zdjęcia |
| [NDA-DOSTEPY-SZABLON.md](./NDA-DOSTEPY-SZABLON.md) | NDA | migracja, API | na życzenie |
| [CHARGEBACK-SOP.md](./CHARGEBACK-SOP.md) | wewnętrzny | — | spory Stripe |

---

## Relacja regulamin vs umowa

| Aspekt | Regulamin (B2C online) | Umowa PDF (B2B) |
|--------|------------------------|-----------------|
| Zawarcie | płatność + akceptacja | podpis / email „akceptuję” |
| Scope | opis pakietu w katalogu | załącznik: scope + cena |
| Termin | orientacyjny w regulaminie | konkretna data w umowie |
| Faktura | dane w checkout | NIP, osoba upoważniona |
| Spory | sąd właściwy wg regulaminu | jak w umowie |

**Konflikt:** umowa indywidualna **nadpisuje** regulamin w zakresie uzgodnionym na piśmie.

---

## Flow per typ klienta

### B2C — landing 1490 zł

1. Checkout → regulamin + polityka + zgoda start (konsument)
2. Email potwierdzenie (TRANSAKCJE-EMAIL-FLOW.md)
3. Brief online
4. Protokół odbioru PDF przy oddaniu (email, bez podpisu = akceptacja po 5 dniach)

### B2B — sklep 8990 zł

1. Jak B2C **lub** faktura proforma + umowa PDF przed startem
2. Umowa z załącznikiem scope
3. Oświadczenie materiały jeśli logo/zdjęcia od klienta
4. Protokół odbioru — podpis scan/email

### WaaS — 490 + 99/mc

1. Regulamin web + **REGULAMIN-WAAS**
2. **Umowa WaaS** PDF + **RODO powierzenie**
3. Stripe Subscription po produkcji
4. Anulacja wg REGULAMIN-WAAS §W6

---

## Faktury

| Element | Źródło |
|---------|--------|
| NIP klienta | Stripe checkout `tax_id` lub brief |
| Faktura VAT | wFirma / Fakturownia / ręcznie — **poza repo** |
| Numer zamówienia | `serviceOrders.id` / Stripe PaymentIntent |
| Termin płatności | prepaid Stripe — faktura po zaksięgowaniu |

**Szablon pozycji faktury:**  
`Usługa: {nazwa pakietu} · Zamówienie #{id} · stronyodzaraz.pl`

---

## Checklist przed launch prawny

- [ ] Regulamin w `/regulamin` (nie HACCP)
- [ ] Polityka w `/polityka-prywatnosci` (pełna wersja)
- [ ] Checkboxy checkout wg ZGODY-CHECKOUT.md
- [ ] Link regulamin + polityka w stopce
- [ ] Review prawnik (opcjonalnie, zalecane WaaS)
- [ ] Szablony PDF w Drive: umowa, protokół, RODO

---

## Wersjonowanie

| Wersja | Data | Zmiana |
|--------|------|--------|
| 1.0 | 2026-05-31 | pierwsza kompletna wersja web |

Przy zmianie regulaminu: data w stopce + email do aktywnych WaaS 14 dni wcześniej.

---

*Implementacja checkout: STRIPE-SETUP.md · Emails: EMAIL-SYSTEM-MASTER.md*
