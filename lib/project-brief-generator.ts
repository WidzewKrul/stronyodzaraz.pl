import { getUslugaBySlug, type Usluga } from "./uslugi";
import { getCategoryConfig, type CategoryConfig, type FormField } from "./uslugi-config";
import { inferServiceKind } from "./service-kind";

const META_KEYS = new Set(["kategoria", "tytulUslugi", "branch"]);

export function normalizeQuestionnaire(
  raw: Record<string, string>,
  usluga: Usluga,
): Record<string, string> {
  return {
    ...raw,
    kategoria: raw.kategoria || usluga.category,
    tytulUslugi: raw.tytulUslugi || usluga.title,
    branch: raw.branch || usluga.branch || "",
  };
}

function formatFieldValue(field: FormField, value: string): string {
  if (!value.trim()) return "—";
  return value.trim();
}

export function buildBriefMarkdown(
  usluga: Usluga,
  category: CategoryConfig,
  data: Record<string, string>,
): string {
  const kind = inferServiceKind(usluga.title, usluga.slug, usluga.category);
  const price = (usluga.priceGrosze / 100).toFixed(2).replace(".", ",") + " zł";
  const lines: string[] = [
    `# Brief projektu — ${usluga.seoTitle}`,
    "",
    "---",
    "",
    "## Dane zamówienia",
    "",
    `- **Usługa:** ${usluga.title}`,
    `- **Kategoria:** ${category.title}`,
    `- **Pakiet:** ${usluga.seoTitle}`,
    `- **Wartość:** ${price}`,
    `- **Data briefu:** ${new Date().toLocaleDateString("pl-PL")}`,
    `- **Typ usługi:** ${kind}`,
    "",
    "## Dane klienta",
    "",
  ];

  for (const field of category.formFields) {
    const value = formatFieldValue(field, data[field.name] ?? "");
    lines.push(`- **${field.label}:** ${value}`);
  }

  lines.push(
    "",
    "## Zakres pakietu",
    "",
    ...category.whatYouGet.map((item) => `- ${item}`),
    "",
    "## Plan realizacji",
    "",
    ...category.process.map((step, i) => `${i + 1}. **${step.title}** — ${step.body}`),
    "",
    "## Uwagi dla zespołu realizacyjnego",
    "",
    "Brief wygenerowany automatycznie po opłaceniu zamówienia i uzupełnieniu formularza przez klienta.",
    "Skontaktuj się z klientem w ciągu 24h roboczych od otrzymania briefu.",
    "",
    "---",
    "",
    "*stronyodzaraz.pl — Strony i sklepy internetowe od zera*",
  );

  return lines.join("\n");
}

export async function buildPersonalizedDocument(
  productSlug: string,
  questionnaireData: Record<string, string>,
): Promise<{ markdown: string; title: string; fromCache: boolean }> {
  const usluga = getUslugaBySlug(productSlug);
  if (!usluga) throw new Error(`Unknown product: ${productSlug}`);

  const category = getCategoryConfig(usluga.category);
  if (!category) throw new Error(`Unknown category: ${usluga.category}`);

  const data = normalizeQuestionnaire(questionnaireData, usluga);
  const markdown = buildBriefMarkdown(usluga, category, data);

  return {
    markdown,
    title: `Brief projektu — ${data.tytulUslugi || usluga.title}`,
    fromCache: false,
  };
}

export function extractProductSlugFromToolSlug(toolSlug: string): string {
  if (toolSlug.startsWith("uslugi:")) return toolSlug.slice("uslugi:".length);
  return toolSlug;
}

export function questionnaireFromOrder(data: unknown): Record<string, string> {
  if (!data || typeof data !== "object") return {};
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(data as Record<string, unknown>)) {
    if (typeof v === "string") out[k] = v;
  }
  return out;
}

export { META_KEYS };
