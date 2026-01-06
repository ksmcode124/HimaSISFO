import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    const departemen = await prisma.departemen.findUnique({
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
    });

    if (!departemen) {
      return NextResponse.json(
        { success: false, message: 'Departemen tidak ditemukan' },
        { status: 404 }
      );
    }

    return NextResponse.json(departemen);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil data' },
      { status: 500 }
    );
  }
}