'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Gift, ArrowRight } from "lucide-react";

export function ComboBanner() {
  return (
    <section className="w-full py-6">
      <div className="alina-bokeh relative overflow-hidden rounded-[2.5rem] border border-alina-200/90 bg-[#fff2f7] p-6 sm:p-8 lg:p-10 shadow-sm">
        {/* Decorative soft blurred background circles */}
        <div className="absolute top-4 right-1/4 w-28 h-28 rounded-full bg-white/40 blur-xl pointer-events-none" />
        <div className="absolute bottom-3 right-12 w-20 h-20 rounded-full bg-white/50 blur-lg pointer-events-none" />

        <div className="relative z-10 grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          {/* Left Text and CTA */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/90 border border-alina-200 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-alina-700 shadow-2xs">
              <Gift className="size-3.5 text-alina-600" aria-hidden="true" />
              <span>Completa tu pedido</span>
            </div>

            <h2 className="mt-4 text-balance font-display text-2xl font-extrabold text-slate-950 sm:text-3xl lg:text-4xl leading-tight">
              Un bouquet de detalles para que tu torta llegue completa.
            </h2>

            <p className="mt-3 text-pretty text-sm sm:text-base leading-relaxed text-slate-600">
              Combina esta pieza con toppers, cajas y complementos reales de la tienda virtual Alina Shop.
            </p>

            <Link
              href="/catalogo"
              className="mt-6 inline-flex items-center gap-2 text-sm sm:text-base font-bold text-alina-700 hover:text-alina-900 transition-colors group"
            >
              <span>Ver ideas para combinar</span>
              <span className="w-7 h-7 rounded-full bg-white/90 border border-alina-200 flex items-center justify-center text-alina-600 shadow-xs group-hover:translate-x-1 transition-transform">
                <ArrowRight className="size-3.5" aria-hidden="true" />
              </span>
            </Link>
          </div>

          {/* Right Floating Product Cards matching screenshot */}
          <div className="flex items-center justify-center gap-3 sm:gap-4 shrink-0">
            <div className="relative overflow-hidden rounded-2xl border-4 border-white bg-white shadow-md hover:shadow-xl transition-shadow">
              <Image
                src="/images/products/toppers/topper-acrilico-espejo-dorado.png"
                alt="Toppers decorativos para pastel"
                width={140}
                height={140}
                sizes="140px"
                className="size-24 sm:size-28 md:size-32 object-contain p-2"
              />
            </div>

            <div className="relative overflow-hidden rounded-2xl border-4 border-white bg-white shadow-xl hover:shadow-2xl transition-shadow -translate-y-2 sm:-translate-y-3">
              <Image
                src="/images/products/cajas/caja-acetato-tapa-transparente.png"
                alt="Cajas de acetato transparentes"
                width={150}
                height={150}
                sizes="150px"
                className="size-26 sm:size-32 md:size-36 object-contain p-2"
              />
            </div>

            <div className="relative overflow-hidden rounded-2xl border-4 border-white bg-white shadow-md hover:shadow-xl transition-shadow">
              <Image
                src="/images/products/complementos/set-boquillas-grandes-manga-pack10.png"
                alt="Complementos y utensilios de repostería"
                width={140}
                height={140}
                sizes="140px"
                className="size-24 sm:size-28 md:size-32 object-contain p-2"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
