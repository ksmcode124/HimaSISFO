import { z } from "zod";

export const eventSchema = z.object({
  judul: z.string().min(1, "Judul event wajib diisi"),
  deskripsi: z.string().optional(),
  tanggal_mulai: z.coerce.date(),
  tanggal_berakhir: z.coerce.date(),
  gambar_event: z
    .string()
    .url("Gambar event harus berupa URL yang valid")
    .optional()
    .or(z.literal("")),
  id_kabinet: z.coerce.number().int("id_kabinet harus angka"),
});