import fs from "node:fs";
import path from "node:path";
import type { BrowserMockData } from "@/lib/wykonane-content";

export type DemoItem = {
  id: string;
  label: string;
  icon: string;
  gradient: string;
  accentHex: string;
  fakeBrand: string;
  fakeTagline: string;
  browserUrl: string;
  nav: string[];
  hero: BrowserMockData["hero"];
  sections: BrowserMockData["sections"];
  bulletsCard: string[];
  pdpSlug: string;
  pdpCategory: string;
  ctaLabel: string;
};

type DemoFile = {
  disclaimer: string;
  demos: DemoItem[];
  pageMeta: {
    homeSection: { h2: string; subtitle: string; linkAll: { href: string; label: string } };
    demoPage: {
      h1: string;
      intro: string;
      faq: Array<{ q: string; a: string }>;
    };
  };
};

let cache: DemoFile | null = null;

function load(): DemoFile {
  if (!cache) {
    const filePath = path.join(process.cwd(), "docs", "content", "demo-mockups.json");
    cache = JSON.parse(fs.readFileSync(filePath, "utf8")) as DemoFile;
  }
  return cache;
}

export function getDemoDisclaimer() {
  return load().disclaimer;
}

export function getDemos() {
  return load().demos;
}

export function getDemoHomeMeta() {
  return load().pageMeta.homeSection;
}

export function getDemoPageMeta() {
  return load().pageMeta.demoPage;
}

export function demoToBrowserMock(demo: DemoItem): BrowserMockData {
  return {
    icon: demo.icon,
    gradient: demo.gradient,
    accentHex: demo.accentHex,
    fakeBrand: demo.fakeBrand,
    fakeTagline: demo.fakeTagline,
    browserUrl: demo.browserUrl,
    nav: demo.nav,
    hero: demo.hero,
    sections: demo.sections,
  };
}
