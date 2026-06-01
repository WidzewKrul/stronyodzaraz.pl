import { SiShopify, SiWoocommerce, SiWordpress } from "@icons-pack/react-simple-icons";
import Link from "next/link";

const PLATFORMS = [
  { Icon: SiWordpress, label: "WordPress", color: "#21759B" },
  { Icon: SiWoocommerce, label: "WooCommerce", color: "#96588A" },
  { Icon: SiShopify, label: "Shopify", color: "#96BF48" },
] as const;

type Props = {
  className?: string;
  variant?: "hero" | "light";
};

export default function PlatformBadges({ className = "", variant = "hero" }: Props) {
  const chipClass =
    variant === "hero"
      ? "border-white/20 bg-white/10 text-white/90"
      : "border-slate-200 bg-white text-slate-700 shadow-sm";

  return (
    <div className={className}>
      {variant === "light" && (
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-lg font-bold text-slate-900">Technologie, które wdrażamy</h2>
          <Link href="/technologia" className="text-sm font-semibold text-brand-700 hover:text-brand-800">
            Szczegóły stacku →
          </Link>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-3">
        {PLATFORMS.map(({ Icon, label, color }) => (
          <span
            key={label}
            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium backdrop-blur-sm ${chipClass}`}
          >
            <Icon size={14} color={color} aria-hidden />
            {label}
          </span>
        ))}
        <span className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${chipClass}`}>
          Stripe · GA4
        </span>
      </div>
    </div>
  );
}
