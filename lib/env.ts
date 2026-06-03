export function siteUrl(): string {
  return process.env.SITE_URL ?? process.env.NEXT_PUBLIC_BASE_URL ?? "https://stronyodzaraz.pl";
}

export function resendFrom(): string {
  return process.env.RESEND_FROM ?? "stronyodzaraz.pl <noreply@stronyodzaraz.pl>";
}

export function contactEmail(): string {
  return process.env.CONTACT_EMAIL ?? "kontakt@bblikh.pl";
}
