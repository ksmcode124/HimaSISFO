import { FormField } from "../FormModal";

export const createProkerFields: FormField[] = [
  { name: "id_departemen", label: "ID DEPARTEMEN", type: 'number', side: "left"},
  { name: "id_kabinet", label: "ID KABINET", type: 'number', side: "left"},
  { name: "nama_proker", label: "NAMA PROKER", type: 'text', side: "left", required: true,},
  { name: "deskripsi", label: "DESKRIPSI", type: 'textarea', side: "left", rows: 3},
  { name: 'foto_proker', label: 'UPLOAD FOTO', type: 'file', side: 'right', accept: 'image/*', maxSize: '1 MB' },
]

export const updateProkerFields: FormField[] = [
  { name: "nama_proker", label: "NAMA PROKER", type: 'text', side: "left", required: true,},
  { name: "deskripsi", label: "DESKRIPSI", type: 'textarea', side: "left", rows: 3},
  { name: 'foto_proker', label: 'UPLOAD FOTO', type: 'file', side: 'right', accept: 'image/*', maxSize: '1 MB' },
]