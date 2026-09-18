'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Sparkles, ArrowRight } from "lucide-react";
import { PopupPromotion } from "@/lib/promotions-store";

export function HomePromotionModal() {
  const [popup, setPopup] = useState<PopupPromotion | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [dontShowToday, setDontShowToday] = useState(false);

  useEffect(() => {
    // Verificar si el usuario ya descartó el pop-up hoy
    const dismissedTimestamp = localStorage.getItem("alina_home_popup_dismissed");
    if (dismissedTimestamp) {
      const now = Date.now();
      const oneDay = 24 * 60 * 60 * 1000;
      if (now - parseInt(dismissedTimestamp, 10) < oneDay) {
        return;
      }
    }

    // Consultar estado de publicidad desde la API
    fetch("/api/admin/promotions")
      .then((res) => res.json())
      .then((data) => {
        if (data.success && data.promotions?.popup?.enabled) {
          setPopup(data.promotions.popup);
          // Retardo suave de 1.2 segundos para no interrumpir la carga inicial
          const timer = setTimeout(() => {
            setIsOpen(true);
          }, 1200);
          return () => clearTimeout(timer);
        }
      })
      .catch(() => {});
  }, []);

  const handleClose = () => {
    if (dontShowToday) {
      localStorage.setItem("alina_home_popup_dismissed", Date.now().toString());
    }
    setIsOpen(false);
  };

  if (!isOpen || !popup) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200 text-center space-y-4 animate-in zoom-in-95 duration-200">
        {/* Botón Cerrar */}
        <button
          onClick={handleClose}
          className="absolute top-3.5 right-3.5 p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-100 transition-colors cursor-pointer"
          aria-label="Cerrar ventana promocional"
        >
          <X className="size-5" />
        </button>

        {/* Badge */}
        {popup.badge && (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-extrabold uppercase tracking-wider text-alina-700 bg-alina-50 border border-alina-200">
            <Sparkles className="size-3 text-alina-600" />
            <span>{popup.badge}</span>
          </div>
        )}

        {/* Imagen del Anuncio */}
        {popup.imageUrl && (
          <div className="relative h-36 sm:h-44 w-full bg-slate-50 rounded-2xl overflow-hidden flex items-center justify-center border border-slate-100 p-2">
            <Image
              src={popup.imageUrl}
              alt={popup.title}
              fill
              className="object-contain p-2 hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        {/* Textos */}
        <div>
          <h2 className="font-display font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight leading-snug">
            {popup.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
            {popup.description}
          </p>
        </div>

        {/* Botón CTA */}
        <div className="pt-2 space-y-3">
          <Link
            href={popup.buttonUrl || "/catalogo"}
            onClick={handleClose}
            className="w-full bg-alina-600 hover:bg-alina-700 text-white font-display font-bold py-3.5 px-5 rounded-2xl text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg active:scale-98"
          >
            <span>{popup.buttonText || "Aprovechar Oferta"}</span>
            <ArrowRight className="size-4" />
          </Link>

          {/* Opción No volver a mostrar */}
          <label className="flex items-center justify-center gap-2 cursor-pointer text-[11px] text-slate-500 hover:text-slate-800 transition-colors select-none">
            <input
              type="checkbox"
              checked={dontShowToday}
              onChange={(e) => setDontShowToday(e.target.checked)}
              className="size-3.5 rounded text-alina-600 focus:ring-alina-500"
            />
            <span>No volver a mostrar hoy</span>
          </label>
        </div>
      </div>
    </div>
  );
}
