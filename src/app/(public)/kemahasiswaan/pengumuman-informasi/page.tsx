import {
  HeroSection,
  PengumumanMainSection,
  usePengumumanPage
} from "@/features/kemahasiswaan"

export default function Page() {
  const {hero, informasiItems} = usePengumumanPage()

  return (
    <>
      <HeroSection data={hero} />
      <PengumumanMainSection informasiItems={informasiItems} />
    </>
  )
}
