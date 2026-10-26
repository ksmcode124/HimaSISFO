import Image from "next/image"
import { ItemDataJSON } from "../types/data"

interface Props {
  items: ItemDataJSON[]
  activeIndex: number
  onSelect: (index: number) => void
}

export function AccordionVisualCarousel({ items, activeIndex, onSelect }: Props) {
  return (
    <div className="relative h-50 w-50">
      {items.map((item, index) => {
        // offset digunakan untuk mengatur penempatan image berada di sebelah kiri atau kanan
        const offset = getCircularOffset(index, activeIndex, items.length);

        return (
          <button
            key={item.id}
            onClick={() => activeIndex === index ? onSelect(index) : onSelect(index)}
            className={`
              absolute inset-0
              flex items-center justify-center
              transition-all duration-500 ease-out
              ${getTransform(offset)}
            `}
          >
            <Image
              src={`/assets/kemahasiswaan/${item.image}`}
              alt=""
              fill
              className="object-contain"
            />
          </button>
        )
      })}
    </div>
  )
}

function getCircularOffset(
  index: number,
  activeIndex: number,
  length: number
) {
  const raw = index - activeIndex
  const half = Math.floor(length / 2)

  if (raw > half) return raw - length
  if (raw < -half) return raw + length
  return raw
}

// fungsi ini digunakan untuk menempatkan element berdasarkan offset
function getTransform(offset: number) {
  if (offset === 0) {
    return "translate-x-0 rotate-0 scale-100 opacity-100 z-30"
  }

  if (offset === -1) {
    return "-translate-x-20 -rotate-45 scale-90 opacity-70 z-20"
  }

  if (offset === 1) {
    return "translate-x-20 rotate-45 scale-90 opacity-70 z-20"
  }

  if (offset === -2) {
    return "-translate-x-28 -rotate-90 scale-75 opacity-40 z-10"
  }

  if (offset === 2) {
    return "translate-x-28 rotate-90 scale-75 opacity-40 z-10"
  }

  return "opacity-0 scale-50 pointer-events-none z-0"
}
