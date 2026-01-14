import { prisma } from "@/lib/prisma"
import { updateKomunitasSchema } from "@/schemas/komunitas.schema"

// ==========================
// GET /api/komunitas/:id
// Ambil 1 komunitas
// ==========================
export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id)

    const komunitas = await prisma.komunitas.findUnique({
      where: { id_komunitas: id },
      include: {
        kabinet: true,
        pencapaian: true,
      },
    })

    if (!komunitas) {
      return Response.json(
        { message: "Komunitas tidak ditemukan" },
        { status: 404 }
      )
    }

    return Response.json(komunitas)
  } catch {
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}

// ==========================
// PUT /api/komunitas/:id
// Update komunitas
// ==========================
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()
    const data = updateKomunitasSchema.parse(body)

    const komunitas = await prisma.komunitas.update({
      where: { id_komunitas: Number(params.id) },
      data,
      include: {
        kabinet: true,
        pencapaian: true,
      },
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
// Hapus komunitas
// ==========================
export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.komunitas.delete({
      where: { id_komunitas: Number(params.id) },
    })

    return Response.json({ message: "Komunitas berhasil dihapus" })
  } catch {
    return Response.json(
      { message: "Gagal menghapus komunitas" },
      { status: 500 }
    )
  }
}
