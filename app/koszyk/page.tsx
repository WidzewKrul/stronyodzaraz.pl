import type { Metadata } from "next";
import CartPage from "./CartPage";

export const metadata: Metadata = {
  title: "Koszyk — stronyodzaraz.pl",
  robots: { index: false, follow: false },
};

export default function KoszykPage() {
  return <CartPage />;
}
