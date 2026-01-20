import { createKabinetSchema } from "@/schemas/kabinet.schema"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { isZodError, isPrismaError } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validasi request
    const data = createKabinetSchema.parse(body)

    // Simpan ke database
    const kabinet = await prisma.kabinet.create({
      data,
    })

    return NextResponse.json(kabinet, { status: 201 })
  } catch (error: unknown) {
    if (isZodError(error)) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    if (isPrismaError(error)) {
      return NextResponse.json(
        { message: "Gagal menyimpan kabinet" },
        { status: 400 },
      );
    }

    console.error("POST Kabinet Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

// GET /api/kabinet (LIST)
export async function GET() {
  try {
    const data = await prisma.kabinet.findMany({
      include: {
        elemen_logo: true,
        departemen: true,
        detailAnggota: {
          include: {
            anggota: true,
            jabatan: true,
            departemen: true,
          },
        },
        event: true,
        proker: true,
      },
    })

    return NextResponse.json(data)
  } catch (error: unknown) {
    if (isPrismaError(error)) {
      return NextResponse.json(
        { message: "Gagal mengambil data kabinet" },
        { status: 400 },
      );
    }

    console.error("GET Kabinet List Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
