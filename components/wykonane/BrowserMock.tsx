import type { BrowserMockData } from "@/lib/wykonane-content";
import { LucideByName } from "./LucideByName";

type Props = { data: BrowserMockData; compact?: boolean };

function SectionBody({ section }: { section: Record<string, unknown> }) {
  const type = section.type as string;

  if (type === "menu-highlights" || type === "price-list") {
    const items = section.items as Array<{ name: string; price: string }>;
    return (
      <div className="rounded-lg border border-white/20 bg-white/10 p-3">
        {section.title ? <p className="mb-2 text-xs font-semibold text-white/90">{String(section.title)}</p> : null}
        <ul className="space-y-1.5">
          {items.map((item) => (
            <li key={item.name} className="flex justify-between text-[11px] text-white/85">
              <span>{item.name}</span>
              <span className="font-medium">{item.price}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (type === "services-grid") {
    const items = section.items as Array<{ name: string; desc?: string }>;
    return (
      <div>
        {section.title ? <p className="mb-2 text-xs font-semibold text-white/90">{String(section.title)}</p> : null}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {items.map((item) => (
            <div key={item.name} className="rounded-lg bg-white/10 p-2 text-center">
              <p className="text-[11px] font-semibold text-white">{item.name}</p>
              {item.desc ? <p className="mt-0.5 text-[10px] text-white/70">{item.desc}</p> : null}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "product-grid") {
    const products = section.products as Array<{ name: string; price: string; badge?: string | null }>;
    return (
      <div>
        {section.title ? <p className="mb-2 text-xs font-semibold text-white/90">{String(section.title)}</p> : null}
        <div className="grid grid-cols-3 gap-2">
          {products.map((p) => (
            <div key={p.name} className="rounded-lg bg-white/95 p-2 text-slate-800 shadow-sm">
              <div className="mb-2 aspect-[4/3] rounded bg-slate-100" />
              <p className="truncate text-[10px] font-medium">{p.name}</p>
              <p className="text-[10px] font-bold text-brand-700">{p.price}</p>
              {p.badge ? (
                <span className="mt-1 inline-block rounded bg-amber-100 px-1 text-[9px] text-amber-800">{p.badge}</span>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "category-chips" || type === "filter-chips") {
    const items = section.items as string[];
    return (
      <div className="flex flex-wrap gap-1.5">
        {items.map((item) => (
          <span key={item} className="rounded-full bg-white/20 px-2 py-0.5 text-[10px] text-white">
            {item}
          </span>
        ))}
      </div>
    );
  }

  if (type === "info-bar" || type === "trust-bar") {
    const items = section.items as Array<{ icon?: string; text: string } | string>;
    return (
      <div className="flex flex-wrap gap-3 text-[10px] text-white/85">
        {items.map((item, i) => {
          const text = typeof item === "string" ? item : item.text;
          const icon = typeof item === "string" ? undefined : item.icon;
          return (
            <span key={i} className="inline-flex items-center gap-1">
              {icon ? <LucideByName name={icon} className="h-3 w-3" /> : null}
              {text}
            </span>
          );
        })}
      </div>
    );
  }

  if (type === "icon-grid") {
    const items = section.items as string[];
    return (
      <div className="grid grid-cols-4 gap-2">
        {items.map((item) => (
          <div key={item} className="rounded-lg bg-white/10 p-2 text-center text-[10px] text-white">
            {item}
          </div>
        ))}
      </div>
    );
  }

  if (type === "team") {
    const members = section.members as Array<{ name: string; role: string; initials: string }>;
    return (
      <div className="flex gap-3">
        {members.map((m) => (
          <div key={m.name} className="flex items-center gap-2 rounded-lg bg-white/10 p-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/25 text-xs font-bold text-white">
              {m.initials}
            </span>
            <div>
              <p className="text-[10px] font-semibold text-white">{m.name}</p>
              <p className="text-[9px] text-white/70">{m.role}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === "room-cards") {
    const items = section.items as Array<{ name: string; price: string }>;
    return (
      <div className="grid grid-cols-3 gap-2">
        {items.map((item) => (
          <div key={item.name} className="rounded-lg bg-white/10 p-2 text-center">
            <div className="mb-1 aspect-video rounded bg-white/20" />
            <p className="text-[10px] font-semibold text-white">{item.name}</p>
            <p className="text-[9px] text-white/80">{item.price}</p>
          </div>
        ))}
      </div>
    );
  }

  if (type === "payment-badges" || type === "badge" || type === "banner") {
    const text = type === "banner" ? String(section.text) : (section.items as string[] | undefined)?.join(" · ") ?? String(section.text ?? "");
    return (
      <p className="rounded-lg bg-white/15 px-3 py-2 text-center text-[10px] font-medium text-white">{text}</p>
    );
  }

  if (type === "form-teaser") {
    const fields = section.fields as string[];
    return (
      <div className="rounded-lg border border-dashed border-white/30 bg-white/5 p-3">
        <p className="mb-2 text-xs font-semibold text-white">{String(section.title)}</p>
        <div className="space-y-1.5">
          {fields.map((f) => (
            <div key={f} className="h-6 rounded bg-white/20 text-[9px] leading-6 text-white/60 pl-2">
              {f}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === "gallery-grid") {
    const count = (section.placeholderCount as number) ?? 3;
    return (
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="aspect-[4/3] rounded-lg bg-white/20" />
        ))}
      </div>
    );
  }

  if (type === "bullet-list") {
    const items = section.items as string[];
    return (
      <ul className="list-disc space-y-1 pl-4 text-[10px] text-white/85">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    );
  }

  return null;
}

export default function BrowserMock({ data, compact }: Props) {
  return (
    <div className={`overflow-hidden rounded-xl border border-slate-200 shadow-lg ${compact ? "text-[10px]" : ""}`}>
      <div className="flex items-center gap-1.5 border-b border-slate-200 bg-slate-100 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-rose-400" />
        <span className="h-2 w-2 rounded-full bg-amber-400" />
        <span className="h-2 w-2 rounded-full bg-emerald-400" />
        <span className="ml-2 truncate text-[10px] text-slate-500">{data.browserUrl}</span>
      </div>
      <div className={`bg-gradient-to-br ${data.gradient} ${compact ? "p-3" : "p-4 sm:p-5"}`}>
        <div className="mb-3 flex flex-wrap items-center justify-between gap-2 border-b border-white/15 pb-2">
          <div className="flex items-center gap-2">
            {data.icon ? <LucideByName name={data.icon} className="h-4 w-4 text-white" /> : null}
            <span className="text-xs font-bold text-white">{data.fakeBrand}</span>
          </div>
          <div className="hidden gap-2 sm:flex">
            {data.nav.slice(0, 4).map((n) => (
              <span key={n} className="text-[10px] text-white/75">
                {n}
              </span>
            ))}
          </div>
        </div>
        <div className={compact ? "space-y-2" : "space-y-4"}>
          <div>
            <h3 className={`font-bold text-white ${compact ? "text-sm" : "text-lg"}`}>{data.hero.headline}</h3>
            <p className="mt-1 text-[11px] text-white/85">{data.hero.subline}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              <span className="rounded-md bg-white px-2 py-1 text-[10px] font-semibold text-slate-900">
                {data.hero.ctaPrimary}
              </span>
              {data.hero.ctaSecondary ? (
                <span className="rounded-md border border-white/40 px-2 py-1 text-[10px] text-white">
                  {data.hero.ctaSecondary}
                </span>
              ) : null}
            </div>
          </div>
          {data.sections.map((section, i) => (
            <SectionBody key={i} section={section} />
          ))}
        </div>
      </div>
    </div>
  );
}
