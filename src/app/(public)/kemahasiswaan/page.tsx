import { KemahasiswaanMainSection, BlankoSection, HeroSection, useKemahasiswaanPage } from "@/features/kemahasiswaan"

export default function Page() {
  const { hero, alurItems, blankoSection } = useKemahasiswaanPage()

  return (
    <>
      <HeroSection data={hero} />
      <KemahasiswaanMainSection items={alurItems} />
      {blankoSection && <BlankoSection {...blankoSection} />}
    </>
  )
}
