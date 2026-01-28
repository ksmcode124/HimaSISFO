import { z } from "zod";

/**
 * Schema untuk CREATE elemen logo
 * Digunakan saat POST
 */
export const createElemenLogoSchema = z.object({
  id_kabinet: z.coerce
    .number()
    .refine((val) => Number.isInteger(val) && val > 0, {
      message: "id_kabinet wajib diisi dan berupa angka",
    }),

  nama_elemen: z.string().min(2, "Nama elemen minimal 2 karakter"),

  deskripsi_elemen: z.string().optional(),
  gambar_elemen: z.string().url("Gambar elemen harus berupa URL").optional(),
});

/**
 * Schema untuk UPDATE elemen logo
 * Semua optional (id dari params)
 */
export const updateElemenLogoSchema = z
  .object({
    nama_elemen: z.string().min(2).optional(),
    deskripsi_elemen: z.string().optional(),
    gambar_elemen: z.string().url("Gambar elemen harus berupa URL").optional(),
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "Minimal isi 1 field untuk update",
  });

/**
 * Query schema untuk GET list elemen logo
 */
export const queryElemenLogoSchema = z.object({
  page: z.coerce.number().optional().default(1),
  pageSize: z.coerce.number().optional().default(10),
  id_kabinet: z.coerce.number().optional(),
  q: z.string().optional(),
  includeKabinet: z.coerce.boolean().optional().default(false),
});
