import React from "react";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProductGrid } from "@/components/catalog/product-grid";
import { QuickViewModal } from "@/components/catalog/quick-view-modal";
import { CATEGORIES_DATA, PRODUCTS_DATA } from "@/lib/catalog-data";
import Link from "next/link";
import { SlidersHorizontal, Sparkles } from "lucide-react";

interface CatalogoPageProps {
  searchParams: Promise<{ categoria?: string; busqueda?: string }>;
}

export default async function CatalogoPage({ searchParams }: CatalogoPageProps) {
  const { categoria, busqueda } = await searchParams;

  let filteredProducts = PRODUCTS_DATA;

  if (categoria) {
    filteredProducts = filteredProducts.filter((p) => p.categorySlug === categoria);
  }

  if (busqueda) {
    const q = busqueda.toLowerCase();
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
    );
  }

  const currentCategory = CATEGORIES_DATA.find((c) => c.slug === categoria);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 w-[90%] min-w-[80%] max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Header Title */}
        <div className="mb-8 border-b border-slate-100 pb-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-alina-600">
                Tienda Virtual Oficial Alina Shop
              </span>
              <h1 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 mt-1 tracking-tight">
                {currentCategory ? currentCategory.name : "Todos los Insumos de Repostería"}
              </h1>
              <p className="text-sm text-slate-500 mt-1 max-w-2xl">
                {currentCategory
                  ? currentCategory.description
                  : "Explora bases de torta en MDF personalizables, toppers en acrílico, cajas de acetato y complementos para pastelería."}
              </p>
            </div>

            <div className="text-xs font-semibold text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-200/70">
              {filteredProducts.length} {filteredProducts.length === 1 ? "producto" : "productos"} disponibles
            </div>
          </div>
        </div>

        {/* Category Pills Filter */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          <Link
            href="/catalogo"
            className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all border ${
              !categoria
                ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
            }`}
          >
            Todos
          </Link>
          {CATEGORIES_DATA.map((cat) => (
            <Link
              key={cat.slug}
              href={`/catalogo?categoria=${cat.slug}`}
              className={`px-4 py-2 rounded-xl text-xs font-semibold shrink-0 transition-all border ${
                categoria === cat.slug
                  ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-300"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border border-slate-200/80">
            <p className="text-base font-semibold text-slate-800">No encontramos productos en esta categoría</p>
            <p className="text-xs text-slate-500 mt-1">Prueba seleccionando otra categoría o limpiando los filtros.</p>
            <Link
              href="/catalogo"
              className="inline-block mt-4 bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-lg"
            >
              Ver Todo el Catálogo
            </Link>
          </div>
        )}
      </main>

      <QuickViewModal />
      <Footer />
    </div>
  );
}
