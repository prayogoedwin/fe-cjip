/**
 * API V3 route paths — sinkron dengan cjip2026/routes/api.php
 * Base URL: NEXT_PUBLIC_API_URL (contoh: http://127.0.0.1:8000/api)
 */

export const API_V3 = {
  /** Beranda (throttle: beranda-v3) */
  beranda: {
    index: '/v3/beranda',
    slider: '/v3/beranda/slider',
    pembuka: '/v3/beranda/pembuka',
    grafik: '/v3/beranda/grafik',
    kawasan: '/v3/beranda/kawasan',
    berita: '/v3/beranda/berita',
    partners: '/v3/beranda/partners',
    umk: '/v3/beranda/umk',
    pendidikan: '/v3/beranda/pendidikan',
  },

  /** Auth */
  auth: {
    login: '/v3/auth/login',
    me: '/v3/auth/me',
    logout: '/v3/auth/logout',
  },

  /** Berita halaman */
  berita: {
    index: '/v3/berita',
    tags: '/v3/berita/tags',
    show: (slug: string) => `/v3/berita/${slug}`,
  },

  /** Kawasan industri */
  kawasan: {
    index: '/v3/kawasan-industri',
    show: (slug: string) => `/v3/kawasan-industri/${slug}`,
  },

  /** Proyek / peluang investasi */
  proyek: {
    index: '/v3/proyek',
    sektor: '/v3/proyek/sektor',
    markets: '/v3/proyek/markets',
    show: (slug: string) => `/v3/proyek/${slug}`,
  },

  /** Alias sektor (sama handler dengan proyek.sektor) */
  sektor: {
    index: '/v3/sektor',
  },

  /** Lahan siap pakai (BUHANSIP) */
  lahan: {
    index: '/v3/lahan',
    show: (slug: string) => `/v3/lahan/${slug}`,
    minat: (slug: string) => `/v3/lahan/${slug}/minat`,
  },

  /** Konten statis */
  profilJateng: '/v3/profil-jateng',
  profilKabkota: (slug: string) => `/v3/detail-kabkota/${slug}`,
  faq: '/v3/faq',
  dokumen: {
    index: '/v3/dokumen',
    show: (slug: string) => `/v3/dokumen/${slug}`,
  },
  footer: '/v3/footer',

  /** Produk / kemitraan */
  produk: {
    index: '/v3/produk',
    show: (slug: string) => `/v3/produk/${slug}`,
  },

  /** Wilayah */
  wilayah: {
    kabkota: '/v3/wilayah/kabkota',
  },

  /** SIDIKERJO */
  infografisSidikerjo: '/v3/infografis-sidikerjo',

  /** Peta investasi */
  petaInvestasi: '/v3/peta-investasi',

  /** Form */
  kepeminatan: '/v3/kepeminatan',
  sinida: {
    permohonan: '/v3/sinida/permohonan',
  },
} as const
