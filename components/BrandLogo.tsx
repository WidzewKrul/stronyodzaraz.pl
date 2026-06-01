"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Code2 } from "lucide-react";
import { LOGO_MARK_PATHS } from "@/lib/service-visuals";

type Props = {
  variant?: "full" | "mark";
  className?: string;
  href?: string;
};

export default function BrandLogo({ variant = "full", className = "", href = "/" }: Props) {
  const [pathIdx, setPathIdx] = useState(0);
  const [failed, setFailed] = useState(false);

  const markFallback = (
    <span
      className={`inline-flex shrink-0 items-center justify-center rounded-lg bg-brand-600 text-white ${variant === "mark" ? "h-9 w-9" : "h-9 w-9 sm:h-10 sm:w-10"} ${className}`}
      aria-hidden
    >
      <Code2 className="h-5 w-5" strokeWidth={2.2} />
    </span>
  );

  const markImage =
    !failed && pathIdx < LOGO_MARK_PATHS.length ? (
      <Image
        src={LOGO_MARK_PATHS[pathIdx]}
        alt=""
        width={40}
        height={40}
        className={`h-9 w-9 object-contain sm:h-10 sm:w-10 ${className}`}
        onError={() => {
          if (pathIdx + 1 < LOGO_MARK_PATHS.length) setPathIdx(pathIdx + 1);
          else setFailed(true);
        }}
      />
    ) : (
      markFallback
    );

  const inner =
    variant === "full" ? (
      <span className="inline-flex items-center gap-2.5">
        {markImage}
        <span className="text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
          stronyodzaraz<span className="text-brand-600">.pl</span>
        </span>
      </span>
    ) : (
      markImage
    );

  return (
    <Link href={href} className="inline-flex shrink-0 items-center" aria-label="stronyodzaraz.pl — strona główna">
      {inner}
    </Link>
  );
}
