import { FormField } from "../FormModal";

export const departemenCreateFields: FormField[] = [
  { name: 'nama_departemen', label: 'NAMA DEPARTEMEN', type: 'text', required: true, side: 'left', placeholder: 'Nama Departemen' },
  { name: 'deskripsi_departemen', label: 'DESKRIPSI', type: 'textarea', side: 'right', rows: 3 },
  { name: 'logo_departemen', label: 'UPLOAD LOGO', type: 'file', side: 'left', accept: 'image/*', maxSize: '5 MB' },
  { name: 'foto_departemen', label: 'UPLOAD FOTO', type: 'file', side: 'right', accept: 'image/*', maxSize: '10 MB' },
];

export const departemenEditFields: FormField[] = [
  { name: 'nama_departemen', label: 'NAMA DEPARTEMEN', type: 'text', required: true, side: 'left', placeholder: 'Nama Departemen' },
  { name: 'deskripsi_departemen', label: 'DESKRIPSI', type: 'textarea', side: 'right', rows: 3 },
  { name: 'logo_departemen', label: 'UPLOAD LOGO', type: 'file', side: 'left', accept: 'image/*', maxSize: '5 MB' },
  { name: 'foto_departemen', label: 'UPLOAD FOTO', type: 'file', side: 'right', accept: 'image/*', maxSize: '10 MB' },
];