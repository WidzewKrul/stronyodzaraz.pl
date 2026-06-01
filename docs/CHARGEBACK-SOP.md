# Chargeback — SOP wewnętrzny

---

## Zapobieganie

- Jasny regulamin + opis na Stripe
- Email potwierdzenie z numerem zamówienia
- Brief timestamp = dowód rozpoczęcia usługi
- Staging screenshots przed dispute

---

## Gdy `charge.dispute.created`

| Dzień | Akcja |
|-------|-------|
| 0 | Stripe Dashboard → zbierz dowody |
| 1 | Email klienta: „Widzimy chargeback — napisz co nie tak, rozwiążemy” |
| 3 | Submit evidence Stripe: regulamin, brief, staging URL, maile |
| 7 | Follow up |

---

## Dowody do Stripe

1. Regulamin zaakceptowany + timestamp checkout
2. Brief uzupełniony + daty
3. Link staging / prod live
4. Korespondencja mail
5. Opis scope pakietu

---

## Po przegranej

- Blacklist email w DB
- Notatka w order

---

*Regulamin: REGULAMIN-USLUG-WEB.md · POLITYKA-ZWROTOW.md*
