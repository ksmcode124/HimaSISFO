import {
  HeroSection,
  usePelayananAdministratifPage,
  PelayananAdministratifSection
} from "@/features/kemahasiswaan"

export default function Page() {
  const { hero, items } = usePelayananAdministratifPage()

  return (
    <>
      <HeroSection data={hero} />
      <PelayananAdministratifSection items={items} />
    </>
  )
}
