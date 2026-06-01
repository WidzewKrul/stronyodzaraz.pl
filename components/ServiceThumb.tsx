import { visualForService } from "@/lib/service-visuals";

type Props = {
  slug: string;
  title: string;
  category: string;
  className?: string;
  size?: "sm" | "md" | "lg";
};

const SIZE = {
  sm: { box: "h-10 w-10", icon: "h-5 w-5" },
  md: { box: "h-14 w-14", icon: "h-7 w-7" },
  lg: { box: "h-20 w-20", icon: "h-10 w-10" },
};

export default function ServiceThumb({ slug, title, category, className = "", size = "lg" }: Props) {
  const v = visualForService(slug, title, category);
  const Icon = v.icon;
  const s = SIZE[size];

  return (
    <div
      className={`relative flex aspect-[16/10] w-full items-center justify-center overflow-hidden bg-gradient-to-br ${v.gradient} ${className}`}
    >
      <div
        className={`flex ${s.box} items-center justify-center rounded-2xl bg-white/90 shadow-lg ring-1 ${v.ring} backdrop-blur-sm transition duration-300 group-hover:scale-105`}
      >
        <Icon className={`${s.icon} ${v.iconColor}`} strokeWidth={1.75} aria-hidden />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]" aria-hidden />
    </div>
  );
}
