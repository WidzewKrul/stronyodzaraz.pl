import Link from "next/link";
import { getBlogPosts } from "@/lib/blog";

export default async function BlogTeaser() {
  const posts = (await getBlogPosts()).slice(0, 3);

  return (
    <section className="py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Poradnik — strony, sklepy, e-commerce</h2>
            <p className="mt-1 text-slate-600">Praktyczne artykuły o kosztach, platformach i integracjach PL.</p>
          </div>
          <Link href="/blog" className="text-sm font-semibold text-brand-700 hover:text-brand-800">
            Wszystkie artykuły →
          </Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {posts.map((post) => (
            <article
              key={post.slug}
              className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition hover:border-brand-200"
            >
              <div className="h-28 bg-gradient-to-br from-brand-600 to-indigo-700" />
              <div className="flex flex-1 flex-col p-5">
                <p className="text-xs text-slate-500">
                  {new Date(post.publishedAt).toLocaleDateString("pl-PL")} · {post.readMinutes} min
                </p>
                <h3 className="mt-2 font-semibold text-slate-900">
                  <Link href={`/blog/${post.slug}`} className="hover:text-brand-700">
                    {post.title}
                  </Link>
                </h3>
                <p className="mt-2 flex-1 text-sm text-slate-600 line-clamp-3">{post.excerpt}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
