import { 
  HeroSection,
  usePembayaranPage,
  PembayaranMainSection
 } from "@/features/kemahasiswaan"
 
export default function Page() {
  const { hero, featuredItems, otherItems } = usePembayaranPage()

  return (
    <>
      <HeroSection data={hero} />
      <PembayaranMainSection
        featuredItems={featuredItems}
        otherItems={otherItems}
      />
    </>
  )
}
