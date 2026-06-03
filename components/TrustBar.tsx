import { Code2, Clock, ShieldCheck, Zap } from "lucide-react";

const ITEMS = [
  {
    icon: Code2,
    title: "WordPress · Shopify · Shoper",
    desc: "Sprawdzone platformy z polskimi integracjami",
    iconBg: "bg-violet-100",
    iconColor: "text-violet-700",
  },
  {
    icon: Clock,
    title: "Realizacja 7–14 dni",
    desc: "Jasny termin po uzupełnieniu briefu projektu",
    iconBg: "bg-sky-100",
    iconColor: "text-sky-700",
  },
  {
    icon: ShieldCheck,
    title: "Gwarancja 30 dni",
    desc: "Poprawki w scope pakietu bez dodatkowych kosztów",
    iconBg: "bg-emerald-100",
    iconColor: "text-emerald-700",
  },
  {
    icon: Zap,
    title: "Zamówienie online",
    desc: "Stała cena, płatność Stripe, brief po zakupie",
    iconBg: "bg-orange-100",
    iconColor: "text-orange-700",
  },
] as const;

export default function TrustBar() {
  return (
    <section aria-label="Dlaczego stronyodzaraz.pl" className="border-y border-slate-200 bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-x-6 gap-y-5 px-4 py-8 sm:px-6 md:grid-cols-4">
        {ITEMS.map(({ icon: Icon, title, desc, iconBg, iconColor }) => (
          <div key={title} className="flex items-start gap-3">
            <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBg} shadow-sm`}>
              <Icon className={`h-5 w-5 ${iconColor}`} aria-hidden="true" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">{title}</p>
              <p className="mt-0.5 text-xs leading-5 text-slate-500">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
