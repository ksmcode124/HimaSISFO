import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { createProkerSchema } from "@/schemas/proker.schema";
import { isZodError, isPrismaError } from "@/lib/validation";

// ==========================
// CREATE PROKER
// POST /api/proker
// ==========================
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = createProkerSchema.parse(body);

    const proker = await prisma.proker.create({
      data,
    });

    return NextResponse.json(proker, { status: 201 });
  } catch (error: unknown) {
    if (isZodError(error)) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    if (isPrismaError(error)) {
      if (error.code === "P2003") {
        return NextResponse.json(
          { message: "Relasi kabinet atau departemen tidak valid" },
          { status: 400 },
        );
      }
    }

    console.error("POST Proker Error:", error);
    return NextResponse.json(
      { message: "Gagal membuat proker" },
      { status: 500 },
    );
  }
}

// ==========================
// READ ALL PROKER
// GET /api/proker
// ==========================
export async function GET() {
  try {
    const proker = await prisma.proker.findMany({
      include: {
        departemen: true,
        kabinet: true,
      },
    });

    return NextResponse.json(proker);
  } catch (error: unknown) {
    console.error("GET Proker Error:", error);
    return NextResponse.json(
      { message: "Gagal mengambil data proker" },
      { status: 500 },
    );
  }
}
