import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { createKomunitasPencapaianSchema } from "@/schemas/komunitas_pencapaian.schema"

// ==========================
// POST /api/komunitas_pencapaian
// Buat pencapaian komunitas
// ==========================
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = createKomunitasPencapaianSchema.parse(body)

    const pencapaian = await prisma.komunitas_pencapaian.create({
      data,
      include: {
        komunitas: {
          include: {
            kabinet: true,
          },
        },
      },
    })

    return Response.json(pencapaian, { status: 201 })
  } catch (error: any) {
    if (error.name === "ZodError") {
      return Response.json({ errors: error.errors }, { status: 400 })
    }

    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}

// ==========================
// GET /api/komunitas_pencapaian (LIST)
// Optional filter: ?id_komunitas=1
// ==========================
export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const idKomunitas = searchParams.get("id_komunitas")
    const where = idKomunitas
      ? { id_komunitas: Number(idKomunitas) }
      : undefined

    const data = await prisma.komunitas_pencapaian.findMany({
      where,
      include: {
        komunitas: {
          include: {
            kabinet: true,
          },
        },
      },
      orderBy: {
        id_pencapaian: "desc",
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
