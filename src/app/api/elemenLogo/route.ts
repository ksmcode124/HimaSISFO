import { prisma } from "@/lib/prisma"
import { createElemenLogoSchema } from "@/schemas/elemenLogo.schema"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    // Validasi request
    const data = createElemenLogoSchema.parse(body)

    // Simpan ke database
    const elemen = await prisma.elemen_logo.create({
      data,
    })

    return NextResponse.json(elemen, { status: 201 })
  } catch (error: any) {
    if (error.name === "ZodError") {
      return Response.json(
        { errors: error.flatten() },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

// GET /api/elemen-logo (LIST)
export async function GET() {
  const data = await prisma.elemen_logo.findMany({
    include: {
      kabinet: true,
    },
  })

  return NextResponse.json(data)
}
