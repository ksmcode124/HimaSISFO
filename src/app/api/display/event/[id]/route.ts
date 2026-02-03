import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";


type RouteParams = {
  params: Promise<{ id: string }>;
};

// GET /api/event/[id]
export async function GET(_req: NextRequest, { params }: RouteParams) {
  try {
    const id = Number((await params).id);
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
        kategori: true,
      },
    });

    if (!event) {
      return NextResponse.json(
        { message: "event tidak ditemukan" },
        { status: 404 }
      );
    }

    const response = {
      id: event.id_event,
      title: event.judul,
      start: event.tanggal_mulai,
      end: event.tanggal_berakhir,
      img: event.gambar_event,
      description: event.deskripsi,
      type: event.kategori,
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error("GET /api/event/[id] error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}