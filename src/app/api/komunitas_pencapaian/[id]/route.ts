import { prisma } from "@/lib/prisma"
import { updateKomunitasPencapaianSchema } from "@/schemas/komunitas_pencapaian.schema"
import { NextRequest } from "next/server"

// ==========================
// GET /api/komunitas_pencapaian/:id
// ==========================
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const pencapaian = await prisma.komunitas_pencapaian.findUnique({
      where: { id_pencapaian: Number(id) },
      include: {
        komunitas: {
          include: { kabinet: true },
        },
      },
    })

    if (!pencapaian) {
      return Response.json({ message: "Pencapaian tidak ditemukan" }, { status: 404 })
    }

    return Response.json(pencapaian)
  } catch {
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}

// ==========================
// PUT /api/komunitas_pencapaian/:id
// ==========================
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const data = updateKomunitasPencapaianSchema.parse(body)

    const pencapaian = await prisma.komunitas_pencapaian.update({
      where: { id_pencapaian: Number(id) },
      data,
    })

    return Response.json(pencapaian)
  } catch (error: any) {
    if (error.name === "ZodError") {
      return Response.json({ errors: error.errors }, { status: 400 })
    }
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}

// ==========================
// DELETE /api/komunitas_pencapaian/:id
// ==========================
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.komunitas_pencapaian.delete({
      where: { id_pencapaian: Number(id) },
    })

    return Response.json({ message: "Pencapaian berhasil dihapus" })
  } catch {
    return Response.json({ message: "Gagal menghapus pencapaian" }, { status: 500 })
  }
}
