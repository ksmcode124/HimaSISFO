import { createKabinetSchema } from "@/schemas/kabinet.schema"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

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
  } catch (error: any) {
    // Error dari Zod
    if (error.name === "ZodError") {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 })
    }

    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

// GET /api/kabinet (LIST)
export async function GET() {
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
}
