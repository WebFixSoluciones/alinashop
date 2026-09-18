'use client';

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

interface ProductGridProps {
  products: any[];
  className?: string;
}

export function ProductGrid({ products, className }: ProductGridProps) {
  return (
    <div
      className={
        className ||
        "grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5 sm:gap-4.5"
      }
    >
      {products.map((product) => {
        const validUnitPrices = product.variants?.length
          ? product.variants
              .map((v: any) => Number(v.unitPrice ?? v.price))
              .filter((p: number) => !isNaN(p) && p > 0)
          : [];
        const lowestUnit = validUnitPrices.length > 0
          ? Math.min(...validUnitPrices)
          : (Number(product.price) || 0.20);

        const validWholesalePrices = product.variants?.length
          ? product.variants
              .map((v: any) => Number(v.wholesalePrice))
              .filter((p: number) => !isNaN(p) && p > 0)
          : [];
        const lowestWholesale = validWholesalePrices.length > 0
          ? Math.min(...validWholesalePrices)
          : (Number(product.wholesalePrice) || Number((lowestUnit * 0.75).toFixed(2)));

        return (
          <Link
            key={product.id || product.slug}
            href={`/producto/${product.slug}`}
            className="group bg-white border border-slate-200/90 hover:border-alina-400 rounded-2xl overflow-hidden transition-all duration-200 hover:shadow-lg flex flex-col cursor-pointer"
          >
            {/* Image Container with Actions */}
            <div className="aspect-square bg-slate-50 relative overflow-hidden flex items-center justify-center p-4 sm:p-5">
              <Image
                src={product.mainImage}
                alt={product.name}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                className="object-contain p-2 sm:p-3 transition-transform duration-300 ease-out group-hover:scale-110"
              />

              {product.hasLogoOption && (
                <span className="absolute top-2.5 left-2.5 bg-white/95 backdrop-blur-xs text-alina-700 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md border border-alina-200 shadow-xs flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-alina-600 animate-pulse" />
                  + Grabado de Logo
                </span>
              )}

              {/* Hover Action: Ver producto en la esquina derecha */}
              <div className="absolute bottom-2.5 right-2.5 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-1 group-hover:translate-y-0">
                <span className="inline-flex items-center gap-1 bg-slate-900/90 text-white text-[11px] sm:text-xs font-medium px-2.5 py-1 rounded-lg shadow-md backdrop-blur-xs">
                  <span>Ver producto</span>
                  <ArrowUpRight className="w-3 h-3 text-slate-300" />
                </span>
              </div>
            </div>

            {/* Content info */}
            <div className="p-3 sm:p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="font-display font-medium text-slate-800 text-xs sm:text-sm line-clamp-2 min-h-[2.25rem] sm:min-h-[2.5rem] group-hover:text-alina-600 transition-colors leading-snug">
                  {product.name}
                </h3>
              </div>

              {/* Pricing breakdown: Precio por unidad vs Precio al por mayor */}
              <div className="mt-3 pt-2.5 border-t border-slate-100 grid grid-cols-2 gap-1.5 sm:gap-2 items-stretch">
                {/* Columna 1: Por Unidad */}
                <div className="flex flex-col justify-between">
                  <span className="text-[10px] sm:text-[11px] font-semibold text-slate-500 block leading-tight">
                    Por Unidad
                  </span>
                  <div className="mt-0.5 sm:mt-1">
                    <span className="font-display font-bold text-xs sm:text-sm md:text-base text-slate-900 tracking-tight">
                      {formatCurrency(lowestUnit)}
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-slate-400 font-normal ml-0.5">c/u</span>
                  </div>
                </div>

                {/* Columna 2: Al por Mayor con divisor */}
                <div className="border-l border-slate-200 pl-2 sm:pl-2.5 flex flex-col justify-between">
                  <span className="text-[10px] sm:text-[11px] font-semibold text-emerald-700 block leading-tight">
                    Al por Mayor
                  </span>
                  <div className="mt-0.5 sm:mt-1">
                    <span className="font-display font-bold text-xs sm:text-sm md:text-base text-emerald-700 tracking-tight">
                      {formatCurrency(lowestWholesale)}
                    </span>
                    <span className="text-[9px] sm:text-[10px] text-emerald-600/70 font-normal ml-0.5">c/u</span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}

