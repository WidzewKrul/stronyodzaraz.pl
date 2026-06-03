import type { LucideIcon } from "lucide-react";
import {
  Globe,
  ShoppingCart,
  Code2,
  Store,
  Megaphone,
  Wrench,
  Plug,
  RefreshCw,
  LayoutTemplate,
  Shield,
  Zap,
} from "lucide-react";
import type { ServiceKind } from "./service-kind";
import { inferServiceKind } from "./service-kind";

export type VisualAccent = "indigo" | "sky" | "violet" | "emerald" | "amber" | "rose" | "slate";

export type ServiceVisual = {
  icon: LucideIcon;
  gradient: string;
  iconColor: string;
  ring: string;
};

const KIND_VISUALS: Record<ServiceKind, ServiceVisual> = {
  strona: {
    icon: LayoutTemplate,
    gradient: "from-indigo-500/20 via-brand-100 to-sky-100",
    iconColor: "text-indigo-600",
    ring: "ring-indigo-200/60",
  },
  sklep: {
    icon: ShoppingCart,
    gradient: "from-emerald-500/15 via-emerald-50 to-teal-100",
    iconColor: "text-emerald-600",
    ring: "ring-emerald-200/60",
  },
  wordpress: {
    icon: Code2,
    gradient: "from-sky-500/15 via-sky-50 to-indigo-100",
    iconColor: "text-sky-600",
    ring: "ring-sky-200/60",
  },
  opieka: {
    icon: Wrench,
    gradient: "from-slate-500/15 via-slate-100 to-zinc-100",
    iconColor: "text-slate-600",
    ring: "ring-slate-200/60",
  },
  marketing: {
    icon: Megaphone,
    gradient: "from-amber-500/15 via-amber-50 to-orange-100",
    iconColor: "text-amber-600",
    ring: "ring-amber-200/60",
  },
  integracja: {
    icon: Plug,
    gradient: "from-violet-500/15 via-violet-50 to-indigo-100",
    iconColor: "text-violet-600",
    ring: "ring-violet-200/60",
  },
  migracja: {
    icon: RefreshCw,
    gradient: "from-rose-500/15 via-rose-50 to-pink-100",
    iconColor: "text-rose-600",
    ring: "ring-rose-200/60",
  },
  general: {
    icon: Globe,
    gradient: "from-brand-500/15 via-brand-50 to-indigo-100",
    iconColor: "text-brand-600",
    ring: "ring-brand-200/60",
  },
};

const CATEGORY_VISUALS: Record<string, ServiceVisual> = {
  "strony-internetowe": KIND_VISUALS.strona,
  "sklepy-internetowe": KIND_VISUALS.sklep,
  wordpress: KIND_VISUALS.wordpress,
  "shopify-shoper": { ...KIND_VISUALS.sklep, icon: Store },
  "reklama-marketing": KIND_VISUALS.marketing,
  "opieka-techniczna": KIND_VISUALS.opieka,
  integracje: KIND_VISUALS.integracja,
  "migracje-naprawy": KIND_VISUALS.migracja,
};

export function visualForService(slug: string, title: string, category: string): ServiceVisual {
  const kind = inferServiceKind(title, slug, category);
  return KIND_VISUALS[kind] ?? CATEGORY_VISUALS[category] ?? KIND_VISUALS.general;
}

export function visualForCategory(category: string): ServiceVisual {
  return CATEGORY_VISUALS[category] ?? KIND_VISUALS.general;
}

export type HeroVariant = "home" | "catalog" | "category";

const HERO_GRADIENTS: Record<HeroVariant, string> = {
  home: "from-slate-900 via-violet-900 to-indigo-950",
  catalog: "from-indigo-950 via-violet-900 to-slate-900",
  category: "from-slate-900 via-indigo-900 to-violet-900",
};

export function heroGradient(variant: HeroVariant): string {
  return HERO_GRADIENTS[variant];
}

export const TRUST_PILLS_WEB = [
  { icon: Shield, text: "Gwarancja 30 dni" },
  { icon: Zap, text: "Realizacja 7–14 dni" },
  { icon: Code2, text: "WordPress · Shopify · Shoper" },
] as const;

/** Paths where user drops custom logo (first existing wins in BrandLogo). */
export const LOGO_MARK_PATHS = [
  "/images/brand/logo-mark.webp",
  "/images/brand/logo-mark.png",
  "/images/brand/logo-mark.svg",
] as const;

export const LOGO_FULL_PATHS = [
  "/images/brand/logo-full.webp",
  "/images/brand/logo-full.png",
  "/images/brand/logo-full.svg",
] as const;
