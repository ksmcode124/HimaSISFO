import { SiteFooter } from "@/components/layout";

export default function KemahasiswaanLayout({children} : {children: React.ReactNode}) {
  return (
    <>
      {children}
      <SiteFooter />
    </>
  )
}