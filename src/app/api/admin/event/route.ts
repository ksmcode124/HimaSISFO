import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";
import { eventSchema } from "@/schemas/event.schema";

// GET /api/event
export async function GET() {
  try {
    const data = await prisma.event.findMany({
      select: {
        id_event: true,
        judul: true,
        deskripsi: true,
        tanggal_mulai: true,
        tanggal_berakhir: true,
        gambar_event: true,
        kabinet: {
          select: {
            id_kabinet: true,
            nama_kabinet: true,
            tahun_kerja: true
          }
        }
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/event error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// POST /api/event
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = eventSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validasi gagal",
          errors: parsed.error.format(),
        },
        { status: 400 }
      );
    }

    const created = await prisma.event.create({
      data: parsed.data,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("POST /api/event error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}