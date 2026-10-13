'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SlideData {
  id: string;
  eyebrow: string;
  title: string;
  highlight: string;
  body: string;
  cta: string;
  href: string;
  bgImage: string;
  products: [string, string, string];
}

const slides: SlideData[] = [
  {
    id: "bases-mdf",
    eyebrow: "Bases de Alta Resistencia",
    title: "La presentación empieza en la ",
    highlight: "base perfecta.",
    body: "Bases MDF 3mm laminadas en blanco, wengue y crudo. Cortes láser exactos y personalizados con el logotipo de tu pastelería para pedidos que vendan solos.",
    cta: "Explorar Bases MDF",
    href: "/catalogo?categoria=bases-mdf",
    bgImage: "/images/slider/bg-bases.jpg",
    products: [
      "/images/slider/aplicaciones/base-1.jpg",
      "/images/slider/aplicaciones/base-2.jpg",
      "/images/slider/aplicaciones/base-3.jpg",
    ],
  },
  {
    id: "toppers",
    eyebrow: "Toppers en Acrílico & Vinil",
    title: "Toppers con brillo, elegancia y ",
    highlight: "personalidad.",
    body: "Transforma cada celebración con toppers en acrílico espejo dorado, oro rosa y plateado. Más de 48 modelos exclusivos para cumpleaños, bodas, aniversarios y bautizos.",
    cta: "Ver Colección de Toppers",
    href: "/catalogo?categoria=toppers",
    bgImage: "/images/slider/bg-toppers.jpg",
    products: [
      "/images/slider/aplicaciones/topper-1.jpg",
      "/images/slider/aplicaciones/topper-2.jpg",
      "/images/slider/aplicaciones/topper-3.jpg",
    ],
  },
  {
    id: "cajas",
    eyebrow: "Cajas de Acetato & Empaques",
    title: "Cajas transparentes que protegen y ",
    highlight: "enamoran.",
    body: "Cajas de acetato cristal rígido de visibilidad total 360° para tortas altas, mini cakes y cajas doradas para cupcakes con base reforzada para entregas seguras.",
    cta: "Explorar Cajas y Empaques",
    href: "/catalogo?categoria=cajas",
    bgImage: "/images/slider/bg-cajas.jpg",
    products: [
      "/images/slider/aplicaciones/caja-1.jpg",
      "/images/slider/aplicaciones/caja-2.jpg",
      "/images/slider/aplicaciones/caja-3.jpg",
    ],
  },
  {
    id: "complementos",
    eyebrow: "Herramientas de Precisión",
    title: "Todo lo que necesitas en tu ",
    highlight: "taller pastelero.",
    body: "Boquillas grandes en acero inoxidable, mangas reposteras de silicona de grado alimenticio, peines texturizadores y espátulas de alta durabilidad para trabajar con máxima precisión.",
    cta: "Ver Herramientas y Utensilios",
    href: "/catalogo?categoria=complementos",
    bgImage: "/images/slider/bg-complementos.jpg",
    products: [
      "/images/slider/aplicaciones/herramienta-1.jpg",
      "/images/slider/aplicaciones/herramienta-2.jpg",
      "/images/slider/aplicaciones/herramienta-3.jpg",
    ],
  },
];

export function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slide = slides[activeSlide];

  // Auto-play timer: 5 segundos continuos automáticos
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [activeSlide, isPaused]);

  const move = (direction: number) => {
    setActiveSlide((current) => (current + direction + slides.length) % slides.length);
  };

  return (
    <section
      className="relative overflow-hidden border-b border-alina-200/80 bg-gradient-to-br from-[#fff2f7] via-[#fdedf4] to-[#fce4ee]"
      aria-label="Promociones destacadas"
    >
      {/* Background Image Layer with crossfade between slides & ambient rosy glow */}
      <div className="absolute inset-0 z-0">
        {/* Ambient pink glow orbs with ~30% logo color opacity */}
        <div className="absolute -top-32 -left-32 size-[500px] rounded-full bg-alina-400/25 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 -right-32 size-[600px] -translate-y-1/2 rounded-full bg-alina-300/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 left-1/3 size-[400px] rounded-full bg-alina-200/40 blur-3xl pointer-events-none" />

        {slides.map((s, idx) => (
          <Image
            key={s.id}
            src={s.bgImage}
            alt=""
            fill
            priority={idx === 0}
            sizes="100vw"
            className={cn(
              "object-cover object-right lg:object-center mix-blend-multiply transition-opacity duration-1000 pointer-events-none",
              activeSlide === idx ? "opacity-35" : "opacity-0"
            )}
          />
        ))}
        {/* Soft rosy gradient masks ensuring high text contrast while preserving the brand pink tint */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#fff2f7] via-[#fff2f7]/90 to-transparent lg:via-[#fff2f7]/85 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#fce4ee]/70 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Main Content Grid with 80% min width */}
      <div className="relative z-10 mx-auto grid w-[90%] min-w-[80%] max-w-[1720px] grid-cols-1 items-center gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-16">
        
        {/* Left Column: Copy & Actions */}
        <div key={slide.id} className="lg:col-span-6 space-y-6 animate-in fade-in slide-in-from-left-2 duration-500">
          {/* Heading */}
          <div aria-live="polite">
            <h1 className="max-w-xl text-balance font-display text-4xl font-bold leading-[1.12] text-slate-950 sm:text-5xl lg:text-6xl tracking-tight">
              {slide.title}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-alina-600 via-rose-600 to-amber-600">
                {slide.highlight}
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-pretty text-sm sm:text-base leading-relaxed text-slate-600">
              {slide.body}
            </p>
          </div>

          {/* Action CTAs */}
          <div
            className="flex flex-wrap items-center gap-3 pt-2"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <Link
              href={slide.href}
              className="inline-flex items-center gap-2 rounded-xl bg-alina-600 px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-alina-600/25 transition-all hover:bg-alina-700 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span>{slide.cta}</span>
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              href="/catalogo"
              className="rounded-xl border border-slate-300 bg-white/80 px-5 py-3.5 text-sm font-bold text-slate-800 transition-colors hover:border-alina-300 hover:text-alina-700 backdrop-blur-xs"
            >
              Ver toda la tienda
            </Link>
          </div>

          {/* Minimalist Navigation Arrows (No sliding dots, super clean) */}
          <div
            className="flex items-center gap-2.5 pt-3"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <button
              type="button"
              onClick={() => move(-1)}
              aria-label="Promoción anterior"
              className="size-8 sm:size-9 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-alina-600 border border-slate-200/90 hover:border-alina-300 shadow-2xs flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="size-4" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => move(1)}
              aria-label="Siguiente promoción"
              className="size-8 sm:size-9 rounded-full bg-white/80 hover:bg-white text-slate-700 hover:text-alina-600 border border-slate-200/90 hover:border-alina-300 shadow-2xs flex items-center justify-center transition-all cursor-pointer hover:scale-105 active:scale-95"
            >
              <ChevronRight className="size-4" aria-hidden="true" />
            </button>
            <span className="text-[11px] font-semibold text-slate-400 ml-1.5">
              0{activeSlide + 1} / 0{slides.length}
            </span>
          </div>
        </div>

        {/* Right Column: Trio of editorial product application showcases */}
        <div
          key={`products-${slide.id}`}
          className="lg:col-span-6 relative flex items-center justify-center min-h-[320px] sm:min-h-[380px] lg:min-h-[460px] w-full animate-in fade-in zoom-in-95 duration-700 select-none py-4"
        >
          {/* Ambient soft glow aura */}
          <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-alina-400/20 via-pink-300/15 to-amber-200/20 blur-3xl pointer-events-none" />

          {/* Dynamic 3-Photo Trio Composition (Editorial Lookbook with clean white frames & smooth shadows) */}
          <div className="relative w-full max-w-lg aspect-[4/3] flex items-center justify-center">
            
            {/* Product 1: Flanking Left (floating, subtle tilt) */}
            <div className="absolute left-1 sm:left-4 bottom-2 sm:bottom-6 w-32 sm:w-44 lg:w-52 aspect-square z-10 -rotate-6 rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-white shadow-xl overflow-hidden bg-white transition-all duration-500 hover:scale-105 hover:-rotate-3 hover:z-30">
              <Image
                src={slide.products[0]}
                alt={slide.title}
                fill
                sizes="(max-width: 768px) 35vw, 220px"
                className="object-cover size-full transition-transform duration-500 hover:scale-108"
              />
            </div>

            {/* Product 2: Central Hero Product (large, elevated, prominent) */}
            <div className="relative w-48 sm:w-64 lg:w-76 aspect-square z-20 rounded-3xl sm:rounded-[2rem] border-3 sm:border-4 border-white shadow-2xl overflow-hidden bg-white transition-all duration-500 hover:scale-105">
              <Image
                src={slide.products[1]}
                alt={slide.title}
                fill
                sizes="(max-width: 768px) 50vw, 320px"
                className="object-cover size-full transition-transform duration-500 hover:scale-108"
                priority={activeSlide === 0}
              />
            </div>

            {/* Product 3: Flanking Right (floating, subtle tilt) */}
            <div className="absolute right-1 sm:right-4 top-2 sm:top-6 w-32 sm:w-44 lg:w-52 aspect-square z-10 rotate-6 rounded-2xl sm:rounded-3xl border-2 sm:border-4 border-white shadow-xl overflow-hidden bg-white transition-all duration-500 hover:scale-105 hover:rotate-3 hover:z-30">
              <Image
                src={slide.products[2]}
                alt={slide.title}
                fill
                sizes="(max-width: 768px) 35vw, 220px"
                className="object-cover size-full transition-transform duration-500 hover:scale-108"
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
