import type { MetadataRoute } from 'next'
import {
  fetchAllKawasanSlugs,
  fetchAllLahanSlugs,
  fetchBeritaList,
  fetchProyekList,
  fetchProdukList,
} from '@/lib/api'
import { getAllKawasanSlugs } from '@/lib/kawasan-data'
import { getAllLahanSlugs } from '@/lib/lahan-data'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = 'https://cjip.jatengprov.go.id'
  const pages = [
    '',
    '/profil-jateng',
    '/kawasan-industri',
    '/berita',
    '/peluang-investasi',
    '/sektor',
    '/peta-investasi',
    '/lahan-siap-pakai',
    '/panduan-investasi',
    '/dokumen',
    '/kepeminatan',
    '/lapor-mikro',
    '/login',
    '/product-all',
    '/sidikerjo',
    '/infografis-sidikerjo',
  ]

  const staticPages = pages.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: (path === '' ? 'daily' : 'weekly') as 'daily' | 'weekly',
    priority: path === '' ? 1 : 0.8,
  }))

  const [apiKawasan, apiLahan, beritaRes, proyekRes, produkRes] = await Promise.all([
    fetchAllKawasanSlugs(),
    fetchAllLahanSlugs(),
    fetchBeritaList({ perPage: 50 }),
    fetchProyekList({ perPage: 50 }),
    fetchProdukList({ perPage: 50 }),
  ])

  const kawasanSlugs = apiKawasan.length > 0 ? apiKawasan : getAllKawasanSlugs()
  const lahanSlugs = apiLahan.length > 0 ? apiLahan : getAllLahanSlugs()

  const kawasanPages = kawasanSlugs.map((slug) => ({
    url: `${base}/kawasan-industri/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const lahanPages = lahanSlugs.map((slug) => ({
    url: `${base}/lahan-siap-pakai/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const beritaPages = beritaRes.data.map((item) => ({
    url: `${base}/berita/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const proyekPages = proyekRes.data
    .filter((item) => item.slug)
    .map((item) => ({
      url: `${base}/peluang-investasi/${item.slug}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.6,
    }))

  const produkPages = produkRes.data.map((item) => ({
    url: `${base}/product-all/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))

  return [
    ...staticPages,
    ...kawasanPages,
    ...lahanPages,
    ...beritaPages,
    ...proyekPages,
    ...produkPages,
  ]
}
