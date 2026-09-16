'use client';

import React, { useState, useMemo } from "react";
import { useCart } from "@/context/cart-context";
import { calculateProductPrice } from "@/lib/pricing-calculator";
import { formatCurrency } from "@/lib/utils";
import { Check, MessageCircle, CreditCard, ShoppingBag, ShieldCheck, Sparkles, Layers, Sliders } from "lucide-react";

interface Variant {
  code?: string;
  sizeLabel: string;
  shape?: string;
  color?: string;
  unitPrice: number;
  dozenPrice: number;
  wholesalePrice: number;
}

interface ProductCustomizerProps {
  product: {
    id: string;
    name: string;
    slug: string;
    sku: string;
    description: string;
    material?: string;
    mainImage: string;
    hasLogoOption: boolean;
    logoPriceExtra?: number;
    allowCustomSize: boolean;
    variants: Variant[];
  };
  whatsappNumber?: string;
}

export function ProductCustomizer({ product, whatsappNumber = "593985890956" }: ProductCustomizerProps) {
  const { addItem, buyNow } = useCart();

  // Extract unique available shapes and colors from variants or defaults
  const availableShapes = useMemo(() => {
    const set = new Set<string>();
    product.variants.forEach((v) => {
      if (v.shape) set.add(v.shape);
    });
    if (set.size === 0 && product.material?.includes("MDF")) {
      return ["Rizada", "Redonda", "Cuadrada", "Corazón", "Estrella", "Punta Redonda"];
    }
    return Array.from(set);
  }, [product]);

  const [selectedShape, setSelectedShape] = useState(availableShapes[0] || "Rizada");
  const [selectedColor, setSelectedColor] = useState("Blanco");
  const [selectedVariantIndex, setSelectedVariantIndex] = useState(0);
  const [isCustomSize, setIsCustomSize] = useState(false);
  const [customWidth, setCustomWidth] = useState(25);
  const [customHeight, setCustomHeight] = useState(25);
  const [withLogo, setWithLogo] = useState(false);
  const [quantity, setQuantity] = useState(12); // Default to a dozen for cake supplies

  const activeVariant = product.variants[selectedVariantIndex] || {
    sizeLabel: "20 cm",
    unitPrice: 0.75,
    dozenPrice: 0.64,
    wholesalePrice: 0.55,
  };

  // Compute live price
  const pricing = useMemo(() => {
    return calculateProductPrice({
      unitPrice: Number(activeVariant.unitPrice),
      dozenPrice: Number(activeVariant.dozenPrice),
      wholesalePrice: Number(activeVariant.wholesalePrice),
      quantity,
      withLogo,
      logoPriceExtra: product.logoPriceExtra ?? 0.20,
      customDimensions: isCustomSize ? { widthCm: customWidth, heightCm: customHeight } : null,
    });
  }, [activeVariant, quantity, withLogo, isCustomSize, customWidth, customHeight, product.logoPriceExtra]);

  const sizeDisplayText = isCustomSize
    ? `${customWidth}x${customHeight} cm (A Medida)`
    : activeVariant.sizeLabel;

  // Registrar analítica y abrir WhatsApp
  const handleWhatsAppBuy = async () => {
    try {
      fetch("/api/analytics/whatsapp-click", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          variantDetails: {
            size: sizeDisplayText,
            shape: selectedShape,
            color: selectedColor,
            withLogo,
          },
          calculatedPrice: pricing.itemSubtotal,
          quantity,
        }),
      }).catch((e) => console.error("Analytics log error:", e));
    } catch (e) {}

    const text = `¡Hola Alina Shop! Deseo cotizar/comprar este producto:
*Producto:* ${product.name}
*Medida:* ${sizeDisplayText}
*Forma:* ${selectedShape}
*Color:* ${selectedColor}
*Grabado de Logo:* ${withLogo ? "Sí (+$0.20/base)" : "No"}
*Cantidad:* ${quantity} unidades
*Subtotal estimado:* $${pricing.itemSubtotal.toFixed(2)} USD

¿Me podrían confirmar la disponibilidad y tiempo de entrega? ¡Gracias!`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, "_blank");
  };

  // Compra directa estilo Shopify (bypasses cart drawer and opens streamlined checkout)
  const handleDirectBuy = () => {
    buyNow({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      mainImage: product.mainImage,
      variantCode: activeVariant.code,
      sizeLabel: sizeDisplayText,
      shape: selectedShape,
      color: selectedColor,
      withLogo,
      customDimensions: isCustomSize ? { widthCm: customWidth, heightCm: customHeight } : null,
      unitPrice: pricing.effectiveUnitPrice,
      quantity,
    });
  };

  // Agregar al carrito normal
  const handleAddToCart = () => {
    addItem({
      productId: product.id,
      productName: product.name,
      productSlug: product.slug,
      mainImage: product.mainImage,
      variantCode: activeVariant.code,
      sizeLabel: sizeDisplayText,
      shape: selectedShape,
      color: selectedColor,
      withLogo,
      customDimensions: isCustomSize ? { widthCm: customWidth, heightCm: customHeight } : null,
      unitPrice: pricing.effectiveUnitPrice,
      quantity,
    });
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Dynamic Price Summary Box */}
      <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-4 flex flex-wrap items-baseline justify-between gap-2">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-display font-extrabold text-3xl text-slate-900 tracking-tight">
              {formatCurrency(pricing.effectiveUnitPrice)}
            </span>
            <span className="text-slate-500 text-xs font-medium">/ unidad</span>
          </div>
          <div className="text-xs text-slate-500 mt-0.5">
            Total ({quantity} unds):{" "}
            <strong className="text-alina-600 font-bold">{formatCurrency(pricing.itemSubtotal)}</strong>
          </div>
        </div>

        {pricing.savingsTotal > 0 && (
          <div className="bg-emerald-50 text-emerald-800 border border-emerald-200/80 px-2.5 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Ahorras {formatCurrency(pricing.savingsTotal)} por volumen
          </div>
        )}
      </div>

      {/* 1. Selector de Forma (si aplica) */}
      {availableShapes.length > 0 && (
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            1. Forma: <span className="font-semibold text-alina-600 normal-case">{selectedShape}</span>
          </label>
          <div className="flex flex-wrap gap-2">
            {availableShapes.map((shape) => (
              <button
                key={shape}
                type="button"
                onClick={() => setSelectedShape(shape)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                  selectedShape === shape
                    ? "bg-alina-50 border-alina-600 text-alina-700 font-bold shadow-2xs"
                    : "bg-white border-slate-200 text-slate-700 hover:border-slate-300"
                }`}
              >
                {shape}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* 2. Selector de Color / Acabado */}
      {product.material?.includes("MDF") && (
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            2. Color del MDF: <span className="font-semibold text-slate-900 normal-case">{selectedColor}</span>
          </label>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setSelectedColor("Blanco")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                selectedColor === "Blanco"
                  ? "border-alina-600 bg-white ring-1 ring-alina-600 font-bold"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-white border border-slate-300 shadow-2xs" />
              Blanco Laminado
            </button>
            <button
              type="button"
              onClick={() => setSelectedColor("Wengué")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-xs font-medium transition-all ${
                selectedColor === "Wengué"
                  ? "border-alina-600 bg-white ring-1 ring-alina-600 font-bold"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
              }`}
            >
              <span className="w-4 h-4 rounded-full bg-amber-950 shadow-2xs" />
              Wengué Oscuro
            </button>
          </div>
        </div>
      )}

      {/* 3. Selector de Medidas o Medida Personalizada */}
      <div className="border border-slate-200 rounded-xl p-4 bg-white shadow-2xs">
        <div className="flex items-center justify-between mb-3">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
            <Sliders className="w-4 h-4 text-alina-600" />
            3. Medida y Dimensiones
          </label>
          {product.allowCustomSize && (
            <span className="text-[11px] text-alina-600 font-semibold bg-alina-50 px-2 py-0.5 rounded border border-alina-200">
              Fabricación a Medida Disponible
            </span>
          )}
        </div>

        {product.allowCustomSize && (
          <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-lg mb-3">
            <button
              type="button"
              onClick={() => setIsCustomSize(false)}
              className={`py-1.5 text-xs font-semibold rounded-md transition-all ${
                !isCustomSize
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Medidas de Catálogo
            </button>
            <button
              type="button"
              onClick={() => setIsCustomSize(true)}
              className={`py-1.5 text-xs font-semibold rounded-md transition-all ${
                isCustomSize
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Bajo Pedido (cm exactos)
            </button>
          </div>
        )}

        {!isCustomSize ? (
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {product.variants.map((v, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setSelectedVariantIndex(idx)}
                className={`p-2 rounded-lg border text-left transition-all ${
                  selectedVariantIndex === idx
                    ? "border-alina-600 bg-alina-50/50 ring-1 ring-alina-600"
                    : "border-slate-200 bg-white hover:border-slate-300"
                }`}
              >
                <div className="font-semibold text-xs text-slate-900 truncate">{v.sizeLabel}</div>
                <div className="text-[11px] text-slate-500">{formatCurrency(v.dozenPrice)} doc.</div>
              </button>
            ))}
          </div>
        ) : (
          <div className="space-y-3 pt-1">
            <p className="text-xs text-slate-600">
              Ingresa el ancho y largo que necesitas para calcular el precio exacto en tiempo real:
            </p>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Ancho (cm):</label>
                <input
                  type="number"
                  min="5"
                  max="100"
                  value={customWidth}
                  onChange={(e) => setCustomWidth(Math.max(5, Number(e.target.value)))}
                  className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-900 focus:outline-none focus:border-alina-600"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Largo (cm):</label>
                <input
                  type="number"
                  min="5"
                  max="100"
                  value={customHeight}
                  onChange={(e) => setCustomHeight(Math.max(5, Number(e.target.value)))}
                  className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-sm font-semibold text-slate-900 focus:outline-none focus:border-alina-600"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 4. Grabado de Logotipo Personalizado (+ $0.20 ctv) */}
      {product.hasLogoOption && (
        <div className="bg-slate-50 border border-slate-200/90 rounded-xl p-3.5 flex items-center justify-between">
          <div>
            <div className="font-display font-semibold text-xs text-slate-900 flex items-center gap-1.5">
              <span>¿Deseas grabar el logo de tu pastelería?</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Grabado láser permanente en cada base por solo <strong>+$0.20 ctvs</strong>
            </p>
          </div>
          <label className="flex items-center gap-2 cursor-pointer font-bold text-xs text-alina-600">
            <input
              type="checkbox"
              checked={withLogo}
              onChange={(e) => setWithLogo(e.target.checked)}
              className="w-4 h-4 rounded border-slate-300 text-alina-600 focus:ring-alina-500"
            />
            <span>Incluir Logo</span>
          </label>
        </div>
      )}

      {/* 5. Selector de Cantidad */}
      <div className="flex items-center gap-4">
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700">Cantidad:</label>
        <div className="flex items-center border border-slate-300 rounded-lg bg-white overflow-hidden">
          <button
            type="button"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 font-bold"
          >
            -
          </button>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-14 text-center font-bold text-sm text-slate-900 border-none focus:outline-none"
          />
          <button
            type="button"
            onClick={() => setQuantity(quantity + 1)}
            className="px-3 py-1.5 text-slate-600 hover:bg-slate-100 font-bold"
          >
            +
          </button>
        </div>

        {/* Quick presets */}
        <div className="flex gap-1.5">
          <button
            type="button"
            onClick={() => setQuantity(12)}
            className={`px-2 py-1 rounded text-xs font-medium border ${
              quantity === 12
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            }`}
          >
            1 Docena
          </button>
          <button
            type="button"
            onClick={() => setQuantity(50)}
            className={`px-2 py-1 rounded text-xs font-medium border ${
              quantity === 50
                ? "bg-slate-900 text-white border-slate-900"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            }`}
          >
            50+ (Mayor)
          </button>
        </div>
      </div>

      {/* 6. Botones de Acción Neurálgicos */}
      <div className="flex flex-col gap-2.5 pt-2">
        {/* Botón WhatsApp */}
        <button
          type="button"
          onClick={handleWhatsAppBuy}
          className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-display font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-md hover:shadow-lg text-sm"
        >
          <MessageCircle className="w-5 h-5 fill-current" />
          <span>Comprar por WhatsApp (Cotización Lista)</span>
        </button>

        {/* Botón Compra Directa Shopify Style & Carrito */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={handleDirectBuy}
            className="bg-slate-900 hover:bg-slate-800 text-white font-display font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all text-xs"
          >
            <CreditCard className="w-4 h-4" />
            <span>Pagar con Tarjeta (Directo)</span>
          </button>

          <button
            type="button"
            onClick={handleAddToCart}
            className="bg-white hover:bg-alina-50 border-2 border-alina-600 text-alina-600 font-display font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all text-xs"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>Agregar al Carrito</span>
          </button>
        </div>
      </div>

      {/* Trust Badges */}
      <div className="grid grid-cols-3 gap-2 pt-3 border-t border-slate-100 text-center text-[11px] text-slate-500 font-medium">
        <div>🔒 Pagos Seguros Payphone</div>
        <div>🚚 Envíos Servientrega / Laar</div>
        <div>📦 Seguimiento de Guía</div>
      </div>
    </div>
  );
}
