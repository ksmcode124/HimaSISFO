import { updateDepartemenSchema } from "@/schemas/departemen.schema"
import { prisma } from "@/lib/prisma"

// ==========================
// GET /api/departemen/:id
// Ambil 1 departemen
// ==========================
export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const departemen = await prisma.departemen.findUnique({
      where: { id_departemen: Number(id) },
      include: {
        kabinet: true,
        proker: true,
      },
    })

    if (!departemen) {
      return Response.json(
        { message: "Departemen tidak ditemukan" },
        { status: 404 }
      )
    }

    return Response.json(departemen)
  } catch {
    return Response.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

// ==========================
// PUT /api/departemen/:id
// Update departemen
// ==========================
export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params
    const body = await req.json();
    const data = updateDepartemenSchema.parse(body);

    const departemen = await prisma.departemen.update({
      where: { id_departemen: Number(id) },
      data,
    });

    return Response.json(departemen);
  } catch (error: any) {
    if (error.name === "ZodError") {
      return Response.json({ errors: error.errors }, { status: 400 });
    }

    return Response.json({ message: "Internal server error" }, { status: 500 });
  }
}

// ==========================
// DELETE /api/departemen/:id
// Hapus departemen
// ==========================
export async function DELETE(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.departemen.delete({
      where: { id_departemen: Number(id) },
    })

    return Response.json({
      message: "Departemen berhasil dihapus",
    })
  } catch {
    return Response.json(
      { message: "Gagal menghapus departemen" },
      { status: 500 }
    )
  }
}
