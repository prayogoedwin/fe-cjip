export function OrganizationJsonLd() {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'DPMPTSP Provinsi Jawa Tengah',
      url: 'https://cjip.jatengprov.go.id',
      logo: 'https://cjip.jatengprov.go.id/images/logo.png',
    }
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    )
  }
  
  export function NewsArticleJsonLd({ judul, tanggal, thumbnail, excerpt }: {
    judul: string
    tanggal: string
    thumbnail: string
    excerpt: string
  }) {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'NewsArticle',
      headline: judul,
      datePublished: tanggal,
      image: thumbnail,
      description: excerpt,
      publisher: {
        '@type': 'Organization',
        name: 'CJIP Jawa Tengah',
      },
    }
    return (
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
      />
    )
  }