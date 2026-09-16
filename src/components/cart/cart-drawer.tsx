'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/cart-context";
import { formatCurrency } from "@/lib/utils";
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";

export function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeItem, subtotal } = useCart();
  const router = useRouter();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-alina-600" />
              <h2 className="font-display font-bold text-lg text-slate-900">Tu Carrito</h2>
              <span className="bg-alina-50 text-alina-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-alina-200">
                {items.length} {items.length === 1 ? "ítem" : "ítems"}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto px-6 py-4 divide-y divide-slate-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6">
                <div className="w-16 h-16 bg-alina-50 text-alina-400 rounded-full flex items-center justify-center mb-3">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-display font-semibold text-slate-800 text-base mb-1">
                  Tu carrito está vacío
                </h3>
                <p className="text-slate-500 text-sm max-w-xs mb-6">
                  Explora nuestro catálogo de bases MDF, toppers y cajas para empezar a comprar.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="bg-slate-900 text-white font-medium text-sm px-5 py-2.5 rounded-lg hover:bg-slate-800 transition-colors"
                >
                  Ver Catálogo
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="py-4 flex gap-4">
                  <div className="w-18 h-18 bg-slate-50 border border-slate-100 rounded-lg overflow-hidden shrink-0 flex items-center justify-center relative">
                    <Image
                      src={item.mainImage || "/logo.jpg"}
                      alt={item.productName}
                      width={72}
                      height={72}
                      className="object-contain p-1"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-semibold text-slate-900 text-sm truncate">
                      {item.productName}
                    </h4>

                    <div className="text-xs text-slate-500 mt-0.5 space-y-0.5">
                      <div>Medida: <span className="font-medium text-slate-700">{item.sizeLabel}</span></div>
                      {item.shape && <div>Forma: <span className="font-medium text-slate-700">{item.shape}</span></div>}
                      {item.withLogo && (
                        <span className="inline-block bg-pink-50 text-pink-700 font-semibold px-1.5 py-0.2 rounded text-[10px]">
                          + Logo Grabado
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Controller */}
                      <div className="flex items-center border border-slate-200 rounded-md">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-slate-100 text-slate-600 rounded-l-md"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="w-8 text-center text-xs font-semibold text-slate-800">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-slate-100 text-slate-600 rounded-r-md"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Price & Delete */}
                      <div className="flex items-center gap-3">
                        <span className="font-bold text-sm text-slate-900">
                          {formatCurrency(item.unitPrice * item.quantity)}
                        </span>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-slate-400 hover:text-red-500 transition-colors p-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-slate-100 bg-slate-50 space-y-4">
              <div className="flex justify-between items-baseline">
                <span className="text-slate-600 text-sm">Subtotal estimado:</span>
                <span className="font-display font-bold text-xl text-slate-900">
                  {formatCurrency(subtotal)}
                </span>
              </div>
              <p className="text-xs text-slate-500">
                Los costos de envío e impuestos se calculan al proceder al pago.
              </p>

              <button
                onClick={() => {
                  setIsCartOpen(false);
                  router.push("/checkout");
                }}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-display font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg"
              >
                <span>Proceder al Pago (Shopify Style)</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
