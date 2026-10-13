'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProductGrid } from "@/components/catalog/product-grid";
import { QuickViewModal } from "@/components/catalog/quick-view-modal";
import { HeroSlider } from "@/components/home/hero-slider";
import { ComboBanner } from "@/components/home/combo-banner";
import { BottomCtaBanner } from "@/components/home/bottom-cta-banner";
import { CATEGORIES_DATA, PRODUCTS_DATA } from "@/lib/catalog-data";
import { ArrowRight, BadgePercent, Store, Sparkles, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { HomePromotionModal } from "@/components/home/home-promotion-modal";

export default function HomePage() {
  const featuredProducts = PRODUCTS_DATA.slice(0, 10);

  const CATEGORY_META: Record<
    string,
    { image: string; bg: string; ring: string; fit?: "cover" | "contain" }
  > = {
    "bases-mdf": {
      image: "/images/products/bases-mdf/base-mdf-hero-muestrario.png",
      bg: "bg-gradient-to-br from-[#ffeaf2] to-[#ffd4e5]",
      ring: "ring-rose-200 group-hover:ring-alina-400",
      fit: "cover",
    },
    minibases: {
      image: "/images/products/minibases/minibase-cheesecake-rizada.png",
      bg: "bg-gradient-to-br from-[#fff4ea] to-[#ffe2cc]",
      ring: "ring-amber-200 group-hover:ring-amber-400",
      fit: "cover",
    },
    "bases-rectangulares": {
      image: "/images/products/bases-rectangulares/base-rectangular-mdf-personalizada.png",
      bg: "bg-gradient-to-br from-[#fff0f6] to-[#fce4ee]",
      ring: "ring-pink-200 group-hover:ring-pink-400",
      fit: "cover",
    },
    "bases-disenos": {
      image: "/images/products/bases-disenos/base-diseno-coleccion.png",
      bg: "bg-gradient-to-br from-[#f8f0ff] to-[#edd9ff]",
      ring: "ring-purple-200 group-hover:ring-purple-400",
      fit: "cover",
    },
    toppers: {
      image: "/images/products/toppers/topper-acrilico-espejo-dorado.png",
      bg: "bg-gradient-to-br from-[#f0f6ff] to-[#dbeafe]",
      ring: "ring-sky-200 group-hover:ring-sky-400",
      fit: "cover",
    },
    apliques: {
      image: "/images/products/apliques/aplique-acrilico-10cm-15cm-mariposa.png",
      bg: "bg-gradient-to-br from-[#fffdeb] to-[#fef08a]",
      ring: "ring-yellow-200 group-hover:ring-yellow-400",
      fit: "contain",
    },
    cajas: {
      image: "/images/products/cajas/caja-acetato-tapa-transparente.png",
      bg: "bg-gradient-to-br from-[#f0fdf4] to-[#bbf7d0]",
      ring: "ring-emerald-200 group-hover:ring-emerald-400",
      fit: "cover",
    },
    complementos: {
      image: "/images/products/complementos/set-boquillas-grandes-manga-pack10.png",
      bg: "bg-gradient-to-br from-[#f5f3ff] to-[#ddd6fe]",
      ring: "ring-indigo-200 group-hover:ring-indigo-400",
      fit: "contain",
    },
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 w-full">
        {/* Hero Slider with min 80% width */}
        <HeroSlider />

        {/* Value props micro-bar: 4 balanced cards */}
        <section className="bg-white">
          <div className="mx-auto grid w-[90%] min-w-[80%] max-w-[1720px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4 py-6 sm:px-6 lg:px-8">
            {[
              [Store, "Tienda Virtual Especializada", "Insumos, bases y empaques reales de Alina Shop"],
              [Sparkles, "Corte Láser & Personalización", "Bases con grabado de logotipo para tu pastelería"],
              [BadgePercent, "Precios por Docena y Mayor", "Descuentos por volumen calculados automáticamente"],
              [Truck, "Envíos a todo el Ecuador", "Despachos asegurados por Servientrega y LaarCourier"],
            ].map(([Icon, title, copy]) => (
              <div key={title as string} className="flex items-center gap-3.5 rounded-2xl bg-[#fff8fb] border border-alina-100/80 px-4 py-3.5 shadow-2xs hover:border-alina-300 transition-colors">
                <Icon className="size-6 shrink-0 text-alina-600" aria-hidden="true" />
                <div>
                  <p className="text-sm font-bold text-slate-900">{title as string}</p>
                  <p className="text-xs text-slate-500">{copy as string}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories Quick Navigation */}
        <section className="mx-auto w-[90%] min-w-[80%] max-w-[1720px] px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-8 sm:mb-10 text-center">
            <h2 className="font-display font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 tracking-tight">
              Explora Nuestras Categorías
            </h2>
          </div>

          <div className="grid grid-cols-4 lg:grid-cols-8 gap-x-3 gap-y-6 sm:gap-x-4 sm:gap-y-8 lg:gap-x-6 items-start justify-items-center">
            {CATEGORIES_DATA.map((cat) => {
              const meta = CATEGORY_META[cat.slug] || {
                image: "/images/products/bases-mdf/base-mdf-hero-muestrario.png",
                bg: "bg-gradient-to-br from-[#ffeaf2] to-[#ffd4e5]",
                ring: "ring-rose-200 group-hover:ring-alina-400",
                fit: "cover" as const,
              };

              return (
                <Link
                  key={cat.slug}
                  href={`/catalogo?categoria=${cat.slug}`}
                  className="group flex flex-col items-center text-center w-full max-w-[140px] transition-transform duration-200 hover:-translate-y-1"
                >
                  <div
                    className={cn(
                      "relative aspect-square w-full max-w-[90px] sm:max-w-[110px] md:max-w-[120px] lg:max-w-[135px] rounded-full overflow-hidden p-1 sm:p-1.5 shadow-sm transition-all duration-300 group-hover:scale-105 group-hover:shadow-md ring-2",
                      meta.bg,
                      meta.ring
                    )}
                  >
                    <div className="relative size-full rounded-full overflow-hidden bg-white/40 flex items-center justify-center">
                      <Image
                        src={meta.image}
                        alt={cat.name}
                        fill
                        sizes="(max-width: 640px) 25vw, (max-width: 1024px) 25vw, 12.5vw"
                        className={cn(
                          "transition-transform duration-500 group-hover:scale-110",
                          meta.fit === "contain"
                            ? "object-contain p-2 sm:p-3"
                            : "object-cover"
                        )}
                      />
                    </div>
                  </div>
                  <span className="mt-2.5 sm:mt-3 font-display font-semibold text-xs sm:text-[13px] text-slate-800 text-center leading-snug group-hover:text-alina-600 transition-colors line-clamp-2 max-w-[120px]">
                    {cat.name}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Banner CTA 1: "Un bouquet de detalles para que tu torta llegue completa" */}
        <section className="mx-auto w-[90%] min-w-[80%] max-w-[1720px] px-4 pb-12 sm:px-6 lg:px-8">
          <ComboBanner />
        </section>

        {/* Featured Products Section */}
        <section className="border-t border-slate-100 bg-slate-50/60 py-14">
          <div className="mx-auto w-[90%] min-w-[80%] max-w-[1720px] px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-alina-600">Lo Más Vendido</span>
                <h2 className="font-display font-semibold text-2xl sm:text-3xl text-slate-900 mt-0.5">Productos Destacados en Tienda</h2>
              </div>
              <Link href="/catalogo" className="text-xs sm:text-sm font-bold text-alina-600 hover:text-alina-700 flex items-center gap-1.5 transition-colors">
                <span>Ver toda la tienda</span> <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <ProductGrid
              products={featuredProducts}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4.5"
            />
          </div>
        </section>

        {/* Banner CTA 2: Full-Width Before Footer ("Tu pastelería merece presentaciones que vendan solas") */}
        <BottomCtaBanner />
      </main>

      <QuickViewModal />
      <HomePromotionModal />
      <Footer />
    </div>
  );
}
