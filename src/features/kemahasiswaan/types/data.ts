import { ContentBlock } from "./content"
import { Section } from "./section"

// types/data.ts
export type ItemDataJSON = {
  id: string
  title: string
  content: ContentBlock[]
  image?: string
}

export type KemahasiswaanDataFile = {
  schemaVersion: number
  slug: string
  seo: {
    title: string
    description: string
  };
  hero: {
    title: string
    subtitle: string
  };
  sections: Section[];
  [key: string]: unknown;
}
