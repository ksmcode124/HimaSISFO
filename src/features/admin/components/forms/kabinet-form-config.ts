import { FormField } from "../FormModal";

export const cabinetCreateFields: FormField[] = [
  { 
    name: 'namaKabinet', 
    label: 'NAMA KABINET', 
    type: 'text',
    required: true, 
    column: 1,
    placeholder: 'Masukkan nama kabinet'
  },
  { 
    name: 'tahun', 
    label: 'TAHUN', 
    type: 'number', 
    required: true, 
    column: 2,
    placeholder: 'Contoh: 2024'
  },
  { 
    name: 'visi', 
    label: 'VISI', 
    type: 'textarea',
    required: true, 
    column: 1,
    rows: 3
  },
  { 
    name: 'misi', 
    label: 'MISI', 
    type: 'textarea',
    required: true, 
    column: 2,
    rows: 3
  },
  { 
    name: 'deskripsi', 
    label: 'DESKRIPSI', 
    type: 'textarea', 
    rows: 4, 
    column: 1 
  },
  { 
    name: 'departemen', 
    label: 'DEPARTEMEN', 
    type: 'select',
    options: [
      { value: 'hr', label: 'Human Resources' },
      { value: 'it', label: 'IT Department' },
      { value: 'finance', label: 'Finance' }
    ],
    required: true, 
    column: 2 
  },
  { 
    name: 'logo', 
    label: 'UPLOAD FOTO & LOGO', 
    type: 'file', 
    column: 1,
    accept: 'image/svg+xml,image/png,image/jpeg,image/webp',
    maxSize: '10 MB'
  },
];

export const cabinetEditFields: FormField[] = [
  { 
    name: 'namaKabinet', 
    label: 'NAMA KABINET', 
    type: 'text',
    required: true, 
    column: 1,
    disabled: true // tidak bisa diedit saat edit mode
  },
  { 
    name: 'tahun', 
    label: 'TAHUN', 
    type: 'number', 
    required: true, 
    column: 2
  },
  { 
    name: 'visi', 
    label: 'VISI', 
    type: 'textarea',
    required: true, 
    column: 1,
    rows: 3
  },
  { 
    name: 'misi', 
    label: 'MISI', 
    type: 'textarea',
    required: true, 
    column: 2,
    rows: 3
  },
  { 
    name: 'deskripsi', 
    label: 'DESKRIPSI', 
    type: 'textarea', 
    rows: 4, 
    column: 1 
  },
  { 
    name: 'status', 
    label: 'STATUS', 
    type: 'select',
    options: [
      { value: 'active', label: 'Aktif' },
      { value: 'inactive', label: 'Tidak Aktif' }
    ],
    required: true, 
    column: 2 
  },
  { 
    name: 'departemen', 
    label: 'DEPARTEMEN', 
    type: 'select',
    options: [
      { value: 'hr', label: 'Human Resources' },
      { value: 'it', label: 'IT Department' },
      { value: 'finance', label: 'Finance' }
    ],
    required: true, 
    column: 2 
  },
  { 
    name: 'logo', 
    label: 'UPDATE FOTO & LOGO', 
    type: 'file', 
    column: 1,
    accept: 'image/svg+xml,image/png,image/jpeg,image/webp',
    maxSize: '10 MB'
  },
];