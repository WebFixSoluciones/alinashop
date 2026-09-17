'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface SatelliteCard {
  image: string;
  title: string;
  tag: string;
}

interface SlideData {
  id: string;
  eyebrow: string;
  title: string;
  highlight: string;
  body: string;
  cta: string;
  href: string;
  bgImage: string;
  heroProduct: {
    image: string;
    title: string;
    spec: string;
    badge: string;
  };
  satellites: SatelliteCard[];
  features: string[];
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
    heroProduct: {
      image: "/images/products/bases-mdf/base-mdf-personalizada-logo.png",
      title: "Base MDF Personalizada con Logo",
      spec: "MDF 3mm · Acabado Blanco / Wengue",
      badge: "Grabado Láser de Marca",
    },
    satellites: [
      {
        image: "/images/products/bases-disenos/base-diseno-coleccion.png",
        title: "Bases con Ondas & Festón",
        tag: "Colección Diseño",
      },
      {
        image: "/images/products/minibases/minibase-cheesecake-rizada.png",
        title: "Minibases Cheesecake",
        tag: "Monoporción",
      },
      {
        image: "/images/products/bases-rectangulares/base-rectangular-mdf-personalizada.png",
        title: "Bases Rectangulares",
        tag: "Bajo Medida",
      },
    ],
    features: [
      "Corte Láser MDF 3mm",
      "Grabado de Logo (+ $0.20)",
      "Escala Mayorista desde $0.55",
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
    heroProduct: {
      image: "/images/products/toppers/topper-acrilico-espejo-dorado.png",
      title: "Topper Acrílico Espejo Dorado",
      spec: "Acrílico 2mm Alta Densidad · Reutilizable",
      badge: "Efecto Espejo Brillante",
    },
    satellites: [
      {
        image: "/images/products/toppers/topper-acrilico-oro-rosa.png",
        title: "Topper Oro Rosa Espejo",
        tag: "Bodas y Quinceaños",
      },
      {
        image: "/images/products/toppers/modelos/topper-tac-cumpleanos-01.png",
        title: "Feliz Cumpleaños Cursiva",
        tag: "Caligrafía Fina",
      },
      {
        image: "/images/products/apliques/aplique-acrilico-miniatura-4cm-6cm-01.png",
        title: "Mini Apliques Acrílicos",
        tag: "Detalles 4 a 6 cm",
      },
    ],
    features: [
      "Acrílico Espejo Premium",
      "Dorado · Oro Rosa · Plata",
      "+48 Diseños en Stock",
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
    heroProduct: {
      image: "/images/products/cajas/caja-acetato-tapa-transparente.png",
      title: "Caja Acetato Cristal Visor 360°",
      spec: "Cuerpo Rígido Transparente + Base",
      badge: "Visibilidad Total",
    },
    satellites: [
      {
        image: "/images/products/cajas/caja-cupcakes-dorado-4-servicios.png",
        title: "Caja Cupcakes Dorada",
        tag: "4 Servicios",
      },
      {
        image: "/images/products/cajas/caja-acetato-tapa-blanca.png",
        title: "Caja Acetato Tapa Blanca",
        tag: "Tortas Altas",
      },
      {
        image: "/images/products/cajas/caja-mdf-kit-torta-porta-flores-30x30.png",
        title: "Kit Torta Porta Flores MDF",
        tag: "Edición Especial",
      },
    ],
    features: [
      "Acetato Rígido Cristal",
      "Protección de Transporte",
      "Formatos Altos y Cupcakes",
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
    heroProduct: {
      image: "/images/products/complementos/set-boquillas-grandes-manga-pack10.png",
      title: "Set 10 Boquillas Grandes + Manga",
      spec: "Acero Inoxidable Grado Alimenticio",
      badge: "Set Profesional Taller",
    },
    satellites: [
      {
        image: "/images/products/complementos/raspador-acrilico-texturas-pack3.png",
        title: "Peines & Raspadores Textura",
        tag: "Bordes Perfectos",
      },
      {
        image: "/images/products/complementos/espatula-reposteria-acero.png",
        title: "Espátula Angular Acero",
        tag: "Alisado Profesional",
      },
      {
        image: "/images/products/complementos/cortador-acero-margarita-pack3.png",
        title: "Cortadores de Galletas",
        tag: "Pack 3 Piezas",
      },
    ],
    features: [
      "Acero Inoxidable Grado Alimenticio",
      "Kits Completos para Crema y Fondant",
      "Durabilidad y Precisión",
    ],
  },
];

export function HeroSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const slide = slides[activeSlide];

  // Auto-play timer
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveSlide((current) => (current + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const move = (direction: number) => {
    setActiveSlide((current) => (current + direction + slides.length) % slides.length);
  };

  return (
    <section
      className="relative overflow-hidden border-b border-alina-100 bg-white"
      aria-label="Promociones destacadas"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Image Layer from themed collection */}
      <div className="absolute inset-0 z-0">
        <Image
          src={slide.bgImage}
          alt=""
          fill
          priority={activeSlide === 0}
          sizes="100vw"
          className="object-cover object-right lg:object-center opacity-30 mix-blend-multiply transition-opacity duration-700 pointer-events-none"
        />
        {/* Soft gradient masks ensuring high text contrast */}
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white/40 lg:via-white/80 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-white/70 via-transparent to-white/40 pointer-events-none" />
      </div>

      {/* Main Content Grid with 80% min width */}
      <div className="relative z-10 mx-auto grid w-[90%] min-w-[80%] max-w-[1720px] grid-cols-1 items-center gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-12 lg:gap-12 lg:px-8 lg:py-16">
        
        {/* Left Column: Copy & Actions */}
        <div className="lg:col-span-6 space-y-6">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-alina-200 bg-white/95 px-3.5 py-1.5 text-xs font-bold text-alina-700 shadow-2xs backdrop-blur-sm animate-in fade-in duration-300">
            <Sparkles className="size-3.5 text-alina-500 shrink-0" aria-hidden="true" />
            <span>{slide.eyebrow}</span>
          </div>

          {/* Heading */}
          <div aria-live="polite">
            <h1 className="max-w-xl text-balance font-display text-4xl font-extrabold leading-[1.12] text-slate-950 sm:text-5xl lg:text-6xl tracking-tight">
              {slide.title}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-alina-600 via-rose-600 to-amber-600">
                {slide.highlight}
              </span>
            </h1>
            <p className="mt-4 max-w-xl text-pretty text-sm sm:text-base leading-relaxed text-slate-600">
              {slide.body}
            </p>
          </div>

          {/* Features Checkpoints */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
            {slide.features.map((feat) => (
              <span
                key={feat}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white/90 border border-slate-200/80 px-2.5 py-1 rounded-lg shadow-2xs"
              >
                <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0" />
                <span>{feat}</span>
              </span>
            ))}
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center gap-3 pt-2">
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

          {/* Slider Controls */}
          <div className="flex items-center gap-4 pt-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => move(-1)}
                aria-label="Promoción anterior"
                className="flex size-9 items-center justify-center rounded-full border border-slate-300 bg-white/90 text-slate-700 transition-all hover:border-alina-400 hover:text-alina-700 hover:scale-105 shadow-2xs"
              >
                <ChevronLeft className="size-4" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => move(1)}
                aria-label="Siguiente promoción"
                className="flex size-9 items-center justify-center rounded-full border border-slate-300 bg-white/90 text-slate-700 transition-all hover:border-alina-400 hover:text-alina-700 hover:scale-105 shadow-2xs"
              >
                <ChevronRight className="size-4" aria-hidden="true" />
              </button>
            </div>

            {/* Slide indicators */}
            <div className="flex items-center gap-2" role="tablist" aria-label="Líneas de producto">
              {slides.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={activeSlide === index}
                  aria-label={`Ver diapositiva ${index + 1}: ${item.eyebrow}`}
                  onClick={() => setActiveSlide(index)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-300",
                    activeSlide === index
                      ? "w-8 bg-alina-600 shadow-xs"
                      : "w-2 bg-slate-300 hover:bg-slate-400"
                  )}
                />
              ))}
            </div>

            <span className="text-[11px] font-semibold text-slate-400">
              0{activeSlide + 1} / 0{slides.length}
            </span>
          </div>
        </div>

        {/* Right Column: 3D Product Bouquet (Buke de Productos Reales) */}
        <div className="lg:col-span-6 relative flex items-center justify-center">
          <div className="relative w-full max-w-lg aspect-[4/3] sm:aspect-[16/11] flex items-center justify-center p-4">
            
            {/* Ambient soft glow aura */}
            <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-alina-400/20 via-pink-300/20 to-amber-200/20 blur-2xl pointer-events-none" />

            {/* Satellite 1: Top-Left floating card */}
            <div className="absolute -top-1 left-0 sm:left-2 z-20 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-lg p-2.5 flex items-center gap-3 transition-transform duration-300 hover:scale-105 group animate-in fade-in slide-in-from-top-2">
              <div className="relative size-12 sm:size-14 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0 flex items-center justify-center p-1">
                <Image
                  src={slide.satellites[0].image}
                  alt={slide.satellites[0].title}
                  width={56}
                  height={56}
                  className="object-contain size-full transition-transform group-hover:scale-110"
                />
              </div>
              <div className="pr-1">
                <span className="text-[10px] font-bold text-alina-600 uppercase tracking-wider block">
                  {slide.satellites[0].tag}
                </span>
                <p className="text-xs font-bold text-slate-900 leading-tight">
                  {slide.satellites[0].title}
                </p>
              </div>
            </div>

            {/* Satellite 2: Bottom-Right floating card */}
            <div className="absolute -bottom-1 right-0 sm:right-2 z-20 bg-white/95 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-lg p-2.5 flex items-center gap-3 transition-transform duration-300 hover:scale-105 group animate-in fade-in slide-in-from-bottom-2">
              <div className="relative size-12 sm:size-14 rounded-xl bg-slate-50 border border-slate-100 overflow-hidden shrink-0 flex items-center justify-center p-1">
                <Image
                  src={slide.satellites[1].image}
                  alt={slide.satellites[1].title}
                  width={56}
                  height={56}
                  className="object-contain size-full transition-transform group-hover:scale-110"
                />
              </div>
              <div className="pr-1">
                <span className="text-[10px] font-bold text-alina-600 uppercase tracking-wider block">
                  {slide.satellites[1].tag}
                </span>
                <p className="text-xs font-bold text-slate-900 leading-tight">
                  {slide.satellites[1].title}
                </p>
              </div>
            </div>

            {/* Satellite 3: Bottom-Left compact badge (Desktop only) */}
            <div className="absolute bottom-6 -left-3 sm:-left-4 z-10 hidden sm:flex bg-white/90 backdrop-blur-md rounded-xl border border-slate-200/80 shadow-md p-2 items-center gap-2 transition-transform duration-300 hover:scale-105">
              <div className="relative size-9 rounded-lg bg-slate-50 border border-slate-100 overflow-hidden shrink-0 flex items-center justify-center p-0.5">
                <Image
                  src={slide.satellites[2].image}
                  alt={slide.satellites[2].title}
                  width={36}
                  height={36}
                  className="object-contain size-full"
                />
              </div>
              <span className="text-[11px] font-semibold text-slate-700 pr-1">
                {slide.satellites[2].title}
              </span>
            </div>

            {/* Central Hero Product Card of the Bouquet */}
            <div className="relative z-10 w-64 sm:w-72 md:w-80 rounded-[2rem] border-4 border-white bg-white/95 p-5 shadow-2xl backdrop-blur-md text-center transition-all duration-300 hover:scale-[1.03]">
              
              {/* Top pill badge */}
              <div className="inline-flex items-center gap-1.5 rounded-full bg-alina-50 border border-alina-200/80 px-3 py-1 text-[11px] font-bold text-alina-700 shadow-2xs mb-3">
                <Sparkles className="size-3 text-alina-500" />
                <span>{slide.heroProduct.badge}</span>
              </div>

              {/* Central High-Res Product Image */}
              <div className="relative aspect-square w-full max-h-52 sm:max-h-60 overflow-hidden rounded-2xl bg-slate-50/80 flex items-center justify-center p-3 border border-slate-100">
                <Image
                  src={slide.heroProduct.image}
                  alt={slide.heroProduct.title}
                  fill
                  sizes="(max-width: 768px) 70vw, 350px"
                  className="object-contain p-2 filter drop-shadow-md transition-transform duration-500 hover:scale-110"
                  priority={activeSlide === 0}
                />
              </div>

              {/* Bottom Details */}
              <div className="mt-3">
                <h3 className="font-display text-sm sm:text-base font-bold text-slate-900 leading-tight">
                  {slide.heroProduct.title}
                </h3>
                <p className="text-[11px] text-slate-500 mt-1 font-medium">
                  {slide.heroProduct.spec}
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

