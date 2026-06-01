# Protokół odbioru — szablon

**Kiedy:** status `DELIVERED` — wysyłka PDF + email (patrz `project_delivered` w TRESCI-EMAILS.json).  
**Akceptacja:** podpis scan / odpowiedź „Akceptuję” **lub** brak uwag w 5 dni rob. = akceptacja (REGULAMIN §4).

---

## PROTOKÓŁ ODBIORU USŁUGI

**Numer zamówienia:** {ORDER_ID}  
**Data oddania:** {DATA}  
**Usługodawca:** ByteBazaar Paweł Wenderlich  
**Klient:** {NAZWA}, NIP: {NIP}

---

### 1. Przedmiot odbioru

Klient odbiera wykonaną usługę:

| Pole | Wartość |
|------|---------|
| Pakiet | {NAZWA_PAKIETU} |
| URL produkcji | {https://domena.pl} |
| URL staging (archiwum) | {https://staging...} |
| Platforma | {WordPress / Shopify / Shoper} |
| Panel admin | {URL wp-admin / Shopify admin} |

---

### 2. Zakres dostarczony

- [ ] Strona/sklep zgodnie z opisem pakietu i briefem z dnia {DATA_BRIEF}
- [ ] Formularz kontakt / checkout działający
- [ ] SSL aktywny
- [ ] Responsywność mobile
- [ ] Podstawowe SEO (title, meta, schema Organization)
- [ ] {Szkolenie 30 min — termin: …}
- [ ] {Inne wg scope}

**Uwagi do scope:** {puste / lista}

---

### 3. Materiały przekazane

- [ ] Instrukcja logowania (osobny email / załącznik)
- [ ] Export / backup początkowy
- [ ] Dokumentacja DNS (jeśli dotyczy)

---

### 4. Gwarancja

30 dni od daty protokołu — poprawki błędów w dostarczonym scope (REGULAMIN §7).  
Zgłoszenia: kontakt@bblikh.pl · temat `[GWARANCJA] #{ORDER_ID}`

---

### 5. Oświadczenia stron

**Usługodawca** oświadcza, że usługa została wykonana zgodnie z umową/regulaminem w zakresie pkt 2.

**Klient** oświadcza, że:
- zapoznał się z wersją produkcyjną,
- {nie ma uwag / ma uwagi w załączniku},
- akceptuje odbiór **{z zastrzeżeniami w załączniku / bez zastrzeżeń}**.

---

### 6. Podpisy

**Usługodawca** …………………… **Data:** ………

**Klient** …………………… **Data:** ………

---

## Wariant email (bez PDF)

```
Temat: Protokół odbioru — {domena} · #{ORDER_ID}

Cześć {name},

Projekt jest online: {domain}

Potwierdź odbiór odpowiadając „Akceptuję” w ciągu 5 dni roboczych 
lub wyślij listę uwag w scope pakietu.

Gwarancja 30 dni — szczegóły w regulaminie.

stronyodzaraz.pl
```

---

*Powiązane: HANDOVER-CHECKLIST.md · ONBOARDING-KLIENTA.md*
