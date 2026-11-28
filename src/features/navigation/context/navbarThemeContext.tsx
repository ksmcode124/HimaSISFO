// ini buat menghubungkan theme kabinet dengan navbarnya 
'use client'

import React, { createContext, useContext, useState, useCallback } from 'react';
import { kabinet_theme, default_theme } from "@/lib/theme/kabinetTheme";

// ini untuk mendefinisikan data yang tersedia di context
interface NavbarThemeValue {
    theme: kabinet_theme
    set_theme: (theme: kabinet_theme) => void
    reset_theme: () => void
}

// ini untuk membuat context dengan nilai awal
const NavbarThemeContext = createContext<NavbarThemeValue>({
    theme: default_theme,
    set_theme: () => { },
    reset_theme: () => { },
});

// ini buat menyediakan data tema kepada semua komponen di dalamnya
export function NavbarThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, set_theme_state] = useState<kabinet_theme>(default_theme)

    const set_theme = useCallback((t: kabinet_theme) => set_theme_state(t), []);

    const reset_theme = useCallback(() => set_theme_state(default_theme), []);

    return (
        <NavbarThemeContext.Provider value={{ theme, set_theme, reset_theme }}>
            {children}
        </NavbarThemeContext.Provider>
    )
}

export function useNavbarTheme() {
    return useContext(NavbarThemeContext);
}