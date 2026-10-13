'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";

export function BottomCtaBanner() {
  return (
    <section
      className="relative w-full overflow-hidden border-t border-alina-200/80 bg-gradient-to-br from-[#fff2f7] via-[#fdedf4] to-[#fce4ee] py-10 sm:py-12 lg:py-14"
      aria-label="Personalización y pedidos para pastelería"
    >
      {/* Background Image Layer with authentic product atmosphere */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/slider/bg-bases.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center opacity-20 mix-blend-multiply pointer-events-none"
        />
        {/* Soft rosy gradient masks ensuring high text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#fff2f7] via-[#fff2f7]/80 to-[#fff2f7] pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fce4ee]/80 via-transparent to-[#fff2f7]/80 pointer-events-none" />
      </div>

      {/* Ambient pink glow orbs */}
      <div className="absolute -top-24 left-1/4 size-[400px] rounded-full bg-alina-400/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 right-1/4 size-[400px] rounded-full bg-alina-300/25 blur-3xl pointer-events-none" />

      {/* Centered Slim Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 sm:px-6 text-center flex flex-col items-center space-y-4">
        <h2 className="text-balance font-display text-2xl sm:text-3xl lg:text-4xl font-bold leading-[1.18] text-slate-950 tracking-tight">
          Tu pastelería merece presentaciones que{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-alina-600 via-rose-600 to-amber-600">
            vendan solas.
          </span>
        </h2>

        <p className="max-w-2xl text-pretty text-sm sm:text-base leading-relaxed text-slate-700">
          Personalizamos tus bases en MDF 3mm con el logotipo de tu marca grabado a láser, fabricamos medidas exactas bajo pedido y enviamos directo a tu taller o domicilio en cualquier provincia del país.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
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
            className="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white/90 px-5 py-3.5 text-sm font-bold text-slate-800 transition-colors hover:border-emerald-400 hover:text-emerald-700 backdrop-blur-xs shadow-2xs"
          >
            <MessageCircle className="size-4 text-emerald-600 shrink-0" />
            <span>Asesoría por WhatsApp</span>
          </a>
        </div>
      </div>
    </section>
  );
}
