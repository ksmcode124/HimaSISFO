const KABINET_PALETTE = {
  "gelora-harmoni": {
    primary: "#E63258",
    secondary: "#A43DA5",
    text: "#2D2D51",
    background: "#F4E8FF",
  },
  "aksayapatra": {
    primary: "#F0E068",
    secondary: "#1A4D4D",
    text: "#1B202E",
    background: "#EFFFE5",
  },
  "ekspansi": {
    primary: "#F35C35",
    secondary: "#F5B349",
    text: "#3D2415",
    background: "#FFF4E6",
  }
};

export const KABINET_COLOR_CONFIG = Object.fromEntries(
  Object.entries(KABINET_PALETTE).map(([key, p]) => [
    key,
    {
      // --- Dasar ---
      background: p.background,
      color_text: p.text,
      color_primary: p.primary,
      color_secondary: p.secondary,
      
      // --- Hero ---
      gradient_hero_background: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), linear-gradient(210deg, ${p.primary} 0%, ${p.secondary} 50%, #FFFFFF 100%)`,
      gradient_layer_background: `linear-gradient(180deg, ${p.primary} 0%, ${p.secondary} 100%)`,
      gradient_kabinet_name_text: `linear-gradient(135deg, ${p.primary} 0%, ${p.secondary} 100%)`,
      gradient_breadcrumb_text: `linear-gradient(87deg, ${p.secondary} 0%, ${p.primary} 100%)`,
      
      // --- Ornament ---
      gradient_pita: `linear-gradient(rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.15)), linear-gradient(0deg, ${p.secondary} 30%, ${p.primary} 65%)`,
      gradient_ornament_1: `linear-gradient(90deg, ${p.primary} 30%, ${p.secondary} 50%, #FFFFFF 110%)`,
      gradient_ornament_2: `linear-gradient(90deg, ${p.primary} 25%, ${p.secondary} 50%, #FFFFFF 75%)`,
      gradient_ornament_3: `linear-gradient(90deg, ${p.primary} 25%, ${p.secondary} 50%, #FFFFFF 75%)`,
      gradient_ornament_4: `linear-gradient(90deg, #FFFFFF 25%, ${p.secondary} 50%, ${p.primary} 65%)`,
      gradient_ornament_5: `linear-gradient(rgba(255, 255, 255, 0.20), rgba(255, 255, 255, 0.20)), linear-gradient(90deg, ${p.primary} 0%, ${p.secondary} 50%, #FFFFFF 65%)`,
      gradient_ornament_9: `linear-gradient(90deg, #FFFFFF 0%, ${p.secondary} 45%, ${p.primary} 65%)`,
      
      // --- Section & Component ---
      gradient_filosofi_background: `linear-gradient(90deg, ${p.primary} 0%, #FFFFFF 50%, ${p.secondary} 100%)`,
      gradient_tentang_text: `linear-gradient(135deg, ${p.primary} 0%, ${p.secondary} 35%)`,
      gradient_tentang_border: `linear-gradient(90deg, ${p.primary} 15%, ${p.secondary} 55%, #FFFFFF 110%)`,
      gradient_visi_misi: `linear-gradient(rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.25)), linear-gradient(90deg, ${p.secondary} 0%, #FFFFFF 50%, ${p.secondary} 100%)`,
      color_visi_misi_border: p.primary,
      color_chevron_icon: p.secondary,

      gradient_inti_background: `linear-gradient(180deg, ${p.primary} 0%, ${p.secondary} 100%)`,
      gradient_carousel_button: `linear-gradient(180deg, ${p.primary} 0%, ${p.secondary} 100%)`,
      color_pagination: p.secondary,
      gradient_inti_border_bottom: `linear-gradient(90deg, ${p.primary} 0%, ${p.secondary} 50%, #FFFFFF 100%)`,

      gradient_dept_card_button: `linear-gradient(180deg, ${p.primary} 0%, ${p.secondary} 100%)`,
      color_dept_card_border: p.primary,
    }
  ])
);

export type KabinetColorType = keyof typeof KABINET_PALETTE;