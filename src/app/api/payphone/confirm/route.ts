import { NextResponse } from "next/server";
import { confirmPayphonePayment } from "@/lib/payphone";
import { findOrderById, findOrderByOrderNumber, saveOrder } from "@/lib/orders-store";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, clientTxId, orderId } = body;

    if (!id || !clientTxId) {
      return NextResponse.json(
        { success: false, message: "Parámetros de transacción incompletos (id o clientTxId faltante)" },
        { status: 400 }
      );
    }

    // 1. Confirmar estado de la transacción directamente con los servidores de Payphone
    const result = await confirmPayphonePayment(id, clientTxId);

    // 2. Buscar la orden asociada en nuestra tienda
    const order =
      findOrderByOrderNumber(clientTxId) ||
      (orderId ? findOrderById(orderId) : undefined) ||
      findOrderById(clientTxId);

    if (result.approved) {
      if (order) {
        order.paymentStatus = "PAGADO";
        order.orderStatus = "PAGADO";
        order.payphoneTransactionId = String(result.transactionId || id);
        order.payphoneCardBrand = result.cardBrand || "Tarjeta de Crédito / Débito";
        order.payphoneLastDigits = result.lastDigits || "";
        order.payphoneAuthorizationCode = result.authorizationCode || "";
        order.updatedAt = new Date().toISOString();
        saveOrder(order);

        // Actualizar en base de datos SQL si está activa
        try {
          if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("dummy")) {
            await prisma.order.update({
              where: { orderNumber: order.orderNumber },
              data: {
                paymentStatus: "PAID",
                orderStatus: "PAGADO",
                payphoneTransactionId: String(result.transactionId || id),
              },
            });
          }
        } catch (dbErr) {
          // Continuar sin interrumpir el flujo
        }
      }

      return NextResponse.json({
        success: true,
        approved: true,
        orderId: order?.id || orderId,
        orderNumber: order?.orderNumber || clientTxId,
        transactionId: result.transactionId,
        cardBrand: result.cardBrand,
        lastDigits: result.lastDigits,
        authorizationCode: result.authorizationCode,
      });
    } else {
      return NextResponse.json({
        success: false,
        approved: false,
        message: result.message || "La transacción no fue aprobada por la entidad emisora",
      });
    }
  } catch (error: any) {
    console.error("[Payphone Confirm API Error]:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Error al verificar transacción con Payphone" },
      { status: 500 }
    );
  }
}
