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
