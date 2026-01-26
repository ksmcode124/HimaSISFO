// types/ui.ts
import { ItemDataJSON } from "./data"

export interface AccordionSectionProps {
  items: ItemDataJSON[]
}

export interface CarouselSectionProps {
  data: ItemDataJSON[]
}

export interface CardProps {
  id: string,
  title: string,
  description: string,
}

export interface BlankoItem {
  id: string,
  title: string,
  image: string,
  filepath: string
}

export interface CTASection {
  title: string,
  subtitle: string,
  iconUrl: string
}