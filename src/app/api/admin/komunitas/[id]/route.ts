import { prisma } from "@/lib/prisma";
import { updateKomunitasSchema } from "@/schemas/komunitas.schema";
import { NextResponse } from "next/server";
import { isPrismaError, isZodError } from "@/lib/validation";
import { z } from "zod";

const idParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const raw = await params;
    const { id } = idParamSchema.parse(raw);

    const komunitas = await prisma.komunitas.findUnique({
      where: { id_komunitas: id },
      include: {
        kabinet: true,
        pencapaian: true,
      },
    });

    if (!komunitas) {
      return NextResponse.json({ message: "Komunitas tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(komunitas);
  } catch (error: unknown) {
    if (isZodError(error)) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    console.error("GET Komunitas by ID Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const raw = await params;
    const { id } = idParamSchema.parse(raw);

    const body = await req.json();
    const data = updateKomunitasSchema.parse(body);

    const komunitas = await prisma.komunitas.update({
      where: { id_komunitas: id },
      data,
    });

    return NextResponse.json(komunitas);
  } catch (error: unknown) {
    if (isZodError(error)) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    if (isPrismaError(error) && error.code === "P2025") {
      return NextResponse.json({ message: "Komunitas tidak ditemukan" }, { status: 404 });
    }

    if (isPrismaError(error) && error.code === "P2002") {
      return NextResponse.json(
        { message: "Data komunitas duplikat (unique constraint)" },
        { status: 409 }
      );
    }

    if (isPrismaError(error) && error.code === "P2003") {
      return NextResponse.json(
        { message: "Relasi tidak valid (FK invalid)" },
        { status: 400 }
      );
    }

    console.error("PUT Komunitas Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const raw = await params;
    const { id } = idParamSchema.parse(raw);

    await prisma.komunitas.delete({
      where: { id_komunitas: id },
    });

    return NextResponse.json({ message: "Komunitas berhasil dihapus" });
  } catch (error: unknown) {
    if (isZodError(error)) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    if (isPrismaError(error) && error.code === "P2025") {
      return NextResponse.json({ message: "Komunitas tidak ditemukan" }, { status: 404 });
    }

    if (isPrismaError(error) && error.code === "P2003") {
      return NextResponse.json(
        { message: "Tidak bisa hapus komunitas karena masih ada data yang bergantung (FK constraint)" },
        { status: 409 }
      );
    }

    console.error("DELETE Komunitas Error:", error);
    return NextResponse.json({ message: "Gagal menghapus komunitas" }, { status: 500 });
  }
}
