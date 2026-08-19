import { apiGet, apiGetSafe, apiPost, apiPostForm, type ApiLocale, type ApiMeta } from '@/lib/api/client'
import { API_V3 } from '@/lib/api/routes'
import { DEFAULT_IMAGE, resolveImageList, resolveImageUrl } from '@/lib/images'
import type { Berita, KawasanIndustri, PeluangInvestasi, Sektor } from '@/types'
import type { LahanItem } from '@/lib/lahan-data'

export type { ApiLocale, ApiMeta }
export { API_V3 }

/* ─── Beranda ─── */

export interface ApiHeroSlide {
  id: number
  foto: string | null
  title: string
  desc: string
  button?: unknown
  display_order?: number
}

export interface ApiBerandaPayload {
  sliders: ApiHeroSlide[]
  pembuka: {
    opening: { title: string; desc: string; image: string | null; buttons?: unknown }
    infrastrukturs: Array<{
      id: number
      nama: string
      detail: string
      icon: string | null
      gambar: string | null
    }>
  }
  grafik: {
    pertumbuhan_ekonomi: {
      section: { title: string; desc: string }
      chart: { labels: (string | number)[]; jateng: number[]; nasional: number[] }
    }
    performa_investasi: {
      section: { title: string; desc: string }
      chart: { labels: (string | number)[]; target: number[]; realisasi: number[] }
    }
    umk_section?: { title: string; desc: string; image: string | null }
    has_data?: boolean
  }
  kawasan: Array<{
    id: number
    nama: string
    slug: string
    foto: string | null
    deskripsi: string | null
  }>
  berita: Array<{
    id: number
    title: string
    slug: string
    image: string | null
    excerpt: string | null
    created_at: string
  }>
  partners: Array<{ id: number; name: string; url: string; logo: string | null }>
}

export async function fetchBeranda(lang: ApiLocale = 'id') {
  return apiGetSafe<ApiBerandaPayload>(API_V3.beranda.index, {
    lang,
    next: { revalidate: 300 },
  })
}

export async function fetchBerandaSlider(lang: ApiLocale = 'id') {
  return apiGetSafe<ApiHeroSlide[]>(API_V3.beranda.slider, { lang, next: { revalidate: 300 } })
}

export async function fetchBerandaGrafik(lang: ApiLocale = 'id') {
  return apiGetSafe<ApiBerandaPayload['grafik']>(API_V3.beranda.grafik, {
    lang,
    next: { revalidate: 300 },
  })
}

export async function fetchUmk(
  params: { lang?: ApiLocale; perPage?: number; page?: number; q?: string } | ApiLocale = 'id',
  perPageLegacy = 5,
) {
  const options =
    typeof params === 'string'
      ? { lang: params, perPage: perPageLegacy, page: 1, q: undefined as string | undefined }
      : {
          lang: params.lang ?? 'id',
          perPage: params.perPage ?? 5,
          page: params.page ?? 1,
          q: params.q,
        }

  return apiGetSafe<
    Array<{ id: number; tahun: number; sumber_data: string; nilai_umr: string; kabkota: string }>
  >(API_V3.beranda.umk, {
    lang: options.lang,
    query: { per_page: options.perPage, page: options.page, q: options.q },
    cache: 'no-store',
  })
}

export async function fetchPendidikan(
  params: { lang?: ApiLocale; perPage?: number; page?: number; q?: string } | ApiLocale = 'id',
  perPageLegacy = 5,
) {
  const options =
    typeof params === 'string'
      ? { lang: params, perPage: perPageLegacy, page: 1, q: undefined as string | undefined }
      : {
          lang: params.lang ?? 'id',
          perPage: params.perPage ?? 5,
          page: params.page ?? 1,
          q: params.q,
        }

  return apiGetSafe<
    Array<{ id: number; nama: string; jenis_sekolah: string; kabkota: string }>
  >(API_V3.beranda.pendidikan, {
    lang: options.lang,
    query: { per_page: options.perPage, page: options.page, q: options.q },
    cache: 'no-store',
  })
}

/* ─── Berita ─── */

export interface ApiBeritaItem {
  id: number
  slug: string
  judul: string
  thumbnail: string | null
  tanggal: string
  kategori: string | null
  excerpt: string | null
  featured?: boolean
  body?: string | null
  seo_title?: string | null
  meta_description?: string | null
  meta_keyword?: string | null
  images?: string[]
}

function mapBerita(item: ApiBeritaItem): Berita {
  return {
    id: item.id,
    slug: item.slug,
    judul: item.judul,
    thumbnail: resolveImageUrl(item.thumbnail),
    tanggal: formatDate(item.tanggal),
    kategori: item.kategori ?? '',
    excerpt: item.excerpt ?? '',
  }
}

export async function fetchBeritaList(params: {
  lang?: ApiLocale
  q?: string
  kategori?: string
  featured?: boolean
  page?: number
  perPage?: number
} = {}) {
  const res = await apiGetSafe<ApiBeritaItem[]>(API_V3.berita.index, {
    lang: params.lang ?? 'id',
    query: {
      q: params.q,
      kategori: params.kategori,
      featured: params.featured,
      page: params.page,
      per_page: params.perPage ?? 12,
    },
    next: { revalidate: 120 },
  })
  if (!res) return { data: [] as Berita[], meta: null as ApiMeta | null }
  return { data: res.data.map(mapBerita), meta: res.meta ?? null }
}

export async function fetchBeritaTags(lang: ApiLocale = 'id') {
  const res = await apiGetSafe<Array<{ id: number; nama: string; slug: string }>>(
    API_V3.berita.tags,
    { lang, next: { revalidate: 600 } },
  )
  return res?.data ?? []
}

export async function fetchBeritaBySlug(slug: string, lang: ApiLocale = 'id') {
  const res = await apiGetSafe<ApiBeritaItem>(API_V3.berita.show(slug), {
    lang,
    next: { revalidate: 120 },
  })
  if (!res) return null
  return {
    ...mapBerita(res.data),
    body: res.data.body ?? '',
    images: resolveImageList(res.data.images),
    seo_title: res.data.seo_title,
    meta_description: res.data.meta_description,
  }
}

/* ─── Kawasan ─── */

export interface ApiKawasanItem {
  id: number
  slug: string
  nama: string
  lokasi: string | null
  luas: string | null
  thumbnail: string | null
  badge: string | null
  kepemilikan: string | null
  deskripsi: string | null
  profilKawasan?: string | null
  profilPerusahaan?: string | null
  jaringanSda?: string | null
  jaringanEnergi?: string | null
  jaringanTelekomunikasi?: string | null
  masterplan?: string | null
  fasilitas?: string | null
  foto?: string[]
  urlVideo?: string | null
  urlWebsite?: string | null
  lat?: number | null
  lng?: number | null
  tenants?: Array<{ nama: string; jenisUsaha: string; negara: string }>
}

function mapKawasan(item: ApiKawasanItem): KawasanIndustri {
  return {
    id: item.id,
    slug: item.slug,
    nama: item.nama,
    lokasi: item.lokasi ?? '',
    luas: item.luas ?? '',
    thumbnail: resolveImageUrl(item.thumbnail),
    badge: item.badge ?? undefined,
    kepemilikan: item.kepemilikan ?? undefined,
    deskripsi: item.deskripsi ?? undefined,
    profilKawasan: item.profilKawasan ?? undefined,
    profilPerusahaan: item.profilPerusahaan ?? undefined,
    jaringanSda: item.jaringanSda ?? undefined,
    jaringanEnergi: item.jaringanEnergi ?? undefined,
    jaringanTelekomunikasi: item.jaringanTelekomunikasi ?? undefined,
    foto: item.foto ? resolveImageList(item.foto) : undefined,
    urlVideo: item.urlVideo ?? undefined,
    urlWebsite: item.urlWebsite ?? undefined,
    tenants: item.tenants,
  }
}

export async function fetchKawasanList(params: {
  lang?: ApiLocale
  q?: string
  page?: number
  perPage?: number
} = {}) {
  const res = await apiGetSafe<ApiKawasanItem[]>(API_V3.kawasan.index, {
    lang: params.lang ?? 'id',
    query: { q: params.q, page: params.page, per_page: params.perPage ?? 24 },
    next: { revalidate: 300 },
  })
  if (!res) return { data: [] as KawasanIndustri[], meta: null as ApiMeta | null }
  return { data: res.data.map(mapKawasan), meta: res.meta ?? null }
}

export async function fetchKawasanBySlug(slug: string, lang: ApiLocale = 'id') {
  const res = await apiGetSafe<ApiKawasanItem>(API_V3.kawasan.show(slug), {
    lang,
    next: { revalidate: 300 },
  })
  return res ? mapKawasan(res.data) : null
}

export async function fetchAllKawasanSlugs(lang: ApiLocale = 'id') {
  const { data } = await fetchKawasanList({ lang, perPage: 50 })
  return data.map((item) => item.slug)
}

/* ─── Proyek ─── */

export interface ApiProyekItem {
  id: number
  slug: string
  judul: string
  sektor: string | null
  sektor_id: number | null
  nilai: string | null
  status: PeluangInvestasi['status']
  market_id?: number | null
  thumbnail: string | null
  wilayah: string | null
  kab_kota_id?: number | null
  excerpt: string | null
  latarBelakang?: string | null
  lingkupPekerjaan?: string | null
  eksisting?: string | null
  luasLahan?: string | null
  statusKepemilikan?: string | null
  skemaInvestasi?: string | null
  npv?: string | null
  irr?: string | null
  bcRatio?: string | null
  playbackPeriod?: string | null
  sumberAir?: string | null
  kelistrikan?: string | null
  telekomunikasi?: string | null
  jaringanJalan?: string | null
  ketersediaanPasar?: string | null
  fileKajian?: string | null
  foto?: string[]
  urlVideo?: string | null
  lat?: number | null
  lng?: number | null
  kontak?: { nama?: string; email?: string; hp?: string; alamat?: string } | null
}

export const PROYEK_STATUS_LABEL: Record<PeluangInvestasi['status'], string> = {
  siap: 'Proyek Siap Ditawarkan',
  prospektif: 'Proyek Prospektif',
  potensial: 'Proyek Potensial',
  strategis: 'Proyek Strategis Nasional',
}

export const PROYEK_STATUS_CLASS: Record<PeluangInvestasi['status'], string> = {
  siap: 'text-[#1DB053]',
  prospektif: 'text-[#498DBF]',
  potensial: 'text-[#FE1010]',
  strategis: 'text-[#FF6C00]',
}

function mapProyek(item: ApiProyekItem): PeluangInvestasi & { slug: string } {
  return {
    id: item.id,
    slug: item.slug,
    judul: item.judul,
    sektor: item.sektor ?? '',
    nilai: item.nilai ?? '',
    status: item.status,
    thumbnail: resolveImageUrl(item.thumbnail),
    wilayah: item.wilayah ?? undefined,
    excerpt: item.excerpt ?? undefined,
  }
}

export async function fetchProyekList(params: {
  lang?: ApiLocale
  q?: string
  status?: string
  sektor_id?: number | string
  sektor?: string
  market_id?: number | string
  kab_kota_id?: number | string
  page?: number
  perPage?: number
} = {}) {
  const res = await apiGetSafe<ApiProyekItem[]>(API_V3.proyek.index, {
    lang: params.lang ?? 'id',
    query: {
      q: params.q,
      status: params.status,
      sektor_id: params.sektor_id,
      sektor: params.sektor,
      market_id: params.market_id,
      kab_kota_id: params.kab_kota_id,
      page: params.page,
      per_page: params.perPage ?? 24,
    },
    next: { revalidate: 180 },
  })
  if (!res) return { data: [] as Array<PeluangInvestasi & { slug: string }>, meta: null as ApiMeta | null }
  return { data: res.data.map(mapProyek), meta: res.meta ?? null }
}

export async function fetchProyekBySlug(slug: string, lang: ApiLocale = 'id') {
  const res = await apiGetSafe<ApiProyekItem>(API_V3.proyek.show(slug), {
    lang,
    next: { revalidate: 180 },
  })
  if (!res) return null
  const fileKajian = res.data.fileKajian
    ? resolveImageUrl(res.data.fileKajian)
    : null
  return {
    ...mapProyek(res.data),
    detail: res.data,
    foto: resolveImageList(res.data.foto),
    fileKajian: fileKajian && fileKajian !== DEFAULT_IMAGE ? fileKajian : null,
    urlVideo: res.data.urlVideo ?? null,
    lat: res.data.lat ?? null,
    lng: res.data.lng ?? null,
  }
}

export async function fetchSektorList(lang: ApiLocale = 'id'): Promise<Sektor[]> {
  const res = await apiGetSafe<Array<{ id: number; nama: string; icon: string | null; total: number }>>(
    API_V3.proyek.sektor,
    { lang, next: { revalidate: 600 } },
  )
  return (
    res?.data.map((s) => ({
      id: s.id,
      nama: s.nama,
      icon: s.icon ?? '',
      total: s.total,
    })) ?? []
  )
}

export async function fetchMarkets(lang: ApiLocale = 'id') {
  const res = await apiGetSafe<Array<{ id: number; nama: string; status: string }>>(
    API_V3.proyek.markets,
    { lang, next: { revalidate: 600 } },
  )
  return res?.data ?? []
}

/* ─── Lahan ─── */

export interface ApiLahanItem {
  id: number
  slug: string
  nama: string
  wilayah: string | null
  kelurahan: string | null
  kecamatan: string | null
  luas: string | null
  skema: string[]
  status: LahanItem['status']
  thumbnail: string | null
  foto?: string[]
  deskripsi?: string | null
  legalitas?: string | null
  kondisiEksisting?: string | null
  peruntukan?: string | null
  akses?: string | null
  air?: string | null
  listrik?: string | null
  alamat?: string | null
  mapsUrl?: string | null
  lat?: number | null
  lng?: number | null
  namaPic?: string | null
  noTelpPic?: string | null
  fotoDenah?: string | null
}

function mapLahan(item: ApiLahanItem): LahanItem {
  return {
    id: item.id,
    slug: item.slug,
    nama: item.nama,
    wilayah: item.wilayah ?? '',
    kelurahan: item.kelurahan ?? '',
    kecamatan: item.kecamatan ?? '',
    luas: item.luas ?? '0',
    skema: (item.skema ?? []) as LahanItem['skema'],
    status: item.status,
    thumbnail: resolveImageUrl(item.thumbnail),
    foto: resolveImageList(item.foto ?? [item.thumbnail]),
    deskripsi: item.deskripsi ?? '',
    legalitas: item.legalitas ?? '',
    kondisiEksisting: item.kondisiEksisting ?? '',
    peruntukan: item.peruntukan ?? '',
    akses: item.akses ?? '',
    air: item.air ?? '',
    listrik: item.listrik ?? '',
    lat: item.lat ?? 0,
    lng: item.lng ?? 0,
    namaPic: item.namaPic ?? undefined,
    noTelpPic: item.noTelpPic ?? undefined,
  }
}

export async function fetchLahanList(params: {
  lang?: ApiLocale
  q?: string
  wilayah?: string
  kab_kota_id?: number | string
  skema?: string
  status?: string
  page?: number
  perPage?: number
} = {}) {
  const res = await apiGetSafe<ApiLahanItem[]>(API_V3.lahan.index, {
    lang: params.lang ?? 'id',
    query: {
      q: params.q,
      wilayah: params.wilayah,
      kab_kota_id: params.kab_kota_id,
      skema: params.skema,
      status: params.status,
      page: params.page,
      per_page: params.perPage ?? 24,
    },
    next: { revalidate: 180 },
  })
  if (!res) return { data: [] as LahanItem[], meta: null as ApiMeta | null }
  return { data: res.data.map(mapLahan), meta: res.meta ?? null }
}

export async function fetchLahanBySlug(slug: string, lang: ApiLocale = 'id') {
  const res = await apiGetSafe<ApiLahanItem>(API_V3.lahan.show(slug), {
    lang,
    next: { revalidate: 180 },
  })
  return res ? mapLahan(res.data) : null
}

export async function fetchAllLahanSlugs(lang: ApiLocale = 'id') {
  const { data } = await fetchLahanList({ lang, perPage: 50 })
  return data.map((item) => item.slug)
}

export async function submitLahanMinat(
  slug: string,
  payload: { nama: string; no_wa: string; turnstile_token?: string },
) {
  return apiPost<{ id: number; lahan_id: number; nama: string; message: string }>(
    API_V3.lahan.minat(slug),
    payload,
  )
}

/* ─── Profil / FAQ / Produk / Wilayah ─── */

export async function fetchProfilJateng(lang: ApiLocale = 'id') {
  return apiGetSafe<{
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
  }>(API_V3.profilJateng, { lang, next: { revalidate: 600 } })
}

export interface ApiProfilKabkotaDetail {
  id: number
  slug: string
  nama: string
  kab_kota_id: number | null
  foto: string | null
  icon: string | null
  profil: string | null
  desc: string | null
  stats: Array<{ label: string; value: string | null }>
  infrastruktur: string[]
  tenaga_kerja: {
    pencari_kerja: {
      laki_laki: number
      perempuan: number
      lulusan_sma_smk: number
      lulusan_dibawah_sma_smk: number
      lulusan_sarjana: number
      jurusan_terbanyak: string | null
    } | null
    potensi_lulusan: {
      laki_laki: number
      perempuan: number
      total: number
    } | null
    top_jurusan: string[]
  } | null
  proyeks: Array<{
    id: number
    slug: string
    judul: string
    sektor: string | null
    excerpt: string | null
    thumbnail: string | null
    status: string | null
  }>
}

export async function fetchProfilKabkota(slug: string, lang: ApiLocale = 'id') {
  return apiGetSafe<ApiProfilKabkotaDetail>(API_V3.profilKabkota(slug), {
    lang,
    next: { revalidate: 300 },
  })
}

export async function fetchFaq(lang: ApiLocale = 'id') {
  return apiGetSafe<
    Array<{
      id: number
      nama: string
      items: Array<{ id: number; question: string; answer: string }>
    }>
  >(API_V3.faq, { lang, next: { revalidate: 600 } })
}

export type ApiDokumenItem = {
  id: number
  title: string
  slug: string
  excerpt: string | null
  thumbnail: string | null
  file_pdf: string | null
  file_video: string | null
  has_pdf: boolean
  has_video: boolean
  type: string
  published_at: string | null
}

export type ApiDokumenDetail = ApiDokumenItem & {
  description: string | null
}

export async function fetchDokumenList(params: {
  lang?: ApiLocale
  q?: string
  page?: number
  perPage?: number
} = {}) {
  const res = await apiGetSafe<ApiDokumenItem[]>(API_V3.dokumen.index, {
    lang: params.lang ?? 'id',
    query: {
      q: params.q,
      page: params.page,
      per_page: params.perPage ?? 9,
    },
    next: { revalidate: 300 },
  })

  if (!res) {
    return { data: [] as ApiDokumenItem[], meta: null as ApiMeta | null }
  }

  return { data: res.data, meta: res.meta ?? null }
}

export async function fetchDokumenBySlug(slug: string, lang: ApiLocale = 'id') {
  return apiGetSafe<ApiDokumenDetail>(API_V3.dokumen.show(slug), {
    lang,
    next: { revalidate: 300 },
  })
}

export interface ApiProdukItem {
  id: number
  slug: string
  judul: string
  seller: string | null
  description: string | null
  thumbnail: string | null
  gallery?: string[]
}

export async function fetchProdukList(params: {
  lang?: ApiLocale
  q?: string
  page?: number
  perPage?: number
} = {}) {
  const res = await apiGetSafe<ApiProdukItem[]>(API_V3.produk.index, {
    lang: params.lang ?? 'id',
    query: { q: params.q, page: params.page, per_page: params.perPage ?? 24 },
    next: { revalidate: 300 },
  })
  if (!res) return { data: [] as ApiProdukItem[], meta: null as ApiMeta | null }
  return {
    data: res.data.map((p) => ({
      ...p,
      thumbnail: resolveImageUrl(p.thumbnail),
      gallery: resolveImageList(p.gallery),
    })),
    meta: res.meta ?? null,
  }
}

export async function fetchProdukBySlug(slug: string, lang: ApiLocale = 'id') {
  const res = await apiGetSafe<ApiProdukItem>(API_V3.produk.show(slug), {
    lang,
    next: { revalidate: 300 },
  })
  if (!res) return null
  return {
    ...res.data,
    thumbnail: resolveImageUrl(res.data.thumbnail),
    gallery: resolveImageList(res.data.gallery),
  }
}

export function isKabupatenKotaName(nama: string | null | undefined): boolean {
  if (!nama) return false
  const n = nama.trim().toLowerCase()
  return n !== 'jawa tengah' && !n.startsWith('provinsi')
}

export async function fetchKabKota(lang: ApiLocale = 'id') {
  const res = await apiGetSafe<Array<{ id: number; nama: string; lat: number | null; lng: number | null }>>(
    API_V3.wilayah.kabkota,
    { lang, next: { revalidate: 600 } },
  )
  return (res?.data ?? []).filter((item) => isKabupatenKotaName(item.nama))
}

/* ─── Auth / Forms ─── */

export async function registerApi(payload: {
  name: string
  email: string
  password: string
  password_confirmation: string
  turnstile_token?: string
  device_name?: string
}) {
  return apiPost<{
    token: string
    token_type: string
    user: { id: number; name: string; email: string }
    message?: string
  }>(API_V3.auth.register, payload)
}

export async function loginApi(payload: {
  email: string
  password: string
  turnstile_token?: string
  device_name?: string
}) {
  return apiPost<{ token: string; token_type: string; user: { id: number; name: string; email: string } }>(
    API_V3.auth.login,
    payload,
  )
}

export async function fetchMe(token: string) {
  return apiGet<{ id: number; name: string; email: string; jabatan?: string; no_hp?: string }>(
    API_V3.auth.me,
    { token },
  )
}

export async function logoutApi(token: string) {
  return apiPost<{ message: string }>(API_V3.auth.logout, undefined, { token })
}

export async function submitKepeminatan(payload: Record<string, unknown>) {
  return apiPost<{
    id: number
    message: string
    investor: { user_id: number; name: string; email: string; reused: boolean }
  }>(API_V3.kepeminatan, payload)
}

export async function submitSinida(formData: FormData, token: string) {
  return apiPostForm<{ id: number; message: string }>(
    API_V3.sinida.permohonan,
    formData,
    { token },
  )
}

/* ─── Footer ─── */

export interface ApiFooterPayload {
  alamat: string
  email: string
  contact: string
  copyright: string
  links: Array<{ name: string; url: string; desc?: string | null }>
  medsos: Array<{ name?: string; label?: string; url?: string; href?: string }>
  partners: Array<{ id: number; name: string; url: string; logo: string | null }>
  cta: {
    title: string
    description: string
    button_label: string
    button_href: string
  }
}

export async function fetchFooter(lang: ApiLocale = 'id') {
  return apiGetSafe<ApiFooterPayload>(API_V3.footer, {
    lang,
    next: { revalidate: 300 },
  })
}

/* ─── Infografis SIDIKERJO ─── */

export type ApiSidikerjoChartSeries = {
  name: string
  data: number[]
  color: string
}

export type ApiSidikerjoBarChart = {
  title: string
  type: 'bar' | 'column'
  categories: string[]
  series: ApiSidikerjoChartSeries[]
  source?: { label: string; url: string }
}

export type ApiSidikerjoPieChart = {
  title: string
  type: 'pie'
  slices: Array<{ name: string; value: number; percentage: number; color: string }>
}

export type ApiInfografisSidikerjoPayload = {
  years: { nib: number[]; perusahaan: number[] }
  selected: { tahun_nib: number | null; tahun_perusahaan: number | null }
  perusahaan_nib: ApiSidikerjoBarChart
  perusahaan_loker: ApiSidikerjoBarChart
  tenaga_kerja: {
    jenis_kelamin: ApiSidikerjoBarChart
    pendidikan: ApiSidikerjoBarChart
    pie_jenis_kelamin: ApiSidikerjoPieChart
    pie_pendidikan: ApiSidikerjoPieChart
  }
  dapodik: ApiSidikerjoBarChart
  bkk: ApiSidikerjoBarChart
}

export async function fetchInfografisSidikerjo(
  options: {
    lang?: ApiLocale
    tahunNib?: number | null
    tahunPerusahaan?: number | null
    cache?: RequestCache
  } = {},
) {
  const { lang = 'id', tahunNib, tahunPerusahaan, cache } = options
  return apiGetSafe<ApiInfografisSidikerjoPayload>(API_V3.infografisSidikerjo, {
    lang,
    query: {
      tahun_nib: tahunNib ?? undefined,
      tahun_perusahaan: tahunPerusahaan ?? undefined,
    },
    cache,
    next: cache ? undefined : { revalidate: 300 },
  })
}

/* ─── Peta Investasi ─── */

export type ApiPetaMarker = {
  id: number
  nama: string
  lat: number
  lng: number
  slug?: string | null
  nilai?: string | null
  luas_lahan?: string | null
  npv?: string | null
  irr?: string | null
  bc_ratio?: string | null
  wilayah?: string | null
  market?: string | null
  thumbnail?: string | null
  cp_nama?: string | null
  cp_email?: string | null
  href?: string | null
  jenis?: string | null
  total?: number
  status_pm?: string
  laki?: number
  perempuan?: number
  total_laki?: number
  total_perempuan?: number
  total_potensi?: number
  kode_kabkota?: string | null
  satuan?: string | null
  tahun?: number | null
  bps_kode?: string | null
  komoditi?: Array<{ nama: string; value: string | number }>
}

export type ApiPetaInvestasiPayload = {
  center: [number, number]
  zoom: number
  max_zoom: number
  assets_base: string
  geojson: {
    provinsi: string
    kabkota: string
    kecamatan: string
    jalan_provinsi: string
  }
  layers: {
    proyek_siap: ApiPetaMarker[]
    proyek_prospektif: ApiPetaMarker[]
    proyek_potensial: ApiPetaMarker[]
    proyek_strategis: ApiPetaMarker[]
    kawasan: ApiPetaMarker[]
    pma: ApiPetaMarker[]
    pmdn: ApiPetaMarker[]
    pencaker: ApiPetaMarker[]
    kelulusan: ApiPetaMarker[]
    jembatan: ApiPetaMarker[]
    holtikultura: ApiPetaMarker[]
    tanaman_pangan: ApiPetaMarker[]
    peternakan: ApiPetaMarker[]
    perkebunan: ApiPetaMarker[]
    perikanan: ApiPetaMarker[]
  }
  meta: {
    markets: Array<{ market_id: number; key: string; label: string; icon: string }>
    jembatan_available?: boolean
  }
}

export async function fetchPetaInvestasi(lang: ApiLocale = 'id') {
  return apiGetSafe<ApiPetaInvestasiPayload>(API_V3.petaInvestasi, {
    lang,
    next: { revalidate: 300 },
  })
}

/* ─── helpers ─── */

function formatDate(value: string | null | undefined): string {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
