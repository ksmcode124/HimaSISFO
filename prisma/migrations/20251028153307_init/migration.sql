-- CreateEnum
CREATE TYPE "Role" AS ENUM ('superadmin', 'admin');

-- CreateTable
CREATE TABLE "btw_kepengurusan" (
    "id_btw" SERIAL NOT NULL,
    "tahun_kerja" TEXT NOT NULL,

    CONSTRAINT "btw_kepengurusan_pkey" PRIMARY KEY ("id_btw")
);

-- CreateTable
CREATE TABLE "btw_divisi" (
    "id_divisi" SERIAL NOT NULL,
    "nama_divisi" TEXT NOT NULL,
    "id_btw" INTEGER NOT NULL,

    CONSTRAINT "btw_divisi_pkey" PRIMARY KEY ("id_divisi")
);

-- CreateTable
CREATE TABLE "btw_anggota" (
    "id_anggota" SERIAL NOT NULL,
    "nama_anggota" TEXT NOT NULL,
    "jabatan" TEXT NOT NULL,
    "foto_anggota" TEXT,
    "id_divisi" INTEGER NOT NULL,

    CONSTRAINT "btw_anggota_pkey" PRIMARY KEY ("id_anggota")
);

-- CreateTable
CREATE TABLE "kabinet" (
    "id_kabinet" SERIAL NOT NULL,
    "nama_kabinet" TEXT NOT NULL,
    "tahun_kerja" TEXT NOT NULL,
    "gambar_logo" TEXT,
    "deskripsi" TEXT,
    "visi" TEXT,
    "misi" TEXT,
    "detail_deskripsi" TEXT,

    CONSTRAINT "kabinet_pkey" PRIMARY KEY ("id_kabinet")
);

-- CreateTable
CREATE TABLE "elemen_logo" (
    "id_elemen_logo" SERIAL NOT NULL,
    "nama_elemen" TEXT NOT NULL,
    "deskripsi_elemen" TEXT,
    "gambar_elemen" TEXT,
    "id_kabinet" INTEGER NOT NULL,

    CONSTRAINT "elemen_logo_pkey" PRIMARY KEY ("id_elemen_logo")
);

-- CreateTable
CREATE TABLE "departemen" (
    "id_departemen" SERIAL NOT NULL,
    "logo_departemen" TEXT,
    "nama_departemen" TEXT NOT NULL,
    "deskripsi" TEXT,
    "foto_departemen" TEXT,
    "id_kabinet" INTEGER NOT NULL,

    CONSTRAINT "departemen_pkey" PRIMARY KEY ("id_departemen")
);

-- CreateTable
CREATE TABLE "anggota" (
    "id_anggota" SERIAL NOT NULL,
    "nama_anggota" TEXT NOT NULL,
    "jabatan" TEXT NOT NULL,
    "foto_anggota" TEXT,
    "id_departemen" INTEGER NOT NULL,

    CONSTRAINT "anggota_pkey" PRIMARY KEY ("id_anggota")
);

-- CreateTable
CREATE TABLE "event" (
    "id_event" SERIAL NOT NULL,
    "judul" TEXT NOT NULL,
    "deskripsi" TEXT,
    "tanggal_mulai" TIMESTAMP(3) NOT NULL,
    "tanggal_berakhir" TIMESTAMP(3) NOT NULL,
    "gambar_event" TEXT,
    "berita" TEXT,

    CONSTRAINT "event_pkey" PRIMARY KEY ("id_event")
);

-- CreateTable
CREATE TABLE "proker" (
    "id_proker" SERIAL NOT NULL,
    "id_departemen" INTEGER NOT NULL,
    "foto_proker" TEXT,
    "nama_proker" TEXT NOT NULL,
    "deskripsi" TEXT,

    CONSTRAINT "proker_pkey" PRIMARY KEY ("id_proker")
);

-- CreateTable
CREATE TABLE "akun" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password_hash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'admin',

    CONSTRAINT "akun_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "akun_email_key" ON "akun"("email");

-- AddForeignKey
ALTER TABLE "btw_divisi" ADD CONSTRAINT "btw_divisi_id_btw_fkey" FOREIGN KEY ("id_btw") REFERENCES "btw_kepengurusan"("id_btw") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "btw_anggota" ADD CONSTRAINT "btw_anggota_id_divisi_fkey" FOREIGN KEY ("id_divisi") REFERENCES "btw_divisi"("id_divisi") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "elemen_logo" ADD CONSTRAINT "elemen_logo_id_kabinet_fkey" FOREIGN KEY ("id_kabinet") REFERENCES "kabinet"("id_kabinet") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departemen" ADD CONSTRAINT "departemen_id_kabinet_fkey" FOREIGN KEY ("id_kabinet") REFERENCES "kabinet"("id_kabinet") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "anggota" ADD CONSTRAINT "anggota_id_departemen_fkey" FOREIGN KEY ("id_departemen") REFERENCES "departemen"("id_departemen") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proker" ADD CONSTRAINT "proker_id_departemen_fkey" FOREIGN KEY ("id_departemen") REFERENCES "departemen"("id_departemen") ON DELETE CASCADE ON UPDATE CASCADE;
