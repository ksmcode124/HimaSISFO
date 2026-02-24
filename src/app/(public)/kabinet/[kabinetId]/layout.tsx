import { SiteFooter } from "@/components/layout";

export default function KabinetLayout({children} : {children: React.ReactNode}) {
  return (
    <>
      {children}
      <SiteFooter />
    </>
  )
}