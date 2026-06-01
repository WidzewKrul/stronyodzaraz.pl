import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Avatar from "boring-avatars";
import { getAllBlogPostsForRoutes, getPost } from "@/lib/blog";

type Params = { params: Promise<{ slug: string }> };

const TAG_TO_CATEGORY: Record<string, { slug: string; title: string }> = {
  "strony www": { slug: "strony-internetowe", title: "Strony internetowe" },
  WordPress: { slug: "strony-internetowe", title: "Strony internetowe" },
  CWV: { slug: "migracje-naprawy", title: "Migracje i naprawy" },
  performance: { slug: "migracje-naprawy", title: "Migracje i naprawy" },
  Shopify: { slug: "sklepy-internetowe", title: "Sklepy internetowe" },
  WooCommerce: { slug: "sklepy-internetowe", title: "Sklepy internetowe" },
  "e-commerce": { slug: "sklepy-internetowe", title: "Sklepy internetowe" },
  "sklep internetowy": { slug: "sklepy-internetowe", title: "Sklepy internetowe" },
  "Google Ads": { slug: "reklama-marketing", title: "Reklama i marketing" },
  marketing: { slug: "reklama-marketing", title: "Reklama i marketing" },
  B2B: { slug: "strony-internetowe", title: "Strony internetowe" },
  biznes: { slug: "strony-internetowe", title: "Strony internetowe" },
  agencja: { slug: "strony-internetowe", title: "Strony internetowe" },
  "opieka techniczna": { slug: "opieka-techniczna", title: "Opieka techniczna" },
  bezpieczeństwo: { slug: "opieka-techniczna", title: "Opieka techniczna" },
  integracje: { slug: "integracje", title: "Integracje" },
  InPost: { slug: "integracje", title: "Integracje" },
  migracja: { slug: "migracje-naprawy", title: "Migracje i naprawy" },
  SEO: { slug: "migracje-naprawy", title: "Migracje i naprawy" },
  restauracja: { slug: "strony-internetowe", title: "Strony internetowe" },
  branża: { slug: "strony-internetowe", title: "Strony internetowe" },
  cennik: { slug: "strony-internetowe", title: "Strony internetowe" },
  poradnik: { slug: "sklepy-internetowe", title: "Sklepy internetowe" },
};

export async function generateStaticParams() {
  return getAllBlogPostsForRoutes().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const p = getPost(slug);
  if (!p) return { title: "Nie znaleziono" };
  return {
    title: p.title,
    description: p.excerpt,
    alternates: { canonical: `/blog/${p.slug}` },
    openGraph: { title: p.title, description: p.excerpt, type: "article" },
  };
}

function renderMarkdown(md: string): string {
  const lines = md.split("\n");
  const html: string[] = [];
  let inList = false;

  const close = () => { if (inList) { html.push("</ul>"); inList = false; } };

  for (const ln of lines) {
    if (ln.startsWith("## ")) {
      close();
      html.push(`<h2 class="mt-8 text-xl font-semibold text-slate-900">${escape(ln.slice(3))}</h2>`);
    } else if (ln.startsWith("### ")) {
      close();
      html.push(`<h3 class="mt-6 text-lg font-semibold text-slate-900">${escape(ln.slice(4))}</h3>`);
    } else if (ln.startsWith("- ")) {
      if (!inList) { html.push('<ul class="mt-3 list-disc pl-6 text-slate-700 space-y-1.5">'); inList = true; }
      html.push(`<li>${inline(ln.slice(2))}</li>`);
    } else if (/^\d+\.\s/.test(ln)) {
      close();
      html.push(`<p class="mt-3 text-slate-700 leading-7">${inline(ln)}</p>`);
    } else if (ln.trim() === "") {
      close();
    } else {
      close();
      html.push(`<p class="mt-3 text-slate-700 leading-7">${inline(ln)}</p>`);
    }
  }
  close();
  return html.join("\n");
}

function escape(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

// Allow only http(s), mailto, tel and same-origin relative links. Reject
// javascript:, data:, vbscript: and anything else.
function safeHref(raw: string): string | null {
  const v = raw.trim();
  if (!v) return null;
  if (v.startsWith("/") || v.startsWith("#")) return v;
  if (/^(mailto:|tel:)/i.test(v)) return v;
  try {
    const u = new URL(v);
    if (u.protocol === "http:" || u.protocol === "https:") return u.toString();
    return null;
  } catch {
    return null;
  }
}

function inline(s: string) {
  const safe = escape(s);
  return safe
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-slate-900">$1</strong>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_m, text: string, href: string) => {
      const url = safeHref(href);
      if (!url) return text; // drop dangerous links, keep visible text
      const external = /^https?:\/\//i.test(url) && !url.startsWith("/");
      const attrs = external
        ? ` target="_blank" rel="noopener noreferrer nofollow"`
        : "";
      return `<a href="${url}" class="text-brand-700 underline"${attrs}>${text}</a>`;
    });
}

export default async function BlogPost({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const matchedCat = post.tags
    .map((t) => TAG_TO_CATEGORY[t] ?? TAG_TO_CATEGORY[t.toLowerCase()])
    .find(Boolean);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { "@type": "Organization", name: "stronyodzaraz.pl" },
    publisher: { "@type": "Organization", name: "stronyodzaraz.pl" },
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <nav aria-label="Breadcrumb" className="mb-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-brand-700">Strona główna</Link>
        <span className="mx-1.5">/</span>
        <Link href="/blog" className="hover:text-brand-700">Blog</Link>
        <span className="mx-1.5">/</span>
        <span className="text-slate-700">{post.title}</span>
      </nav>
      <p className="text-xs text-slate-500">{new Date(post.publishedAt).toLocaleDateString("pl-PL")} · {post.readMinutes} min czytania</p>
      <h1 className="mt-1 text-3xl font-bold text-slate-900 md:text-4xl">{post.title}</h1>
      <p className="mt-3 text-lg text-slate-600">{post.excerpt}</p>

      {/* Author row */}
      <div className="mt-5 flex items-center gap-3">
        <Avatar size={36} name="stronyodzaraz.pl" variant="beam" colors={["#4f46e5", "#4338ca", "#eef2ff", "#312e81", "#818cf8"]} />
        <div>
          <p className="text-sm font-medium text-slate-900">stronyodzaraz.pl</p>
          <p className="text-xs text-slate-500">Redakcja</p>
        </div>
      </div>

      <div className="mt-8 border-t border-slate-200 pt-6" dangerouslySetInnerHTML={{ __html: renderMarkdown(post.bodyMd) }} />

      <div className="mt-12 rounded-2xl bg-brand-50 p-6 text-center">
        <h2 className="text-lg font-semibold text-slate-900">
          {matchedCat ? `Pakiety — ${matchedCat.title}` : "Pakiety stronyodzaraz.pl"}
        </h2>
        <p className="mt-1 text-sm text-slate-700">
          Stała cena, jasny scope, realizacja 7–14 dni. Wybierz pakiet i opłać online — brief po płatności.
        </p>
        <Link
          href={matchedCat ? `/uslugi/${matchedCat.slug}` : "/uslugi"}
          className="mt-4 inline-flex rounded-lg bg-brand-600 px-5 py-2.5 font-semibold text-white hover:bg-brand-700"
        >
          {matchedCat ? `Zobacz: ${matchedCat.title}` : "Przeglądaj katalog usług"}
        </Link>
      </div>
    </article>
  );
}
