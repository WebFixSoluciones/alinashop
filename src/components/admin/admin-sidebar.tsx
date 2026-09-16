'use client';

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  TrendingUp,
  Settings,
  LogOut,
  Shield,
  ExternalLink
} from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();

  const navItems = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Pedidos y Envíos", href: "/admin/pedidos", icon: ShoppingBag },
    { label: "Catálogo de Productos", href: "/admin/productos", icon: Package },
    { label: "Analítica WhatsApp", href: "/admin/analitica", icon: TrendingUp },
    { label: "Ajustes de Tienda", href: "/admin/ajustes", icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 min-h-screen border-r border-slate-800">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center p-1.5 border border-slate-700">
            <Image src="/logo.jpg" alt="Alina" width={30} height={30} className="object-contain brightness-200 invert" />
          </div>
          <div>
            <span className="font-display font-bold text-white text-sm tracking-tight block">Alina Shop</span>
            <span className="text-[10px] text-slate-400 font-mono flex items-center gap-1">
              <Shield className="w-2.5 h-2.5 text-emerald-400" />
              Panel Administrador
            </span>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                isActive
                  ? "bg-alina-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-white hover:bg-slate-800/80"
              }`}
            >
              <Icon className="w-4 h-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Store link & Logout */}
      <div className="p-4 border-t border-slate-800 space-y-2 text-xs">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <span>Ver Tienda en Vivo</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
        <button
          onClick={async () => {
            await fetch("/api/admin/logout", { method: "POST" });
            window.location.href = "/admin/login";
          }}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
