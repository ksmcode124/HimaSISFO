import { cn } from "@/lib/utils"
import Image from "next/image"

type DynamicAssetProps = {
  className?: string
  maskSrc: string
  imageSrc?: string | null
  gradientVar: string
  innerHeight: string
  imageScale?: string
  style?: React.CSSProperties
}

export function DynamicAsset({
  className,
  maskSrc,
  gradientVar,
  style,
  imageSrc = null,
  innerHeight = 'h-full',
  imageScale
}: DynamicAssetProps) {
  return (
    <div className={className} style={style}>
      <div className={cn("relative w-full h-full", innerHeight)}>
        {imageSrc && <Image
          src={imageSrc}
          alt=""
          fill
          className={cn("object-contain", imageScale)}
        /> }
        <div
          className="absolute inset-0 z-10"
          style={{
            background: gradientVar,
            maskImage: `url(${maskSrc})`,
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
            maskSize: 'contain',
            WebkitMaskImage: `url(${maskSrc})`,
            WebkitMaskRepeat: 'no-repeat',
            WebkitMaskPosition: 'center',
            WebkitMaskSize: 'contain',
          }}
        />
      </div>
    </div>
  )
}

