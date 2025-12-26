'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavItem } from '@/features/navigation/'
import Image from 'next/image'

const pillStyle = "bg-neutral-100 rounded-2xl p-1 shadow-[0_4px_10px_var(--color-neutral-400)]"

interface NavigationBarProps {
  items: NavItem[]
  className?: string
}

export default function NavigationBar({ items, className = '' }: NavigationBarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => setIsOpen(prev => !prev)
  const handleClose = () => setIsOpen(false)

  return (
    <header
      className={`sticky top-5 z-50 max-w-[90vw] py-3 px-20 lg:bg-[#101D2F]/50 rounded-full h-fit mx-auto my-5 ${className}`}
      role="banner"
    >
      <nav
        className=""
        aria-label="Main navigation"
      >
        <div className="flex h-14 justify-between items-center gap-6">
          {/* Logo & Back Button*/}
          <Link href="/" className={`flex items-center ${pillStyle}`} aria-label="Home">
            <Image
              width={42}
              height={42}
              src={'/assets/shared/logos/logo-himasisfo.webp'} 
              alt={'HIMASISFO'}
              priority />

              {/* TODO: 
                    - ganti Back Button kalo bukan di base url untuk mobile 
                    - add opsi logo dan tulisan "HIMASISFO" untuk desktop
              */}
          </Link>

          {/* Desktop Navigation */}
          <div className='hidden lg:grid'>
            <ul className='flex items-center py-10 gap-x-8'>
              {items.map((item) => {
                return (
                  <li key={item.href}>
                    <Link 
                      href={item.href} 
                      className={
                        `shadow-[0_4px_10px_var(--color-neutral-400)] w-full text-center
                        text-sm font-medium text-white border border-neutral-50/50 rounded-full px-3 py-1
                        ${pathname !== item.href ? "bg-white/30" :
                          "bg-linear-to-r from-silver-chalice/50 to-cloud-burst/50"} `}>
                        {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            onClick={handleToggle}
            className={`lg:hidden ml-auto rounded-lg p-2 z-50 text-white ${pillStyle}`}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="h-12 w-12s"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>
      {/* Mobile Navigation */}
        { isOpen && (
          <aside className={`z-30 text-white rounded-l-[5em] h-screen w-[75vw] fixed top-0 right-0 bg-neutral-200 backdrop-blur-md px-10 pt-20 transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            {/* TODO: add asset image here */}
            <ul className='flex flex-col items-center border-b py-10 gap-y-8'>
              {items.map((item) => {
                return (
                  <li key={item.href} className='shadow-[0_4px_10px_var(--color-neutral-400)] w-full text-center bg-neutral-200/50 text-sm border border-neutral-50/50 rounded-full p-2'>
                    <Link
                      onClick={handleClose}
                      href={item.href} >
                      {item.label}
                    </Link>               
                  </li>
                )
              })}
            </ul>
            {/* TODO: add asset image at bottom */}
          </aside>
        )}
    </header>
  )
}