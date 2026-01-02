import { updateDepartemenSchema } from "@/schemas/departemen.schema"
import { prisma } from "@/lib/prisma"

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json()

    // Validasi data update
    const data = updateDepartemenSchema.parse(body)

    const departemen = await prisma.departemen.update({
      where: {
        id_departemen: Number(params.id),
      },
      data,
    })

    return Response.json(departemen)
  } catch (error: any) {
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
