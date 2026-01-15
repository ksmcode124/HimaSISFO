import { z } from "zod"

export const createKomunitasSchema = z.object({
  id_kabinet: z.number().int().positive(),
  foto_komunitas: z.string().min(1).optional().nullable(),
})

export const updateKomunitasSchema = z.object({
  id_kabinet: z.number().int().positive().optional(),
  foto_komunitas: z.string().min(1).optional().nullable(),
})
