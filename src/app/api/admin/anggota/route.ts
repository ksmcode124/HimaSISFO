import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createAnggotaSchema } from "@/schemas/anggota.schema";

export async function GET() {
  try {
    const data = await prisma.anggota.findMany({
      include: { detailAnggota: true },
    });
    return NextResponse.json(data);
  } catch (error) {
    console.error("GET Anggota Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Validasi request (Zod)
    const data = createAnggotaSchema.parse(body);

    const newAnggota = await prisma.anggota.create({
      data,
    });

    return NextResponse.json(newAnggota, { status: 201 });
  } catch (error: any) {
    if (error?.name === "ZodError") {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    console.error("POST Anggota Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
