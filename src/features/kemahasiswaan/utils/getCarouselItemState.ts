export function getCarouselItemState(
  index: number,
  selectedIndex: number
) {
  const diff = index - selectedIndex

  return {
    isActive: diff === 0,
    isNeighbor: Math.abs(diff) === 1,
  }
}
