import { CSSProperties, ReactNode } from "react"
import { KABINET_COLOR_CONFIG, KabinetColorType } from "../styles/KabinetColorConfig"

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

    '--kabinet-gradient-pita': colorConfig.gradient_pita,
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
