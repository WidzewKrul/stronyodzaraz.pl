"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/components/CartProvider";
import BrandLogo from "@/components/BrandLogo";

const NAV_LINKS = [
  { href: "/uslugi", label: "Usługi" },
  { href: "/wykonane", label: "Wykonane" },
  { href: "/demo", label: "Demo" },
  { href: "/technologia", label: "Technologia" },
  { href: "/o-nas", label: "O nas" },
  { href: "/blog", label: "Blog" },
];

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [mobileOpen]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:px-6">
        <BrandLogo />

        <nav className="hidden items-center gap-7 md:flex" aria-label="Główne">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`text-sm font-medium transition hover:text-brand-700 ${
                pathname === l.href || pathname.startsWith(`${l.href}/`) ? "text-brand-700" : "text-slate-700"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/koszyk"
            className="relative inline-flex items-center gap-2 rounded-lg bg-brand-700 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-800"
          >
            <ShoppingCart className="h-4 w-4" aria-hidden />
            <span className="hidden sm:inline">Koszyk</span>
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-brand-800 shadow">
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-lg border border-slate-200 p-2 md:hidden"
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {mobileOpen ? <path d="M18 6 6 18M6 6l12 12" /> : <><path d="M3 12h18" /><path d="M3 6h18" /><path d="M3 18h18" /></>}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <>
          <div className="fixed inset-0 z-30 bg-slate-900/40 md:hidden" onClick={() => setMobileOpen(false)} aria-hidden="true" />
          <nav className="absolute inset-x-0 top-full z-40 max-h-[calc(100vh-60px)] overflow-y-auto border-t border-slate-200 bg-white shadow-lg md:hidden" aria-label="Mobilne">
            <ul className="mx-auto flex max-w-7xl flex-col px-4 py-2">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="block rounded-md px-3 py-3 text-base font-medium text-slate-800 hover:bg-slate-50" onClick={() => setMobileOpen(false)}>
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="py-2">
                <Link href="/koszyk" className="flex items-center justify-center gap-2 rounded-lg bg-brand-700 px-3 py-2.5 text-sm font-semibold text-white" onClick={() => setMobileOpen(false)}>
                  <ShoppingCart className="h-4 w-4" aria-hidden />
                  Koszyk{count > 0 ? ` (${count})` : ""}
                </Link>
              </li>
            </ul>
          </nav>
        </>
      )}
    </header>
  );
}
