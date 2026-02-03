import { FormField } from "../FormModal";

export const eventFormFields: FormField[] = [
  {
    name: 'judul',
    label: 'Judul Event',
    type: 'text',
    placeholder: 'Masukkan judul event',
    required: true,
    side: 'left',
  },
  {
    name: 'deskripsi',
    label: 'Deskripsi Event',
    type: 'editor', // TinyMCE support
    placeholder: 'Tulis deskripsi event di sini...',
    required: true,
    side: 'right',
  },
  {
    name: 'tanggal_mulai',
    label: 'Tanggal Mulai',
    type: 'date', // bisa juga pakai datetime-local jika mau jam
    required: true,
    side: 'left',
  },
  {
    name: 'tanggal_berakhir',
    label: 'Tanggal Berakhir',
    type: 'date', // bisa juga pakai datetime-local jika mau jam
    required: true,
    side: 'left',
  },
  {
    name: 'gambar_event',
    label: 'Gambar Event',
    type: 'file', // Menggunakan uploader yang ada di FormModal
    required: false,
    multiple: false,
    side: 'left',
  },
];
