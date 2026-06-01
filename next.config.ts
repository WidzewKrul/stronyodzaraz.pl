import type { NextConfig } from "next";

// Content-Security-Policy tuned for: Stripe Checkout redirect, Google Analytics (gated),
// Meta Pixel (gated), Resend images, and our own origin. 'unsafe-inline' on style-src is
// required by Tailwind CSS runtime styles & Next.js inline styles; 'unsafe-inline' on
// script-src is required by Next.js inline scripts + JSON-LD blocks.
const CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "object-src 'none'",
  "frame-ancestors 'self'",
  "form-action 'self' https://checkout.stripe.com",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net https://js.stripe.com",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob: https://www.google-analytics.com https://www.googletagmanager.com https://www.facebook.com https://*.stripe.com",
  "font-src 'self' data:",
  "connect-src 'self' https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com https://connect.facebook.net https://*.facebook.com https://api.stripe.com https://checkout.stripe.com",
  "frame-src https://js.stripe.com https://checkout.stripe.com https://hooks.stripe.com",
  "media-src 'self'",
  "worker-src 'self' blob:",
].join("; ");

const nextConfig: NextConfig = {
  output: "standalone",
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      { source: "/narzedzia", destination: "/uslugi", permanent: true },
      { source: "/narzedzia/:path*", destination: "/uslugi", permanent: true },
      { source: "/sklep", destination: "/uslugi", permanent: true },
      { source: "/sklep/:path*", destination: "/uslugi", permanent: true },
      { source: "/dotacje", destination: "/uslugi", permanent: true },
      { source: "/dotacje/:path*", destination: "/uslugi", permanent: true },
      { source: "/gotowe-pisma", destination: "/uslugi", permanent: true },
      { source: "/gotowe-pisma/:path*", destination: "/uslugi/:path*", permanent: true },
      { source: "/kalkulator-odsetek", destination: "/uslugi", permanent: true },
      { source: "/kalkulator-odsetek/:path*", destination: "/uslugi", permanent: true },
    ];
  },
  async headers() {
    return [
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
          { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
          { key: "Content-Security-Policy", value: CSP },
        ],
      },
    ];
  },
};

export default nextConfig;
