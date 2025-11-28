import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET semua elemen logo
export async function GET() {
  try {
    const elemen = await prisma.elemen_logo.findMany({
      orderBy: { id_elemen_logo: "desc" },
      include: {
        kabinet: true // opsional
      }
    });

    return NextResponse.json(elemen);
  } catch (error) {
    return NextResponse.json({ message: "Gagal mengambil elemen" }, { status: 500 });
  }
}

// POST membuat elemen logo baru
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nama_elemen, deskripsi_elemen, gambar_elemen, id_kabinet } = body;

    const elemen = await prisma.elemen_logo.create({
      data: {
        nama_elemen,
        deskripsi_elemen,
        gambar_elemen,
        id_kabinet: Number(id_kabinet)
      }
    });

    return NextResponse.json(elemen, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: "Gagal menambah elemen" }, { status: 500 });
  }
}
