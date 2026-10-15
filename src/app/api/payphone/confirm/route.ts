import { NextResponse } from "next/server";
import { confirmPayphonePayment } from "@/lib/payphone";
import { findOrderById, findOrderByOrderNumber, saveOrder } from "@/lib/orders-store";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id, clientTxId, orderId } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Parámetro 'id' de transacción no recibido de Payphone" },
        { status: 400 }
      );
    }

    // 1. Localizar la orden por orderId, clientTxId o número de orden
    const order =
      (orderId ? findOrderById(orderId) : undefined) ||
      (clientTxId ? findOrderByOrderNumber(clientTxId) : undefined) ||
      (clientTxId ? findOrderById(clientTxId) : undefined);

    // 2. Si la orden ya fue confirmada y pagada previamente (idempotencia)
    if (order && order.paymentStatus === "PAGADO") {
      return NextResponse.json({
        success: true,
        approved: true,
        alreadyPaid: true,
        orderId: order.id,
        orderNumber: order.orderNumber,
        transactionId: order.payphoneTransactionId || id,
        cardBrand: order.payphoneCardBrand || "Tarjeta de Crédito / Débito",
        lastDigits: order.payphoneLastDigits || "",
        authorizationCode: order.payphoneAuthorizationCode || "",
      });
    }

    // El clientTxId esperado por Payphone V2 Confirm es exactamente el 'clientTransactionId'
    // que se envió en 'preparePayphonePayment' (es decir, el orderNumber 'ALN-2026-XXXX')
    const targetTxId = order?.orderNumber || clientTxId;

    if (!targetTxId) {
      return NextResponse.json(
        { success: false, message: "No se pudo asociar la transacción a un número de orden válido" },
        { status: 400 }
      );
    }

    // 3. Confirmar estado de la transacción directamente con los servidores de Payphone
    const result = await confirmPayphonePayment(id, targetTxId);

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
        orderNumber: order?.orderNumber || targetTxId,
        transactionId: result.transactionId || id,
        cardBrand: result.cardBrand || "Tarjeta de Crédito / Débito",
        lastDigits: result.lastDigits || "",
        authorizationCode: result.authorizationCode || "",
      });
    } else {
      return NextResponse.json({
        success: false,
        approved: false,
        message:
          result.message ||
          "La transacción no fue aprobada por Payphone o fue declinada por la entidad emisora",
        statusCode: result.statusCode,
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
