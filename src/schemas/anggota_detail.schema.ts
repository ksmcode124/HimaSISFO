// src/schemas/anggota-detail.schema.ts
import { z } from "zod";

// params /[id]
export const detailIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

// POST /api/anggota_detail
export const createAnggotaDetailSchema = z.object({
  id_anggota: z.coerce.number().int().positive(),
  id_kabinet: z.coerce.number().int().positive(),
  id_departemen: z.coerce.number().int().positive(),
  id_jabatan: z.coerce.number().int().positive(),
  foto_anggota: z.string().trim().min(1).optional().nullable(),
});

// PATCH /api/anggota_detail/[id]
export const updateAnggotaDetailSchema = z
  .object({
    id_jabatan: z.coerce.number().int().positive().optional(),
    id_departemen: z.coerce.number().int().positive().optional(),
    foto_anggota: z.string().trim().min(1).optional().nullable(),
  })
  .refine((v) => Object.keys(v).length > 0, {
    message: "Minimal kirim 1 field untuk diupdate",
  });
