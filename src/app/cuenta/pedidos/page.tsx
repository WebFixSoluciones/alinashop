'use client';

import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { formatCurrency } from "@/lib/utils";
import { ShoppingBag, Truck, RotateCcw, Package, Clock, CheckCircle2 } from "lucide-react";

export default function CustomerOrdersDashboard() {
  const orders = [
    {
      id: "ALN-2026-1082",
      date: "15 de Septiembre, 2026",
      status: "PAGADO",
      total: 20.16,
      items: "24x Base de Torta MDF Rizada 20cm (Blanco + Logo)",
      courier: "Servientrega Ecuador",
      trackingNumber: "SER-9823471029",
    },
    {
      id: "ALN-2026-1045",
      date: "28 de Agosto, 2026",
      status: "ENTREGADO",
      total: 35.50,
      items: "50x Base de Torta MDF Redonda 22cm + 10x Topper Acrílico",
      courier: "Servientrega Ecuador",
      trackingNumber: "SER-9721498110",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5 mb-8">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-alina-600">Mi Cuenta</span>
            <h1 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 mt-0.5">
              Historial de Pedidos
            </h1>
            <p className="text-xs text-slate-500 mt-0.5">
              Revisa el estado de tus compras y vuelve a pedir insumos con un solo clic.
            </p>
          </div>

          <Link
            href="/catalogo"
            className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-colors"
          >
            Hacer Nuevo Pedido
          </Link>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.map((ord) => (
            <div
              key={ord.id}
              className="bg-white border border-slate-200 rounded-2xl p-6 shadow-2xs space-y-4"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <span className="font-display font-bold text-base text-slate-900">
                    Orden {ord.id}
                  </span>
                  <span className="text-xs text-slate-400">· {ord.date}</span>
                </div>

                <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${
                  ord.status === "ENTREGADO"
                    ? "bg-slate-100 text-slate-800 border-slate-200"
                    : "bg-emerald-50 text-emerald-800 border-emerald-200"
                }`}>
                  {ord.status === "ENTREGADO" ? "Entregado" : "Pagado (En Taller)"}
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="text-xs font-semibold text-slate-800">{ord.items}</div>
                  {ord.trackingNumber && (
                    <div className="text-xs text-blue-700 flex items-center gap-1.5">
                      <Truck className="w-3.5 h-3.5" />
                      <span>{ord.courier} · Guía: <strong>{ord.trackingNumber}</strong></span>
                    </div>
                  )}
                </div>

                <div className="text-right">
                  <div className="text-[11px] text-slate-400">Total:</div>
                  <div className="font-display font-extrabold text-lg text-slate-900">
                    {formatCurrency(ord.total)}
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex justify-end gap-2">
                <Link
                  href="/rastreo"
                  className="border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors"
                >
                  <Truck className="w-3.5 h-3.5" />
                  <span>Rastrear Envío</span>
                </Link>

                <Link
                  href="/catalogo"
                  className="bg-alina-600 hover:bg-alina-700 text-white text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1 transition-colors shadow-2xs"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Volver a Pedir</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
