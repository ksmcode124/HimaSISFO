import { CTASection } from "../types"


export default function BlankoSection({title, subtitle, cta}: CTASection) {
  return (
    <section className="w-full min-h-[40vh] grid grid-cols-2 items-center justify-items-center px-2">
      <div>GAMBAR FOLDER</div>
      <div className="flex flex-col gap-4 text-center">
        <h1 className="font-bold text-2xl">{title}</h1>
        <p>{subtitle}</p>
        <button>{cta}</button>
      </div>
    </section>
  )
}