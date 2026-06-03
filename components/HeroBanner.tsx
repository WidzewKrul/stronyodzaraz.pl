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
    <svg className="absolute inset-0 h-full w-full opacity-[0.06]" aria-hidden>
      <defs>
        <pattern id="hero-grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M40 0H0V40" fill="none" stroke="white" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#hero-grid)" />
    </svg>
  );
}

function AnimatedBlobs() {
  return (
    <>
      <div className="animate-blob absolute -left-32 -top-32 h-[480px] w-[480px] rounded-full bg-violet-500/20 blur-3xl" aria-hidden />
      <div className="animate-blob animation-delay-2000 absolute right-0 top-1/4 h-[380px] w-[380px] rounded-full bg-indigo-400/15 blur-3xl" aria-hidden />
      <div className="animate-blob animation-delay-4000 absolute bottom-0 left-1/3 h-[280px] w-[280px] rounded-full bg-fuchsia-500/10 blur-3xl" aria-hidden />
    </>
  );
}

function BrowserMockup() {
  return (
    <div className="animate-float relative hidden lg:block" aria-hidden>
      <div className="absolute -right-4 top-1/2 w-[min(440px,38vw)] -translate-y-1/2 rotate-1 rounded-2xl border border-white/15 bg-white/8 p-2.5 shadow-2xl ring-1 ring-white/5 backdrop-blur-md">
        {/* Browser bar */}
        <div className="flex items-center gap-1.5 rounded-t-xl bg-white/10 px-3 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          <div className="mx-2 h-4 flex-1 rounded-full bg-white/10" />
        </div>
        {/* Browser content */}
        <div className="space-y-3 rounded-b-xl bg-white/95 p-5">
          {/* Hero strip */}
          <div className="h-12 rounded-lg bg-gradient-to-r from-violet-600 to-indigo-700 px-4 py-2 flex items-center gap-2">
            <div className="h-2 w-16 rounded bg-white/70" />
            <div className="ml-auto h-6 w-16 rounded-md bg-orange-400/90" />
          </div>
          {/* Content */}
          <div className="h-2.5 w-3/4 rounded-full bg-slate-200" />
          <div className="h-2 w-full rounded-full bg-slate-100" />
          <div className="h-2 w-5/6 rounded-full bg-slate-100" />
          {/* Cards grid */}
          <div className="mt-3 grid grid-cols-3 gap-2">
            <div className="aspect-[4/3] rounded-lg bg-violet-50 ring-1 ring-violet-200/50">
              <div className="flex h-full items-center justify-center">
                <div className="h-4 w-4 rounded bg-violet-400/60" />
              </div>
            </div>
            <div className="aspect-[4/3] rounded-lg bg-sky-50 ring-1 ring-sky-200/50">
              <div className="flex h-full items-center justify-center">
                <div className="h-4 w-4 rounded bg-sky-400/60" />
              </div>
            </div>
            <div className="aspect-[4/3] rounded-lg bg-emerald-50 ring-1 ring-emerald-200/50">
              <div className="flex h-full items-center justify-center">
                <div className="h-4 w-4 rounded bg-emerald-400/60" />
              </div>
            </div>
          </div>
          <div className="flex items-center justify-between pt-1">
            <div className="h-2 w-24 rounded-full bg-slate-100" />
            <div className="inline-block rounded-lg bg-orange-500 px-3 py-1.5 text-[9px] font-bold text-white shadow-sm">
              Zamów pakiet →
            </div>
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
      <AnimatedBlobs />
      {/* Subtle radial glow top-right */}
      <div
        className="pointer-events-none absolute -right-20 -top-20 h-[500px] w-[500px] rounded-full bg-violet-400/10 blur-3xl"
        aria-hidden
      />
      {/* Bottom edge gradient fade */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/20 to-transparent"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className={`grid items-center gap-8 lg:grid-cols-[1fr_auto] ${compact ? "py-10 sm:py-12" : "py-16 sm:py-24 lg:py-28"}`}>
          <div className="max-w-2xl">
            {badge && (
              <p className="animate-fade-up inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/8 px-4 py-1.5 text-xs font-semibold backdrop-blur-sm">
                {Icon && <Icon className="h-3.5 w-3.5 text-brand-300" aria-hidden />}
                <span className="text-white/90">{badge}</span>
              </p>
            )}
            <h1
              className={`animate-fade-up animation-delay-100 mt-4 font-extrabold leading-[1.1] tracking-tight ${compact ? "text-2xl sm:text-3xl" : "text-3xl sm:text-4xl lg:text-5xl xl:text-6xl"}`}
            >
              {title}
            </h1>
            {subtitle && (
              <p className="animate-fade-up animation-delay-200 mt-5 text-base text-white/75 sm:text-lg leading-relaxed">
                {subtitle}
              </p>
            )}
            {children && (
              <div className="animate-fade-up animation-delay-300 mt-7">
                {children}
              </div>
            )}
          </div>
          {variant === "home" && <BrowserMockup />}
        </div>
      </div>
    </section>
  );
}
