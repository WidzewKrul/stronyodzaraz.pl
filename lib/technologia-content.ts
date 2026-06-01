import fs from "node:fs";
import path from "node:path";

type TechnologiaFile = {
  meta: { title: string; description: string; h1: string; intro: string };
  platforms: Array<{
    id: string;
    name: string;
    icon: string;
    tagline: string;
    bullets: string[];
    linkCategory: string;
  }>;
  integrations: { h2: string; items: Array<{ name: string; context: string }> };
  hosting: { h2: string; paragraphs: string[] };
  handover: { h2: string; checklist: string[] };
  faq: Array<{ q: string; a: string }>;
  cta: { primary: { label: string; href: string }; secondary: { label: string; href: string } };
};

let cache: TechnologiaFile | null = null;

function load(): TechnologiaFile {
  if (!cache) {
    const filePath = path.join(process.cwd(), "docs", "content", "technologia-sekcje.json");
    cache = JSON.parse(fs.readFileSync(filePath, "utf8")) as TechnologiaFile;
  }
  return cache;
}

export function getTechnologiaMeta() {
  return load().meta;
}

export function getTechnologiaPlatforms() {
  return load().platforms;
}

export function getTechnologiaIntegrations() {
  return load().integrations;
}

export function getTechnologiaHosting() {
  return load().hosting;
}

export function getTechnologiaHandover() {
  return load().handover;
}

export function getTechnologiaFaq() {
  return load().faq;
}

export function getTechnologiaCta() {
  return load().cta;
}
