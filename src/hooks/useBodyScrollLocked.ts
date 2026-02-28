"use client"

import { useLayoutEffect } from "react"

/**
 * useBodyScrollLock
 *
 * Locks body scroll when `locked` is true.
 *
 * Design Goals:
 * - Safe for repeated mounts
 * - Restores previous inline style on cleanup
 * - Avoids leaking global DOM mutations
 *
 * Usage:
 * useBodyScrollLock(!!selectedId)
 */
export function useBodyScrollLock(locked: boolean) {
  useLayoutEffect(() => {
    if (!locked) return

    const body = document.body

    // Preserve existing inline style to avoid overwriting external logic
    const previousOverflow = body.style.overflow
    const previousPaddingRight = body.style.paddingRight

    // Optional: prevent layout shift caused by scrollbar removal
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth

    body.style.overflow = "hidden"

    if (scrollbarWidth > 0) {
      body.style.paddingRight = `${scrollbarWidth}px`
    }

    return () => {
      body.style.overflow = previousOverflow
      body.style.paddingRight = previousPaddingRight
    }
  }, [locked])
}