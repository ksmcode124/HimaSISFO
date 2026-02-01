import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

type Params = {
  params: Promise<{
    id: string
  }>
}

// GET /api/kabinet/[id]/elemenLogo
export async function GET(_: Request, { params }: Params) {
  const { id } = await params
  const kabinetId = Number(id)

  if (Number.isNaN(kabinetId)) {
    return NextResponse.json(
      { message: "ID kabinet tidak valid" },
      { status: 400 }
    )
  }

  const elemenLogo = await prisma.elemen_logo.findMany({
    where: { id_kabinet: kabinetId },
    orderBy: {
      id_elemen_logo: "asc",
    },
  })

  return NextResponse.json(elemenLogo)
}
