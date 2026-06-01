import type { LucideIcon } from "lucide-react";
import { visualForCategory } from "@/lib/service-visuals";

type Props = {
  categorySlug: string;
  icon: LucideIcon;
};

export default function CategoryTileArt({ categorySlug, icon: FallbackIcon }: Props) {
  const v = visualForCategory(categorySlug);
  const Icon = v.icon ?? FallbackIcon;

  return (
    <div className={`relative flex h-32 items-center justify-center overflow-hidden bg-gradient-to-br ${v.gradient}`}>
      <Icon className={`h-12 w-12 ${v.iconColor} opacity-90`} strokeWidth={1.5} aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.5),transparent_50%)]" aria-hidden />
    </div>
  );
}
