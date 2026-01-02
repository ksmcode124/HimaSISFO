import { createDepartemenSchema } from "@/schemas/departemen.schema"
import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"


export async function POST(req: Request) {
  try {
    const body = await req.json()

    
    // Validasi request
    const data = createDepartemenSchema.parse(body)

    // Simpan ke database
    const departemen = await prisma.departemen.create({
      data,
    })

    return Response.json(departemen, { status: 201 })
  } catch (error: any) {
    // Error dari Zod
    if (error.name === "ZodError") {
      return Response.json(
        { errors: error.errors },
        { status: 400 }
      )
    }

    return Response.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

// GET /api/departemen (LIST)
export async function GET() {
  const data = await prisma.departemen.findMany({
    include: {
      kabinet: true,
    },
  })

  return NextResponse.json(data)
}
