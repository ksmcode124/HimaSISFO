import { FormField } from "../FormModal";

export const createDepartemenFields: FormField[] = [
  { name: 'id_kabinet', label: 'ID KABINET', type: 'text', required: true, side: 'left' },
  { name: 'nama_departemen', label: 'NAMA DEPARTEMEN', type: 'text', required: true, side: 'left', placeholder: 'Nama Departemen' },
  { name: 'deskripsi_departemen', label: 'Deskripsi', type: 'textarea', side: 'left', rows: 2 },
  // { name: 'logo_departemen', label: 'UPLOAD LOGO', type: 'file', side: 'right' },
  // { name: 'foto_departemen', label: 'UPLOAD FOTO', type: 'file', side: 'right' },
];

export const updateDepartemenFields: FormField[] = [
  // { name: 'id_departemen', label: 'ID DEPARTEMEN', type: 'text', required: true, side: 'left' },
  // { name: 'id_kabinet', label: 'ID KABINET', type: 'text', required: true, side: 'left' },
  { name: 'nama_departemen', label: 'NAMA DEPARTEMEN', type: 'text', required: true, side: 'left', placeholder: 'Nama Departemen' },
  { name: 'deskripsi_departemen', label: 'Deskripsi', type: 'textarea', required: true, side: 'left', rows: 2 },
  // { name: 'logo_departemen', label: 'UPLOAD LOGO', type: 'file', side: 'right' },
  // { name: 'foto_departemen', label: 'UPLOAD FOTO', type: 'file', side: 'right' },
];
