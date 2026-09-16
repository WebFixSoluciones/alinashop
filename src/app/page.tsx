import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProductGrid } from "@/components/catalog/product-grid";
import { QuickViewModal } from "@/components/catalog/quick-view-modal";
import { HeroSlider } from "@/components/home/hero-slider";
import { CATEGORIES_DATA, PRODUCTS_DATA } from "@/lib/catalog-data";
import { ArrowRight, BadgePercent, CakeSlice, PackageCheck, Sparkles } from "lucide-react";

export default function HomePage() {
  const featuredProducts = PRODUCTS_DATA.slice(0, 8);

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

      <main className="flex-1">
        <HeroSlider />

        <section className="border-b border-slate-100 bg-white">
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-3 px-4 py-5 sm:grid-cols-3 sm:px-6 lg:px-8">
            {[
              [CakeSlice, "Productos reales", "Catálogo basado en la línea oficial Alina Shop"],
              [PackageCheck, "Envíos a Ecuador", "Despachamos por Servientrega y Laar"],
              [BadgePercent, "Precio mayorista", "Ahorra desde 12 unidades y compra por volumen"],
            ].map(([Icon, title, copy]) => (
              <div key={title as string} className="flex items-center gap-3 rounded-2xl bg-[#fff8fb] px-4 py-3">
                <Icon className="size-5 shrink-0 text-alina-600" aria-hidden="true" />
                <div>
                  <p className="text-sm font-bold text-slate-900">{title as string}</p>
                  <p className="text-xs text-slate-500">{copy as string}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Categories Quick Navigation */}
        <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-alina-600">Categorías</span>
              <h2 className="font-display font-bold text-2xl text-slate-900 mt-0.5">Líneas de Producción</h2>
            </div>
            <Link href="/catalogo" className="text-xs font-bold text-alina-600 hover:text-alina-700 flex items-center gap-1">
              Ver todas <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {CATEGORIES_DATA.map((cat) => (
              <Link
                key={cat.slug}
                href={`/catalogo?categoria=${cat.slug}`}
                className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200/80 bg-white transition-all hover:border-alina-300 hover:shadow-md"
              >
                <div className="relative aspect-[4/3] bg-slate-50">
                  <Image src={categoryImages[cat.slug]} alt={cat.name} fill sizes="(max-width: 768px) 50vw, 25vw" className="object-contain p-3 transition-transform duration-200 group-hover:scale-105" />
                </div>
                <div className="p-4">
                  <h3 className="text-pretty font-display text-sm font-bold text-slate-900 transition-colors group-hover:text-alina-600">
                    {cat.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                    {cat.description}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-slate-700 group-hover:text-alina-600">
                  <span>Ver productos</span>
                    <ArrowRight className="size-3" aria-hidden="true" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="border-t border-slate-100 bg-slate-50/60 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-8 flex items-end justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-alina-600">Destacados</span>
                <h2 className="font-display font-bold text-2xl text-slate-900 mt-0.5">Productos Populares</h2>
              </div>
              <Link href="/catalogo" className="text-xs font-bold text-alina-600 hover:text-alina-700 flex items-center gap-1">
                Ver catálogo completo <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <div className="mb-7 flex flex-col gap-4 rounded-3xl border border-alina-200 bg-[#fff2f7] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div>
                <p className="text-xs font-bold uppercase text-alina-600">Compra inteligente para tu taller</p>
                <h3 className="mt-1 text-balance font-display text-xl font-bold text-slate-900">Arma tu mesa dulce con productos que sí combinan.</h3>
                <p className="mt-1 text-sm text-slate-600">Bases, toppers y complementos para resolver tu próximo pedido.</p>
              </div>
              <Link href="/catalogo?categoria=complementos" className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-alina-700">
                Ver complementos <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <ProductGrid products={featuredProducts} />
          </div>
        </section>
      </main>

      <QuickViewModal />
      <Footer />
    </div>
  );
}
