import { z } from "zod"


export const departemenIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});


/**
 * Schema untuk CREATE departemen
 * Digunakan saat POST
 */
export const createDepartemenSchema = z.object({
  id_kabinet: z.coerce
    .number()
    .refine((val) => Number.isInteger(val) && val > 0, {
      message: "id_kabinet wajib diisi dan berupa angka",
    }),

  nama_departemen: z
    .string()
    .min(3, "Nama departemen minimal 3 karakter"),

  deskripsi_departemen: z.string().optional(),
  logo_departemen: z.string().optional(),
});
/**
 * Schema untuk UPDATE departemen
 * Semua optional kecuali id
 */
export const updateDepartemenSchema = z.object({
  nama_departemen: z.string().min(3).optional(),
  deskripsi_departemen: z.string().optional(),
  logo_departemen: z.string().optional(),
})
