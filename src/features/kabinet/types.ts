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

export interface KabinetDataJSON {
  success: boolean;
  kabinet_list: Kabinet[];
}