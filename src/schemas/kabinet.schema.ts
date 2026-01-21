import { z } from "zod"

/**
 * Schema untuk CREATE kabinet
 * Digunakan saat POST
 */
export const createKabinetSchema = z.object({
  nama_kabinet: z.string().min(3, "Nama kabinet minimal 3 karakter"),
  tahun_kerja: z.string(),

  foto_kabinet: z.string().url("Foto kabinet harus berupa URL").optional(),
  gambar_logo: z.string().url("Gambar logo harus berupa URL").optional(),
  deskripsi: z.string().optional(),
  visi: z.string().optional(),
  misi: z.string().optional(),
})

/**
 * Schema untuk UPDATE kabinet
 * Semua optional kecuali id (id dari params route)
 */
export const updateKabinetSchema = z.object({
  nama_kabinet: z.string().min(3).optional(),
  tahun_kerja: z.string().min(3).optional(),

  foto_kabinet: z.string().url("Foto kabinet harus berupa URL").optional(),
  gambar_logo: z.string().url("Gambar logo harus berupa URL").optional(),
  deskripsi: z.string().optional(),
  visi: z.string().optional(),
  misi: z.string().optional(),
})
