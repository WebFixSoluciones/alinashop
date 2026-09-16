'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/context/cart-context";
import { Eye, ArrowUpRight, MessageCircle } from "lucide-react";

interface ProductGridProps {
  products: any[];
}

export function ProductGrid({ products }: ProductGridProps) {
  const { setQuickViewProduct } = useCart();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => {
        const lowestDozen = product.variants?.length
          ? Math.min(...product.variants.map((v: any) => Number(v.dozenPrice)))
          : 0.16;
        const lowestWholesale = product.variants?.length
          ? Math.min(...product.variants.map((v: any) => Number(v.wholesalePrice)))
          : 0.14;

        return (
          <div
            key={product.id || product.slug}
            className="group bg-white border border-slate-200/80 hover:border-alina-300 rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-lg flex flex-col"
          >
            {/* Image Container with Actions */}
            <div className="aspect-square bg-slate-50 relative overflow-hidden flex items-center justify-center p-6">
              <Image
                src={product.mainImage}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-contain p-3 group-hover:scale-105 transition-transform duration-300"
              />

              {product.hasLogoOption && (
                <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-xs text-alina-700 text-[11px] font-bold px-2 py-0.5 rounded-md border border-alina-200 shadow-2xs">
                  + Logo Opcional
                </span>
              )}

              {/* Hover Quick Action Buttons */}
              <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <button
                  type="button"
                  onClick={() => setQuickViewProduct(product)}
                  className="flex-1 bg-white/95 hover:bg-white text-slate-800 text-xs font-semibold py-2 px-3 rounded-lg shadow-sm flex items-center justify-center gap-1.5 transition-colors border border-slate-200"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Vista Rápida</span>
                </button>

                <Link
                  href={`/producto/${product.slug}`}
                  className="bg-slate-900 hover:bg-slate-800 text-white p-2 rounded-lg shadow-sm flex items-center justify-center transition-colors"
                  aria-label={`Ver ${product.name}`}
                  title="Ver producto"
                >
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Content info */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {product.material || "Insumos Pastelería"}
                </span>
                <h3 className="font-display font-semibold text-slate-900 text-sm mt-0.5 line-clamp-1 group-hover:text-alina-600 transition-colors">
                  <Link href={`/producto/${product.slug}`}>
                    {product.name}
                  </Link>
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Pricing breakdown */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-baseline justify-between">
                <div>
                  <div className="text-[11px] text-slate-400 font-medium">Por docena desde:</div>
                  <div className="font-display font-bold text-base text-slate-900">
                    {formatCurrency(lowestDozen)} <span className="text-xs font-normal text-slate-500">c/u</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[11px] text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded">
                    Mayor: {formatCurrency(lowestWholesale)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
