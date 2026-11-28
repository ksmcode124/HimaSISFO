import { ItemDataJSON } from "./data"

// Props for a collapsible accordion section component
export interface AccordionSectionProps {
  items: ItemDataJSON[] // Array of items to display in the accordion
}

// Props for a carousel component
export interface CarouselSectionProps {
  data: ItemDataJSON[] // Items to render as slides
}

// Minimal card representation for UI components
export interface CardProps {
  id: string          // Unique identifier
  title: string       // Display title
  description: string // Short description or summary
}

// Represents a "Blanko" item (form/template) for display
export interface BlankoItem {
  id: string        // Unique identifier
  title: string     // Display title
  image: string     // Thumbnail or illustrative image URL
  filepath: string  // Source file path or reference
}

// Call-to-Action section data structure
export interface CTASection {
  title: string    // Section heading
  subtitle: string // Section subheading
  iconUrl: string  // Icon URL for visual representation
}