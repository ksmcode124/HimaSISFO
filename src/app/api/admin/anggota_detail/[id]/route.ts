import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { detailIdParamSchema, updateAnggotaDetailSchema } from "@/schemas/anggota_detail.schema";
import { isZodError, isPrismaError } from "@/lib/validation";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: Request, { params }: RouteParams) {
  try {
    const raw = await params;
    const { id } = detailIdParamSchema.parse(raw);

    const detail = await prisma.detail_anggota.findUnique({
      where: { id_detail: id },
      include: {
        anggota: true,
        kabinet: true,
        departemen: true,
        jabatan: true,
      },
    });

    if (!detail) {
      return NextResponse.json({ message: "Detail anggota tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(detail);
  } catch (error: unknown) {
    if (isZodError(error)) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    console.error("GET Detail Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: RouteParams) {
  try {
    const raw = await params;
    const { id } = detailIdParamSchema.parse(raw);

    const body = await req.json();
    const data = updateAnggotaDetailSchema.parse(body);

    const updatedDetail = await prisma.detail_anggota.update({
      where: { id_detail: id },
      data: {
        ...(data.id_jabatan !== undefined ? { id_jabatan: data.id_jabatan } : {}),
        ...(data.id_departemen !== undefined ? { id_departemen: data.id_departemen } : {}),
        ...(data.foto_anggota !== undefined ? { foto_anggota: data.foto_anggota ?? null } : {}),
      },
    });

    return NextResponse.json(updatedDetail);
  } catch (error: unknown) {
    if (isZodError(error)) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    if (isPrismaError(error)) {
      if (error.code === "P2025") {
        return NextResponse.json({ message: "Detail anggota tidak ditemukan" }, { status: 404 });
      }
      if (error.code === "P2003") {
        return NextResponse.json(
          { message: "Data referensi tidak ditemukan (FK invalid)" },
          { status: 400 }
        );
      }
    }

    console.error("PATCH Detail Error:", error);
    return NextResponse.json({ message: "Gagal memperbarui detail anggota" }, { status: 400 });
  }
}

export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const raw = await params;
    const { id } = detailIdParamSchema.parse(raw);

    await prisma.detail_anggota.delete({
      where: { id_detail: id },
    });

    return NextResponse.json({ message: "Penugasan anggota berhasil dihapus" });
  } catch (error: unknown) {
    if (isZodError(error)) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    if (isPrismaError(error) && error.code === "P2025") {
      return NextResponse.json({ message: "Detail anggota tidak ditemukan" }, { status: 404 });
    }

    console.error("DELETE Detail Error:", error);
    return NextResponse.json({ message: "Gagal menghapus data" }, { status: 400 });
  }
}
