import { prisma } from "@/lib/prisma"
import { updateElemenLogoSchema } from "@/schemas/elemenLogo.schema"
import { NextResponse } from "next/server"

type Params = {
  params: {
    id: string
  }
}

// GET /api/elemen-logo/[id]
export async function GET(_: Request, { params }: Params) {
  const id = Number(params.id)

  if (Number.isNaN(id)) {
    return NextResponse.json(
      { message: "ID elemen logo tidak valid" },
      { status: 400 }
    )
  }

  const elemen = await prisma.elemen_logo.findUnique({
    where: { id_elemen_logo: id },
    include: {
      kabinet: true,
    },
  })

  if (!elemen) {
    return NextResponse.json(
      { message: "Elemen logo tidak ditemukan" },
      { status: 404 }
    )
  }

  return NextResponse.json(elemen)
}

// PATCH /api/elemen-logo/[id]
export async function PATCH(req: Request, { params }: Params) {
  try {
    const id = Number(params.id)

    if (Number.isNaN(id)) {
      return NextResponse.json(
        { message: "ID elemen logo tidak valid" },
        { status: 400 }
      )
    }

    const body = await req.json()
    const data = updateElemenLogoSchema.parse(body)

    const elemen = await prisma.elemen_logo.update({
      where: { id_elemen_logo: id },
      data,
    })

    return NextResponse.json(elemen)
  } catch (error: any) {
    if (error.name === "ZodError") {
      return NextResponse.json(
        { errors: error.flatten() },
        { status: 400 }
      )
    }

    if (error.code === "P2025") {
      return NextResponse.json(
        { message: "Elemen logo tidak ditemukan" },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

// DELETE /api/elemen-logo/[id]
export async function DELETE(_: Request, { params }: Params) {
  try {
    const id = Number(params.id)

    if (Number.isNaN(id)) {
      return NextResponse.json(
        { message: "ID elemen logo tidak valid" },
        { status: 400 }
      )
    }

    await prisma.elemen_logo.delete({
      where: { id_elemen_logo: id },
    })

    return NextResponse.json({ message: "Elemen logo berhasil dihapus" })
  } catch (error: any) {
    if (error.code === "P2025") {
      return NextResponse.json(
        { message: "Elemen logo tidak ditemukan" },
        { status: 404 }
      )
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}
