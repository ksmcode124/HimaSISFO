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
});

// PATCH /api/anggota/[id]
export const updateAnggotaSchema = z.object({
  nama_anggota: z
    .string()
    .trim()
    .min(1, "Nama anggota wajib diisi")
    .max(100, "Nama anggota maksimal 100 karakter")
    .optional(),
}).refine((v) => Object.keys(v).length > 0, {
  message: "Minimal kirim 1 field untuk diupdate",
});
