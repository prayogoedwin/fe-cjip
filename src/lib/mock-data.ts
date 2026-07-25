import type { Berita, Sektor, PeluangInvestasi } from '@/types'
import { mockKawasan } from '@/lib/kawasan-data'

export { mockKawasan }

export const mockBerita: Berita[] = [
  {
    id: 1,
    slug: 'jateng-perluas-kerja-sama-investasi',
    judul: 'Jateng Perluas Kerja Sama Investasi dengan Tiongkok, Fokus pada Energi Terbarukan',
    thumbnail: 'https://cjip.jatengprov.go.id/storage/berita/2026/01KTB3PYF7T2G7QYH3JGZ6ZCRP.jpg',
    tanggal: '24 May 2026',
    kategori: 'Investasi',
    excerpt:
      'Gubernur Jawa Tengah Ahmad Luthfi terus mendorong promosi potensi investasi daerah kepada investor domestik dan mancanegara.',
  },
  {
    id: 2,
    slug: 'dorong-investasi-wisata-halal',
    judul: 'Dorong Investasi dan Wisata Halal, DPMPTSP Jateng Gelar Klinik Tematik di Magelang',
    thumbnail: 'https://cjip.jatengprov.go.id/storage/berita/2026/01KTB38CH6Y2FFZC8MA0CK1DXB.jpg',
    tanggal: '22 May 2026',
    kategori: 'Pariwisata',
    excerpt: 'DPMPTSP Provinsi Jawa Tengah menggelar Klinik Tematik Perizinan Pariwisata Ramah Muslim di Magelang.',
  },
  {
    id: 3,
    slug: 'kode-pin-umkm-magelang',
    judul: 'KODE PIN Dorong Legalitas dan Penguatan UMKM di Desa Sukorejo Kabupaten Magelang',
    thumbnail: 'https://cjip.jatengprov.go.id/storage/berita/2026/01KS6SPS2XMW98PBP82MF5BP4Y.png',
    tanggal: '21 May 2026',
    kategori: 'UMKM',
    excerpt:
      'DPMPTSP Provinsi Jawa Tengah melaksanakan kegiatan KODE PIN di Desa Sukorejo, Kecamatan Tegalrejo, Kabupaten Magelang.',
  },
  {
    id: 4,
    slug: 'cjibf-2026-dibuka',
    judul: 'CJIBF 2026 Dibuka, Jateng Tawarkan Proyek Investasi Hijau hingga Hilirisasi Pangan',
    thumbnail: 'https://cjip.jatengprov.go.id/storage/berita/2026/01KS6SJ2053R4Z4J4AQ7JV6C0Z.jpg',
    tanggal: '11 May 2026',
    kategori: 'Event',
    excerpt:
      'Pemerintah Provinsi Jawa Tengah terus memperkuat posisi sebagai salah satu tujuan investasi utama di Indonesia.',
  },
  {
    id: 5,
    slug: 'investasi-jateng-tumbuh-positif',
    judul: 'Investasi Jateng Tumbuh Positif, Industri Padat Modal Mulai Geser Padat Karya',
    thumbnail: 'https://cjip.jatengprov.go.id/storage/berita/2026/01KS6S542FS0JMX1NXY9YCWPT7.jpg',
    tanggal: '06 May 2026',
    kategori: 'Investasi',
    excerpt: 'Realisasi investasi di Jawa Tengah pada triwulan I 2026 mencapai Rp23,02 triliun, tumbuh 5,35 persen.',
  },
  {
    id: 6,
    slug: 'gubernur-dorong-tk-lokal',
    judul: 'Gubernur Jateng Dorong Investor Prioritaskan Tenaga Kerja Lokal',
    thumbnail: 'https://cjip.jatengprov.go.id/storage/berita/2026/01KS6S9D70NKYW5PW9TJ2KP7YY.jpg',
    tanggal: '06 May 2026',
    kategori: 'Investasi',
    excerpt:
      'Gubernur Jawa Tengah Ahmad Luthfi meminta para investor memprioritaskan tenaga kerja lokal dalam operasional perusahaan.',
  },
]

export const mockSektor: Sektor[] = [
  { id: 1, nama: 'Manufaktur', icon: '🏭', total: 128 },
  { id: 2, nama: 'Pariwisata', icon: '🏖️', total: 64 },
  { id: 3, nama: 'Infrastruktur', icon: '🏗️', total: 42 },
  { id: 4, nama: 'Pertanian', icon: '🌾', total: 87 },
  { id: 5, nama: 'Properti', icon: '🏢', total: 55 },
  { id: 6, nama: 'Energi', icon: '⚡', total: 33 },
]

export const mockPeluang: PeluangInvestasi[] = [
  {
    id: 1,
    judul: 'Pembangunan Hotel Bintang 4 Solo',
    sektor: 'Pariwisata',
    nilai: 'Rp 120 M',
    status: 'siap',
    wilayah: 'Kota Surakarta',
    thumbnail: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&q=80',
    excerpt: 'Proyek pembangunan hotel bintang 4 di kawasan strategis Kota Solo dengan potensi wisata tinggi.',
  },
  {
    id: 2,
    judul: 'Pabrik Tekstil Terintegrasi',
    sektor: 'Manufaktur',
    nilai: 'Rp 500 M',
    status: 'strategis',
    wilayah: 'Kabupaten Kudus',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&q=80',
    excerpt: 'Investasi pabrik tekstil terintegrasi dengan kapasitas produksi ekspor.',
  },
  {
    id: 3,
    judul: 'Pembangkit Listrik Tenaga Surya',
    sektor: 'Energi',
    nilai: 'Rp 800 M',
    status: 'prospektif',
    wilayah: 'Kabupaten Batang',
    thumbnail: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&q=80',
    excerpt: 'Proyek PLTS skala menengah untuk mendukung transisi energi hijau di Jawa Tengah.',
  },
  {
    id: 4,
    judul: 'Agropolitan Hortikultura',
    sektor: 'Pertanian',
    nilai: 'Rp 200 M',
    status: 'potensial',
    wilayah: 'Kabupaten Wonosobo',
    thumbnail: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=600&q=80',
    excerpt: 'Pengembangan kawasan agropolitan hortikultura dengan sistem irigasi modern.',
  },
  {
    id: 5,
    judul: 'Mixed-Use Development Semarang',
    sektor: 'Properti',
    nilai: 'Rp 1,2 T',
    status: 'strategis',
    wilayah: 'Kota Semarang',
    thumbnail: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=600&q=80',
    excerpt: 'Pengembangan kawasan mixed-use dengan komponen residensial, komersial, dan hospitality.',
  },
  {
    id: 6,
    judul: 'Jalan Tol Regional',
    sektor: 'Infrastruktur',
    nilai: 'Rp 3,5 T',
    status: 'prospektif',
    wilayah: 'Kabupaten Demak',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
    excerpt: 'Proyek infrastruktur jalan tol penghubung kawasan industri dan pelabuhan.',
  },
]

export const mockProducts = [
  { id: 1, judul: 'Kerajinan Tembaga Tumang', seller: 'UMKM Tumang', description: 'Produk kerajinan tembaga khas Purworejo untuk pasar domestik dan ekspor.' },
  { id: 2, judul: 'Kopi Robusta Temanggung', seller: 'Koperasi Petani Temanggung', description: 'Kopi robusta premium dari dataran tinggi Temanggung.' },
  { id: 3, judul: 'Batik Tulis Solo', seller: 'Batik Laweyan', description: 'Batik tulis autentik dengan motif tradisional Jawa Tengah.' },
  { id: 4, judul: 'Furniture Jepara', seller: 'CV Mebel Jepara', description: 'Furniture kayu jati berkualitas ekspor dari Jepara.' },
  { id: 5, judul: 'Keripik Singkong Margoyoso', seller: 'UMKM Margoyoso', description: 'Keripik singkong dengan berbagai varian rasa.' },
  { id: 6, judul: 'Tahu Baxo Malang', seller: 'UMKM Pati', description: 'Produk olahan kedelai khas dengan distribusi nasional.' },
]

export const popularTags = ['Investasi', 'CJIBF', 'KEK Kendal', 'UMKM', 'Pariwisata', 'Energi Hijau', 'Infrastruktur', 'Manufaktur']
