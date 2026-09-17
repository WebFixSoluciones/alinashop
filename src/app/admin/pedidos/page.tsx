'use client';

import React, { useState } from "react";
import { formatCurrency } from "@/lib/utils";
import {
  ShoppingBag,
  Filter,
  Search,
  Truck,
  CheckCircle2,
  Clock,
  Package,
  X,
  ExternalLink,
  MessageCircle,
  AlertCircle
} from "lucide-react";

interface MockOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  city: string;
  address: string;
  total: number;
  paymentMethod: string;
  orderStatus: "PENDIENTE" | "PAGADO" | "EN_PREPARACION" | "ENVIADO" | "ENTREGADO";
  items: string;
  courier?: string;
  trackingNumber?: string;
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<MockOrder[]>([
    {
      id: "ord_1",
      orderNumber: "ALN-2026-1082",
      customerName: "Pastelería Sweet Dreams (Karla Morales)",
      customerPhone: "0991234567",
      city: "Quito, Pichincha",
      address: "Av. Amazonas N24-102 y Colón",
      total: 20.16,
      paymentMethod: "Payphone Tarjeta",
      orderStatus: "PAGADO",
      items: "24x Base Rizada 20cm MDF Blanco (+Logo grabado)",
    },
    {
      id: "ord_2",
      orderNumber: "ALN-2026-1081",
      customerName: "Repostería Dulce Arte (Andrés Viteri)",
      customerPhone: "0987654321",
      city: "Guayaquil, Guayas",
      address: "Urdesa Central Calle 3ra #114",
      total: 10.00,
      paymentMethod: "Pedido WhatsApp",
      orderStatus: "PENDIENTE",
      items: "10x Topper Acrílico TAC004 (15cm Espejado)",
    },
    {
      id: "ord_3",
      orderNumber: "ALN-2026-1080",
      customerName: "Tortas y Bocaditos Mami (Rosa Loor)",
      customerPhone: "0998877665",
      city: "Cuenca, Azuay",
      address: "Remigio Crespo y Guayas",
      total: 45.30,
      paymentMethod: "Payphone Tarjeta",
      orderStatus: "EN_PREPARACION",
      items: "50x Base Cuadrada 25cm Blanco MDF 3mm",
    },
    {
      id: "ord_4",
      orderNumber: "ALN-2026-1079",
      customerName: "Karla Cárdenas",
      customerPhone: "0991122334",
      city: "Ambato, Tungurahua",
      address: "Cevallos y Montalvo",
      total: 15.50,
      paymentMethod: "Pedido WhatsApp",
      orderStatus: "ENVIADO",
      items: "12x Caja Acetato 21.5x24 Tapa Blanca",
      courier: "Servientrega",
      trackingNumber: "SER-9823471029",
    },
  ]);

  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrderForShipping, setSelectedOrderForShipping] = useState<MockOrder | null>(null);
  const [courierInput, setCourierInput] = useState("Servientrega");
  const [trackingNumberInput, setTrackingNumberInput] = useState("");

  const filteredOrders = orders.filter((o) => {
    const matchStatus = filterStatus === "ALL" || o.orderStatus === filterStatus;
    const matchQuery =
      o.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchStatus && matchQuery;
  });

  const handleUpdateStatus = (orderId: string, newStatus: MockOrder["orderStatus"]) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, orderStatus: newStatus } : o))
    );
  };

  const handleSaveShipping = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrderForShipping) return;

    setOrders((prev) =>
      prev.map((o) =>
        o.id === selectedOrderForShipping.id
          ? {
              ...o,
              orderStatus: "ENVIADO",
              courier: courierInput,
              trackingNumber: trackingNumberInput || `GUIA-${Date.now().toString().slice(-6)}`,
            }
          : o
      )
    );

    setSelectedOrderForShipping(null);
    setTrackingNumberInput("");
  };

  return (
    <main className="p-8 space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 pb-5">
        <div>
          <h1 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">
            Gestión de Pedidos & Envíos
          </h1>
          <p className="text-xs text-slate-500 mt-1">
            Control de estados de taller, transportistas y alertas a clientes
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 flex flex-wrap gap-3 items-center justify-between shadow-2xs">
        <div className="flex items-center gap-2 flex-wrap">
          {["ALL", "PENDIENTE", "PAGADO", "EN_PREPARACION", "ENVIADO", "ENTREGADO"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                filterStatus === status
                  ? "bg-slate-900 text-white border-slate-900"
                  : "bg-white text-slate-600 border-slate-200 hover:border-slate-300"
              }`}
            >
              {status === "ALL" ? "Todos" : status.replace("_", " ")}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar por N° orden o cliente..."
            className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-200 rounded-lg focus:outline-none focus:border-alina-600"
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="bg-white border border-slate-200 rounded-2xl shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
              <tr>
                <th className="p-4">N° Orden</th>
                <th className="p-4">Cliente & Destino</th>
                <th className="p-4">Detalle de Productos</th>
                <th className="p-4">Total</th>
                <th className="p-4">Estado</th>
                <th className="p-4 text-right">Acciones</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.map((ord) => (
                <tr key={ord.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <span className="font-display font-bold text-slate-900">{ord.orderNumber}</span>
                    <div className="text-[11px] text-slate-400 mt-0.5">{ord.paymentMethod}</div>
                  </td>

                  <td className="p-4">
                    <div className="font-semibold text-slate-800">{ord.customerName}</div>
                    <div className="text-slate-500 text-[11px]">{ord.city} · {ord.customerPhone}</div>
                  </td>

                  <td className="p-4 max-w-xs">
                    <span className="text-slate-700">{ord.items}</span>
                    {ord.courier && (
                      <div className="text-[11px] text-blue-700 font-semibold mt-1 flex items-center gap-1">
                        <Truck className="w-3 h-3 text-blue-600 shrink-0" />
                        <span>{ord.courier}: {ord.trackingNumber}</span>
                      </div>
                    )}
                  </td>

                  <td className="p-4">
                    <span className="font-display font-bold text-sm text-slate-900">
                      {formatCurrency(ord.total)}
                    </span>
                  </td>

                  <td className="p-4">
                    <select
                      value={ord.orderStatus}
                      onChange={(e) => handleUpdateStatus(ord.id, e.target.value as any)}
                      className="text-xs font-semibold rounded-lg border border-slate-200 px-2 py-1 bg-white focus:outline-none"
                    >
                      <option value="PENDIENTE">Pendiente</option>
                      <option value="PAGADO">Pagado</option>
                      <option value="EN_PREPARACION">En Taller / Fabricación</option>
                      <option value="ENVIADO">Enviado con Guía</option>
                      <option value="ENTREGADO">Entregado</option>
                    </select>
                  </td>

                  <td className="p-4 text-right space-x-2">
                    {ord.orderStatus !== "ENVIADO" && ord.orderStatus !== "ENTREGADO" && (
                      <button
                        onClick={() => setSelectedOrderForShipping(ord)}
                        className="inline-flex items-center gap-1 bg-slate-900 hover:bg-slate-800 text-white px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                      >
                        <Truck className="w-3.5 h-3.5" />
                        <span>Asignar Guía</span>
                      </button>
                    )}

                    <a
                      href={`https://wa.me/593${ord.customerPhone.slice(-9)}?text=Hola%20${encodeURIComponent(ord.customerName)},%20te%20saludamos%20de%20Alina%20Shop%20sobre%20tu%20pedido%20*${ord.orderNumber}*.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-colors"
                    >
                      <MessageCircle className="w-3.5 h-3.5" />
                      <span>WhatsApp</span>
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Asignar Guía de Envío */}
      {selectedOrderForShipping && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl relative">
            <button
              onClick={() => setSelectedOrderForShipping(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 p-1"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-display font-bold text-lg text-slate-900 mb-1">
              Asignar Guía de Envío
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Pedido: <strong className="text-slate-800">{selectedOrderForShipping.orderNumber}</strong> ({selectedOrderForShipping.customerName})
            </p>

            <form onSubmit={handleSaveShipping} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Empresa de Transporte
                </label>
                <select
                  value={courierInput}
                  onChange={(e) => setCourierInput(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 bg-white focus:outline-none focus:border-alina-600 font-medium"
                >
                  <option value="Servientrega">Servientrega</option>
                  <option value="LaarCourier">LaarCourier</option>
                  <option value="Cooperativa Baños">Cooperativa Baños</option>
                  <option value="Cooperativa Loja">Cooperativa Loja</option>
                  <option value="Motorizado Local">Motorizado Local (Quito)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Número de Guía de Remisión / Rastreo
                </label>
                <input
                  type="text"
                  required
                  value={trackingNumberInput}
                  onChange={(e) => setTrackingNumberInput(e.target.value)}
                  placeholder="Ej: SER-9823471029"
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-alina-600 font-mono"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedOrderForShipping(null)}
                  className="flex-1 bg-white border border-slate-200 text-slate-700 text-xs font-semibold py-2.5 rounded-xl hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-slate-900 text-white text-xs font-semibold py-2.5 rounded-xl hover:bg-slate-800"
                >
                  Confirmar Despacho
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
