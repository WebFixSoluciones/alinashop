import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Truck, CreditCard, MessageCircle, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto border-t border-slate-800">
      {/* Value props strip */}
      <div className="border-b border-slate-800/80 py-8">
        <div className="w-[90%] min-w-[80%] max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-800 text-alina-400 flex items-center justify-center shrink-0">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">Envíos a Nivel Nacional</h4>
              <p className="text-xs text-slate-400">Servientrega, Laar y Cooperativas</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-800 text-alina-400 flex items-center justify-center shrink-0">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">Pagos con Tarjeta</h4>
              <p className="text-xs text-slate-400">Botón de pago seguro Payphone</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-800 text-alina-400 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">Corte Láser MDF 3mm</h4>
              <p className="text-xs text-slate-400">Alta precisión y grado alimenticio</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-slate-800 text-alina-400 flex items-center justify-center shrink-0">
              <MessageCircle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-white text-sm font-semibold">Pedidos por WhatsApp</h4>
              <p className="text-xs text-slate-400">Atención personalizada inmediata</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main footer */}
      <div className="w-[90%] min-w-[80%] max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Image
            src="/logo.jpg"
            alt="Alina Shop"
            width={200}
            height={70}
            className="h-14 md:h-16 w-auto object-contain brightness-200 invert mb-4"
          />
          <p className="text-xs leading-relaxed text-slate-400 mb-4">
            Alina Shop es tu aliado en insumos de repostería profesional, bases para tortas en MDF personalizadas, toppers y empaques de alta calidad.
          </p>
          <div className="flex items-center gap-2.5">
            <a
              href="https://facebook.com/alinashop.ec"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook de Alina Shop"
              className="w-9 h-9 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-[#1877F2] flex items-center justify-center transition-colors"
              title="Facebook Alina Shop"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a
              href="https://instagram.com/alinashop.ec"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram de Alina Shop"
              className="w-9 h-9 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] flex items-center justify-center transition-colors"
              title="Instagram @alinashop.ec"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
            <a
              href="https://tiktok.com/@alinashop.ec"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok de Alina Shop"
              className="w-9 h-9 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-black flex items-center justify-center transition-colors"
              title="TikTok @alinashop.ec"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
              </svg>
            </a>
            <a
              href="https://wa.me/593985890956"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp de Alina Shop"
              className="w-9 h-9 rounded-full bg-slate-800 text-slate-300 hover:text-white hover:bg-emerald-600 flex items-center justify-center transition-colors"
              title="WhatsApp: 0985890956"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-3">Líneas de la Tienda</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/catalogo?categoria=bases-mdf" className="hover:text-white">Bases de Torta MDF</Link></li>
            <li><Link href="/catalogo?categoria=minibases" className="hover:text-white">Minibases Cheesecake</Link></li>
            <li><Link href="/catalogo?categoria=bases-rectangulares" className="hover:text-white">Bases Rectangulares</Link></li>
            <li><Link href="/catalogo?categoria=toppers" className="hover:text-white">Toppers Acrílico y Vinil</Link></li>
            <li><Link href="/catalogo?categoria=cajas" className="hover:text-white">Cajas de Acetato y Cupcakes</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-3">Atención al Cliente</h4>
          <ul className="space-y-2 text-xs">
            <li><Link href="/rastreo" className="hover:text-white">Seguimiento de Envíos</Link></li>
            <li><Link href="/catalogo" className="hover:text-white">Precios Mayoristas en Tienda</Link></li>
            <li><Link href="/admin/login" className="hover:text-white">Acceso Administrador</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-3">Contacto Oficial</h4>
          <ul className="space-y-2 text-xs">
            <li className="flex items-center gap-2">
              <Phone className="w-3.5 h-3.5 text-alina-400" />
              <span>0985890956 / 0979431238</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 flex items-center justify-center text-alina-400">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </span>
              <a href="https://facebook.com/alinashop.ec" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Facebook: Alina Shop
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 flex items-center justify-center text-alina-400">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </span>
              <a href="https://instagram.com/alinashop.ec" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                Instagram: @alinashop.ec
              </a>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 flex items-center justify-center text-alina-400">
                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
                </svg>
              </span>
              <a href="https://tiktok.com/@alinashop.ec" target="_blank" rel="noopener noreferrer" className="hover:text-white">
                TikTok: @alinashop.ec
              </a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-alina-400" />
              <span>Envíos a todo el Ecuador</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 py-6 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} Alina Shop — Insumos de Repostería. Todos los derechos reservados.
      </div>
    </footer>
  );
}
