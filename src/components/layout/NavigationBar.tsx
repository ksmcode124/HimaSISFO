'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { NavItem } from '@/features/navigation/'
import Image from 'next/image'
import { Glass } from '../ui/Glass'
import { motion } from 'framer-motion'

interface NavigationBarProps {
  items: NavItem[]
  className?: string
}

export default function NavigationBar({ items, className = '' }: NavigationBarProps) {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const handleToggle = () => setIsOpen(prev => !prev)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  useEffect(() => {
    setScrolled(false)
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [pathname])
  return (
    <div className={`fixed z-1929 w-full justify-center h-fit transition-all duration-500 ease-in pt-5 ${scrolled ? 'md:pt-0' : 'md:pt-5'}`} aria-label="wrapper">
      <header
        className={`w-full md:w-auto md:mx-0 lg:mx-50 rounded-full justify-center items-center top-5 ${isMobile ? 'bg-transparent' : ''} z-99999 h-fit overflow-hidden ${className}`}
        role="banner"
      >

        <Glass preset='hard' disabled={isMobile}>
          <nav
            className="py-2 px-5 md:px-10 lg:px-20 flex w-full "
            aria-label="Main navigation"
          >
            <div className="flex h-14 justify-center md:justify-between items-center w-full gap-30 md:gap-20 lg:gap-30">
              {/* Logo */}
              <Link href="/" className={`flex items-center px-0 md:px-7 py-1 ${isMobile ? '' : 'bg-[#525252]'} rounded-full gap-0 md:gap-3 lg:gap-5`} aria-label="Home">
                <Glass className="p-1 rounded-sm size-10 md:size-12 lg:size-14 shadow-4xl hover:bg-[#AFAFAF]/90" preset='hard'>
                  <Image
                    src={'/assets/shared/logos/logo-himasisfo.webp'}
                    alt={'HIMASISFO'}
                    fill
                    priority />
                </Glass>
                <div className="flex flex-row gap-1">
                  <h1 className="text-xl font-regular text-white hidden md:block">HIMA</h1>
                  <h1 className="text-xl font-bold text-white hidden md:block">SISFO</h1>
                </div>
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
                            ${!isActive ? "bg-neutral-100" :
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
              <Glass preset='hard'
                // type="button"

                className={`hover:bg-[#AFAFAF]/90 w-fit lg:hidden ml-auto rounded-lg p-3 md:p-5 z-50 text-white`}
                aria-label="Toggle menu"
                aria-expanded={isOpen}
                aria-controls="mobile-menu"
              >
                <div onClick={handleToggle}>
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
                </div>

              </Glass>
            </div>
          </nav>
        </Glass>
        {/* Mobile Navigation */}
        {isOpen && (
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: isOpen ? "0%" : "100%" }}
            transition={{ type: "tween", duration: 0.5 }}
            className="z-30 text-white h-screen fixed top-0 right-0 pt-20 bg-neutral-100/90 rounded-l-3xl"
          >
            <ul className='flex flex-col items-end justify-between h-full overflow-hidden'>
              <div className="px-6 py-10 gap-y-5 flex flex-col">
                <div className="bg-[url('/assets/shared/decoratives/Pitaawan.webp')] bg-contain bg-center bg-no-repeat w-full h-15" />

                {items.map((item) => {
                  const isActive = item.href === '/' ? pathname === '/' : (pathname === item.href || pathname.startsWith(item.href))
                  return (
                    <li key={item.href} className="px-3 w-[200px] flex justify-center">
                      <Link
                        href={item.href}
                        onClick={() => handleToggle()}
                        className={
                          `shadow-[0_4px_10px_var(--color-neutral-400)] text-center w-full
                              text-sm font-medium text-white border-2 border-neutral-50/50 rounded-full px-3 py-1 hover:border-white
                              ${!isActive ? "bg-white/30" :
                            "bg-linear-to-r from-[#A6CFE1] to-[#265A8C] "}
                               `}>
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
                <div className="w-full h-1 rounded-[4px] bg-white" />
              </div>
              <div className="bg-[url('/assets/shared/decoratives/AwanBawah.webp')] bg-cover bg-center w-full h-35 bg-no-repeat rounded-bl-3xl" />
            </ul>

          </motion.aside>
        )}

      </header>
    </div>
  )
}