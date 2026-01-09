import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

interface DepartemenDisplay {
  departemen: {
    nama_departemen: string;
    deskripsi_departemen: string | null;
    foto_departemen: string | null;
  };
  proker: {
    nama_proker: string;
    foto_proker: string | null;
    deskripsi_proker: string | null;
  }[];
  anggota: {
    nama_anggota: string;
    jabatan: string;
    foto_anggota: string | null;
  }[];
}

// ✅ 1) select dibuat typed dengan Prisma.validator
const departemenSelect = Prisma.validator<Prisma.departemenSelect>()({
  id_departemen: true,
  foto_departemen: true,
  nama_departemen: true,
  deskripsi_departemen: true,
  proker: {
    select: {
      nama_proker: true,
      foto_proker: true,
      deskripsi: true,
    },
  },
  detailAnggota: {
    select: {
      foto_anggota: true,
      anggota: {
        select: { nama_anggota: true },
      },
      jabatan: {
        select: { nama_jabatan: true },
      },
    },
    orderBy: [
      { jabatan: { nama_jabatan: "asc" } },
      { anggota: { nama_anggota: "asc" } },
    ],
  },
});

// ✅ 2) type hasil query di-infer dari select (tanpa interface manual)
type DepartemenQuery = Prisma.departemenGetPayload<{
  select: typeof departemenSelect;
}>;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const departemen = (await prisma.departemen.findUnique({
      where: { id_departemen: Number(id) },
      select: departemenSelect,
    })) as DepartemenQuery | null;

    if (!departemen) {
      return NextResponse.json(
        { success: false, message: 'Departemen tidak ditemukan' },
        { status: 404 }
      );
    }

    const response: DepartemenDisplay = {
      departemen: {
        nama_departemen: departemen.nama_departemen,
        deskripsi_departemen: departemen.deskripsi_departemen,
        foto_departemen: departemen.foto_departemen,
      },
      proker: departemen.proker.map((p) => ({
        nama_proker: p.nama_proker,
        foto_proker: p.foto_proker,
        deskripsi_proker: p.deskripsi,
      })),
      anggota: departemen.detailAnggota.map((d) => ({
        nama_anggota: d.anggota.nama_anggota,
        jabatan: d.jabatan.nama_jabatan,
        foto_anggota: d.foto_anggota,
      })),
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
