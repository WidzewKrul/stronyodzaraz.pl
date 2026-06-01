# Zgody checkout — teksty checkboxów

**Implementacja:** komponent checkout / Stripe Checkout `consent_collection` + custom fields lub strona przed redirect.

---

## Wymagane (każda płatność)

### 1. Regulamin

```
☐ Akceptuję Regulamin usług stronyodzaraz.pl i Politykę prywatności. *
```

Linki:
- `/regulamin`
- `/polityka-prywatnosci`

**Walidacja:** brak zaznaczenia = blokada płatności.

---

### 2. Konsument — start przed 14 dniami (tylko B2C / osoba fizyczna)

Wyświetl gdy: brak NIP w checkout **lub** checkbox „Kupuję jako konsument”.

```
☐ Wyrażam zgodę na rozpoczęcie realizacji usługi cyfrowej przed upływem 14 dni 
   od zawarcia umowy i przyjmuję do wiadomości, że tracę prawo odstąpienia 
   od umowy po pełnym rozpoczęciu realizacji. *
```

**Podstawa:** art. 38 pkt 1, art. 38a ustawy o prawach konsumenta.

---

## WaaS — dodatkowe

### 3. Regulamin WaaS + okres minimalny

```
☐ Akceptuję Regulamin WaaS, w tym okres minimalny abonamentu 12 miesięcy 
   i zasady wstrzymania strony przy braku płatności. *
```

Link: `/regulamin#waas` lub osobna podstrona.

---

## Opcjonalne (nie blokuj checkout)

### 4. Portfolio

```
☐ Wyrażam zgodę na umieszczenie projektu (mock / z logo) w portfolio stronyodzaraz.pl.
```

Domyślnie: **zaznaczone** — klient może odznaczyć.

### 5. Marketing

```
☐ Chcę otrzymywać informacje o promocjach i nowych pakietach (max 2×/mc).
```

Domyślnie: **niezaznaczone** (opt-in).

---

## B2B — pole NIP

```
NIP (do faktury VAT): [___________]
Nazwa firmy: [___________]
```

Stripe `tax_id_collection` — włączone dla PL.

---

## Zapis w bazie

| Pole | Tabela / metadata |
|------|-------------------|
| `termsAcceptedAt` | `serviceOrders` lub Stripe metadata |
| `consumerWaiverAt` | metadata jeśli konsument |
| `waasTermsAcceptedAt` | subskrypcja WaaS |
| `portfolioConsent` | brief / order metadata |

**Minimum:** timestamp + wersja regulaminu (`termsVersion: "1.0-2026-05-31"`).

---

## Copy pod przyciskiem Pay

```
Płatność obsługiwana przez Stripe. Dane karty nie przechowujemy na naszych serwerach.
```

---

*Powiązane: DOKUMENTY-PRAWNE-MASTER.md · STRIPE-SETUP.md*
