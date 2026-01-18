import Image from "next/image"

export function ShapeDecoration({
  position,
}: {
  position: "top-right" | "bottom-left"
}) {
  const className =
    position === "top-right"
      ? "block absolute right-0 w-100 translate-x-[13%] sm:w-120 md:w-150 lg:w-200 aspect-5/1 -rotate-z-180"
      : "absolute bottom-0 -translate-x-[13%] -translate-y-[30%] w-100 sm:w-120 md:w-150 lg:w-200 aspect-5/1"

  return (
    <div className={className}>
      <Image
        src="/assets/kemahasiswaan/decoration-cloud-2.webp"
        alt=""
        fill
      />
    </div>
  )
}