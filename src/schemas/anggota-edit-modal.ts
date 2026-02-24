import { z } from "zod";

export const updateAnggotaModalSchema = z.object({
  nama_anggota: z.string().trim().min(1).max(100).optional(),
  id_jabatan: z.coerce.number().int().positive().optional(),
  foto_anggota: z.any().optional(), // file upload / url dari modal
}).refine((v) => Object.keys(v).length > 0, {
  message: "Minimal kirim 1 field untuk diupdate",
});
