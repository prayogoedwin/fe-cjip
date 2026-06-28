'use client'

import { useState } from 'react'

const layerGroups = [
  {
    title: 'Batas Administrasi',
    layers: ['Batas Provinsi', 'Batas Kabupaten/Kota', 'Batas Kecamatan'],
  },
  {
    title: 'Proyek Investasi',
    layers: ['Proyek Ditawarkan', 'Proyek Strategis', 'Proyek Prospektif'],
  },
  {
    title: 'Kawasan Industri',
    layers: ['KEK', 'Kawasan BUMN', 'Kawasan Swasta'],
  },
  {
    title: 'Ketenagakerjaan',
    layers: ['Kepadatan TK', 'UMK per Wilayah'],
  },
  {
    title: 'Perusahaan',
    layers: ['Industri Besar', 'UMKM Terdaftar'],
  },
  {
    title: 'Infrastruktur',
    layers: ['Jalan Tol', 'Pelabuhan', 'Bandara', 'Stasiun KA'],
  },
]

export function PetaInvestasiContent() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeLayers, setActiveLayers] = useState<Set<string>>(new Set(['Batas Provinsi']))

  function toggleLayer(layer: string) {
    setActiveLayers((prev) => {
      const next = new Set(prev)
      if (next.has(layer)) next.delete(layer)
      else next.add(layer)
      return next
    })
  }

  return (
    <div className="mt-[68px] flex h-[calc(100vh-68px)]">
      <aside
        className={`${
          sidebarOpen ? 'w-72' : 'w-0'
        } shrink-0 overflow-hidden border-r border-brand-100 bg-white transition-all duration-300`}
      >
        <div className="flex h-full w-72 flex-col">
          <div className="flex items-center justify-between border-b border-brand-100 px-4 py-3">
            <h2 className="font-semibold text-brand-900">Layer Peta</h2>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="text-neutral-400 hover:text-neutral-700"
              aria-label="Tutup sidebar"
            >
              ✕
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            {layerGroups.map((group) => (
              <div key={group.title} className="mb-5">
                <p className="mb-2 text-xs font-bold tracking-widest text-brand-500 uppercase">
                  {group.title}
                </p>
                <ul className="space-y-1">
                  {group.layers.map((layer) => (
                    <li key={layer}>
                      <button
                        type="button"
                        onClick={() => toggleLayer(layer)}
                        className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition duration-300 ${
                          activeLayers.has(layer)
                            ? 'bg-brand-50 text-brand-700'
                            : 'text-neutral-600 hover:bg-neutral-50'
                        }`}
                      >
                        <span
                          className={`h-3 w-3 rounded-sm border ${
                            activeLayers.has(layer)
                              ? 'border-brand-500 bg-brand-500'
                              : 'border-neutral-300'
                          }`}
                        />
                        {layer}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </aside>

      <div className="relative flex flex-1 flex-col">
        {!sidebarOpen && (
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="absolute top-4 left-4 z-10 rounded-lg border border-brand-100 bg-white px-3 py-2 text-sm shadow-sm transition duration-300 hover:bg-brand-50"
          >
            ☰ Layer
          </button>
        )}

        <div className="absolute top-4 right-4 z-10 flex w-72 overflow-hidden rounded-lg border border-brand-100 bg-white shadow-sm">
          <input
            type="search"
            placeholder="Cari lokasi..."
            className="flex-1 px-4 py-2.5 text-sm outline-none"
          />
          <button
            type="button"
            className="bg-brand-500 px-4 text-white transition duration-300 hover:bg-brand-600"
          >
            🔍
          </button>
        </div>

        <div className="absolute right-4 bottom-24 z-10 flex flex-col gap-1">
          {['+', '−', '⛶'].map((ctrl) => (
            <button
              key={ctrl}
              type="button"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-brand-100 bg-white text-sm shadow-sm transition duration-300 hover:bg-brand-50"
            >
              {ctrl}
            </button>
          ))}
        </div>

        <div className="absolute bottom-4 left-4 z-10 rounded-lg border border-brand-100 bg-white p-4 shadow-sm">
          <p className="mb-2 text-xs font-bold text-brand-900">Legenda</p>
          {[
            { color: 'bg-brand-500', label: 'Proyek Aktif' },
            { color: 'bg-amber-500', label: 'Kawasan Industri' },
            { color: 'bg-blue-500', label: 'Infrastruktur' },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-2 text-xs text-neutral-600">
              <span className={`h-3 w-3 rounded-full ${item.color}`} />
              {item.label}
            </div>
          ))}
        </div>

        <div className="flex flex-1 items-center justify-center bg-brand-50">
          <div className="text-center">
            <p className="text-6xl" aria-hidden="true">🗺️</p>
            <h2 className="mt-4 text-xl font-bold text-brand-900">Peta Investasi Jawa Tengah</h2>
            <p className="mt-2 text-sm text-neutral-500">
              Integrasi peta interaktif (Google Maps / Leaflet) akan ditampilkan di sini
            </p>
            <p className="mt-1 text-xs text-neutral-400">
              Layer aktif: {activeLayers.size} layer
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
