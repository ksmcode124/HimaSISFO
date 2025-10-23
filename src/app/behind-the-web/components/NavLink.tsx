import Link from "next/link"
import React from "react";

interface NavProps {
  href: string,
  label?: string,
  className?: string,
  children?: React.ReactNode
}

export function NavLink({href, label, className, children} : NavProps) {
  return (
    <>
      <Link href={href} className="rounded-2xl px-3 py-1 bg-[#3A484F]/50 shadow-[0_4px_4px_rgba(0,0,0,0.25)] transition-shadow hover:shadow-[inset_5px_5px_4px_rgba(0,0,0,0.4),0_4px_4px_rgba(0,0,0,0.25)]">
        {children ?? label}
      </Link>
    </>
  );
}