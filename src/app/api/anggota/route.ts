// /src/app/api/anggota/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// --- GET: Mengambil Daftar Anggota (dengan Filter & Include) ---

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const jabatanFilter = searchParams.get('jabatan');

    // Kondisi WHERE untuk filtering
    const whereClause: { jabatan?: string } = {};
    if (jabatanFilter) {
      whereClause.jabatan = jabatanFilter;
    }

    const dataAnggota = await prisma.anggota.findMany({
      where: whereClause,
      // INCLUDE: Memastikan relasi ke departemen ikut terambil
      include: {
        departemen: {
          select: {
            nama_departemen: true,
          },
        },
      },
      orderBy: {
        id_anggota: 'asc',
      },
    });

    return NextResponse.json({
      status: 200,
      message: 'Data anggota berhasil diambil',
      data: dataAnggota,
    }, { status: 200 });

  } catch (error) {
    // Penanganan 'error is of type unknown'
    console.error('Error saat mengambil data anggota:', error);
    return NextResponse.json({
      status: 500,
      message: 'Terjadi kesalahan pada server saat mengambil data anggota.',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}

// --- POST: Membuat Anggota Baru ---

export async function POST(request: Request) {
  // FIX: Memberikan nilai default NULL dan tipe eksplisit untuk mengatasi 'used before being assigned' dan 'any'
  let body: {
    nama_anggota: string,
    jabatan: string,
    foto_anggota?: string,
    id_departemen: string | number
  } | null = null; 

  try {
    body = await request.json(); 
    
    if (!body) {
         return NextResponse.json({ status: 400, message: 'Bad request: Body permintaan kosong.' }, { status: 400 });
    }

    const { nama_anggota, jabatan, foto_anggota, id_departemen } = body;

    // 1. Validasi Input Kritis
    if (!nama_anggota || !jabatan || !id_departemen) {
      return NextResponse.json({
        status: 400,
        message: 'Input wajib: nama_anggota, jabatan, dan id_departemen tidak boleh kosong.',
      }, { status: 400 });
    }

    // Pastikan id_departemen adalah integer yang valid
    const parsed_id_departemen = parseInt(id_departemen.toString());
    if (isNaN(parsed_id_departemen)) {
        return NextResponse.json({
            status: 400,
            message: 'id_departemen harus berupa angka.',
        }, { status: 400 });
    }

    // 2. Buat Anggota di Database
    const newAnggota = await prisma.anggota.create({
      data: {
        nama_anggota,
        jabatan,
        foto_anggota, 
        id_departemen: parsed_id_departemen,
      },
    });

    // 3. Response Berhasil
    return NextResponse.json({
      status: 201,
      message: 'Anggota baru berhasil ditambahkan.',
      data: newAnggota,
    }, { status: 201 });

  } catch (error) {
    console.error('Error saat membuat anggota baru:', error);

    // Penanganan error Prisma P2003 (Foreign Key)
    if (error && typeof error === 'object' && 'code' in error && error.code === 'P2003' && body !== null) {
        return NextResponse.json({
            status: 400,
            message: `Departemen dengan ID ${body.id_departemen} tidak ditemukan atau ID tidak valid.`,
        }, { status: 400 });
    }

    // Penanganan 'error is of type unknown'
    return NextResponse.json({
      status: 500,
      message: 'Terjadi kesalahan pada server saat membuat anggota.',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
  }
}