'use client';

import React, { useState, useEffect } from "react";
import Image from "next/image";
import {
  Megaphone,
  Sparkles,
  Truck,
  Gift,
  CreditCard,
  Tag,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Eye,
  Save,
  Clock,
  ArrowRight,
  Sliders,
  X
} from "lucide-react";
import { PromotionsConfig, NavbarPromotionItem } from "@/lib/promotions-store";

export default function AdminPublicidadPage() {
  const [config, setConfig] = useState<PromotionsConfig | null>(null);
  const [activeTab, setActiveTab] = useState<"popup" | "ticker">("popup");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchPromotions = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/promotions");
      const data = await res.json();
      if (res.ok && data.success) {
        setConfig(data.promotions);
      } else {
        setError(data.message || "Error al cargar configuración");
      }
    } catch (e) {
      setError("Error de conexión");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!config) return;

    setSaving(true);
    setMessage("");
    setError("");

    try {
      const res = await fetch("/api/admin/promotions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(config),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMessage("¡Publicidad guardada y sincronizada en vivo con la tienda virtual!");
        setTimeout(() => setMessage(""), 4000);
      } else {
        setError(data.message || "Error al guardar");
      }
    } catch (e) {
      setError("Error de comunicación con el servidor");
    } finally {
      setSaving(false);
    }
  };

  const handleAddTickerMessage = () => {
    if (!config) return;
    const newItem: NavbarPromotionItem = {
      id: `msg_${Date.now()}`,
      icon: "sparkles",
      text: "Nueva promoción especial para pastelerías y reposterías",
      linkUrl: "/catalogo",
    };
    setConfig({
      ...config,
      ticker: {
        ...config.ticker,
        messages: [...config.ticker.messages, newItem],
      },
    });
  };

  const handleRemoveTickerMessage = (id: string) => {
    if (!config) return;
    if (config.ticker.messages.length <= 1) {
      alert("Debes mantener al menos un mensaje en el carrusel.");
      return;
    }
    setConfig({
      ...config,
      ticker: {
        ...config.ticker,
        messages: config.ticker.messages.filter((m) => m.id !== id),
      },
    });
  };

  const handleUpdateTickerItem = (id: string, updates: Partial<NavbarPromotionItem>) => {
    if (!config) return;
    setConfig({
      ...config,
      ticker: {
        ...config.ticker,
        messages: config.ticker.messages.map((m) => (m.id === id ? { ...m, ...updates } : m)),
      },
    });
  };

  if (loading) {
    return (
      <div className="p-8 text-center text-slate-400 text-xs">
        Cargando configuración de publicidad y pop-ups...
      </div>
    );
  }

  if (!config) {
    return (
      <div className="p-8 text-center text-red-500 text-xs">
        Error al cargar los datos de publicidad.
      </div>
    );
  }

  return (
    <main className="p-6 sm:p-8 space-y-6 max-w-5xl">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight flex items-center gap-2.5">
            <Megaphone className="size-6 text-alina-600" />
            <span>Módulo de Publicidad, Pop-ups y Anuncios</span>
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Administra el pop-up de bienvenida del Home y el carrusel de frases promocionales del Navbar
          </p>
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-slate-900 hover:bg-slate-800 text-white font-display font-bold text-xs py-2.5 px-4 rounded-xl flex items-center gap-2 transition-all shadow-md cursor-pointer shrink-0 disabled:opacity-50"
        >
          <Save className="size-4" />
          <span>{saving ? "Guardando..." : "Guardar y Publicar"}</span>
        </button>
      </div>

      {/* Notifications */}
      {message && (
        <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2">
          <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
          <span>{message}</span>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-xs font-semibold flex items-center gap-2">
          <AlertCircle className="size-4 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex border-b border-slate-200 gap-2">
        <button
          type="button"
          onClick={() => setActiveTab("popup")}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === "popup"
              ? "border-alina-600 text-alina-600"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <Sparkles className="size-4" />
          <span>1. Pop-up de Bienvenida (Home)</span>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
              config.popup.enabled ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"
            }`}
          >
            {config.popup.enabled ? "Activo" : "Desactivado"}
          </span>
        </button>

        <button
          type="button"
          onClick={() => setActiveTab("ticker")}
          className={`pb-3 px-4 text-xs font-bold border-b-2 transition-all flex items-center gap-2 cursor-pointer ${
            activeTab === "ticker"
              ? "border-alina-600 text-alina-600"
              : "border-transparent text-slate-500 hover:text-slate-900"
          }`}
        >
          <Sliders className="size-4" />
          <span>2. Textos del Navbar (Carrusel)</span>
          <span
            className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
              config.ticker.enabled ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"
            }`}
          >
            {config.ticker.messages.length} mensajes
          </span>
        </button>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* ========================================================= */}
        {/* TAB 1: POP-UP DE BIENVENIDA DEL HOME */}
        {/* ========================================================= */}
        {activeTab === "popup" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* Formulario de Configuración del Popup (7 cols) */}
            <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h2 className="font-display font-bold text-sm text-slate-900">
                  Configuración del Pop-up de Entrada
                </h2>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={config.popup.enabled}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        popup: { ...config.popup, enabled: e.target.checked },
                      })
                    }
                    className="size-4 text-alina-600 rounded"
                  />
                  <span className="text-xs font-bold text-slate-800">
                    {config.popup.enabled ? "Pop-up Activo" : "Pop-up Desactivado"}
                  </span>
                </label>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Insignia / Badge Superior
                </label>
                <input
                  type="text"
                  value={config.popup.badge}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      popup: { ...config.popup, badge: e.target.value },
                    })
                  }
                  placeholder="Ej: OFERTA EXCLUSIVA MAYORISTA"
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-alina-600 font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Título Principal del Anuncio
                </label>
                <input
                  type="text"
                  value={config.popup.title}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      popup: { ...config.popup, title: e.target.value },
                    })
                  }
                  placeholder="Ej: ¡Precios de Fábrica en Bases MDF & Toppers!"
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-alina-600 font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Descripción Promocional
                </label>
                <textarea
                  rows={3}
                  value={config.popup.description}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      popup: { ...config.popup, description: e.target.value },
                    })
                  }
                  placeholder="Detalles sobre descuentos por docena, envíos y beneficios..."
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-alina-600 leading-relaxed"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Texto del Botón CTA
                  </label>
                  <input
                    type="text"
                    value={config.popup.buttonText}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        popup: { ...config.popup, buttonText: e.target.value },
                      })
                    }
                    placeholder="Ej: Ver Catálogo con Precios"
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-alina-600 font-semibold"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Enlace de Destino (URL)
                  </label>
                  <input
                    type="text"
                    value={config.popup.buttonUrl}
                    onChange={(e) =>
                      setConfig({
                        ...config,
                        popup: { ...config.popup, buttonUrl: e.target.value },
                      })
                    }
                    placeholder="/catalogo o https://wa.me/..."
                    className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-alina-600 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ruta de la Imagen o Fotografía de Producto
                </label>
                <input
                  type="text"
                  value={config.popup.imageUrl || ""}
                  onChange={(e) =>
                    setConfig({
                      ...config,
                      popup: { ...config.popup, imageUrl: e.target.value },
                    })
                  }
                  placeholder="/images/products/bases-mdf/base-mdf-blanco-wengue.png"
                  className="w-full border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-alina-600 font-mono"
                />
              </div>
            </div>

            {/* Vista Previa en Vivo del Pop-up (5 cols) */}
            <div className="lg:col-span-5 space-y-3">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600">
                <span className="flex items-center gap-1.5">
                  <Eye className="size-3.5 text-alina-600" />
                  <span>Vista Previa del Pop-up en Tienda</span>
                </span>
                <span className="text-[11px] text-slate-400">Exactamente como lo verá el cliente</span>
              </div>

              {/* Mockup del Pop-up */}
              <div className="bg-slate-900/60 p-4 rounded-3xl border border-slate-300 shadow-inner flex items-center justify-center">
                <div className="bg-white rounded-2xl p-5 max-w-sm w-full shadow-2xl border border-slate-200 relative text-center space-y-3">
                  <div className="absolute top-3 right-3 text-slate-400">
                    <X className="size-4" />
                  </div>

                  {config.popup.badge && (
                    <span className="inline-block text-[10px] font-extrabold uppercase tracking-wider text-alina-700 bg-alina-50 border border-alina-200 px-2.5 py-0.5 rounded-full">
                      {config.popup.badge}
                    </span>
                  )}

                  {config.popup.imageUrl && (
                    <div className="relative h-28 w-full bg-slate-50 rounded-xl overflow-hidden flex items-center justify-center border border-slate-100 p-1">
                      <Image
                        src={config.popup.imageUrl}
                        alt="Preview"
                        fill
                        className="object-contain p-2"
                      />
                    </div>
                  )}

                  <h3 className="font-display font-extrabold text-base text-slate-900 leading-tight">
                    {config.popup.title || "Título de la promoción"}
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {config.popup.description || "Descripción del anuncio..."}
                  </p>

                  <div className="pt-1">
                    <div className="w-full bg-slate-900 text-white font-display font-bold py-2.5 px-4 rounded-xl text-xs shadow-md">
                      {config.popup.buttonText || "Ver Promoción"}
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-400">
                    No volver a mostrar por hoy
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* TAB 2: TEXTOS DEL NAVBAR (CARRUSEL/TICKER) */}
        {/* ========================================================= */}
        {activeTab === "ticker" && (
          <div className="space-y-6">
            <div className="bg-white border border-slate-200 rounded-2xl p-5 sm:p-6 shadow-2xs space-y-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
                <div>
                  <h2 className="font-display font-bold text-sm text-slate-900">
                    Carrusel de Textos Promocionales en el Navbar
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Estas frases rotan continuamente en el centro de la barra superior de la tienda
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={config.ticker.enabled}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          ticker: { ...config.ticker, enabled: e.target.checked },
                        })
                      }
                      className="size-4 text-alina-600 rounded"
                    />
                    <span className="text-xs font-bold text-slate-800">
                      {config.ticker.enabled ? "Carrusel Activo" : "Carrusel Oculto"}
                    </span>
                  </label>

                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <Clock className="size-3.5 text-slate-400" />
                    <span>Rotar cada:</span>
                    <select
                      value={config.ticker.intervalSeconds}
                      onChange={(e) =>
                        setConfig({
                          ...config,
                          ticker: {
                            ...config.ticker,
                            intervalSeconds: Number(e.target.value),
                          },
                        })
                      }
                      className="border border-slate-300 rounded-lg px-2 py-1 text-xs bg-white font-semibold"
                    >
                      <option value={3}>3 seg</option>
                      <option value={4}>4 seg</option>
                      <option value={5}>5 seg</option>
                      <option value={6}>6 seg</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Lista de Mensajes */}
              <div className="space-y-3">
                {config.ticker.messages.map((item, index) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/60 flex flex-col sm:flex-row items-start sm:items-center gap-3"
                  >
                    <span className="font-mono text-xs font-bold text-slate-400 w-6">
                      #{index + 1}
                    </span>

                    {/* Selector de Icono */}
                    <select
                      value={item.icon}
                      onChange={(e) =>
                        handleUpdateTickerItem(item.id, {
                          icon: e.target.value as any,
                        })
                      }
                      className="border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs bg-white font-semibold"
                    >
                      <option value="truck">🚚 Envíos / Camión</option>
                      <option value="tag">🏷️ Descuentos / Precios</option>
                      <option value="sparkles">✨ Novedad / Grabado</option>
                      <option value="credit-card">💳 Pagos / Tarjetas</option>
                      <option value="gift">🎁 Regalo / Combo</option>
                    </select>

                    {/* Texto del Mensaje */}
                    <div className="flex-1 min-w-0 w-full">
                      <input
                        type="text"
                        value={item.text}
                        onChange={(e) =>
                          handleUpdateTickerItem(item.id, { text: e.target.value })
                        }
                        placeholder="Texto del anuncio..."
                        className="w-full border border-slate-300 rounded-lg px-3 py-1.5 text-xs text-slate-900 bg-white font-medium focus:outline-none focus:border-alina-600"
                      />
                    </div>

                    {/* Enlace Opcional */}
                    <div className="w-full sm:w-48">
                      <input
                        type="text"
                        value={item.linkUrl || ""}
                        onChange={(e) =>
                          handleUpdateTickerItem(item.id, { linkUrl: e.target.value })
                        }
                        placeholder="Enlace opcional (/catalogo)"
                        className="w-full border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs text-slate-700 bg-white font-mono focus:outline-none focus:border-alina-600"
                      />
                    </div>

                    {/* Botón Eliminar */}
                    <button
                      type="button"
                      onClick={() => handleRemoveTickerMessage(item.id)}
                      className="text-slate-400 hover:text-red-600 p-1.5 rounded-lg hover:bg-red-50 transition-colors cursor-pointer shrink-0"
                      title="Eliminar mensaje"
                    >
                      <Trash2 className="size-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Botón Agregar Mensaje */}
              <button
                type="button"
                onClick={handleAddTickerMessage}
                className="w-full py-2.5 border-2 border-dashed border-slate-300 hover:border-alina-500 rounded-xl text-xs font-bold text-slate-600 hover:text-alina-700 flex items-center justify-center gap-1.5 transition-colors cursor-pointer bg-slate-50/50"
              >
                <Plus className="size-4" />
                <span>Agregar Nuevo Mensaje Promocional</span>
              </button>
            </div>
          </div>
        )}

        {/* Botón Guardar Flotante / Inferior */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            disabled={saving}
            className="bg-slate-900 hover:bg-slate-800 text-white font-display font-bold text-xs py-3 px-6 rounded-xl flex items-center gap-2 transition-all shadow-lg cursor-pointer disabled:opacity-50"
          >
            <Save className="size-4" />
            <span>{saving ? "Guardando cambios..." : "Guardar y Publicar en Tienda"}</span>
          </button>
        </div>
      </form>
    </main>
  );
}
