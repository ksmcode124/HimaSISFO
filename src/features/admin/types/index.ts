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

export interface AdminKomunitasRow {
  id: number,
  nama_komunitas: string,
  foto_komunitas: string,
  pencapaian: string,
  foto_pencapaian: string
}

export interface AdminKabinetDetail {
  id: number,
  tahun_kerja: string,
  nama_kabinet: string,
  logo: string,
  visi: string,
  misi: string,
  departemen_count: number,
  deskripsi: string
}

export interface AdminDepartemenDetail {
  id: number,
  nama_departemen: string,
  anggota_count: number,
  proker_count: number,
  deskripsi: string
}

export interface AdminAnggotaDetail{
  id: number,
  foto_anggota: string,
  nama_anggota: string,
  kabinet: string,
  jabatan: string
}

export interface AdminEventDetail {
  id: number,
  title: string,
  description: string,
  type: string,
  date: string,
  foto_event: string,
}

export interface AdminKomunitasDetail {
  id: number,
  nama_komunitas: string,
  foto_komunitas: string,
  pencapaian: string,
}

// Interface untuk Departemen
export interface DepartemenAdmin {
  id_departemen: number;
  id_kabinet: number;
  nama_departemen: string;
  deskripsi_departemen: string | null;
  logo_departemen: string | null;
  foto_departemen: string | null;
}

// Interface untuk Elemen Logo
export interface ElemenLogoAdmin {
  id_elemen_logo: number;
  id_kabinet: number;
  nama_elemen: string;
  deskripsi_elemen: string | null;
  gambar_elemen: string | null;
}

// Interface Utama untuk Kabinet Admin
export interface KabinetResponseAdmin {
  id_kabinet: number;
  nama_kabinet: string;
  tahun_kerja: string;
  visi: string | null;
  misi: string | null;
  deskripsi: string | null;
  foto_kabinet: string | null;
  gambar_logo: string | null;
  departemen: DepartemenAdmin[];
  elemen_logo: ElemenLogoAdmin[];
}
