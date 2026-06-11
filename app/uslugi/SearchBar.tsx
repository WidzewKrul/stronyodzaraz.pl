"use client";
import { useRouter, usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { Search, X } from "lucide-react";

export default function SearchBar({
  defaultValue = "",
  defaultCat = "",
}: {
  defaultValue?: string;
  defaultCat?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [value, setValue] = useState(defaultValue);
  const [isPending, startTransition] = useTransition();
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
  }, []);

  const navigate = useCallback(
    (q: string, cat: string) => {
      const params = new URLSearchParams();
      if (q) params.set("q", q);
      if (cat) params.set("cat", cat);
      const search = params.toString();
      startTransition(() => {
        router.push(search ? `${pathname}?${search}` : pathname, {
          scroll: false,
        });
      });
    },
    [router, pathname],
  );

  // Debounce route pushes so typing doesn't fire a navigation per keystroke.
  const navigateDebounced = useCallback(
    (q: string, cat: string) => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => navigate(q, cat), 300);
    },
    [navigate],
  );

  return (
    <div className="relative w-full max-w-xl">
      <Search
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 pointer-events-none"
        aria-hidden
      />
      <input
        type="search"
        value={value}
        onChange={(e) => {
          setValue(e.target.value);
          navigateDebounced(e.target.value, defaultCat);
        }}
        placeholder="Szukaj: WordPress, sklep, opieka, migracja…"
        className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-10 text-sm shadow-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
        aria-label="Szukaj pakietu usług"
      />
      {value && !isPending && (
        <button
          onClick={() => {
            setValue("");
            navigate("", defaultCat);
          }}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700"
          aria-label="Wyczyść"
        >
          <X className="h-4 w-4" />
        </button>
      )}
      {isPending && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin rounded-full border-2 border-brand-600 border-t-transparent" />
      )}
    </div>
  );
}
