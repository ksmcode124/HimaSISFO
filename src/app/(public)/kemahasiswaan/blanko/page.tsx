import { BlankoMainSection, HeroSection, useBlankoPage } from "@/features/kemahasiswaan"


export default function Page() {
  const { hero, items } = useBlankoPage()

  return (
    <>
      <HeroSection data={hero} />
      <BlankoMainSection items={items} />
    </>
  )
}
