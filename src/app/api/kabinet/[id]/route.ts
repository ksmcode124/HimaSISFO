import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return NextResponse.json({ message: "ID tidak valid" }, { status: 400 });
  }

  const kabinet = await prisma.kabinet.findUnique({
    where: { id_kabinet: id },
    include: {
      elemen_logo: true,
      departemen: true,
      event: true,
      proker: true,
    },
  });

  if (!kabinet) {
    return NextResponse.json(
      { message: "Kabinet tidak ditemukan" },
      { status: 404 }
    );
  }

  return NextResponse.json(kabinet);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);
  const body = await req.json();

  const kabinet = await prisma.kabinet.update({
    where: { id_kabinet: id },
    data: {
      nama_kabinet: body.nama_kabinet,
      tahun_kerja: body.tahun_kerja,
      gambar_logo: body.gambar_logo,
      deskripsi: body.deskripsi,
      visi: body.visi,
      misi: body.misi,
    },
  });

  return NextResponse.json(kabinet);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id);

  await prisma.kabinet.delete({
    where: { id_kabinet: id },
  });

  return NextResponse.json({ message: "Kabinet berhasil dihapus" });
}
