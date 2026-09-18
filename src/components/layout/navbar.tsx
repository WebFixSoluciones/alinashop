'use client';

import React, { useState, useRef, useEffect, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import {
  ShoppingBag,
  Search,
  ShieldCheck,
  Menu,
  X,
  UserRound,
  MapPinned,
  LayoutGrid,
  ChevronDown,
  Boxes,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import { CATEGORIES_DATA, PRODUCTS_DATA, SeedProduct } from "@/lib/catalog-data";
import { formatCurrency, cn } from "@/lib/utils";
import { PromotionTicker } from "@/components/layout/promotion-ticker";

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

function getProductPriceInfo(product: SeedProduct) {
  const validUnits =
    product.variants?.map((v) => Number(v.unitPrice)).filter((p) => !isNaN(p) && p > 0) || [];
  const lowestUnit = validUnits.length > 0 ? Math.min(...validUnits) : 0.2;

  const validWholesale =
    product.variants?.map((v) => Number(v.wholesalePrice)).filter((p) => !isNaN(p) && p > 0) || [];
  const lowestWholesale =
    validWholesale.length > 0 ? Math.min(...validWholesale) : Number((lowestUnit * 0.75).toFixed(2));

  return { lowestUnit, lowestWholesale };
}

function highlightMatch(text: string, query: string) {
  if (!query) return text;
  const index = text.toLowerCase().indexOf(query.toLowerCase());
  if (index === -1) return text;
  const before = text.slice(0, index);
  const match = text.slice(index, index + query.length);
  const after = text.slice(index + query.length);
  return (
    <>
      {before}
      <span className="text-alina-600 font-extrabold underline decoration-alina-300">{match}</span>
      {after}
    </>
  );
}

export function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const searchContainerRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchFocused(false);
      }
      if (megaMenuRef.current && !megaMenuRef.current.contains(event.target as Node)) {
        setMegaMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Live Search Matching Products
  const searchMatches = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return PRODUCTS_DATA.filter((p) => {
      const inName = p.name.toLowerCase().includes(q);
      const inSku = p.sku.toLowerCase().includes(q);
      const inDesc = p.description?.toLowerCase().includes(q);
      const inMaterial = p.material?.toLowerCase().includes(q);
      const inCat = p.categorySlug?.toLowerCase().includes(q);
      const inVariants = p.variants?.some((v) =>
        v.shape?.toLowerCase().includes(q) || v.sizeLabel?.toLowerCase().includes(q)
      );
      return inName || inSku || inDesc || inMaterial || inCat || inVariants;
    }).slice(0, 6);
  }, [query]);

  // Total matches count
  const totalMatchesCount = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return 0;
    return PRODUCTS_DATA.filter((p) => {
      return (
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.categorySlug?.toLowerCase().includes(q)
      );
    }).length;
  }, [query]);

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = query.trim();
    setIsSearchFocused(false);
    setMobileMenuOpen(false);
    router.push(value ? `/catalogo?busqueda=${encodeURIComponent(value)}` : "/catalogo");
  };

  const handleSelectProduct = (slug: string) => {
    setIsSearchFocused(false);
    setQuery("");
    router.push(`/producto/${slug}`);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur-md">
      {/* Top microbar in pure deep black with centered promotional carousel */}
      <div className="bg-black text-neutral-300 text-xs py-2 px-3 sm:px-4 border-b border-neutral-900 overflow-hidden">
        <div className="w-full max-w-[1720px] mx-auto flex justify-center items-center">
          <PromotionTicker />
        </div>
      </div>

      {/* Main Navbar */}
      <div className="mx-auto flex h-20 md:h-24 w-[90%] min-w-[80%] max-w-[1720px] items-center justify-between gap-3 sm:gap-5 px-4 sm:px-6 lg:px-8 relative">
        
        {/* 1. Brand Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 py-2 group">
          <Image
            src="/logo.jpg"
            alt="Alina Shop - Insumos de Repostería"
            width={240}
            height={80}
            className="h-14 sm:h-16 md:h-18 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            priority
          />
        </Link>

        {/* 2. "Todos nuestros productos" + Mega Menú de Categorías */}
        <div ref={megaMenuRef} className="relative hidden lg:block shrink-0">
          <button
            type="button"
            onClick={() => setMegaMenuOpen(!megaMenuOpen)}
            onMouseEnter={() => setMegaMenuOpen(true)}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-slate-100/90 hover:bg-slate-200/80 px-4 text-sm font-semibold text-slate-800 transition-all shadow-2xs hover:shadow-xs cursor-pointer group shrink-0"
            aria-expanded={megaMenuOpen}
            aria-haspopup="true"
          >
            <LayoutGrid className="size-4.5 text-alina-600 group-hover:rotate-90 transition-transform duration-300 shrink-0" />
            <span className="whitespace-nowrap">Todos nuestros productos</span>
            <ChevronDown
              className={cn("size-4 text-slate-500 transition-transform duration-200 shrink-0", megaMenuOpen && "rotate-180")}
            />
          </button>

          {/* Mega Menú Panel */}
          {megaMenuOpen && (
            <div
              onMouseLeave={() => setMegaMenuOpen(false)}
              className="absolute top-full left-0 mt-2 w-[720px] lg:w-[800px] bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
            >
              <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                <div>
                  <h3 className="font-display font-bold text-sm text-slate-900 flex items-center gap-2">
                    <Sparkles className="size-4 text-alina-600" />
                    <span>Catálogo Oficial de Insumos Alina Shop</span>
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Selecciona una categoría para explorar medidas, formas y precios al por mayor
                  </p>
                </div>
                <Link
                  href="/catalogo"
                  onClick={() => setMegaMenuOpen(false)}
                  className="text-xs font-bold text-alina-600 hover:text-alina-700 flex items-center gap-1 transition-colors"
                >
                  <span>Ver toda la tienda</span>
                  <ArrowRight className="size-3.5" />
                </Link>
              </div>

              {/* 8 Categories Grid in Mega Menu */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {CATEGORIES_DATA.map((cat) => {
                  const img = categoryImages[cat.slug] || "/logo.jpg";
                  return (
                    <Link
                      key={cat.slug}
                      href={`/catalogo?categoria=${cat.slug}`}
                      onClick={() => setMegaMenuOpen(false)}
                      className="group/item flex flex-col p-3 rounded-2xl border border-slate-100 bg-slate-50/60 hover:bg-alina-50/50 hover:border-alina-300 transition-all text-center items-center hover:shadow-sm"
                    >
                      <div className="relative size-16 rounded-xl bg-white p-1 border border-slate-200/70 overflow-hidden flex items-center justify-center mb-2 group-hover/item:scale-110 transition-transform">
                        <Image src={img} alt={cat.name} fill className="object-contain p-1" />
                      </div>
                      <span className="font-display font-bold text-xs text-slate-800 group-hover/item:text-alina-600 transition-colors leading-tight line-clamp-2">
                        {cat.name}
                      </span>
                    </Link>
                  );
                })}
              </div>

              {/* Mega Menu Footer Banner */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs bg-slate-50/80 rounded-xl px-4 py-2.5">
                <span className="text-slate-600 font-medium flex items-center gap-1.5">
                  <span className="size-2 rounded-full bg-emerald-500" />
                  <span>Corte láser de alta precisión y personalización con logo grabado</span>
                </span>
                <span className="font-bold text-slate-900">Envíos a todo el Ecuador</span>
              </div>
            </div>
          )}
        </div>

        {/* 3. Buscador de productos TODO CENTRADO con sugerencias en tiempo real */}
        <div ref={searchContainerRef} className="flex-1 min-w-[240px] max-w-2xl xl:max-w-3xl relative">
          <form
            onSubmit={submitSearch}
            className="flex h-11 items-center rounded-xl border border-slate-200 bg-slate-50/80 px-4 transition-all focus-within:border-alina-500 focus-within:bg-white focus-within:shadow-md focus-within:ring-2 focus-within:ring-alina-100"
          >
            <Search className="size-4.5 shrink-0 text-slate-400" aria-hidden="true" />
            <input
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setIsSearchFocused(true);
              }}
              onFocus={() => setIsSearchFocused(true)}
              placeholder="Buscar bases, toppers, cajas, medidas..."
              aria-label="Buscar en la tienda"
              className="min-w-0 flex-1 bg-transparent px-3 text-sm text-slate-900 outline-none placeholder:text-slate-400 font-medium"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-slate-400 hover:text-slate-600 p-1"
                title="Borrar búsqueda"
              >
                <X className="size-4" />
              </button>
            )}
          </form>

          {/* Dropdown de Sugerencias en Vivo (Autocompletado al escribir cualquier letra) */}
          {isSearchFocused && query.trim().length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl border border-slate-200/90 shadow-2xl p-3 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100 text-xs font-semibold text-slate-500 px-1">
                <span>
                  Sugerencias para &ldquo;<strong className="text-slate-800">{query.trim()}</strong>&rdquo;
                </span>
                <span>{totalMatchesCount} resultados</span>
              </div>

              {searchMatches.length > 0 ? (
                <div className="space-y-1.5 max-h-80 overflow-y-auto pr-1 scrollbar-none">
                  {searchMatches.map((product) => {
                    const { lowestUnit, lowestWholesale } = getProductPriceInfo(product);
                    return (
                      <div
                        key={product.slug || product.sku}
                        onClick={() => handleSelectProduct(product.slug)}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-50 hover:border-alina-200 border border-transparent transition-all cursor-pointer group"
                      >
                        <div className="relative size-12 rounded-lg bg-slate-50 border border-slate-200/80 overflow-hidden shrink-0 flex items-center justify-center p-1">
                          <Image
                            src={product.mainImage}
                            alt={product.name}
                            width={48}
                            height={48}
                            className="object-contain size-full"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-slate-900 truncate group-hover:text-alina-600 transition-colors">
                            {highlightMatch(product.name, query.trim())}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5 text-xs">
                            <span className="font-bold text-slate-900">
                              {formatCurrency(lowestUnit)}
                              <span className="font-normal text-slate-400 text-[11px] ml-0.5">c/u</span>
                            </span>
                            <span className="text-slate-300">·</span>
                            <span className="font-bold text-emerald-700">
                              Mayor: {formatCurrency(lowestWholesale)}
                            </span>
                          </div>
                        </div>
                        <ArrowRight className="size-4 text-slate-300 group-hover:text-alina-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                      </div>
                    );
                  })}

                  <div className="pt-2 border-t border-slate-100">
                    <button
                      type="button"
                      onClick={() => {
                        setIsSearchFocused(false);
                        router.push(`/catalogo?busqueda=${encodeURIComponent(query.trim())}`);
                      }}
                      className="w-full text-center py-2.5 text-xs sm:text-sm font-bold text-alina-600 hover:text-alina-700 hover:bg-alina-50 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                    >
                      <span>Ver todos los resultados ({totalMatchesCount}) en el catálogo</span>
                      <ArrowRight className="size-3.5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 text-center">
                  <p className="text-sm text-slate-600">
                    No encontramos productos que coincidan con &ldquo;{query}&rdquo;.
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    Presiona Enter o busca por forma (rizada, redonda) o material.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* 5. Ingresar + 6. Rastreo + 7. Cesta */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
          {/* 5. Ingresar */}
          <Link
            href="/login"
            className="hidden md:inline-flex h-11 items-center gap-2 rounded-xl px-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors shrink-0"
          >
            <UserRound className="size-4.5 text-slate-500" />
            <span>Ingresar</span>
          </Link>

          {/* 6. Rastreo */}
          <Link
            href="/rastreo"
            aria-label="Rastrear pedido"
            title="Rastrear Pedido"
            className="inline-flex h-11 items-center gap-2 rounded-xl px-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors shrink-0"
          >
            <MapPinned className="size-4.5 text-slate-500" />
            <span className="hidden sm:inline">Rastreo</span>
          </Link>

          {/* 7. Cesta */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex h-11 items-center justify-center rounded-xl px-3.5 text-slate-800 hover:bg-slate-100 hover:text-alina-600 transition-colors cursor-pointer shrink-0"
            aria-label="Abrir carrito"
          >
            <ShoppingBag className="size-5.5" aria-hidden="true" />
            {totalItems > 0 && (
              <span className="absolute 1 -top-0.5 right-1 flex size-5 items-center justify-center rounded-full bg-alina-600 text-[11px] font-bold text-white shadow-xs">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg cursor-pointer"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {mobileMenuOpen && (
        <div className="space-y-4 border-t border-slate-100 bg-white px-4 pb-6 pt-3 lg:hidden max-h-[85vh] overflow-y-auto">
          {/* Mobile search */}
          <form onSubmit={submitSearch} className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-alina-500 focus-within:bg-white">
            <Search className="size-4 text-slate-400" aria-hidden="true" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar en la tienda..."
              aria-label="Buscar en la tienda"
              className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm outline-none"
            />
          </form>

          {/* Mobile "Compra al por Mayor" */}
          <a
            href="https://wa.me/593985890956?text=Hola%20Alina%20Shop,%20deseo%20comprar%20al%20por%20mayor%20para%20mi%20pasteler%C3%ADa.%20%C2%BFMe%20pueden%20ayudar%20con%20precios%20de%20f%C3%A1brica%20y%20cat%C3%A1logo?"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 p-3 rounded-xl bg-emerald-50 border border-emerald-300/80 text-emerald-900 font-semibold text-sm hover:bg-emerald-100 transition-colors"
          >
            <Boxes className="size-4.5 text-emerald-600 shrink-0" />
            <span>Compra por Mayor</span>
          </a>

          {/* Mobile Categories Accordion */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 px-1">
              Todos nuestros productos
            </div>
            <div className="grid grid-cols-2 gap-2">
              {CATEGORIES_DATA.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/catalogo?categoria=${cat.slug}`}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-2 p-2 rounded-xl bg-slate-50 border border-slate-200/80 text-xs font-semibold text-slate-800 hover:text-alina-600 hover:bg-alina-50"
                >
                  <div className="relative size-7 rounded bg-white overflow-hidden shrink-0 flex items-center justify-center">
                    <Image src={categoryImages[cat.slug] || "/logo.jpg"} alt={cat.name} fill className="object-contain p-0.5" />
                  </div>
                  <span className="truncate">{cat.name}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-slate-100 space-y-2">
            <Link
              href="/catalogo"
              className="block py-2 text-sm font-semibold text-slate-800 hover:text-alina-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Tienda Completa
            </Link>
            <Link
              href="/rastreo"
              className="block py-2 text-sm font-semibold text-slate-800 hover:text-alina-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Rastrear mi Pedido
            </Link>
            <Link
              href="/login"
              className="block py-2 text-sm font-semibold text-alina-600"
              onClick={() => setMobileMenuOpen(false)}
            >
              Ingresar o crear cuenta
            </Link>
          </div>

          {/* Redes Sociales en Móvil */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-around">
            <a
              href="https://facebook.com/alinashop.ec"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-[#1877F2]"
            >
              <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span>Facebook</span>
            </a>
            <a
              href="https://instagram.com/alinashop.ec"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-pink-600"
            >
              <svg className="w-4 h-4 fill-[#bc1888]" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>Instagram</span>
            </a>
            <a
              href="https://tiktok.com/@alinashop.ec"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-black"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
              </svg>
              <span>TikTok</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
