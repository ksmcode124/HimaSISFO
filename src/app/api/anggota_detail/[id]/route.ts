import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// Interface untuk menangani asinkronus params pada Next.js 15+
interface RouteParams {
  params: Promise<{ id: string }>;
}

/**
 * GET: Mengambil data detail spesifik
 * Digunakan saat ingin melihat profil jabatan anggota tertentu secara mendalam.
 */
export async function GET(req: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const idInt = parseInt(id);

    const detail = await prisma.detail_anggota.findUnique({
      where: { id_detail: idInt },
      include: {
        anggota: true,
        kabinet: true,
        departemen: true,
        jabatan: true,
      },
    });

    if (!detail) {
      return NextResponse.json(
        { error: "Detail anggota tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(detail);
  } catch (error) {
    console.error("GET Detail Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

/**
 * PATCH: Memperbarui data penugasan
 * Contoh: Mengubah jabatan atau mengupdate foto anggota.
 */
export async function PATCH(req: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const idInt = parseInt(id);
    
    const body = await req.json();
    const { id_jabatan, id_departemen, foto_anggota } = body;

    const updatedDetail = await prisma.detail_anggota.update({
      where: { id_detail: idInt },
      data: {
        id_jabatan,
        id_departemen,
        foto_anggota,
      },
    });

    return NextResponse.json(updatedDetail);
  } catch (error) {
    console.error("PATCH Detail Error:", error);
    return NextResponse.json(
      { error: "Gagal memperbarui detail anggota" },
      { status: 400 }
    );
  }
}

/**
 * DELETE: Menghapus anggota dari kabinet
 * Ini hanya menghapus 'penugasan' saja, data Master Anggota tetap ada.
 */
export async function DELETE(req: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const idInt = parseInt(id);

    await prisma.detail_anggota.delete({
      where: { id_detail: idInt },
    });

    return NextResponse.json({ message: "Penugasan anggota berhasil dihapus" });
  } catch (error) {
    console.error("DELETE Detail Error:", error);
    return NextResponse.json(
      { error: "Gagal menghapus data" },
      { status: 400 }
    );
  }
}