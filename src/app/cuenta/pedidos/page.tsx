'use client';

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { formatCurrency } from "@/lib/utils";
import { ShoppingBag, Truck, RotateCcw, Package, Clock, CheckCircle2, ArrowRight } from "lucide-react";

export default function CustomerOrdersDashboard() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem("alina_customer_orders");
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setOrders(parsed);
        }
      }
    } catch {}
  }, []);

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

        {/* Orders List / Empty State */}
        {orders.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-3xl p-12 text-center max-w-md mx-auto space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-pink-50 text-alina-600 flex items-center justify-center mx-auto shadow-xs">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <div>
              <h2 className="font-display font-bold text-base text-slate-900">
                Aún no tienes pedidos registrados
              </h2>
              <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                Cuando realices compras en Alina Shop con Payphone o por WhatsApp, podrás seguir tus envíos con Servientrega y consultar el historial aquí.
              </p>
            </div>
            <Link
              href="/catalogo"
              className="inline-flex items-center gap-2 bg-slate-900 hover:bg-black text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm"
            >
              <span>Explorar Catálogo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((ord: any) => (
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
        )}
      </main>

      <Footer />
    </div>
  );
}
