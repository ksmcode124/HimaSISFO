// src/schemas/anggota.schema.ts
import { z } from "zod";

export const anggotaIdParamSchema = z.object({
  id: z.coerce.number().int().positive(),
});

// POST /api/anggota
export const createAnggotaSchema = z.object({
  nama_anggota: z
    .string()
    .trim()
    .min(1, "Nama anggota wajib diisi")
    .max(100, "Nama anggota maksimal 100 karakter"),
  foto_anggota: z.any().optional(), // File upload from FormModal
});

// PATCH /api/anggota/[id]
export const updateAnggotaSchema = z.object({
  nama_anggota: z
    .string()
    .trim()
    .min(1, "Nama anggota wajib diisi")
    .max(100, "Nama anggota maksimal 100 karakter")
    .optional(),
  foto_anggota: z.any().optional(),
  // Tambahan untuk identifikasi detail_anggota
  id_kabinet: z.coerce.number().int().positive().optional(),
  id_departemen: z.coerce.number().int().positive().optional(),
  id_jabatan: z.coerce.number().int().positive().optional(),
}).refine((v) => Object.keys(v).length > 0, {
  message: "Minimal kirim 1 field untuk diupdate",
});