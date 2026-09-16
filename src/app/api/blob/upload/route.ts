import { NextResponse } from "next/server";
import { put } from "@vercel/blob";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ success: false, message: "No file provided" }, { status: 400 });
    }

    // Si token de blob existe en ambiente de producción
    if (process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_READ_WRITE_TOKEN.includes("dummy")) {
      const blob = await put(`alina-catalog/${Date.now()}-${file.name}`, file, {
        access: "public",
      });
      return NextResponse.json({ success: true, url: blob.url });
    }

    // Fallback local / dev demo
    return NextResponse.json({
      success: true,
      url: `/logo.jpg`,
      note: "Local fallback preview image",
    });
  } catch (error: any) {
    console.error("Vercel Blob upload error:", error);
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
