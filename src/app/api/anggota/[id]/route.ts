import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Interface untuk tipe params sesuai standar Next.js terbaru
interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET: Mengambil detail profil satu anggota beserta riwayat jabatannya
 */
export async function GET(req: Request, { params }: RouteParams) {
  try {
    const { id } = await params; // Wajib di-await di Next.js 15+
    const idInt = parseInt(id);

    const data = await prisma.anggota.findUnique({
      where: { id_anggota: idInt },
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
      return NextResponse.json({ error: "Anggota tidak ditemukan" }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan server" }, { status: 500 });
  }
}

/**
 * PATCH: Memperbarui informasi master anggota (misalnya nama)
 */
export async function PATCH(req: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const idInt = parseInt(id);
    
    const body = await req.json();
    const { nama_anggota } = body;

    if (!nama_anggota) {
      return NextResponse.json({ error: "Nama anggota harus diisi" }, { status: 400 });
    }

    const updatedAnggota = await prisma.anggota.update({
      where: { id_anggota: idInt },
      data: {
        nama_anggota: nama_anggota,
      },
    });

    return NextResponse.json({
      message: "Data anggota berhasil diperbarui",
      data: updatedAnggota
    });
  } catch (error) {
    console.error("PATCH Error:", error);
    return NextResponse.json({ error: "Gagal memperbarui data anggota" }, { status: 400 });
  }
}

/**
 * DELETE: Hapus anggota secara permanen
 */
export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const idInt = parseInt(id);

    await prisma.anggota.delete({
      where: { id_anggota: idInt },
    });

    return NextResponse.json({ message: "Anggota berhasil dihapus dari database" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ 
      error: "Gagal menghapus anggota. Pastikan ID benar atau tidak ada data yang bergantung." 
    }, { status: 400 });
  }
}