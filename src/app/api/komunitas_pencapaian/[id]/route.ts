import { prisma } from "@/lib/prisma"
import { updateKomunitasPencapaianSchema } from "@/schemas/komunitas_pencapaian.schema"

// ==========================
// GET /api/komunitas_pencapaian/:id
// Ambil 1 pencapaian
// ==========================
export async function GET(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = Number(params.id)

    const pencapaian = await prisma.komunitas_pencapaian.findUnique({
      where: { id_pencapaian: id },
      include: {
        komunitas: {
          include: {
            kabinet: true,
          },
        },
      },
    })

    if (!pencapaian) {
      return Response.json(
        { message: "Pencapaian tidak ditemukan" },
        { status: 404 }
      )
    }

    return Response.json(pencapaian)
  } catch {
    return Response.json({ message: "Internal server error" }, { status: 500 })
  }
}

// ==========================
// PUT /api/komunitas_pencapaian/:id
// Update pencapaian
// ==========================
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()
    const data = updateKomunitasPencapaianSchema.parse(body)

    const pencapaian = await prisma.komunitas_pencapaian.update({
      where: { id_pencapaian: Number(params.id) },
      data,
      include: {
        komunitas: {
          include: {
            kabinet: true,
          },
        },
      },
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
// Hapus pencapaian
// ==========================
export async function DELETE(
  _: Request,
  { params }: { params: { id: string } }
) {
  try {
    await prisma.komunitas_pencapaian.delete({
      where: { id_pencapaian: Number(params.id) },
    })

    return Response.json({ message: "Pencapaian berhasil dihapus" })
  } catch {
    return Response.json(
      { message: "Gagal menghapus pencapaian" },
      { status: 500 }
    )
  }
}
