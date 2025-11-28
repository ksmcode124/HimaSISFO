import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: {params: {id: string} }) {
  try {
    const elemen = await prisma.elemen_logo.findMany({
      where: { id_kabinet: Number(params.id) }
    });

    return NextResponse.json(elemen);
  } catch (error) {
    return NextResponse.json(
      { message: "Gagal mengambil elemen untuk kabinet ini" },
      { status: 500 }
    );
  }
}
