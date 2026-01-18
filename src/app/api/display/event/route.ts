import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET /api/display/event
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const from = searchParams.get("from"); // "2026-01-01"
    const to = searchParams.get("to");     // "2026-01-31"

    const where =
      from && to
        ? {
            AND: [
              { tanggal_mulai: { lte: new Date(to) } },
              { tanggal_berakhir: { gte: new Date(from) } },
            ],
          }
        : undefined;

    const events = await prisma.event.findMany({
      where, // ✅ pakai where-nya
      select: {
        id_event: true,
        judul: true,
        deskripsi: true,
        tanggal_mulai: true,
        tanggal_berakhir: true,
        gambar_event: true,
        kategori: true,
        kabinet: {
          select: {
            id_kabinet: true,
            nama_kabinet: true,
            tahun_kerja: true,
          },
        },
      },
    });

    const response = events.map((event) => ({
      id: event.id_event,
      title: event.judul,
      start: event.tanggal_mulai,
      end: event.tanggal_berakhir,
      img: event.gambar_event,
      description: event.deskripsi,
      type: event.kategori,
      kabinet: {
        id: event.kabinet.id_kabinet,
        nama: event.kabinet.nama_kabinet,
        tahun_kerja: event.kabinet.tahun_kerja,
      },
    }));

    return NextResponse.json(response);
  } catch (error) {
    console.error("GET /api/display/event error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
