import type { ApiLocale } from '@/lib/api/client'
import type { NavbarLink } from '@/lib/nav-items'
import { getCjibfUrl } from '@/lib/site-urls'

const UI = {
  id: {
    nav: {
      beranda: 'Beranda',
      profilJateng: 'Profil Jateng',
      proyekInvestasi: 'Proyek Investasi',
      kesiapanProyek: 'Kesiapan Proyek',
      sektor: 'Sektor',
      kawasanIndustri: 'Kawasan Industri',
      informasi: 'Informasi',
      berita: 'Berita',
      faq: 'FAQ',
      publikasi: 'Publikasi & Dokumen',
      peta: 'Peta',
      lahan: 'Lahan',
    },
    productAll: {
      metaTitle: 'Produk Kemitraan',
      metaDescription: 'Temukan produk UMKM dan kemitraan bisnis dari Jawa Tengah',
      label: 'Kemitraan',
      title: 'Produk Kemitraan',
      description: 'Katalog produk UMKM dan peluang kemitraan bisnis dari seluruh Jawa Tengah',
      breadcrumbHome: 'Beranda',
      searchPlaceholder: 'Cari produk...',
      showing: (shown: number, total: number) => `Menampilkan ${shown} dari ${total} hasil`,
      notFound: 'Produk tidak ditemukan',
      empty: 'Belum ada produk kemitraan',
      notFoundHint: 'Coba kata kunci lain atau kosongkan pencarian.',
      emptyHint: 'Data produk akan muncul setelah UMKM mendaftarkan produk di portal perusahaan.',
      viewDetail: 'Lihat Detail →',
      login: 'Login',
    },
  },
  en: {
    nav: {
      beranda: 'Home',
      profilJateng: 'Central Java Profile',
      proyekInvestasi: 'Investment Projects',
      kesiapanProyek: 'Project Readiness',
      sektor: 'Sectors',
      kawasanIndustri: 'Industrial Areas',
      informasi: 'Information',
      berita: 'News',
      faq: 'FAQ',
      publikasi: 'Publications & Documents',
      peta: 'Map',
      lahan: 'Land',
    },
    productAll: {
      metaTitle: 'Partnership Products',
      metaDescription: 'Discover MSME products and business partnership opportunities in Central Java',
      label: 'Partnership',
      title: 'Partnership Products',
      description: 'Catalog of MSME products and business partnership opportunities across Central Java',
      breadcrumbHome: 'Home',
      searchPlaceholder: 'Search products...',
      showing: (shown: number, total: number) => `Showing ${shown} of ${total} results`,
      notFound: 'No products found',
      empty: 'No partnership products yet',
      notFoundHint: 'Try another keyword or clear the search.',
      emptyHint: 'Products will appear once MSMEs register them in the company portal.',
      viewDetail: 'View Details →',
      login: 'Login',
    },
  },
} as const

export function getUiStrings(lang: ApiLocale) {
  return UI[lang]
}

export function getNavItems(lang: ApiLocale): NavbarLink[] {
  const t = UI[lang].nav
  return [
    { label: t.beranda, href: '/' },
    { label: t.profilJateng, href: '/profil-jateng' },
    {
      label: t.proyekInvestasi,
      href: '#',
      children: [
        { label: t.kesiapanProyek, href: '/peluang-investasi' },
        { label: t.sektor, href: '/sektor' },
      ],
    },
    { label: t.kawasanIndustri, href: '/kawasan-industri' },
    {
      label: t.informasi,
      href: '#',
      children: [
        { label: t.berita, href: '/berita' },
        { label: t.faq, href: '/panduan-investasi' },
        { label: t.publikasi, href: '/dokumen' },
      ],
    },
    { label: t.peta, href: '/peta-investasi' },
    { label: t.lahan, href: '/lahan-siap-pakai' },
    { label: 'CJIBF', href: getCjibfUrl(), highlight: true, external: true },
  ]
}
