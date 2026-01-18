
export interface KabinetResponse {
  kabinet: {
    id_kabinet: number;
    nama_kabinet: string;
    tahun_kerja: string;
    deskripsi: string | null;
    logo: string | null;
    elemen_logo: {
      id_elemen_logo: number;
      nama_elemen: string;
      gambar_elemen: string | null;
      deskripsi_elemen: string | null;
    }[];
    departemenInti: {
      id_departemen: number;
      nama_departemen: string;
      logo_departemen: string | null;      
      anggota: {
        id: number;
        nama: string;      
        jabatan: string;   
        foto: string | null;
      }[];
    };
  };
  departemen: {
    id_departemen: number;
    nama_departemen: string;
    logo_departemen: string | null;
  }[];
  kabinetList: {
    id_kabinet: number;
    tahun_kerja: string;
  }[];
}

export interface DepartemenResponse {
  departemen: {
    nama_departemen: string;
    deskripsi_departemen: string | null;
    foto_departemen: string | null;
    logo_departemen: string | null;
  };
  proker: {
    id_proker: number;
    nama_proker: string;
    foto_proker: string | null;
    deskripsi_proker: string | null;
  }[];
  anggota: {
    id_detail: number;
    nama_anggota: string;
    jabatan: string;
    foto_anggota: string | null;
  }[];
}

export interface EventListResponse {
  id: number
  title: string
  start: string
  end: string
  img: string | null
  description: string | null
  type: string | null
  kabinet: {
    id: number
    nama: string
    tahun_kerja: string
  }
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