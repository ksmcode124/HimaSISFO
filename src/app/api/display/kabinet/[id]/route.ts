import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getKabinetTheme } from "@/lib/theme/kabinetTheme";
import { Prisma } from "@prisma/client";
import { KabinetResponse } from "@/lib/types/interface"; // pastiin ini sama antara response dan interfacemya

// ========================================
// TYPE DEFINITIONS
// ========================================

// Type untuk Departemen Inti dengan semua relasi
type DepartemenIntiWithRelations = Prisma.departemenGetPayload<{
  include: {
    detailAnggota: {
      include: {
        anggota: true;
        jabatan: true;
      };
    };
  };
}>;

// ========================================
// API HANDLER
// ========================================

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const kabinetId = Number((await params).id);

    if (Number.isNaN(kabinetId)) {
      return NextResponse.json(
        { success: false, message: "ID kabinet tidak valid" },
        { status: 400 }
      );
    }

    const theme = getKabinetTheme(kabinetId);

    // ========================================
    // 1. Ambil semua kabinet untuk navigasi
    // ========================================
    const allKabinet = await prisma.kabinet.findMany({
      select: {
        id_kabinet: true,
        tahun_kerja: true,
      },
      orderBy: { tahun_kerja: "asc" },
    });

    // ========================================
    // 2. Ambil kabinet by id dengan elemen_logo
    // ========================================
    const kabinet = await prisma.kabinet.findUnique({
      where: { id_kabinet: kabinetId },
      include: { elemen_logo: true },
    });

    if (!kabinet) {
      return NextResponse.json(
        { success: false, message: "Kabinet tidak ditemukan" },
        { status: 404 }
      );
    }

    // ========================================
    // 3. Ambil departemen (kecuali Inti) milik kabinet ini
    // ========================================
    const departemen = await prisma.departemen.findMany({
      where: {
        id_kabinet: kabinetId,
      },
      orderBy: { nama_departemen: "asc" },
      select: {
        id_departemen: true,
        nama_departemen: true,
        logo_departemen: true,
      },
    });

    // ========================================
    // 4. Ambil departemen Inti SAJA dengan type-safe
    // ========================================
    const departemenInti = (await prisma.departemen.findFirst({
      where: {
        id_kabinet: kabinetId,
        nama_departemen: "Inti",
      },
      include: {
        detailAnggota: {
          include: {
            anggota: true,
            jabatan: true,
          },
          orderBy: [
            { jabatan: { nama_jabatan: "asc" } },
            { anggota: { nama_anggota: "asc" } },
          ],
        },
      },
    })) as DepartemenIntiWithRelations | null; // ✅ Type-safe, no 'any'!

    if (!departemenInti) {
      return NextResponse.json(
        { success: false, message: 'Departemen "Inti" tidak ditemukan' },
        { status: 404 }
      );
    }

     const response: KabinetResponse = {
      kabinet: {
        id_kabinet: kabinet.id_kabinet,
        nama_kabinet: kabinet.nama_kabinet,
        tahun_kerja: kabinet.tahun_kerja,
        deskripsi: kabinet.deskripsi,
        logo: kabinet.gambar_logo,
        elemen_logo: kabinet.elemen_logo.map((el) => ({
          id_elemen_logo: el.id_elemen_logo,
          nama_elemen: el.nama_elemen,
          gambar_elemen: el.gambar_elemen,
          deskripsi_elemen: el.deskripsi_elemen,
        })),
          departemenInti: {
          id_departemen: departemenInti.id_departemen,
          nama_departemen: departemenInti.nama_departemen,
          logo_departemen: departemenInti.logo_departemen,
              anggota: departemenInti.detailAnggota.map((d) => ({
                id: d.id_detail,
                nama: d.anggota.nama_anggota,         
                jabatan: d.jabatan.nama_jabatan,      
                foto: d.foto_anggota,                 
              })),
            },
      },
      departemen,
      kabinetList: allKabinet,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { success: false, message: "Gagal mengambil data" },
      { status: 500 }
    );
  }
}