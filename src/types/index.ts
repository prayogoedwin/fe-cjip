export interface Berita {
  id: number
  slug: string
  judul: string
  thumbnail: string
  tanggal: string
  kategori: string
  excerpt: string
  featured?: boolean
}

export interface Sektor {
  id: number
  nama: string
  icon: string
  total: number
}

export interface KawasanTenant {
  nama: string
  jenisUsaha: string
  negara: string
}

export interface KawasanIndustri {
  id: number
  slug: string
  nama: string
  lokasi: string
  luas: string
  thumbnail: string
  badge?: string
  kepemilikan?: string
  deskripsi?: string
  profilKawasan?: string
  profilPerusahaan?: string
  jaringanSda?: string
  jaringanEnergi?: string
  jaringanTelekomunikasi?: string
  foto?: string[]
  urlVideo?: string
  urlWebsite?: string
  tenants?: KawasanTenant[]
}

export interface PeluangInvestasi {
  id: number
  slug?: string
  judul: string
  sektor: string
  nilai: string
  status: 'siap' | 'strategis' | 'prospektif' | 'potensial'
  thumbnail: string
  wilayah?: string
  excerpt?: string
}
  
  export interface NavItem {
    label: string
    href: string
    children?: NavItem[]
  }