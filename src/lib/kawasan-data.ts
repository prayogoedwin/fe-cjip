import type { KawasanIndustri, KawasanTenant } from '@/types'

export type { KawasanIndustri, KawasanTenant }

export const mockKawasan: KawasanIndustri[] = [
  {
    id: 1,
    slug: 'kek-kendal',
    nama: 'KEK Kendal',
    lokasi: 'Kendal',
    luas: '2.200 Ha',
    thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1200&q=80',
    badge: 'KEK',
    kepemilikan: 'Pemerintah',
    deskripsi:
      'Kawasan Ekonomi Khusus Kendal merupakan kawasan industri terintegrasi dengan fasilitas pelabuhan dan infrastruktur lengkap.',
    profilKawasan:
      'KEK Kendal adalah kawasan industri modern yang menawarkan fasilitas fiskal dan kemudahan berusaha. Dilengkapi pelabuhan, jaringan jalan, dan utilitas siap pakai untuk mendukung investasi manufaktur, logistik, serta industri hilir.',
    profilPerusahaan:
      'Pengelolaan KEK Kendal melibatkan pengelola kawasan yang berpengalaman dalam pengembangan industrial estate dan layanan one-stop service bagi investor domestik maupun asing.',
    jaringanSda:
      'Tersedia jaringan air baku dan sistem distribusi air industri yang memadai untuk kebutuhan pabrik dan fasilitas pendukung kawasan.',
    jaringanEnergi:
      'Pasokan listrik industri tersedia melalui jaringan PLN dengan kapasitas yang dapat ditingkatkan sesuai kebutuhan tenant.',
    jaringanTelekomunikasi:
      'Infrastruktur telekomunikasi dan data mendukung operasional industri modern, termasuk konektivitas fiber optic.',
    foto: [
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
    ],
    urlWebsite: 'https://cjip.jatengprov.go.id',
    tenants: [
      { nama: 'PT Exemplar Manufacturing', jenisUsaha: 'Manufaktur otomotif', negara: 'Jepang' },
      { nama: 'PT Logistik Nusantara', jenisUsaha: 'Gudang & distribusi', negara: 'Indonesia' },
      { nama: 'Global Parts Indo', jenisUsaha: 'Komponen industri', negara: 'Korea Selatan' },
    ],
  },
  {
    id: 2,
    slug: 'kawasan-industri-wijayakusuma',
    nama: 'Kawasan Industri Wijayakusuma',
    lokasi: 'Semarang',
    luas: '245 Ha',
    thumbnail: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80',
    badge: 'BUMN',
    kepemilikan: 'PT Kawasan Industri Wijayakusuma',
    deskripsi:
      'BUMN pengembang kawasan industri terbaik dengan lahan siap bangun, lokasi strategis dekat tol, pelabuhan, dan bandara.',
    profilKawasan:
      'KIW menyediakan lahan siap bangun dengan infrastruktur lengkap di Kota Semarang. Lokasi strategis dekat tol, pelabuhan Tanjung Emas, dan bandara memudahkan rantai pasok investor.',
    profilPerusahaan:
      'PT Kawasan Industri Wijayakusuma (Persero) adalah BUMN pengembang dan pengelola kawasan industri yang berfokus pada layanan lahan, utilitas, dan fasilitas pendukung investasi.',
    jaringanSda: 'Sistem penyediaan air industri dan pengelolaan air limbah kawasan tersedia untuk tenant.',
    jaringanEnergi: 'Jaringan listrik industri dengan gardu distribusi di dalam kawasan.',
    jaringanTelekomunikasi: 'Konektivitas telekomunikasi dan internet siap pakai bagi pelaku industri.',
    foto: [
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&q=80',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    ],
    urlWebsite: 'https://www.kiw.co.id',
    tenants: [
      { nama: 'PT Semen Industri Jaya', jenisUsaha: 'Bahan bangunan', negara: 'Indonesia' },
      { nama: 'PT Food Processing Semarang', jenisUsaha: 'Pengolahan pangan', negara: 'Indonesia' },
    ],
  },
  {
    id: 3,
    slug: 'grand-batang-city',
    nama: 'Grand Batang City',
    lokasi: 'Batang',
    luas: '4.300 Ha',
    thumbnail: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=1200&q=80',
    badge: 'KEK',
    kepemilikan: 'Konsorsium',
    deskripsi:
      'Kawasan Industri Terpadu Batang, konsorsium antara PT PP, PT KIW, PT Perkebunan Nusantara IX, dan Perumda Aneka Usaha Batang.',
    profilKawasan:
      'Grand Batang City (KEK Industropolis Batang) adalah kawasan industri terpadu skala besar yang menjadi prioritas investasi nasional, dengan konsep industri hijau dan infrastruktur terintegrasi.',
    profilPerusahaan:
      'Pengembangan dilakukan oleh konsorsium BUMN dan BUMD untuk memastikan tata kelola kawasan yang profesional dan berkelanjutan.',
    jaringanSda: 'Rencana kapasitas air baku skala kawasan untuk mendukung industri manufaktur dan energi.',
    jaringanEnergi: 'Integrasi pasokan listrik dan potensi energi pendukung kawasan industri.',
    jaringanTelekomunikasi: 'Rencana jaringan data dan telekomunikasi untuk smart industrial park.',
    foto: [
      'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=800&q=80',
      'https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=800&q=80',
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
    ],
    tenants: [
      { nama: 'PT Batang Energy Hub', jenisUsaha: 'Energi & utilitas', negara: 'Indonesia' },
      { nama: 'Asia Fabrication Ltd', jenisUsaha: 'Fabrikasi logam', negara: 'Singapura' },
    ],
  },
  {
    id: 4,
    slug: 'jatengland-industrial-park-sayung',
    nama: 'Jatengland Industrial Park Sayung',
    lokasi: 'Demak',
    luas: '500 Ha',
    thumbnail: 'https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=1200&q=80',
    badge: 'Swasta',
    kepemilikan: 'Mugan Group',
    deskripsi: 'Pengembang dan pengelola kawasan industri JIPS, anak perusahaan Mugan Group.',
    profilKawasan:
      'JIPS menawarkan kawasan industri modern di Sayung, Demak, dengan akses ke koridor pantura dan pelabuhan Semarang.',
    profilPerusahaan:
      'Dikelola oleh anak perusahaan Mugan Group sebagai pengembang dan pengelola kawasan industri swasta.',
    jaringanSda: 'Sistem air bersih dan drainase kawasan tersedia.',
    jaringanEnergi: 'Pasokan listrik industri melalui jaringan resmi.',
    jaringanTelekomunikasi: 'Layanan telekomunikasi untuk kebutuhan operasional tenant.',
    foto: [
      'https://images.unsplash.com/photo-1569163139599-0f4517e36f51?w=800&q=80',
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
    ],
    tenants: [{ nama: 'PT Sayung Packaging', jenisUsaha: 'Kemasan industri', negara: 'Indonesia' }],
  },
  {
    id: 5,
    slug: 'kawasan-industri-candi',
    nama: 'Kawasan Industri Candi',
    lokasi: 'Semarang',
    luas: '120 Ha',
    thumbnail: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1200&q=80',
    badge: 'Swasta',
    kepemilikan: 'Swasta',
    deskripsi: 'Kawasan industri strategis di wilayah Semarang dengan akses logistik yang memadai.',
    profilKawasan:
      'Kawasan Industri Candi berada di koridor industri Semarang dengan akses jalan arteri dan fasilitas pendukung usaha.',
    profilPerusahaan: 'Dikelola oleh pengelola kawasan swasta yang menyediakan lahan dan layanan utilitas dasar.',
    jaringanSda: 'Jaringan air kawasan tersedia untuk unit industri.',
    jaringanEnergi: 'Koneksi listrik industri sesuai kapasitas unit.',
    jaringanTelekomunikasi: 'Akses telekomunikasi lokal tersedia.',
    foto: [
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80',
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
    ],
    tenants: [],
  },
  {
    id: 6,
    slug: 'kawasan-industri-terboyo',
    nama: 'Kawasan Industri Terboyo',
    lokasi: 'Semarang',
    luas: '85 Ha',
    thumbnail: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&q=80',
    badge: 'Swasta',
    kepemilikan: 'Swasta',
    deskripsi: 'Kawasan industri dekat pelabuhan Tanjung Emas, ideal untuk industri pengolahan dan logistik.',
    profilKawasan:
      'Lokasi dekat pelabuhan Tanjung Emas menjadikan kawasan ini ideal untuk industri pengolahan, pergudangan, dan logistik ekspor-impor.',
    profilPerusahaan: 'Pengelola kawasan swasta dengan fokus layanan lahan industri dan akses pelabuhan.',
    jaringanSda: 'Air industri dan sanitasi kawasan tersedia.',
    jaringanEnergi: 'Pasokan listrik untuk kegiatan industri dan logistik.',
    jaringanTelekomunikasi: 'Konektivitas untuk operasional gudang dan kantor kawasan.',
    foto: [
      'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
      'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=800&q=80',
    ],
    tenants: [
      { nama: 'PT Harbor Logistics', jenisUsaha: 'Logistik pelabuhan', negara: 'Indonesia' },
      { nama: 'Ocean Cold Storage', jenisUsaha: 'Cold storage', negara: 'Indonesia' },
    ],
  },
]

export function getKawasanBySlug(slug: string): KawasanIndustri | undefined {
  return mockKawasan.find((item) => item.slug === slug)
}

export function getAllKawasanSlugs(): string[] {
  return mockKawasan.map((item) => item.slug)
}
