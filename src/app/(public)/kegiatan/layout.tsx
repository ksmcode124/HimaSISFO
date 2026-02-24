import { SiteFooter } from "@/components/layout";

export default function KegiatanLayout({children} : {children: React.ReactNode}) {
  return (
    <>
      {children}
      <SiteFooter />
    </>
  )
}