'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavItem } from '@/features/navigation/'
import Image from 'next/image'
import { Glass } from '../ui/Glass'

const pillStyle = "bg-neutral-100 rounded-2xl px-4 shadow-[0_4px_10px_var(--color-neutral-400)]"

interface NavigationBarProps {
  items: NavItem[]
  className?: string
}

export default function NavigationBar({ items, className = '' }: NavigationBarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const handleToggle = () => setIsOpen(prev => !prev)
  const handleClose = () => setIsOpen(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  return (
    <div className="flex w-full justify-center" aria-label="wrapper">
      <header
        className={`fixed w-full mx-5 md:w-auto md:mx-0 lg:mx-50 rounded-full justify-center items-center top-5 ${isMobile ? 'bg-transparent' : ''} z-999 h-fit overflow-hidden ${className}`}
        role="banner"
      >

        <Glass preset='cloudy' disabled={isMobile}>
          <nav
            className="py-2 px-5 md:px-10 lg:px-20 flex w-full "
            aria-label="Main navigation"
          >
            <div className="flex h-14 justify-center md:justify-between items-center w-full gap-30 md:gap-20 lg:gap-30">
              {/* Logo & Back Button*/}
              <Link href="/" className={`flex items-center px-0 md:px-7 py-1 ${isMobile ? 'bg-transparent' : 'bg-[#AFAFAF]'} rounded-full gap-0 md:gap-3 lg:gap-5`} aria-label="Home">
                <Glass className="p-1 rounded-sm" preset='clear'>
                  <Image
                    width={50}
                    height={50}
                    src={'/assets/shared/logos/logo-himasisfo.webp'}
                    alt={'HIMASISFO'}
                    priority />
                </Glass>
                <div className="flex flex-row gap-1">
                  <h1 className="text-xl font-regular text-white hidden md:block">HIMA</h1>
                  <h1 className="text-xl font-bold text-white hidden md:block">SISFO</h1>
                </div>
                {/* TODO:
                      - ganti Back Button kalo bukan di base url untuk mobile
                      - add opsi logo dan tulisan "HIMASISFO" untuk desktop
                */}
              </Link>
              {/* Desktop Navigation */}
              <div className='hidden lg:grid'>
                <ul className='flex items-center py-10 gap-x-8'>
                  {items.map((item) => {
                    const isActive = item.href === '/' ? pathname === '/' : (pathname === item.href || pathname.startsWith(item.href))
                    
                    return (
                      <li key={item.href}>
                        <Link
                            href={item.href}
                            className={ 
                              `shadow-[0_4px_10px_var(--color-neutral-400)] w-full text-center
                            text-sm font-medium text-white border-2 border-neutral-50/50 rounded-full px-3 py-1 hover:border-white
                            ${!isActive ? "bg-white/30" :
                          "bg-linear-to-r from-[#A6CFE1] to-[#265A8C] "}
                             `}>
                            {item.label}
                          </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
              {/* Mobile Menu Toggle */}
              <Glass
                // type="button"
                onClick={handleToggle}
                className={`w-fit lg:hidden ml-auto rounded-lg p-1 py-2 md:p-2 z-50 text-white ${pillStyle}`}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                <svg
                  className="h-8 md:h-12 w-8 md:w-12"
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
              </Glass>
            </div>
          </nav>
        </Glass>
        {/* Mobile Navigation */}
        {isOpen && (
          <aside className={`z-30 text-white h-screen fixed top-0 right-0 px-8 md:px-35 pt-20 transition-transform duration-500 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
            {/* TODO: add asset image here */}
            <ul className='flex flex-col items-end py-10 gap-y-4'>
              {items.map((item) => {
                return (
                  <Glass key={item.href}>
                    <li className='shadow-[0_4px_10px_var(--color-neutral-400)] w-full text-center rounded-full px-2 py-1'>
                      <Link
                        onClick={handleClose}
                        href={item.href} >
                        {item.label}
                      </Link>
                    </li>
                  </Glass>
                )
              })}
            </ul>
            {/* TODO: add asset image at bottom */}
          </aside>
        )}

      </header>
    </div>
  )
}