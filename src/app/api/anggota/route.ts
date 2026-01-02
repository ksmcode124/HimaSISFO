import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET: Ambil daftar semua anggota
 */
export async function GET() {
  try {
    const data = await prisma.anggota.findMany({
      include: {
        detailAnggota: true, // Menyertakan riwayat jabatan mereka
      },
    });
    return NextResponse.json(data);
  } catch (error) {
    // Gunakan console.error(error) agar variabel 'error' terpakai dan membantu debugging
    console.error("GET Anggota Error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data anggota" }, 
      { status: 500 }
    );
  }
}

/**
 * POST: Tambah anggota baru ke database
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama_anggota } = body;

    // Validasi agar tidak membuat data kosong
    if (!nama_anggota) {
      return NextResponse.json(
        { error: "Nama anggota wajib diisi" }, 
        { status: 400 }
      );
    }

    const newAnggota = await prisma.anggota.create({
      data: { nama_anggota },
    });

    return NextResponse.json(newAnggota, { status: 201 });
  } catch (error) {
    console.error("POST Anggota Error:", error);
    return NextResponse.json(
      { error: "Gagal menambah anggota" }, 
      { status: 400 }
    );
  }
}