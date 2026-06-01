import Link from "next/link";
import { getFeaturedProducts, getFeaturedSectionMeta } from "@/lib/featured-products";

function formatPrice(grosze: number) {
  return (grosze / 100).toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, " ") + " zł";
}

export default function FeaturedProducts() {
  const { sectionTitle, sectionSubtitle } = getFeaturedSectionMeta();
  const items = getFeaturedProducts();

  return (
    <section className="border-y border-slate-200 bg-slate-50 py-14">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-slate-900">{sectionTitle}</h2>
        <p className="mt-2 text-center text-slate-600">{sectionSubtitle}</p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <Link
              key={item.slug}
              href={`/uslugi/${item.category}/${item.slug}`}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-brand-300 hover:shadow-md"
            >
              <p className="font-semibold text-slate-900">{item.cardTitle}</p>
              <p className="mt-1 text-sm text-slate-600">{item.cardLine}</p>
              <p className="mt-3 text-lg font-bold text-brand-700">od {formatPrice(item.priceGrosze)}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
