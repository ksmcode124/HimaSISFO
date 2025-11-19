import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";
import { prokerSchema } from "@/lib/validation";

type RouteParams = {
  params: { id: string };
};

// GET /api/proker/[id]
export async function GET(_req: NextRequest, { params }: RouteParams) {
  try {
    const id = Number(params.id);

    if (Number.isNaN(id)) {
      return NextResponse.json(
        { message: "ID tidak valid" },
        { status: 400 }
      );
    }

    const proker = await prisma.proker.findUnique({
      where: { id_proker: id },
      include: {
        departemen: true, // Bisa dihapus jika tidak butuh
      },
    });

    if (!proker) {
      return NextResponse.json(
        { message: "Proker tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(proker);
  } catch (error) {
    console.error("GET /api/proker/[id] error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// PUT /api/proker/[id]
export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const id = Number(params.id);

    if (Number.isNaN(id)) {
      return NextResponse.json(
        { message: "ID tidak valid" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const parsed = prokerSchema.partial().safeParse(body); // partial = boleh hanya update beberapa field

    if (!parsed.success) {
      return NextResponse.json(
        { message: "Validasi gagal", errors: parsed.error.format() },
        { status: 400 }
      );
    }

    const updated = await prisma.proker.update({
      where: { id_proker: id },
      data: parsed.data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/proker/[id] error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// DELETE /api/proker/[id]
export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  try {
    const id = Number(params.id);

    if (Number.isNaN(id)) {
      return NextResponse.json(
        { message: "ID tidak valid" },
        { status: 400 }
      );
    }

    await prisma.proker.delete({
      where: { id_proker: id },
    });

    return NextResponse.json({ message: "Proker berhasil dihapus" });
  } catch (error) {
    console.error("DELETE /api/proker/[id] error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}