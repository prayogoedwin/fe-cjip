import type { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
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
    '/kepeminatan',
    '/lapor-mikro',
    '/login',
    '/product-all',
    '/sidikerjo',
  ]

  return pages.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : 0.8,
  }))
}
