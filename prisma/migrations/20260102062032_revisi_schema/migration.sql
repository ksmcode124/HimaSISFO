/*
  Warnings:

  - You are about to drop the column `foto_anggota` on the `anggota` table. All the data in the column will be lost.
  - You are about to drop the column `berita` on the `event` table. All the data in the column will be lost.
  - You are about to drop the column `detail_deskripsi` on the `kabinet` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "anggota" DROP COLUMN "foto_anggota";

-- AlterTable
ALTER TABLE "departemen" ADD COLUMN     "logo_departemen" TEXT;

-- AlterTable
ALTER TABLE "detail_anggota" ADD COLUMN     "foto_anggota" TEXT;

-- AlterTable
ALTER TABLE "event" DROP COLUMN "berita",
ADD COLUMN     "kategori" TEXT;

-- AlterTable
ALTER TABLE "kabinet" DROP COLUMN "detail_deskripsi";
