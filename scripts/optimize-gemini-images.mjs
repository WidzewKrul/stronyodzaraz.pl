#!/usr/bin/env node
/**
 * Converts gemini-obrazki PNGs to public/images WebP (optimized for LCP).
 */
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.join(process.cwd());
const SRC = path.join(ROOT, "gemini-obrazki");
const OUT = path.join(ROOT, "public", "images");

/** @type {{ src: string; out: string; w: number; h?: number; position?: string }[]} */
const MAP = [
  { src: "Gemini_Generated_Image_5ajn0f5ajn0f5ajn.png", out: "brand/logo-full.webp", w: 720 },
  { src: "Gemini_Generated_Image_bckv65bckv65bckv.png", out: "brand/logo-mark.webp", w: 256, h: 256 },
  { src: "Gemini_Generated_Image_4pziix4pziix4pzi.png", out: "brand/og-default.webp", w: 1200, h: 630 },
  { src: "Gemini_Generated_Image_9gduxa9gduxa9gdu.png", out: "heroes/home-hero.webp", w: 1400, h: 875 },
  { src: "Gemini_Generated_Image_1o48we1o48we1o48.png", out: "heroes/shop-hero.webp", w: 1400, h: 560, position: "right" },
  { src: "Gemini_Generated_Image_yj1lhcyj1lhcyj1l.png", out: "product/document-preview.webp", w: 800, h: 1000 },
  { src: "Gemini_Generated_Image_xttwq6xttwq6xttw.png", out: "categories/gastronomia.webp", w: 1400, h: 560 },
  { src: "Gemini_Generated_Image_rp89fsrp89fsrp89.png", out: "categories/sklepy.webp", w: 1400, h: 560 },
  { src: "Gemini_Generated_Image_7jlnur7jlnur7jln.png", out: "categories/hotele-i-agroturystyka.webp", w: 1400, h: 560 },
  { src: "Gemini_Generated_Image_w4gb96w4gb96w4gb.png", out: "categories/salony-beauty.webp", w: 1400, h: 560, position: "right" },
  { src: "Gemini_Generated_Image_11vma111vma111vm.png", out: "categories/instytucje.webp", w: 1400, h: 560 },
  { src: "Gemini_Generated_Image_3rdswo3rdswo3rds.png", out: "categories/gabinety-medyczne.webp", w: 1400, h: 560 },
  { src: "Gemini_Generated_Image_k9cuwlk9cuwlk9cu.png", out: "categories/produkcja-zywnosci.webp", w: 1400, h: 560 },
  { src: "Gemini_Generated_Image_7jlnur7jlnur7jln.png", out: "categories/sport-i-rekreacja.webp", w: 1400, h: 560, position: "left" },
  { src: "Gemini_Generated_Image_hsendchsendchsen.png", out: "categories/eventy-i-obwozny-handel.webp", w: 1400, h: 560 },
  { src: "Gemini_Generated_Image_k0xzbdk0xzbdk0xz.png", out: "categories/rolnictwo-i-rhd.webp", w: 1400, h: 560 },
  { src: "Gemini_Generated_Image_7ce9rw7ce9rw7ce9.png", out: "categories/magazynowanie.webp", w: 1400, h: 560 },
  { src: "Gemini_Generated_Image_4pziix4pziix4pzi.png", out: "categories/sanepid-ogolny.webp", w: 1400, h: 560, position: "left" },
  { src: "Gemini_Generated_Image_eoqjn0eoqjn0eoqj.png", out: "doc-types/checklist.webp", w: 640, h: 400 },
  { src: "Gemini_Generated_Image_3qx7v73qx7v73qx7.png", out: "doc-types/register.webp", w: 640, h: 400 },
  { src: "Gemini_Generated_Image_g2fhflg2fhflg2fh.png", out: "doc-types/poster.webp", w: 640, h: 400 },
  { src: "Gemini_Generated_Image_4cbyup4cbyup4cby.png", out: "doc-types/ghp.webp", w: 640, h: 400 },
  { src: "Gemini_Generated_Image_1fip7j1fip7j1fip.png", out: "doc-types/haccp.webp", w: 640, h: 400 },
  { src: "Gemini_Generated_Image_9mq3309mq3309mq3.png", out: "doc-types/package.webp", w: 640, h: 400 },
  { src: "Gemini_Generated_Image_yj1lhcyj1lhcyj1l.png", out: "doc-types/general.webp", w: 640, h: 400 },
  { src: "Gemini_Generated_Image_294be8294be8294b.png", out: "steps/step-choose.webp", w: 560, h: 420 },
  { src: "Gemini_Generated_Image_t9fk0et9fk0et9fk.png", out: "steps/step-pay.webp", w: 560, h: 420 },
  { src: "Gemini_Generated_Image_kxlhwqkxlhwqkxlh.png", out: "steps/step-email.webp", w: 560, h: 420 },
  { src: "Gemini_Generated_Image_w4gb96w4gb96w4gb.png", out: "banners/opinie-hero.webp", w: 1400, h: 600 },
];

async function convertOne(entry) {
  const input = path.join(SRC, entry.src);
  const output = path.join(OUT, entry.out);
  if (!fs.existsSync(input)) {
    console.warn("SKIP missing:", entry.src);
    return;
  }
  fs.mkdirSync(path.dirname(output), { recursive: true });

  let img = sharp(input);
  const meta = await img.metadata();
  const targetW = entry.w;
  const targetH = entry.h;

  if (targetH) {
    const pos = entry.position === "right" ? "right" : entry.position === "left" ? "left" : "centre";
    img = img.resize(targetW, targetH, { fit: "cover", position: pos });
  } else {
    img = img.resize({ width: targetW, withoutEnlargement: true });
  }

  await img.webp({ quality: 82, effort: 6 }).toFile(output);
  const stat = fs.statSync(output);
  console.log(`${entry.out} ← ${entry.src} (${Math.round(stat.size / 1024)} KB, was ${meta.width}×${meta.height})`);
}

async function main() {
  if (!fs.existsSync(SRC)) {
    console.error("Brak folderu gemini-obrazki");
    process.exit(1);
  }
  for (const entry of MAP) {
    await convertOne(entry);
  }
  console.log("Done:", MAP.length, "files");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
