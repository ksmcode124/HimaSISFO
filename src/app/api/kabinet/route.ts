import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const kabinet = await prisma.kabinet.findMany({
    select: {
      id_kabinet: true,
      nama_kabinet: true,
      tahun_kerja: true,
      gambar_logo: true,
      deskripsi: true,
      visi: true,
      misi: true,
    },
  });

  return NextResponse.json(kabinet);
}

export async function POST(req: Request) {
  const body = await req.json();

  const kabinet = await prisma.kabinet.create({
    data: {
      nama_kabinet: body.nama_kabinet,
      tahun_kerja: body.tahun_kerja,
      gambar_logo: body.gambar_logo ?? null,
      deskripsi: body.deskripsi ?? null,
      visi: body.visi ?? null,
      misi: body.misi ?? null,
    },
  });

  return NextResponse.json(kabinet, { status: 201 });
}
