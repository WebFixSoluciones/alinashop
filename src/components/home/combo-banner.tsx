'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, ArrowRight, CheckCircle2, MessageCircle, Plus } from "lucide-react";

export function ComboBanner() {
  return (
    <section className="w-full py-6">
      <div className="alina-bokeh relative overflow-hidden rounded-[2.5rem] border border-alina-200/90 bg-gradient-to-br from-[#fff2f7] via-[#fff8fb] to-[#fff0f5] p-6 sm:p-8 lg:p-12 shadow-sm">
        {/* Soft decorative ambient glow orbs */}
        <div className="absolute top-0 right-1/4 w-72 h-72 rounded-full bg-pink-200/40 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-10 w-60 h-60 rounded-full bg-amber-100/40 blur-2xl pointer-events-none" />

        <div className="relative z-10 grid items-center gap-8 lg:grid-cols-12 lg:gap-10">
          
          {/* Left Column: Value Proposition & CTAs (7 cols on lg) */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-5">
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

            {/* Checkpoints */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                <span>Medidas exactas y compatibles</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                <span>Descuento al armar tu combo</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                <span>Despacho seguro en un solo paquete</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
                <span>Presentación que fideliza clientes</span>
              </div>
            </div>

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

            {/* 3 Interconnected Cards */}
            <div className="relative flex items-center justify-center gap-2 sm:gap-3 w-full">
              
              {/* Card 1: Toppers Acrílico */}
              <Link
                href="/catalogo?categoria=toppers"
                className="group relative flex flex-col items-center justify-between rounded-2xl border-2 border-white bg-white/95 p-3 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 w-28 sm:w-36 shrink-0"
              >
                <span className="text-[10px] font-bold text-alina-600 bg-alina-50 border border-alina-100 rounded-md px-2 py-0.5 uppercase tracking-wider block mb-1">
                  Topper
                </span>
                <div className="relative size-20 sm:size-24 overflow-hidden rounded-xl bg-slate-50/80 flex items-center justify-center p-1">
                  <Image
                    src="/images/products/toppers/topper-acrilico-espejo-dorado.png"
                    alt="Toppers decorativos para pastel"
                    width={110}
                    height={110}
                    sizes="110px"
                    className="object-contain size-full transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="mt-2 text-center">
                  <p className="text-[11px] font-bold text-slate-800 leading-tight">Acrílico Espejo</p>
                  <span className="text-[10px] text-slate-500 font-semibold">Desde $1.50</span>
                </div>
              </Link>

              {/* Plus Sign 1 */}
              <div className="flex size-7 sm:size-8 items-center justify-center rounded-full bg-alina-600 text-white font-bold text-xs sm:text-sm shadow-md shrink-0 z-10">
                +
              </div>

              {/* Card 2: Center Hero - Cajas de Acetato */}
              <Link
                href="/catalogo?categoria=cajas"
                className="group relative flex flex-col items-center justify-between rounded-2xl border-2 border-alina-300 bg-white p-3.5 shadow-xl hover:shadow-2xl transition-all duration-300 -translate-y-2 sm:-translate-y-3 hover:-translate-y-4 w-32 sm:w-44 shrink-0"
              >
                <span className="text-[10px] font-bold text-white bg-alina-600 rounded-md px-2.5 py-0.5 uppercase tracking-wider block mb-1 shadow-2xs">
                  Más Vendido
                </span>
                <div className="relative size-24 sm:size-28 overflow-hidden rounded-xl bg-slate-50/80 flex items-center justify-center p-1">
                  <Image
                    src="/images/products/cajas/caja-acetato-tapa-transparente.png"
                    alt="Cajas de acetato transparentes"
                    width={130}
                    height={130}
                    sizes="130px"
                    className="object-contain size-full transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="mt-2 text-center">
                  <p className="text-xs font-bold text-slate-900 leading-tight">Caja Acetato Cristal</p>
                  <span className="text-[10px] text-emerald-600 font-bold">Visibilidad 360°</span>
                </div>
              </Link>

              {/* Plus Sign 2 */}
              <div className="flex size-7 sm:size-8 items-center justify-center rounded-full bg-alina-600 text-white font-bold text-xs sm:text-sm shadow-md shrink-0 z-10">
                +
              </div>

              {/* Card 3: Bases MDF con Logo */}
              <Link
                href="/catalogo?categoria=bases-mdf"
                className="group relative flex flex-col items-center justify-between rounded-2xl border-2 border-white bg-white/95 p-3 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 w-28 sm:w-36 shrink-0"
              >
                <span className="text-[10px] font-bold text-alina-600 bg-alina-50 border border-alina-100 rounded-md px-2 py-0.5 uppercase tracking-wider block mb-1">
                  Base MDF
                </span>
                <div className="relative size-20 sm:size-24 overflow-hidden rounded-xl bg-slate-50/80 flex items-center justify-center p-1">
                  <Image
                    src="/images/products/bases-mdf/base-mdf-personalizada-logo.png"
                    alt="Base MDF con grabado de logotipo"
                    width={110}
                    height={110}
                    sizes="110px"
                    className="object-contain size-full transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="mt-2 text-center">
                  <p className="text-[11px] font-bold text-slate-800 leading-tight">+ Grabado Láser</p>
                  <span className="text-[10px] text-slate-500 font-semibold">Desde $0.55</span>
                </div>
              </Link>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

