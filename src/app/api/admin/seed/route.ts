import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const { email, password, name } = await req.json();

  // Optional: protect endpoint dengan secret
  const secret = req.headers.get("x-admin-secret");
  if (secret !== process.env.BETTER_AUTH_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const passwordHash = await hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: { name, role: "admin" },
    create: { email, name, role: "admin" },
  });

  await prisma.account.upsert({
    where: {
      providerId_accountId: {
        providerId: "credentials",
        accountId: email,
      },
    },
    update: { password: passwordHash, updatedAt: new Date() },
    create: {
      userId: user.id,
      providerId: "credentials",
      accountId: email,
      password: passwordHash,
      type: "credential",
    },
  });

  return NextResponse.json({ message: "Admin created" });
}
