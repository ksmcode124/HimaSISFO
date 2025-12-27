export type NavItem = {
  label: string
  href: string
}

export const navItems: NavItem[] = [
  { label: 'Beranda', href: '/' },
  { label: 'Tentang', href: '/tentang' },
  { label: 'Kemahasiswaan', href: '/kemahasiswaan' },
  { label: 'Kegiatan', href: '/kegiatan' },
]

export const footerNavItems: NavItem[] = [
  { label: 'Spada', href: 'https://spada.upnyk.ac.id' },
  { label: 'Bima', href: 'https://bima.upnyk.ac.id' },
  { label: 'AR-SI-P', href: '/' },
  { label: 'Sadewa', href: 'https://sadewa.upnyk.ac.id' }
]