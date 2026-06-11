import { describe, it, expect } from "vitest";
import { redactPII } from "@/lib/logger";
import { slugify } from "@/lib/slug";

describe("redactPII", () => {
  it("masks postgres credentials in connection strings", () => {
    const out = redactPII("postgres://user:secretpass@db.host:5432/app");
    expect(out).not.toContain("secretpass");
    expect(out).toContain("***");
  });

  it("masks bearer tokens and api keys", () => {
    expect(redactPII("Authorization: Bearer abc123DEF456")).not.toContain("abc123DEF456");
    expect(redactPII("api_key=sk_live_1234567890abcdef")).toContain("***");
  });

  it("masks Stripe and Resend keys", () => {
    expect(redactPII("sk_live_51HxYz1234567890abcdef")).toContain("***REDACTED***");
    expect(redactPII("re_1234567890abcdefghijklmno")).toContain("***REDACTED***");
  });

  it("masks the local part of email addresses", () => {
    const out = redactPII("kontakt klienta: jan.kowalski@example.com");
    expect(out).not.toContain("jan.kowalski@example.com");
    expect(out).toContain("@example.com");
  });

  it("is a no-op for empty input", () => {
    expect(redactPII("")).toBe("");
  });
});

describe("slugify", () => {
  it("strips Polish diacritics and lowercases", () => {
    expect(slugify("Strona Łódź Ąćę")).toBe("strona-lodz-ace");
  });

  it("collapses separators and trims", () => {
    expect(slugify("  Hello --- World!!  ")).toBe("hello-world");
  });
});
