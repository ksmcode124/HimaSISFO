import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET KABINET BY ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const kabinet = await prisma.kabinet.findUnique({
      where: { id_kabinet: Number(params.id) }
    });

    if (!kabinet) {
      return NextResponse.json(
        { message: "Kabinet tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(kabinet);
  } catch (error) {
    console.error("[GET KABINET BY ID ERROR]", error);
    return NextResponse.json(
      { message: "Gagal mengambil data kabinet" },
      { status: 500 }
    );
  }
}

// UPDATE KABINET
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const {
      nama_kabinet,
      tahun_kerja,
      gambar_logo,
      deskripsi,
      visi,
      misi,
      detail_deskripsi
    } = body;

    const kabinet = await prisma.kabinet.update({
      where: { id_kabinet: Number(params.id) },
      data: {
        nama_kabinet,
        tahun_kerja,
        gambar_logo,
        deskripsi,
        visi,
        misi,
        detail_deskripsi
      }
    });

    return NextResponse.json(kabinet);
  } catch (error) {
    console.error("[UPDATE KABINET ERROR]", error);
    return NextResponse.json(
      { message: "Gagal mengupdate kabinet" },
      { status: 500 }
    );
  }
}

// DELETE KABINET
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.kabinet.delete({
      where: { id_kabinet: Number(params.id) }
    });

    return NextResponse.json(
      { message: "Kabinet berhasil dihapus" },
      { status: 200 }
    );
  } catch (error) {
    console.error("[DELETE KABINET ERROR]", error);
    return NextResponse.json(
      { message: "Gagal menghapus kabinet" },
      { status: 500 }
    );
  }
}
