export interface KabinetTheme {
  primary: string;
  secondary: string;
  accent: string;
};

const DEFAULT_THEME: KabinetTheme = {
  primary: "#0EA5E9",
  secondary: "#22C55E",
  accent: "#F59E0B",
};

// key bisa id_kabinet (paling stabil)
export const KABINET_THEME_BY_ID: Record<number, KabinetTheme> = {
  1: { primary: "#7C3AED", secondary: "#22C55E", accent: "#F97316" },
  2: { primary: "#2563EB", secondary: "#06B6D4", accent: "#A3E635" },
  3: { primary: "#111827", secondary: "#E11D48", accent: "#FBBF24" },
};

export function getKabinetTheme(id_kabinet: number): KabinetTheme {
  return KABINET_THEME_BY_ID[id_kabinet] ?? DEFAULT_THEME;
}
