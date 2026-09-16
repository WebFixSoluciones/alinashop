import React from "react";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductCustomizer } from "@/components/product/product-customizer";
import { ProductGrid } from "@/components/catalog/product-grid";
import { PRODUCTS_DATA } from "@/lib/catalog-data";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ChevronRight, Gift } from "lucide-react";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = PRODUCTS_DATA.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  const relatedProducts = PRODUCTS_DATA.filter(
    (candidate) => candidate.categorySlug === product.categorySlug && candidate.slug !== product.slug,
  ).slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-slate-900">Inicio</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <Link href="/catalogo" className="hover:text-slate-900">Catálogo</Link>
          <ChevronRight className="w-3 h-3 text-slate-400" />
          <span className="text-slate-800 font-semibold truncate max-w-xs">{product.name}</span>
        </nav>

        {/* 2-Column Product Layout */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
          {/* Columna Izquierda: Galería e Información Técnica */}
          <div className="lg:col-span-6 space-y-6">
            <ProductGallery
              mainImage={product.mainImage}
              images={product.images}
              productName={product.name}
            />

            {/* Ficha Técnica Detallada */}
            <div className="rounded-2xl border border-slate-200/80 bg-slate-50/50 p-5">
              <h3 className="mb-3 font-display text-sm font-bold uppercase text-slate-900">
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
              <span className="text-xs font-bold uppercase text-alina-600">
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

      <section className="mx-auto w-full max-w-7xl px-4 pb-12 sm:px-6 lg:px-8">
        <div className="alina-bokeh relative overflow-hidden rounded-[2rem] border border-alina-200 bg-[#fff2f7] p-5 sm:p-7 lg:p-8">
          <div className="relative z-10 grid items-center gap-6 lg:grid-cols-[1fr_auto]">
            <div className="max-w-xl">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-xs font-bold uppercase text-alina-700">
                <Gift className="size-3.5" aria-hidden="true" />
                Completa tu pedido
              </div>
              <h2 className="mt-3 text-balance font-display text-2xl font-extrabold text-slate-950 sm:text-3xl">Un bouquet de detalles para que tu torta llegue completa.</h2>
              <p className="mt-2 text-pretty text-sm leading-relaxed text-slate-600">Combina esta pieza con toppers, cajas y complementos reales del catálogo Alina Shop.</p>
              <Link href="/catalogo" className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-alina-700 hover:text-alina-900">
                Ver ideas para combinar <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <div className="flex items-end justify-center gap-2 sm:gap-4">
              {[
                ["/images/products/toppers/topper-acrilico-espejo-dorado.png", "Toppers"],
                ["/images/products/cajas/caja-acetato-tapa-transparente.png", "Cajas"],
                ["/images/products/complementos/set-boquillas-grandes-manga-pack10.png", "Complementos"],
              ].map(([image, alt], index) => (
                <div key={image} className={`relative overflow-hidden rounded-2xl border-4 border-white bg-white shadow-lg ${index === 1 ? "-translate-y-3" : ""}`}>
                  <Image src={image} alt={alt} width={150} height={150} sizes="150px" className="size-24 object-cover sm:size-32" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {relatedProducts.length > 0 && (
        <section className="border-t border-slate-100 bg-slate-50/60 py-12">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-7 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase text-alina-600">También te puede gustar</p>
                <h2 className="mt-1 text-balance font-display text-2xl font-bold text-slate-950">Más de esta categoría</h2>
              </div>
              <Link href={`/catalogo?categoria=${product.categorySlug}`} className="hidden items-center gap-1 text-sm font-bold text-alina-700 sm:flex">
                Ver categoría <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            <ProductGrid products={relatedProducts} />
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
