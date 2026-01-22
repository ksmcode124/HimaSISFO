import Image from "next/image"

export function ShapeDecoration({
  position,
}: {
  position: "top-right" | "bottom-left"
}) {
  const className =
    position === "top-right"
      ? `
        block absolute right-0
        w-100 sm:w-120 md:w-150 lg:w-200
        aspect-[5/1]
        rotate-180
        translate-x-2 sm:translate-x-4 md:translate-x-6 lg:translate-x-[13%]
        top-0
      `
      : `
        absolute bottom-0
        w-100 sm:w-120 md:w-150 lg:w-200
        aspect-[5/1]
        translate-x-[-5%] sm:translate-x-[-8%] md:translate-x-[-10%] lg:translate-x-[-13%]
        translate-y-[-10%] sm:translate-y-[-15%] md:translate-y-[-20%] lg:translate-y-[-30%]
      `

  return (
    <div className={className}>
      <Image
        src="/assets/kemahasiswaan/decoration-cloud-2.webp"
        alt=""
        fill
        className="object-contain"
      />
    </div>
  )
}
