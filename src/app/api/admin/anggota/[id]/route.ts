import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { anggotaIdParamSchema, updateAnggotaSchema } from "@/schemas/anggota.schema";
import { isZodError, isPrismaError } from "@/lib/validation";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(_req: Request, { params }: RouteParams) {
  try {
    const raw = await params;

    // Validasi params.id -> number int positive
    const { id } = anggotaIdParamSchema.parse(raw);

    const data = await prisma.anggota.findUnique({
      where: { id_anggota: id },
      include: {
        detailAnggota: {
          include: {
            kabinet: true,
            departemen: true,
            jabatan: true,
          },
        },
      },
    });

    if (!data) {
      return NextResponse.json({ message: "Anggota tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error: unknown) {
    if (isZodError(error)) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    console.error("GET Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: RouteParams) {
  try {
    const raw = await params;
    const { id } = anggotaIdParamSchema.parse(raw);

    const body = await req.json();
    const data = updateAnggotaSchema.parse(body);

    // Update nama_anggota di tabel anggota
    if (data.nama_anggota) {
      await prisma.anggota.update({
        where: { id_anggota: id },
        data: { nama_anggota: data.nama_anggota },
      });
    }

    // Update foto_anggota & id_jabatan di detail_anggota (jika ada)
    if (data.foto_anggota || data.id_jabatan || data.id_departemen) {
      // Cari detail_anggota berdasarkan id_anggota + id_kabinet + id_departemen
      if (!data.id_kabinet || !data.id_departemen) {
        return NextResponse.json(
          { message: "id_kabinet dan id_departemen diperlukan untuk update foto/jabatan" },
          { status: 400 }
        );
      }

      const detailUpdate: any = {};
      
      if (data.id_jabatan) detailUpdate.id_jabatan = data.id_jabatan;
      if (data.foto_anggota) {
        // Handle upload result
        let fotoUrl = data.foto_anggota;
        if (Array.isArray(data.foto_anggota) && data.foto_anggota.length > 0) {
          const first = data.foto_anggota[0];
          fotoUrl = first.url || first.fileUrl || first;
        }
        detailUpdate.foto_anggota = fotoUrl || null;
      }

      await prisma.detail_anggota.updateMany({
        where: {
          id_anggota: id,
          id_kabinet: data.id_kabinet,
          id_departemen: data.id_departemen,
        },
        data: detailUpdate,
      });
    }

    const updatedAnggota = await prisma.anggota.findUnique({
      where: { id_anggota: id },
      include: {
        detailAnggota: {
          include: {
            kabinet: true,
            departemen: true,
            jabatan: true,
          },
        },
      },
    });

    return NextResponse.json({
      message: "Data anggota berhasil diperbarui",
      data: updatedAnggota,
    });
  } catch (error: unknown) {
    if (isZodError(error)) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    if (isPrismaError(error) && error.code === "P2025") {
      return NextResponse.json({ message: "Anggota tidak ditemukan" }, { status: 404 });
    }

    console.error("PATCH Error:", error);
    return NextResponse.json({ message: "Gagal memperbarui data anggota" }, { status: 400 });
  }
}

export async function DELETE(_req: Request, { params }: RouteParams) {
  try {
    const raw = await params;
    const { id } = anggotaIdParamSchema.parse(raw);

    await prisma.anggota.delete({
      where: { id_anggota: id },
    });

    return NextResponse.json({ message: "Anggota berhasil dihapus dari database" });
  } catch (error: unknown) {
    if (isZodError(error)) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    // Prisma: record not found
    if (isPrismaError(error) && error.code === "P2025") {
      return NextResponse.json({ message: "Anggota tidak ditemukan" }, { status: 404 });
    }

    // Prisma: FK constraint (misal detail_anggota masih bergantung)
    if (isPrismaError(error) && error.code === "P2003") {
      return NextResponse.json(
        { message: "Tidak bisa hapus anggota karena masih ada data yang bergantung (FK constraint)" },
        { status: 409 }
      );
    }

    console.error("DELETE Error:", error);
    return NextResponse.json(
      { message: "Gagal menghapus anggota. Pastikan ID benar atau tidak ada data yang bergantung." },
      { status: 400 }
    );
  }
}
