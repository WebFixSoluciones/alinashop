'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, MessageCircle, Plus } from "lucide-react";

export function ComboBanner() {
  return (
    <section className="w-full py-4 sm:py-6">
      <div className="alina-bokeh relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-[#fff2f7] via-[#fff8fb] to-[#fff0f5] p-5 sm:p-7 lg:p-8 shadow-sm">
        {/* Soft decorative ambient glow orbs */}
        <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-pink-200/40 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-60 h-60 rounded-full bg-amber-100/40 blur-2xl pointer-events-none" />

        <div className="relative z-10 grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          
          {/* Left Column: Value Proposition & CTAs (7 cols on lg) */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/95 border border-alina-200 px-3.5 py-1.5 text-xs font-bold uppercase tracking-wider text-alina-700 shadow-2xs">
              <Sparkles className="size-3.5 text-amber-500" aria-hidden="true" />
              <span>Kit de Presentación Completa</span>
            </div>

            <h2 className="text-balance font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-950 leading-[1.16] tracking-tight">
              Un bouquet de detalles para que tu torta llegue{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-alina-600 via-pink-600 to-rose-600">
                completa y lista para vender
              </span>.
            </h2>

            <p className="text-pretty text-sm sm:text-base leading-relaxed text-slate-600 max-w-xl">
              Combina tu <strong>base MDF con grabado láser</strong> junto a <strong>toppers en acrílico espejo</strong> y <strong>cajas de acetato cristal</strong>. Todo compatible en medidas, en un solo envío asegurado a tu taller.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-2 rounded-xl bg-alina-600 hover:bg-alina-700 text-white font-bold text-xs sm:text-sm px-5 sm:px-6 py-3.5 shadow-md shadow-alina-600/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Ver ideas para combinar</span>
                <ArrowRight className="size-4" />
              </Link>
              <a
                href="https://wa.me/593985890956?text=¡Hola%20Alina%20Shop!%20Quiero%20asesoría%20para%20armar%20un%20combo%20de%20base%20MDF%20+%20topper%20+%20caja."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 hover:border-emerald-300 font-bold text-xs sm:text-sm px-4 sm:px-5 py-3.5 shadow-2xs transition-colors"
              >
                <MessageCircle className="size-4 text-emerald-600 shrink-0" />
                <span>Cotizar Combo WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: 3-Product Combo Showcase (5 cols on lg) */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-center justify-center">
            
            {/* Combo connector pill */}
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white/95 border border-alina-200 px-3 py-1 text-[11px] font-bold text-alina-700 shadow-2xs mb-4">
              <Plus className="size-3 text-alina-500" />
              <span>Combo 3 en 1 para Pastelerías</span>
            </div>

            {/* 3 Interconnected Cards with reduced padding and expanded images */}
            <div className="relative flex items-center justify-center gap-2 sm:gap-3 w-full">
              
              {/* Card 1: Toppers Acrílico */}
              <Link
                href="/catalogo?categoria=toppers"
                className="group relative flex flex-col items-center rounded-2xl border-2 border-white bg-white/95 p-2 sm:p-2.5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 w-32 sm:w-40 md:w-44 shrink-0"
              >
                <div className="w-full flex items-center justify-between mb-1.5 px-0.5">
                  <span className="text-[10px] font-bold text-alina-600 bg-alina-50 border border-alina-100 rounded-md px-1.5 py-0.5 uppercase tracking-wider">
                    Topper
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold">$1.50</span>
                </div>
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-50 flex items-center justify-center">
                  <Image
                    src="/images/products/toppers/topper-acrilico-espejo-dorado.png"
                    alt="Toppers decorativos para pastel"
                    fill
                    sizes="(max-width: 768px) 30vw, 180px"
                    className="object-cover transition-transform duration-300 group-hover:scale-108"
                  />
                </div>
                <p className="mt-2 text-xs font-bold text-slate-800 leading-tight text-center truncate w-full">
                  Acrílico Espejo
                </p>
              </Link>

              {/* Plus Sign 1 */}
              <div className="flex size-7 sm:size-8 items-center justify-center rounded-full bg-alina-600 text-white font-bold text-xs sm:text-sm shadow-md shrink-0 z-30">
                +
              </div>

              {/* Card 2: Center Hero - Cajas de Acetato */}
              <Link
                href="/catalogo?categoria=cajas"
                className="group relative flex flex-col items-center rounded-2xl border-2 border-alina-300 bg-white p-2 sm:p-2.5 shadow-xl hover:shadow-2xl transition-all duration-300 -translate-y-2 sm:-translate-y-3 hover:-translate-y-4 w-36 sm:w-48 md:w-52 shrink-0 z-20"
              >
                <div className="w-full flex items-center justify-between mb-1.5 px-0.5">
                  <span className="text-[10px] font-bold text-white bg-alina-600 rounded-md px-2 py-0.5 uppercase tracking-wider shadow-2xs">
                    Más Vendido
                  </span>
                  <span className="text-[10px] text-emerald-600 font-bold">Visor 360°</span>
                </div>
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-50 flex items-center justify-center">
                  <Image
                    src="/images/products/cajas/caja-acetato-tapa-transparente.png"
                    alt="Cajas de acetato transparentes"
                    fill
                    sizes="(max-width: 768px) 35vw, 210px"
                    className="object-cover transition-transform duration-300 group-hover:scale-108"
                  />
                </div>
                <p className="mt-2 text-xs sm:text-sm font-bold text-slate-900 leading-tight text-center truncate w-full">
                  Caja Acetato Cristal
                </p>
              </Link>

              {/* Plus Sign 2 */}
              <div className="flex size-7 sm:size-8 items-center justify-center rounded-full bg-alina-600 text-white font-bold text-xs sm:text-sm shadow-md shrink-0 z-30">
                +
              </div>

              {/* Card 3: Bases MDF con Logo */}
              <Link
                href="/catalogo?categoria=bases-mdf"
                className="group relative flex flex-col items-center rounded-2xl border-2 border-white bg-white/95 p-2 sm:p-2.5 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 w-32 sm:w-40 md:w-44 shrink-0"
              >
                <div className="w-full flex items-center justify-between mb-1.5 px-0.5">
                  <span className="text-[10px] font-bold text-alina-600 bg-alina-50 border border-alina-100 rounded-md px-1.5 py-0.5 uppercase tracking-wider">
                    Base MDF
                  </span>
                  <span className="text-[10px] text-slate-500 font-semibold">$0.55</span>
                </div>
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-slate-50 flex items-center justify-center">
                  <Image
                    src="/images/products/bases-mdf/base-mdf-hero-muestrario.png"
                    alt="Bases de torta MDF con corte láser"
                    fill
                    sizes="(max-width: 768px) 30vw, 180px"
                    className="object-cover transition-transform duration-300 group-hover:scale-108"
                  />
                </div>
                <p className="mt-2 text-xs font-bold text-slate-800 leading-tight text-center truncate w-full">
                  + Grabado Láser
                </p>
              </Link>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

