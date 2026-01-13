// Codingan bagus tapi jelek, ada lagi cek bawah


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
    }) as any;

    if (!departemen) {
      return NextResponse.json(
        { success: false, message: 'Departemen tidak ditemukan' },
        { status: 404 }
      );
    }

    const response  = {
      departemen: {
        nama_departemen: departemen.nama_departemen,
        deskripsi_departemen: departemen.deskripsi_departemen,
        foto_departemen: departemen.foto_departemen,
      },
      proker: departemen.proker.map((p:any) => ({
        id_proker: p.id_proker,
        nama_proker: p.nama_proker,
        foto_proker: p.foto_proker,
        deskripsi_proker: p.deskripsi,
      })),
      anggota: departemen.detailAnggota.map((d:any) => ({
        id_detail_anggota: d.id_detail_anggota,
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

// Codingan bagus tapi bagus

// import { NextRequest, NextResponse } from 'next/server';
// import { prisma } from '@/lib/prisma';
// import { Prisma } from '@prisma/client';

// /**
//  * =========================
//  * Prisma QUERY TYPE
//  * (khusus untuk hasil DB)
//  * =========================
//  */
// type DepartemenWithRelations = Prisma.departemenGetPayload<{
//   include: {
//     detailAnggota: {
//       include: {
//         anggota: true;
//         jabatan: true;
//       };
//     };
//     proker: true;
//   };
// }>;

// /**
//  * =========================
//  * API RESPONSE TYPE (DTO)
//  * =========================
//  */
// interface DepartemenResponse {
//   departemen: {
//     nama_departemen: string;
//     deskripsi_departemen: string | null;
//     foto_departemen: string | null;
//   };
//   proker: {
//     id_proker: number;
//     nama_proker: string;
//     foto_proker: string | null;
//     deskripsi_proker: string | null;
//   }[];
//   anggota: {
//     id_detail: number;
//     nama_anggota: string;
//     jabatan: string;
//     foto_anggota: string | null;
//   }[];
// }

// /**
//  * =========================
//  * API HANDLER
//  * =========================
//  */
// export async function GET(
//   request: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   try {
//     const { id } = await params;

//     const departemen = (await prisma.departemen.findUnique({
//       where: {
//         id_departemen: Number(id),
//       },
//       include: {
//         detailAnggota: {
//           include: {
//             anggota: true,
//             jabatan: true,
//           },
//           orderBy: [
//             { jabatan: { nama_jabatan: 'asc' } },
//             { anggota: { nama_anggota: 'asc' } },
//           ],
//         },
//         proker: true,
//       },
//     })) as DepartemenWithRelations | null;

//     if (!departemen) {
//       return NextResponse.json(
//         { success: false, message: 'Departemen tidak ditemukan' },
//         { status: 404 }
//       );
//     }

//     /**
//      * =========================
//      * MAPPING DB → RESPONSE
//      * =========================
//      */
//     const response: DepartemenResponse = {
//       departemen: {
//         nama_departemen: departemen.nama_departemen,
//         deskripsi_departemen: departemen.deskripsi_departemen,
//         foto_departemen: departemen.foto_departemen,
//       },
//       proker: departemen.proker.map((p) => ({
//         id_proker: p.id_proker,
//         nama_proker: p.nama_proker,
//         foto_proker: p.foto_proker,
//         deskripsi_proker: p.deskripsi,
//       })),
//       anggota: departemen.detailAnggota.map((d) => ({
//         id_detail: d.id_detail,
//         nama_anggota: d.anggota.nama_anggota,
//         jabatan: d.jabatan.nama_jabatan,
//         foto_anggota: d.foto_anggota,
//       })),
//     };

//     return NextResponse.json(response);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json(
//       { success: false, message: 'Gagal mengambil data' },
//       { status: 500 }
//     );
//   }
// }
