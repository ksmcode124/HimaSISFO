import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createAnggotaSchema } from "@/schemas/anggota.schema";
import { isZodError, isPrismaError } from "@/lib/validation";

export async function GET() {
  try {
    const data = await prisma.anggota.findMany({
      include: { detailAnggota: true },
    });

    return NextResponse.json(data);
  } catch (error: unknown) {
    console.error("GET Anggota Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validasi request (Zod)
    const data = createAnggotaSchema.parse(body);

    const newAnggota = await prisma.anggota.create({
      data,
    });

    return NextResponse.json(newAnggota, { status: 201 });
  } catch (error: unknown) {
    // Zod error
    if (isZodError(error)) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    /**
     * Prisma errors yang mungkin terjadi:
     * - P2002: Unique constraint (misal nama_anggota unique)
     * - P2003: Foreign key (kalau anggota punya FK tertentu; di kasus ini mungkin jarang)
     */
    if (isPrismaError(error) && error.code === "P2002") {
      return NextResponse.json(
        { message: "Data anggota duplikat (unique constraint)" },
        { status: 409 }
      );
    }

    if (isPrismaError(error) && error.code === "P2003") {
      return NextResponse.json(
        { message: "Data referensi tidak ditemukan (FK invalid)" },
        { status: 400 }
      );
    }

    console.error("POST Anggota Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
