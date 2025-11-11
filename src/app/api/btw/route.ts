import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET all data (kepengurusan, divisi, anggota)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type'); // 'kepengurusan', 'divisi', 'anggota'

    if (type === 'kepengurusan') {
      const data = await prisma.btw_kepengurusan.findMany({
        orderBy: { tahun_kerja: 'desc' },
        include: {
          btw_divisi: true,
        },
      });
      return NextResponse.json({ success: true, data });
    }

    if (type === 'divisi') {
      const data = await prisma.btw_divisi.findMany({
        orderBy: { nama_divisi: 'asc' },
        include: {
          btw_kepengurusan: {
            select: { tahun_kerja: true },
          },
          btw_anggota: true,
        },
      });
      return NextResponse.json({ success: true, data });
    }

    if (type === 'anggota') {
      const data = await prisma.btw_anggota.findMany({
        orderBy: { nama_anggota: 'asc' },
        include: {
          btw_divisi: {
            select: { 
              nama_divisi: true,
              btw_kepengurusan: {
                select: { tahun_kerja: true }
              }
            },
          },
        },
      });
      return NextResponse.json({ success: true, data });
    }

    return NextResponse.json(
      { success: false, message: 'Type parameter required (kepengurusan/divisi/anggota)' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error in GET /api/btw:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal mengambil data' },
      { status: 500 }
    );
  }
}

// POST - Create data (kepengurusan, divisi, atau anggota)
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    if (type === 'kepengurusan') {
      const result = await prisma.btw_kepengurusan.create({
        data: {
          tahun_kerja: data.tahun_kerja,
        },
      });
      return NextResponse.json(
        { success: true, message: 'Kepengurusan berhasil dibuat', data: result },
        { status: 201 }
      );
    }

    if (type === 'divisi') {
      const result = await prisma.btw_divisi.create({
        data: {
          nama_divisi: data.nama_divisi,
          id_btw: data.id_btw,
        },
      });
      return NextResponse.json(
        { success: true, message: 'Divisi berhasil dibuat', data: result },
        { status: 201 }
      );
    }

    if (type === 'anggota') {
      const result = await prisma.btw_anggota.create({
        data: {
          nama_anggota: data.nama_anggota,
          jabatan: data.jabatan,
          foto_anggota: data.foto_anggota,
          id_divisi: data.id_divisi,
        },
      });
      return NextResponse.json(
        { success: true, message: 'Anggota berhasil dibuat', data: result },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Type tidak valid' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error in POST /api/btw:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal membuat data' },
      { status: 500 }
    );
  }
}

// PUT - Update data
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, id, data } = body;

    if (type === 'kepengurusan') {
      const result = await prisma.btw_kepengurusan.update({
        where: { id_btw: id },
        data: { tahun_kerja: data.tahun_kerja },
      });
      return NextResponse.json(
        { success: true, message: 'Kepengurusan berhasil diupdate', data: result }
      );
    }

    if (type === 'divisi') {
      const result = await prisma.btw_divisi.update({
        where: { id_divisi: id },
        data: {
          nama_divisi: data.nama_divisi,
          id_btw: data.id_btw,
        },
      });
      return NextResponse.json(
        { success: true, message: 'Divisi berhasil diupdate', data: result }
      );
    }

    if (type === 'anggota') {
      const result = await prisma.btw_anggota.update({
        where: { id_anggota: id },
        data: {
          nama_anggota: data.nama_anggota,
          jabatan: data.jabatan,
          foto_anggota: data.foto_anggota,
          id_divisi: data.id_divisi,
        },
      });
      return NextResponse.json(
        { success: true, message: 'Anggota berhasil diupdate', data: result }
      );
    }

    return NextResponse.json(
      { success: false, message: 'Type tidak valid' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error in PUT /api/btw:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal update data' },
      { status: 500 }
    );
  }
}

// DELETE - Hapus data
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const id = searchParams.get('id');

    if (!type || !id) {
      return NextResponse.json(
        { success: false, message: 'Type dan ID required' },
        { status: 400 }
      );
    }

    if (type === 'kepengurusan') {
      await prisma.btw_kepengurusan.delete({
        where: { id_btw: parseInt(id) },
      });
      return NextResponse.json({
        success: true,
        message: 'Kepengurusan berhasil dihapus',
      });
    }

    if (type === 'divisi') {
      await prisma.btw_divisi.delete({
        where: { id_divisi: parseInt(id) },
      });
      return NextResponse.json({
        success: true,
        message: 'Divisi berhasil dihapus',
      });
    }

    if (type === 'anggota') {
      await prisma.btw_anggota.delete({
        where: { id_anggota: parseInt(id) },
      });
      return NextResponse.json({
        success: true,
        message: 'Anggota berhasil dihapus',
      });
    }

    return NextResponse.json(
      { success: false, message: 'Type tidak valid' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Error in DELETE /api/btw:', error);
    return NextResponse.json(
      { success: false, message: 'Gagal menghapus data' },
      { status: 500 }
    );
  }
}
