import { CTASection } from "../types/ui"

/**
 * Hook: useBlankoSection
 *
 * Purpose:
 * Normalizes a CTASection object for use in the Blanko page.
 * Returns only the fields required for UI rendering along with
 * a fixed navigation link.
 *
 * Architectural Notes:
 * - This hook acts purely as a data mapper, not a data fetcher.
 * - It keeps UI components decoupled from raw JSON structure.
 * - The href is hard-coded for navigation consistency.
 *
 * Invariant:
 * - data.title, data.subtitle, and data.iconUrl must be defined.
 * - href will always point to "kemahasiswaan/blanko".
 *
 * Risk / Failure Modes:
 * - If data is missing any of the required fields, UI may render
 *   incorrectly or break.
 * - Hard-coded href reduces flexibility if the route changes.
 *
 * Maintenance Guidelines:
 * - Ensure that the CTASection type remains consistent with the JSON
 *   or API providing these sections.
 * - If multiple pages require similar mapping, consider generalizing
 *   this hook to accept dynamic hrefs.
 */
export function useBlankoSection(data: CTASection) {
  return {
    title: data.title,
    subtitle: data.subtitle,
    iconUrl: data.iconUrl,
    href: "kemahasiswaan/blanko",
  }
}