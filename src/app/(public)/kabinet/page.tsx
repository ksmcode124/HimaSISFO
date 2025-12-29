import { KabinetHeroSection, 
  KabinetFilosofiSection, 
  KabinetIntiSection, 
  KabinetDepartemenSection
} from "@/features/kabinet";

export default function KabinetPage() {
  return (
    <main>
      <KabinetHeroSection />
      <KabinetFilosofiSection />
      <KabinetIntiSection />
      <KabinetDepartemenSection />
    </main>
  );
}