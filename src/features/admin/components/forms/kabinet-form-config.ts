import { FormField } from "../FormModal";

export const createKabinetFields: FormField[] = [
  { name: 'nama_kabinet', label: 'NAMA KABINET', type: 'text', required: true, side: 'left', placeholder: 'Nama Kabinet' },
  { name: 'tahun_kerja', label: 'TAHUN', type: 'text', required: true, side: 'left', placeholder: '2025/2026' },
  { name: 'visi', label: 'VISI', type: 'textarea', required: true, side: 'right', rows: 2 },
  { name: 'misi', label: 'MISI', type: 'textarea', required: true, side: 'right', rows: 2 },
  { name: 'deskripsi', label: 'DESKRIPSI', type: 'textarea', rows: 3, side: 'right' },
  { name: 'gambar_logo', label: 'UPLOAD LOGO', type: 'file', side: 'left' },
];

export const updateKabinetFields: FormField[] = [
  { name: 'nama_kabinet', label: 'NAMA KABINET', type: 'text', required: true, side: 'left', placeholder: 'Nama Kabinet' },
  { name: 'tahun_kerja', label: 'TAHUN', type: 'text', required: true, side: 'left', placeholder: '2025/2026' },
  { name: 'visi', label: 'VISI', type: 'textarea', required: true, side: 'right', rows: 2 },
  { name: 'misi', label: 'MISI', type: 'textarea', required: true, side: 'right', rows: 2 },
  { name: 'deskripsi', label: 'DESKRIPSI', type: 'textarea', rows: 3, side: 'right' },
  { name: 'gambar_logo', label: 'UPLOAD LOGO', type: 'file', side: 'left',required: false },
  { name: 'foto_kabinet', label: 'UPLOAD FOTO', type: 'file', multiple: true, side: 'left', required: false },
];
