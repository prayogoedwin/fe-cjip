export interface Berita {
    id: number
    slug: string
    judul: string
    thumbnail: string
    tanggal: string
    kategori: string
    excerpt: string
  }
  
  export interface Sektor {
    id: number
    nama: string
    icon: string
    total: number
  }
  
export interface KawasanIndustri {
  id: number
  nama: string
  lokasi: string
  luas: string
  thumbnail: string
  badge?: string
  kepemilikan?: string
  deskripsi?: string
}

export interface PeluangInvestasi {
  id: number
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