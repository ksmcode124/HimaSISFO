import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";
import { prokerSchema } from "@/lib/validation";

// GET /api/proker
export async function GET(req: NextRequest) {
  try {
    const idDepartemen = req.nextUrl.searchParams.get("id_departemen");

    const where = idDepartemen
      ? { id_departemen: Number(idDepartemen) || undefined }
      : {};

    const data = await prisma.proker.findMany({
      where,
      include: {
        departemen: true, // Bisa dihapus kalau tidak perlu
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/proker error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// POST /api/proker
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const parsed = prokerSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validasi gagal",
          errors: parsed.error.format(),
        },
        { status: 400 }
      );
    }

    const created = await prisma.proker.create({
      data: parsed.data,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("POST /api/proker error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}