import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"

type Params = {
  params: {
    id: string
  }
}

// GET /api/kabinet/[id]/elemenLogo
export async function GET(_: Request, { params }: Params) {
  const id_kabinet = Number(params.id)

  if (Number.isNaN(id_kabinet)) {
    return NextResponse.json(
      { message: "ID kabinet tidak valid" },
      { status: 400 }
    )
  }

  const elemenLogo = await prisma.elemen_logo.findMany({
    where: { id_kabinet },
    orderBy: {
      id_elemen_logo: "asc",
    },
  })

  return NextResponse.json(elemenLogo)
}
