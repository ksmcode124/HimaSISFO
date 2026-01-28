import { FormField } from "../FormModal";

// Create proker form: id_departemen and id_kabinet are auto-populated from URL
export const createProkerFields: FormField[] = [
  { name: "nama_proker", label: "NAMA PROKER", type: 'text', side: "left", required: true, placeholder: 'Nama Program Kerja' },
  { name: "deskripsi", label: "DESKRIPSI", type: 'textarea', side: "right", rows: 3 },
  { name: 'foto_proker', label: 'UPLOAD FOTO', type: 'file', side: 'left', accept: 'image/*', maxSize: '10 MB' },
];

export const updateProkerFields: FormField[] = [
  { name: "nama_proker", label: "NAMA PROKER", type: 'text', side: "left", required: true, placeholder: 'Nama Program Kerja' },
  { name: "deskripsi", label: "DESKRIPSI", type: 'textarea', side: "right", rows: 3 },
  { name: 'foto_proker', label: 'UPLOAD FOTO', type: 'file', side: 'left', accept: 'image/*', maxSize: '10 MB' },
];