import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/**
 * GET: Meng mengambil semua daftar penugasan anggota
 * Menyertakan relasi lengkap agar data yang dikirim ke frontend informatif.
 */
export async function GET() {
  try {
    const data = await prisma.detail_anggota.findMany({
      include: {
        anggota: true,      // Mengambil data dari tabel anggota
        kabinet: true,      // Mengambil data kabinet
        departemen: true,   // Mengambil data departemen
        jabatan: true,      // Mengambil data jabatan
      },
      orderBy: {
        id_kabinet: 'desc'  // Mengurutkan dari kabinet terbaru
      }
    });

    return NextResponse.json(data);
  } catch (error) {
    // Menggunakan console.error agar variabel 'error' tidak dianggap unused oleh ESLint
    console.error("GET Anggota Detail Error:", error);
    return NextResponse.json(
      { error: "Gagal mengambil data detail anggota" },
      { status: 500 }
    );
  }
}

/**
 * POST: Menugaskan anggota ke departemen & jabatan tertentu
 */
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { id_anggota, id_kabinet, id_departemen, id_jabatan, foto_anggota } = body;

    // Validasi sederhana untuk memastikan ID penting telah dikirim
    if (!id_anggota || !id_kabinet || !id_departemen || !id_jabatan) {
      return NextResponse.json(
        { error: "ID anggota, kabinet, departemen, dan jabatan wajib diisi" },
        { status: 400 }
      );
    }

    const mapping = await prisma.detail_anggota.create({
      data: {
        id_anggota,
        id_kabinet,
        id_departemen,
        id_jabatan,
        foto_anggota,
      },
    });

    return NextResponse.json(mapping, { status: 201 });
  } catch (error) {
    console.error("POST Anggota Detail Error:", error);
    
    // Pesan error khusus untuk melanggar @@unique([id_anggota, id_kabinet])
    return NextResponse.json(
      { error: "Anggota sudah terdaftar di kabinet ini atau data referensi tidak ditemukan" },
      { status: 400 }
    );
  }
}