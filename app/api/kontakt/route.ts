import { NextResponse } from "next/server";
import { z } from "zod";
import { rateLimit } from "@/lib/rate-limit";
import { assertSameOriginStrict } from "@/lib/cron-auth";
import { sendContactEmail, sendContactAutoReply } from "@/lib/email";
import { log } from "@/lib/logger";

const schema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  phone: z.string().max(30).optional(),
  projectType: z.string().max(100).optional(),
  budget: z.string().max(50).optional(),
  message: z.string().min(10).max(5000),
});

export async function POST(req: Request) {
  const csrf = assertSameOriginStrict(req);
  if (csrf) return csrf;

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  const rl = rateLimit(`kontakt:${ip}`, 5, 60_000);
  if (!rl.ok) {
    return NextResponse.json({ error: "Zbyt wiele wiadomości. Spróbuj za chwilę." }, { status: 429 });
  }

  try {
    const body = await req.json();
    const data = schema.parse(body);

    await sendContactEmail({
      from: data.email,
      name: data.name,
      phone: data.phone,
      projectType: data.projectType,
      budget: data.budget,
      message: data.message,
    });

    await sendContactAutoReply({ to: data.email, name: data.name }).catch((err) => {
      log.warn("[kontakt] auto-reply failed", { err: String(err) });
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return NextResponse.json({ error: "Nieprawidłowe dane formularza." }, { status: 400 });
    }
    log.error("[kontakt] error", { err: String(err) });
    return NextResponse.json({ error: "Nie udało się wysłać wiadomości." }, { status: 500 });
  }
}
