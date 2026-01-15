import { prisma } from "@/lib/prisma"
import { updateKabinetSchema } from "@/schemas/kabinet.schema"
import { NextResponse } from "next/server"

type Params = {
  params: Promise<{
    id: string
  }>
}

// GET /api/kabinet/[id]
export async function GET(_: Request, { params }: Params) {
  const { id } = await params
  const kabinetId = Number(id)

  if (Number.isNaN(kabinetId)) {
    return NextResponse.json(
      { message: "ID kabinet tidak valid" },
      { status: 400 }
    )
  }

  const kabinet = await prisma.kabinet.findUnique({
    where: { id_kabinet: kabinetId },
    include: {
      departemen: true,
      elemen_logo: true,
    },
  })

  if (!kabinet) {
    return NextResponse.json(
      { message: "Kabinet tidak ditemukan" },
      { status: 404 }
    )
  }

  return NextResponse.json(kabinet)
}

// PATCH /api/kabinet/[id]
export async function PATCH(req: Request, { params }: Params) {
  try {
    const { id } = await params
    const kabinetId = Number(id)

    if (Number.isNaN(kabinetId)) {
      return NextResponse.json(
        { message: "ID kabinet tidak valid" },
        { status: 400 }
      )
    }

    const body = await req.json()
    const data = updateKabinetSchema.parse(body)

    const kabinet = await prisma.kabinet.update({
      where: { id_kabinet: kabinetId },
      data,
    })

    return NextResponse.json(kabinet)
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { errors: error.flatten() },
        { status: 400 }
      )
    }

    // Prisma: record not found
    if (error.code === "P2025") {
      return NextResponse.json(
        { message: "Kabinet tidak ditemukan" },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

// DELETE /api/kabinet/[id]
export async function DELETE(_: Request, { params }: Params) {
  try {
    const { id } = await params
    const kabinetId = Number(id)

    if (Number.isNaN(kabinetId)) {
      return NextResponse.json(
        { message: "ID kabinet tidak valid" },
        { status: 400 }
      )
    }

    await prisma.kabinet.delete({
      where: { id_kabinet: kabinetId },
    })

    return NextResponse.json({ message: "Kabinet berhasil dihapus" })
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { message: "Kabinet tidak ditemukan" },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
