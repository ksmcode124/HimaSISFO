'use client'

import { LiquidGlass } from '@liquidglass/react'
import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

type GlassProps = ComponentProps<typeof LiquidGlass>

const DEFAULT_GLASS: Partial<GlassProps> = {
  blur: 20,
  contrast: 0.78,
  brightness: 1.125,
  saturation: 1.3,
  shadowIntensity: 0.4,
  displacementScale: 13,
  elasticity: 0.6,
}

export function Glass({ className, ...props }: GlassProps) {
  return (
    <LiquidGlass
      {...DEFAULT_GLASS}
      {...props}
      className={cn('glass', className)}
    />
  )
}