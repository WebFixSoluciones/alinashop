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
        <div className="w-[90%] min-w-[80%] max-w-[1720px] mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Envíos a todo el Ecuador · Servientrega y Laar
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 pr-2 border-r border-slate-700">
              <a
                href="https://facebook.com/alinashop.ec"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Alina Shop"
                className="text-slate-400 hover:text-[#1877F2] transition-colors p-1"
                title="Facebook"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
              <a
                href="https://instagram.com/alinashop.ec"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Alina Shop"
                className="text-slate-400 hover:text-pink-400 transition-colors p-1"
                title="Instagram"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a
                href="https://tiktok.com/@alinashop.ec"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Alina Shop"
                className="text-slate-400 hover:text-white transition-colors p-1"
                title="TikTok"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </a>
            </div>
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
      <div className="mx-auto flex h-24 w-[90%] min-w-[80%] max-w-[1720px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 py-2 group">
          <Image
            src="/logo.jpg"
            alt="Alina Shop - Insumos de Repostería"
            width={240}
            height={80}
            className="h-16 md:h-20 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
            priority
          />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-6 text-sm font-semibold text-slate-700 lg:flex">
          <Link href="/catalogo" className="hover:text-alina-600 transition-colors">
            Tienda Completa
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
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar bases, toppers..." aria-label="Buscar en la tienda" className="min-w-0 flex-1 bg-transparent px-2 py-2.5 text-xs text-slate-900 outline-none placeholder:text-slate-400" />
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
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar en la tienda..." aria-label="Buscar en la tienda" className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm outline-none" />
          </form>
          <Link
            href="/catalogo"
            className="block py-2 text-sm font-medium text-slate-800"
            onClick={() => setMobileMenuOpen(false)}
          >
            Tienda Completa
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

          {/* Redes Sociales en Móvil */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-around">
            <a
              href="https://facebook.com/alinashop.ec"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 hover:text-[#1877F2]"
            >
              <svg className="w-4 h-4 fill-[#1877F2]" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
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
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
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
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
              <span>TikTok</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
