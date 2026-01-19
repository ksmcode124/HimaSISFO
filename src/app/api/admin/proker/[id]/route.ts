import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET /api/proker/:id
export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: idParam } = await params;
    const id = Number(idParam);

    const proker = await prisma.proker.findUnique({
      where: { id_proker: id },
    });

    if (!proker) {
      return NextResponse.json(
        { message: "Proker tidak ditemukan" },
        { status: 404 },
      );
    }

    return NextResponse.json(proker);
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal mengambil proker" },
      { status: 500 },
    );
  }
}

// PUT /api/proker/:id
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: idParam } = await params;
    const id = Number(idParam);
    const body = await req.json();

    const proker = await prisma.proker.update({
      where: { id_proker: id },
      data: body,
    });

    return NextResponse.json(proker);
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal mengupdate proker" },
      { status: 500 },
    );
  }
}

// DELETE /api/proker/:id
export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id: idParam } = await params;
    const id = Number(idParam);

    await prisma.proker.delete({
      where: { id_proker: id },
    });

    return NextResponse.json({ message: "Proker berhasil dihapus" });
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal menghapus proker" },
      { status: 500 },
    );
  }
}
