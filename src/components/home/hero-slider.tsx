'use client';

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

const slides = [
  {
    eyebrow: "Bases que elevan cada creación",
    title: "La presentación empieza en la base.",
    body: "Bases MDF laminadas, cortadas a láser y listas para tortas que merecen verse tan bien como saben.",
    cta: "Explorar bases MDF",
    href: "/catalogo?categoria=bases-mdf",
    image: "/images/products/bases-mdf/base-mdf-hero-muestrario.png",
    alt: "Torta de fresas sobre una base MDF decorativa Alina Shop",
    tone: "bg-[#fff2f7]",
  },
  {
    eyebrow: "Detalles que hacen la diferencia",
    title: "Decora con intención.",
    body: "Toppers en acrílico y MDF para cumpleaños, celebraciones y mesas dulces con identidad propia.",
    cta: "Ver toppers",
    href: "/catalogo?categoria=toppers",
    image: "/images/products/toppers/topper-acrilico-espejo-dorado.png",
    alt: "Toppers dorados y plateados para tortas",
    tone: "bg-[#f7f1ff]",
  },
  {
    eyebrow: "Herramientas para tu taller",
    title: "Todo listo para crear.",
    body: "Boquillas, mangas, moldes y complementos reales para trabajar con más precisión en cada pedido.",
    cta: "Comprar complementos",
    href: "/catalogo?categoria=complementos",
    image: "/images/products/complementos/set-boquillas-grandes-manga-pack10.png",
    alt: "Set de boquillas y mangas para repostería",
    tone: "bg-[#eff9ff]",
  },
];

export function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slide = slides[activeSlide];

  const move = (direction: number) => {
    setActiveSlide((current) => (current + direction + slides.length) % slides.length);
  };

  return (
    <section className={cn("alina-bokeh border-b border-alina-100", slide.tone)} aria-label="Promociones destacadas">
      <div className="mx-auto grid w-[90%] min-w-[80%] max-w-[1720px] grid-cols-1 items-center gap-8 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:py-16">
        <div className="lg:col-span-6">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-alina-200 bg-white/80 px-3 py-1.5 text-xs font-bold text-alina-700">
            <Sparkles className="size-3.5 text-alina-500" aria-hidden="true" />
            {slide.eyebrow}
          </div>
          <div aria-live="polite">
            <h1 className="max-w-xl text-balance font-display text-4xl font-extrabold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
              {slide.title}
            </h1>
            <p className="mt-5 max-w-xl text-pretty text-base leading-relaxed text-slate-600 sm:text-lg">
              {slide.body}
            </p>
          </div>
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <Link href={slide.href} className="inline-flex items-center gap-2 rounded-xl bg-alina-600 px-5 py-3.5 text-sm font-bold text-white shadow-md transition-colors hover:bg-alina-700">
              {slide.cta}
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link href="/catalogo" className="rounded-xl border border-slate-300 bg-white/70 px-5 py-3.5 text-sm font-bold text-slate-800 transition-colors hover:border-alina-300 hover:text-alina-700">
              Ver toda la tienda
            </Link>
          </div>
          <div className="mt-8 flex items-center gap-3">
            <button type="button" onClick={() => move(-1)} aria-label="Promoción anterior" className="flex size-9 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition-colors hover:border-alina-400 hover:text-alina-700">
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <div className="flex items-center gap-2" role="tablist" aria-label="Promociones">
              {slides.map((item, index) => (
                <button
                  key={item.title}
                  type="button"
                  role="tab"
                  aria-selected={activeSlide === index}
                  aria-label={`Ver promoción ${index + 1}`}
                  onClick={() => setActiveSlide(index)}
                  className={cn("h-2 rounded-full bg-alina-200 transition-all", activeSlide === index ? "w-8 bg-alina-600" : "w-2")}
                />
              ))}
            </div>
            <button type="button" onClick={() => move(1)} aria-label="Siguiente promoción" className="flex size-9 items-center justify-center rounded-full border border-slate-300 bg-white text-slate-700 transition-colors hover:border-alina-400 hover:text-alina-700">
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </div>

        <div className="lg:col-span-6">
          <div className="relative mx-auto max-w-xl overflow-hidden rounded-[2rem] border border-white bg-white/75 p-3 shadow-xl">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-white">
              <Image src={slide.image} alt={slide.alt} fill priority={activeSlide === 0} sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl border border-white/70 bg-white/90 p-4 shadow-sm backdrop-blur-sm">
                <p className="text-xs font-bold uppercase text-alina-600">Alina Shop · Repostería con intención</p>
                <p className="mt-1 text-sm font-semibold text-slate-900">Recursos reales para tu próxima creación</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
