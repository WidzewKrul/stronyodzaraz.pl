import type { LucideIcon } from "lucide-react";
import { visualForCategory } from "@/lib/service-visuals";

type Props = {
  categorySlug: string;
  icon: LucideIcon;
};

const PATTERNS: Record<string, string> = {
  "strony-internetowe": "M0,40 L20,20 L40,40 M20,0 L20,20",
  "sklepy-internetowe": "M5,35 L20,10 L35,35 Z",
  wordpress: "M4,4 h32 v32 h-32 Z M12,20 h16",
  "shopify-shoper": "M8,8 L32,8 L32,32 L8,32 L8,8 M16,16 h8 v8 h-8 Z",
  "reklama-marketing": "M4,36 Q20,4 36,36",
  "opieka-techniczna": "M20,4 L36,36 L4,36 Z",
  integracje: "M8,20 C8,12 32,12 32,20 C32,28 8,28 8,20",
  "migracje-naprawy": "M8,8 L32,32 M32,8 L8,32",
};

export default function CategoryTileArt({ categorySlug, icon: FallbackIcon }: Props) {
  const v = visualForCategory(categorySlug);
  const Icon = v.icon ?? FallbackIcon;
  const svgPath = PATTERNS[categorySlug] ?? "M4,4 h32 v32 h-32 Z";

  return (
    <div className={`relative flex h-36 items-center justify-center overflow-hidden bg-gradient-to-br ${v.gradient}`}>
      {/* Decorative SVG pattern */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.08]"
        viewBox="0 0 40 40"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <path d={svgPath} fill="none" stroke="currentColor" strokeWidth="1.5" />
        {/* repeating dots */}
        {[8, 16, 24, 32].map((x) =>
          [8, 16, 24, 32].map((y) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="0.8" fill="currentColor" />
          ))
        )}
      </svg>
      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_65%_30%,rgba(255,255,255,0.6),transparent_55%)]" aria-hidden />
      {/* Icon */}
      <div className={`relative z-10 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/20 ring-2 ring-white/30 backdrop-blur-sm shadow-lg`}>
        <Icon className={`h-7 w-7 ${v.iconColor} drop-shadow-sm`} strokeWidth={1.5} aria-hidden />
      </div>
    </div>
  );
}
