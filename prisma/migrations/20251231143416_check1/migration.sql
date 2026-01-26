-- CreateEnum
CREATE TYPE "Role" AS ENUM ('superadmin', 'admin');

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
    "id_master_departemen" INTEGER,
    "id_kabinet" INTEGER NOT NULL,
    "nama_departemen" TEXT NOT NULL,
    "deskripsi_departemen" TEXT,

    CONSTRAINT "departemen_pkey" PRIMARY KEY ("id_departemen")
);

-- CreateTable
CREATE TABLE "anggota" (
    "id_anggota" SERIAL NOT NULL,
    "nama_anggota" TEXT NOT NULL,
    "foto_anggota" TEXT,

    CONSTRAINT "anggota_pkey" PRIMARY KEY ("id_anggota")
);

-- CreateTable
CREATE TABLE "jabatan" (
    "id_jabatan" SERIAL NOT NULL,
    "nama_jabatan" TEXT NOT NULL,

    CONSTRAINT "jabatan_pkey" PRIMARY KEY ("id_jabatan")
);

-- CreateTable
CREATE TABLE "detail_anggota" (
    "id_detail" SERIAL NOT NULL,
    "id_anggota" INTEGER NOT NULL,
    "id_departemen" INTEGER NOT NULL,
    "id_kabinet" INTEGER NOT NULL,
    "id_jabatan" INTEGER NOT NULL,

    CONSTRAINT "detail_anggota_pkey" PRIMARY KEY ("id_detail")
);

-- CreateTable
CREATE TABLE "event" (
    "id_event" SERIAL NOT NULL,
    "id_kabinet" INTEGER NOT NULL,
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
    "id_kabinet" INTEGER NOT NULL,
    "nama_proker" TEXT NOT NULL,
    "deskripsi" TEXT,
    "foto_proker" TEXT,

    CONSTRAINT "proker_pkey" PRIMARY KEY ("id_proker")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT NOT NULL,
    "emailVerified" BOOLEAN NOT NULL DEFAULT false,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'admin',

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Account" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "expiresAt" TIMESTAMP(3),
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "type" TEXT NOT NULL DEFAULT 'credential',

    CONSTRAINT "Account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "verification_token" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "detail_anggota_id_anggota_id_kabinet_key" ON "detail_anggota"("id_anggota", "id_kabinet");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Account_providerId_accountId_key" ON "Account"("providerId", "accountId");

-- CreateIndex
CREATE UNIQUE INDEX "Session_token_key" ON "Session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_token_token_key" ON "verification_token"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verification_token_identifier_token_key" ON "verification_token"("identifier", "token");

-- AddForeignKey
ALTER TABLE "elemen_logo" ADD CONSTRAINT "elemen_logo_id_kabinet_fkey" FOREIGN KEY ("id_kabinet") REFERENCES "kabinet"("id_kabinet") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "departemen" ADD CONSTRAINT "departemen_id_kabinet_fkey" FOREIGN KEY ("id_kabinet") REFERENCES "kabinet"("id_kabinet") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detail_anggota" ADD CONSTRAINT "detail_anggota_id_anggota_fkey" FOREIGN KEY ("id_anggota") REFERENCES "anggota"("id_anggota") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detail_anggota" ADD CONSTRAINT "detail_anggota_id_departemen_fkey" FOREIGN KEY ("id_departemen") REFERENCES "departemen"("id_departemen") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detail_anggota" ADD CONSTRAINT "detail_anggota_id_kabinet_fkey" FOREIGN KEY ("id_kabinet") REFERENCES "kabinet"("id_kabinet") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "detail_anggota" ADD CONSTRAINT "detail_anggota_id_jabatan_fkey" FOREIGN KEY ("id_jabatan") REFERENCES "jabatan"("id_jabatan") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "event" ADD CONSTRAINT "event_id_kabinet_fkey" FOREIGN KEY ("id_kabinet") REFERENCES "kabinet"("id_kabinet") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proker" ADD CONSTRAINT "proker_id_departemen_fkey" FOREIGN KEY ("id_departemen") REFERENCES "departemen"("id_departemen") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "proker" ADD CONSTRAINT "proker_id_kabinet_fkey" FOREIGN KEY ("id_kabinet") REFERENCES "kabinet"("id_kabinet") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Account" ADD CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
