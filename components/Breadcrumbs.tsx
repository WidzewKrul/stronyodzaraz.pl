import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export type Crumb = { label: string; href?: string };
type Props = { items: Crumb[] };

export default function Breadcrumbs({ items }: Props) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: item.href } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Nawigacja okruszkowa" className="border-b border-slate-100 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <ol className="flex flex-wrap items-center gap-1 py-3 text-xs text-slate-500">
            <li className="flex items-center gap-1">
              <Link href="/" className="inline-flex items-center gap-1 transition hover:text-brand-600">
                <Home className="h-3 w-3" aria-hidden />
                <span>Strona główna</span>
              </Link>
            </li>
            {items.map((crumb, i) => (
              <li key={crumb.label} className="flex items-center gap-1">
                <ChevronRight className="h-3 w-3 text-slate-300" aria-hidden />
                {crumb.href ? (
                  <Link href={crumb.href} className="transition hover:text-brand-600">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-medium text-slate-800" aria-current="page">{crumb.label}</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}
