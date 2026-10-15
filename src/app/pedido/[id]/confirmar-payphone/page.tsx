'use client';

import React, { useEffect, useState, use, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  Loader2,
  CheckCircle2,
  AlertCircle,
  MessageCircle,
  ArrowLeft,
  CreditCard,
  RotateCcw,
  ShoppingBag,
} from "lucide-react";
import { useCart } from "@/context/cart-context";

interface PageProps {
  params: Promise<{ id: string }>;
}

interface OrderDetails {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone?: string;
  total: number;
  paymentStatus: string;
  payphonePayUrl?: string;
  payphoneTransactionId?: string;
  payphoneCardBrand?: string;
}

function ConfirmarPayphoneContent({ orderId }: { orderId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { clearCart } = useCart();

  const [order, setOrder] = useState<OrderDetails | null>(null);
  const [status, setStatus] = useState<
    "loading" | "verifying" | "approved" | "error" | "cancelled"
  >("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [txDetails, setTxDetails] = useState<{
    txId?: string | number;
    cardBrand?: string;
  }>({});

  // 1. Cargar detalles del pedido desde la API interna
  useEffect(() => {
    let isMounted = true;

    async function loadOrder() {
      try {
        const res = await fetch(`/api/orders/${orderId}`);
        if (res.ok) {
          const data = await res.json();
          if (data.success && isMounted) {
            setOrder(data.order);
            // Si el pedido ya está pagado (idempotencia o recarga de página)
            if (data.order.paymentStatus === "PAGADO") {
              setStatus("approved");
              clearCart();
              setTimeout(() => {
                router.push(
                  `/pedido/${orderId}/exito?num=${encodeURIComponent(
                    data.order.orderNumber
                  )}&method=payphone`
                );
              }, 2000);
            }
          }
        }
      } catch (err) {
        console.warn("No se pudo cargar orden:", err);
      }
    }

    loadOrder();
    return () => {
      isMounted = false;
    };
  }, [orderId, clearCart, router]);

  // 2. Extraer parámetros de Payphone y verificar si hay transacción
  useEffect(() => {
    // Helper para leer query params desde searchParams o window.location
    const getParam = (key: string): string | null => {
      const val = searchParams?.get(key);
      if (val) return val;
      if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(key);
      }
      return null;
    };

    const transactionId =
      getParam("id") ||
      getParam("Id") ||
      getParam("ID") ||
      getParam("transactionId");

    const clientTxId =
      getParam("clientTransactionId") ||
      getParam("clientTxId") ||
      getParam("orderNumber");

    // Si no hay 'id' de transacción en la URL de retorno
    // (el usuario canceló, cerró la pasarela o Payphone denegó acceso sandbox)
    if (!transactionId) {
      // Si el pedido ya fue detectado como pagado, no cambiar a cancelled
      if (status !== "approved") {
        setStatus("cancelled");
      }
      return;
    }

    // Si hay transactionId, proceder con la confirmación segura Server-to-Server
    async function verifyWithPayphone() {
      setStatus("verifying");

      try {
        const res = await fetch("/api/payphone/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: transactionId,
            clientTxId: clientTxId || order?.orderNumber,
            orderId,
          }),
        });

        const data = await res.json();

        if (res.ok && data.approved) {
          setStatus("approved");
          setTxDetails({
            txId: data.transactionId || transactionId,
            cardBrand: data.cardBrand,
          });
          clearCart();

          // Redirección suave al comprobante final
          setTimeout(() => {
            const finalNum = data.orderNumber || order?.orderNumber || clientTxId || orderId;
            router.push(
              `/pedido/${orderId}/exito?num=${encodeURIComponent(
                finalNum
              )}&method=payphone&tx=${encodeURIComponent(String(transactionId))}`
            );
          }, 2000);
        } else {
          setStatus("error");
          setErrorMessage(
            data.message ||
              "La transacción no fue aprobada por la entidad emisora o Payphone."
          );
        }
      } catch (err: any) {
        setStatus("error");
        setErrorMessage(
          err.message || "Error al conectar con el servicio de verificación de Payphone."
        );
      }
    }

    verifyWithPayphone();
  }, [searchParams, orderId, order?.orderNumber, status, clearCart, router]);

  const displayOrderNum = order?.orderNumber || `ALN-2026-${orderId.slice(-4)}`;
  const displayTotal = order?.total ? `$${order.total.toFixed(2)} USD` : "";

  return (
    <div className="min-h-screen bg-slate-50/70 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xl text-center">
        {/* Logo oficial Alina Shop */}
        <div className="mb-6 flex justify-center">
          <Link href="/">
            <Image
              src="/logo.jpg"
              alt="Alina Shop"
              width={140}
              height={50}
              className="h-10 w-auto object-contain hover:opacity-90 transition-opacity"
              priority
            />
          </Link>
        </div>

        {/* ESTADO 1: VERIFICANDO PAGO */}
        {(status === "loading" || status === "verifying") && (
          <div className="space-y-4 py-4">
            <div className="w-16 h-16 bg-alina-50 text-alina-600 rounded-full flex items-center justify-center mx-auto border border-alina-200">
              <Loader2 className="w-8 h-8 animate-spin" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-alina-600 bg-alina-50 px-3 py-1 rounded-full border border-alina-100">
              Verificando con Payphone
            </span>
            <h1 className="font-display font-bold text-xl text-slate-900">
              Confirmando tu Pago Seguro
            </h1>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
              Estamos validando la transacción con la red bancaria y Payphone Ecuador. Por favor espera un momento...
            </p>
          </div>
        )}

        {/* ESTADO 2: PAGO APROBADO */}
        {status === "approved" && (
          <div className="space-y-4 py-2 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              ¡Pago Aprobado con Éxito!
            </span>
            <h1 className="font-display font-extrabold text-xl text-slate-900">
              Transacción Acreditada
            </h1>
            <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-4 text-xs text-slate-700 text-left space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Número de Pedido:</span>
                <strong className="font-mono text-slate-900">{displayOrderNum}</strong>
              </div>
              {displayTotal && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Monto Acreditado:</span>
                  <strong className="text-emerald-700 font-bold">{displayTotal}</strong>
                </div>
              )}
              {txDetails.cardBrand && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Tarjeta:</span>
                  <span className="font-semibold text-slate-800">{txDetails.cardBrand}</span>
                </div>
              )}
            </div>
            <p className="text-[11px] text-slate-400">
              Redirigiendo automáticamente a tu comprobante digital...
            </p>
          </div>
        )}

        {/* ESTADO 3: PAGO DECLINADO / ERROR BANCARIO */}
        {status === "error" && (
          <div className="space-y-5 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto border border-rose-200">
              <AlertCircle className="w-9 h-9" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              Pago No Acreditado
            </span>
            <h1 className="font-display font-bold text-xl text-slate-900">
              No se pudo completar el cobro
            </h1>
            <div className="bg-rose-50/70 border border-rose-100 rounded-xl p-3.5 text-xs text-rose-800 text-left">
              {errorMessage}
            </div>

            {/* Resumen del Pedido */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3.5 text-xs text-left space-y-1">
              <div className="flex justify-between text-slate-600">
                <span>Pedido:</span>
                <strong className="font-mono text-slate-900">{displayOrderNum}</strong>
              </div>
              {displayTotal && (
                <div className="flex justify-between text-slate-600">
                  <span>Total pendiente:</span>
                  <strong className="text-slate-900">{displayTotal}</strong>
                </div>
              )}
            </div>

            <div className="space-y-2.5 pt-2">
              {order?.payphonePayUrl ? (
                <a
                  href={order.payphonePayUrl}
                  className="w-full bg-alina-600 hover:bg-alina-700 text-white font-display font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs shadow-md transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reintentar con Tarjeta (Payphone)</span>
                </a>
              ) : (
                <Link
                  href="/checkout"
                  className="w-full bg-alina-600 hover:bg-alina-700 text-white font-display font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs shadow-md transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reintentar en Checkout</span>
                </Link>
              )}

              <a
                href={`https://wa.me/593985890956?text=${encodeURIComponent(
                  `Hola Alina Shop, mi pago con tarjeta para el pedido *${displayOrderNum}* (${displayTotal}) no se completó. Deseo coordinar el pago por transferencia bancaria.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-display font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Pagar por Transferencia (WhatsApp)</span>
              </a>

              <Link
                href="/catalogo"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 pt-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver al catálogo</span>
              </Link>
            </div>
          </div>
        )}

        {/* ESTADO 4: TRANSACCIÓN CANCELADA / SESIÓN INTERRUMPIDA */}
        {status === "cancelled" && (
          <div className="space-y-5 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-amber-50 text-amber-600 rounded-full flex items-center justify-center mx-auto border border-amber-200">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              Pedido Reservado
            </span>
            <h1 className="font-display font-bold text-xl text-slate-900">
              Pago Pendiente en Pasarela
            </h1>
            <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
              No se completó la transacción con tarjeta en Payphone. Tu pedido ha quedado guardado y puedes pagarlo ahora mismo o por transferencia bancaria.
            </p>

            {/* Resumen de orden */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-xs text-left space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">N° de Pedido:</span>
                <strong className="font-mono text-slate-900 text-sm">{displayOrderNum}</strong>
              </div>
              {order?.customerName && (
                <div className="flex justify-between">
                  <span className="text-slate-500">Cliente:</span>
                  <span className="font-semibold text-slate-800">{order.customerName}</span>
                </div>
              )}
              {displayTotal && (
                <div className="flex justify-between border-t border-slate-200/70 pt-2">
                  <span className="text-slate-600 font-medium">Total a pagar:</span>
                  <strong className="text-alina-600 font-bold text-sm">{displayTotal}</strong>
                </div>
              )}
            </div>

            <div className="space-y-2.5 pt-1">
              {/* Opción 1: Reintentar pago con tarjeta si existe payUrl */}
              {order?.payphonePayUrl ? (
                <a
                  href={order.payphonePayUrl}
                  className="w-full bg-alina-600 hover:bg-alina-700 text-white font-display font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs shadow-md transition-all"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Reintentar Pago con Tarjeta</span>
                </a>
              ) : (
                <Link
                  href="/checkout"
                  className="w-full bg-alina-600 hover:bg-alina-700 text-white font-display font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs shadow-md transition-all"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Ir a Checkout a Pagar</span>
                </Link>
              )}

              {/* Opción 2: Pagar por WhatsApp / Transferencia */}
              <a
                href={`https://wa.me/593985890956?text=${encodeURIComponent(
                  `Hola Alina Shop, deseo pagar mi pedido *${displayOrderNum}* (${displayTotal}) mediante transferencia bancaria. Por favor envíenme los datos de la cuenta.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-display font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs shadow-sm transition-all"
              >
                <MessageCircle className="w-4 h-4 fill-current" />
                <span>Pagar por WhatsApp (Transferencia)</span>
              </a>

              {/* Opción 3: Volver a la tienda */}
              <Link
                href="/catalogo"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 pt-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver al catálogo</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ConfirmacionSkeleton() {
  return (
    <div className="min-h-screen bg-slate-50/70 flex flex-col items-center justify-center p-4">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-8 shadow-xl text-center space-y-4">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto animate-pulse" />
        <div className="h-4 bg-slate-100 rounded-full w-32 mx-auto animate-pulse" />
        <div className="h-6 bg-slate-100 rounded-md w-48 mx-auto animate-pulse" />
      </div>
    </div>
  );
}

export default function ConfirmarPayphonePage({ params }: PageProps) {
  const resolvedParams = use(params);
  const orderId = resolvedParams.id;

  return (
    <Suspense fallback={<ConfirmacionSkeleton />}>
      <ConfirmarPayphoneContent orderId={orderId} />
    </Suspense>
  );
}
