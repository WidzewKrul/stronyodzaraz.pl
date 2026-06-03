import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import HeroBanner from "@/components/HeroBanner";
import Breadcrumbs from "@/components/Breadcrumbs";
import KontaktForm from "./KontaktForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Skontaktuj się ze stronyodzaraz.pl — strony WordPress, sklepy internetowe, opieka techniczna. Odpowiadamy w 24h.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  return (
    <>
      <HeroBanner
        variant="category"
        icon={MessageCircle}
        badge="Odpowiadamy w 24h robocze"
        title="Kontakt"
        subtitle="Masz pytanie o pakiet, chcesz dopasować scope do budżetu albo po prostu porozmawiać — napisz do nas."
        compact
      />
      <Breadcrumbs items={[{ label: "Kontakt" }]} />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        <KontaktForm />
      </div>
    </>
  );
}
