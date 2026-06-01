import type { Metadata } from "next";
import Link from "next/link";
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
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <nav aria-label="Breadcrumb" className="mb-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-brand-700">Strona główna</Link>
        <span className="mx-1.5">/</span>
        <span className="text-slate-700">Blog</span>
      </nav>
      <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">Blog</h1>
      <p className="mt-3 text-slate-600">Poradniki o stronach WWW, e-commerce, WordPress i SEO dla polskich firm.</p>

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {posts.map((p) => (
          <Link key={p.slug} href={`/blog/${p.slug}`} className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 transition hover:border-brand-300 hover:shadow">
            <p className="text-xs text-slate-500">{new Date(p.publishedAt).toLocaleDateString("pl-PL")} · {p.readMinutes} min czytania</p>
            <h2 className="mt-2 text-lg font-semibold text-slate-900 group-hover:text-brand-700">{p.title}</h2>
            <p className="mt-2 text-sm text-slate-600">{p.excerpt}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {p.tags.map((t) => <span key={t} className="rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-medium text-brand-800">{t}</span>)}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
