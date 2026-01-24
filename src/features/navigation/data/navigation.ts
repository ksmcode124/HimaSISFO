export type NavItem = {
  label: string
  href: string
}

export const navItems: NavItem[] = [
  { label: 'Beranda', href: '/' },
  { label: 'Tentang', href: '/kabinet' },
  { label: 'Kemahasiswaan', href: '/kemahasiswaan' },
  { label: 'Kegiatan', href: '/kegiatan' },
]

export const footerNavItems: NavItem[] = [
  { label: 'Spada', href: 'https://spada.upnyk.ac.id' },
  { label: 'Bima', href: 'https://bima.upnyk.ac.id' },
  { label: 'AR-SI-P', href: '/' },
  { label: 'Sadewa', href: 'https://sadewa.upnyk.ac.id' },
  { label: 'Instagram', href: 'https://www.instagram.com/himasisfoupnvyk' },
  { label: 'YouTube', href: 'https://youtube.com/@himasisfoupnyk' },
  { label: 'Spotify', href: 'https://open.spotify.com/show/4ne6bsylYJdVmMrfG3mLCG?si=jXJK3WAnQT2l-FyOpVpUnQ' },
  { label: 'Email', href: 'mailto:himasisfo@example.com' },
]