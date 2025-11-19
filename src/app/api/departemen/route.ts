import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";
import { departemenSchema } from "@/lib/validation";

// GET /api/departemen
export async function GET() {
  try {
    const data = await prisma.departemen.findMany({
      include: {
        proker: true,
        anggota: true,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/departemen error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// POST /api/departemen
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = departemenSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validasi gagal",
          errors: parsed.error.format(),
        },
        { status: 400 }
      );
    }

    const created = await prisma.departemen.create({
      data: parsed.data,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("POST /api/departemen error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}