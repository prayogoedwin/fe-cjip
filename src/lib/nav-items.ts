import type { NavItem } from '@/types'

export interface NavbarLink extends NavItem {
  highlight?: boolean
}

export const NAV_ITEMS: NavbarLink[] = [
  { label: 'Beranda', href: '/' },
  { label: 'Profil Jateng', href: '/profil-jateng' },
  {
    label: 'Proyek Investasi',
    href: '#',
    children: [
      { label: 'Kesiapan Proyek', href: '/peluang-investasi' },
      { label: 'Sektor', href: '/sektor' },
    ],
  },
  { label: 'Kawasan Industri', href: '/kawasan-industri' },
  {
    label: 'Informasi',
    href: '#',
    children: [
      { label: 'Berita', href: '/berita' },
      { label: 'FAQ', href: '/panduan-investasi' },
      { label: 'Publikasi & Dokumen', href: '/dokumen' },
    ],
  },
  { label: 'Peta', href: '/peta-investasi' },
  { label: 'Lahan', href: '/lahan-siap-pakai' },
  { label: 'CJIBF', href: '#', highlight: true },
]
