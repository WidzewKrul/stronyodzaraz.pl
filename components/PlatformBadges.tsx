import { SiShopify, SiWoocommerce, SiWordpress } from "@icons-pack/react-simple-icons";
import Link from "next/link";

const PLATFORMS = [
  { Icon: SiWordpress, label: "WordPress", color: "#21759B" },
  { Icon: SiWoocommerce, label: "WooCommerce", color: "#96588A" },
  { Icon: SiShopify, label: "Shopify", color: "#96BF48" },
] as const;

const EXTRA_CHIPS = ["Shoper", "Stripe", "GA4", "Next.js"];

type Props = {
  className?: string;
  variant?: "hero" | "light";
};

export default function PlatformBadges({ className = "", variant = "hero" }: Props) {
  const chipBase =
    variant === "hero"
      ? "border-white/20 bg-white/8 text-white/85 hover:bg-white/15"
      : "border-slate-200 bg-white text-slate-700 shadow-sm hover:border-brand-200 hover:bg-brand-50";

  return (
    <div className={className}>
      {variant === "light" && (
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Technologie, które wdrażamy</h2>
            <p className="mt-0.5 text-sm text-slate-500">Sprawdzone platformy z pełnym polskim wsparciem</p>
          </div>
          <Link href="/technologia" className="text-sm font-semibold text-brand-700 hover:text-brand-800">
            Szczegóły stacku →
          </Link>
        </div>
      )}
      <div className="flex flex-wrap items-center gap-2.5">
        {PLATFORMS.map(({ Icon, label, color }) => (
          <span
            key={label}
            className={`inline-flex items-center gap-2 rounded-xl border px-3.5 py-1.5 text-xs font-medium backdrop-blur-sm transition-colors ${chipBase}`}
          >
            <Icon size={14} color={variant === "hero" ? "currentColor" : color} aria-hidden />
            {label}
          </span>
        ))}
        {EXTRA_CHIPS.map((chip) => (
          <span
            key={chip}
            className={`inline-flex items-center rounded-xl border px-3.5 py-1.5 text-xs font-medium transition-colors ${chipBase}`}
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}
