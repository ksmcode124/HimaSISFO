import { HeroData } from "../types/hero"

/**
 * Hook: useHeroSection
 *
 * Purpose:
 * Provides derived UI state and layout classes for a hero section.
 * - Determines whether breadcrumbs should be rendered.
 * - Supplies responsive minimum height class names for styling.
 *
 * Architectural Boundary:
 * - Purely a UI-centric hook: no data fetching or side effects.
 * - Does not mutate hero data; only derives layout-related flags.
 *
 * Invariants:
 * - hero.breadcrumbItems, if defined, must be an array.
 * - minHeightClass should cover all target breakpoints consistently.
 *
 * Risks / Failure Modes:
 * - If hero.breadcrumbItems is not an array, `hasBreadcrumb` will default to false.
 * - Hard-coded class names may need adjustment if design tokens or breakpoints change.
 *
 * Maintenance Guidelines:
 * - Keep responsive height values in sync with design system.
 * - Avoid adding unrelated logic; this hook should remain lightweight.
 */
export function useHeroSection(hero: HeroData) {
  // Determine if breadcrumbs exist
  const hasBreadcrumb =
    Array.isArray(hero.breadcrumbItems) &&
    hero.breadcrumbItems.length > 0

  // Responsive min-height classes for hero section
  const minHeightClass = "min-h-[40vh] sm:min-h-[50vh] md:min-h-[45svh] lg:min-h-[75vh]"

  return {
    hasBreadcrumb,
    minHeightClass,
  }
}