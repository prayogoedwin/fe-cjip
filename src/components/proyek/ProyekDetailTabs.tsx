'use client'

import { useState } from 'react'
import { SafeHtml } from '@/components/ui/SafeHtml'
import { sanitizeHtml } from '@/lib/sanitize-html'
import { SafeImage } from '@/components/ui/SafeImage'
import { ProyekLocationMap } from '@/components/proyek/ProyekLocationMap'
import type { ApiProyekItem } from '@/lib/api'

type TabId = 'ringkasan' | 'ekonomi' | 'kontak' | 'galeri' | 'kajian' | 'lokasi'

const TABS: { id: TabId; label: string }[] = [
  { id: 'ringkasan', label: 'Ringkasan' },
  { id: 'ekonomi', label: 'Aspek Ekonomi' },
  { id: 'kontak', label: 'Kontak' },
  { id: 'galeri', label: 'Galeri' },
  { id: 'kajian', label: 'File Kajian' },
  { id: 'lokasi', label: 'Lokasi Proyek' },
]

const HTML_CLASS =
  'text-sm leading-relaxed text-neutral-700 [&_p]:mb-2 [&_p:last-child]:mb-0 [&_br]:block [&_strong]:font-semibold [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5'

function isFilled(value?: string | number | null): boolean {
  if (value == null) return false
  const text = String(value)
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .trim()
  return text.length > 0
}

function dash(value?: string | number | null) {
  return isFilled(value) ? String(value) : '—'
}

function InfoTable({
  rows,
}: {
  rows: Array<{ label: string; value?: string | null; html?: boolean }>
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-brand-100">
      <table className="min-w-full divide-y divide-brand-100">
        <tbody className="divide-y divide-brand-50 bg-white">
          {rows.map((row) => (
            <tr key={row.label} className="align-top">
              <td className="w-[38%] px-4 py-3 text-sm font-semibold text-brand-900 md:w-52 md:px-6 md:py-4">
                {row.label}
              </td>
              <td className="w-4 px-0 py-3 text-sm text-neutral-400 md:py-4">:</td>
              <td className="px-4 py-3 md:px-6 md:py-4">
                {row.html && isFilled(row.value) ? (
                  <div
                    className={HTML_CLASS}
                    dangerouslySetInnerHTML={{ __html: sanitizeHtml(row.value as string) }}
                  />
                ) : (
                  <span className="text-sm text-neutral-700">{dash(row.value)}</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

interface ProyekDetailTabsProps {
  judul: string
  wilayah?: string
  nilai?: string
  thumbnail?: string
  foto: string[]
  fileKajian?: string | null
  urlVideo?: string | null
  lat?: number | null
  lng?: number | null
  detail: ApiProyekItem
}

export function ProyekDetailTabs({
  judul,
  wilayah,
  nilai,
  thumbnail,
  foto,
  fileKajian,
  urlVideo,
  lat,
  lng,
  detail,
}: ProyekDetailTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId>('ringkasan')
  const gallery = foto.filter(Boolean)
  const hpEmail = [detail.kontak?.hp, detail.kontak?.email].filter(Boolean).join(' / ')

  return (
    <div className="overflow-hidden rounded-2xl border border-brand-100 bg-white">
      <div className="grid grid-cols-2 gap-2 bg-brand-50 p-2 sm:grid-cols-3 lg:grid-cols-6">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-lg px-3 py-2.5 text-sm font-semibold whitespace-nowrap ring-1 ring-brand-500 transition duration-300 ${
                isActive
                  ? 'bg-brand-500 text-white'
                  : 'bg-transparent text-neutral-500 hover:text-brand-600'
              }`}
            >
              {tab.label}
            </button>
          )
        })}
      </div>

      <div className="p-4 md:p-6">
        {activeTab === 'ringkasan' ? (
          <InfoTable
            rows={[
              { label: 'Nilai Investasi', value: nilai || detail.nilai },
              { label: 'Skema Investasi', value: detail.skemaInvestasi, html: true },
              { label: 'Kondisi Saat Ini', value: detail.eksisting, html: true },
              { label: 'Ruang Lingkup Proyek', value: detail.lingkupPekerjaan, html: true },
              { label: 'Ketersediaan Pasar', value: detail.ketersediaanPasar, html: true },
              { label: 'Luas Lahan', value: detail.luasLahan, html: true },
              { label: 'Sumber Air', value: detail.sumberAir, html: true },
              { label: 'Kelistrikan', value: detail.kelistrikan, html: true },
              { label: 'Telekomunikasi', value: detail.telekomunikasi, html: true },
              { label: 'Jaringan Jalan', value: detail.jaringanJalan, html: true },
            ]}
          />
        ) : null}

        {activeTab === 'ekonomi' ? (
          <InfoTable
            rows={[
              { label: 'Npv', value: detail.npv, html: true },
              { label: 'Irr', value: detail.irr, html: true },
              { label: 'Bc Ratio', value: detail.bcRatio, html: true },
              { label: 'Payback Period', value: detail.playbackPeriod, html: true },
            ]}
          />
        ) : null}

        {activeTab === 'kontak' ? (
          <InfoTable
            rows={[
              { label: 'Nama Pic', value: detail.kontak?.nama },
              { label: 'Nama Instansi', value: wilayah },
              { label: 'Alamat Instansi', value: detail.kontak?.alamat },
              { label: 'Hp/Email', value: hpEmail || undefined },
            ]}
          />
        ) : null}

        {activeTab === 'galeri' ? (
          <div className="space-y-6">
            {gallery.length > 0 ? (
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
                {gallery.map((src, index) => (
                  <a
                    key={`${src}-${index}`}
                    href={src}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative aspect-video overflow-hidden rounded-xl border border-brand-100"
                  >
                    <SafeImage
                      src={src}
                      alt={`${judul} — foto ${index + 1}`}
                      fill
                      className="object-cover transition duration-500 hover:scale-105"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  </a>
                ))}
              </div>
            ) : (
              <p className="py-10 text-center text-sm text-neutral-400">Galeri belum tersedia.</p>
            )}
            {urlVideo ? (
              <div className="overflow-hidden rounded-xl border border-brand-100">
                <iframe
                  src={urlVideo}
                  title={`Video ${judul}`}
                  className="aspect-video h-[360px] w-full md:h-[480px]"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ) : null}
          </div>
        ) : null}

        {activeTab === 'kajian' ? (
          fileKajian ? (
            <iframe
              src={fileKajian}
              title={`File kajian ${judul}`}
              className="h-[600px] w-full rounded-xl border border-brand-100"
            />
          ) : (
            <p className="py-10 text-center text-sm italic text-neutral-400">
              Tidak ada file kajian yang tersedia.
            </p>
          )
        ) : null}

        {activeTab === 'lokasi' ? (
          <ProyekLocationMap lat={lat ?? null} lng={lng ?? null} nama={judul} thumbnail={thumbnail} />
        ) : null}
      </div>
    </div>
  )
}
