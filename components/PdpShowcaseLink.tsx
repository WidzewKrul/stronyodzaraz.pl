import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { getShowcaseSlugForPdp, getWykonaneBySlug } from "@/lib/wykonane-content";

type Props = {
  pdpSlug: string;
  category: string;
};

export default function PdpShowcaseLink({ pdpSlug, category }: Props) {
  const showcaseSlug = getShowcaseSlugForPdp(pdpSlug, category);
  if (!showcaseSlug) return null;

  const showcase = getWykonaneBySlug(showcaseSlug);
  if (!showcase) return null;

  return (
    <Link
      href={`/wykonane/${showcase.slug}`}
      className="mt-4 flex items-center gap-2 rounded-lg border border-brand-200 bg-brand-50 px-3 py-2.5 text-sm font-medium text-brand-800 transition hover:bg-brand-100"
    >
      <LayoutGrid className="h-4 w-4 shrink-0" aria-hidden />
      Zobacz przykład układu — {showcase.fakeBrand}
    </Link>
  );
}
