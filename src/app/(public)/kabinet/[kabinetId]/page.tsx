import { 
  KabinetHeroSection, 
  KabinetFilosofiSection, 
  KabinetIntiSection, 
  KabinetDepartemenSection
} from "@/features/kabinet";
import kabinetDataRaw from "@/features/kabinet/data/kabinet.json";

export default function KabinetPage() {
  const currentKabinet = kabinetDataRaw.kabinet_list[0];

  if (!currentKabinet) return <div>Data tidak ditemukan</div>;

  return (
    <main>
      <KabinetHeroSection />
      <KabinetFilosofiSection 
        data={currentKabinet.filosofi} 
        logo_url={currentKabinet.logo_url} 
      />
      <KabinetIntiSection data={currentKabinet.inti_himpunan} />
      <KabinetDepartemenSection />
    </main>
  );
}