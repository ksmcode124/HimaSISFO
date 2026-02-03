import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { isZodError, isPrismaError } from "@/lib/validation";
import {
  updateProkerSchema,
  prokerIdParamSchema,
} from "@/schemas/proker.schema";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// ==========================
// GET /api/proker/:id
// ==========================
export async function GET(_: Request, { params }: RouteParams) {
  try {
    const raw = await params;
    const { id } = prokerIdParamSchema.parse(raw);

    const proker = await prisma.proker.findUnique({
      where: { id_proker: id },
    });

    if (!proker) {
      return NextResponse.json(
        { message: "Proker tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json(proker);
  } catch (error: unknown) {
    if (isZodError(error)) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    console.error("GET Proker Error:", error);
    return NextResponse.json(
      { message: "Gagal mengambil proker" },
      { status: 500 },
    );
  }
}

// ==========================
// PUT /api/proker/:id
// ==========================
export async function PUT(req: Request, { params }: RouteParams) {
  try {
    const raw = await params;
    const { id } = prokerIdParamSchema.parse(raw);

    const body = await req.json();
    const data = updateProkerSchema.parse(body);

    const proker = await prisma.proker.update({
      where: { id_proker: id },
      data,
    });

    return NextResponse.json(proker);
  } catch (error: unknown) {
    if (isZodError(error)) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    if (isPrismaError(error) && error.code === "P2025") {
      return NextResponse.json(
        { message: "Proker tidak ditemukan" },
        { status: 404 },
      );
    }

    console.error("PUT Proker Error:", error);
    return NextResponse.json(
      { message: "Gagal mengupdate proker" },
      { status: 400 },
    );
  }
}

// ==========================
// DELETE /api/proker/:id
// ==========================
export async function DELETE(_: Request, { params }: RouteParams) {
  try {
    const raw = await params;
    const { id } = prokerIdParamSchema.parse(raw);

    await prisma.proker.delete({
      where: { id_proker: id },
    });

    return NextResponse.json({ message: "Proker berhasil dihapus" });
  } catch (error: unknown) {
    if (isZodError(error)) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    if (isPrismaError(error) && error.code === "P2025") {
      return NextResponse.json(
        { message: "Proker tidak ditemukan" },
        { status: 404 },
      );
    }

    console.error("DELETE Proker Error:", error);
    return NextResponse.json(
      { message: "Gagal menghapus proker" },
      { status: 400 },
    );
  }
}
