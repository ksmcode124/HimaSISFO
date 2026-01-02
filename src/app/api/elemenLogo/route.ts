import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const elemen = await prisma.elemen_logo.findMany({
    include: {
      kabinet: {
        select: {
          id_kabinet: true,
          nama_kabinet: true,
          tahun_kerja: true,
        },
      },
    },
  });

  return NextResponse.json(elemen);
}

export async function POST(req: Request) {
  const body = await req.json();

  const elemen = await prisma.elemen_logo.create({
    data: {
      nama_elemen: body.nama_elemen,
      deskripsi_elemen: body.deskripsi_elemen,
      gambar_elemen: body.gambar_elemen,
      id_kabinet: body.id_kabinet,
    },
  });

  return NextResponse.json(elemen, { status: 201 });
}
