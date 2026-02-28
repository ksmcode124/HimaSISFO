import { 
  KemahasiswaanDataFile, 
  Section, 
  SectionType 
} from "@/features/kemahasiswaan";

/**
 * getSectionData
 *
 * Purpose:
 * Retrieves the `items` array from a specific section type
 * inside a KemahasiswaanDataFile JSON structure.
 *
 * Architectural Context:
 * - Acts as a thin data accessor over structured JSON content.
 * - Assumes that `data.sections` follows the agreed schema.
 *
 * Generic Contract:
 * - TItems must match the actual shape of `section.items`.
 * - There is NO compile-time guarantee that TItems is correct.
 *   Caller is responsible for providing the correct type.
 *
 * Runtime Behavior:
 * - Returns `undefined` if the section is not found.
 * - Uses type assertion (`as TItems`) which bypasses strict safety.
 *
 * Maintenance Warning:
 * - If the JSON schema evolves, this function may silently break
 *   without TypeScript detecting mismatches.
 * - Prefer validating schemaVersion before using this accessor.
 * - Avoid spreading usage of arbitrary TItems across the codebase.
 *
 * Recommendation for Future Contributors:
 * - Keep SectionType and Section definitions synchronized.
 * - If section structure becomes heterogeneous,
 *   refactor to discriminated union mapping instead of generic casting.
 */
export function getSectionData<TItems>(
  data: KemahasiswaanDataFile,
  sectionType: SectionType
): TItems {
  return data.sections.find(
    (section): section is Section => section.type === sectionType
  )?.items as TItems;
}