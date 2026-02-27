import { BreadcrumbItemData } from "@/components/ui/breadcrumb"

// Represents data needed to render a hero section
export interface HeroData {
  title: string                  // Main heading for the hero section
  subtitle: string               // Supporting subheading
  breadcrumbItems?: BreadcrumbItemData[] // Optional array of breadcrumb entries for navigation context
}
