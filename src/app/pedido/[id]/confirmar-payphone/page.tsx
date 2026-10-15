'use client';

import React, { useEffect, useState, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Loader2, CheckCircle2, AlertCircle, MessageCircle, ArrowLeft, RefreshCw } from "lucide-react";
import { useCart } from "@/context/cart-context";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ConfirmarPayphonePage({ params }: PageProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const resolvedParams = use(params);
  const orderId = resolvedParams.id;

  const transactionId = searchParams.get("id");
  const clientTxId = searchParams.get("clientTransactionId");

  const [status, setStatus] = useState<"loading" | "approved" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [orderNumber, setOrderNumber] = useState(clientTxId || "");

  const { clearCart } = useCart();

  useEffect(() => {
    async function verifyPayment() {
      // Si no hay parámetros de transacción devueltos por Payphone
      if (!transactionId || !clientTxId) {
        setStatus("error");
        setErrorMessage(
          "No se recibieron los parámetros de confirmación de Payphone. Si cancelaste el pago, puedes reintentar."
        );
        return;
      }

      try {
        const res = await fetch("/api/payphone/confirm", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: transactionId,
            clientTxId: clientTxId,
            orderId,
          }),
        });

        const data = await res.json();

        if (res.ok && data.approved) {
          setStatus("approved");
          setOrderNumber(data.orderNumber || clientTxId);
          clearCart();

          // Redireccionar a la pantalla de éxito con comprobante
          setTimeout(() => {
            router.push(
              `/pedido/${orderId}/exito?num=${encodeURIComponent(
                data.orderNumber || clientTxId
              )}&method=payphone&tx=${encodeURIComponent(transactionId)}`
            );
          }, 1500);
        } else {
          setStatus("error");
          setErrorMessage(
            data.message ||
              "La transacción no fue aprobada por Payphone o fue declinada por el banco emisor."
          );
        }
      } catch (err: any) {
        setStatus("error");
        setErrorMessage(
          err.message || "Error al conectar con el servicio de verificación de Payphone."
        );
      }
    }

    verifyPayment();
  }, [transactionId, clientTxId, orderId, clearCart, router]);

  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col items-center justify-center p-4 sm:p-6">
      <div className="max-w-md w-full bg-white border border-slate-200 rounded-3xl p-7 sm:p-8 shadow-xl text-center">
        {/* Logo oficial Alina Shop */}
        <div className="mb-6 flex justify-center">
          <Image
            src="/logo.jpg"
            alt="Alina Shop"
            width={140}
            height={50}
            className="h-10 w-auto object-contain"
            priority
          />
        </div>

        {status === "loading" && (
          <div className="space-y-4">
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
              Estamos validando la transacción con Payphone Ecuador y la red bancaria. Por favor no cierres esta página...
            </p>
          </div>
        )}

        {status === "approved" && (
          <div className="space-y-4 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-9 h-9" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              ¡Pago Aprobado con Éxito!
            </span>
            <h1 className="font-display font-extrabold text-xl text-slate-900">
              Transacción Acreditada
            </h1>
            <p className="text-xs text-slate-600">
              Orden: <strong className="font-mono text-slate-900">{orderNumber}</strong>
            </p>
            <p className="text-[11px] text-slate-400">
              Redirigiendo a tu comprobante de compra...
            </p>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-5 animate-in fade-in zoom-in-95 duration-300">
            <div className="w-16 h-16 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto border border-rose-200">
              <AlertCircle className="w-9 h-9" />
            </div>
            <span className="text-xs font-bold uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-200">
              No se pudo completar el cobro
            </span>
            <h1 className="font-display font-bold text-xl text-slate-900">
              Pago No Aprobado
            </h1>
            <div className="bg-rose-50/70 border border-rose-100 rounded-xl p-3.5 text-xs text-rose-800 text-left">
              {errorMessage}
            </div>

            <div className="space-y-2.5 pt-2">
              <Link
                href="/checkout"
                className="w-full bg-alina-600 hover:bg-alina-700 text-white font-display font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs shadow-md transition-all"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Reintentar Pago en Checkout</span>
              </Link>

              <a
                href={`https://wa.me/593985890956?text=Hola%20Alina%20Shop,%20tuve%20un%20inconveniente%20al%20pagar%20con%20Payphone%20el%20pedido%20*${orderNumber || orderId}*.%20¿Puedo%20pagar%20por%20transferencia?`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-display font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 text-xs transition-all"
              >
                <MessageCircle className="w-4 h-4 text-emerald-600" />
                <span>Coordinar Pago por WhatsApp</span>
              </a>

              <Link
                href="/catalogo"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 pt-2"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Volver a la tienda</span>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
