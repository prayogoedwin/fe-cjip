import 'server-only'
import {
  apiGetSafe,
} from '@/lib/api/client'
import { API_V3 } from '@/lib/api/routes'
import { getServerAuthToken } from '@/lib/server-auth'

async function withToken() {
  const token = await getServerAuthToken()
  if (!token) return null
  return token
}

export async function fetchDashboard() {
  const token = await withToken()
  if (!token) return null
  return apiGetSafe<{
    kepeminatan_count: number
    produk_saya_count: number
    sinida_count: number
    minat_masuk_count: number
    minat_keluar_count: number
    user: { id: number; name: string; email: string; avatar?: string | null }
    perusahaan: { nib?: string; nama_perusahaan?: string } | null
  }>(API_V3.perusahaan.dashboard, { token, cache: 'no-store' })
}

export async function fetchProfil() {
  const token = await withToken()
  if (!token) return null
  return apiGetSafe<{
    personal: {
      id: number
      name: string
      email: string
      no_hp?: string | null
      jabatan?: string | null
      avatar?: string | null
      two_factor_enabled?: boolean
    }
    perusahaan: Record<string, string | null> | null
  }>(API_V3.perusahaan.profil.show, { token, cache: 'no-store' })
}

export async function fetchProdukList(opts?: { q?: string; page?: number; mine?: boolean }) {
  const token = await withToken()
  if (!token) return null
  const path = opts?.mine ? API_V3.perusahaan.kemitraan.produkSaya : API_V3.perusahaan.kemitraan.produk
  return apiGetSafe<
    Array<{
      id: number
      slug: string
      name: string
      description?: string
      thumbnail?: string | null
      seller?: string | null
      is_active?: boolean
    }>
  >(path, {
    token,
    cache: 'no-store',
    query: { q: opts?.q, page: opts?.page, per_page: 12 },
  })
}

export async function fetchProdukDetail(slug: string, mine = false) {
  const token = await withToken()
  if (!token) return null
  return apiGetSafe<Record<string, unknown>>(API_V3.perusahaan.kemitraan.produkShow(slug), {
    token,
    cache: 'no-store',
    query: mine ? { mine: 1 } : undefined,
  })
}

export async function fetchMinat(arah: 'masuk' | 'keluar', page = 1) {
  const token = await withToken()
  if (!token) return null
  const path =
    arah === 'masuk'
      ? API_V3.perusahaan.kemitraan.minatMasuk
      : API_V3.perusahaan.kemitraan.minatKeluar
  return apiGetSafe<unknown[]>(path, {
    token,
    cache: 'no-store',
    query: { page, per_page: 12 },
  })
}

export async function fetchKepeminatanList(page = 1, q?: string) {
  const token = await withToken()
  if (!token) return null
  return apiGetSafe<
    Array<{
      id: number
      rencana_bidang_usaha?: string
      sektor?: string
      status?: string
      jadwal_proyek?: string
      created_at?: string
    }>
  >(API_V3.perusahaan.kepeminatan.index, {
    token,
    cache: 'no-store',
    query: { page, per_page: 12, q },
  })
}

export async function fetchKepeminatanMeta() {
  const token = await withToken()
  if (!token) return null
  return apiGetSafe<{
    negara: string[]
    kabkota: Array<{ id: number; nama: string }>
    proyek: Array<{ id: number; nama: string }>
    sektor: string[]
  }>(API_V3.perusahaan.kepeminatan.meta, { token, cache: 'no-store' })
}

export async function fetchSinidaList(page = 1) {
  const token = await withToken()
  if (!token) return null
  return apiGetSafe<
    Array<{ id: number; status?: string; created_at?: string }>
  >(API_V3.perusahaan.sinida.index, {
    token,
    cache: 'no-store',
    query: { page, per_page: 12 },
  })
}

export async function fetchJadwalPelatihan(page = 1, q?: string) {
  const token = await withToken()
  if (!token) return null
  return apiGetSafe<unknown[]>(API_V3.perusahaan.jadwalPelatihan, {
    token,
    cache: 'no-store',
    query: { page, per_page: 12, q },
  })
}

export async function fetchLaporMikro() {
  const token = await withToken()
  if (!token) return null
  const [nib, proyek, lapor] = await Promise.all([
    apiGetSafe<{
      found: boolean
      message?: string
      nib?: string
      nama_perusahaan?: string
      proyek_count?: number
    }>(API_V3.perusahaan.laporMikro.nib, { token, cache: 'no-store' }),
    apiGetSafe<unknown[]>(API_V3.perusahaan.laporMikro.proyek, {
      token,
      cache: 'no-store',
      query: { per_page: 12 },
    }),
    apiGetSafe<unknown[]>(API_V3.perusahaan.laporMikro.index, {
      token,
      cache: 'no-store',
      query: { per_page: 12 },
    }),
  ])
  return { nib, proyek, lapor }
}
