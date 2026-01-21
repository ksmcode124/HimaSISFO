import { z } from "zod"


// Validasi param /api/proker/:id
export const prokerIdParamSchema = z.object({
  id: z.coerce
    .number()
    .int()
    .positive("ID proker harus berupa angka positif"),
})

export const createProkerSchema = z.object({
  id_departemen: z.number().int().positive("id_departemen wajib diisi dan berupa angka positif"),
  id_kabinet: z.number().int().positive("id_kabinet wajib diisi dan berupa angka positif"),
  nama_proker: z.string().min(3, "Nama proker minimal 3 karakter"),
  deskripsi: z.string().optional(),
  foto_proker: z.string().url("Foto proker harus berupa URL").optional(),
})

export const updateProkerSchema = z.object({
  nama_proker: z.string().min(3).optional(),
  deskripsi: z.string().optional(),
  foto_proker: z.string().url("Foto proker harus berupa URL").optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: "Minimal isi 1 field untuk update",
})
