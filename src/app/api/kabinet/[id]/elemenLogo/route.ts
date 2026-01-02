import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const elemenLogo = await prisma.elemen_logo.findMany({
    where: {
      id_kabinet: Number(params.id),
    },
  });

  return NextResponse.json(elemenLogo);
}
