export type ServiceKind =
  | "strona"
  | "sklep"
  | "wordpress"
  | "opieka"
  | "marketing"
  | "integracja"
  | "migracja"
  | "general";

export function inferServiceKind(title: string, slug: string, category: string): ServiceKind {
  const t = `${title} ${slug} ${category}`.toLowerCase();
  if (t.includes("sklep") || t.includes("woocommerce") || t.includes("shopify") || t.includes("shoper")) return "sklep";
  if (t.includes("wordpress") && !t.includes("sklep")) return "wordpress";
  if (t.includes("opieka") || t.includes("abonament") || t.includes("backup")) return "opieka";
  if (t.includes("google ads") || t.includes("meta ads") || t.includes("reklam") || t.includes("analytics")) return "marketing";
  if (t.includes("integrac") || t.includes("przelewy24") || t.includes("inpost") || t.includes("baselinker")) return "integracja";
  if (t.includes("migrac") || t.includes("napraw") || t.includes("przyspiesz") || t.includes("hack")) return "migracja";
  if (t.includes("strona") || t.includes("landing") || t.includes("www")) return "strona";
  return "general";
}

export function modelForServiceKind(_kind: ServiceKind): string | undefined {
  return undefined;
}

export function sectionOutlineForKind(kind: ServiceKind): string[] {
  switch (kind) {
    case "strona":
      return ["Dane klienta", "Cel projektu", "Struktura strony", "Design i branding", "Integracje", "Termin realizacji", "Uwagi PM"];
    case "sklep":
      return ["Dane klienta", "Platforma e-commerce", "Produkty i kategorie", "Płatności i wysyłka", "Design", "Termin", "Uwagi PM"];
    default:
      return ["Dane klienta", "Zakres usługi", "Wymagania techniczne", "Materiały", "Termin realizacji", "Uwagi PM"];
  }
}

export function validateTemplateForKind(_markdown: string, _kind: ServiceKind): string[] {
  return [];
}
