import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { createKomunitasSchema } from "@/schemas/komunitas.schema"

// ==========================
// POST /api/komunitas
// Buat komunitas
// ==========================
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = createKomunitasSchema.parse(body)

    const komunitas = await prisma.komunitas.create({
      data,
      include: {
        kabinet: true,
        pencapaian: true,
      },
    })

    return Response.json(komunitas, { status: 201 })
  } catch (error: any) {
    if (error.name === "ZodError") {
      return Response.json({ errors: error.errors }, { status: 400 })
    }

    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}

// ==========================
// GET /api/komunitas (LIST)
// ==========================
export async function GET() {
  try {
    const data = await prisma.komunitas.findMany({
      include: {
        kabinet: true,
        pencapaian: true,
      },
      orderBy: {
        id_komunitas: "desc",
      },
    })

    return NextResponse.json(data)
  } catch {
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
