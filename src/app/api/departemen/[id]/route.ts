import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";
import { departemenSchema } from "@/lib/validation";

type RouteParams = {
  params: { id: string };
};

// GET /api/departemen/[id]
export async function GET(_req: NextRequest, { params }: RouteParams) {
  try {
    const id = Number(params.id);
    if (Number.isNaN(id)) {
      return NextResponse.json({ message: "ID tidak valid" }, { status: 400 });
    }

    const departemen = await prisma.departemen.findUnique({
      where: { id_departemen: id },
      include: {
        proker: true,
        anggota: true,
      },
    });

    if (!departemen) {
      return NextResponse.json(
        { message: "Departemen tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(departemen);
  } catch (error) {
    console.error("GET /api/departemen/[id] error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// PUT /api/departemen/[id]
export async function PUT(req: NextRequest, { params }: RouteParams) {
  try {
    const id = Number(params.id);
    if (Number.isNaN(id)) {
      return NextResponse.json({ message: "ID tidak valid" }, { status: 400 });
    }

    const body = await req.json();

    // partial: supaya bisa update sebagian field saja
    const parsed = departemenSchema.partial().safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validasi gagal",
          errors: parsed.error.format(),
        },
        { status: 400 }
      );
    }

    const updated = await prisma.departemen.update({
      where: { id_departemen: id },
      data: parsed.data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/departemen/[id] error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// DELETE /api/departemen/[id]
export async function DELETE(_req: NextRequest, { params }: RouteParams) {
  try {
    const id = Number(params.id);
    if (Number.isNaN(id)) {
      return NextResponse.json({ message: "ID tidak valid" }, { status: 400 });
    }

    await prisma.departemen.delete({
      where: { id_departemen: id },
    });

    return NextResponse.json({ message: "Departemen dihapus" });
  } catch (error: any) {
    console.error("DELETE /api/departemen/[id] error:", error);

    // contoh handling kalau terikat FK
    if (error.code === "P2003") {
      return NextResponse.json(
        {
          message:
            "Departemen tidak bisa dihapus karena masih memiliki proker/anggota terkait",
        },
        { status: 400 }
      );
    }

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}