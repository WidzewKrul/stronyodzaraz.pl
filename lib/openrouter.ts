import { siteUrl } from "./env";

const ENDPOINT = "https://openrouter.ai/api/v1/chat/completions";

export type Msg = { role: "system" | "user" | "assistant"; content: string };

export async function generateWithOpenRouter(messages: Msg[], opts?: {
  model?: string;
  temperature?: number;
  maxTokens?: number;
}): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY is not configured");
  const model = opts?.model ?? process.env.OPENROUTER_MODEL ?? "deepseek/deepseek-chat";
  const base = siteUrl();

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": base,
      "X-Title": "stronyodzaraz.pl",
    },
    signal: AbortSignal.timeout(90_000),
    body: JSON.stringify({
      model,
      temperature: opts?.temperature ?? 0.4,
      max_tokens: opts?.maxTokens ?? 6000,
      messages,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenRouter error ${res.status}: ${text}`);
  }

  const data = (await res.json()) as {
    choices: { message: { content: string } }[];
  };
  return data.choices?.[0]?.message?.content ?? "";
}

/**
 * Extracts text/description from an image using a vision-capable model (Gemini Flash).
 * Used for image file uploads in tool questionnaires.
 */
export async function extractImageTextWithVision(
  imageBuffer: Buffer,
  mimeType: string,
  fileName: string,
): Promise<string> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY is not configured");
  const base = siteUrl();

  const base64 = imageBuffer.toString("base64");
  const dataUrl = `data:${mimeType};base64,${base64}`;

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": base,
      "X-Title": "stronyodzaraz.pl",
    },
    signal: AbortSignal.timeout(90_000),
    body: JSON.stringify({
      model: "google/gemini-2.0-flash-001",
      temperature: 0.1,
      max_tokens: 4000,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "image_url",
              image_url: { url: dataUrl },
            },
            {
              type: "text",
              text: `Przeanalizuj to zdjęcie lub dokument graficzny o nazwie "${fileName}". Wyciągnij CAŁĄ widoczną treść tekstową. Jeśli to dokument (faktura, umowa, tabela, potwierdzenie przelewu) — przepisz dokładnie wszystkie liczby, daty, nazwy, kwoty. Jeśli to zdjęcie z realizacji projektu — szczegółowo opisz co widać: sprzęt, oznaczenia, lokalizację, stan. Odpowiedz w tym samym języku co treść dokumentu, domyślnie po polsku.`,
            },
          ],
        },
      ],
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`OpenRouter vision error ${res.status}: ${text}`);
  }

  const data = (await res.json()) as {
    choices: { message: { content: string } }[];
  };
  return data.choices?.[0]?.message?.content ?? "";
}

/**
 * Generates one or more images via OpenRouter image-capable model.
 * Returns array of base64-encoded images (no data URL prefix) plus mime type.
 *
 * Model: `google/gemini-2.5-flash-image`.
 */
export async function generateImagesWithOpenRouter(params: {
  prompt: string;
  count?: number;
  model?: string;
}): Promise<{ base64: string; mimeType: string }[]> {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) throw new Error("OPENROUTER_API_KEY is not configured");
  const base = siteUrl();
  const model = params.model ?? "google/gemini-2.5-flash-image";
  const count = Math.max(1, Math.min(params.count ?? 1, 4));

  const tasks = Array.from({ length: count }, async () => {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": base,
        "X-Title": "stronyodzaraz.pl",
      },
      signal: AbortSignal.timeout(120_000),
      body: JSON.stringify({
        model,
        modalities: ["image", "text"],
        messages: [{ role: "user", content: params.prompt }],
      }),
    });

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`OpenRouter image error ${res.status}: ${text}`);
    }

    type ImageEntry = { image_url?: { url?: string } | string; type?: string };
    type Choice = {
      message?: {
        content?: string | ImageEntry[];
        images?: ImageEntry[];
      };
    };
    const data = (await res.json()) as { choices?: Choice[] };

    const choice = data.choices?.[0]?.message;
    const candidates: ImageEntry[] = [];
    if (Array.isArray(choice?.images)) candidates.push(...choice.images);
    if (Array.isArray(choice?.content)) candidates.push(...choice.content);

    for (const c of candidates) {
      const url = typeof c.image_url === "string" ? c.image_url : c.image_url?.url;
      if (typeof url === "string" && url.startsWith("data:")) {
        const match = /^data:([^;]+);base64,(.+)$/.exec(url);
        if (match) return { mimeType: match[1], base64: match[2] };
      }
      if (typeof url === "string" && url.startsWith("https://")) {
        // Only follow https URLs, with a timeout — avoids hanging on a slow host and
        // narrows the SSRF surface (no http:// to internal services / metadata IPs).
        const r = await fetch(url, { signal: AbortSignal.timeout(15_000) });
        const buf = Buffer.from(await r.arrayBuffer());
        const mime = r.headers.get("content-type") ?? "image/png";
        return { mimeType: mime, base64: buf.toString("base64") };
      }
    }
    throw new Error("OpenRouter image response did not contain image data");
  });

  return Promise.all(tasks);
}
