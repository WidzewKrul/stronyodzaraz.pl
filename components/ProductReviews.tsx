import Avatar from "boring-avatars";
import { Star } from "lucide-react";

const PALETTE = ["#4f46e5", "#4338ca", "#6366f1", "#3730a3", "#818cf8"];

export const PRODUCT_REVIEWS = [
  {
    author: "Anna K.",
    role: "Właścicielka salonu beauty",
    location: "Łódź",
    rating: 5,
    text: "Potrzebowałam strony przed sezonem. Brief wypełniłam wieczorem, tydzień później miałam gotową stronę z rezerwacjami. Zero technicznego stresu.",
  },
  {
    author: "Marcin D.",
    role: "Właściciel warsztatu samochodowego",
    location: "Poznań",
    rating: 5,
    text: "Sklep WooCommerce z P24 i InPost — wszystko skonfigurowane, test zamówienia przeszedł za pierwszym razem. W końcu mogę sprzedawać części online.",
  },
  {
    author: "Ewa N.",
    role: "Restauracja",
    location: "Kraków",
    rating: 5,
    text: "Strona z menu i mapą Google — dokładnie to, czego szukaliśmy. SEO lokalne działa, rezerwacje przez formularz już lecą.",
  },
] as const;

type Props = {
  className?: string;
};

export default function ProductReviews({ className = "" }: Props) {
  return (
    <section className={`border-t border-slate-200 bg-slate-50 ${className}`} aria-label="Opinie klientów">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Co mówią właściciele firm</h2>
            <p className="mt-1 text-sm text-slate-600">
              Fragmenty wiadomości od klientów — imiona i role za zgodą autorów.
            </p>
          </div>
          <p className="max-w-xs text-right text-xs text-slate-500">
            Opinie od klientów z różnych branż — za zgodą na publikację fragmentu wiadomości.
          </p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {PRODUCT_REVIEWS.map((r) => (
            <figure key={r.author} className="flex flex-col rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-3">
                <Avatar size={36} name={r.author} variant="beam" colors={[...PALETTE]} />
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">{r.author}</p>
                  <p className="truncate text-xs text-slate-500">{r.location}</p>
                </div>
              </div>
              <div className="mb-2 flex gap-0.5 text-amber-500" aria-hidden>
                {Array.from({ length: r.rating }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <blockquote className="flex-1 text-sm leading-6 text-slate-700">„{r.text}"</blockquote>
              <figcaption className="mt-3 text-xs text-slate-500">{r.role}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
