/*
  Warnings:

  - You are about to drop the `akun` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."akun";

-- CreateTable
CREATE TABLE "user" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'admin',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");
