// src/schemas/anggota-detail.schema.ts
import { z } from "zod";

// params /[id]
export const anggotaDetailIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

// Alias untuk consistency dengan API routes
export const detailIdParamSchema = anggotaDetailIdParamSchema;

// POST /api/anggota_detail
export const createAnggotaDetailSchema = z.object({
  id_anggota: z.coerce.number().int().positive("id_anggota wajib diisi dan berupa angka positif"),
  id_kabinet: z.coerce.number().int().positive("id_kabinet wajib diisi dan berupa angka positif"),
  id_departemen: z.coerce.number().int().positive("id_departemen wajib diisi dan berupa angka positif"),
  id_jabatan: z.coerce.number().int().positive("id_jabatan wajib diisi dan berupa angka positif"),
  foto_anggota: z.string().url("Foto anggota harus berupa URL").optional().nullable(),
});

// PATCH /api/anggota_detail/[id]
export const updateAnggotaDetailSchema = z
  .object({
    id_jabatan: z.coerce.number().int().positive().optional(),
    id_departemen: z.coerce.number().int().positive().optional(),
    foto_anggota: z.string().url("Foto anggota harus berupa URL").optional().nullable(),
  })
  .refine((v) => Object.keys(v).length > 0, {
    message: "Minimal kirim 1 field untuk diupdate",
  });
