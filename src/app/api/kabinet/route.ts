import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// GET ALL KABINET
export async function GET() {
  try {
    const kabinet = await prisma.kabinet.findMany({
      orderBy: { id_kabinet: "desc" }
    });

    return NextResponse.json(kabinet, { status: 200 });
  } catch (error) {
    console.error("[GET KABINET ERROR]", error);
    return NextResponse.json(
      { message: "Gagal mengambil data kabinet" },
      { status: 500 }
    );
  }
}

// CREATE KABINET
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const {
      nama_kabinet,
      tahun_kerja,
      gambar_logo,
      deskripsi,
      visi,
      misi,
      detail_deskripsi
    } = body;

    const kabinet = await prisma.kabinet.create({
      data: {
        nama_kabinet,
        tahun_kerja,
        gambar_logo,
        deskripsi,
        visi,
        misi,
        detail_deskripsi
      }
    });

    return NextResponse.json(kabinet, { status: 201 });
  } catch (error) {
    console.error("[CREATE KABINET ERROR]", error);
    return NextResponse.json(
      { message: "Gagal menambahkan kabinet" },
      { status: 500 }
    );
  }
}
