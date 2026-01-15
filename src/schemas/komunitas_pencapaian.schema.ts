import { z } from "zod"

export const createKomunitasPencapaianSchema = z.object({
  id_komunitas: z.number().int().positive(),
  judul: z.string().min(1),
  foto_pencapaian: z.string().min(1).optional().nullable(),
})

export const updateKomunitasPencapaianSchema = z.object({
  id_komunitas: z.number().int().positive().optional(),
  judul: z.string().min(1).optional(),
  foto_pencapaian: z.string().min(1).optional().nullable(),
})
