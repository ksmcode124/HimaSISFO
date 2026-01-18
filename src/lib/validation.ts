// src/lib/validation.ts
import { z } from "zod";

export const departemenSchema = z.object({
  nama_departemen: z.string().min(1, "Nama departemen wajib diisi"),
  deskripsi: z.string().optional(),
  logo_departemen: z
    .string()
    .url("Logo harus berupa URL yang valid")
    .optional()
    .or(z.literal("")),
  foto_departemen: z
    .string()
    .url("Foto harus berupa URL yang valid")
    .optional()
    .or(z.literal("")),
  id_kabinet: z.coerce.number().int("id_kabinet harus angka"),
});

export const prokerSchema = z.object({
  nama_proker: z.string().min(1, "Nama proker wajib diisi"),
  deskripsi: z.string().optional(),
  foto_proker: z
    .string()
    .url("Foto harus berupa URL yang valid")
    .optional()
    .or(z.literal("")),
  id_departemen: z.coerce.number().int("id_departemen harus angka"),
});


