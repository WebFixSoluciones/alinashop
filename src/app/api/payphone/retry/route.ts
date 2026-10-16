import { NextResponse } from "next/server";
import { findOrderById, findOrderByOrderNumber, saveOrder } from "@/lib/orders-store";
import { preparePayphonePayment } from "@/lib/payphone";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId } = body;

    if (!orderId) {
      return NextResponse.json(
        { success: false, message: "orderId requerido" },
        { status: 400 }
      );
    }

    const order = findOrderById(orderId) || findOrderByOrderNumber(orderId);

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Pedido no encontrado" },
        { status: 404 }
      );
    }

    if (order.paymentStatus === "PAGADO") {
      return NextResponse.json({
        success: true,
        alreadyPaid: true,
        orderId: order.id,
        orderNumber: order.orderNumber,
      });
    }

    const origin =
      req.headers.get("origin") ||
      process.env.NEXT_PUBLIC_APP_URL ||
      "https://www.alinashop.com.ec";
    const baseUrl = origin.replace(/\/$/, "");
    const responseUrl = `${baseUrl}/pedido/${order.id}/confirmar-payphone`;

    const payphoneResult = await preparePayphonePayment({
      orderId: order.id,
      orderNumber: order.orderNumber,
      amount: order.total,
      clientEmail: order.customerEmail,
      clientPhone: order.customerPhone,
      responseUrl,
    });

    if (!payphoneResult.success || !payphoneResult.payUrl) {
      return NextResponse.json(
        {
          success: false,
          message:
            payphoneResult.error ||
            "No se pudo generar un nuevo link de pago con Payphone. Por favor intenta pagar por WhatsApp.",
        },
        { status: 502 }
      );
    }

    order.payphonePaymentId = payphoneResult.paymentId;
    order.payphonePayUrl = payphoneResult.payUrl;
    order.updatedAt = new Date().toISOString();
    saveOrder(order);

    return NextResponse.json({
      success: true,
      payUrl: payphoneResult.payUrl,
      paymentId: payphoneResult.paymentId,
      orderNumber: order.orderNumber,
    });
  } catch (error: any) {
    console.error("[Payphone Retry API Error]:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Error al reintentar pago con Payphone" },
      { status: 500 }
    );
  }
}
