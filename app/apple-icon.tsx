import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const BRAND_GREEN = "#15803d";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: BRAND_GREEN,
          borderRadius: 32,
        }}
      >
        <svg width="120" height="120" viewBox="0 0 24 24" fill="none">
          <path
            d="M12 2L4 5v6c0 5.25 3.4 10.15 8 11.35C16.6 21.15 20 16.25 20 11V5l-8-3z"
            fill="#ffffff"
            fillOpacity="0.95"
          />
          <rect x="8" y="8" width="8" height="10" rx="1" fill={BRAND_GREEN} />
          <rect x="10" y="10" width="4" height="1.5" rx="0.5" fill="#ffffff" />
          <rect x="10" y="13" width="4" height="1.5" rx="0.5" fill="#ffffff" />
          <rect x="10" y="16" width="3" height="1.5" rx="0.5" fill="#ffffff" />
        </svg>
      </div>
    ),
    { ...size },
  );
}
