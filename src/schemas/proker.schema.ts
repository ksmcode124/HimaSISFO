import { z } from "zod"

export const createProkerSchema = z.object({
  id_departemen: z.number(),
  id_kabinet: z.number(),
  nama_proker: z.string().min(3),
  deskripsi: z.string().optional(),
  foto_proker: z.string().optional(),
})

export const updateProkerSchema = z.object({
  nama_proker: z.string().min(3).optional(),
  deskripsi: z.string().optional(),
  foto_proker: z.string().optional(),
})
