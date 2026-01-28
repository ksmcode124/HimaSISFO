import { FormField } from "../FormModal";

export const anggotaCreateFields: FormField[] = [
  { name: 'nama_anggota', label: 'NAMA ANGGOTA', type: 'text', required: true, side: 'left', placeholder: 'Nama Anggota' },
  { name: 'foto_anggota', label: 'UPLOAD FOTO', type: 'file', side: 'right', accept: 'image/*', maxSize: '10 MB' },
];

export const anggotaEditFields: FormField[] = [
  { name: 'nama_anggota', label: 'NAMA ANGGOTA', type: 'text', required: true, side: 'left', placeholder: 'Nama Anggota' },
  { name: 'foto_anggota', label: 'UPLOAD FOTO', type: 'file', side: 'right', accept: 'image/*', maxSize: '10 MB' },
];
