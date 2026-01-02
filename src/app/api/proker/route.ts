import { prisma } from "@/lib/prisma"
import { NextResponse } from "next/server"
import { createProkerSchema } from "@/schemas/proker.schema"

// ==========================
// CREATE PROKER
// POST /api/proker
// ==========================
export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = createProkerSchema.parse(body)

    const proker = await prisma.proker.create({
      data,
    })

    return NextResponse.json(proker, { status: 201 })
  } catch (error) {
    console.error("POST /api/proker ERROR:", error)
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    )
  }
}

// ==========================
// READ ALL PROKER
// GET /api/proker
// ==========================
export async function GET() {
  const proker = await prisma.proker.findMany({
    include: {
      departemen: true,
      kabinet: true,
    },
  })

  return NextResponse.json(proker)
}
