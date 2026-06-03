"use client";

import Link from "next/link";
import { Code2 } from "lucide-react";

type Props = {
  variant?: "full" | "mark";
  className?: string;
  href?: string;
};

export default function BrandLogo({ variant = "full", className = "", href = "/" }: Props) {
  const mark = (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white shadow-md ring-2 ring-brand-400/20 ${variant === "mark" ? "h-9 w-9" : "h-9 w-9 sm:h-10 sm:w-10"} ${className}`}
      aria-hidden
    >
      <Code2 className="h-5 w-5" strokeWidth={2.2} />
    </span>
  );

  const inner =
    variant === "full" ? (
      <span className="inline-flex items-center gap-2.5">
        {mark}
        <span className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
          stronyodzaraz<span className="text-brand-600">.pl</span>
        </span>
      </span>
    ) : (
      mark
    );

  return (
    <Link href={href} className="inline-flex shrink-0 items-center" aria-label="stronyodzaraz.pl — strona główna">
      {inner}
    </Link>
  );
}
