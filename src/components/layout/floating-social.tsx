'use client';

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Phone, X, MessageCircle, ChevronUp, ChevronDown } from "lucide-react";

export function FloatingSocial() {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  // Don't show in admin dashboard
  if (pathname?.startsWith("/admin")) return null;

  const whatsappPhone = "593985890956";
  const defaultMessage = "¡Hola Alina Shop! Quisiera información y asesoría sobre sus productos de repostería y pedidos.";

  const handleWhatsAppClick = () => {
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

    const url = `https://wa.me/${whatsappPhone}?text=${encodeURIComponent(defaultMessage)}`;
    window.open(url, "_blank");
  };

  return (
    <aside aria-label="Canales de atención y redes sociales" className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Floating Welcome Message Card */}
      {tooltipOpen && !isExpanded && (
        <div className="relative flex items-center gap-3 bg-white/95 backdrop-blur-md border border-alina-200 shadow-xl rounded-2xl p-3.5 pr-8 max-w-xs animate-in fade-in slide-in-from-bottom-2 duration-300">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setTooltipOpen(false);
            }}
            className="absolute top-2 right-2 text-slate-400 hover:text-slate-600 p-0.5 rounded-full transition-colors"
            title="Cerrar"
            aria-label="Cerrar mensaje"
          >
            <X className="w-3.5 h-3.5" />
          </button>
          <div className="w-9 h-9 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5 text-emerald-600" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.182-.544-1.745-.722-2.883-2.493-2.97-2.609-.087-.116-.708-.942-.708-1.796 0-.855.449-1.277.608-1.45.16-.174.348-.217.464-.217.116 0 .232.001.333.006.107.005.25.04.391.378.145.348.493 1.202.536 1.29.043.087.072.188.014.304-.058.116-.087.188-.174.289l-.261.304c-.087.101-.179.209-.077.384.101.174.45 0.742.966 1.202.664.591 1.224.774 1.398.861.174.087.275.072.377-.044.101-.116.435-.506.551-.68.116-.174.232-.145.391-.087.16.058 1.014.478 1.188.565.174.087.29.13.333.203.044.072.044.42-.1.825z" />
            </svg>
          </div>
          <div className="text-xs">
            <p className="font-bold text-slate-900">¿Asesoría o pedidos?</p>
            <p className="text-slate-500 text-[11px] leading-tight">
              Escríbenos o síguenos en redes sociales.
            </p>
          </div>
        </div>
      )}

      {/* Expanded Social Channels */}
      <div
        className={`flex flex-col items-end gap-2.5 transition-all duration-300 ${
          isExpanded ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-4 pointer-events-none hidden"
        }`}
      >
        {/* TikTok */}
        <a
          href="https://tiktok.com/@alinashop.ec"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 bg-slate-950 text-white px-3 py-2 rounded-full shadow-lg hover:bg-slate-800 transition-all hover:scale-105 group text-xs font-semibold"
          title="Síguenos en TikTok"
        >
          <span className="hidden sm:inline text-[11px] pl-1 font-medium">TikTok @alinashop.ec</span>
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
            </svg>
          </div>
        </a>

        {/* Instagram */}
        <a
          href="https://instagram.com/alinashop.ec"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 bg-gradient-to-r from-[#f09433] via-[#dc2743] to-[#bc1888] text-white px-3 py-2 rounded-full shadow-lg hover:opacity-95 transition-all hover:scale-105 group text-xs font-semibold"
          title="Síguenos en Instagram"
        >
          <span className="hidden sm:inline text-[11px] pl-1 font-medium">Instagram @alinashop.ec</span>
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </div>
        </a>

        {/* Llamada Telefónica */}
        <a
          href="tel:0985890956"
          className="flex items-center gap-2.5 bg-slate-900 text-white px-3 py-2 rounded-full shadow-lg hover:bg-slate-800 transition-all hover:scale-105 group text-xs font-semibold"
          title="Llamar a taller"
        >
          <span className="hidden sm:inline text-[11px] pl-1 font-medium">Llamar: 0985890956</span>
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
            <Phone className="w-4 h-4 text-emerald-400" />
          </div>
        </a>
      </div>

      {/* Main Buttons Row: Toggle Channels + WhatsApp Pulse */}
      <div className="flex items-center gap-2">
        {/* Toggle More Social Channels */}
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-center w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-700 shadow-md hover:bg-slate-50 transition-all hover:scale-105"
          title={isExpanded ? "Ocultar redes" : "Ver redes sociales"}
          aria-label={isExpanded ? "Ocultar redes" : "Ver redes sociales"}
        >
          {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </button>

        {/* Primary WhatsApp Floating Button */}
        <button
          type="button"
          onClick={handleWhatsAppClick}
          aria-label="Escribir por WhatsApp"
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-[0_6px_28px_rgba(37,211,102,0.45)] hover:bg-[#20bd5a] hover:scale-105 active:scale-95 transition-all duration-200"
        >
          {/* Animated ping ring */}
          <span className="absolute -inset-1 rounded-full bg-[#25D366]/40 animate-ping opacity-60 pointer-events-none" />

          {/* WhatsApp SVG Icon */}
          <svg className="w-7 h-7 fill-current relative z-10" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.182-.544-1.745-.722-2.883-2.493-2.97-2.609-.087-.116-.708-.942-.708-1.796 0-.855.449-1.277.608-1.45.16-.174.348-.217.464-.217.116 0 .232.001.333.006.107.005.25.04.391.378.145.348.493 1.202.536 1.29.043.087.072.188.014.304-.058.116-.087.188-.174.289l-.261.304c-.087.101-.179.209-.077.384.101.174.45 0.742.966 1.202.664.591 1.224.774 1.398.861.174.087.275.072.377-.044.101-.116.435-.506.551-.68.116-.174.232-.145.391-.087.16.058 1.014.478 1.188.565.174.087.29.13.333.203.044.072.044.42-.1.825z" />
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.891.524 3.662 1.435 5.178L2 22l4.981-1.398A9.957 9.957 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm.031 16.666c-1.353 0-2.628-.396-3.714-1.077l-.266-.164-2.766.726.738-2.695-.18-.287A7.625 7.625 0 014.375 12c0-4.223 3.435-7.658 7.656-7.658 4.22 0 7.655 3.435 7.656 7.658 0 4.223-3.435 7.666-7.656 7.666z" />
          </svg>

          {/* Active online dot */}
          <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-rose-500 border-2 border-white rounded-full flex items-center justify-center text-[9px] font-bold">
            1
          </span>
        </button>
      </div>
    </aside>
  );
}
