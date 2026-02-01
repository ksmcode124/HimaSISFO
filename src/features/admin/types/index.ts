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
  // type: string,
  end: Date,
  start: Date,
}

export interface AdminDepartemenRow{
  id: number,
  nama_departemen: string,
  logo: string,
  anggota_count: number,
  proker_count: number,
  slug_kabinet: string
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
  deskripsi: string,
  foto_kabinet: string
}

export interface AdminDepartemenDetail {
  id: number,
  nama_departemen: string,
  logo: string
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
  // type: string,
  date: string,
  foto_event: string,
}

export interface AdminKomunitasDetail {
  id: number,
  nama_komunitas: string,
  foto_komunitas: string,
  pencapaian: string,
}

// ================== Core Interfaces ==================
export interface KabinetResponseAdmin {
  id_kabinet: number;
  nama_kabinet: string;
  tahun_kerja: string;
  visi: string | null;
  misi: string | null;
  deskripsi: string | null;
  foto_kabinet: string | null;
  gambar_logo: string | null;
  elemen_logo: ElemenLogo[];
  departemen: Departemen[];
  detailAnggota: DetailAnggota[];
  event: Event[];
  proker: ProgramKerja[];
}

export interface ElemenLogo {
  id_elemen_logo: number;
  id_kabinet: number;
  nama_elemen: string;
  deskripsi_elemen: string;
  gambar_elemen: string;
}

export interface Departemen {
  id_departemen: number;
  id_kabinet: number;
  nama_departemen: string;
  deskripsi_departemen: string;
  logo_departemen: string | null;
  foto_departemen: string | null;
}

export interface DetailAnggota {
  id_detail: number;
  id_anggota: number;
  id_jabatan: number;
  id_kabinet: number;
  id_departemen: number;
  foto_anggota: string | null;
  anggota: Anggota;
  jabatan: Jabatan;
  departemen: Departemen;
}

export interface Anggota {
  id_anggota: number;
  nama_anggota: string;
}

export interface Jabatan {
  id_jabatan: number;
  nama_jabatan: string;
}

export interface Event {
  id_event: number;
  id_kabinet: number;
  judul: string;
  deskripsi: string;
  tanggal_mulai: string; // ISO 8601 date string
  tanggal_berakhir: string; // ISO 8601 date string
  gambar_event: string;
  kategori: string | null;
}

export interface ProgramKerja {
  id_proker: number;
  id_departemen: number;
  id_kabinet: number;
  nama_proker: string;
  deskripsi: string;
  foto_proker: string | null;
}

export interface EventResponseAdmin {
  id_event: number;
  judul: string;
  deskripsi: string;
  tanggal_mulai: string; // bisa juga Date kalau mau langsung parsing
  tanggal_berakhir: string; // bisa juga Date
  gambar_event: string;
  kabinet: EventKabinet;
}

export interface EventKabinet {
  id_kabinet: number;
  nama_kabinet: string;
  tahun_kerja: string;
}
