import { footerNavItems } from "@/features/navigation"
import Image from "next/image"
import Link from "next/link"

export default function SiteFooter() {
  return (
    <footer className="text-white bg-neutral-200 lg:bg-neutral-800/60 text-shadow-[0_2px_2px_#000] lg:text-shadow-none grid grid-cols-3 grid-rows-[4fr_6fr_2fr] lg:grid-cols-[3fr_3fr_3fr_3fr] lg:grid-rows-[5fr_1fr] lg:gap-y-15 px-5 py-15 md:px-15">
      <div className="col-span-3 lg:col-span-2 lg:flex gap-10 justify-items-center">
        <div className="relative w-30 h-30 lg:w-50 lg:h-50">
          <Image
            fill
            src="/assets/shared/logos/logo-himasisfo.webp"
            alt="Logo"
            className="object-contain"
            />
        </div>

         <div className="flex flex-col w-full items-center lg:items-start">
          <h3 className="text-lg font-bold">HIMASISFO</h3>
          <p className="hidden lg:block">ALAMAT</p>
         </div>
      </div>
      <div className="col-span-2 lg:col-span-1">
        <h4 className="font-bold text-sm mb-5">TAUTAN AKADEMIK</h4>
        <ul className="font-medium text-xs flex flex-col gap-4">
          {footerNavItems.map((items) => {
            return (
              <li key={items.href}>
               <Link href={items.href}>{items.label}</Link>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="flex flex-col items-center gap-5 py-5">
        {/* TODO: Ganti ke Social Media */}
        <div className="w-10 h-10 bg-white">ICON</div>
        <div className="w-10 h-10 bg-white">ICON</div>
        <div className="w-10 h-10 bg-white">ICON</div>
        <div className="w-10 h-10 bg-white">ICON</div>
      </div>
      <div className="col-span-3 lg:col-span-4 text-center text-sm font-bold items-center justify-center">&copy; COPYRIGHT {new Date().getFullYear()}. All Rights Reserved</div>
    </footer>
  )  
}