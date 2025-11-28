import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET elemen logo by ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const elemen = await prisma.elemen_logo.findUnique({
      where: { id_elemen_logo: Number(params.id) }
    });

    return NextResponse.json(elemen);
  } catch (error) {
    return NextResponse.json({ message: "Gagal mengambil data" }, { status: 500 });
  }
}

// UPDATE elemen
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const { nama_elemen, deskripsi_elemen, gambar_elemen } = body;

    const elemen = await prisma.elemen_logo.update({
      where: { id_elemen_logo: Number(params.id) },
      data: {
        nama_elemen,
        deskripsi_elemen,
        gambar_elemen
      }
    });

    return NextResponse.json(elemen);
  } catch (error) {
    return NextResponse.json({ message: "Gagal update elemen" }, { status: 500 });
  }
}

// DELETE
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.elemen_logo.delete({
      where: { id_elemen_logo: Number(params.id) }
    });

    return NextResponse.json({ message: "Elemen logo dihapus" });
  } catch (error) {
    return NextResponse.json({ message: "Gagal menghapus elemen" }, { status: 500 });
  }
}
