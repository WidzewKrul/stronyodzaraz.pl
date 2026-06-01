# Logo — jedyny wymagany asset graficzny

Wrzuć tutaj pliki logo (pierwszy istniejący w kolejności wygrywa):

```
logo-mark.webp   ← preferowane
logo-mark.png
logo-mark.svg
```

Opcjonalnie pełny wordmark (na razie nieużywany w UI — header składa mark + tekst):

```
logo-full.webp
logo-full.png
logo-full.svg
```

**Reszta UI nie wymaga plików graficznych:**
- Hero → `HeroBanner` (CSS gradient + mockup przeglądarki)
- Karty usług → `ServiceThumb` (Lucide + gradient)
- Kafelki kategorii → `CategoryTileArt`
- PDP preview → `BriefMockup`
- Platformy → `@icons-pack/react-simple-icons`
- OG / favicon → generowane w `app/opengraph-image.tsx` i `app/icon.tsx`

Gemini / custom foto hero — opcjonalne, patrz `docs/GEMINI-ASSETS-BRIEF.md`.
