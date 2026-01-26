// DATA FILES
export { default as Kemahasiswaan } from "./data/kemahasiswaan.json"
export { default as Blanko } from "./data/blanko.json"
export { default as PendaftaranVerifikasi } from "./data/pendaftaran-verifikasi.json"
export { default as Pembayaran } from "./data/pembayaran.json"
export { default as Pengumuman } from "./data/pengumuman.json"
export { default as PelayananAdministratif } from "./data/pelayanan-administratif.json"
export { default as ProsesAkademik } from "./data/proses-akademik.json"
export { default as WisudaYudisium } from "./data/wisuda-yudisium.json"


// SECTIONS (PAGE COMPOSITION)
export { BreadcrumbSection } from "./sections/BreadcrumbSection"
export { HeroSection } from "./sections/HeroSection"
export { KemahasiswaanMainSection } from "./sections/KemahasiswaanMainSection"
export { BlankoSection } from "./sections/BlankoSection"
export { BlankoMainSection } from "./sections/BlankoMainSection"
export { ProsesAkademikMainSection } from "./sections/ProsesAkademikMainSection"
export { WisudaYudisiumMainSection } from "./sections/WisudaYudisiumMainSection"
export { PembayaranMainSection } from "./sections/PembayaranMainSection"
export { PelayananAdministratifSection } from "./sections/PelayananAdministratifSection"
export { PendaftaranMainSection } from "./sections/PendaftaranMainSection"
export { PengumumanMainSection } from "./sections/PengumumanMainSection"
export { PendaftaranVerifikasiDetailSection } from "./sections/PendaftaranVerifikasiDetailSection"


// COMPONENTS (UI)
export { Modal } from "./components/Modal"


// HOOKS
export { useKemahasiswaanPage } from "./hooks/useKemahasiswaanPage"
export { useBlankoPage } from "./hooks/useBlankoPage"
export { usePelayananAdministratifPage } from "./hooks/usePelayananAdministratifPage"
export { usePembayaranPage } from "./hooks/usePembayaranPage"
export { usePendaftaranVerifikasiPage } from "./hooks/usePendaftaranVerifikasiPage"
export { usePengumumanPage } from "./hooks/usePengumumanPage"
export { useWisudaYudisiumPage } from "./hooks/useWisudaYudisiumPage"
export { useProsesAkademikPage } from "./hooks/useProsesAkademik"
export { getPendaftaranVerifikasiDetail } from "./hooks/usePendaftaranVerifikasiDetailPage"

// TYPES
// types/index.ts
export * from "./types/data"
export * from "./types/hero"
export * from "./types/section"
export * from "./types/content"
export * from "./types/ui"

