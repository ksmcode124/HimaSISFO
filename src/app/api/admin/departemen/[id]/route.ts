import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  updateDepartemenSchema,
  departemenIdParamSchema,
} from "@/schemas/departemen.schema";
import { isZodError, isPrismaError } from "@/lib/validation";

interface RouteParams {
  params: Promise<{ id: string }>;
}

// ==========================
// GET /api/departemen/:id
// ==========================
export async function GET(req: Request, { params }: RouteParams) {
  try {
    const raw = await params;
    const { id } = departemenIdParamSchema.parse(raw);

    const departemen = await prisma.departemen.findUnique({
      where: { id_departemen: id },
      include: {
        kabinet: true,
        proker: true,
      },
    });

    if (!departemen) {
      return NextResponse.json(
        { message: "Departemen tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json(departemen);
  } catch (error: unknown) {
    if (isZodError(error)) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    console.error("GET Departemen Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

// ==========================
// PUT /api/departemen/:id
// ==========================
export async function PUT(req: Request, { params }: RouteParams) {
  try {
    const raw = await params;
    const { id } = departemenIdParamSchema.parse(raw);

    const body = await req.json();
    const data = updateDepartemenSchema.parse(body);

    const updated = await prisma.departemen.update({
      where: { id_departemen: id },
      data,
    });

    return NextResponse.json(updated);
  } catch (error: unknown) {
    if (isZodError(error)) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    if (isPrismaError(error)) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: "Departemen tidak ditemukan" },
          { status: 404 },
        );
      }
    }

    console.error("PUT Departemen Error:", error);
    return NextResponse.json(
      { message: "Gagal memperbarui departemen" },
      { status: 400 },
    );
  }
}

// ==========================
// DELETE /api/departemen/:id
// ==========================
export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const raw = await params;
    const { id } = departemenIdParamSchema.parse(raw);

    await prisma.departemen.delete({
      where: { id_departemen: id },
    });

    return NextResponse.json({
      message: "Departemen berhasil dihapus",
    });
  } catch (error: unknown) {
    if (isZodError(error)) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    if (isPrismaError(error) && error.code === "P2025") {
      return NextResponse.json(
        { message: "Departemen tidak ditemukan" },
        { status: 404 },
      );
    }

    console.error("DELETE Departemen Error:", error);
    return NextResponse.json(
      { message: "Gagal menghapus departemen" },
      { status: 400 },
    );
  }
}
