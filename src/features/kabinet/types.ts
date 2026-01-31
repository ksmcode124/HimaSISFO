export interface KabinetDataJSON {
  kabinet_list: Kabinet[];
}

export interface Kabinet {
  id: string;
  nama_kabinet: string;
  tahun_akademik: string;
  logo_url: string;
  image_url: string[];
  colors: {
    primary: string;
    secondary: string;
    text: string;
    background: string;
  };
  filosofi: {
    arti_nama: { kata: string; makna: string }[];
    logo_hover_details: { simbol: string; makna: string }[];
    visi: { text: string }[];
    misi: { text: string }[];
  };
  inti_himpunan: {
    logo_url: string;
    anggota: IntiHimpunan[];
  };
  departemen: Departemen[];
}

export interface IntiHimpunan {
  nama: string;
  jabatan: string;
  image_url: string;
}

export interface Departemen {
  id: string;
  nama: string;
  deskripsi: string;
  logo_url: string;
  image_url: string;
  program_kerja: Proker[];
  staff: {
    inti: StaffInti[];
    anggota: StaffAnggota[];
  };
}

export interface Proker {
  nama: string;
  deskripsi: string;
  image_url: string;
}

export interface StaffInti {
  nama: string;
  jabatan: string;
  image_url: string;
}

export interface StaffAnggota {
  nama: string;
  image_url: string;
}