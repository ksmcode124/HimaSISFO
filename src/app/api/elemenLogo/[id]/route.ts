import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const elemen = await prisma.elemen_logo.findUnique({
    where: { id_elemen_logo: Number(params.id) },
    include: { kabinet: true },
  });

  if (!elemen) {
    return NextResponse.json(
      { message: "Elemen logo tidak ditemukan" },
      { status: 404 }
    );
  }

  return NextResponse.json(elemen);
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();

  const elemen = await prisma.elemen_logo.update({
    where: { id_elemen_logo: Number(params.id) },
    data: body,
  });

  return NextResponse.json(elemen);
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  await prisma.elemen_logo.delete({
    where: { id_elemen_logo: Number(params.id) },
  });

  return NextResponse.json({ message: "Elemen logo berhasil dihapus" });
}
