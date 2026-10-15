import { NextResponse } from "next/server";
import { findOrderById, findOrderByOrderNumber } from "@/lib/orders-store";

interface RouteProps {
  params: Promise<{ id: string }>;
}

export async function GET(req: Request, { params }: RouteProps) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID de pedido requerido" },
        { status: 400 }
      );
    }

    const order = findOrderById(id) || findOrderByOrderNumber(id);

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Pedido no encontrado" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      order: {
        id: order.id,
        orderNumber: order.orderNumber,
        customerName: order.customerName,
        customerEmail: order.customerEmail,
        customerPhone: order.customerPhone,
        shippingAddress: order.shippingAddress,
        shippingCity: order.shippingCity,
        shippingProvince: order.shippingProvince,
        shippingMethod: order.shippingMethod,
        shippingCost: order.shippingCost,
        paymentMethod: order.paymentMethod,
        paymentStatus: order.paymentStatus,
        orderStatus: order.orderStatus,
        subtotal: order.subtotal,
        total: order.total,
        payphonePayUrl: order.payphonePayUrl,
        payphoneTransactionId: order.payphoneTransactionId,
        payphoneCardBrand: order.payphoneCardBrand,
        itemsCount: order.items?.length || 0,
        createdAt: order.createdAt,
      },
    });
  } catch (error: any) {
    console.error("[Orders Get API Error]:", error);
    return NextResponse.json(
      { success: false, message: error?.message || "Error al obtener pedido" },
      { status: 500 }
    );
  }
}
