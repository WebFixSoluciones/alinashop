'use client';

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/context/cart-context";
import { ShoppingBag, Search, Phone, ShieldCheck, Menu, X } from "lucide-react";

export function Navbar() {
  const { totalItems, setIsCartOpen } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
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
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-700">
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

        {/* Actions (Search, Tracking, Cart) */}
        <div className="flex items-center gap-3">
          <Link
            href="/catalogo"
            className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="Buscar en catálogo"
          >
            <Search className="w-5 h-5" />
          </Link>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 text-slate-800 hover:text-alina-600 hover:bg-slate-100 rounded-lg transition-colors flex items-center gap-2"
            aria-label="Abrir carrito"
          >
            <ShoppingBag className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-alina-600 text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile navigation panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3">
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
        </div>
      )}
    </header>
  );
}
