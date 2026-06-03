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
  const [scrolled, setScrolled] = useState(false);
  const { count } = useCart();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!mobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener("keydown", onKey); };
  }, [mobileOpen]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-40 w-full border-b transition-all duration-200 ${
        scrolled
          ? "border-slate-200/80 bg-white/97 shadow-sm backdrop-blur-md"
          : "border-slate-100/60 bg-white/95 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-4 py-3 sm:gap-4 sm:px-6">
        <BrandLogo />

        <nav className="hidden items-center gap-6 md:flex" aria-label="Główne">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`relative text-sm font-medium transition-colors duration-150 hover:text-brand-600 ${
                isActive(l.href) ? "text-brand-700" : "text-slate-600"
              }`}
            >
              {l.label}
              {isActive(l.href) && (
                <span className="absolute -bottom-[17px] left-0 right-0 h-0.5 rounded-t-full bg-brand-500" />
              )}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/koszyk"
            className="group relative inline-flex items-center gap-2 rounded-xl bg-accent-500 px-3 py-2 text-sm font-semibold text-white shadow-md shadow-accent-500/25 transition hover:bg-accent-600 hover:shadow-accent-600/30 active:scale-95"
          >
            <ShoppingCart className="h-4 w-4 transition-transform group-hover:scale-110" aria-hidden />
            <span className="hidden sm:inline">Koszyk</span>
            {count > 0 && (
              <span className="absolute -right-1.5 -top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-white text-[10px] font-bold text-accent-600 shadow">
                {count}
              </span>
            )}
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white p-2 transition hover:bg-slate-50 md:hidden"
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
          <div className="fixed inset-0 z-30 bg-slate-900/50 backdrop-blur-sm md:hidden" onClick={() => setMobileOpen(false)} aria-hidden="true" />
          <nav className="absolute inset-x-0 top-full z-40 max-h-[calc(100vh-60px)] overflow-y-auto border-t border-slate-200 bg-white shadow-xl md:hidden" aria-label="Mobilne">
            <ul className="mx-auto flex max-w-7xl flex-col px-4 py-3">
              {NAV_LINKS.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`flex items-center rounded-xl px-3 py-3 text-base font-medium transition-colors ${
                      isActive(l.href)
                        ? "bg-brand-50 text-brand-700"
                        : "text-slate-700 hover:bg-slate-50"
                    }`}
                    onClick={() => setMobileOpen(false)}
                  >
                    {l.label}
                    {isActive(l.href) && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-brand-500" />
                    )}
                  </Link>
                </li>
              ))}
              <li className="py-2 pt-3">
                <Link
                  href="/koszyk"
                  className="flex items-center justify-center gap-2 rounded-xl bg-accent-500 px-3 py-3 text-sm font-semibold text-white shadow-md"
                  onClick={() => setMobileOpen(false)}
                >
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
