import { prisma } from "@/lib/prisma"
import { updateKabinetSchema } from "@/schemas/kabinet.schema"
import { NextResponse } from "next/server"
import { isZodError, isPrismaError } from "@/lib/validation";

type Params = {
  params: Promise<{
    id: string
  }>
}

// GET /api/kabinet/[id]
export async function GET(_: Request, { params }: Params) {
  try {
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
  } catch (error: unknown) {
    if (isZodError(error)) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    console.error("GET Kabinet Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
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
  } catch (error: unknown) {
    if (isZodError(error)) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    if (isPrismaError(error)) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: "Kabinet tidak ditemukan" },
          { status: 404 },
        );
      }
    }

    console.error("PATCH Kabinet Error:", error);
    return NextResponse.json(
      { message: "Gagal memperbarui kabinet" },
      { status: 400 },
    );
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
  } catch (error: unknown) {
    if (isZodError(error)) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    if (isPrismaError(error) && error.code === "P2025") {
      return NextResponse.json(
        { message: "Kabinet tidak ditemukan" },
        { status: 404 },
      );
    }

    console.error("DELETE Kabinet Error:", error);
    return NextResponse.json(
      { message: "Gagal menghapus kabinet" },
      { status: 400 },
    );
  }
}
