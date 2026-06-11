import { ImageResponse } from "next/og";
import { getStoreProductBySlug } from "@/lib/uslugi";

// Node runtime (self-hosted standalone server) so we can read the real catalog
// for the product title + price instead of a generic card.
export const runtime = "nodejs";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "stronyodzaraz.pl — pakiet usługi";

const BRAND = "#4f46e5";
const BRAND_DARK = "#4338ca";

function formatPln(grosze: number): string {
  return (grosze / 100).toLocaleString("pl-PL", { maximumFractionDigits: 0 });
}

export default async function Image({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const { slug } = await params;
  const pismo = getStoreProductBySlug(slug);
  const title = pismo?.seoTitle ?? "Pakiet usługi";
  const priceLine = pismo ? `od ${formatPln(pismo.priceGrosze)} zł` : "stronyodzaraz.pl";

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
          <div style={{ fontSize: 54, fontWeight: 800, color: "#0f172a", lineHeight: 1.12, display: "flex" }}>
            {title.length > 90 ? title.slice(0, 87) + "…" : title}
          </div>
          <div style={{ fontSize: 36, fontWeight: 700, color: BRAND_DARK }}>{priceLine}</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
          <div style={{ fontSize: 26, color: "#475569" }}>Realizacja 7–14 dni · brief online po płatności</div>
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
