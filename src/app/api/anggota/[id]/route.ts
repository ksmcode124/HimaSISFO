// /src/app/api/anggota/[id]/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
// Import tipe error khusus Prisma untuk penanganan yang lebih baik
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'; 

const prisma = new PrismaClient();

// Helper untuk parsing ID
function parseAnggotaId(id: string): number | null {
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    return null;
  }
  return parsedId;
}

// --- GET: Mengambil Detail Satu Anggota ---

export async function GET(
  request: Request,
  { params }: { params: { id: string } } 
) {
  const id_anggota = parseAnggotaId(params.id);

  if (id_anggota === null) {
    return NextResponse.json({ status: 400, message: 'ID anggota tidak valid.' }, { status: 400 });
  }

  try {
    const anggota = await prisma.anggota.findUnique({
      where: { id_anggota: id_anggota },
      include: {
        departemen: {
          select: {
            nama_departemen: true,
          },
        },
      },
    });

    if (!anggota) {
      return NextResponse.json({ status: 404, message: 'Anggota tidak ditemukan.' }, { status: 404 });
    }

    return NextResponse.json({ status: 200, message: 'Detail anggota berhasil diambil.', data: anggota }, { status: 200 });

  } catch (error) {
    // FIX: Penanganan 'error is of type unknown'
    console.error('Error saat mengambil detail anggota:', error);
    return NextResponse.json({ 
        status: 500, 
        message: 'Kesalahan server saat mengambil detail anggota.',
        error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

// --- PUT: Mengubah Data Anggota ---

export async function PUT(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id_anggota = parseAnggotaId(params.id);

    if (id_anggota === null) {
        return NextResponse.json({ status: 400, message: 'ID anggota tidak valid.' }, { status: 400 });
    }

    try {
        // FIX: Menggunakan tipe eksplisit yang disembunyikan dari linter
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const body: { [key: string]: any } = await request.json(); 
        const { id_departemen, ...rest } = body;
        
        // FIX: Menggunakan tipe eksplisit
        const updateData: { [key: string]: string | number | undefined } = rest;

        if (id_departemen !== undefined) {
            const parsed_id_departemen = parseInt(id_departemen.toString());
            if (isNaN(parsed_id_departemen)) {
                return NextResponse.json({
                    status: 400,
                    message: 'id_departemen harus berupa angka yang valid.',
                }, { status: 400 });
            }
            updateData.id_departemen = parsed_id_departemen;
        }

        const updatedAnggota = await prisma.anggota.update({
            where: { id_anggota: id_anggota },
            data: updateData,
        });

        return NextResponse.json({ status: 200, message: 'Anggota berhasil diubah.', data: updatedAnggota }, { status: 200 });

    } catch (error) {
        console.error('Error saat mengubah anggota:', error);

        // FIX: Menggunakan 'instanceof' untuk pengecekan tipe error Prisma
        if (error instanceof PrismaClientKnownRequestError) {
            // P2025: Record to update not found (Anggota tidak ditemukan)
            if (error.code === 'P2025') {
                return NextResponse.json({ status: 404, message: `Anggota dengan ID ${id_anggota} tidak ditemukan.` }, { status: 404 });
            }
            // P2003: Foreign key constraint failed (id_departemen tidak valid)
            if (error.code === 'P2003') {
                 return NextResponse.json({ status: 400, message: 'ID Departemen yang diberikan tidak valid.' }, { status: 400 });
            }
        }
        
        // FIX: Penanganan 'error is of type unknown'
        return NextResponse.json({ 
            status: 500, 
            message: 'Kesalahan server saat mengubah anggota.',
            error: error instanceof Error ? error.message : 'Unknown error' 
        }, { status: 500 });
    }
}


// --- DELETE: Menghapus Anggota ---

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
) {
    const id_anggota = parseAnggotaId(params.id);

    if (id_anggota === null) {
        return NextResponse.json({ status: 400, message: 'ID anggota tidak valid.' }, { status: 400 });
    }

    try {
        await prisma.anggota.delete({
            where: { id_anggota: id_anggota },
        });

        return NextResponse.json({ status: 200, message: `Anggota ID ${id_anggota} berhasil dihapus.` }, { status: 200 });

    } catch (error) {
        console.error('Error saat menghapus anggota:', error);

        // FIX: Menggunakan 'instanceof' untuk pengecekan tipe error Prisma
        if (error instanceof PrismaClientKnownRequestError && error.code === 'P2025') {
            return NextResponse.json({ status: 404, message: `Anggota dengan ID ${id_anggota} tidak ditemukan.` }, { status: 404 });
        }
        
        // FIX: Penanganan 'error is of type unknown'
        return NextResponse.json({ 
            status: 500, 
            message: 'Kesalahan server saat menghapus anggota.',
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 });
    }
}