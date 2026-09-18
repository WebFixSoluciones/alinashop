import { NextResponse } from "next/server";
import { getPromotionsConfig, updatePromotionsConfig } from "@/lib/promotions-store";
import { getAdminSession } from "@/lib/auth";

// GET: Obtener configuración de promociones (Público para Home y Navbar)
export async function GET() {
  try {
    const promotions = getPromotionsConfig();
    return NextResponse.json({ success: true, promotions });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}

// POST: Actualizar configuración de promociones (Requiere sesión de admin o colaborador)
export async function POST(req: Request) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json(
        { success: false, message: "Sesión no válida o expirada." },
        { status: 401 }
      );
    }

    const body = await req.json();
    const updated = updatePromotionsConfig(body);

    return NextResponse.json({ success: true, promotions: updated });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 500 });
  }
}
