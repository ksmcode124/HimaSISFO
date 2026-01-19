import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createAnggotaDetailSchema } from "@/schemas/anggota_detail.schema";

export async function GET() {
  try {
    const data = await prisma.detail_anggota.findMany({
      include: {
        anggota: true,
        kabinet: true,
        departemen: true,
        jabatan: true,
      },
      orderBy: { id_kabinet: "desc" },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET Anggota Detail Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validasi request
    const data = createAnggotaDetailSchema.parse(body);

    const mapping = await prisma.detail_anggota.create({
      data: {
        id_anggota: data.id_anggota,
        id_kabinet: data.id_kabinet,
        id_departemen: data.id_departemen,
        id_jabatan: data.id_jabatan,
        foto_anggota: data.foto_anggota ?? null,
      },
    });

    return NextResponse.json(mapping, { status: 201 });
  } catch (error: any) {
    // Zod error
    if (error?.name === "ZodError") {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    // Prisma error (unique/foreign key)
    // P2002: unique constraint failed (@@unique([id_anggota, id_kabinet]) misalnya)
    if (error?.code === "P2002") {
      return NextResponse.json(
        { message: "Anggota sudah terdaftar di kabinet ini" },
        { status: 409 }
      );
    }

    // P2003: foreign key constraint failed (id referensi tidak ada)
    if (error?.code === "P2003") {
      return NextResponse.json(
        { message: "Data referensi tidak ditemukan (FK invalid)" },
        { status: 400 }
      );
    }

    console.error("POST Anggota Detail Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
