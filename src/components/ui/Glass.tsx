'use client';

import { cn } from '@/lib/utils';
import { motion, MotionValue, useMotionValue, useSpring, type HTMLMotionProps } from 'motion/react';
import React, { useCallback, useEffect, useId, useLayoutEffect, useRef } from 'react';
import { LiquidFilter, LiquidFilterProps } from './Filter';
import { getValueOrMotion } from '@/lib/utils/ui/liquid-glass';

/**
 * Safely parse border radius from computed styles, handling edge cases like
 * scientific notation (from rounded-full), percentages, and invalid values.
 * For very large values or scientific notation, returns half of the smallest dimension.
 */
const getBorderRadius = (element: HTMLElement, rect: DOMRect): number => {
  const computedStyle = getComputedStyle(element);
  const rawRadius = computedStyle.borderRadius;

  if (!rawRadius || rawRadius === '0px') {
    return 0;
  }

  const parsedRadius = parseFloat(rawRadius);

  if (isNaN(parsedRadius)) {
    return 0;
  }

  // Handle scientific notation (e.g., '1.67772e+07px' from rounded-full) or very large values
  if (parsedRadius > 9999 || rawRadius.includes('e+') || rawRadius.includes('E+')) {
    // For very large values (like rounded-full), return half of smallest dimension
    return Math.min(rect.width, rect.height) / 2;
  }

  return parsedRadius;
};

export const useMotionSizeObservers = <T extends HTMLElement = HTMLDivElement>(
  containerRef: React.RefObject<T | null>,
  disabled: boolean = false
) => {
  // Spring motion values → initial null untuk menunggu measurement
  const width = useSpring(100, { stiffness: 200, damping: 40 });
  const height = useSpring(100, { stiffness: 200, damping: 40 });
  const borderRadius = useSpring(100, { stiffness: 200, damping: 40 });

  const measured = useRef(false);
  const isUpdating = useRef(false);

  const updateDimensions = () => {
    const el = containerRef.current;
    if (!el || disabled || isUpdating.current) return;

    isUpdating.current = true;

    const rect = el.getBoundingClientRect();
    const newWidth = Math.max(rect.width, 1);
    const newHeight = Math.max(rect.height, 1);
    const newRadius = Math.max(getBorderRadius(el, rect), 0);

    // Set spring → jika belum diukur langsung ke ukuran child
    if (!measured.current) {
      width.set(newWidth);
      height.set(newHeight);
      borderRadius.set(newRadius);
      measured.current = true;
    } else {
      if (Math.abs(width.get() - newWidth) > 0.5) width.set(newWidth);
      if (Math.abs(height.get() - newHeight) > 0.5) height.set(newHeight);
      if (Math.abs(borderRadius.get() - newRadius) > 0.5) borderRadius.set(newRadius);
    }

    requestAnimationFrame(() => {
      isUpdating.current = false;
    });
  };

  // Layout effect → ukur sebelum paint
  useLayoutEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    // Initial measurement
    updateDimensions();

    // Observe resize
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(el);

    return () => resizeObserver.disconnect();
  }, [disabled]);

  // MutationObserver → untuk update borderRadius ketika style/class berubah
  useEffect(() => {
    const el = containerRef.current;
    if (!el || disabled) return;

    let timeoutId: NodeJS.Timeout;
    const mutationObserver = new MutationObserver(() => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(updateDimensions, 100);
    });

    mutationObserver.observe(el, {
      attributes: true,
      attributeFilter: ['style', 'class'],
    });

    return () => {
      clearTimeout(timeoutId);
      mutationObserver.disconnect();
    };
  }, [disabled]);

  return {
    width,
    height,
    borderRadius,
    measured: measured.current, // bisa dipakai di component untuk render glass
  };
};


export interface Light {
  intensity: number,
  angle: number,
}

type GlassPreset = 'soft' | 'medium' | 'hard'
export interface LiquidGlassProps<T extends HTMLElement = HTMLDivElement>
  extends Pick<
    LiquidFilterProps,
    | 'glassThickness'
    | 'bezelWidth'
    | 'blur'
    | 'bezelHeightFn'
    | 'refractiveIndex'
    | 'specularOpacity'
    | 'specularSaturation'
    | 'dpr'
  > {
  preset?: GlassPreset;
  className?: string;
  targetRef?: React.RefObject<T | null>;
  frost?: number;
  splay?: number;
  depth?: number;
  light?: Light;
  refraction?: number;
  dispersion?: number;
  width?: MotionValue<number>;
  height?: MotionValue<number>;
  borderRadius?: MotionValue<number>;
  disabled?: boolean;
  onClick?: () => void;
}

export const useLiquidSurface = <T extends HTMLElement = HTMLDivElement>({
  targetRef,
  borderRadius: borderRadiusProp,
  ...props
}: LiquidGlassProps<T>) => {
  const filterId = `glass-${useId()}`;
  const rawRef = useRef<T>(null);
  const ref = targetRef ?? rawRef;

  // Motion observer membaca size elemen
  const { width: observedWidth, height: observedHeight, borderRadius: observedRadius } =
    useMotionSizeObservers(ref);

  // Gunakan borderRadiusProp kalau ada, tapi width/height dari observer
  const finalWidth = observedWidth ? getValueOrMotion(observedWidth) : 100;
  const finalHeight = observedHeight ? getValueOrMotion(observedHeight) : 100;
  const finalRadius = borderRadiusProp ?? observedRadius;

  const Filter = () => (
    <LiquidFilter
      id={filterId}
      width={Math.max(finalWidth ?? 0, 1)}   // jangan 0
      height={Math.max(finalHeight ?? 0, 1)} // jangan 0
      radius={finalRadius}
      {...props}
    />
  );

  const filterStyles: React.CSSProperties = {
    backdropFilter: `url(#${filterId})`,
    WebkitBackdropFilter: `url(#${filterId})`,
  };

  return { filterId, filterStyles, ref, Filter };
};


const THEME: Record<string, LiquidGlassProps> = {
  soft: {
    className: 'bg-transparent rounded-2xl'
  },
  medium: {
    className: 'bg-white/50 p-1 md:p-3 rounded-2xl'
  },
  hard: {
    className: 'bg-white/50 md:bg-[#101D2F]/50 rounded-2xl'
  }
}
export const Glass: React.FC<LiquidGlassProps & HTMLMotionProps<'div'>> = ({
  preset = 'soft',
  children,
  depth: glassThickness,
  splay: bezelWidth,
  frost: blur,
  bezelHeightFn,
  refraction: refractiveIndex,
  light: specularOpacity,
  dispersion: specularSaturation,
  dpr = 1,
  targetRef,
  disabled = false,
  ...props
}) => {

  const defaults = {
    glassThickness: 110,
    bezelWidth: 20,
    blur: 0.5,
    refractiveIndex: 2,
    specularOpacity: 10,
    specularSaturation: 200,
    dpr,
  };

  const widthChild = useSpring(100, { stiffness: 300, damping: 50 })
  const heightChild = useSpring(100, { stiffness: 300, damping: 50 })
  const borderRadiusChild = useSpring(100, { stiffness: 300, damping: 50 })

  useLayoutEffect(() => {
    const update = () => {
      if (!ref.current) return; // ✅ check here!
      const rect = ref.current.getBoundingClientRect()
      widthChild.set(rect.width)
      heightChild.set(rect.height)
      const style = getComputedStyle(ref.current)
      borderRadiusChild.set(parseFloat(style.borderRadius) || 0)
    }

    if (!ref.current) return; // optional initial guard
    const observer = new ResizeObserver(update)
    observer.observe(ref.current)
    update() // initial

    return () => observer.disconnect()
  }, [widthChild, heightChild, borderRadiusChild])


  const { filterStyles, filterId, Filter, ref } = useLiquidSurface({
    ...defaults,
    bezelHeightFn: bezelHeightFn,
    width: widthChild,
    height: heightChild,
    borderRadius: borderRadiusChild,
    dpr: dpr,
    targetRef,
  });

  useEffect(() => {
    if (targetRef?.current) {
      targetRef.current.style.backdropFilter = `url(#${filterId})`;
    }
  }, [targetRef]);


  if (disabled === true) return (
    <div className="bg-transparent flex w-full h-full">
      {children as React.ReactNode}
    </div>
  );

  return (
    <>
      <Filter />
      {!targetRef && (
        <LiquidDiv
          {...props}
          style={{
            ...props.style,
            ...filterStyles,
          }}
          filterId={filterId}
          preset={preset}
          ref={ref}
        >
          {children}
        </LiquidDiv>
      )}
    </>
  );
};

const LiquidDiv = React.forwardRef<HTMLDivElement, { filterId: string, preset: string } & HTMLMotionProps<'div'>>(
  ({ children, filterId, preset, className, ...props }, ref) => {
    const isLiquidSupported = useMotionValue(false);

    useEffect(() => {
      // Paksa browser nge-check filter untuk render dari awal
      const div = document.createElement('div');
      div.style.backdropFilter = `url(#${filterId})`;
      if (div.style.backdropFilter !== '') isLiquidSupported.set(true);
    }, [filterId]);

    // Motion value dummy supaya trigger repaint
    const dummy = useMotionValue(4);
    useEffect(() => {
      const interval = setInterval(() => {
        dummy.set(dummy.get() + 0.01);
      }, 1000 / 60); // 60fps
      return () => clearInterval(interval);
    }, []);

    const supportsSVGFilters = useCallback(() => {
      const isWebkit = /Safari/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent);
      const isFirefox = /Firefox/.test(navigator.userAgent);

      if (isWebkit || isFirefox) {
        return false;
      }

      const div = document.createElement('div');
      div.style.backdropFilter = `url(#${filterId})`;
      return div.style.backdropFilter !== '';
    }, [filterId]);

    useEffect(() => {
      const svgSupported = supportsSVGFilters();
      if (svgSupported && typeof document !== 'undefined') {
        isLiquidSupported.set(true);
      }
    }, []);

    return (
      <motion.div
        ref={ref}
        className={cn(THEME[preset as keyof typeof THEME]?.className, isLiquidSupported ? '' : 'border', className)}
        style={{
          boxShadow: '0 3px 14px rgba(0,0,0,0.1)',
          zIndex: 99,
          ...props.style,
          ...(isLiquidSupported
            ? {}
            : {
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }),
        }}
      >
        {children}
      </motion.div>
    );
  }
);
