import {
  buildUnifiedSeoTitle,
  buildUnifiedShortDesc,
  verticalFromCategory,
  type ServiceVertical,
} from "./complete-kit";
import { extractBranch } from "./catalog-curation";

export type SeoProductInput = {
  title: string;
  category: string;
  branch?: string;
  slug: string;
  tags?: string[];
};

export function buildSeoTitle(rawTitle: string, category = "strony-internetowe"): string {
  const branch = extractBranch({ title: rawTitle, branch: undefined });
  return buildUnifiedSeoTitle(branch, verticalFromCategory(category));
}

export function buildSeoShortDesc(pismo: SeoProductInput): string {
  const branch = extractBranch(pismo);
  const vertical = verticalFromCategory(pismo.category);
  return buildUnifiedShortDesc(branch, vertical);
}

export function truncateSeoTitle(title: string, maxLen = 72): string {
  if (title.length <= maxLen) return title;
  const em = title.indexOf(" — ");
  if (em > 20 && em <= maxLen) return title.slice(0, em) + "…";
  const cut = title.slice(0, maxLen - 1);
  const lastSpace = cut.lastIndexOf(" ");
  return (lastSpace > 40 ? cut.slice(0, lastSpace) : cut).trimEnd() + "…";
}
