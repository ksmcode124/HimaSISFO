import { HeroSection, PendaftaranMainSection, usePendaftaranVerifikasiPage } from "@/features/kemahasiswaan"

export default function Page() {
  const { hero, accordionItems, itemCollectionItems } =
    usePendaftaranVerifikasiPage()

  return (
    <>
      <HeroSection data={hero} />
      <PendaftaranMainSection accordionItems={accordionItems} itemCollectionItems={itemCollectionItems} />
    </>
  )
}