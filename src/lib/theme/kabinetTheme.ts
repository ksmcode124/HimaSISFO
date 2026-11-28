import type { CSSProperties } from "react";

export interface kabinet_theme {
  primary: string; // untuk judul, aksen utama
  secondary: string; // untuk teks isi, kontrol
  accent: string; // untuk border, garis
  surface: string; // unutk latar kartu
  gradient: string; // untuk ribbon, border gradient
  text: string;
  text_gradient: string;
  background: string;
  navbar: {
    background: string;
    link_text: string;
    brand_accent: string;
    active_link: string,
    active_text: string;
    button_cta: string;
    hover_button_cta: string;
    button_cta_text: string;
  };
};

// ini buat tema dari palet 4 warna
function theme_from_palette(p: {
  primary: string; secondary: string; text: string; background: string;
}): kabinet_theme {
  const solid = `linear-gradient(to right, ${p.primary}, ${p.primary})`;
  return {
    primary: p.primary,
    secondary: p.secondary,
    accent: p.primary,
    surface: p.background,
    gradient: `linear-gradient(to bottom, ${p.primary}, ${p.secondary})`,
    text: p.text,
    text_gradient: `linear-gradient(to bottom, ${p.text}, ${p.secondary})`,
    background: p.background,
    navbar: {
      background: p.background,
      link_text: p.text,
      brand_accent: solid,
      active_link: p.primary,
      active_text: "var(--color-white-light)",
      button_cta: p.primary,
      hover_button_cta: p.secondary,
      button_cta_text: "var(--color-white-light)",
    },
  };
}

const advaya_orange =
  "linear-gradient(to bottom, #F07E48 0%, #945739 100%)";

export const default_theme: kabinet_theme = {
  primary: "var(--color-primary-blue-normal)",
  secondary: "var(--color-secondary-blue-normal)",
  accent: "var(--color-blue-normal)",
  surface: "var(--color-white-light)",
  text: "var(--color-black-normal)",
  // default_theme
  text_gradient: "linear-gradient(to bottom, var(--color-primary-blue-dark), var(--color-primary-blue-normal))",
  background: "var(--color-white-light)",
  gradient:
    "linear-gradient(to bottom, var(--color-primary-blue-dark-hover), var(--color-secondary-blue-dark-hover))",
  navbar: {
    background: "var(--color-secondary-blue-light-active)",
    link_text: "var(--color-primary-blue-dark)",
    brand_accent: "linear-gradient(to right, var(--color-primary-blue-normal), var(--color-primary-blue-normal))",
    active_link: "var(--color-secondary-blue-normal)",
    active_text: "var(--color-white-light)",
    button_cta: "var(--color-secondary-blue-normal)",
    hover_button_cta: "var(--color-secondary-blue-normal-hover)",
    button_cta_text: "var(--color-primary-blue-dark)",
  },
};

// key bisa id_kabinet (paling stabil)
export const kabinet_theme_by_id: Record<number, kabinet_theme> = {
  1: {
    // kabinet advaya cita
    primary: "var(--color-primary-brown-normal)",
    secondary: "var(--color-secondary-violet-normal)",
    accent: "var(--color-primary-brown-dark)",
    surface: "linear-gradient(to bottom, #FAE0E9 0%, #F6B17F 100%)",
    gradient: advaya_orange,
    text: "var(--color-secondary-violet-normal)",
    text_gradient: "linear-gradient(to bottom, #4F384D 0%, #994D93 100%)",
    background: "var(--color-primary-brown-light)",
    navbar: {
      background: "var(--color-primary-brown-light)",
      link_text: "var(--color-primary-brown-normal-active)",
      brand_accent: advaya_orange,
      active_link: "var(--color-primary-brown-normal-hover)",
      active_text: "var(--color-primary-brown-light)",
      button_cta: "var(--color-primary-brown-normal-active)",
      hover_button_cta: "var(--color-primary-brown-dark)",
      button_cta_text: "var(--color-white-light)",
    },
  },
  // ini nanti buat definisiin kabinet lainnya, usahakan kabinet sebelum advaya cita jadi no paling awal
};


export function get_kabinet_theme(id?: number | null): kabinet_theme {
  return (id != null && kabinet_theme_by_id[id]) || default_theme;
}

// ini buat wrapper halaman kabinet (kartu, ribbon, panah,)
export function theme_css_vars(t: kabinet_theme): CSSProperties {
  return {
    "--kabinet-primary": t.primary,
    "--kabinet-secondary": t.secondary,
    "--kabinet-accent": t.accent,
    "--kabinet-surface": t.surface,
    "--gradient": t.gradient,
    "--kabinet-gradient-text": t.text_gradient,
    "--kabinet-text": t.text,
    "--kabinet-bg": t.background,
  } as CSSProperties;
}

// ini buat navbar
export function navbar_css_vars(t: kabinet_theme): CSSProperties {
  const n = t.navbar;
  return {
    "--nav-bg": n.background,
    "--nav-link": n.link_text,
    "--nav-brand": n.brand_accent,
    "--nav-active": n.active_link,
    "--nav-active-text": n.active_text,
    "--nav-cta": n.button_cta,
    "--nav-cta-hover": n.hover_button_cta,
    "--nav-cta-text": n.button_cta_text,
  } as CSSProperties;
}