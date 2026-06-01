import type { Metadata, Viewport } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Analytics from "@/components/Analytics";
import ConsentBanner from "@/components/ConsentBanner";
import CartProvider from "@/components/CartProvider";
import ScrollReveal from "@/components/ScrollReveal";
import { siteUrl as resolveSiteUrl } from "@/lib/env";

const SITE_URL = resolveSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "stronyodzaraz.pl — Strony i sklepy internetowe od zera",
    template: "%s · stronyodzaraz.pl",
  },
  description:
    "Polska agencja web B2B. Strony WordPress, sklepy WooCommerce, Shopify i Shoper — productized packages z jasną ceną. Realizacja 7–14 dni.",
  keywords: [
    "strony internetowe",
    "sklep internetowy",
    "WordPress",
    "WooCommerce",
    "Shopify",
    "Shoper",
    "agencja web",
    "tworzenie stron www",
    "sklep online Polska",
    "opieka techniczna WordPress",
  ],
  authors: [{ name: "stronyodzaraz.pl" }],
  openGraph: {
    title: "stronyodzaraz.pl — Strony i sklepy internetowe od zera",
    description: "WordPress, Shopify, Shoper — productized packages, jasna cena, realizacja online.",
    url: SITE_URL,
    siteName: "stronyodzaraz.pl",
    locale: "pl_PL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "stronyodzaraz.pl",
    description: "Strony i sklepy internetowe od zera — WordPress, Shopify, Shoper.",
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
  alternates: { canonical: "/", types: { "text/plain": "/llms.txt" } },
};

export const viewport: Viewport = {
  themeColor: "#4f46e5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    name: "stronyodzaraz.pl",
    url: SITE_URL,
    email: "kontakt@bblikh.pl",
    logo: `${SITE_URL}/images/brand/logo-mark.webp`,
    description:
      "Polska agencja web — strony WordPress, sklepy WooCommerce, Shopify i Shoper. Productized services z jasną ceną i realizacją 7–14 dni.",
    foundingDate: "2024",
    areaServed: { "@type": "Country", name: "Poland" },
    knowsAbout: [
      "WordPress",
      "WooCommerce",
      "Shopify",
      "Shoper",
      "strony internetowe B2B",
      "sklepy internetowe",
      "Google Ads",
      "opieka techniczna",
    ],
    contactPoint: [
      { "@type": "ContactPoint", email: "kontakt@bblikh.pl", contactType: "customer support", availableLanguage: "pl" },
    ],
    priceRange: "$$",
  };
  const websiteJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "stronyodzaraz.pl",
    url: SITE_URL,
    inLanguage: "pl-PL",
    publisher: { "@type": "Organization", name: "stronyodzaraz.pl", url: SITE_URL },
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: `${SITE_URL}/uslugi?q={search_term_string}` },
      "query-input": "required name=search_term_string",
    },
  };
  return (
    <html lang="pl">
      <head>
        <link rel="preconnect" href="https://js.stripe.com" />
        <link rel="preconnect" href="https://checkout.stripe.com" />
        <link rel="dns-prefetch" href="https://js.stripe.com" />
      </head>
      <body className="flex min-h-screen flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
        <ScrollReveal />
        <ConsentBanner />
        <Analytics />
      </body>
    </html>
  );
}
