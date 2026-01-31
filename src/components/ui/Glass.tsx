'use client'

import React, { useId, memo, ReactNode } from 'react'

type GlassPreset = 'soft' | 'medium' | 'strong'

interface Light {
  angle?: number       // derajat 0-360
  intensity?: number   // 0–100
}

interface GlassBetaProps {
  children?: ReactNode
  className?: string
  depth?: number        // 0–100
  refraction?: number   // 0–100
  dispersion?: number   // 0–100
  frost?: number        // 0–100
  splay?: number        // 0–100
  light?: Light
  hover?: boolean
  preset?: GlassPreset
  dewiness?: number     // 0–100, seberapa kuat efek embun di pinggir
  style?: React.CSSProperties
  disabled?: boolean
}

const PRESET_DEFAULTS: Record<GlassPreset, Partial<GlassBetaProps>> = {
  soft: { depth: 100, frost: 20, splay: 10, refraction: 100, dispersion: 100, light: { angle: 45, intensity: 80 }, dewiness: 100 },
  medium: { depth: 35, frost: 25, splay: 20, refraction: 20, dispersion: 3, light: { angle: 60, intensity: 70 }, dewiness: 20 },
  strong: { depth: 50, frost: 35, splay: 35, refraction: 35, dispersion: 5, light: { angle: 120, intensity: 90 }, dewiness: 30 },
}

export const Glass: React.FC<GlassBetaProps & React.HTMLAttributes<HTMLDivElement>> = memo(({
  children,
  className = '',
  preset = 'medium',
  hover = true,
  depth,
  refraction,
  dispersion,
  frost,
  splay,
  light,
  dewiness,
  style,
  disabled,
  ...props
}) => {
  const baseId = useId()
  const filterId = `glass-distort-${baseId}`
  const dewFilterId = `glass-filter-${baseId}`

  // Merge preset
  const presetValues = PRESET_DEFAULTS[preset]
  const finalDepth = (depth ?? presetValues.depth ?? 35) * 0.03
  const finalRefraction = (refraction ?? presetValues.refraction ?? 20) / 100
  const finalDispersion = (dispersion ?? presetValues.dispersion ?? 3) / 100
  const finalFrost = (frost ?? presetValues.frost ?? 25) / 100
  const finalSplay = (splay ?? presetValues.splay ?? 20) / 100
  const finalDew = (dewiness ?? presetValues.dewiness ?? 20) / 100
  const finalLight = {
    angle: light?.angle ?? presetValues.light?.angle ?? 45,
    intensity: ((light?.intensity ?? presetValues.light?.intensity ?? 50) / 100),
  }

  const rad = (finalLight.angle ?? 45) * Math.PI / 180
  const lightPosX = 50 + Math.cos(rad) * 50
  const lightPosY = 50 + Math.sin(rad) * 50


  if (disabled) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    )
  }

  
  return (
    <div
      className={`relative overflow-hidden transition-all duration-300 rounded-2xl ${className}`}
      style={{
        ...style,
        backdropFilter: `blur(${finalDepth}px) saturate(${100 + finalLight.intensity * 100}%)`,
        WebkitBackdropFilter: `blur(${finalDepth}px) saturate(${100 + finalLight.intensity * 100}%)`,
        background: `rgba(255,255,255,${finalFrost})`,
        boxShadow: `
          inset 0 0 ${finalFrost * 30}px rgba(255,255,255,0.25),
          0 4px 20px rgba(0,0,0,0.1)
        `,
        filter: `url(#${dewFilterId})`,
      }}
      {...props}
    >
      {/* Children */}
      <div className="relative z-10">{children}</div>

      {/* Splay / highlight */}
      {finalSplay > 0 && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${lightPosX}% ${lightPosY}%, rgba(255,255,255,${finalLight.intensity * finalSplay}) 0%, transparent 60%)`,
          }}
        />
      )}

      {/* Refraction + dispersion SVG filter */}
      {(finalRefraction > 0 || finalDispersion > 0) && (
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <filter id={filterId} x="0%" y="0%" width="100%" height="100%">
              <feTurbulence 
                type="fractalNoise" 
                baseFrequency={`${finalDispersion} ${finalDispersion}`} 
                numOctaves="2" 
                result="noise" 
              />
              <feGaussianBlur in="noise" stdDeviation={finalRefraction * 50} result="blurred" />
              <feDisplacementMap 
                in="SourceGraphic" 
                in2="blurred" 
                scale={finalRefraction * 100} 
                xChannelSelector="R" 
                yChannelSelector="G" 
              />
            </filter>
          </defs>
        </svg>
      )}

      {/* Dew / embun effect */}
      {finalDew > 0 && (
        <svg style={{ position: 'absolute', width: 0, height: 0 }}>
          <defs>
            <filter id={dewFilterId}>
              <feTurbulence type="fractalNoise" baseFrequency={0.3} numOctaves={2} result="dewNoise" />
              <feGaussianBlur in="dewNoise" stdDeviation={20 * finalDew} result="blurredDew" />
              <feDisplacementMap in="SourceGraphic" in2="blurredDew" scale={30 * finalDew} xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
      )}

      {/* Optional hover highlight */}
      {hover && (
        <div
          className="absolute inset-0 pointer-events-none transition-all duration-300"
          style={{
            background: `radial-gradient(circle at ${lightPosX}% ${lightPosY}%, rgba(255,255,255,${finalLight.intensity * finalSplay * 0.6}) 0%, transparent 60%)`,
          }}
        />
      )}
    </div>
  )
})
