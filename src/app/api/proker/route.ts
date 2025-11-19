import { NextRequest, NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";
import { prokerSchema } from "@/lib/validation";

// GET /api/proker  atau  /api/proker?id_departemen=1
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const idDepartemenParam = searchParams.get("id_departemen");

    const where = idDepartemenParam
      ? { id_departemen: Number(idDepartemenParam) || undefined }
      : {};

    const data = await prisma.proker.findMany({
      where,
      include: {
        departemen: true,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET /api/proker error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// POST /api/proker
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const parsed = prokerSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validasi gagal",
          errors: parsed.error.format(),
        },
        { status: 400 }
      );
    }

    const created = await prisma.proker.create({
      data: parsed.data,
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("POST /api/proker error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// PUT /api/proker?id=1
export async function PUT(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const idParam = searchParams.get("id");

    const id = idParam ? Number(idParam) : NaN;
    if (Number.isNaN(id)) {
      return NextResponse.json(
        { message: "Query param 'id' wajib dan harus angka" },
        { status: 400 }
      );
    }

    const body = await req.json();
    const parsed = prokerSchema.partial().safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          message: "Validasi gagal",
          errors: parsed.error.format(),
        },
        { status: 400 }
      );
    }

    const updated = await prisma.proker.update({
      where: { id_proker: id },
      data: parsed.data,
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT /api/proker error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

// DELETE /api/proker?id=1
export async function DELETE(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const idParam = searchParams.get("id");

    const id = idParam ? Number(idParam) : NaN;
    if (Number.isNaN(id)) {
      return NextResponse.json(
        { message: "Query param 'id' wajib dan harus angka" },
        { status: 400 }
      );
    }

    await prisma.proker.delete({
      where: { id_proker: id },
    });

    return NextResponse.json({ message: "Proker dihapus" });
  } catch (error) {
    console.error("DELETE /api/proker error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}