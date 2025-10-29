import Link from "next/link";
import React from "react";

interface NavProps {
  href: string;
  children?: React.ReactNode;
}

export function NavLink({ href, children }: NavProps) {
  return (
    <>
      <Link
        href={href}
        className="relative rounded-xl lg:rounded-2xl px-2 py-1.5 lg:px-3 lg:py-1.5 text-center text-sm lg:text-base bg-[#3A484F]/50
          shadow-[0_2px_3px_rgba(0,0,0,0.25)] lg:shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-all active:scale-[0.97]
          hover:shadow-[inset_5px_5px_4px_rgba(0,0,0,0.4),0_4px_4px_rgba(0,0,0,0.25)] ßtouch-manipulation"
      >
        <span className="absolute inset-0 rounded-xl lg:rounded-2xl ring-1 ring-white/30 [mask-[linear-gradient(to-bottom_right,white,transparent)]] pointer-events-none"></span>

        {children}
      </Link>
    </>
  );
}
