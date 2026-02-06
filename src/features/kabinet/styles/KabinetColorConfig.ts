export const KABINET_COLOR_CONFIG = {
  "gelora-harmoni": {
    gradient_pita: "linear-gradient(0deg, #E63258 0%, #A43DA5 100%)",
    gradient_ornament_1: "linear-gradient(90deg, #E63258 0%, #A43DA5 50%, #FFFFFF 100%)",
    gradient_ornament_2: "linear-gradient(90deg, #E63258 0%, #A43DA5 50%, #FFFFFF 100%)",
    gradient_ornament_4: "linear-gradient(90deg, #E63258 0%, #A43DA5 50%, #FFFFFF 100%)",
    gradient_ornament_5: "linear-gradient(90deg, #E63258 0%, #A43DA5 50%, #FFFFFF 100%)",
    gradient_ornament_9: "linear-gradient(90deg, #E63258 0%, #A43DA5 50%, #FFFFFF 100%)",
    gradient_filosofi_background: "linear-gradient(90deg, #E63258 0%, #FFFFFF 54%, #A43DA5 100%)",
    gradient_tentang_text: "linear-gradient(90deg, #A43DA5 0%, #E63258 100%)",
    gradient_tentang_border: "linear-gradient(90deg, #E63258 0%, #A43DA5 50%, #FFFFFF 100%)",
    gradient_visi_misi: "linear-gradient(90deg, #B956BA 0%, #FFFFFF 50%, #B956BA 100%)",
    color_visi_misi_border: "border-[#E63258]", // BORDER BELUM JALAN 
    gradient_carousel_button: "linear-gradient(90deg, #B956BA 0%, #FFFFFF 50%, #B956BA 100%)",
    gradient_inti_background: "linear-gradient(90deg, #A43DA5 0%, #E63258 100%)",
    color_pagination: "#E63258",
    gradient_dept_card_button: "linear-gradient(90deg, #A43DA5 0%, #E63258 100%)",
  },
  "aksayapatra": {
    gradient_pita: "linear-gradient(180deg, #F0E068 0%, #1A4D4D 100%)",
    gradient_ornament_1: "linear-gradient(90deg, #F0E068 0%, #1A4D4D 50%, #FFFFFF 100%)",
    gradient_ornament_2: "linear-gradient(90deg, #F0E068 0%, #1A4D4D 50%, #FFFFFF 100%)",
    gradient_ornament_4: "linear-gradient(90deg, #F0E068 0%, #1A4D4D 50%, #FFFFFF 100%)",
    gradient_ornament_5: "linear-gradient(90deg, #F0E068 0%, #1A4D4D 50%, #FFFFFF 100%)",
    gradient_ornament_9: "linear-gradient(90deg, #F0E068 0%, #1A4D4D 50%, #FFFFFF 100%)",
    gradient_filosofi_background: "linear-gradient(90deg, #F0E068 0%, #FFFFFF 54%, #1A4D4D 100%)",
    gradient_tentang_text: "linear-gradient(90deg, #F0E068 0%, #1A4D4D 100%)",
    gradient_tentang_border: "linear-gradient(90deg, #F0E068 0%, #1A4D4D 50%, #FFFFFF 100%)",
    gradient_visi_misi: "linear-gradient(90deg, #1A4D4D 0%, #FFFFFF 50%, #1A4D4D 100%)",
    color_visi_misi_border: "border-[#F0E068]",
    gradient_carousel_button: "linear-gradient(90deg, #1A4D4D 0%, #FFFFFF 50%, #1A4D4D 100%)",
    gradient_inti_background: "linear-gradient(90deg, #F0E068 0%, #1A4D4D 100%)",
    color_pagination: "#F0E068",
    gradient_dept_card_button: "linear-gradient(90deg, #F0E068 0%, #1A4D4D 100%)",
  }
}

export type KabinetColorType = keyof typeof KABINET_COLOR_CONFIG;