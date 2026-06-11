export function slugify(raw: string): string {
  return raw
    // ł/Ł is a distinct Latin letter, not base+combining-diacritic, so NFD does NOT
    // decompose it — map it explicitly or "Łódź" would slugify to "odz" not "lodz".
    .replace(/ł/g, "l")
    .replace(/Ł/g, "L")
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
