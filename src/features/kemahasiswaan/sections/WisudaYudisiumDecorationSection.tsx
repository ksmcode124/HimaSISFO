import Image from "next/image"
import { DecorationLayer } from "@/components/layout/Layer"

export function WisudaDecorationLayer() {
  return (
    <DecorationLayer className="rotate-y-180">
      <div className="absolute w-full aspect-2/1 scale-x-150 lg:scale-y-90 translate-y-[30%]">
        <Image src="/assets/kemahasiswaan/bg-shape-1.webp" alt="" fill />
      </div>
      <div className="absolute w-full aspect-2/1 scale-x-150 lg:scale-y-90 -translate-y-[25%] rotate-y-180">
        <Image src="/assets/kemahasiswaan/bg-shape-1.webp" alt="" fill />
      </div>
    </DecorationLayer>
  )
}
