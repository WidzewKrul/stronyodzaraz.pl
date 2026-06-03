import type { Metadata } from "next";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import HeroBanner from "@/components/HeroBanner";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getBlogPosts } from "@/lib/blog";

export const metadata: Metadata = {
  title: "Blog — strony WWW, sklepy, WordPress, SEO",
  description:
    "Poradniki o stronach internetowych, sklepach WooCommerce/Shopify, opiece WordPress i marketingu online dla firm B2B.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getBlogPosts();
  return (
    <>
      <HeroBanner
        variant="catalog"
        icon={BookOpen}
        badge={`${posts.length} artykułów · WordPress · Shopify · SEO`}
        title="Blog — poradniki web dla firm"
        subtitle="Praktyczne artykuły o stronach internetowych, sklepach e-commerce, opiece WordPress i marketingu online dla polskich firm B2B."
        compact
      />
      <Breadcrumbs items={[{ label: "Blog" }]} />

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        {posts.length === 0 ? (
          <p className="text-center text-slate-500 py-16">Wkrótce pojawią się pierwsze artykuły.</p>
        ) : (
          <div className="grid gap-5 md:grid-cols-2">
            {posts.map((p) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="group flex flex-col rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md"
              >
                <p className="text-xs text-slate-400">
                  {new Date(p.publishedAt).toLocaleDateString("pl-PL")} · {p.readMinutes} min czytania
                </p>
                <h2 className="mt-2 text-base font-semibold leading-snug text-slate-900 transition group-hover:text-brand-700 sm:text-lg">
                  {p.title}
                </h2>
                <p className="mt-2 line-clamp-2 text-sm text-slate-500">{p.excerpt}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[11px] font-semibold text-brand-700 ring-1 ring-brand-100">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="mt-4 text-xs font-semibold text-brand-600 transition group-hover:text-brand-700">
                  Czytaj dalej →
                </span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
