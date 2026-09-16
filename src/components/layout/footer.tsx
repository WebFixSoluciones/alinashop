import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Truck, CreditCard, MessageCircle, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-auto border-t border-slate-800">
      {/* Value props strip */}
      <div className="border-b border-slate-800/80 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <Image
            src="/logo.jpg"
            alt="Alina Shop"
            width={120}
            height={45}
            className="h-10 w-auto object-contain brightness-200 invert mb-4"
          />
          <p className="text-xs leading-relaxed text-slate-400 mb-4">
            Alina Shop es tu aliado en insumos de repostería profesional, bases para tortas en MDF personalizadas, toppers y empaques de alta calidad.
          </p>
          <div className="flex gap-3">
            <a
              href="https://instagram.com/alinashop.ec"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-full bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white text-sm font-semibold mb-3">Líneas de Producto</h4>
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
            <li><Link href="/catalogo" className="hover:text-white">Lista de Precios Mayorista</Link></li>
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
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-alina-400"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              <span>@alinashop.ec</span>
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
