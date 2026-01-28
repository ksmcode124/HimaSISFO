import { prisma } from "@/lib/prisma"
import { updateElemenLogoSchema } from "@/schemas/elemenLogo.schema"
import { NextResponse } from "next/server"
import { isZodError, isPrismaError } from "@/lib/validation";

type Params = {
  params: Promise<{
    id: string
  }>
}

// GET /api/elemen-logo/[id]
export async function GET(_: Request, { params }: Params) {
  try {
    const { id } = await params
    const elemenLogoId = Number(id)

    if (Number.isNaN(elemenLogoId)) {
      return NextResponse.json(
        { message: "ID elemen logo tidak valid" },
        { status: 400 }
      )
    }

    const elemen = await prisma.elemen_logo.findUnique({
      where: { id_elemen_logo: elemenLogoId },
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
  } catch (error: unknown) {
    if (isZodError(error)) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    console.error("GET elemen logo Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

// PATCH /api/elemen-logo/[id]
export async function PATCH(req: Request, { params }: Params) {
  try {
    const { id } = await params
    const elemenLogoId = Number(id)

    if (Number.isNaN(elemenLogoId)) {
      return NextResponse.json(
        { message: "ID elemen logo tidak valid" },
        { status: 400 }
      )
    }

    const body = await req.json()
    const data = updateElemenLogoSchema.parse(body)

    const elemen = await prisma.elemen_logo.update({
      where: { id_elemen_logo: elemenLogoId },
      data,
    })

    return NextResponse.json(elemen)
  } catch (error: unknown) {
    if (isZodError(error)) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    if (isPrismaError(error)) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: "elemen logo tidak ditemukan" },
          { status: 404 },
        );
      }
    }

    console.error("PATCH elemen logo Error:", error);
    return NextResponse.json(
      { message: "Gagal memperbarui elemen logo" },
      { status: 400 },
    );
  }
}

// DELETE /api/elemen-logo/[id]
export async function DELETE(_: Request, { params }: Params) {
  try {
    const { id } = await params
    const elemenLogoId = Number(id)

    if (Number.isNaN(elemenLogoId)) {
      return NextResponse.json(
        { message: "ID elemen logo tidak valid" },
        { status: 400 }
      )
    }

    await prisma.elemen_logo.delete({
      where: { id_elemen_logo: elemenLogoId },
    })

    return NextResponse.json({ message: "Elemen logo berhasil dihapus" })
  } catch (error: unknown) {
    if (isZodError(error)) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    if (isPrismaError(error)) {
      if (error.code === "P2025") {
        return NextResponse.json(
          { message: "elemen logo tidak ditemukan" },
          { status: 404 },
        );
      }
    }

    console.error("DELETE elemen logo Error:", error);
    return NextResponse.json(
      { message: "Gagal mengahpus elemen logo" },
      { status: 400 },
    );
  }
}
