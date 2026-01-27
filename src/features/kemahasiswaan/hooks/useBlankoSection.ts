import { CTASection } from "../types/ui"

export function useBlankoSection(data: CTASection) {
  return {
    title: data.title,
    subtitle: data.subtitle,
    iconUrl: data.iconUrl,
    href: "kemahasiswaan/blanko",
  }
}
