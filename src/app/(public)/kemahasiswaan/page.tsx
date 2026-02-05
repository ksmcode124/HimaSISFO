import { KemahasiswaanMainSection, BlankoSection, HeroSection, useKemahasiswaanPage } from "@/features/kemahasiswaan"
import { Suspense } from "react"

export default function Page() {
  const { hero, alurItems, blankoSection } = useKemahasiswaanPage()

  return (
    <>
      <HeroSection data={hero} />
      <Suspense fallback={<div>Loading...</div>}>
        <KemahasiswaanMainSection items={alurItems} />
      </Suspense>
      {blankoSection && <BlankoSection {...blankoSection} />}
    </>
  )
}
