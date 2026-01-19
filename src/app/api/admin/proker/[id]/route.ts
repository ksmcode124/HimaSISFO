import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

// GET /api/proker/:id
export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id)

  const proker = await prisma.proker.findUnique({
    where: { id_proker: id },
  })

  if (!proker) {
    return NextResponse.json({ message: "Proker tidak ditemukan" }, { status: 404 })
  }

  return NextResponse.json(proker)
}

// PUT /api/proker/:id
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id)
  const body = await req.json()

  const proker = await prisma.proker.update({
    where: { id_proker: id },
    data: body,
  })

  return NextResponse.json(proker)
}

// DELETE /api/proker/:id
export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  const id = Number(params.id)

  await prisma.proker.delete({
    where: { id_proker: id },
  })

  return NextResponse.json({ message: "Proker berhasil dihapus" })
}
