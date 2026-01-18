import { prisma } from "@/lib/prisma"
import { updateKomunitasSchema } from "@/schemas/komunitas.schema"
import { NextRequest } from "next/server"

// ==========================
// GET /api/komunitas/:id
// ==========================
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const komunitas = await prisma.komunitas.findUnique({
      where: { id_komunitas: Number(id) },
      include: {
        kabinet: true,
        pencapaian: true,
      },
    })

    if (!komunitas) {
      return Response.json({ message: "Komunitas tidak ditemukan" }, { status: 404 })
    }

    return Response.json(komunitas)
  } catch {
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}

// ==========================
// PUT /api/komunitas/:id
// ==========================
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await req.json()
    const data = updateKomunitasSchema.parse(body)

    const komunitas = await prisma.komunitas.update({
      where: { id_komunitas: Number(id) },
      data,
    })

    return Response.json(komunitas)
  } catch (error: any) {
    if (error.name === "ZodError") {
      return Response.json({ errors: error.errors }, { status: 400 })
    }
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}

// ==========================
// DELETE /api/komunitas/:id
// ==========================
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    await prisma.komunitas.delete({
      where: { id_komunitas: Number(id) },
    })

    return Response.json({ message: "Komunitas berhasil dihapus" })
  } catch {
    return Response.json({ message: "Gagal menghapus komunitas" }, { status: 500 })
  }
}
