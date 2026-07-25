'use client'

import 'leaflet/dist/leaflet.css'
import 'leaflet.markercluster/dist/MarkerCluster.css'
import 'leaflet.markercluster/dist/MarkerCluster.Default.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import type { Map as LeafletMap, Layer, LayerGroup } from 'leaflet'
import Image from 'next/image'
import {
  fetchPetaInvestasi,
  type ApiPetaInvestasiPayload,
  type ApiPetaMarker,
} from '@/lib/api'
import { resolveImageUrl } from '@/lib/images'

type LayerKey =
  | 'kabkota'
  | 'kecamatan'
  | 'jalan_provinsi'
  | 'jembatan'
  | 'proyek_siap'
  | 'proyek_strategis'
  | 'proyek_prospektif'
  | 'proyek_potensial'
  | 'kawasan'
  | 'pencaker'
  | 'kelulusan'
  | 'pma'
  | 'pmdn'
  | 'holtikultura'
  | 'tanaman_pangan'
  | 'peternakan'
  | 'perkebunan'
  | 'perikanan'

type SidebarItem = {
  key: LayerKey
  label: string
  icon: string
  heavy?: boolean
  disabled?: boolean
}

type SidebarGroup = {
  title: string
  items: SidebarItem[]
}

function mapAsset(path: string) {
  return `/map/${path}`
}

function toSameOriginGeojson(url: string) {
  try {
    const parsed = new URL(url)
    if (parsed.pathname.startsWith('/map/')) return parsed.pathname
  } catch {
    /* ignore */
  }
  return url
}

/** Some legacy map assets use `.geojson` but contain `var name = {...}` JS wrappers. */
function parseMapGeoJson(text: string): unknown {
  const trimmed = text.trim()
  if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
    return JSON.parse(trimmed)
  }

  const wrapped = trimmed.match(/^var\s+\w+\s*=\s*([\s\S]+?);?\s*$/)
  if (wrapped?.[1]) {
    return JSON.parse(wrapped[1])
  }

  throw new Error('Format peta tidak valid.')
}

async function fetchMapGeoJson(path: string): Promise<unknown> {
  const res = await fetch(path)
  if (!res.ok) throw new Error(`Gagal memuat layer (${res.status})`)
  return parseMapGeoJson(await res.text())
}

function escapeHtml(value: unknown) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function proyekPopup(m: ApiPetaMarker) {
  const img = m.thumbnail
    ? `<img src="${escapeHtml(resolveImageUrl(m.thumbnail))}" alt="" style="width:100%;height:120px;object-fit:cover;border-radius:8px;margin-bottom:8px" />`
    : ''
  return `
    <div style="min-width:220px;max-width:280px;font-family:system-ui,sans-serif">
      ${img}
      <strong style="display:block;margin-bottom:6px;color:#1A6324">${escapeHtml(m.nama)}</strong>
      <div style="font-size:12px;color:#555;line-height:1.5">
        ${m.wilayah ? `<div>Wilayah: ${escapeHtml(m.wilayah)}</div>` : ''}
        ${m.nilai ? `<div>Nilai: ${escapeHtml(m.nilai)}</div>` : ''}
        ${m.luas_lahan ? `<div>Luas: ${escapeHtml(m.luas_lahan)}</div>` : ''}
      </div>
      <div style="display:flex;gap:8px;margin-top:10px">
        ${m.href ? `<a href="${escapeHtml(m.href)}" style="font-size:12px;font-weight:700;color:#1A6324">Detail</a>` : ''}
        <a href="https://www.google.com/maps/search/?api=1&query=${m.lat},${m.lng}" target="_blank" rel="noopener noreferrer" style="font-size:12px;color:#2563eb">Google Maps</a>
      </div>
    </div>
  `
}

function kawasanPopup(m: ApiPetaMarker) {
  const img = m.thumbnail
    ? `<img src="${escapeHtml(resolveImageUrl(m.thumbnail))}" alt="" style="width:100%;height:120px;object-fit:cover;border-radius:8px;margin-bottom:8px" />`
    : ''
  return `
    <div style="min-width:220px;max-width:280px;font-family:system-ui,sans-serif">
      ${img}
      <strong style="display:block;margin-bottom:6px;color:#1A6324">${escapeHtml(m.nama)}</strong>
      ${m.jenis ? `<div style="font-size:12px;color:#555">${escapeHtml(m.jenis)}</div>` : ''}
      <div style="display:flex;gap:8px;margin-top:10px">
        ${m.href ? `<a href="${escapeHtml(m.href)}" style="font-size:12px;font-weight:700;color:#1A6324">Detail</a>` : ''}
        <a href="https://www.google.com/maps/search/?api=1&query=${m.lat},${m.lng}" target="_blank" rel="noopener noreferrer" style="font-size:12px;color:#2563eb">Google Maps</a>
      </div>
    </div>
  `
}

function komoditasPopup(m: ApiPetaMarker) {
  const lines = [
    m.tahun ? `Tahun ${m.tahun}` : '',
    ...(m.komoditi ?? []).map(
      (item) => `${item.nama}: ${item.value}${m.satuan ? ` ${m.satuan}` : ''}`,
    ),
  ].filter(Boolean)

  return simplePopup(m.nama, lines)
}

function simplePopup(title: string, lines: string[], href?: string | null) {
  return `
    <div style="min-width:180px;font-family:system-ui,sans-serif">
      <strong style="display:block;margin-bottom:6px;color:#1A6324">${escapeHtml(title)}</strong>
      <div style="font-size:12px;color:#555;line-height:1.5">
        ${lines.map((l) => `<div>${escapeHtml(l)}</div>`).join('')}
      </div>
      ${href ? `<a href="${escapeHtml(href)}" target="_blank" rel="noopener noreferrer" style="display:inline-block;margin-top:8px;font-size:12px;color:#2563eb">Lihat sumber</a>` : ''}
    </div>
  `
}

export function PetaInvestasiContent() {
  const mapElRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<LeafletMap | null>(null)
  const layerRefs = useRef<Partial<Record<LayerKey, Layer | LayerGroup>>>({})
  const geoCache = useRef<Partial<Record<string, unknown>>>({})
  const [data, setData] = useState<ApiPetaInvestasiPayload | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [active, setActive] = useState<Set<LayerKey>>(new Set())
  const [busyLayer, setBusyLayer] = useState<LayerKey | null>(null)

  const groups: SidebarGroup[] = useMemo(
    () => [
      {
        title: 'Batas Administrasi',
        items: [
          { key: 'kabkota', label: 'Batas Kabupaten/Kota', icon: mapAsset('map.png') },
          { key: 'kecamatan', label: 'Batas Kecamatan', icon: mapAsset('kec.png'), heavy: true },
        ],
      },
      {
        title: 'Proyek Investasi',
        items: [
          { key: 'proyek_siap', label: 'Proyek Siap Ditawarkan', icon: mapAsset('1.png') },
          { key: 'proyek_strategis', label: 'Proyek Strategis Nasional', icon: mapAsset('4.png') },
          { key: 'proyek_prospektif', label: 'Proyek Prospektif', icon: mapAsset('2.png') },
          { key: 'proyek_potensial', label: 'Proyek Potensial', icon: mapAsset('3.png') },
        ],
      },
      {
        title: 'Kawasan Industri',
        items: [{ key: 'kawasan', label: 'Kawasan Industri', icon: mapAsset('ki.png') }],
      },
      {
        title: 'Tenaga Kerja',
        items: [
          { key: 'pencaker', label: 'Tenaga Kerja', icon: mapAsset('tenaga-kerja.png') },
          { key: 'kelulusan', label: 'Potensi Kelulusan', icon: mapAsset('potensi_tenaga_kerja_new.png') },
        ],
      },
      {
        title: 'Perusahaan',
        items: [
          { key: 'pma', label: 'PMA', icon: mapAsset('pma.png') },
          { key: 'pmdn', label: 'PMDN', icon: mapAsset('pmdn.png') },
        ],
      },
      {
        title: 'Infrastruktur',
        items: [
          {
            key: 'jembatan',
            label: 'Jembatan Provinsi',
            icon: mapAsset('jembatan.png'),
            disabled: data?.meta?.jembatan_available === false,
          },
          { key: 'jalan_provinsi', label: 'Jalan Provinsi', icon: mapAsset('jalan.png'), heavy: true },
        ],
      },
      {
        title: 'Komoditas',
        items: [
          { key: 'holtikultura', label: 'Holtikultura', icon: mapAsset('holtikultura.png') },
          { key: 'tanaman_pangan', label: 'Tanaman Pangan', icon: mapAsset('tanaman_pangan.png') },
          { key: 'peternakan', label: 'Peternakan', icon: mapAsset('peternakan.png') },
          { key: 'perkebunan', label: 'Perkebunan', icon: mapAsset('perkebunan.png') },
          { key: 'perikanan', label: 'Perikanan', icon: mapAsset('perikanan.png') },
        ],
      },
    ],
    [data?.meta?.jembatan_available],
  )

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError('')
      const res = await fetchPetaInvestasi()
      if (cancelled) return
      if (!res?.data) {
        setError('Gagal memuat data peta. Pastikan API Laravel berjalan.')
        setLoading(false)
        return
      }
      setData(res.data)
      setLoading(false)
    })()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!data || !mapElRef.current || mapRef.current) return

    let disposed = false
    const osmLayerRef: { current: Layer | null } = { current: null }
    const hybridLayerRef: { current: Layer | null } = { current: null }

    ;(async () => {
      const L = (await import('leaflet')).default
      await import('leaflet.markercluster')

      if (disposed || !mapElRef.current) return

      const map = L.map(mapElRef.current, {
        maxZoom: data.max_zoom,
        zoomControl: true,
      }).setView(data.center, data.zoom)

      const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: data.max_zoom,
        attribution: '&copy; OpenStreetMap',
      }).addTo(map)

      const hybrid = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        maxZoom: data.max_zoom,
        attribution: 'Google Hybrid',
      })

      osmLayerRef.current = osm
      hybridLayerRef.current = hybrid
      mapRef.current = map

      try {
        const geo = await fetchMapGeoJson(toSameOriginGeojson(data.geojson.provinsi))
        L.geoJSON(geo as never, {
          style: {
            color: '#111',
            weight: 2,
            fillOpacity: 0.02,
          },
          onEachFeature(feature, layer) {
            const name = feature.properties?.PROVINSI || feature.properties?.provinsi || 'Jawa Tengah'
            layer.bindPopup(String(name))
          },
        }).addTo(map)
      } catch {
        /* province outline optional */
      }

      ;(map as LeafletMap & { __basemap?: { osm: Layer; hybrid: Layer } }).__basemap = {
        osm,
        hybrid,
      }

      L.control
        .layers(
          { OpenStreetMap: osm, 'Google Hybrid': hybrid },
          {},
          { position: 'topright' },
        )
        .addTo(map)
    })()

    return () => {
      disposed = true
      mapRef.current?.remove()
      mapRef.current = null
      layerRefs.current = {}
    }
  }, [data])

  async function ensureMarkerLayer(key: LayerKey, markers: ApiPetaMarker[], iconUrl: string, popupFn: (m: ApiPetaMarker) => string) {
    if (layerRefs.current[key]) return layerRefs.current[key]!
    const L = (await import('leaflet')).default
    await import('leaflet.markercluster')

    const icon = L.icon({
      iconUrl,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
      popupAnchor: [0, -36],
    })

    const cluster = (
      L as typeof L & { markerClusterGroup: (o?: object) => LayerGroup }
    ).markerClusterGroup({
      spiderfyOnMaxZoom: true,
      showCoverageOnHover: false,
      zoomToBoundsOnClick: true,
    })

    for (const m of markers) {
      if (!Number.isFinite(m.lat) || !Number.isFinite(m.lng)) continue
      const marker = L.marker([m.lat, m.lng], { icon })
      marker.bindPopup(popupFn(m), { maxWidth: 300 })
      cluster.addLayer(marker)
    }

    if (cluster.getLayers().length === 0) return cluster

    layerRefs.current[key] = cluster
    return cluster
  }

  async function ensureGeoLayer(
    key: LayerKey,
    url: string,
    style: Record<string, unknown>,
    nameKeys: string[],
  ) {
    if (layerRefs.current[key]) return layerRefs.current[key]!
    const L = (await import('leaflet')).default
    const path = toSameOriginGeojson(url)
    let geo = geoCache.current[path]
    if (!geo) {
      geo = await fetchMapGeoJson(path)
      geoCache.current[path] = geo
    }

    const layer = L.geoJSON(geo as never, {
      style: () => style,
      onEachFeature(feature, lyr) {
        const props = feature.properties || {}
        const name =
          nameKeys.map((k) => props[k]).find((v) => typeof v === 'string' && v) || key
        lyr.bindPopup(String(name))
      },
    })
    layerRefs.current[key] = layer
    return layer
  }

  async function toggleLayer(key: LayerKey) {
    const map = mapRef.current
    if (!map || !data) return

    const disabledItem = groups.flatMap((g) => g.items).find((i) => i.key === key)
    if (disabledItem?.disabled) {
      setError('Data jembatan provinsi belum tersedia.')
      return
    }

    if (active.has(key)) {
      const layer = layerRefs.current[key]
      if (layer && map.hasLayer(layer)) map.removeLayer(layer)
      setActive((prev) => {
        const next = new Set(prev)
        next.delete(key)
        return next
      })
      return
    }

    setBusyLayer(key)
    try {
      let layer: Layer | LayerGroup | undefined

      switch (key) {
        case 'kabkota':
          layer = await ensureGeoLayer(
            key,
            data.geojson.kabkota,
            { color: '#6b7280', weight: 1, fillColor: '#9ca3af', fillOpacity: 0.08 },
            ['dak_nkab', 'KABKOTA', 'nama'],
          )
          break
        case 'kecamatan':
          layer = await ensureGeoLayer(
            key,
            data.geojson.kecamatan,
            { color: '#2563eb', weight: 1, fillOpacity: 0.03 },
            ['kecamatan', 'KECAMATAN', 'nama'],
          )
          break
        case 'jalan_provinsi':
          layer = await ensureGeoLayer(
            key,
            data.geojson.jalan_provinsi,
            { color: '#eab308', weight: 2.5 },
            ['Nm_Ruas', 'nama', 'NAMA'],
          )
          break
        case 'jembatan':
          setError('Data jembatan provinsi belum tersedia.')
          return
        case 'proyek_siap':
          layer = await ensureMarkerLayer(key, data.layers.proyek_siap, mapAsset('1.png'), proyekPopup)
          break
        case 'proyek_strategis':
          layer = await ensureMarkerLayer(key, data.layers.proyek_strategis, mapAsset('4.png'), proyekPopup)
          break
        case 'proyek_prospektif':
          layer = await ensureMarkerLayer(key, data.layers.proyek_prospektif, mapAsset('2.png'), proyekPopup)
          break
        case 'proyek_potensial':
          layer = await ensureMarkerLayer(key, data.layers.proyek_potensial, mapAsset('3.png'), proyekPopup)
          break
        case 'kawasan':
          layer = await ensureMarkerLayer(key, data.layers.kawasan, mapAsset('ki.png'), kawasanPopup)
          break
        case 'pma':
          layer = await ensureMarkerLayer(key, data.layers.pma, mapAsset('pma.png'), (m) =>
            simplePopup(m.nama, [`Total PMA: ${m.total ?? 0}`]),
          )
          break
        case 'pmdn':
          layer = await ensureMarkerLayer(key, data.layers.pmdn, mapAsset('pmdn.png'), (m) =>
            simplePopup(m.nama, [`Total PMDN: ${m.total ?? 0}`]),
          )
          break
        case 'pencaker':
          layer = await ensureMarkerLayer(key, data.layers.pencaker, mapAsset('tenaga-kerja.png'), (m) =>
            simplePopup(m.nama, [
              `Total: ${(m.total ?? 0).toLocaleString('id-ID')}`,
              `Laki-laki: ${(m.laki ?? 0).toLocaleString('id-ID')}`,
              `Perempuan: ${(m.perempuan ?? 0).toLocaleString('id-ID')}`,
            ], m.href),
          )
          break
        case 'kelulusan':
          layer = await ensureMarkerLayer(
            key,
            data.layers.kelulusan,
            mapAsset('potensi_tenaga_kerja_new.png'),
            (m) =>
              simplePopup(m.nama, [
                `Potensi: ${(m.total_potensi ?? 0).toLocaleString('id-ID')}`,
                `Laki-laki: ${(m.total_laki ?? 0).toLocaleString('id-ID')}`,
                `Perempuan: ${(m.total_perempuan ?? 0).toLocaleString('id-ID')}`,
              ]),
          )
          break
        case 'holtikultura':
          layer = await ensureMarkerLayer(
            key,
            data.layers.holtikultura,
            mapAsset('holtikultura.png'),
            komoditasPopup,
          )
          break
        case 'tanaman_pangan':
          layer = await ensureMarkerLayer(
            key,
            data.layers.tanaman_pangan,
            mapAsset('tanaman_pangan.png'),
            komoditasPopup,
          )
          break
        case 'peternakan':
          layer = await ensureMarkerLayer(
            key,
            data.layers.peternakan,
            mapAsset('peternakan.png'),
            komoditasPopup,
          )
          break
        case 'perkebunan':
          layer = await ensureMarkerLayer(
            key,
            data.layers.perkebunan,
            mapAsset('perkebunan.png'),
            komoditasPopup,
          )
          break
        case 'perikanan':
          layer = await ensureMarkerLayer(
            key,
            data.layers.perikanan,
            mapAsset('perikanan.png'),
            komoditasPopup,
          )
          break
      }

      if (layer) {
        const markerCount =
          'getLayers' in layer && typeof layer.getLayers === 'function'
            ? (layer as LayerGroup).getLayers().length
            : 1
        if (markerCount === 0) {
          setError('Data layer ini belum tersedia.')
          return
        }
        map.addLayer(layer)
        setActive((prev) => new Set(prev).add(key))
        setError('')
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memuat layer')
    } finally {
      setBusyLayer(null)
    }
  }

  return (
    <div className="mt-[68px] flex h-[calc(100vh-68px)]">
      <aside
        className={`${
          sidebarOpen ? 'w-72' : 'w-0'
        } shrink-0 overflow-hidden border-r border-brand-100 bg-white transition-all duration-300`}
      >
        <div className="flex h-full w-72 flex-col">
          <div className="border-b border-gray-100 px-4 py-4">
            <div className="flex items-center gap-3">
              <Image
                src="https://cjip.jatengprov.go.id/images/cjip.png"
                alt="CJIP"
                width={36}
                height={36}
                className="h-9 w-9 shrink-0"
              />
              <div>
                <h2 className="text-base font-bold text-gray-900">Peta Investasi Jawa Tengah</h2>
              </div>
            </div>
          </div>

          <div className="custom-scrollbar flex-1 overflow-y-auto px-4 py-4">
            {groups.map((group) => (
              <div key={group.title} className="mb-1">
                <div className="mt-4 mb-2 flex items-center text-xs font-bold tracking-wider text-gray-400 uppercase first:mt-0">
                  {group.title}
                  <div className="ml-3 grow border-t border-gray-100" />
                </div>
                <ul className="space-y-1.5">
                  {group.items.map((item) => {
                    const isOn = active.has(item.key)
                    const isBusy = busyLayer === item.key
                    return (
                      <li key={item.key}>
                        <button
                          type="button"
                          disabled={loading || isBusy || item.disabled}
                          onClick={() => void toggleLayer(item.key)}
                          className={`group flex w-full items-center rounded-xl border px-3 py-2.5 text-left text-sm transition-all duration-200 ${
                            item.disabled
                              ? 'cursor-not-allowed border-transparent text-gray-400 opacity-60'
                              : isOn
                                ? 'border-yellow-200 bg-yellow-50 text-yellow-700 shadow-sm'
                                : 'border-transparent text-gray-700 hover:border-yellow-200 hover:bg-yellow-50 hover:text-yellow-600 hover:shadow-sm'
                          } disabled:opacity-60`}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={item.icon}
                            alt=""
                            className="h-5 w-5 object-contain transition-transform duration-200 group-hover:scale-110"
                          />
                          <span className="mx-3 flex-1 text-sm font-semibold">
                            {item.label}
                            {item.heavy && isBusy ? (
                              <span className="ml-1 text-[10px] font-normal text-gray-400">memuat…</span>
                            ) : null}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <div className="relative flex-1">
        {!sidebarOpen && (
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="absolute top-4 left-4 z-[1000] rounded-lg border border-brand-100 bg-white px-3 py-2 text-sm shadow-sm hover:bg-brand-50"
          >
            Layer
          </button>
        )}

        {loading ? (
          <div className="absolute inset-0 z-[900] flex items-center justify-center bg-brand-50/80 text-sm text-brand-800">
            Memuat peta investasi…
          </div>
        ) : null}

        {error ? (
          <div className="absolute top-4 right-4 z-[1000] max-w-sm rounded-lg border border-red-200 bg-white px-3 py-2 text-xs text-red-600 shadow">
            {error}
          </div>
        ) : null}

        <div ref={mapElRef} className="h-full w-full bg-brand-50" />
      </div>
    </div>
  )
}
