"use client";

import { useEffect, useState } from "react";
import { useCart } from "@/components/CartProvider";

type Props = { orderId?: string; sessionId?: string; tool?: string };

export default function ClearCart({ orderId, sessionId, tool }: Props) {
  const [status, setStatus] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  useEffect(() => {
    if (!orderId) return;
    let stopped = false;
    const qs = new URLSearchParams({ order: orderId });
    if (sessionId) qs.set("session_id", sessionId);
    if (tool) qs.set("tool", tool);

    async function tick() {
      try {
        const res = await fetch(`/api/orders/status?${qs.toString()}`);
        if (res.ok) {
          const data = await res.json();
          if (!stopped) {
            setStatus(data.status);
            setErrorMsg(data.error ?? null);
          }
        }
      } catch { }
    }

    tick();
    const id = setInterval(tick, 4000);
    return () => { stopped = true; clearInterval(id); };
  }, [orderId, sessionId, tool]);

  if (!status) return null;
  if (status === "PENDING" || status === "PAID") {
    return (
      <p className="mt-4 text-xs text-slate-500" aria-live="polite">
        Potwierdzamy płatność — za chwilę wyślemy link do briefu na e-mail.
      </p>
    );
  }
  if (status === "FILLED" || status === "GENERATING") {
    return (
      <p className="mt-4 text-xs text-slate-500" aria-live="polite">
        Przetwarzamy zamówienie — odśwież stronę lub sprawdź e-mail.
      </p>
    );
  }
  if (status === "COMPLETED") {
    return (
      <p className="mt-4 text-xs text-brand-700" aria-live="polite">
        Potwierdzenie i link do briefu zostały wysłane na Twój e-mail.
      </p>
    );
  }
  if (status === "FAILED") {
    return (
      <p className="mt-4 text-xs text-red-600" aria-live="polite">
        Wystąpił problem z obsługą zamówienia.
        {errorMsg ? ` (${errorMsg})` : ""} Napisz na kontakt@bblikh.pl — pomożemy.
      </p>
    );
  }
  return null;
}
