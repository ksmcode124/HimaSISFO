"use client"

import { HeroSection, Modal } from "@/features/kemahasiswaan"
import { useProsesAkademikPage } from "@/features/kemahasiswaan/hooks/useProsesAkademik"
import { ProsesAkademikMainSection } from "@/features/kemahasiswaan/sections/ProsesAkademikMainSection"
import { useEffect } from "react"

export default function ProsesAkademikPage() {
  const {
    hero,
    items,
    selectedId,
    openModal,
    closeModal,
  } = useProsesAkademikPage()

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
      <ProsesAkademikMainSection selectedId={selectedId} items={items} openModal={openModal}/>

      <Modal open={!!selectedId} onCloseAction={closeModal} selectedId={selectedId} items={items} />
    </>
  )
}
