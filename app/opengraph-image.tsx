import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "stronyodzaraz.pl — Strony i sklepy internetowe";

/** Sync with lib/catalog-curation curated count — edge runtime can't import uslugi.ts */
const CURATED_COUNT = 317;
const BRAND = "#4f46e5";
const BRAND_DARK = "#4338ca";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: `linear-gradient(135deg, #eef2ff 0%, #fff 55%, #f8fafc 100%)`,
          padding: 60,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          fontFamily: "system-ui",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: BRAND,
              color: "#fff",
              fontSize: 28,
              fontWeight: 900,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {"</>"}
          </div>
          <div style={{ fontSize: 30, fontWeight: 700, color: "#0f172a" }}>
            stronyodzaraz<span style={{ color: BRAND }}>.pl</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 58, fontWeight: 800, color: "#0f172a", lineHeight: 1.1 }}>
            Strony i sklepy internetowe od zera
          </div>
          <div style={{ fontSize: 32, fontWeight: 600, color: BRAND_DARK, lineHeight: 1.2 }}>
            {CURATED_COUNT}+ pakietów · WordPress · Shopify · od 990 zł
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 26, color: "#475569" }}>Realizacja 7–14 dni · stronyodzaraz.pl</div>
          <div
            style={{
              background: BRAND,
              color: "#fff",
              padding: "14px 28px",
              borderRadius: 12,
              fontSize: 26,
              fontWeight: 700,
            }}
          >
            Zamów online
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
