import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";
import { eventSchema } from "@/lib/validation";

type RouteParams = {
  params: { id: string };
};

// GET /api/event/[id]
export async function GET(_req: NextRequest, { params }: RouteParams) {
  try {
    const id = Number(params.id);
    if (Number.isNaN(id)) {
      return NextResponse.json({ message: "ID tidak valid" }, { status: 400 });
    }

    const event = await prisma.event.findUnique({
      where: { id_event: id },
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

    if (!event) {
      return NextResponse.json(
        { message: "event tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json(event);
  } catch (error) {
    console.error("GET /api/event/[id] error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}