
// Elemen logo kabinet
export interface ElemenLogo {
  id: number;
  nama_elemen: string;
  gambar_elemen: string | null;
  deskripsi_elemen: string | null;
}

// Nested interface untuk reuse
export interface Departemen {
  nama_departemen: string;
  deskripsi_departemen: string | null;
  foto_departemen: string | null;
  logo_departemen: string | null;
}

export interface Proker {
  id: number;
  nama_proker: string;
  foto_proker: string | null;
  deskripsi_proker: string | null;
}

export interface Anggota {
  id: number;
  nama_anggota: string;
  jabatan: string;
  foto_anggota: string | null;
}

// Departemen inti
export interface DepartemenInti {
  id: number;
  nama_departemen: string;
  logo_departemen: string | null;
  anggota: Anggota[];
}

// Departemen biasa
export interface DepartemenListItem {
  id_departemen: number;
  nama_departemen: string;
  logo_departemen: string | null;
}

// Untuk daftar kabinet singkat
export interface KabinetListItem {
  id_kabinet: number;
  nama_kabinet: string;
  tahun_kerja: string;
}

// Kabinet utama
export interface Kabinet {
  id: number;
  nama_kabinet: string;
  tahun_kerja: string;
  visi: string | null;
  misi: string | null;
  foto_kabinet: string | null;
  deskripsi: string | null;
  logo: string | null;
  elemen_logo: ElemenLogo[];
  departemenInti: DepartemenInti;
}

// Response akhir
export interface KabinetResponse {
  kabinet: Kabinet;
  departemen: DepartemenListItem[];
  kabinetList: KabinetListItem[];
}

// Response API
export interface DepartemenResponse {
  departemen: Departemen;
  proker: Proker[];
  anggota: Anggota[];
}

export interface EventListResponse {
  id: number
  title: string
  start: string
  end: string
  img: string | null
  description: string | null
  type: string | null
  kabinet: KabinetListItem
}

export interface EventDetailResponse {
  id: number
  title: string
  start: string
  end: string
  img: string | null
  description: string | null
  type: string | null
}

export interface Episode {
  id: string;
  name: string;
  audio_preview_url: string | null;
  release_date: string;
  description: string;
  images: { url: string }[];
  external_urls: { spotify: string };
};

