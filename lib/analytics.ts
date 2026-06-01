export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "";
export const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "";
export const ANALYTICS_ENABLED = Boolean(GA_ID) || Boolean(META_PIXEL_ID);

export type Consent = "accepted" | "rejected" | "unknown";
export const CONSENT_KEY = "stronyodzaraz.pl.consent.v1";
