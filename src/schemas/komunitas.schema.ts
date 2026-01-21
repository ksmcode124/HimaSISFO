import { z } from "zod"

export const komunitasIdParamSchema = z.object({
  id: z.coerce.number().int().positive("ID komunitas harus berupa angka positif"),
});

export const createKomunitasSchema = z.object({
  id_kabinet: z.number().int().positive("id_kabinet wajib diisi dan berupa angka positif"),
  foto_komunitas: z.string().url("Foto komunitas harus berupa URL").optional().nullable(),
})

export const updateKomunitasSchema = z.object({
  id_kabinet: z.number().int().positive().optional(),
  foto_komunitas: z.string().url("Foto komunitas harus berupa URL").optional().nullable(),
}).refine((data) => Object.keys(data).length > 0, {
  message: "Minimal isi 1 field untuk update",
})
