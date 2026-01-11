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

    const data = await prisma.event.findMany({
      where, // ✅ pakai where-nya
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
            tahun_kerja: true,
          },
        },
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/display/event error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
