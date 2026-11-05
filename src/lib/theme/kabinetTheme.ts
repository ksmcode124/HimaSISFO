import type { CSSProperties } from "react";

export interface kabinet_theme {
  primary: string; // untuk judul, aksen utama
  secondary: string; // untuk teks isi, kontrol
  accent: string; // untuk border, garis
  surface: string; // unutk latar kartu
  gradient: string; // untuk ribbon, border gradient
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

export const default_theme: kabinet_theme = {
  primary: "var(--color-primary-blue-normal)",
  secondary: "var(--color-secondary-blue-normal)",
  accent: "var(--color-blue-normal)",
  surface: "var(--color-white-light)",
  gradient:
    "linear-gradient(to bottom, var(--color-primary-blue-dark-hover), var(--color-secondary-blue-dark-hover))",
  navbar: {
    background: "var(--color-secondary-blue-light-active)",
    link_text: "var(--color-primary-blue-dark)",
    brand_accent: "var(--color-primary-blue-normal)",
    active_link: "var(--color-secondary-blue-normal)",
    active_text: "var(--color-white-light)",
    button_cta: "var(--color-secondary-blue-normal)",
    hover_button_cta: "var(--color-secondary-blue-normal-hover)",
    button_cta_text: "var(--color-primary-blue-dark)",
  },
};

// key bisa id_kabinet (paling stabil)
export const default_theme_by_id: Record<number, kabinet_theme> = {
  1: {
    // kabinet advaya cita
    primary: "var(--color-primary-brown-dark)",
    secondary: "var(--color-secondary-violet-normal)",
    accent: "var(--color-primary-brown-normal-hover)",
    surface: "var(--color-primary-brown-light)",
    gradient:
      "linear-gradient(to bottom, var(--color-primary-brown-normal), var(--color-primary-brown-normal-active))",
    navbar: {
      background: "var(--color-primary-brown-light)",
      link_text: "var(--color-primary-brown-normal-active)", // perkiraan, cek di Figma
      brand_accent: "var(--color-primary-brown-normal-active)",
      active_link: "var(--color-primary-brown-normal-hover)",
      active_text: "var(--color-white-light)",
      button_cta: "var(--color-primary-brown-normal-active)",
      hover_button_cta: "var(--color-primary-brown-dark)",
      button_cta_text: "var(--color-white-light)",
    },
  },
  // ini nanti buat definisiin kabinet lainnya, usahakan kabinet sebelum advaya cita jadi no paling awal
};

export function get_kabinet_theme(id_kabinet: number): kabinet_theme {
  return default_theme_by_id[id_kabinet] ?? default_theme;
}

// ini buat wrapper halaman kabinet (kartu, ribbon, panah,)
export function theme_css_vars(t: kabinet_theme): CSSProperties {
  return {
    "--kabinet-primary": t.primary,
    "--kabinet-secondary": t.secondary,
    "--kabinet-accent": t.accent,
    "--kabinet-surface": t.surface,
    "--gradient": t.gradient, // dipakai .bg-gradient-kabinet
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