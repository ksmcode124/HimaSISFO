export interface AdminKabinetRow{
  id: number,
  tahun_kerja: string,
  nama_kabinet: string,
  logo: string,
  departemen_count: number
}

export interface AdminKabinetForm{
  id: number,
  tahun_kerja: string,
  nama_kabinet: string,
  logo: string,
}

export interface AdminEventRow {
  id: number,
  title: string,
  description: string,
  type: string,
  end: Date,
  start: Date,
}

export interface AdminDepartemenRow{
  id: number,
  nama_departemen: string,
  logo: string,
  anggota_count: number,
  proker_count: number
}

export interface AdminAnggotaRow{
  id: number,
  nama_anggota: string,
  kabinet: string,
  jabatan: string
}

export interface AdminKomunitasRow{
  id: number,
  nama_komunitas: string,
  foto_komunitas: string,
  pencapaian: string,
  foto_pencapaian: string
}