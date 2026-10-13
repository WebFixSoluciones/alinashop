'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export function BottomCtaBanner() {
  return (
    <section
      className="relative w-full overflow-hidden border-t border-alina-200/80 bg-gradient-to-br from-[#fff2f7] via-[#fdedf4] to-[#fce4ee] py-14 sm:py-16 lg:py-20"
      aria-label="Personalización y pedidos para pastelería"
    >
      {/* Ambient pink glow orbs matching hero style */}
      <div className="absolute -top-32 -left-32 size-[500px] rounded-full bg-alina-400/20 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-32 size-[600px] -translate-y-1/2 rounded-full bg-alina-300/25 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 left-1/3 size-[400px] rounded-full bg-alina-200/35 blur-3xl pointer-events-none" />

      {/* Main Content Grid matching hero 80% min width */}
      <div className="relative z-10 mx-auto grid w-[90%] min-w-[80%] max-w-[1720px] grid-cols-1 items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-14 lg:px-8">
        
        {/* Left Column: Headline, Copy & Actions (Zero emojis, zero clutter) */}
        <div className="lg:col-span-6 space-y-6">
          <h2 className="max-w-xl text-balance font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-[1.14] text-slate-950 tracking-tight">
            Tu pastelería merece presentaciones que{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-alina-600 via-rose-600 to-amber-600">
              vendan solas.
            </span>
          </h2>

          <p className="mt-4 max-w-xl text-pretty text-sm sm:text-base leading-relaxed text-slate-600">
            Personalizamos tus bases en MDF 3mm con el logotipo de tu marca grabado a láser, fabricamos medidas exactas bajo pedido y enviamos directo a tu taller o domicilio en cualquier provincia del país.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 rounded-xl bg-alina-600 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-alina-600/25 transition-all hover:bg-alina-700 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>Explorar Tienda Virtual</span>
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>

            <a
              href="https://wa.me/593985890956?text=%C2%A1Hola%20Alina%20Shop!%20Quisiera%20asesor%C3%ADa%20para%20un%20pedido%20personalizado%20para%20mi%20pasteler%C3%ADa."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/80 px-5 py-3.5 text-sm font-bold text-slate-800 transition-colors hover:border-emerald-300 hover:text-emerald-700 backdrop-blur-xs shadow-2xs"
            >
              <MessageCircle className="size-4 text-emerald-600 shrink-0" />
              <span>Asesoría por WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Right Column: Clean Vitrina Card matching Hero style */}
        <div className="lg:col-span-6 relative flex items-center justify-center w-full">
          {/* Ambient card aura */}
          <div className="absolute -inset-4 rounded-3xl bg-gradient-to-tr from-alina-400/20 via-pink-300/15 to-amber-200/20 blur-3xl pointer-events-none" />

          {/* Clean Showcase Card */}
          <div className="relative z-10 w-full max-w-md sm:max-w-lg rounded-3xl border border-white/90 bg-white/95 p-4 sm:p-5 shadow-2xl shadow-pink-500/5 backdrop-blur-md transition-all duration-300">
            
            {/* Central Large Product Stage */}
            <div className="relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden rounded-2xl bg-gradient-to-b from-slate-50/80 to-white/60 flex items-center justify-center p-2 border border-slate-100/90 group">
              <Image
                src="/images/products/bases-mdf/base-mdf-personalizada-logo.png"
                alt="Base MDF Personalizada con Grabado Láser"
                fill
                sizes="(max-width: 768px) 90vw, 480px"
                className="object-contain filter drop-shadow-md transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Product Title & Spec */}
            <div className="mt-3.5 px-1">
              <h3 className="font-display text-base sm:text-lg font-bold text-slate-900 leading-tight">
                Bases MDF Personalizadas con Grabado Láser
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 font-medium">
                MDF 3mm de Alta Densidad · Corte Exacto · Logotipo de Marca
              </p>
            </div>

            {/* Dock de 3 productos complementarios */}
            <div className="mt-3.5 pt-3 border-t border-slate-100 grid grid-cols-3 gap-2">
              <Link
                href="/catalogo?categoria=toppers"
                className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:bg-white hover:border-alina-300 hover:shadow-xs transition-all text-left group"
              >
                <div className="relative size-8 sm:size-10 rounded-lg bg-white border border-slate-100 overflow-hidden shrink-0 flex items-center justify-center p-0.5">
                  <Image
                    src="/images/products/toppers/topper-acrilico-espejo-dorado.png"
                    alt="Toppers Acrílico"
                    width={40}
                    height={40}
                    className="object-contain size-full group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="min-w-0 flex-1 pr-0.5">
                  <p className="text-[11px] font-bold text-slate-800 truncate">Toppers</p>
                  <p className="text-[10px] text-slate-500 truncate">Acrílico</p>
                </div>
              </Link>

              <Link
                href="/catalogo?categoria=cajas"
                className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:bg-white hover:border-alina-300 hover:shadow-xs transition-all text-left group"
              >
                <div className="relative size-8 sm:size-10 rounded-lg bg-white border border-slate-100 overflow-hidden shrink-0 flex items-center justify-center p-0.5">
                  <Image
                    src="/images/products/cajas/caja-acetato-tapa-transparente.png"
                    alt="Cajas de Acetato"
                    width={40}
                    height={40}
                    className="object-contain size-full group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="min-w-0 flex-1 pr-0.5">
                  <p className="text-[11px] font-bold text-slate-800 truncate">Cajas</p>
                  <p className="text-[10px] text-slate-500 truncate">Acetato 360°</p>
                </div>
              </Link>

              <Link
                href="/catalogo?categoria=complementos"
                className="flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-xl border border-slate-200/80 bg-slate-50/70 hover:bg-white hover:border-alina-300 hover:shadow-xs transition-all text-left group"
              >
                <div className="relative size-8 sm:size-10 rounded-lg bg-white border border-slate-100 overflow-hidden shrink-0 flex items-center justify-center p-0.5">
                  <Image
                    src="/images/products/complementos/set-boquillas-grandes-manga-pack10.png"
                    alt="Herramientas Pasteleras"
                    width={40}
                    height={40}
                    className="object-contain size-full group-hover:scale-105 transition-transform"
                  />
                </div>
                <div className="min-w-0 flex-1 pr-0.5">
                  <p className="text-[11px] font-bold text-slate-800 truncate">Utensilios</p>
                  <p className="text-[10px] text-slate-500 truncate">Taller</p>
                </div>
              </Link>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
