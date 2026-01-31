import { prisma } from "@/lib/prisma";
import { updateKomunitasPencapaianSchema, komunitas_pencapaianIdParamSchema } from "@/schemas/komunitas_pencapaian.schema";
import { NextResponse } from "next/server";
import { isPrismaError, isZodError } from "@/lib/validation";

// ==========================
// GET /api/komunitas_pencapaian/:id
// ==========================
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const raw = await params;
    const { id } = komunitas_pencapaianIdParamSchema.parse(raw);

    const pencapaian = await prisma.komunitas_pencapaian.findUnique({
      where: { id_pencapaian: id },
      include: {
        komunitas: {
          include: { kabinet: true },
        },
      },
    });

    if (!pencapaian) {
      return NextResponse.json({ message: "Pencapaian tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(pencapaian);
  } catch (error: unknown) {
    if (isZodError(error)) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    console.error("GET Komunitas Pencapaian by ID Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// ==========================
// PUT /api/komunitas_pencapaian/:id
// ==========================
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const raw = await params;
    const { id } = komunitas_pencapaianIdParamSchema.parse(raw);

    const body = await req.json();
    const data = updateKomunitasPencapaianSchema.parse(body);

    const pencapaian = await prisma.komunitas_pencapaian.update({
      where: { id_pencapaian: id },
      data,
    });

    return NextResponse.json(pencapaian);
  } catch (error: unknown) {
    if (isZodError(error)) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    // Prisma: record not found
    if (isPrismaError(error) && error.code === "P2025") {
      return NextResponse.json({ message: "Pencapaian tidak ditemukan" }, { status: 404 });
    }

    // Prisma: FK invalid (kalau update id_komunitas misalnya)
    if (isPrismaError(error) && error.code === "P2003") {
      return NextResponse.json(
        { message: "Relasi tidak valid (FK invalid)" },
        { status: 400 }
      );
    }

    console.error("PUT Komunitas Pencapaian Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

// ==========================
// DELETE /api/komunitas_pencapaian/:id
// ==========================
export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const raw = await params;
    const { id } = komunitas_pencapaianIdParamSchema.parse(raw);

    await prisma.komunitas_pencapaian.delete({
      where: { id_pencapaian: id },
    });

    return NextResponse.json({ message: "Pencapaian berhasil dihapus" });
  } catch (error: unknown) {
    if (isZodError(error)) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    if (isPrismaError(error) && error.code === "P2025") {
      return NextResponse.json({ message: "Pencapaian tidak ditemukan" }, { status: 404 });
    }

    console.error("DELETE Komunitas Pencapaian Error:", error);
    return NextResponse.json({ message: "Gagal menghapus pencapaian" }, { status: 500 });
  }
}
