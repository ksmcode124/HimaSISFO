import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { createKomunitasSchema } from "@/schemas/komunitas.schema";
import { isZodError, isPrismaError } from "@/lib/validation";

// ==========================
// POST /api/komunitas
// Buat komunitas
// ==========================
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = createKomunitasSchema.parse(body);

    const komunitas = await prisma.komunitas.create({
      data,
      include: {
        kabinet: true,
        pencapaian: true, // RELASI ✅
      },
    });

    return NextResponse.json(komunitas, { status: 201 });
  } catch (error: unknown) {
    // Zod error
    if (isZodError(error)) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    // Prisma errors
    if (isPrismaError(error) && error.code === "P2002") {
      return NextResponse.json(
        { message: "Data komunitas duplikat (unique constraint)" },
        { status: 409 }
      );
    }

    if (isPrismaError(error) && error.code === "P2003") {
      return NextResponse.json(
        { message: "Relasi tidak valid (kabinet/pencapaian tidak ditemukan)" },
        { status: 400 }
      );
    }

    console.error("POST Komunitas Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// ==========================
// GET /api/komunitas (LIST)
// ==========================
export async function GET() {
  try {
    const data = await prisma.komunitas.findMany({
      include: {
        kabinet: true,
        pencapaian: true, // RELASI ✅
      },
      orderBy: { id_komunitas: "desc" },
    });

    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("GET Komunitas Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
