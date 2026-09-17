'use client';

import React from "react";
import { 
  Filter, 
  Sparkles, 
  ChevronRight, 
  Check, 
  X, 
  MessageCircle, 
  RotateCcw, 
  PackageCheck
} from "lucide-react";
import { CATEGORIES_DATA } from "@/lib/catalog-data";

export interface FilterState {
  categoria?: string;
  subcategoria?: string;
  precioRango?: string;
  conLogo?: boolean;
  aMedida?: boolean;
  busqueda?: string;
  orden?: string;
}

interface CatalogSidebarProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalProductsCount: number;
  filteredProductsCount: number;
  categoryCounts: Record<string, number>;
  className?: string;
  onCloseMobile?: () => void;
}

// Subcategorías jerárquicas configuradas para cada categoría principal
export const SUBCATEGORIES_CONFIG: Record<string, Array<{ id: string; label: string; matchTerms: string[] }>> = {
  "bases-mdf": [
    { id: "rizada", label: "Rizada (Ondulada)", matchTerms: ["rizada"] },
    { id: "redonda", label: "Redonda Clásica", matchTerms: ["redonda"] },
    { id: "cuadrada", label: "Cuadrada", matchTerms: ["cuadrada"] },
    { id: "corazon", label: "Forma Corazón", matchTerms: ["corazon", "corazón"] },
  ],
  "minibases": [
    { id: "cheesecake", label: "Para Cheesecake y Postres", matchTerms: ["cheesecake"] },
    { id: "pack10", label: "Packs x10 Unidades", matchTerms: ["pack"] },
  ],
  "bases-rectangulares": [
    { id: "estandar", label: "Rectangulares Reforzadas", matchTerms: ["rectangular"] },
  ],
  "bases-disenos": [
    { id: "luna", label: "Silueta Luna", matchTerms: ["luna"] },
    { id: "corazones-flores", label: "Corazones, Flores y Trébol", matchTerms: ["corazones", "flores", "trebol", "trébol"] },
  ],
  "toppers": [
    { id: "acrilico", label: "Acrílico Espejo Dorado", matchTerms: ["acrilico", "acrílico"] },
    { id: "numeros", label: "Números MDF (1 al 10)", matchTerms: ["numero", "número", "tmdf"] },
  ],
  "apliques": [
    { id: "miniaturas", label: "Cruces, Mariposas y Ángeles", matchTerms: ["aplique", "cruz", "mariposa", "angel"] },
  ],
  "cajas": [
    { id: "acetato-360", label: "Acetato Cristal 360°", matchTerms: ["acetato"] },
    { id: "cupcakes", label: "Para Cupcakes con Visor", matchTerms: ["cupcakes"] },
    { id: "kits", label: "Kits con Cinta Decorativa", matchTerms: ["kit", "cinta"] },
    { id: "halar", label: "Cajas de Halar", matchTerms: ["halar"] },
  ],
  "complementos": [
    { id: "boquillas", label: "Sets de Boquillas Grandes", matchTerms: ["boquillas"] },
    { id: "mangas", label: "Mangas Desechables", matchTerms: ["mangas"] },
    { id: "esferas", label: "Esferas Decorativas", matchTerms: ["esferas"] },
    { id: "moldes", label: "Cortadores y Moldes", matchTerms: ["cortadores", "moldes"] },
    { id: "pirotinas", label: "Pirotinas Blancas", matchTerms: ["pirotinas"] },
  ],
};

// Rangos de precio preestablecidos para insumos de pastelería
export const PRICE_RANGES = [
  { id: "all", label: "Todos los precios" },
  { id: "under-1", label: "Menos de $1.00", desc: "Insumos y bases pequeñas" },
  { id: "1-to-3", label: "$1.00 — $3.00", desc: "Toppers y empaques" },
  { id: "3-to-6", label: "$3.00 — $6.00", desc: "Cajas acetato y sets" },
  { id: "over-6", label: "Más de $6.00", desc: "Packs x100 y bases maxi" },
];

export function CatalogSidebar({
  filters,
  onFilterChange,
  onResetFilters,
  totalProductsCount,
  filteredProductsCount,
  categoryCounts,
  className = "",
  onCloseMobile,
}: CatalogSidebarProps) {
  const activeFiltersCount = [
    Boolean(filters.categoria),
    Boolean(filters.subcategoria),
    Boolean(filters.precioRango && filters.precioRango !== "all"),
    Boolean(filters.conLogo),
    Boolean(filters.aMedida),
    Boolean(filters.busqueda),
  ].filter(Boolean).length;

  const currentCategorySubcategories = filters.categoria 
    ? SUBCATEGORIES_CONFIG[filters.categoria] || []
    : [];

  return (
    <aside className={`space-y-6 ${className}`}>
      {/* Header del Sidebar */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200">
        <div className="flex items-center gap-2">
          <Filter className="size-4 text-alina-600" />
          <h2 className="font-display font-bold text-sm uppercase tracking-wider text-slate-900">
            Filtros de Tienda
          </h2>
          {activeFiltersCount > 0 && (
            <span className="flex size-5 items-center justify-center rounded-full bg-alina-600 text-[10px] font-bold text-white">
              {activeFiltersCount}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {activeFiltersCount > 0 && (
            <button
              type="button"
              onClick={onResetFilters}
              className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-alina-600 transition-colors"
              title="Limpiar todos los filtros"
            >
              <RotateCcw className="size-3" />
              <span>Limpiar</span>
            </button>
          )}

          {onCloseMobile && (
            <button
              type="button"
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg"
              aria-label="Cerrar filtros"
            >
              <X className="size-5" />
            </button>
          )}
        </div>
      </div>

      {/* SECCIÓN 1: CATEGORÍAS PRINCIPALES */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          Categorías
        </label>

        <div className="space-y-1 text-xs">
          {/* Todas las categorías */}
          <button
            type="button"
            onClick={() => onFilterChange({ categoria: undefined, subcategoria: undefined })}
            className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all font-semibold ${
              !filters.categoria
                ? "bg-slate-900 text-white shadow-xs"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <span>Todas las Categorías</span>
            <span className={`text-[11px] px-2 py-0.5 rounded-full ${
              !filters.categoria ? "bg-white/20 text-white" : "bg-slate-200/70 text-slate-600"
            }`}>
              {totalProductsCount}
            </span>
          </button>

          {/* Lista de categorías */}
          {CATEGORIES_DATA.map((cat) => {
            const isSelected = filters.categoria === cat.slug;
            const count = categoryCounts[cat.slug] || 0;

            return (
              <div key={cat.slug} className="space-y-1">
                <button
                  type="button"
                  onClick={() =>
                    onFilterChange({
                      categoria: isSelected ? undefined : cat.slug,
                      subcategoria: undefined,
                    })
                  }
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl transition-all font-semibold text-left ${
                    isSelected
                      ? "bg-alina-600 text-white shadow-xs"
                      : "text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span className="truncate pr-2">{cat.name}</span>
                  <span className={`text-[11px] px-2 py-0.5 rounded-full shrink-0 ${
                    isSelected ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                  }`}>
                    {count}
                  </span>
                </button>

                {/* Subcategorías anidadas si la categoría está seleccionada */}
                {isSelected && currentCategorySubcategories.length > 0 && (
                  <div className="pl-3 pr-1 py-1 space-y-1 border-l-2 border-alina-200 ml-3">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-alina-700 px-2 pt-1">
                      Subcategorías:
                    </p>
                    {currentCategorySubcategories.map((sub) => {
                      const isSubSelected = filters.subcategoria === sub.id;
                      return (
                        <button
                          key={sub.id}
                          type="button"
                          onClick={() =>
                            onFilterChange({
                              subcategoria: isSubSelected ? undefined : sub.id,
                            })
                          }
                          className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                            isSubSelected
                              ? "bg-alina-100 text-alina-900 font-bold"
                              : "text-slate-600 hover:bg-slate-100 hover:text-slate-900"
                          }`}
                        >
                          <span className="flex items-center gap-1.5">
                            <span className={`size-1.5 rounded-full ${isSubSelected ? "bg-alina-600" : "bg-slate-300"}`} />
                            {sub.label}
                          </span>
                          {isSubSelected && <Check className="size-3 text-alina-600 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* SECCIÓN 2: FILTRO POR RANGO DE PRECIO */}
      <div className="space-y-2 pt-3 border-t border-slate-100">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          Rango de Precio
        </label>
        <div className="space-y-1">
          {PRICE_RANGES.map((tier) => {
            const isSelected = (filters.precioRango || "all") === tier.id;
            return (
              <label
                key={tier.id}
                className={`flex items-start gap-2.5 px-3 py-2 rounded-xl cursor-pointer text-xs transition-colors ${
                  isSelected
                    ? "bg-alina-50/70 border border-alina-200 text-alina-900 font-bold"
                    : "hover:bg-slate-50 text-slate-700"
                }`}
              >
                <input
                  type="radio"
                  name="precioRango"
                  checked={isSelected}
                  onChange={() => onFilterChange({ precioRango: tier.id })}
                  className="mt-0.5 size-3.5 text-alina-600 focus:ring-alina-500 border-slate-300"
                />
                <div className="flex-1">
                  <div>{tier.label}</div>
                  {tier.desc && (
                    <div className="text-[10px] text-slate-400 font-normal leading-tight">
                      {tier.desc}
                    </div>
                  )}
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* SECCIÓN 3: ATRIBUTOS & SERVICIOS */}
      <div className="space-y-2 pt-3 border-t border-slate-100">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
          Personalización & Taller
        </label>
        <div className="space-y-2 text-xs">
          <label className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-slate-50 text-slate-700">
            <input
              type="checkbox"
              checked={Boolean(filters.conLogo)}
              onChange={(e) => onFilterChange({ conLogo: e.target.checked || undefined })}
              className="size-3.5 rounded border-slate-300 text-alina-600 focus:ring-alina-500"
            />
            <span>Con opción de grabado de logo</span>
          </label>

          <label className="flex items-center gap-2.5 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-slate-50 text-slate-700">
            <input
              type="checkbox"
              checked={Boolean(filters.aMedida)}
              onChange={(e) => onFilterChange({ aMedida: e.target.checked || undefined })}
              className="size-3.5 rounded border-slate-300 text-alina-600 focus:ring-alina-500"
            />
            <span>Fabricación a medida disponible</span>
          </label>
        </div>
      </div>

      {/* SECCIÓN 4: MÓDULO DESTACADO "SOLICITAR AL POR MAYOR" */}
      <div className="pt-2">
        <div className="relative overflow-hidden rounded-2xl border border-alina-200 bg-gradient-to-br from-[#fff2f7] via-[#fff8fb] to-[#ffeef5] p-4 shadow-sm">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-alina-700">
            <PackageCheck className="size-4 text-alina-600" />
            <span>Venta Mayorista</span>
          </div>

          <h3 className="mt-2 font-display text-sm font-extrabold text-slate-900 leading-snug">
            ¿Tienes pastelería o taller y compras por volumen?
          </h3>

          <p className="mt-1.5 text-xs text-slate-600 leading-relaxed">
            Accede a <strong>precios de fábrica</strong> desde 50 unidades, catálogo PDF y envíos asegurados a todo el Ecuador.
          </p>

          <a
            href="https://wa.me/593985890956?text=¡Hola%20Alina%20Shop!%20Tengo%20una%20pastelería/negocio%20y%20deseo%20solicitar%20el%20catálogo%20y%20precios%20al%20por%20mayor."
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3.5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] hover:bg-[#20ba5a] py-2.5 px-3 text-xs font-bold text-white shadow-md transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <MessageCircle className="size-4 fill-current" />
            <span>Cotizar al por Mayor</span>
          </a>
        </div>
      </div>
    </aside>
  );
}
