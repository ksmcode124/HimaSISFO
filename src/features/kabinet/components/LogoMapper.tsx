import LogoAksayapatra from "./logo-kabinet/LogoAksayapatra"
import LogoGeloraHarmoni from "./logo-kabinet/LogoGeloraHarmoni"

/**
 * LogoMapper
 * 
 * This component maps a kabinet identifier to its corresponding logo. The kabinet name
 * is the key selector, so any changes to kabinet names in the system must be reflected here.
 * 
 * Maintenance Guidelines:
 * - Always keep this mapping in sync with KABINET_PALETTE and KABINET_COLOR_CONFIG.
 * - If a new kabinet is added, create a new logo component and add a new case here.
 * - Consider using a centralized type (KabinetColorType) to prevent invalid kabinet names.
 * - Avoid hardcoding strings elsewhere; reference the same constants used here for consistency.
 * - Optionally, a default or fallback logo can be added to handle unknown kabinet names gracefully.
 * 
 * Usage:
 * - Use this component wherever the kabinet logo should appear dynamically (headers, banners, hero sections).
 * - Ensure the kabinet prop always matches the canonical identifier string for predictable rendering.
 */
export function LogoMapper({kabinet}:{kabinet:string}) {
  switch(kabinet) {
    case 'gelora-harmoni': return <LogoGeloraHarmoni />
    case 'aksayapatra': return <LogoAksayapatra />
  }
}