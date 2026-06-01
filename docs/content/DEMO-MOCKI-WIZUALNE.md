# Demo mockupy — specyfikacja wizualna (CSS)

**Implementacja:** `DemoBrowserMock.tsx` renderuje jeden obiekt z `demo-mockups.json`.  
**Home:** 3 karty w grid `DemoShowcase` (mini wersja). **`/demo`:** full-width stack.

---

## Anatomia komponentu

```
┌─ browser chrome ─────────────────────────────┐
│ ● ● ●    [ fakeBrand ]          [ nav×3 ]  │  ← skrócone nav na mini
├────────────────────────────────────────────┤
│ HERO (gradient per demo)                     │
│   headline (14px bold white)                 │
│   subline (10px white/80)                    │
│   [ CTA primary ] [ CTA ghost ]              │
├────────────────────────────────────────────┤
│ BODY (bg white, p-3)                         │
│   → sekcje z JSON (menu / services / products)│
└────────────────────────────────────────────┘
     disclaimer 9px slate-500 pod kartą
```

**Mini (home):** wysokość ~220px, body = 1 sekcja + 3 bullets pod kartą.  
**Full (`/demo`):** wysokość ~420px, wszystkie sekcje z JSON.

---

## Demo 1 — Restauracja U Kucharza

**Gradient hero:** `from-amber-600 via-orange-600 to-rose-700`

```
┌─────────────────────────────────────────┐
│ ●●●  ukucharza.pl     Menu  O nas  ... │
├─────────────────────────────────────────┤
│ ░░░░░░░ HERO AMBER ░░░░░░░░░░░░░░░░░░░ │
│ Smaki, które znasz z domu               │
│ Świeże składniki · menu sezonowe       │
│ [Zarezerwuj stolik] [Zobacz menu]      │
├─────────────────────────────────────────┤
│ Dania dnia                              │
│ ┌──────────────┬────────┐               │
│ │ Żurek    28zł│ Kotlet │  + Pierogi   │
│ └──────────────┴────────┘               │
│ 🕐 Pn–Sb 12–22  📍 Warszawa  📞 tel    │
│ [▢][▢][▢] galeria placeholders        │
└─────────────────────────────────────────┘
```

**Lucide:** `UtensilsCrossed`, `Clock`, `MapPin`, `Phone`

---

## Demo 2 — DentalCare

**Gradient hero:** `from-sky-600 via-cyan-600 to-teal-700`

```
┌─────────────────────────────────────────┐
│ ●●●  dentalcare.example.pl   Usługi ... │
├─────────────────────────────────────────┤
│ ░░░░░ HERO SKY ░░░░░░░░░░░░░░░░░░░░░░░ │
│ Twój uśmiech w dobrych rękach          │
│ Implanty · ortodoncja · dziecięca       │
│ [Umów wizytę] [Zobacz cennik]           │
├─────────────────────────────────────────┤
│ Usługi (3 kolumny)                      │
│ Implanty | Wybielanie | Protetyka       │
│ Zespół: [avatar][avatar] dr A. / dr P.  │
│ NFZ · Parking · Nowoczesny sprzęt       │
└─────────────────────────────────────────┘
```

**Avatary:** okrąg `bg-sky-100` + inicjały `AK`, `PN` — bez zdjęć.

---

## Demo 3 — ModaPark sklep

**Gradient hero:** `from-violet-600 via-purple-600 to-fuchsia-700`

```
┌─────────────────────────────────────────┐
│ ●●●  modapark.pl    Nowości  Damskie 🛒 │
├─────────────────────────────────────────┤
│ ░░░░░ HERO VIOLET ░░░░░░░░░░░░░░░░░░░░ │
│ Kolekcja wiosna / lato 2026             │
│ Dostawa od 199 zł · zwrot 30 dni        │
│ [Zobacz nowości] [Promocje]             │
├─────────────────────────────────────────┤
│ [Sukienki][Kurtki][Buty][Akcesoria]     │
│ Bestsellery — 3 karty produktu          │
│ 189zł | 299zł | 249zł −20%              │
│ BLIK · P24 · InPost · DPD               │
└─────────────────────────────────────────┘
```

**Karta produktu:** `aspect-square bg-violet-50`, cena `font-semibold`, badge `text-[8px] bg-rose-100`.

---

## Stany i a11y

| Element | Reguła |
|---------|--------|
| Cały mock | `aria-hidden="true"` — dekoracja |
| Link CTA pod kartą | prawdziwy `<Link>` do PDP |
| Hover karta | `hover:-translate-y-1` jak ProductCard |
| Focus | ring na CTA, nie na mocku |

---

## Pliki kodu (docelowe)

```
lib/demo-content.ts     ← import/type z demo-mockups.json
components/DemoBrowserMock.tsx
components/DemoShowcase.tsx
app/demo/page.tsx
```

---

*Dane: [demo-mockups.json](./demo-mockups.json)*
