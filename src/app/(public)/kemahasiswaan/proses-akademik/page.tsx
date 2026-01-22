"use client"

import { HeroSection, Modal } from "@/features/kemahasiswaan"
import { useProsesAkademikPage } from "@/features/kemahasiswaan/hooks/useProsesAkademik"
import { ProsesAkademikMainSection } from "@/features/kemahasiswaan/sections/ProsesAkademikMainSection"

export default function ProsesAkademikPage() {
  const {
    hero,
    items,
    selectedId,
    openModal,
    closeModal,
  } = useProsesAkademikPage()

  return (
    <>
      <HeroSection data={hero} />
      <ProsesAkademikMainSection selectedId={selectedId} items={items} openModal={openModal}/>

      <Modal open={!!selectedId} onClose={closeModal} id={selectedId} />
    </>
  )
}
