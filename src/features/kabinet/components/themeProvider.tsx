import { CSSProperties, ReactNode } from "react"
import { KABINET_COLOR_CONFIG, KabinetColorType } from "../styles/KabinetColorConfig"

// ThemeProvider component wraps its children with kabinet-specific theme variables.
// It accepts `kabinet` as a prop, which is used to fetch the corresponding color configuration
// from KABINET_COLOR_CONFIG. All color and gradient values are mapped to CSS custom properties
// (variables) that can be used by nested components for consistent theming.
//
// Props:
// - children: ReactNode - the subtree that will inherit the theme variables
// - kabinet: KabinetColorType - the selected cabinet theme to apply
//
// Implementation details:
// 1. `colorConfig` retrieves the color configuration for the selected kabinet.
// 2. `themeVariables` maps each property in colorConfig to a CSS variable.
// 3. The CSS variables cover backgrounds, text colors, gradients, ornaments, carousel buttons,
//    borders, pagination colors, and department card styles.
// 4. The div wrapping `children` applies the `themeVariables` inline, making them accessible
//    to all nested elements via `var(--kabinet-*)`.
// 5. Use DynamicAsset component 
//
// Notes:
// - If a new kabinet is added, create a new set of KABINET_COLOR_CONFIG component
// - This approach avoids the need for a React context for theming.
// - CSS variables are strings, so the KABINET_COLOR_CONFIG must provide valid CSS values.
// - Nested components should reference these variables to ensure theme consistency.
// - Inline styles ensure server-side rendering matches client-side without flash of unstyled content.

interface ThemeProviderProp {
  children: ReactNode
  kabinet: KabinetColorType
}

export function ThemeProvider({children, kabinet}: ThemeProviderProp) {
  const colorConfig = KABINET_COLOR_CONFIG[kabinet]

  const themeVariables = {
    '--kabinet-background': colorConfig.background,
    '--kabinet-color-text': colorConfig.color_text,
    '--kabinet-color-primary': colorConfig.color_primary,
    '--kabinet-color-secondary': colorConfig.color_secondary,

    '--kabinet-gradient-hero-background': colorConfig.gradient_hero_background,
    '--kabinet-gradient-layer-background': colorConfig.gradient_layer_background,
    '--kabinet-gradient-name-text': colorConfig.gradient_kabinet_name_text,
    '--kabinet-breadcrumb-text': colorConfig.gradient_breadcrumb_text,
    '--kabinet-breadcrumb-underline': colorConfig.gradient_breadcrumb_underline,

    '--kabinet-gradient-pita': colorConfig.gradient_pita,
    '--kabinet-color-ornament': colorConfig.color_ornament,
    '--kabinet-gradient-ornament-1': colorConfig.gradient_ornament_1,
    '--kabinet-gradient-ornament-2': colorConfig.gradient_ornament_2,
    '--kabinet-gradient-ornament-3': colorConfig.gradient_ornament_3,
    '--kabinet-gradient-ornament-4': colorConfig.gradient_ornament_4,
    '--kabinet-gradient-ornament-5': colorConfig.gradient_ornament_5,
    '--kabinet-gradient-ornament-9': colorConfig.gradient_ornament_9,

    '--kabinet-gradient-filosofi-background': colorConfig.gradient_filosofi_background,
    '--kabinet-gradient-tentang-text': colorConfig.gradient_tentang_text,
    '--kabinet-gradient-tentang-border': colorConfig.gradient_tentang_border,
    '--kabinet-gradient-visi-misi': colorConfig.gradient_visi_misi,
    '--kabinet-color-visi-misi-border': colorConfig.color_visi_misi_border,
    '--kabinet-color-chevron-icon': colorConfig.color_chevron_icon,

    '--kabinet-gradient-inti-background': colorConfig.gradient_inti_background,
    '--kabinet-gradient-carousel-button': colorConfig.gradient_carousel_button,
    '--kabinet-color-pagination': colorConfig.color_pagination,
    '--kabinet-gradient-inti-border-bottom': colorConfig.gradient_inti_border_bottom,

    "--kabinet-gradient-dept-card-button": colorConfig.gradient_dept_card_button,
    "--kabinet-color-dept-card-border": colorConfig.color_dept_card_border
  } as CSSProperties

  return (
    <div style={themeVariables}>
      {children}
    </div>
  )
}
