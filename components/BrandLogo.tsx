import Link from "next/link";

type Props = {
  variant?: "full" | "mark";
  className?: string;
  href?: string;
};

function LogoMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-hidden
    >
      <defs>
        <radialGradient id="logo-shine" cx="30%" cy="22%" r="65%">
          <stop offset="0%" stopColor="white" stopOpacity="0.22" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="logo-bg" cx="35%" cy="25%" r="80%" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#8b5cf6" />
          <stop offset="100%" stopColor="#6d28d9" />
        </radialGradient>
      </defs>
      <rect width="40" height="40" rx="9" fill="url(#logo-bg)" />
      <rect width="40" height="40" rx="9" fill="url(#logo-shine)" />
      {/* Left bracket < */}
      <path d="M14 14 L8.5 20 L14 26" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Right bracket > */}
      <path d="M26 14 L31.5 20 L26 26" stroke="white" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Slash / */}
      <path d="M23.5 11.5 L16.5 28.5" stroke="white" strokeWidth="2.1" strokeLinecap="round" opacity="0.88" />
    </svg>
  );
}

export default function BrandLogo({ variant = "full", className = "", href = "/" }: Props) {
  const markSize = variant === "mark" ? "h-9 w-9" : "h-9 w-9 sm:h-10 sm:w-10";

  const inner =
    variant === "full" ? (
      <span className="inline-flex items-center gap-2.5">
        <LogoMark className={`${markSize} ${className}`} />
        <span className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
          stronyodzaraz<span className="text-brand-600">.pl</span>
        </span>
      </span>
    ) : (
      <LogoMark className={`${markSize} ${className}`} />
    );

  return (
    <Link href={href} className="inline-flex shrink-0 items-center" aria-label="stronyodzaraz.pl — strona główna">
      {inner}
    </Link>
  );
}
