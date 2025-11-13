'use client';
import { useState } from 'react';
import { NavLink } from './NavLink';

export default function HamburgerMenu({ className }: { className: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`${className} relative`}>
      <button
        className="relative z-20 flex flex-col space-y-1.5 p-2"
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
      >
        <span
          className={`block h-0.5 w-6 bg-black transition-transform ${
            open ? 'rotate-45' : ''
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-black transition-opacity ${
            open ? 'opacity-0' : 'opacity-100'
          }`}
        />
        <span
          className={`block h-0.5 w-6 bg-black transition-transform ${
            open ? '-rotate-45' : ''
          }`}
        />
      </button>

      <div
        className={`absolute top-20 right-0 flex flex-col gap-4 space-y-2 rounded-lg transition-all duration-300 ${
          open
            ? 'pointer-events-auto translate-y-0 opacity-100'
            : 'pointer-events-none -translate-y-4 opacity-0'
        }`}
      >
        <NavLink href="/behind-the-web">TENTANG</NavLink>
        <NavLink href="/behind-the-web">SEJARAH</NavLink>
        <NavLink href="/behind-the-web">VISI & MISI</NavLink>
        <NavLink href="/behind-the-web">DEPARTEMEN</NavLink>
      </div>
    </div>
  );
}
