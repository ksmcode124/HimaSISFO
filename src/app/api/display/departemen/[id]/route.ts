// Codingan bagus tapi bagus

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';
import { DepartemenResponse } from '@/lib/types/interface';

// ngambil tipe data sama relasinya
type DepartemenWithRelations = Prisma.departemenGetPayload<{
  include: {
    detailAnggota: {
      include: {
        anggota: true;
        jabatan: true;
      };
    };
    proker: true;
  };
}>;

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const departemen = (await prisma.departemen.findUnique({
      where: {
        id_departemen: Number(id),
      },
      include: {
        detailAnggota: {
          include: {
            anggota: true,
            jabatan: true,
          },
          orderBy: [
            { jabatan: { nama_jabatan: 'asc' } },
            { anggota: { nama_anggota: 'asc' } },
          ],
        },
        proker: true,
      },
    })) as DepartemenWithRelations | null;

    if (!departemen) {
      return NextResponse.json(
        { success: false, message: 'Departemen tidak ditemukan' },
        { status: 404 }
      );
    }

    // mapping response 
    const response: DepartemenResponse = {
      departemen: {
        nama_departemen: departemen.nama_departemen,
        deskripsi_departemen: departemen.deskripsi_departemen,
        foto_departemen: departemen.foto_departemen,
        logo_departemen: departemen.logo_departemen,
      },
      proker: departemen.proker.map((p) => ({
        id_proker: p.id_proker,
        nama_proker: p.nama_proker,
        foto_proker: p.foto_proker,
        deskripsi_proker: p.deskripsi,
      })),
      anggota: departemen.detailAnggota.map((d) => ({
        id_detail: d.id_detail,
        nama_anggota: d.anggota.nama_anggota,
        jabatan: d.jabatan.nama_jabatan,
        foto_anggota: d.foto_anggota,
      })),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil data' },
      { status: 500 }
    );
  }
}
