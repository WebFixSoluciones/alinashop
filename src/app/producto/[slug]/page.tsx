import React from "react";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductCustomizer } from "@/components/product/product-customizer";
import { PRODUCTS_DATA } from "@/lib/catalog-data";
import Link from "next/link";
import { ChevronRight, ShieldCheck, Truck, Sparkles } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = PRODUCTS_DATA.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-slate-900">Inicio</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/catalogo" className="hover:text-slate-900">Catálogo</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* 2-Column Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Columna Izquierda: Galería e Información Técnica */}
          <div className="lg:col-span-6 space-y-6">
            <ProductGallery
              mainImage={product.mainImage}
              images={product.images}
              productName={product.name}
            />

            {/* Ficha Técnica Detallada */}
            <div className="border border-slate-200/80 rounded-xl p-5 bg-slate-50/50">
              <h3 className="font-display font-bold text-sm text-slate-900 uppercase tracking-wider mb-3">
                Especificaciones del Producto
              </h3>
              <ul className="text-xs text-slate-600 space-y-2 leading-relaxed">
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-slate-800 w-24 shrink-0">Material:</span>
                  <span>{product.material || "MDF 3mm de alta densidad corte láser"}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-slate-800 w-24 shrink-0">Código SKU:</span>
                  <span className="font-mono text-slate-800">{product.sku}</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-slate-800 w-24 shrink-0">Uso:</span>
                  <span>Pastelería profesional, soporte estructural para tortas pesadas y presentación gourmet.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-slate-800 w-24 shrink-0">Grabado:</span>
                  <span>Opción de grabado láser de logo de tu pastelería por solo +$0.20 ctv por unidad.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Columna Derecha: Configurador Neurálgico & Precios */}
          <div className="lg:col-span-6">
            <div className="border-b border-slate-100 pb-4 mb-5">
              <span className="text-xs font-bold uppercase tracking-wider text-alina-600">
                Línea Pastelería Alina Shop
              </span>
              <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 mt-1 tracking-tight">
                {product.name}
              </h1>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                {product.description}
              </p>
            </div>

            <ProductCustomizer product={product as any} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
