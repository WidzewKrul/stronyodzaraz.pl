# stronyodzaraz.pl — brief assetów UI/UX

> **Launch bez Gemini:** UI działa na CSS + Lucide + simple-icons. **Jedyne co musisz wrzucić ręcznie to logo** w `public/images/brand/` (patrz README tam). Reszta poniżej to opcjonalna polska na później.

Dokument do **opcjonalnego** wygenerowania grafik w Google Gemini. Po wygenerowaniu zapisz pliki w podanych ścieżkach.

**Strona:** https://stronyodzaraz.pl  
**Produkt:** software house productized — ~1814 pakietów stron WWW, sklepów, marketingu, opieki WP  
**Cel wizualny:** nowoczesna **polska agencja web B2B** (indigo SaaS), nie szablon z forków HACCP/dotacji.

### Co jest już zrobione w kodzie (nie generuj na start)

| Element | Implementacja |
|--------|----------------|
| Hero homepage / katalog / kategoria | `HeroBanner` — gradient CSS + mockup |
| Miniatury kart usług | `ServiceThumb` — Lucide per service kind |
| Kafelki kategorii | `CategoryTileArt` |
| PDP podgląd | `BriefMockup` |
| Logo WP/Shopify/Woo | `PlatformBadges` — simple-icons |
| OG image / favicon | `opengraph-image.tsx`, `icon.tsx` |

### Wymagane od Ciebie

| Asset | Ścieżka |
|-------|---------|
| Logo mark | `public/images/brand/logo-mark.{webp,png,svg}` |

---

## 1. Stan obecny (co poprawić)

| Problem | Szczegóły |
|--------|-----------|
| **GEMINI brief skopiowany z HACCP** | Stary plik mówi o emerald i dokumentach sanepidu |
| **Hero bez dedykowanej grafiki** | Gradient + tekst; brak `heroes/home-hero.webp` pod www |
| **Logo** | Placeholder literka zamiast `brand/logo-full.png` |
| **Karty usług** | Brak miniatur per `service kind` |
| **8 kategorii** | Brak `categories/{slug}.webp` dla hubów `/uslugi/{category}` |
| **Kolory** | Brand = **indigo `#4f46e5`**, nie emerald |

**Nie generuj:** assetów HACCP, dotacji, ZUS, biznesplanu, sanepidu.

---

## 2. Tożsamość wizualna

### Kolory

| Rola | HEX | Użycie |
|------|-----|--------|
| Primary | `#4f46e5` | CTA, logo, akcenty |
| Primary dark | `#4338ca` | hover |
| Primary light | `#eef2ff` | tła sekcji |
| Tekst | `#0f172a` | nagłówki |
| Tekst drugi | `#475569` | body |
| Tło | `#ffffff` | karty, strona |
| Sukces | `#10b981` | badge „oddane w terminie” |

**NIE używaj** dominującego emerald `#059669` (portfolio HACCP).

### Styl grafik

- **Styl:** nowoczesny polski SaaS + lekka scena (laptop, ekran z layoutem www, sklep) **albo** premium 3D illustration (miękki blur, dzienne światło).
- **Nastrój:** „strona gotowa szybko”, profesjonalnie, bez stockowego uścisku dłoni.
- **Unikaj:** angielskie napisy na mockupach, clipart 2010, czerwone alarmy scam, euro/dolar.
- **Tekst na obrazku:** **unikaj** — tekst w HTML. Max 2 słowa PL jeśli konieczne.

### Format

| Typ | Format |
|-----|--------|
| Zdjęcia/hero | WebP 85% |
| Logo | SVG + PNG 512 |
| Ikony UI | Lucide w kodzie — nie generuj |

### Proporcje

| Asset | Wymiary | Ratio |
|-------|---------|-------|
| Homepage hero | 1600×1000 | 16:10 |
| Kategoria hero | 1400×560 | 5:2 |
| Karta usługi | 640×400 | 16:10 |
| PDP mockup | 800×1000 | 4:5 |
| Kroki „jak działa” | 480×360 | 4:3 |
| Kafelek kategorii | 600×360 | 5:3 |
| OG | 1200×630 | 1.91:1 |
| Logo pełne | 400×80 | ~5:1 |
| Favicon source | 64×64 | 1:1 |

**Safe zone:** lewa połowa hero mniej zajęta (H1 PL).

---

## 3. Struktura folderów

```text
public/images/
  brand/
    logo-full.png
    logo-mark.png
    og-default.jpg
  heroes/
    home-hero.webp
    uslugi-hero.webp
    o-nas-hero.webp
  categories/              # 8 plików — slug = nazwa
    strony-internetowe.webp
    sklepy-internetowe.webp
    wordpress.webp
    shopify-shoper.webp
    reklama-marketing.webp
    opieka-techniczna.webp
    integracje.webp
    migracje-naprawy.webp
  doc-types/               # service kind miniatury
    strona.webp
    sklep.webp
    wordpress.webp
    opieka.webp
    marketing.webp
    integracja.webp
    migracja.webp
    general.webp
  product/
    website-preview.webp   # mockup laptop + strona firmowa
  steps/
    step-choose.webp
    step-pay.webp
    step-deliver.webp
```

---

## 4. Mapowanie na strony

| Strona | Asset |
|--------|-------|
| `/` | `home-hero.webp`, siatka 8× `categories/*.webp`, 3× `steps/*` |
| `/uslugi` | `uslugi-hero.webp` |
| `/uslugi/{category}` | `categories/{slug}.webp` |
| `/uslugi/.../{slug}` | `doc-types/{kind}.webp` + `website-preview.webp` |
| Header | `logo-full.png` |
| OG | `og-default.jpg` |

---

## 5. Kategorie — sceny do promptów

| Slug | PL | Scena |
|------|-----|-------|
| `strony-internetowe` | Strony WWW | Laptop z elegancką stroną firmową, biuro MŚP |
| `sklepy-internetowe` | Sklepy | Ekran sklepu online, koszyk, paczka kurierska |
| `wordpress` | WordPress | Logo WP subtelne + panel admin / motyw |
| `shopify-shoper` | Shopify/Shoper | Dwa ekrany — SaaS storefront, szybki checkout |
| `reklama-marketing` | Marketing | Dashboard ads / wykres konwersji (bez logo Google 1:1) |
| `opieka-techniczna` | Opieka | Serwer/backup/shield — spokój, monitoring |
| `integracje` | Integracje | Diagram połączeń: sklep ↔ płatność ↔ kurier |
| `migracje-naprawy` | Migracje | Strzałki 301, dwa monitory „stara → nowa” strona |

---

## 6. Prompty Gemini (EN + suffix PL)

**Suffix do każdego promptu:**

```
No watermark. No English text on screens unless abstract blur. Premium Polish B2B web agency style. Brand accent indigo #4f46e5. Clean white backgrounds. Photorealistic or soft 3D illustration.
```

### P0-A — Logo pełne `brand/logo-full.png`

```
Design a horizontal logo for Polish productized web agency "stronyodzaraz.pl" — fast delivery of websites and online stores with fixed pricing. Icon: lightning bolt + browser window or stylized "S" in rounded square. Wordmark clean geometric sans-serif. Primary color indigo #4f46e5 on white or transparent. Modern SaaS trustworthy, not playful. Flat vector for website header. ~400x80 proportions.
```

### P0-B — Logo mark `brand/logo-mark.png`

```
Square favicon mark: indigo #4f46e5 rounded square with white stylized S or browser+bolt icon. Minimal, readable at 64px. Flat vector, generous padding.
```

### P0-C — Homepage hero `heroes/home-hero.webp`

```
Wide 16:10 hero for Polish web agency ecommerce. Right: laptop and phone showing modern business website mockup (blurred Polish text), small indigo #4f46e5 UI accents. Left: soft gradient white to #eef2ff empty for headline. Background: bright modern office or coworking, shallow depth of field. Mood: website delivered fast, professional.
```

### P0-D — Katalog hero `heroes/uslugi-hero.webp`

```
Wide 5:2 banner: grid of abstract service package cards (website, shop, ads), shopping cart icon, indigo #4f46e5 accents, white background. Catalog of ~1800 fixed-price web services feeling.
```

### P0-E — PDP preview `product/website-preview.webp`

```
Vertical 4:5: MacBook with polished company website, checklist "project delivered", indigo bookmark. Smartphone with email "project ready" notification. White desk, soft shadow. No readable personal data.
```

### P1 — 8× category `categories/{slug}.webp`

Szablon:

```
Category hero 1400x560 Polish web agency. Scene: {SCENE}. Left 40% lighter for text overlay. Indigo #4f46e5 subtle accents. Professional bright B2B.
```

(Wstaw `{SCENE}` z tabeli sekcji 5.)

### P1 — 8× service kind `doc-types/*.webp`

**strona.webp**
```
Product thumbnail 640x400: flat illustration of business website on laptop, indigo header stripe #4f46e5, white background, subtle shadow.
```

**sklep.webp**
```
Product thumbnail: online store interface with cart and product grid, indigo accent, e-commerce Poland vibe.
```

**wordpress.webp**
```
Product thumbnail: WordPress dashboard abstract, theme customization, indigo accent, professional.
```

**opieka.webp**
```
Product thumbnail: shield, backup clock, uptime graph, indigo accent, maintenance subscription feel.
```

**marketing.webp**
```
Product thumbnail: ad campaign dashboard abstract, conversion chart up, indigo accent.
```

**integracja.webp**
```
Product thumbnail: puzzle connectors payment shipping APIs, indigo lines, ecommerce integration.
```

**migracja.webp**
```
Product thumbnail: two websites arrow migration 301, indigo accent, SEO safe transfer.
```

**general.webp**
```
Product thumbnail: generic web service folder with indigo checkmark seal.
```

### P2 — Kroki `steps/*.webp`

**step-choose.webp** — przeglądanie katalogu pakietów na laptopie, indigo UI.  
**step-pay.webp** — bezpieczna płatność online, lock, indigo (bez logo banków).  
**step-deliver.webp** — e-mail „projekt gotowy”, laptop ze stroną live, zadowolenie właściciela MŚP.

### P2 — OG `brand/og-default.jpg`

```
Social share 1200x630: stronyodzaraz.pl brand, indigo gradient, laptop with website and shop icons, tagline area blank for HTML overlay.
```

---

## 7. Post-processing

```bash
# z root stronyodzaraz/
node scripts/optimize-gemini-images.mjs
```

- WebP quality 85  
- Resize do wymiarów z sekcji 2  
- Usuń EXIF  

---

## 8. Checklist wdrożenia w kodzie

- [ ] `Header.tsx` → `logo-full.png`  
- [ ] `app/page.tsx` → hero + categories grid images  
- [ ] `app/uslugi/[category]/page.tsx` → category hero  
- [ ] `ProductCard` / karta usługi → `doc-types/{kind}.webp`  
- [ ] `app/opengraph-image.tsx` → spójne z `og-default.jpg`  
- [ ] favicon z `logo-mark.png`  
- [ ] Usunąć stare assety landing/dotacje jeśli jeszcze w `public/images/`  

---

*Brand indigo `#4f46e5` — spójny z Tailwind `indigo-600` w projekcie.*
