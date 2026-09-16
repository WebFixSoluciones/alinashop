import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { ProductGrid } from "@/components/catalog/product-grid";
import { QuickViewModal } from "@/components/catalog/quick-view-modal";
import { CATEGORIES_DATA, PRODUCTS_DATA } from "@/lib/catalog-data";
import { ArrowRight, Sparkles, ShieldCheck, Truck, MessageCircle, Layers, Sliders } from "lucide-react";

export default function HomePage() {
  const featuredProducts = PRODUCTS_DATA.slice(0, 8);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-1">
        {/* Clean Hero Section */}
        <section className="bg-radial from-alina-50/50 via-white to-white py-16 sm:py-24 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Text Left */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 bg-alina-50 border border-alina-200/80 text-alina-700 text-xs font-bold px-3 py-1.5 rounded-full">
                  <Sparkles className="w-3.5 h-3.5 text-alina-500" />
                  <span>Fábrica de Insumos & Bases de Repostería en Ecuador</span>
                </div>

                <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl text-slate-900 tracking-tight leading-[1.15]">
                  Bases de torta, toppers y empaques para{" "}
                  <span className="text-alina-600">pastelería profesional</span>
                </h1>

                <p className="text-slate-600 text-base sm:text-lg max-w-xl leading-relaxed">
                  Corte láser en MDF 3mm grado alimenticio con medidas personalizadas y grabado de tu logo. Pide directo con cotización lista en WhatsApp o paga al instante con tarjeta Payphone.
                </p>

                <div className="flex flex-wrap gap-4 pt-2">
                  <Link
                    href="/catalogo"
                    className="bg-slate-900 hover:bg-slate-800 text-white font-display font-bold px-7 py-3.5 rounded-xl flex items-center gap-2 transition-all shadow-md hover:shadow-lg text-sm"
                  >
                    <span>Ver Catálogo Completo</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href="https://wa.me/593985890956?text=Hola%20Alina%20Shop,%20deseo%20informaci%C3%B3n%20sobre%20sus%20bases%20y%20toppers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-display font-bold px-6 py-3.5 rounded-xl flex items-center gap-2 transition-all shadow-md text-sm"
                  >
                    <MessageCircle className="w-4 h-4 fill-current" />
                    <span>Contactar por WhatsApp</span>
                  </a>
                </div>

                {/* Micro guarantees */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-slate-100 text-xs text-slate-600 font-medium">
                  <div>✨ Cualquier medida bajo pedido</div>
                  <div>🚚 Envíos Servientrega y Laar</div>
                  <div>💳 Pagos Seguros con Payphone</div>
                </div>
              </div>

              {/* Hero Right Visual Card */}
              <div className="lg:col-span-5">
                <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                  <div className="aspect-square bg-slate-50 rounded-2xl flex items-center justify-center p-8 relative border border-slate-100">
                    <Image
                      src="/logo.jpg"
                      alt="Alina Shop"
                      width={300}
                      height={200}
                      className="object-contain"
                      priority
                    />
                  </div>
                  <div className="mt-5 space-y-2 text-center">
                    <div className="text-xs font-bold uppercase tracking-wider text-alina-600">
                      Cálculo en Tiempo Real
                    </div>
                    <h3 className="font-display font-bold text-lg text-slate-900">
                      Bases Personalizadas desde $0.14 c/u
                    </h3>
                    <p className="text-xs text-slate-500">
                      Configura forma, color blanco o wengué, medidas de 10 a 40cm y grabado de tu marca.
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Categories Quick Navigation */}
        <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-baseline mb-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-alina-600">Categorías</span>
              <h2 className="font-display font-bold text-2xl text-slate-900 mt-0.5">Líneas de Producción</h2>
            </div>
            <Link href="/catalogo" className="text-xs font-bold text-alina-600 hover:text-alina-700 flex items-center gap-1">
              Ver todas <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {CATEGORIES_DATA.slice(0, 4).map((cat) => (
              <Link
                key={cat.slug}
                href={`/catalogo?categoria=${cat.slug}`}
                className="group p-5 rounded-2xl border border-slate-200/80 hover:border-alina-300 bg-white hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <h3 className="font-display font-bold text-sm text-slate-900 group-hover:text-alina-600 transition-colors">
                    {cat.name}
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {cat.description}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-slate-700 group-hover:text-alina-600">
                  <span>Ver productos</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Products Section */}
        <section className="py-12 bg-slate-50/60 border-t border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-baseline mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-alina-600">Destacados</span>
                <h2 className="font-display font-bold text-2xl text-slate-900 mt-0.5">Productos Populares</h2>
              </div>
              <Link href="/catalogo" className="text-xs font-bold text-alina-600 hover:text-alina-700 flex items-center gap-1">
                Ver catálogo completo <ArrowRight className="w-3.5 h-3.5" />
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
