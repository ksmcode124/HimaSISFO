import type { ReactNode } from "react";
import { legacy_css_vars } from "@/lib/theme/kabinetLegacyVars";
import { theme_css_vars, type kabinet_theme } from "@/lib/theme/kabinetTheme";

export function ThemeProvider({ children, theme }: { children: ReactNode; theme: kabinet_theme }) {
    return <div style={{ ...theme_css_vars(theme), ...legacy_css_vars(theme) }}>{children}</div>;
}