import DepartemenHeroSection from "@/features/kabinet/sections/DepartemenHeroSection";
import kabinetData from "@/features/kabinet/data/kabinet.json";
import ProkerSection from "@/features/kabinet/sections/ProkerSection";
import StaffSection from "@/features/kabinet/sections/StaffSection";

export default function DepartemenPage() {
  const data = kabinetData.departemen_hero;

  return (
    <main>
      <DepartemenHeroSection 
        nama={data.nama} 
        deskripsi={data.deskripsi} 
        logo={data.logo} 
      />
      <ProkerSection />
      <StaffSection />
    </main>
  );
}