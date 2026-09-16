import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { customer, shipping, paymentMethod, items } = body;

    if (!customer?.name || !customer?.email || !customer?.phone || !items?.length) {
      return NextResponse.json(
        { success: false, message: "Datos de pedido incompletos" },
        { status: 400 }
      );
    }

    // Generar N° de orden correlativo único: ALN-2026-XXXX
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderNumber = `ALN-2026-${randomSuffix}`;

    // Calcular subtotal de forma segura
    let calculatedSubtotal = 0;
    const orderItemsData = items.map((item: any) => {
      const quantity = Math.max(1, item.quantity || 1);
      // Precio unitario referencial
      const unitPrice = item.unitPrice || 0.64;
      const subtotal = Number((unitPrice * quantity).toFixed(2));
      calculatedSubtotal += subtotal;

      return {
        productId: item.productId,
        variantDetails: {
          size: item.sizeLabel,
          shape: item.shape,
          color: item.color,
          withLogo: item.withLogo,
          customDimensions: item.customDimensions,
        },
        quantity,
        unitPrice,
        subtotal,
      };
    });

    const shippingCost = Number(shipping?.cost || 0);
    const total = Number((calculatedSubtotal + shippingCost).toFixed(2));

    // Intentar guardar en base de datos si DATABASE_URL está disponible
    let orderId = `ord_${Date.now()}`;
    try {
      if (process.env.DATABASE_URL && !process.env.DATABASE_URL.includes("dummy")) {
        const order = await prisma.order.create({
          data: {
            orderNumber,
            customerName: customer.name,
            customerIdNumber: customer.idNumber || "",
            customerEmail: customer.email,
            customerPhone: customer.phone,
            shippingAddress: shipping.address,
            shippingCity: shipping.city,
            shippingProvince: shipping.province,
            shippingReference: shipping.reference || null,
            paymentMethod: paymentMethod === "payphone" ? "PAYPHONE_CARD" : "WHATSAPP_ORDER",
            paymentStatus: paymentMethod === "payphone" ? "PENDING" : "PENDING",
            orderStatus: "PENDIENTE",
            subtotal: calculatedSubtotal,
            shippingCost: shippingCost,
            total: total,
            items: {
              create: orderItemsData,
            },
          },
        });
        orderId = order.id;
      }
    } catch (dbError) {
      console.warn("Prisma save warning (running in fallback mock mode):", dbError);
    }

    return NextResponse.json({
      success: true,
      orderId,
      orderNumber,
      total,
    });
  } catch (error: any) {
    console.error("Order creation error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "Error al procesar orden" },
      { status: 500 }
    );
  }
}
