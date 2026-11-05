'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { navItems, useNavbarTheme } from "@/features/navigation";
import { navbar_css_vars } from "@/lib/theme/kabinetTheme";
import { cn } from "@/lib/utils/cn";

const btn_offset = 16;
const btn_end = btn_offset + 44;

const panel_close = `inset(${btn_offset}px calc(100% - ${btn_end}px) calc(100% - ${btn_end}px) ${btn_offset}px round 8px)`;
const panel_open = "inset(0px 0px 0px 0px round 0px)"

export default function NavigationBar() {
    const pathname = usePathname();
    const { theme } = useNavbarTheme();
    const [open, set_open] = useState(false);

    const is_active = (href: string) =>
        href === "/" ? pathname === "/" : pathname.startsWith(href);

    // ini kunci scroll halaman dan buat bisa nutup dengan esc saat panel nya kebuka
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
        const on_key = (e: KeyboardEvent) => e.key === "Escape" && set_open(false);
        window.addEventListener("keydown", on_key);
        return () => {
            document.body.style.overflow = prev;
            window.removeEventListener("keydown", on_key);
        };
    }, [open]);

    return (
        <header
            style={navbar_css_vars(theme)} className="fixed inset-x-0 top-4 z-50 px-4 md:top-[41px]">
            <div
                id="mobile-menu"
                aria-hidden={!open}
                inert={!open}
                style={{ clipPath: open ? panel_open : panel_close }}
                className={cn(
                    "fixed inset-0 flex items-center justify-center bg-(--nav-bg) md:hidden",
                    "transition-[clip-path] duration-500 ease-out",
                    !open && "pointer-events-none"
                )}
            >
                <div className={cn(
                    "flex flex-col items-center gap-8 transition-opacity duration-300",
                    open ? "opacity-100 delay-200" : "opacity-0",
                )}
                >
                    {navItems.map((item) => (
                        <Link key={item.href}
                            href={item.href}
                            onClick={() => set_open(false)}
                            className={cn(
                                "relative rounded-3xl px-9 py-[18px] transition-colors",
                                is_active(item.href)
                                    ? "bg-(--nav-active) text-(--nav-active-text)"
                                    : cn("text-(--nav-link)",
                                        "after:pointer-events-none after:absolute after:inset-x-2 after:bottom-3 after:h-px after:bg-current after:opacity-0 after:transition-opacity hover:after:opacity-60",
                                    ),
                            )}
                        >
                            <h2 className={cn(!is_active(item.href) && "font-medium")}>
                                {item.label}
                            </h2>
                        </Link>
                    ))}
                </div>
            </div>

            {/* ini mobile */}
            <button type="button"
                aria-label={open ? "Tutup menu" : "Buka menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
                onClick={() => set_open((v) => !v)}
                className="relative z-10 flex size-11 items-center justify-center rounded-lg text-(--nav-link) md:hidden"
            >
                {open ? <X className="size-6" /> : <Menu className="size-6" />}
            </button>
        </header >
    )
}

