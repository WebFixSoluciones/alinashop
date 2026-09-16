'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/cart-context";
import { ShoppingBag, Search, Phone, ShieldCheck, Menu, X, UserRound, MapPinned } from "lucide-react";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = query.trim();
    router.push(value ? `/catalogo?busqueda=${encodeURIComponent(value)}` : "/catalogo");
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 border-b border-slate-100 bg-white/95 backdrop-blur-md">
      {/* Top microbar */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Envíos a todo el Ecuador · Servientrega y Laar
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/593985890956"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors flex items-center gap-1"
            >
              <Phone className="w-3 h-3 text-emerald-400" />
              WhatsApp: 0985890956 / 0979431238
            </a>
            <Link href="/rastreo" className="hover:text-white transition-colors">
              Rastrear Pedido
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image
            src="/logo.jpg"
            alt="Alina Shop - Insumos de Repostería"
            width={140}
            height={50}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-5 text-sm font-medium text-slate-700 lg:flex">
          <Link href="/catalogo" className="hover:text-alina-600 transition-colors">
            Catálogo Completo
          </Link>
          <Link href="/catalogo?categoria=bases-mdf" className="hover:text-alina-600 transition-colors">
            Bases MDF
          </Link>
          <Link href="/catalogo?categoria=toppers" className="hover:text-alina-600 transition-colors">
            Toppers
          </Link>
          <Link href="/catalogo?categoria=cajas" className="hover:text-alina-600 transition-colors">
            Cajas
          </Link>
          <Link href="/catalogo?categoria=complementos" className="hover:text-alina-600 transition-colors">
            Utensilios
          </Link>
        </nav>

        <div className="hidden min-w-0 flex-1 justify-end gap-3 md:flex">
          <form onSubmit={submitSearch} className="flex min-w-0 max-w-xs flex-1 items-center rounded-xl border border-slate-200 bg-slate-50 px-3 transition-colors focus-within:border-alina-400 focus-within:bg-white">
            <Search className="size-4 shrink-0 text-slate-400" aria-hidden="true" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar bases, toppers..." aria-label="Buscar en el catálogo" className="min-w-0 flex-1 bg-transparent px-2 py-2.5 text-xs text-slate-900 outline-none placeholder:text-slate-400" />
          </form>
          <Link href="/login" className="hidden items-center gap-2 rounded-xl px-2 py-2 text-xs font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-alina-700 xl:flex">
            <UserRound className="size-4" aria-hidden="true" />
            Ingresar
          </Link>
          <Link href="/rastreo" aria-label="Rastrear pedido" className="flex items-center justify-center rounded-xl px-2 py-2 text-slate-700 transition-colors hover:bg-slate-50 hover:text-alina-700">
            <MapPinned className="size-5" aria-hidden="true" />
          </Link>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-2 rounded-xl p-2 text-slate-800 transition-colors hover:bg-slate-50 hover:text-alina-600"
            aria-label="Abrir carrito"
          >
            <ShoppingBag className="size-5" aria-hidden="true" />
            {totalItems > 0 && (
                <span className="absolute -right-1 -top-1 flex size-5 items-center justify-center rounded-full bg-alina-600 text-[11px] font-bold text-white shadow-sm">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {mobileMenuOpen && (
        <div className="space-y-3 border-t border-slate-100 bg-white px-4 pb-6 pt-3 md:hidden">
          <form onSubmit={submitSearch} className="flex items-center rounded-xl border border-slate-200 bg-slate-50 px-3 focus-within:border-alina-400 focus-within:bg-white">
            <Search className="size-4 text-slate-400" aria-hidden="true" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar en catálogo" aria-label="Buscar en el catálogo" className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm outline-none" />
          </form>
          <Link
            href="/catalogo"
            className="block py-2 text-sm font-medium text-slate-800"
            onClick={() => setMobileMenuOpen(false)}
          >
            Catálogo Completo
          </Link>
          <Link
            href="/catalogo?categoria=bases-mdf"
            className="block py-2 text-sm font-medium text-slate-800"
            onClick={() => setMobileMenuOpen(false)}
          >
            Bases MDF
          </Link>
          <Link
            href="/catalogo?categoria=toppers"
            className="block py-2 text-sm font-medium text-slate-800"
            onClick={() => setMobileMenuOpen(false)}
          >
            Toppers
          </Link>
          <Link
            href="/catalogo?categoria=cajas"
            className="block py-2 text-sm font-medium text-slate-800"
            onClick={() => setMobileMenuOpen(false)}
          >
            Cajas
          </Link>
          <Link
            href="/rastreo"
            className="block py-2 text-sm font-medium text-alina-600 font-semibold"
            onClick={() => setMobileMenuOpen(false)}
          >
            Rastrear mi Pedido
          </Link>
          <Link href="/login" className="block py-2 text-sm font-semibold text-alina-600" onClick={() => setMobileMenuOpen(false)}>
            Ingresar o crear cuenta
          </Link>
        </div>
      )}
    </header>
  );
}
