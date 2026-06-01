# SEO — jedna faza implementacji (model „zapomnij”)

**Nie ma faz 2–4 w czasie.** Wszystko z poniższej listy idzie **w tym samym sprincie co reszta projektu**, przed deployem. Po wrzuceniu do Google — koniec.

**Master checklist:** [PROJEKT-KOMPLETNY.md](./PROJEKT-KOMPLETNY.md) Faza A2 + F  
**Scope URL:** [SCOPE-JEDNORAZOWY.md](./SCOPE-JEDNORAZOWY.md) (~435 URL)

---

## Jednorazowy backlog SEO (wszystko przed launch)

| # | Zadanie | Plik / doc |
|---|---------|------------|
| 1 | `lib/seo/metadata.ts` | SEO-STACK.md |
| 2 | `schema-dts` + json-ld helpers | AEO-GEO-LLM.md |
| 3 | Synonimy z `synonyms-branch.json` → product-content | docs/seo/ |
| 4 | `/l/[city]` + `/l/[city]/[category]` (10×8) | cities-tier.json |
| 5 | Sitemap: 317 PDP + 8 hub + 10 blog + 90 local + static | sitemap.ts |
| 6 | Canonical secondary PDP → primary | catalog-curation |
| 7 | noindex `/uslugi?q=` | robots + metadata |
| 8 | BlogPosting schema | blog pages |
| 9 | slugify miast | SEO-STACK |
| 10 | IndexNow batch po deploy | PROJEKT-KOMPLETNY F5 |
| 11 | GSC + sitemap submit | PROJEKT-KOMPLETNY F2 |
| 12 | Przepisać `keywords.ts` intent (web nie HACCP) | opcjonalnie pre-launch |

**Po launch:** zero zadań SEO. Patrz MONITORING-MINIMAL.md.

---

## Czego NIE implementujemy (świadomie)

| Element | Powód |
|---------|-------|
| Local tier B/C (77 miast) | tier A wystarczy na start |
| 1814 URL w sitemap | doorway + kanibalizacja |
| Blog co tydzień | 10 pillarów w `lib/blog.ts` |
| Kalkulator wyceny | nice-to-have — nie blokuje launch |
| `mkt:gsc` skrypt | ręczny GSC wystarczy jednorazowo |
| A/B title | model zapomnij |

---

## Kolejność docs (przed kodem SEO)

1. SCOPE-JEDNORAZOWY.md  
2. SEO-PROGRAMMATIC.md  
3. SEO-STACK.md  
4. docs/seo/*.json  
5. Kod (ten backlog)  
6. PROJEKT-KOMPLETNY F2–F5  

---

## Definition of Done — SEO zamknięte

- [ ] ~435 URL w sitemap, 200 OK  
- [ ] Rich Results OK na próbce  
- [ ] GSC sitemap submitted  
- [ ] IndexNow batch wysłany  
- [ ] Nie indeksujemy secondary PDP  

**Potem:** nie dotykamy SEO — następny projekt.

---

*Stary kalendarz 12 mc w SEO-STRATEGIA.md = kontekst rynkowy, nie plan pracy.*
