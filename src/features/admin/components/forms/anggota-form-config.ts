import { FormField } from "../FormModal";

export const createAnggotaFields: FormField[] = [
  { name: 'id_anggota', label: 'ID ANGGOTA', type: 'text', required: true, side: 'left' },
  { name: 'id_kabinet', label: 'ID KABINET', type: 'text', required: true, side: 'left' },
  { name: 'id_departemen', label: 'ID DEPARTEMEN', type: 'text', required: true, side: 'left' },
  { name: 'id_jabatan', label: 'ID JABATAN', type: 'text', required: true, side: 'left' },
  { name: 'foto_anggota', label: 'UPLOAD FOTO', type: 'file', side: 'right', accept: 'image/*', maxSize: '1 MB' },
]

export const updateAnggotaFields: FormField[] = [
  // { name: 'id_anggota', label: 'ID ANGGOTA', type: 'text', required: true, side: 'left' },
  // { name: 'id_kabinet', label: 'ID KABINET', type: 'text', required: true, side: 'left' },
  { name: 'id_departemen', label: 'ID DEPARTEMEN', type: 'text', required: true, side: 'left' },
  { name: 'id_jabatan', label: 'ID JABATAN', type: 'text', required: true, side: 'left' },
  { name: 'foto_anggota', label: 'UPLOAD FOTO', type: 'file', side: 'right', accept: 'image/*', maxSize: '1 MB' },
]