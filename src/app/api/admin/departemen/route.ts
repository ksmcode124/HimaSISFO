import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createDepartemenSchema } from "@/schemas/departemen.schema";
import { isZodError, isPrismaError } from "@/lib/validation";

// ==========================
// POST /api/departemen
// ==========================
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = createDepartemenSchema.parse(body);

    const departemen = await prisma.departemen.create({
      data,
    });

    return NextResponse.json(departemen, { status: 201 });
  } catch (error: unknown) {
    if (isZodError(error)) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    if (isPrismaError(error)) {
      return NextResponse.json(
        { message: "Gagal menyimpan departemen" },
        { status: 400 },
      );
    }

    console.error("POST Departemen Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}

// ==========================
// GET /api/departemen (LIST)
// ==========================
export async function GET() {
  try {
    const data = await prisma.departemen.findMany({
      include: {
        kabinet: true,
      },
    });

    return NextResponse.json(data);
  } catch (error: unknown) {
    if (isPrismaError(error)) {
      return NextResponse.json(
        { message: "Gagal mengambil data departemen" },
        { status: 400 },
      );
    }

    console.error("GET Departemen List Error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 },
    );
  }
}
