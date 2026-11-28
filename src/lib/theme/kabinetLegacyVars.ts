import type { CSSProperties } from "react";
import type { kabinet_theme } from "./kabinetTheme";

const w = '#FFFFFF';
const overlay = (a: number) => `linear-gradient(rgba(255, 255, 255, ${a}), rgba(255, 255, 255, ${a}))`;

export function legacy_css_vars(t: kabinet_theme): CSSProperties {
    const p = t.primary;
    const s = t.secondary;

    return {
        "--kabinet-background": t.background,
        "--kabinet-color-text": t.text,
        "--kabinet-color-primary": p,
        "--kabinet-color-secondary": s,

        "--kabinet-gradient-hero-background": `${overlay(0.5)}, linear-gradient(210deg, ${p} 0%, ${s} 50%, ${w} 100%)`,
        "--kabinet-gradient-layer-background": `linear-gradient(180deg, ${p} 0%, ${s} 100%)`,
        "--kabinet-gradient-name-text": `linear-gradient(135deg, ${p} 0%, ${s} 100%)`,
        "--kabinet-breadcrumb-text": `linear-gradient(87deg, ${s} 0%, ${p} 100%)`,
        "--kabinet-breadcrumb-underline": `linear-gradient(87deg, ${s} 0%, ${w} 50%, ${p} 100%)`,

        "--kabinet-gradient-pita": `${overlay(0.15)}, linear-gradient(0deg, ${s} 30%, ${p} 65%)`,
        "--kabinet-color-ornament": s,
        "--kabinet-gradient-ornament-1": `linear-gradient(90deg, ${p} 30%, ${s} 50%, ${w} 110%)`,
        "--kabinet-gradient-ornament-2": `linear-gradient(90deg, ${p} 25%, ${s} 50%, ${w} 75%)`,
        "--kabinet-gradient-ornament-3": `linear-gradient(90deg, ${p} 25%, ${s} 50%, ${w} 75%)`,
        "--kabinet-gradient-ornament-4": `linear-gradient(90deg, ${w} 25%, ${s} 50%, ${p} 65%)`,
        "--kabinet-gradient-ornament-5": `${overlay(0.2)}, linear-gradient(90deg, ${p} 0%, ${s} 50%, ${w} 65%)`,
        "--kabinet-gradient-ornament-9": `linear-gradient(90deg, ${w} 0%, ${s} 45%, ${p} 65%)`,

        "--kabinet-gradient-filosofi-background": `linear-gradient(90deg, ${p} 0%, ${w} 50%, ${s} 100%)`,
        "--kabinet-gradient-tentang-text": `linear-gradient(135deg, ${p} 0%, ${s} 35%)`,
        "--kabinet-gradient-tentang-border": `linear-gradient(90deg, ${p} 15%, ${s} 55%, ${w} 110%)`,
        "--kabinet-gradient-visi-misi": `${overlay(0.25)}, linear-gradient(90deg, ${s} 0%, ${w} 50%, ${s} 100%)`,
        "--kabinet-color-visi-misi-border": p,
        "--kabinet-color-chevron-icon": s,

        "--kabinet-gradient-inti-background": `linear-gradient(180deg, ${p} 0%, ${s} 100%)`,
        "--kabinet-gradient-carousel-button": `linear-gradient(180deg, ${p} 0%, ${s} 100%)`,
        "--kabinet-color-pagination": s,
        "--kabinet-gradient-inti-border-bottom": `linear-gradient(90deg, ${p} 0%, ${s} 50%, ${w} 100%)`,

        "--kabinet-gradient-dept-card-button": `linear-gradient(180deg, ${p} 0%, ${s} 100%)`,
        "--kabinet-color-dept-card-border": p,
    } as CSSProperties;
}