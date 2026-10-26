import { ContentBlock } from "./content"
import { Section } from "./section"

// Represents a single content item in a section
export type ItemDataJSON = {
  id: string              // Unique identifier for this item
  title: string           // Display title
  content: ContentBlock[] // Array of content blocks (paragraphs, lists)
  image?: string          // Optional image URL for the item
}

// Represents the entire JSON file structure for a Kemahasiswaan page
export type KemahasiswaanDataFile = {
  schemaVersion: number   // Version of the JSON schema; for migration/validation
  slug: string            // Unique slug for the page
  seo: {                  // SEO metadata
    title: string         // Meta title
    description: string   // Meta description
  };
  hero: {                 // Hero section configuration
    title: string         // Hero title
    subtitle: string      // Hero subtitle
  };
  sections: Section[]     // Array of structured sections (accordions, item-collections, etc.)
  [key: string]: unknown; // Allow additional dynamic properties for extensibility
}