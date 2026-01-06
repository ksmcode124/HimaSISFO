// api/display/btw/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
// import { mapkabinet } from '@/lib/btw/map';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const tahunKerja = searchParams.get('tahun');

    // Ambil semua tahun (untuk next/prev)
    const allYears = await prisma.kabinet.findMany({
      select: { tahun_kerja: true },
      orderBy: { tahun_kerja: 'asc' }
    });

    // Tentukan tahun target (atau pakai terbaru)
    const tahunList = allYears.map(y => y.tahun_kerja);
    const targetTahun = tahunKerja || tahunList[tahunList.length - 1];

    // Ambil data kabinet yg sesuai
    const kabinet = await prisma.kabinet.findFirst({
      where: { tahun_kerja: targetTahun },
      include: {elemen_logo: true}
    });

    if (!kabinet) {
      return NextResponse.json(
        { success: false, message: 'kabinet tidak ditemukan' },
        { status: 404 }
      );
    }

    const departemen = await prisma.departemen.findMany({
      orderBy: { nama_departemen: 'asc' },
    });

    const departemenWithMembers = departemen
      .map((departemen: any) => ({
        id_departemen: departemen.id_departemen,
        nama_departemen: departemen.nama_departemen,
        logo_departemen: departemen.logo_departemen ?? null,
      }));

    // ini nanti pake map dari lib biar 
    const response = {
      id_kabinet: kabinet.id_kabinet,
      tahun_kerja: kabinet.tahun_kerja,
      nama_kabinet: kabinet.nama_kabinet,
      deskripsi_kabinet: kabinet.deskripsi,
      logo_kabinet: kabinet.gambar_logo,
      // elemen_logo: kabinet.elemen_logo,
      departemen: departemenWithMembers,
      tahunList,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil data' },
      { status: 500 }
    );
  }
}