export type LahanSkema = 'DIJUAL' | 'DISEWA' | 'SHARING PROFIT'
export type LahanStatus = 'Tersedia' | 'Tersewa' | 'Terjual'

export interface LahanItem {
  id: number
  slug: string
  nama: string
  wilayah: string
  kelurahan: string
  kecamatan: string
  luas: string
  skema: LahanSkema[]
  status: LahanStatus
  thumbnail: string
  foto: string[]
  deskripsi: string
  legalitas: string
  kondisiEksisting: string
  peruntukan: string
  akses: string
  air: string
  listrik: string
  lat: number
  lng: number
  namaPic?: string
  noTelpPic?: string
}

export const LAHAN_WILAYAH_OPTIONS = [
  'Seluruh Wilayah',
  'Kabupaten Banjarnegara',
  'Kabupaten Banyumas',
  'Kabupaten Batang',
  'Kabupaten Blora',
  'Kabupaten Boyolali',
  'Kabupaten Brebes',
  'Kabupaten Cilacap',
  'Kabupaten Demak',
  'Kabupaten Grobogan',
  'Kabupaten Jepara',
  'Kabupaten Kendal',
  'Kabupaten Kudus',
  'Kabupaten Magelang',
  'Kabupaten Pati',
  'Kabupaten Pekalongan',
  'Kabupaten Pemalang',
  'Kabupaten Purbalingga',
  'Kabupaten Purworejo',
  'Kabupaten Rembang',
  'Kabupaten Semarang',
  'Kabupaten Sragen',
  'Kabupaten Sukoharjo',
  'Kabupaten Tegal',
  'Kabupaten Temanggung',
  'Kabupaten Wonogiri',
  'Kabupaten Wonosobo',
  'Kota Magelang',
  'Kota Pekalongan',
  'Kota Salatiga',
  'Kota Semarang',
  'Kota Surakarta',
  'Kota Tegal',
] as const

export const LAHAN_SKEMA_OPTIONS = [
  { value: '', label: 'Semua Skema' },
  { value: 'DIJUAL', label: 'Dijual' },
  { value: 'DISEWA', label: 'Disewa' },
  { value: 'SHARING PROFIT', label: 'Sharing Profit' },
] as const

export const LAHAN_STATUS_OPTIONS = [
  { value: '', label: 'Semua Status' },
  { value: 'Tersedia', label: 'Tersedia' },
  { value: 'Tersewa', label: 'Tersewa' },
  { value: 'Terjual', label: 'Terjual' },
] as const

export const mockLahan: LahanItem[] = [
  {
    id: 1,
    slug: 'tanah-pekarangan',
    nama: 'Tanah Pekarangan',
    wilayah: 'Kabupaten Pekalongan',
    kelurahan: 'Kebonagung',
    kecamatan: 'Kajen',
    luas: '250',
    skema: ['DIJUAL'],
    status: 'Tersedia',
    thumbnail: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
    foto: [
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80',
    ],
    deskripsi:
      'Tanah pekarangan siap bangun dengan lokasi yang strategis terletak di pusat kota Kajen tepatnya di Desa Kebon Agung dekat dengan Tugu 0 Km. Cocok untuk investasi usaha kos-kosan, dengan lingkungan yang mendukung untuk usaha tersebut.',
    legalitas: 'SHM',
    kondisiEksisting:
      'Lingkungan sekitar didominasi perkantoran dan instansi pemerintahan, serta lingkungan pendidikan, sehingga lokasi ini sangat cocok untuk usaha rumah kos.',
    peruntukan: 'Rumah Kos',
    akses: '3 Meter',
    air: 'PDAM',
    listrik: '0',
    lat: -6.995016,
    lng: 109.574427,
    namaPic: 'Admin BUHANSIP',
    noTelpPic: '08112949326',
  },
  {
    id: 2,
    slug: 'lahan-industri-sayung',
    nama: 'Lahan Industri Sayung',
    wilayah: 'Kabupaten Demak',
    kelurahan: 'Sayung',
    kecamatan: 'Sayung',
    luas: '50.000',
    skema: ['DISEWA', 'SHARING PROFIT'],
    status: 'Tersedia',
    thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80',
    foto: [
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80',
      'https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=1200&q=80',
    ],
    deskripsi:
      'Lahan industri siap pakai di kawasan Sayung dengan akses jalan utama dan dekat pelabuhan Semarang. Cocok untuk gudang, manufaktur ringan, dan logistik.',
    legalitas: 'HGB',
    kondisiEksisting: 'Lahan datar siap bangun dengan pagar keliling sebagian.',
    peruntukan: 'Industri & Logistik',
    akses: '6 Meter',
    air: 'Sumur Bor',
    listrik: '1300 VA',
    lat: -6.928,
    lng: 110.518,
    namaPic: 'PIC Kawasan Sayung',
    noTelpPic: '08112949326',
  },
  {
    id: 3,
    slug: 'kavling-agro-semarang',
    nama: 'Kavling Agro Semarang',
    wilayah: 'Kabupaten Semarang',
    kelurahan: 'Bergas',
    kecamatan: 'Bergas',
    luas: '120.000',
    skema: ['DIJUAL'],
    status: 'Tersedia',
    thumbnail: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
    foto: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80'],
    deskripsi:
      'Kavling agro seluas 12 hektar dengan potensi hortikultura dan agroindustri. Lokasi strategis dekat jalan provinsi.',
    legalitas: 'SHM',
    kondisiEksisting: 'Lahan pertanian aktif dengan irigasi tersedia.',
    peruntukan: 'Agroindustri',
    akses: '5 Meter',
    air: 'Irigasi + Sumur',
    listrik: '0',
    lat: -7.062,
    lng: 110.401,
    namaPic: 'PIC Agro Semarang',
    noTelpPic: '08112949326',
  },
  {
    id: 4,
    slug: 'tanah-komersial-solo',
    nama: 'Tanah Komersial Solo',
    wilayah: 'Kota Surakarta',
    kelurahan: 'Laweyan',
    kecamatan: 'Laweyan',
    luas: '20.000',
    skema: ['DISEWA'],
    status: 'Tersewa',
    thumbnail: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
    foto: ['https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80'],
    deskripsi:
      'Tanah komersial di kawasan perkotaan Solo dengan arus kendaraan tinggi, cocok untuk ritel dan usaha jasa.',
    legalitas: 'SHM',
    kondisiEksisting: 'Bangunan lama sebagian, siap renovasi.',
    peruntukan: 'Komersial',
    akses: '4 Meter',
    air: 'PDAM',
    listrik: '2200 VA',
    lat: -7.566,
    lng: 110.816,
  },
  {
    id: 5,
    slug: 'lahan-energi-batang',
    nama: 'Lahan Energi Batang',
    wilayah: 'Kabupaten Batang',
    kelurahan: 'Gringsing',
    kecamatan: 'Gringsing',
    luas: '200.000',
    skema: ['DIJUAL', 'SHARING PROFIT'],
    status: 'Tersedia',
    thumbnail: 'https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=1200&q=80',
    foto: ['https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=1200&q=80'],
    deskripsi:
      'Lahan skala besar untuk proyek energi terbarukan di kawasan industri Batang dengan akses pelabuhan.',
    legalitas: 'HGB',
    kondisiEksisting: 'Lahan kosong siap pengembangan.',
    peruntukan: 'Energi Terbarukan',
    akses: '8 Meter',
    air: 'Sumur Bor',
    listrik: '4500 VA',
    lat: -6.898,
    lng: 109.725,
    namaPic: 'PIC Energi Batang',
    noTelpPic: '08112949326',
  },
  {
    id: 6,
    slug: 'kavling-industri-kendal',
    nama: 'Kavling Industri Kendal',
    wilayah: 'Kabupaten Kendal',
    kelurahan: 'Sukorejo',
    kecamatan: 'Kendal',
    luas: '80.000',
    skema: ['DISEWA'],
    status: 'Tersedia',
    thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80',
    foto: ['https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80'],
    deskripsi:
      'Kavling industri di kawasan Kendal dekat KEK, ideal untuk manufaktur dan pergudangan.',
    legalitas: 'HGB',
    kondisiEksisting: 'Siap bangun dengan utilitas kawasan tersedia.',
    peruntukan: 'Industri',
    akses: '7 Meter',
    air: 'PDAM',
    listrik: '5500 VA',
    lat: -6.918,
    lng: 110.204,
    namaPic: 'PIC Kendal',
    noTelpPic: '08112949326',
  },
  {
    id: 7,
    slug: 'lahan-pariwisata-magelang',
    nama: 'Lahan Pariwisata Magelang',
    wilayah: 'Kabupaten Magelang',
    kelurahan: 'Borobudur',
    kecamatan: 'Borobudur',
    luas: '30.000',
    skema: ['DIJUAL'],
    status: 'Terjual',
    thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80',
    foto: ['https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80'],
    deskripsi:
      'Lahan pariwisata dekat kawasan Borobudur dengan potensi pengembangan resort dan hospitality.',
    legalitas: 'SHM',
    kondisiEksisting: 'Tanah hijau dengan view pegunungan.',
    peruntukan: 'Pariwisata',
    akses: '5 Meter',
    air: 'Sumur',
    listrik: '1300 VA',
    lat: -7.608,
    lng: 110.204,
  },
  {
    id: 8,
    slug: 'lahan-kawasan-banjarnegara',
    nama: 'Lahan Kawasan Banjarnegara',
    wilayah: 'Kabupaten Banjarnegara',
    kelurahan: 'Pagentan',
    kecamatan: 'Pagentan',
    luas: '45.000',
    skema: ['SHARING PROFIT'],
    status: 'Tersedia',
    thumbnail: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
    foto: ['https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80'],
    deskripsi:
      'Lahan kawasan di Banjarnegara dengan skema sharing profit, cocok untuk pengembangan UMKM dan agrowisata.',
    legalitas: 'SHM',
    kondisiEksisting: 'Lahan datar dengan akses jalan desa.',
    peruntukan: 'UMKM & Agrowisata',
    akses: '4 Meter',
    air: 'Sumur',
    listrik: '0',
    lat: -7.389,
    lng: 109.695,
    namaPic: 'PIC Banjarnegara',
    noTelpPic: '08112949326',
  },
]

export function getLahanBySlug(slug: string): LahanItem | undefined {
  return mockLahan.find((item) => item.slug === slug)
}

export function getAllLahanSlugs(): string[] {
  return mockLahan.map((item) => item.slug)
}

export function getLahanAlamat(item: LahanItem): string {
  return `${item.kelurahan}, ${item.kecamatan}, ${item.wilayah}`
}

export function getLahanMapsUrl(item: LahanItem): string {
  return `https://www.google.com/maps/search/?api=1&query=${item.lat},${item.lng}`
}
