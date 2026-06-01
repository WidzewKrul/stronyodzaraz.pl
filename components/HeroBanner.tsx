import type { LucideIcon } from "lucide-react";
import { heroGradient, type HeroVariant } from "@/lib/service-visuals";

type Props = {
  variant?: HeroVariant;
  icon?: LucideIcon;
  badge?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  children?: React.ReactNode;
  compact?: boolean;
};

function GridPattern() {
  return (
    <svg className="absolute inset-0 h-full w-full opacity-[0.07]" aria-hidden>
      <defs>
        <pattern id="hero-grid" width="32" height="32" patternUnits="userSpaceOnUse">
          <path d="M32 0H0V32" fill="none" stroke="white" strokeWidth="0.5" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-grid)" />
    </svg>
  );
}

function BrowserMockup() {
  return (
    <div className="relative hidden lg:block" aria-hidden>
      <div className="absolute -right-4 top-1/2 w-[min(420px,38vw)] -translate-y-1/2 rotate-1 rounded-2xl border border-white/20 bg-white/10 p-2 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-1.5 rounded-t-lg bg-white/10 px-3 py-2">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
        </div>
        <div className="space-y-2 rounded-b-lg bg-white/95 p-4">
          <div className="h-3 w-2/3 rounded bg-brand-200" />
          <div className="h-2 w-full rounded bg-slate-100" />
          <div className="h-2 w-5/6 rounded bg-slate-100" />
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="aspect-[4/3] rounded-lg bg-brand-50" />
            <div className="aspect-[4/3] rounded-lg bg-sky-50" />
            <div className="aspect-[4/3] rounded-lg bg-indigo-50" />
          </div>
          <div className="mt-2 inline-block rounded-md bg-brand-600 px-3 py-1.5 text-[10px] font-semibold text-white">
            Zamów pakiet
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HeroBanner({
  variant = "home",
  icon: Icon,
  badge,
  title,
  subtitle,
  children,
  compact = false,
}: Props) {
  return (
    <section className={`relative overflow-hidden bg-gradient-to-br ${heroGradient(variant)} text-white`}>
      <GridPattern />
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-white/10 blur-3xl"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className={`grid items-center gap-8 lg:grid-cols-[1fr_auto] ${compact ? "py-10 sm:py-12" : "py-14 sm:py-20 lg:py-24"}`}>
          <div className="max-w-2xl">
            {badge && (
              <p className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-sm">
                {Icon && <Icon className="h-3.5 w-3.5" aria-hidden />}
                {badge}
              </p>
            )}
            <h1 className={`mt-4 font-extrabold leading-tight tracking-tight ${compact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl lg:text-5xl"}`}>
              {title}
            </h1>
            {subtitle && <p className="mt-4 text-base text-white/85 sm:text-lg leading-relaxed">{subtitle}</p>}
            {children && <div className="mt-6">{children}</div>}
          </div>
          {variant === "home" && <BrowserMockup />}
        </div>
      </div>
    </section>
  );
}
