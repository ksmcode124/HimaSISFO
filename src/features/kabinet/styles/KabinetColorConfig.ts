export const KABINET_COLOR_CONFIG = {
  "gelora-harmoni": {
    background: "#F4E8FF",
    gradient_pita: "linear-gradient(180deg, #E63258 0%, #A43DA5 100%)",
    gradient_ornament_1: "linear-gradient(105deg, #FFFFFF 0%, #A43DA5 50%, #E63258 100%)",
    gradient_ornament_2: "linear-gradient(104deg, #E63258 0%, #A43DA5 50%, #FFFFFF 80%)",
    gradient_ornament_4: "linear-gradient(-96deg, #E63258 0%, #A43DA5 50%, #FFFFFF 100%)",
    gradient_ornament_5: "linear-gradient(82deg, #FFFFFF 0%, #A43DA5 50%, #FFFFFF 100%)",
    gradient_ornament_9: "linear-gradient(-95deg, #FFFFFF 0%, #A43DA5 37%, #FFFFFF 90%)",
    gradient_filosofi_background: "linear-gradient(90deg, #E63258 0%, #FFFFFF 54%, #A43DA5 100%)",
    gradient_tentang_text: "linear-gradient(98deg, #A43DA5 0%, #E63258 100%)",
    gradient_tentang_border: "linear-gradient(91deg, #E63258 0%, #A43DA5 50%, #FFFFFF 100%)",
    gradient_visi_misi: "linear-gradient(84deg, #B956BA 0%, #FFFFFF 54%, #B956BA 100%)",
    color_visi_misi_border: "border-[#E63258]", // BORDER BELUM JALAN 
    gradient_carousel_button: "linear-gradient(180deg, #E63258 0%, #A43DA5 100%)",
    gradient_inti_background: "linear-gradient(180deg, #E63258 0%, #A43DA5 100%)",
    color_pagination: "#E63258",
    gradient_dept_card_button: "linear-gradient(180deg, #A43DA5 0%, #E63258 100%)",
    gradient_breadcrumb_text: "linear-gradient(87deg, #A43DA5 0%, #E63258 100%)",
    gradient_kabinet_name_text: "linear-gradient(87deg, #E63258 0%, #A43DA5 100%)",
    color_ornament: '#f6639a'
  },
  "aksayapatra": {
    background: "#EFFFE5",
    gradient_pita: "linear-gradient(180deg, #F0E068 0%, #1A4D4D 100%)",
    gradient_ornament_1: "linear-gradient(105deg, #F0E068 0%, #1A4D4D 50%, #FFFFFF 100%)",
    gradient_ornament_2: "linear-gradient(104deg, #F0E068 0%, #1A4D4D 50%, #FFFFFF 80%)",
    gradient_ornament_4: "linear-gradient(-96deg, #F0E068 0%, #1A4D4D 50%, #FFFFFF 100%)",
    gradient_ornament_5: "linear-gradient(82deg, #F0E068 0%, #1A4D4D 50%, #FFFFFF 100%)",
    gradient_ornament_9: "linear-gradient(-95deg, #F0E068 0%, #1A4D4D 37%, #FFFFFF 90%)",
    gradient_filosofi_background: "linear-gradient(90deg, #F0E068 0%, #FFFFFF 54%, #1A4D4D 100%)",
    gradient_tentang_text: "linear-gradient(98deg, #F0E068 0%, #1A4D4D 100%)",
    gradient_tentang_border: "linear-gradient(91deg, #F0E068 0%, #1A4D4D 50%, #FFFFFF 100%)",
    gradient_visi_misi: "linear-gradient(84deg, #1A4D4D 0%, #FFFFFF 54%, #1A4D4D 100%)",
    color_visi_misi_border: "border-[#F0E068]", // BORDER BELUM JALAN 
    gradient_carousel_button: "linear-gradient(180deg, #F0E068 0%, #1A4D4D 100%)",
    gradient_inti_background: "linear-gradient(180deg, #F0E068 0%, #1A4D4D 100%)",
    color_pagination: "#F0E068",
    gradient_dept_card_button: "linear-gradient(180deg, #F0E068 0%, #1A4D4D 100%)",
    gradient_breadcrumb_text: "linear-gradient(87deg, #1A4D4D 0%, #F0E068 100%)",
    gradient_kabinet_name_text: "linear-gradient(87deg, #F0E068 0%, #1A4D4D 100%)",
    color_ornament: '#F0E068'
  }
}

export type KabinetColorType = keyof typeof KABINET_COLOR_CONFIG;