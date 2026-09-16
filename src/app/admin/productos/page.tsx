'use client';

import React, { useState } from "react";
import Image from "next/image";
import { PRODUCTS_DATA } from "@/lib/catalog-data";
import { formatCurrency } from "@/lib/utils";
import {
  Package,
  Search,
  Plus,
  Edit2,
  UploadCloud,
  Check,
  X,
  Sparkles,
  Sliders,
  DollarSign
} from "lucide-react";

export default function AdminProductsPage() {
  const [products, setProducts] = useState(PRODUCTS_DATA);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<any | null>(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  const filtered = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedProduct) return;

    setProducts((prev) =>
      prev.map((p) => (p.sku === selectedProduct.sku ? selectedProduct : p))
    );
    setSelectedProduct(null);
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !selectedProduct) return;

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/blob/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.url) {
        setSelectedProduct({ ...selectedProduct, mainImage: data.url });
      }
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploadingImage(false);
    }
  };

  return (
    <main className="p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">
            Catálogo de Productos & Precios
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Modifica especificaciones, variantes de medidas, precios de docena/mayor y sube fotos a Vercel Blob
          </p>
        </div>

        <button
          onClick={() => {
            const newSku = `NUEVO-${Date.now().toString().slice(-4)}`;
            const newProd = {
              sku: newSku,
              name: "Nuevo Producto de Repostería",
              slug: newSku.toLowerCase(),
              description: "Descripción del nuevo producto",
              material: "MDF 3mm",
              categorySlug: "bases-mdf",
              mainImage: "/logo.jpg",
              hasLogoOption: true,
              logoPriceExtra: 0.20,
              allowCustomSize: true,
              variants: [
                { sizeLabel: "20 cm", unitPrice: 0.75, dozenPrice: 0.64, wholesalePrice: 0.55 },
              ],
            };
            setProducts([newProd, ...products]);
            setSelectedProduct(newProd);
          }}
          className="bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-xl flex items-center gap-1.5 transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Nuevo Producto</span>
        </button>
      </div>

      {/* Search bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex justify-between items-center shadow-2xs">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por nombre o SKU..."
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-alina-600 font-medium"
          />
        </div>
        <div className="text-xs text-slate-500 font-medium">
          {products.length} productos registrados en catálogo
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((prod) => (
          <div
            key={prod.sku}
            className="bg-white border border-slate-200 rounded-2xl p-5 shadow-2xs hover:border-alina-300 transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex gap-4 items-start mb-3">
                <div className="w-16 h-16 bg-slate-50 rounded-xl border border-slate-200 overflow-hidden shrink-0 flex items-center justify-center relative">
                  <Image src={prod.mainImage || "/logo.jpg"} alt={prod.name} fill className="object-contain p-1" />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-mono text-slate-400 uppercase">{prod.sku}</span>
                  <h3 className="font-display font-bold text-sm text-slate-900 truncate mt-0.5">{prod.name}</h3>
                  <div className="text-[11px] text-alina-600 font-semibold">{prod.material}</div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-3 text-xs text-slate-600 space-y-1 mb-4">
                <div className="flex justify-between">
                  <span>Variantes / Medidas:</span>
                  <strong className="text-slate-900">{prod.variants?.length || 0} medidas</strong>
                </div>
                <div className="flex justify-between">
                  <span>Grabado de Logo:</span>
                  <strong className={prod.hasLogoOption ? "text-emerald-700" : "text-slate-400"}>
                    {prod.hasLogoOption ? "Disponible (+$0.20)" : "No"}
                  </strong>
                </div>
              </div>
            </div>

            <button
              onClick={() => setSelectedProduct(prod)}
              className="w-full bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-800 text-xs font-semibold py-2 px-3 rounded-xl flex items-center justify-center gap-1.5 transition-colors"
            >
              <Edit2 className="w-3.5 h-3.5" />
              <span>Editar Producto y Precios</span>
            </button>
          </div>
        ))}
      </div>

      {/* Modal Editor de Producto */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h2 className="font-display font-bold text-lg text-slate-900 mb-1">
              Editar Producto: {selectedProduct.name}
            </h2>
            <p className="text-xs text-slate-500 mb-5">SKU: {selectedProduct.sku}</p>

            <form onSubmit={handleSaveProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nombre del Producto</label>
                <input
                  type="text"
                  value={selectedProduct.name}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-alina-600 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Material</label>
                  <input
                    type="text"
                    value={selectedProduct.material || ""}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, material: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-alina-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Costo Grabado Logo ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={selectedProduct.logoPriceExtra ?? 0.20}
                    onChange={(e) => setSelectedProduct({ ...selectedProduct, logoPriceExtra: parseFloat(e.target.value) })}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-alina-600"
                  />
                </div>
              </div>

              {/* Subida a Vercel Blob */}
              <div className="border border-dashed border-slate-300 rounded-xl p-4 text-center bg-slate-50">
                <UploadCloud className="w-6 h-6 text-alina-600 mx-auto mb-1" />
                <span className="text-xs font-semibold text-slate-700 block">
                  {uploadingImage ? "Subiendo a Vercel Blob..." : "Actualizar Imagen en Vercel Blob"}
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="text-xs text-slate-500 mt-2 file:mr-2 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-slate-900 file:text-white file:font-semibold"
                />
              </div>

              {/* Editor de Variantes y Precios */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                  Variantes de Medidas y Precios
                </label>
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {selectedProduct.variants?.map((v: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-2 bg-slate-50 p-2 rounded-lg border border-slate-200 text-xs">
                      <input
                        type="text"
                        value={v.sizeLabel}
                        onChange={(e) => {
                          const updated = [...selectedProduct.variants];
                          updated[idx].sizeLabel = e.target.value;
                          setSelectedProduct({ ...selectedProduct, variants: updated });
                        }}
                        className="w-28 border border-slate-300 rounded px-2 py-1 bg-white font-medium"
                      />
                      <div className="flex items-center gap-1">
                        <span className="text-slate-400">Doc:</span>
                        <input
                          type="number"
                          step="0.01"
                          value={v.dozenPrice}
                          onChange={(e) => {
                            const updated = [...selectedProduct.variants];
                            updated[idx].dozenPrice = parseFloat(e.target.value);
                            setSelectedProduct({ ...selectedProduct, variants: updated });
                          }}
                          className="w-16 border border-slate-300 rounded px-2 py-1 bg-white"
                        />
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-slate-400">May:</span>
                        <input
                          type="number"
                          step="0.01"
                          value={v.wholesalePrice}
                          onChange={(e) => {
                            const updated = [...selectedProduct.variants];
                            updated[idx].wholesalePrice = parseFloat(e.target.value);
                            setSelectedProduct({ ...selectedProduct, variants: updated });
                          }}
                          className="w-16 border border-slate-300 rounded px-2 py-1 bg-white"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="flex-1 bg-white border border-slate-200 text-slate-700 text-xs font-semibold py-2.5 rounded-xl hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-slate-900 text-white text-xs font-semibold py-2.5 rounded-xl hover:bg-slate-800"
                >
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
