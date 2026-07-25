'use client'

import { useCallback, useMemo, useState, useTransition } from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Bar, Pie } from 'react-chartjs-2'
import {
  fetchInfografisSidikerjo,
  type ApiInfografisSidikerjoPayload,
  type ApiSidikerjoBarChart,
  type ApiSidikerjoPieChart,
} from '@/lib/api'

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Title, Tooltip, Legend)

type MenuKey =
  | 'perusahaanNib'
  | 'perusahaan'
  | 'tenaga_kerja'
  | 'potensi_kelulusan'
  | 'bkk'

const MENUS: Array<{ key: MenuKey; label: string }> = [
  { key: 'perusahaanNib', label: 'Perusahaan' },
  { key: 'perusahaan', label: 'Loker Perusahaan' },
  { key: 'tenaga_kerja', label: 'Ketersediaan Tenaga Kerja' },
  { key: 'potensi_kelulusan', label: 'Potensi Kelulusan' },
  { key: 'bkk', label: 'Bursa Kerja Khusus' },
]

function barOptions(title: string) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' as const, labels: { boxWidth: 14, font: { size: 12 } } },
      title: {
        display: true,
        text: title,
        font: { size: 15, weight: 'bold' as const },
        padding: { bottom: 16 },
      },
      tooltip: {
        callbacks: {
          label(ctx: { dataset: { label?: string }; parsed: { y: number | null } }) {
            const value = ctx.parsed.y ?? 0
            return `${ctx.dataset.label ?? ''}: ${value.toLocaleString('id-ID')}`
          },
        },
      },
    },
    scales: {
      x: {
        ticks: {
          maxRotation: 60,
          minRotation: 45,
          font: { size: 10 },
        },
      },
      y: {
        ticks: {
          callback(value: string | number) {
            return Number(value).toLocaleString('id-ID')
          },
        },
      },
    },
  }
}

function pieOptions(title: string) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom' as const },
      title: {
        display: true,
        text: title,
        font: { size: 15, weight: 'bold' as const },
        padding: { bottom: 16 },
      },
      tooltip: {
        callbacks: {
          label(ctx: { label?: string; parsed: number; dataset: { data: number[] } }) {
            const total = ctx.dataset.data.reduce((a, b) => a + b, 0) || 1
            const pct = Math.round((ctx.parsed / total) * 100)
            return `${ctx.label}: ${ctx.parsed.toLocaleString('id-ID')} (${pct}%)`
          },
        },
      },
    },
  }
}

function toBarData(chart: ApiSidikerjoBarChart) {
  return {
    labels: chart.categories,
    datasets: chart.series.map((s) => ({
      label: s.name,
      data: s.data,
      backgroundColor: s.color,
      borderRadius: 4,
      maxBarThickness: 28,
    })),
  }
}

function toPieData(chart: ApiSidikerjoPieChart) {
  return {
    labels: chart.slices.map((s) => s.name),
    datasets: [
      {
        data: chart.slices.map((s) => s.value),
        backgroundColor: chart.slices.map((s) => s.color),
        borderWidth: 1,
        borderColor: '#fff',
      },
    ],
  }
}

function SourceLink({ source }: { source?: { label: string; url: string } }) {
  if (!source) return null
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="mb-4 inline-flex items-center gap-2 text-sm transition hover:opacity-80"
    >
      <span className="text-neutral-500">Sumber Data:</span>
      <span className="font-bold text-brand-800 hover:text-brand-600">{source.label}</span>
    </a>
  )
}

function ChartCard({ children, tall }: { children: React.ReactNode; tall?: boolean }) {
  return (
    <div
      className={`rounded-xl border border-brand-100 bg-white p-4 shadow-sm ${tall ? 'h-[480px]' : 'h-[420px]'}`}
    >
      {children}
    </div>
  )
}

export function InfografisSidikerjoContent({
  initial,
}: {
  initial: ApiInfografisSidikerjoPayload
}) {
  const [data, setData] = useState(initial)
  const [menu, setMenu] = useState<MenuKey>('perusahaanNib')
  const [tahunNib, setTahunNib] = useState(initial.selected.tahun_nib)
  const [tahunPerusahaan, setTahunPerusahaan] = useState(initial.selected.tahun_perusahaan)
  const [isPending, startTransition] = useTransition()

  const reload = useCallback((nib: number | null, perusahaan: number | null) => {
    startTransition(async () => {
      const res = await fetchInfografisSidikerjo({
        tahunNib: nib,
        tahunPerusahaan: perusahaan,
        cache: 'no-store',
      })
      if (res?.data) setData(res.data)
    })
  }, [])

  const content = useMemo(() => {
    switch (menu) {
      case 'perusahaanNib':
        return (
          <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <SourceLink source={data.perusahaan_nib.source} />
              <label className="flex items-center gap-2 text-sm text-neutral-600">
                Tahun
                <select
                  className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm"
                  value={tahunNib ?? ''}
                  disabled={isPending}
                  onChange={(e) => {
                    const next = e.target.value ? Number(e.target.value) : null
                    setTahunNib(next)
                    reload(next, tahunPerusahaan)
                  }}
                >
                  {data.years.nib.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <ChartCard tall>
              <Bar data={toBarData(data.perusahaan_nib)} options={barOptions(data.perusahaan_nib.title)} />
            </ChartCard>
          </div>
        )
      case 'perusahaan':
        return (
          <div className="space-y-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <SourceLink source={data.perusahaan_loker.source} />
              <label className="flex items-center gap-2 text-sm text-neutral-600">
                Tahun
                <select
                  className="rounded-md border border-neutral-300 px-3 py-1.5 text-sm"
                  value={tahunPerusahaan ?? ''}
                  disabled={isPending}
                  onChange={(e) => {
                    const next = e.target.value ? Number(e.target.value) : null
                    setTahunPerusahaan(next)
                    reload(tahunNib, next)
                  }}
                >
                  {data.years.perusahaan.map((y) => (
                    <option key={y} value={y}>
                      {y}
                    </option>
                  ))}
                </select>
              </label>
            </div>
            <ChartCard>
              <Bar
                data={toBarData(data.perusahaan_loker)}
                options={barOptions(data.perusahaan_loker.title)}
              />
            </ChartCard>
          </div>
        )
      case 'tenaga_kerja':
        return (
          <div className="space-y-6">
            <SourceLink source={data.tenaga_kerja.jenis_kelamin.source} />
            <ChartCard tall>
              <Bar
                data={toBarData(data.tenaga_kerja.jenis_kelamin)}
                options={barOptions(data.tenaga_kerja.jenis_kelamin.title)}
              />
            </ChartCard>
            <ChartCard tall>
              <Bar
                data={toBarData(data.tenaga_kerja.pendidikan)}
                options={barOptions(data.tenaga_kerja.pendidikan.title)}
              />
            </ChartCard>
            <div className="grid gap-6 md:grid-cols-2">
              <ChartCard>
                <Pie
                  data={toPieData(data.tenaga_kerja.pie_jenis_kelamin)}
                  options={pieOptions(data.tenaga_kerja.pie_jenis_kelamin.title)}
                />
              </ChartCard>
              <ChartCard>
                <Pie
                  data={toPieData(data.tenaga_kerja.pie_pendidikan)}
                  options={pieOptions(data.tenaga_kerja.pie_pendidikan.title)}
                />
              </ChartCard>
            </div>
          </div>
        )
      case 'potensi_kelulusan':
        return (
          <div className="space-y-4">
            <SourceLink source={data.dapodik.source} />
            <ChartCard tall>
              <Bar data={toBarData(data.dapodik)} options={barOptions(data.dapodik.title)} />
            </ChartCard>
          </div>
        )
      case 'bkk':
        return (
          <div className="space-y-4">
            <SourceLink source={data.bkk.source} />
            <ChartCard>
              <Bar data={toBarData(data.bkk)} options={barOptions(data.bkk.title)} />
            </ChartCard>
          </div>
        )
      default:
        return null
    }
  }, [menu, data, tahunNib, tahunPerusahaan, isPending, reload])

  return (
    <div>
      <div className="mb-8 flex flex-wrap justify-center gap-2">
        {MENUS.map((item) => {
          const active = menu === item.key
          return (
            <button
              key={item.key}
              type="button"
              onClick={() => setMenu(item.key)}
              className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
                active
                  ? 'bg-brand-600 text-white shadow-md ring-2 ring-brand-600 ring-offset-2'
                  : 'border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50'
              }`}
            >
              {item.label}
            </button>
          )
        })}
      </div>

      <div className={isPending ? 'opacity-60 transition' : 'transition'}>{content}</div>
    </div>
  )
}
