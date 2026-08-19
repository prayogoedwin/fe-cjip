'use client'

import { useState } from 'react'
import { SafeHtml } from '@/components/ui/SafeHtml'
import { SafeImage } from '@/components/ui/SafeImage'
import type { KawasanIndustri } from '@/types'

type TabId = 'infra' | 'tenant' | 'foto' | 'video'

const TABS: { id: TabId; label: string }[] = [
  { id: 'infra', label: 'Infrastruktur Industri' },
  { id: 'tenant', label: 'Tenant' },
  { id: 'foto', label: 'Foto' },
  { id: 'video', label: 'Video' },
]

interface KawasanDetailTabsProps {
  kawasan: KawasanIndustri
}

export function KawasanDetailTabs({ kawasan }: KawasanDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>('infra')
  const tenants = kawasan.tenants ?? []
  const fotos = kawasan.foto?.length ? kawasan.foto : [kawasan.thumbnail]

  const infraItems = [
    { title: 'Jaringan Sumber Daya Air', content: kawasan.jaringanSda },
    { title: 'Jaringan Energi Listrik', content: kawasan.jaringanEnergi },
    { title: 'Jaringan Telekomunikasi', content: kawasan.jaringanTelekomunikasi },
  ]

  return (
    <div className="overflow-hidden rounded-2xl border border-brand-100 bg-white">
      <div className="flex gap-1 overflow-x-auto bg-brand-50 p-2">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold whitespace-nowrap transition duration-300 ${
                isActive
                  ? 'bg-white text-brand-500 shadow-sm'
                  : 'text-neutral-500 hover:text-brand-500'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
        {kawasan.urlWebsite ? (
          <a
            href={kawasan.urlWebsite}
            target="_blank"
            rel="noopener noreferrer"
            className="shrink-0 rounded-xl px-4 py-2.5 text-sm font-semibold whitespace-nowrap text-neutral-500 transition duration-300 hover:text-brand-500"
          >
            Website
          </a>
        ) : null}
      </div>

      <div className="p-5 md:p-6">
        {activeTab === 'infra' && (
          <div className="space-y-4">
            {infraItems.map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-brand-100 bg-brand-50/60 p-5"
              >
                <div className="mb-3 flex items-center gap-3">
                  <span className="h-5 w-1.5 rounded-full bg-brand-500" aria-hidden="true" />
                  <h4 className="text-xs font-bold tracking-wider text-brand-500 uppercase">
                    {item.title}
                  </h4>
                </div>
                <SafeHtml
                  html={item.content}
                  fallback="Informasi belum tersedia."
                  className="pl-4 text-sm leading-relaxed text-neutral-600 [&_p]:mb-2 [&_p:last-child]:mb-0 [&_br]:block [&_strong]:font-semibold"
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'tenant' && (
          <div className="overflow-hidden rounded-xl border border-brand-100">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-brand-100">
                <thead className="bg-brand-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-bold text-neutral-500 uppercase">
                      No
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-neutral-500 uppercase">
                      Nama Perusahaan
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-neutral-500 uppercase">
                      Jenis Kegiatan
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-bold text-neutral-500 uppercase">
                      Negara
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-brand-50 bg-white">
                  {tenants.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-10 text-center text-sm text-neutral-400">
                        Belum ada data tenant.
                      </td>
                    </tr>
                  ) : (
                    tenants.map((tenant, index) => (
                      <tr key={`${tenant.nama}-${index}`} className="hover:bg-brand-50/50">
                        <td className="px-4 py-3 text-sm text-neutral-500">{index + 1}</td>
                        <td className="px-4 py-3 text-sm font-semibold text-brand-900">
                          {tenant.nama}
                        </td>
                        <td className="px-4 py-3 text-sm text-neutral-600">{tenant.jenisUsaha}</td>
                        <td className="px-4 py-3">
                          {tenant.negara ? (
                            <span className="inline-flex rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-600">
                              {tenant.negara}
                            </span>
                          ) : (
                            <span className="text-sm text-neutral-400">—</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'foto' && (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
            {fotos.map((src, index) => (
              <div
                key={src}
                className="relative aspect-square overflow-hidden rounded-xl border border-brand-100"
              >
                <SafeImage
                  src={src}
                  alt={`${kawasan.nama} — foto ${index + 1}`}
                  fill
                  className="object-cover transition duration-500 hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
            ))}
          </div>
        )}

        {activeTab === 'video' && (
          <div className="overflow-hidden rounded-2xl border-4 border-brand-50 shadow-sm">
            {kawasan.urlVideo ? (
              <div className="aspect-video">
                <iframe
                  src={kawasan.urlVideo}
                  title={`Video ${kawasan.nama}`}
                  className="h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : (
              <p className="px-4 py-12 text-center text-sm text-neutral-400">
                Video belum tersedia.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
