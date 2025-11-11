import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    // Ambil kepengurusan terbaru dengan divisi dan anggota
    const kepengurusan = await prisma.btw_kepengurusan.findFirst({
      orderBy: {
        tahun_kerja: 'desc',
      },
      include: {
        btw_divisi: {
          orderBy: {
            nama_divisi: 'asc',
          },
          include: {
            btw_anggota: {
              orderBy: {
                nama_anggota: 'asc',
              },
            },
          },
        },
      },
    });

    if (!kepengurusan) {
      return NextResponse.json(
        {
          success: false,
          message: 'Data BTW tidak ditemukan',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: kepengurusan,
    });
  } catch (error) {
    console.error('Error fetching BTW display:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Gagal mengambil data BTW',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
