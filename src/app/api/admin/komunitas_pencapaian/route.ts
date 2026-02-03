import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { createKomunitasPencapaianSchema } from "@/schemas/komunitas_pencapaian.schema";
import { isPrismaError, isZodError } from "@/lib/validation";
import { z } from "zod";

// Schema untuk query ?id_komunitas=...
const idKomunitasQuerySchema = z
  .string()
  .transform((v) => Number(v))
  .refine((v) => Number.isInteger(v) && v > 0, { message: "id_komunitas tidak valid" });

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const data = createKomunitasPencapaianSchema.parse(body);

    const pencapaian = await prisma.komunitas_pencapaian.create({
      data,
      include: {
        komunitas: {
          include: {
            kabinet: true,
          },
        },
      },
    });

    return NextResponse.json(pencapaian, { status: 201 });
  } catch (error: unknown) {
    if (isZodError(error)) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    // FK invalid (misal id_komunitas tidak ada)
    if (isPrismaError(error) && error.code === "P2003") {
      return NextResponse.json(
        { message: "Komunitas tidak ditemukan (FK invalid)" },
        { status: 400 }
      );
    }

    // Duplicate (kalau ada unique constraint)
    if (isPrismaError(error) && error.code === "P2002") {
      return NextResponse.json(
        { message: "Pencapaian duplikat (unique constraint)" },
        { status: 409 }
      );
    }

    console.error("POST Komunitas Pencapaian Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const idKomunitasRaw = searchParams.get("id_komunitas");

    const where = idKomunitasRaw
      ? { id_komunitas: idKomunitasQuerySchema.parse(idKomunitasRaw) }
      : undefined;

    const data = await prisma.komunitas_pencapaian.findMany({
      where,
      include: {
        komunitas: {
          include: {
            kabinet: true,
          },
        },
      },
      orderBy: { id_pencapaian: "desc" },
    });

    return NextResponse.json(data);
  } catch (error: unknown) {
    // kalau query param invalid (zod)
    if (isZodError(error)) {
      return NextResponse.json({ errors: error.flatten() }, { status: 400 });
    }

    console.error("GET Komunitas Pencapaian Error:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
