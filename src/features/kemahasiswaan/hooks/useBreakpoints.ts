import { useEffect, useState } from "react"

export const MOBILE_BREAKPOINT = 768
export const TABLET_BREAKPOINT = 1024

export function useBreakpoint() {
  const [width, setWidth] = useState<number>(0)
  useEffect(() => {
    const handle = () => setWidth(window.innerWidth)
    handle()
    window.addEventListener("resize", handle)
    return () => window.removeEventListener("resize", handle)
  }, [])
  return width
}