import { cn } from "@/lib/utils"
import Image from "next/image"

/*
  USAGE NOTE:
  - DynamicAsset is designed to work in conjunction with ThemeProvider.
  - ThemeProvider provides CSS variables like '--kabinet-gradient-hero-background'.
  - By passing these variables as `gradientVar`, DynamicAsset dynamically updates 
    its gradient to match the selected kabinet theme without modifying the component itself.
  - This enables reusable, theme-aware masked visuals across the app.
*/

type DynamicAssetProps = {
  className?: string // Optional wrapper class
  maskSrc: string // Path to the mask image used for masking the gradient
  imageSrc?: string | null // Optional underlying image behind the mask
  gradientVar: string // Gradient background passed from ThemeProvider (usually a CSS var)
  innerHeight: string // Tailwind height class for inner container (default 'h-full')
  imageScale?: string // Optional Tailwind class to scale the image
  maskRepeat?: string; // Repeat property for the mask (default 'no-repeat')
  style?: React.CSSProperties // Inline styles for outer wrapper
}

export function DynamicAsset({
  className,
  maskSrc,
  gradientVar,
  style,
  imageSrc = null,
  innerHeight = 'h-full',
  imageScale,
  maskRepeat = "no-repeat",
}: DynamicAssetProps) {
  return (
    // Outer wrapper div; can receive additional classes or inline styles
    <div className={className} style={style}>
      <div className={cn("relative w-full h-full", innerHeight)}>
        {/* Optional underlying image (e.g., cabinet photo or card content) */}
        {imageSrc && <Image
          src={imageSrc}
          alt=""
          fill
          className={cn("object-contain", imageScale)}
        /> }

        {/* Masked gradient overlay */}
        {/* 
          The background gradient is usually a CSS variable provided by ThemeProvider.
          For example: var(--kabinet-gradient-hero-background)
          This allows DynamicAsset to adapt automatically to the current kabinet theme.
        */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background: gradientVar,
            maskImage: `url(${maskSrc})`,
            maskRepeat: maskRepeat,
            maskPosition: 'center',
            maskSize: 'contain',
            WebkitMaskImage: `url(${maskSrc})`,
            WebkitMaskRepeat: maskRepeat,
            WebkitMaskPosition: 'center',
            WebkitMaskSize: 'contain',
          }}
        />
      </div>
    </div>
  )
}