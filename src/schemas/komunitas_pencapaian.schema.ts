import { z } from "zod"

export const komunitas_pencapaianIdParamSchema = z.object({
  id: z.coerce.number().int().positive("ID komunitas pencapaian harus berupa angka positif"),
});

export const createKomunitasPencapaianSchema = z.object({
  id_komunitas: z.number().int().positive("id_komunitas wajib diisi dan berupa angka positif"),
  judul: z.string().min(1, "Judul wajib diisi"),
  foto_pencapaian: z.string().url("Foto pencapaian harus berupa URL").optional().nullable(),
})

export const updateKomunitasPencapaianSchema = z.object({
  id_komunitas: z.number().int().positive().optional(),
  judul: z.string().min(1).optional(),
  foto_pencapaian: z.string().url("Foto pencapaian harus berupa URL").optional().nullable(),
}).refine((data) => Object.keys(data).length > 0, {
  message: "Minimal isi 1 field untuk update",
})
