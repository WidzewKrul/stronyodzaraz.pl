"use client";

import { useEffect } from "react";

/** Fallback scroll animations when CSS animation-timeline is unsupported (Safari, Firefox). */
export default function ScrollReveal() {
  useEffect(() => {
    if (typeof CSS !== "undefined" && CSS.supports("animation-timeline", "view()")) {
      return;
    }

    const els = document.querySelectorAll<HTMLElement>(".animate-on-scroll");
    if (els.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return null;
}
