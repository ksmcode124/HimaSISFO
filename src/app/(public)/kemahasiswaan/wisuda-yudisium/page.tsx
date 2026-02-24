'use client'

import { 
  HeroSection, 
  Modal, 
  useWisudaYudisiumPage, 
  WisudaYudisiumMainSection 
} from "@/features/kemahasiswaan"
import { useEffect } from "react"

export default function WisudaPage() {
  const { hero, accordionItems, itemCollectionItems, openModal, closeModal, selectedId } =
    useWisudaYudisiumPage()

  useEffect(() => {
    if (selectedId) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.body.style.overflow = ""
    }
  }, [selectedId])

  return (
    <>
      <HeroSection data={hero} />
      <WisudaYudisiumMainSection setSelectedId={openModal} accordionItems={accordionItems} itemCollectionItems={itemCollectionItems} />

      <Modal open={!!selectedId} onCloseAction={closeModal} selectedId={selectedId} items={itemCollectionItems} />
    </>
  )
}
