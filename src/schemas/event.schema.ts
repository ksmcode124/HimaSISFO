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
  kategori: z.string().optional(),
  id_kabinet: z.coerce.number().int("id_kabinet harus angka"),
});

export const updateEventSchema = z.object({
  judul: z.string().min(1, "Judul event wajib diisi").optional(),
  deskripsi: z.string().optional(),
  tanggal_mulai: z.coerce.date().optional(),
  tanggal_berakhir: z.coerce.date().optional(),
  gambar_event: z
    .string()
    .url("Gambar event harus berupa URL yang valid")
    .optional()
    .or(z.literal(""))
    .optional(),
  kategori: z.string().optional(),
}).refine((data) => Object.keys(data).length > 0, {
  message: "Minimal isi 1 field untuk update",
});