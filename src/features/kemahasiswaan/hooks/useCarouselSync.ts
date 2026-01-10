import { useState, useEffect } from "react"
import type { CarouselApi } from "@/components/ui/Carousel"

// Sinkronisasi index aktif dengan posisi scroll Embla
export function useCarouselSync(api: CarouselApi | null) {
  const [selectedIndex, setSelectedIndex] = useState(0)

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);

    // pastikan ini void
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return selectedIndex
}
