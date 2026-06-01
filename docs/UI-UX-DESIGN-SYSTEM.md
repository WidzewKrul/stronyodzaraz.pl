# UI/UX — design system stronyodzaraz.pl

**Charakter marki:** polska agencja web B2B · productized · **indigo SaaS** · profesjonalnie, bez korpo-buzzwordów · jak Stripe/Linear, nie jak szablon WordPress 2015.

**Powiązane:** UKLAD-STRON.md · COPY-TONE-OF-VOICE.md · GEMINI-ASSETS-BRIEF.md

---

## 1. Kolory

### Brand (primary)

| Token | HEX | Użycie |
|-------|-----|--------|
| `brand-600` | `#4f46e5` | CTA, linki aktywne, logo akcent |
| `brand-700` | `#4338ca` | CTA hover, ikony trust |
| `brand-50`–`100` | `#eef2ff` | tła badge, kafelki |
| **NIE emerald** | `#059669` | legacy HACCP — usuwać |

### Neutral

| Token | HEX | Użycie |
|-------|-----|--------|
| `slate-900` | `#0f172a` | H1, body strong |
| `slate-600`–`700` | `#475569` | body, opisy |
| `slate-200` | `#e2e8f0` | obramowania kart |
| `#fafafa` | body bg | tło strony |

### Akcenty semantyczne (kategorie)

| Kategoria | Accent | Badge bg |
|-----------|--------|----------|
| strony-internetowe | indigo | `bg-slate-100` / brand |
| sklepy | emerald | `bg-emerald-100` |
| wordpress | sky | `bg-sky-100` |
| shopify-shoper | violet | `bg-violet-100` |
| marketing | amber | `bg-amber-100` |
| opieka | slate | `bg-slate-100` |
| integracje | violet | `bg-zinc-100` |
| migracje | rose | `bg-rose-100` |

Źródło: `uslugi-config.ts` accent + `service-visuals.ts` gradienty kart.

### Stany interakcji

| Stan | Reguła |
|------|--------|
| Hover kart | `-translate-y-1`, `shadow-lg`, `border-brand-300` |
| Focus | `ring-2 ring-brand-500 ring-offset-2` (globals.css) |
| Disabled CTA | `opacity-50 cursor-not-allowed` |
| Error form | `border-rose-500`, tekst `text-rose-700` |

---

## 2. Typografia

| Element | Tailwind | Uwagi |
|---------|----------|-------|
| Font | Inter (system fallback) | `--font-sans` w globals |
| H1 hero | `text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight` | max 2 linie |
| H1 PDP | `text-3xl sm:text-4xl font-extrabold` | fraza + branża |
| H2 sekcji | `text-2xl sm:text-3xl font-bold` | wycentrowany na landing |
| H3 karta | `text-sm font-semibold` (ProductCard title) | line-clamp-2 |
| Body | `text-base text-slate-600 leading-7` | 16px min mobile |
| Small / meta | `text-xs text-slate-500` | breadcrumb, badge |
| Cena PDP | `text-3xl font-extrabold` | zawsze widoczna |
| Cena karta | `text-lg font-extrabold` | przed CTA |

**Zasady:**
- Nagłówki: konkret, nie „Witamy na naszej stronie”
- Max szerokość czytelności: `max-w-2xl` hero, `max-w-3xl` blog prose
- Nie używaj ALL CAPS poza badge `text-[11px] uppercase tracking-wider`

---

## 3. Spacing i siatka

| Kontener | Klasa |
|----------|-------|
| Max width | `max-w-7xl mx-auto px-4 sm:px-6` |
| Sekcja vertical | `py-14` (duże), `py-10` (kompakt) |
| Gap kart | `gap-4` mobile, `gap-5` desktop |
| Grid katalog | `sm:grid-cols-2 xl:grid-cols-3` |
| Grid kategorii home | `sm:grid-cols-2 lg:grid-cols-4` |

**Rytm:** naprzemiennie `bg-white` / `bg-slate-50` / gradient hero — unikaj 5× biały z rzędu.

---

## 4. Komponenty UI (biblioteka)

| Komponent | Plik | Warianty |
|-----------|------|----------|
| Header sticky | `Header.tsx` | desktop nav + mobile drawer |
| Footer | `Footer.tsx` | kolumny linków, NIP, legal |
| BrandLogo | `BrandLogo.tsx` | full / mark |
| HeroBanner | `HeroBanner.tsx` | home, catalog, category + BrowserMockup |
| TrustBar | `TrustBar.tsx` | 4 kolumny ikon |
| ServiceThumb | `ServiceThumb.tsx` | gradient + Lucide per service kind |
| CategoryTileArt | `CategoryTileArt.tsx` | kafelek kategorii |
| ProductCard | `ProductCard.tsx` | katalog siatka |
| BriefMockup | `BriefMockup.tsx` | PDP prawa kolumna |
| PlatformBadges | `PlatformBadges.tsx` | simple-icons |
| UpsellBox | **do kodu** | 1 sugestia pod ceną |
| DemoShowcase | **do kodu** | 3 branże `/demo` |
| CtaBand | wzorzec | `bg-brand-700 py-14 text-white` |
| FAQ accordion | homepage + kategoria | `<details>` lub własny |
| ConsentBanner | RODO cookies | przed GA4 |
| ScrollReveal | subtelne fade-up | nie przesadzać |

### Przyciski

| Typ | Klasy |
|-----|-------|
| Primary | `rounded-lg bg-brand-700 px-6 py-3 text-sm font-semibold text-white hover:bg-brand-800` |
| Secondary | `rounded-lg border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50` |
| Primary on dark hero | `bg-white text-brand-800 hover:bg-brand-50` |
| Card CTA | `rounded-xl bg-brand-700 w-full py-2.5 text-xs font-semibold` |
| Ghost link | `text-brand-700 hover:underline font-medium` |

### Karty

```
rounded-2xl border border-slate-200 bg-white shadow-sm
hover:-translate-y-1 hover:shadow-lg transition duration-300
```

---

## 5. UX patterns (konwersja)

| Pattern | Gdzie | Dlaczego |
|---------|-------|----------|
| **Sticky buy box** | PDP prawa kolumna `lg:sticky lg:top-24` | cena + CTA zawsze przy scroll |
| **Cena above fold** | PDP, karta produktu | redukcja obiekcji „ile kosztuje” |
| **Breadcrumb** | kategoria, PDP, blog | orientacja + schema |
| **Trust pod CTA** | PDP pills, pod przyciskiem koszyk | redukcja ryzyka |
| **Search instant** | katalog `/uslugi` | filter bez submit |
| **Mobile: koszyk w header** | zawsze widoczny | B2B też kupuje z telefonu |
| **Brak popup exit-intent** | — | irytuje B2B |
| **Brak chat widget day 1** | — | kontakt form wystarczy; Crisp opcjonalnie P2 |

---

## 6. Responsywność

| Breakpoint | Zachowanie |
|------------|------------|
| `< md` | 1 kolumna PDP (buy box pod opisem), hamburger menu |
| `md+` | sidebar katalogu kategorii |
| `lg+` | PDP 2 kolumny, hero BrowserMockup visible |
| Touch targets | min 44×44 px (przyciski, linki nav) |

**Mobile-first CWV:** hero bez ciężkich obrazów — CSS/Lucide only.

---

## 7. Dostępność (a11y)

- Kontrast tekstu min WCAG AA (slate-600 na white OK)
- `aria-label` na ikonach bez tekstu
- Focus visible (globals.css)
- `<nav aria-label="Breadcrumb">`
- Formularze: `<label>` powiązane z input
- `prefers-reduced-motion`: wyłącz `ScrollReveal` / animacje (backlog)

---

## 8. Ikony i ilustracje

| Źródło | Użycie |
|--------|--------|
| **Lucide** | UI, ServiceThumb, trust |
| **simple-icons** | WordPress, Shopify, Woo, Stripe |
| **boring-avatars** | blog author placeholder |
| **Gemini/foto** | tylko logo od klienta |

**Styl ilustracji:** flat, gradient tła, bez stock photos ludzi w uśmiechach.

---

## 9. Anti-patterns (nie rób)

- Emerald green HACCP
- Slider hero z 5 slajdami
- Autoplay wideo z dźwiękiem
- „Wyślij zapytanie o wycenę” jako jedyny CTA
- Fałszywe countdown timery
- Tęczowe gradienty 2018
- Comic Sans / Poppins everywhere (Inter wystarczy)

---

## 10. Checklist spójności przed launch

- [ ] Wszystkie CTA primary = brand-700
- [ ] H1 unikalny per strona
- [ ] Karty jednolity radius `rounded-2xl`
- [ ] Spacing sekcji `py-14` ±2
- [ ] Mobile: PDP CTA widoczny bez 3 scrollów
- [ ] Dark hero + white CTA kontrast OK

---

*Implementacja tokenów: `app/globals.css` · Komponenty: `components/`*
