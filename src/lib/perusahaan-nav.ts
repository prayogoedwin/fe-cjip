export const PERUSAHAAN_NAV = [
  { href: '/perusahaan', label: 'Dashboard', icon: 'home' as const },
  { href: '/perusahaan/profil', label: 'Profil', icon: 'user' as const },
  { href: '/perusahaan/kemitraan', label: 'Kemitraan', icon: 'grid' as const },
  { href: '/perusahaan/kepeminatan', label: 'Kepeminatan', icon: 'interest' as const },
  {
    href: '/perusahaan/permohonan-insentif',
    label: 'Permohonan Insentif',
    icon: 'doc' as const,
  },
] as const

export const PERUSAHAAN_MIKRO_NAV = [
  { href: '/perusahaan/jadwal-pelatihan', label: 'Jadwal Pelatihan', icon: 'calendar' as const },
  { href: '/perusahaan/lapor-mikro', label: 'Lapor Mikro', icon: 'report' as const },
] as const

export const KEMITRAAN_SUBNAV = [
  { href: '/perusahaan/kemitraan/semua-produk', label: 'Semua Produk' },
  { href: '/perusahaan/kemitraan/produk-saya', label: 'Produk Saya' },
  { href: '/perusahaan/kemitraan/minat-masuk', label: 'Minat Masuk', badge: 0 },
  { href: '/perusahaan/kemitraan/minat-keluar', label: 'Minat Keluar', badge: 0 },
] as const
