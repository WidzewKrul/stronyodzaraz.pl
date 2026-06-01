# Brief — decision tree (scope vs upsell)

**Zasada:** brief określa *implementację* w ramach pakietu. Więcej = upsell lub wycena.

---

## Drzewo decyzji

```
Klient prosi X w briefzie
    │
    ├─ X w scope pakietu? → TAK → realizuj
    │
    └─ NIE
         ├─ Dostępny upsell w katalogu? → oferta link PDP + koszyk
         ├─ Mały dodatek (<1h)? → gratis w dobrej wierze (max 1×)
         └─ Duży dodatek → mail: wycena 150 zł/h lub upgrade Pro
```

---

## Macierz typowych „dodatków”

| Prośba | Start | Pro | Upsell |
|--------|-------|-----|--------|
| +3 podstrony | ❌ | ✅ (do 10) | Pro upgrade |
| Blog + 5 wpisów | ❌ | szablon only | copywriting 290/str |
| Wielojęzyczność EN | ❌ | ❌ | +40% pakietu |
| Sklep na stronie Start | ❌ | ❌ | Sklep Start |
| Sesja zdjęciowa | ❌ | ❌ | partner / nie oferujemy |
| Logo design | ❌ | ❌ | placeholder / klient dostarcza |
| Poczta @domena | ❌ | ❌ | Workspace setup 299 |
| Allegro sync | ❌ | ❌ | integracja 990 |
| Więcej niż 50 produktów | — | — | Sklep Pro |
| Opieka po oddaniu | ❌ | ❌ | 299/mc |

---

## Red flags w briefie

| Sygnał | Akcja |
|--------|-------|
| „Chcę jak apple.com” na Landing | Uspokoić scope + zaproponuj Pro |
| 20 podstron na Start | Upgrade Pro mail przed startem |
| „Zróbcie mi teksty na 20 stron” | Wycena copy lub odmowa |
| Integracja ERP | Anti-ICP → kontakt custom |

---

## Template mail „poza scope”

Subject: `Twój projekt {id} — doprecyzowanie zakresu`

Body: (patrz TRESCI-EMAILS.json → `scope_clarification`)

---

*OFERTA scope: OFERTA.md · Upsell map: content/upsell-map.json*
