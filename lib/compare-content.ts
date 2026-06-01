import fs from "node:fs";
import path from "node:path";

type CompareStartProFile = {
  h2: string;
  subtitle: string;
  columns: string[];
  highlightColumn: number;
  rows: Array<{ label: string; start: string; pro: string }>;
  ctaStart: { label: string; href: string };
  ctaPro: { label: string; href: string };
};

let cache: CompareStartProFile | null = null;

export function getCompareStartPro() {
  if (!cache) {
    const filePath = path.join(process.cwd(), "docs", "content", "compare-start-pro.json");
    cache = JSON.parse(fs.readFileSync(filePath, "utf8")) as CompareStartProFile;
  }
  return cache;
}
