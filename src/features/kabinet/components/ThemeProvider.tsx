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
    '--kabinet-gradient-name': colorConfig.gradient_kabinet_name_text,
    '--kabinet-gradient-pita': colorConfig.gradient_pita,
    '--kabinet-color-ornament': colorConfig.color_ornament,
    '--kabinet-gradient-ornament-1': colorConfig.gradient_ornament_1,
    '--kabinet-gradient-ornament-2': colorConfig.gradient_ornament_2,
    '--kabinet-gradient-ornament-4': colorConfig.gradient_ornament_4,
    '--kabinet-gradient-ornament-5': colorConfig.gradient_ornament_5,
    '--kabinet-gradient-ornament-9': colorConfig.gradient_ornament_9,
    '--kabinet-gradient-filosofi-background': colorConfig.gradient_filosofi_background,
    '--kabinet-gradient-tentang-text': colorConfig.gradient_tentang_text,
    '--kabinet-gradient-tentang-border': colorConfig.gradient_tentang_border,
    '--kabinet-gradient-visi-misi': colorConfig.gradient_visi_misi,
    '--kabinet-color-visi-misi-border': colorConfig.color_visi_misi_border,
    '--kabinet-gradient-carousel-button': colorConfig.gradient_carousel_button,
    '--kabinet-gradient-inti-background': colorConfig.gradient_inti_background,
    '--kabinet-color-pagination': colorConfig.color_pagination,
    "--kabinet-gradient-button-dept-card": colorConfig.gradient_dept_card_button
  } as CSSProperties

  return (
    <div style={themeVariables}>
      {children}
    </div>
  )
}