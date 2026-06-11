import fs from "node:fs";
import path from "node:path";

export type MetaTemplateKey =
  | "home"
  | "uslugi_hub"
  | "uslugi_category"
  | "pdp"
  | "blog_list"
  | "blog_post"
  | "wykonane_hub"
  | "wykonane_detail"
  | "demo"
  | "technologia"
  | "o_nas"
  | "kontakt"
  | "local_city"
  | "local_city_category";

type MetaTemplatesFile = {
  templates: Record<MetaTemplateKey, { title: string; description: string }>;
};

let cache: MetaTemplatesFile | null = null;

function loadTemplatesFile(): MetaTemplatesFile {
  if (cache) return cache;
  const filePath = path.join(process.cwd(), "docs", "content", "meta-szablony.json");
  cache = JSON.parse(fs.readFileSync(filePath, "utf8")) as MetaTemplatesFile;
  return cache;
}

export function fillTemplate(template: string, vars: Record<string, string>): string {
  return template.replace(/\{(\w+)\}/g, (_, key: string) => vars[key] ?? "");
}

export function getMetaTemplate(key: MetaTemplateKey): { title: string; description: string } {
  const tpl = loadTemplatesFile().templates[key];
  if (!tpl) throw new Error(`Missing meta template: ${key}`);
  return tpl;
}

export function buildMetaFromTemplate(
  key: MetaTemplateKey,
  vars: Record<string, string>
): { title: string; description: string } {
  const tpl = getMetaTemplate(key);
  return {
    title: fillTemplate(tpl.title, vars),
    description: fillTemplate(tpl.description, vars),
  };
}

export function formatPricePln(grosze: number): string {
  return (grosze / 100).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

/**
 * Przycina tekst do maks. `max` znaków po granicy słowa (nie ucina w połowie
 * wyrazu) i usuwa zawieszone spójniki/przyimki oraz znaki interpunkcyjne z końca.
 * Używane do meta description, żeby fragmenty opisu produktu nie kończyły się
 * urwanym słowem typu „…30 dni. Z”.
 */
export function clipAtWord(text: string, max: number): string {
  const clean = text.trim();
  if (clean.length <= max) return clean;
  let cut = clean.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  if (lastSpace > 0) cut = cut.slice(0, lastSpace);
  // usuń zawieszony jednoliterowy/krótki spójnik lub przyimek na końcu
  cut = cut.replace(/[\s.,;:–-]+$/u, "");
  cut = cut.replace(/\s+(z|w|i|o|a|na|do|od|po|za|ze|we)$/iu, "");
  return cut.replace(/[\s.,;:–-]+$/u, "");
}
