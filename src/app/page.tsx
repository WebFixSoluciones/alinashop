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
import { HomePromotionModal } from "@/components/home/home-promotion-modal";

export default function HomePage() {
  const featuredProducts = PRODUCTS_DATA.slice(0, 10);

  const categoryImages: Record<string, string> = {
    "bases-mdf": "/images/products/bases-mdf/base-mdf-blanco-wengue.png",
    minibases: "/images/products/minibases/minibase-cheesecake-rizada.png",
    "bases-rectangulares": "/images/products/bases-rectangulares/base-rectangular-mdf-personalizada.png",
    "bases-disenos": "/images/products/bases-disenos/base-diseno-coleccion.png",
    toppers: "/images/products/toppers/topper-acrilico-espejo-dorado.png",
    apliques: "/images/products/apliques/aplique-acrilico-miniatura-4cm-6cm-01.png",
    cajas: "/images/products/cajas/caja-acetato-tapa-transparente.png",
    complementos: "/images/products/complementos/set-boquillas-grandes-manga-pack10.png",
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 w-full">
        {/* Hero Slider with min 80% width */}
        <HeroSlider />

        {/* Value props micro-bar: 4 balanced cards */}
        <section className="border-b border-slate-100 bg-white">
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
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-alina-600">Líneas de la Tienda</span>
              <h2 className="font-display font-semibold text-2xl sm:text-3xl text-slate-900 mt-0.5">Explora Nuestras Categorías</h2>
            </div>
            <Link href="/catalogo" className="text-xs sm:text-sm font-bold text-alina-600 hover:text-alina-700 flex items-center gap-1.5 transition-colors">
              <span>Ver toda la tienda</span> <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="flex md:grid md:grid-cols-8 gap-3 sm:gap-3.5 lg:gap-4 overflow-x-auto md:overflow-visible pb-2 md:pb-0 scrollbar-none snap-x">
            {CATEGORIES_DATA.map((cat) => (
              <Link
                key={cat.slug}
                href={`/catalogo?categoria=${cat.slug}`}
                className="group shrink-0 w-[116px] sm:w-[130px] md:w-auto flex flex-col items-center text-center p-3 rounded-2xl border border-slate-200/80 bg-white hover:border-alina-300 hover:shadow-md transition-all duration-200 snap-start"
              >
                <div className="relative aspect-square w-full rounded-xl bg-slate-50/80 overflow-hidden flex items-center justify-center">
                  <Image
                    src={categoryImages[cat.slug]}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 768px) 25vw, 12.5vw"
                    className="object-contain p-2.5 transition-transform duration-300 ease-out group-hover:scale-110"
                  />
                </div>
                <h3 className="mt-2.5 font-display font-medium text-xs sm:text-[13px] text-slate-800 group-hover:text-alina-600 transition-colors leading-tight line-clamp-2">
                  {cat.name}
                </h3>
              </Link>
            ))}
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

        {/* Banner CTA 2: Before Footer ("Tu pastelería merece presentaciones que vendan solas") */}
        <section className="mx-auto w-[90%] min-w-[80%] max-w-[1720px] px-4 py-4 sm:px-6 lg:px-8">
          <BottomCtaBanner />
        </section>
      </main>

      <QuickViewModal />
      <HomePromotionModal />
      <Footer />
    </div>
  );
}
