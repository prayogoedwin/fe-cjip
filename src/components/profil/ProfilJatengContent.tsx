'use client'
import { useMemo, useState } from 'react'
import Link from 'next/link'
import { PageHero } from '@/components/ui/PageHero'
import { Container } from '@/components/ui/Container'
import { SearchBox } from '@/components/ui/SearchBox'
import { Pagination } from '@/components/ui/Pagination'
import { SafeImage } from '@/components/ui/SafeImage'
import { SafeHtml } from '@/components/ui/SafeHtml'
import { resolveImageUrl } from '@/lib/images'
import { PROFIL_IMAGE, PROFIL_STATS } from '@/lib/profil-data'

type ProfilStat = { label: string; value: string }

type ProfilData = {
  intro: { title: string; desc: string; image: string | null }
  sdm: { title: string; desc: string; image: string | null }
  biaya: { title: string; desc: string; image: string | null }
  tarif_listrik: Array<Record<string, unknown>>
  tarif_air: Array<Record<string, unknown>>
  wilayah: Array<{
    id: number
    slug: string
    nama: string
    kab_kota_id: number | null
    foto: string | null
    icon: string | null
    profil: string | null
    desc: string | null
    luas: string | null
    populasi: string | null
    umr: string | null
  }>
}

const TARIF_PER_PAGE = 10
const WILAYAH_PER_PAGE = 8

function StatCards({ stats }: { stats: ProfilStat[] }) {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border border-brand-100 bg-white p-5 shadow-sm transition duration-300 hover:border-brand-200 hover:shadow-md"
        >
          <p className="text-xs font-semibold tracking-wide text-brand-600 uppercase">{stat.label}</p>
          <p className="mt-2 text-xl font-bold text-brand-900">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}

export function ProfilJatengContent({
  data,
  stats,
}: {
  data?: ProfilData | null
  stats?: ProfilStat[]
}) {
  const [tarifTab, setTarifTab] = useState<'listrik' | 'air'>('listrik')
  const [tarifPage, setTarifPage] = useState(1)
  const [wilayahPage, setWilayahPage] = useState(1)
  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const introTitle = data?.intro?.title || 'Tentang Jawa Tengah'
  const introDesc = data?.intro?.desc ?? ''
  const introImage = resolveImageUrl(data?.intro?.image) || PROFIL_IMAGE
  const sdmTitle = data?.sdm?.title || 'Sumber Daya Manusia'
  const sdmDesc = data?.sdm?.desc ?? ''
  const biayaTitle = data?.biaya?.title || 'Biaya Investasi'
  const biayaDesc = data?.biaya?.desc ?? ''

  const wilayah =
    data?.wilayah?.map((w) => ({
      nama: w.nama,
      deskripsi: w.desc || w.profil || '',
      foto: resolveImageUrl(w.foto) || PROFIL_IMAGE,
      slug: w.slug,
    })) ?? []

  const tarifListrik =
    data?.tarif_listrik?.map((row, i) => ({
      no: i + 1,
      kode: String(row.kode ?? row.code ?? '-'),
      kapasitas: String(row.kapasitas ?? row.capacity ?? '-'),
      tarif: String(row.tarif ?? row.rate ?? '-'),
      tanggal: String(row.tanggal ?? row.date ?? '-'),
    })) ?? []

  const tarifAir =
    data?.tarif_air?.map((row, i) => {
      const tiers = [row.first, row.second, row.third, row.four]
        .filter((v) => v !== null && v !== undefined && v !== '')
        .join(' / ')
      return {
        no: i + 1,
        kategori: String(row.kategori ?? row.category ?? '-'),
        golongan: String(row.golongan ?? row.group ?? row.category ?? '-'),
        tarif: String(row.tarif ?? row.rate ?? (tiers || '-')),
        tahun: String(row.tahun ?? row.year ?? '-'),
      }
    }) ?? []

  const q = searchQuery.trim().toLowerCase()
  const filteredTarif = useMemo(() => {
    const source = tarifTab === 'listrik' ? tarifListrik : tarifAir
    if (!q) return source
    return source.filter((row) =>
      Object.values(row).some((value) => String(value).toLowerCase().includes(q)),
    )
  }, [tarifTab, tarifListrik, tarifAir, q])

  const tarifTotalPages = Math.max(1, Math.ceil(filteredTarif.length / TARIF_PER_PAGE))
  const safeTarifPage = Math.min(tarifPage, tarifTotalPages)
  const pagedTarif = filteredTarif.slice(
    (safeTarifPage - 1) * TARIF_PER_PAGE,
    safeTarifPage * TARIF_PER_PAGE,
  )

  const wilayahTotalPages = Math.max(1, Math.ceil(wilayah.length / WILAYAH_PER_PAGE))
  const safeWilayahPage = Math.min(wilayahPage, wilayahTotalPages)
  const pagedWilayah = wilayah.slice(
    (safeWilayahPage - 1) * WILAYAH_PER_PAGE,
    safeWilayahPage * WILAYAH_PER_PAGE,
  )

  function handleTabChange(next: 'listrik' | 'air') {
    setTarifTab(next)
    setTarifPage(1)
  }

  function handleSearch() {
    setSearchQuery(searchInput)
    setTarifPage(1)
  }

  const statCards =
    stats ??
    (data?.wilayah?.length
      ? [
          { label: 'Kabupaten/Kota', value: String(data.wilayah.length) },
          ...PROFIL_STATS.filter((s) => s.label !== 'Kabupaten/Kota'),
        ]
      : [...PROFIL_STATS])

  return (
    <>
      <PageHero
        label="Profil"
        title="Profil Jawa Tengah"
        breadcrumbs={[{ label: 'Beranda', href: '/' }, { label: 'Profil Jateng' }]}
      />

      <section className="bg-brand-50 px-6 py-14 md:py-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="relative lg:col-span-5">
              <div className="absolute -top-4 -left-4 h-24 w-24 rounded-full bg-brand-200/60 blur-2xl" aria-hidden="true" />
              <div className="relative overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(10,46,15,0.18)]">
                <SafeImage
                  src={introImage}
                  alt="Candi Borobudur, Jawa Tengah"
                  width={800}
                  height={560}
                  className="h-[280px] w-full object-cover transition duration-700 hover:scale-105 md:h-[380px]"
                  priority
                />
              </div>
              <div className="absolute -right-4 -bottom-6 hidden md:block">
                <div className="relative h-28 w-36 overflow-hidden rounded-2xl border-4 border-white shadow-lg lg:h-32 lg:w-44">
                  <SafeImage
                    src={introImage}
                    alt="Candi Borobudur, Jawa Tengah"
                    fill
                    className="object-cover object-center"
                    sizes="176px"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <h2 className="mb-5 text-2xl font-bold text-brand-900 md:text-3xl">{introTitle}</h2>
              {introDesc ? (
                <SafeHtml
                  html={introDesc}
                  className="space-y-4 text-[0.95rem] leading-relaxed text-neutral-600 [&_p]:mb-3 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_strong]:text-brand-900"
                />
              ) : (
                <p className="text-[0.95rem] text-neutral-400">Data profil kosong</p>
              )}
              <div className="mt-8">
                <StatCards stats={statCards} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="px-6 py-14 md:py-20">
        <Container>
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-6 text-2xl font-bold text-brand-900 md:text-3xl">{sdmTitle}</h2>
            {sdmDesc ? (
              <SafeHtml
                html={sdmDesc}
                className="space-y-4 text-[0.95rem] leading-relaxed text-neutral-600 [&_p]:mb-3 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_strong]:text-brand-900"
              />
            ) : (
              <p className="text-[0.95rem] text-neutral-400">Data SDM kosong</p>
            )}
          </div>
        </Container>
      </section>

      <section className="bg-brand-50 px-6 py-14 md:py-20">
        <Container>
          <div className="overflow-hidden rounded-3xl border border-brand-900/10 bg-brand-900 shadow-xl">
            <div className="grid lg:grid-cols-12">
              <div className="border-b border-white/10 p-8 lg:col-span-4 lg:border-r lg:border-b-0 lg:p-10">
                <h2 className="text-2xl font-bold text-white md:text-3xl">{biayaTitle}</h2>
                {biayaDesc ? (
                  <SafeHtml
                    html={biayaDesc}
                    className="mt-4 text-sm leading-relaxed text-white/75 [&_p]:mb-2 [&_p:last-child]:mb-0"
                  />
                ) : (
                  <p className="mt-4 text-sm text-white/50">Data biaya investasi kosong</p>
                )}
              </div>

              <div className="bg-white p-6 lg:col-span-8 lg:p-8">
                <div className="mb-6 flex gap-2 rounded-xl bg-brand-50 p-1">
                  {[
                    { id: 'listrik' as const, label: 'Biaya Listrik' },
                    { id: 'air' as const, label: 'Biaya Air' },
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => handleTabChange(tab.id)}
                      className={`flex-1 rounded-lg px-4 py-2.5 text-sm font-semibold transition duration-300 ${
                        tarifTab === tab.id
                          ? 'bg-brand-500 text-white shadow-sm'
                          : 'text-neutral-600 hover:bg-white hover:text-brand-900'
                      }`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                <SearchBox
                  className="mb-4"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  onSearch={handleSearch}
                />

                <div className="overflow-x-auto rounded-xl border border-brand-100">
                  {tarifTab === 'listrik' ? (
                    <table className="w-full min-w-[520px] text-left text-sm">
                      <thead className="bg-brand-50 text-brand-900">
                        <tr>
                          <th className="px-4 py-3 font-semibold">No</th>
                          <th className="px-4 py-3 font-semibold">Kode</th>
                          <th className="px-4 py-3 font-semibold">Kapasitas</th>
                          <th className="px-4 py-3 font-semibold">Tarif</th>
                          <th className="px-4 py-3 font-semibold">Tanggal</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pagedTarif.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="px-4 py-10 text-center text-neutral-400">
                              Data biaya listrik kosong
                            </td>
                          </tr>
                        ) : (
                          (pagedTarif as typeof tarifListrik).map((row) => (
                            <tr key={`listrik-${row.no}`} className="border-t border-brand-50 even:bg-brand-50/40">
                              <td className="px-4 py-3">{row.no}</td>
                              <td className="px-4 py-3">{row.kode}</td>
                              <td className="px-4 py-3">{row.kapasitas}</td>
                              <td className="px-4 py-3 font-medium text-brand-900">{row.tarif}</td>
                              <td className="px-4 py-3 text-neutral-500">{row.tanggal}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  ) : (
                    <table className="w-full min-w-[520px] text-left text-sm">
                      <thead className="bg-brand-50 text-brand-900">
                        <tr>
                          <th className="px-4 py-3 font-semibold">No</th>
                          <th className="px-4 py-3 font-semibold">Kategori</th>
                          <th className="px-4 py-3 font-semibold">Golongan</th>
                          <th className="px-4 py-3 font-semibold">Tarif</th>
                          <th className="px-4 py-3 font-semibold">Tahun</th>
                        </tr>
                      </thead>
                      <tbody>
                        {pagedTarif.length === 0 ? (
                          <tr>
                            <td colSpan={5} className="px-4 py-10 text-center text-neutral-400">
                              Data biaya air kosong
                            </td>
                          </tr>
                        ) : (
                          (pagedTarif as typeof tarifAir).map((row) => (
                            <tr key={`air-${row.no}`} className="border-t border-brand-50 even:bg-brand-50/40">
                              <td className="px-4 py-3">{row.no}</td>
                              <td className="px-4 py-3">{row.kategori}</td>
                              <td className="px-4 py-3">{row.golongan}</td>
                              <td className="px-4 py-3 font-medium text-brand-900">{row.tarif}</td>
                              <td className="px-4 py-3 text-neutral-500">{row.tahun}</td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
                <Pagination
                  currentPage={safeTarifPage}
                  totalPages={tarifTotalPages}
                  onPageChange={setTarifPage}
                  resultText={`Menampilkan ${pagedTarif.length} dari ${filteredTarif.length} data`}
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="px-6 py-14 md:py-20">
        <Container>
          <div className="mb-10 flex flex-col gap-3 border-b border-brand-100 pb-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-brand-900 md:text-3xl">Profil Wilayah</h2>
              <div className="mt-3 h-1 w-16 rounded-full bg-brand-500" />
            </div>
            <p className="max-w-md text-sm text-neutral-500">
              Pemetaan potensi investasi di kabupaten dan kota Provinsi Jawa Tengah.
            </p>
          </div>

          {wilayah.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-brand-200 bg-white px-6 py-16 text-center text-neutral-400">
              Data profil wilayah kosong
            </p>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {pagedWilayah.map((region) => {
                const href = region.slug ? `/detail-kabkota/${region.slug}` : undefined
                const CardInner = (
                  <>
                    <div className="relative h-36 overflow-hidden bg-brand-100">
                      <SafeImage
                        src={region.foto}
                        alt={region.nama}
                        fill
                        className="object-cover transition duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-brand-900/70 to-transparent" />
                      <h3 className="absolute bottom-3 left-4 text-sm font-bold text-white">
                        {region.nama}
                      </h3>
                    </div>
                    <div className="p-4">
                      <SafeHtml
                        html={region.deskripsi}
                        className="line-clamp-3 text-sm leading-relaxed text-neutral-600 [&_p]:inline"
                      />
                      <span className="mt-3 inline-flex items-center text-sm font-semibold text-brand-500 transition duration-300 group-hover:text-brand-600">
                        Selengkapnya →
                      </span>
                    </div>
                  </>
                )

                return href ? (
                  <Link
                    key={region.nama}
                    href={href}
                    className="group block overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-brand-200 hover:shadow-[0_12px_32px_rgba(26,99,36,0.12)]"
                  >
                    {CardInner}
                  </Link>
                ) : (
                  <article
                    key={region.nama}
                    className="group overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm"
                  >
                    {CardInner}
                  </article>
                )
              })}
            </div>
          )}
          <Pagination
            currentPage={safeWilayahPage}
            totalPages={wilayahTotalPages}
            onPageChange={setWilayahPage}
            resultText={`Menampilkan ${pagedWilayah.length} dari ${wilayah.length} wilayah`}
          />
        </Container>
      </section>
    </>
  )
}
