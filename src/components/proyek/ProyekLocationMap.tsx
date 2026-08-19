'use client'

import 'leaflet/dist/leaflet.css'
import { useEffect, useRef, useState } from 'react'
import type { Layer, Map as LeafletMap } from 'leaflet'
import { fetchPetaInvestasi } from '@/lib/api'

type OverlayKey = 'kabkota' | 'kecamatan' | 'jalan_provinsi'

const OVERLAYS: { key: OverlayKey; label: string }[] = [
  { key: 'kabkota', label: 'Batas Kabupaten/Kota' },
  { key: 'kecamatan', label: 'Batas Kecamatan' },
  { key: 'jalan_provinsi', label: 'Jalan Provinsi' },
]

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

function toSameOriginGeojson(url: string) {
  try {
    const parsed = new URL(url)
    if (parsed.pathname.startsWith('/map/')) return parsed.pathname
  } catch {
    /* ignore */
  }
  return url
}

interface ProyekLocationMapProps {
  lat: number | null
  lng: number | null
  nama: string
  thumbnail?: string | null
}

export function ProyekLocationMap({ lat, lng, nama, thumbnail }: ProyekLocationMapProps) {
  const mapElRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<LeafletMap | null>(null)
  const overlayRefs = useRef<Partial<Record<OverlayKey, Layer>>>({})
  const [active, setActive] = useState<Set<OverlayKey>>(new Set())
  const [error, setError] = useState('')

  useEffect(() => {
    if (!mapElRef.current || lat == null || lng == null) return
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) return

    let disposed = false

    ;(async () => {
      const L = (await import('leaflet')).default
      if (disposed || !mapElRef.current) return

      const DefaultIcon = L.Icon.Default as typeof L.Icon.Default & {
        prototype: { _getIconUrl?: string }
      }
      delete DefaultIcon.prototype._getIconUrl
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
      })

      const osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap',
      })
      const hybrid = L.tileLayer('https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}', {
        attribution: 'Google Hybrid',
      })

      const map = L.map(mapElRef.current, {
        center: [lat, lng],
        zoom: 14,
        layers: [osm],
      })

      L.control.layers({ OpenStreetMap: osm, 'Google Hybrid': hybrid }).addTo(map)

      let popup = `<b>${nama}</b>`
      if (thumbnail) {
        popup += `<br><img src="${thumbnail}" alt="" style="width:100%;height:auto;margin-top:8px;border-radius:8px">`
      }
      L.marker([lat, lng]).addTo(map).bindPopup(popup)

      mapRef.current = map
      setTimeout(() => map.invalidateSize(), 80)
    })()

    return () => {
      disposed = true
      mapRef.current?.remove()
      mapRef.current = null
      overlayRefs.current = {}
    }
  }, [lat, lng, nama, thumbnail])

  async function toggleOverlay(key: OverlayKey) {
    const map = mapRef.current
    if (!map) return

    if (active.has(key)) {
      const layer = overlayRefs.current[key]
      if (layer) map.removeLayer(layer)
      setActive((prev) => {
        const next = new Set(prev)
        next.delete(key)
        return next
      })
      return
    }

    try {
      setError('')
      const L = (await import('leaflet')).default
      let layer = overlayRefs.current[key]
      if (!layer) {
        const peta = await fetchPetaInvestasi()
        const url = peta?.data.geojson[key]
        if (!url) throw new Error('Layer tidak tersedia')
        const res = await fetch(toSameOriginGeojson(url))
        if (!res.ok) throw new Error(`Gagal memuat layer (${res.status})`)
        const geo = parseMapGeoJson(await res.text())
        const styles: Record<OverlayKey, Record<string, unknown>> = {
          kabkota: { color: '#166534', weight: 2, fillOpacity: 0.04 },
          kecamatan: { color: '#ca8a04', weight: 1.5, fillOpacity: 0.03 },
          jalan_provinsi: { color: '#dc2626', weight: 2 },
        }
        layer = L.geoJSON(geo as never, { style: () => styles[key] })
        overlayRefs.current[key] = layer
      }
      layer.addTo(map)
      setActive((prev) => new Set(prev).add(key))
    } catch {
      setError('Gagal memuat layer peta.')
    }
  }

  if (lat == null || lng == null || !Number.isFinite(lat) || !Number.isFinite(lng)) {
    return (
      <p className="py-10 text-center text-sm text-neutral-400">Lokasi proyek belum tersedia.</p>
    )
  }

  return (
    <div className="flex flex-col gap-4 md:flex-row">
      <aside className="w-full shrink-0 md:w-56">
        <ul className="space-y-2">
          {OVERLAYS.map((item) => {
            const on = active.has(item.key)
            return (
              <li key={item.key}>
                <button
                  type="button"
                  onClick={() => void toggleOverlay(item.key)}
                  className={`flex w-full items-center rounded-lg border px-3 py-2 text-left text-sm font-medium transition duration-300 ${
                    on
                      ? 'border-brand-500 bg-brand-50 text-brand-700'
                      : 'border-brand-100 text-neutral-600 hover:border-brand-300 hover:text-brand-700'
                  }`}
                >
                  {item.label}
                </button>
              </li>
            )
          })}
        </ul>
        {error ? <p className="mt-2 text-xs text-red-500">{error}</p> : null}
      </aside>
      <div ref={mapElRef} className="h-[420px] w-full overflow-hidden rounded-xl border border-brand-100 md:h-[560px]" />
    </div>
  )
}
