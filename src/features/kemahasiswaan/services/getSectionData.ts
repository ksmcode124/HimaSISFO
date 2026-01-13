import { 
  KemahasiswaanDataFile, 
  Section, 
  SectionType 
} from "@/features/kemahasiswaan";

/** Untuk mendapatkan data kemahasiswaan dari file json sesuai format */
export function getSectionData<TItems>(
  data: KemahasiswaanDataFile,
  sectionType: SectionType
): TItems {
  return data.sections.find(
    (section): section is Section => section.type === sectionType
  )?.items as TItems;
}