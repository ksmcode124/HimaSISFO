import { 
  HeroSection, 
  useWisudaYudisiumPage, 
  WisudaYudisiumMainSection 
} from "@/features/kemahasiswaan"

export default function WisudaPage() {
  const { hero, accordionItems, itemCollectionItems } =
    useWisudaYudisiumPage()

  return (
    <>
      <HeroSection data={hero} />
      <WisudaYudisiumMainSection accordionItems={accordionItems} itemCollectionItems={itemCollectionItems} />
    </>
  )
}
