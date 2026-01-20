import { prisma } from "@/lib/prisma"
import { createElemenLogoSchema } from "@/schemas/elemenLogo.schema"
import { NextResponse } from "next/server"
import { isZodError, isPrismaError } from "@/lib/validation";

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validasi request
    const data = createElemenLogoSchema.parse(body)

    // Simpan ke database
    const elemen = await prisma.elemen_logo.create({
      data,
    })

    return NextResponse.json(elemen, { status: 201 })
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

// GET /api/elemen-logo (LIST)
export async function GET() {
  try {
    const data = await prisma.elemen_logo.findMany({
      include: {
        kabinet: true,
      },
    })

    return NextResponse.json(data)
  } catch (error: unknown) {
    if (isPrismaError(error)) {
      return NextResponse.json(
        { message: "Gagal mengambil data elemen logo" },
        { status: 400 },
      );
    }

    console.error("GET elemen logo List Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
