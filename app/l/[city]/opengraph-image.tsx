import { ImageResponse } from "next/og";
import { getCityBySlug } from "@/lib/seo/local";

export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "stronyodzaraz.pl — strony i sklepy internetowe";

const BRAND = "#4f46e5";
const BRAND_DARK = "#4338ca";

export default async function Image({ params }: { params: Promise<{ city: string }> }) {
  const { city: citySlug } = await params;
  const city = getCityBySlug(citySlug);
  const cityName = city?.name ?? "Polska";
  const region = city?.voivodeship ?? "cała Polska";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #eef2ff 0%, #fff 55%, #f8fafc 100%)",
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
          <div style={{ display: "flex", fontSize: 30, fontWeight: 700, color: "#0f172a" }}>
            stronyodzaraz<span style={{ color: BRAND }}>.pl</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 56, fontWeight: 800, color: "#0f172a", lineHeight: 1.1, display: "flex" }}>
            Strony i sklepy internetowe — {cityName}
          </div>
          <div style={{ display: "flex", fontSize: 32, fontWeight: 600, color: BRAND_DARK }}>
            {region} · obsługa zdalna · od 990 zł
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 26, color: "#475569" }}>Stała cena · realizacja 7–14 dni</div>
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
