export interface HeroData {
  title: string;
  subtitle: string;
}

export interface Kabinet {
  slug: string;
  tahun_akademik: string;
  nama_kabinet: string;
  hero: HeroData;
}

export interface DepartemenHeroData {
  nama: string;
  deskripsi: string;
  logo: string;
  foto_hero?: string;
}

export interface KabinetDataJSON {
  success: boolean;
  kabinet_list: Kabinet[];
}