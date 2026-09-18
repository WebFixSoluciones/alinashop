'use client';

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

export function FloatingWhatsApp() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  // Don't display inside admin dashboard
  if (pathname?.startsWith("/admin")) return null;

  const phoneNumber = "593985890956";
  const defaultMessage = "¡Hola Alina Shop! Quisiera información y asesoría sobre sus productos de repostería y pedidos.";

  const handleClick = () => {
    try {
      fetch("/api/analytics/whatsapp-click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "floating_button",
          path: pathname,
        }),
      }).catch(() => {});
    } catch {}

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2 group">
      {/* Main Floating Trigger Button */}
      <button
        type="button"
        onClick={handleClick}
        aria-label="Contactar por WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_6px_28px_rgba(37,211,102,0.45)] hover:bg-[#20bd5a] hover:scale-105 active:scale-95 transition-all duration-200 group"
      >
        {/* Pulsing ring animation */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping opacity-60 pointer-events-none" />

        {/* WhatsApp Icon */}
        <svg
          className="w-7 h-7 fill-current relative z-10"
          viewBox="0 0 24 24"
        >
          <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.182-.544-1.745-.722-2.883-2.493-2.97-2.609-.087-.116-.708-.942-.708-1.796 0-.855.449-1.277.608-1.45.16-.174.348-.217.464-.217.116 0 .232.001.333.006.107.005.25.04.391.378.145.348.493 1.202.536 1.29.043.087.072.188.014.304-.058.116-.087.188-.174.289l-.261.304c-.087.101-.179.209-.077.384.101.174.45 0.742.966 1.202.664.591 1.224.774 1.398.861.174.087.29.13.333.203.044.072.044.42-.1.825z" />
          <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.178L2 22l4.981-1.398A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm.031 16.666c-1.353 0-2.628-.396-3.714-1.077l-.266-.164-2.766.726.738-2.695-.18-.287A7.625 7.625 0 014.375 12c0-4.223 3.435-7.658 7.656-7.658 4.22 0 7.655 3.435 7.656 7.658 0 4.223-3.435 7.666-7.656 7.666z" />
        </svg>
      </button>
    </div>
  );
}
