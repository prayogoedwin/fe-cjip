'use client'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js'
import { Bar, Line } from 'react-chartjs-2'
import { Container } from '@/components/ui/Container'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { SafeHtml } from '@/components/ui/SafeHtml'
import type { ApiBerandaPayload } from '@/lib/api'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
)

const defaultPertumbuhanData = {
  labels: ['2020', '2021', '2022', '2023', '2024'],
  datasets: [
    {
      label: 'Jawa Tengah',
      data: [-2.65, 3.32, 5.31, 4.98, 4.95],
      backgroundColor: 'rgba(26,99,36,.75)',
      borderColor: '#1A6324',
      borderWidth: 1.5,
      borderRadius: 4,
    },
    {
      label: 'Nasional',
      data: [-2.07, 3.69, 5.31, 5.05, 5.03],
      backgroundColor: 'rgba(91,155,213,.6)',
      borderColor: '#5b9bd5',
      borderWidth: 1.5,
      borderRadius: 4,
    },
  ],
}

const defaultInvestasiData = {
  labels: ['2020', '2021', '2022', '2023', '2024'],
  datasets: [
    {
      label: 'Target',
      data: [50.0, 54.0, 58.0, 63.0, 78.33],
      borderColor: '#e53e3e',
      backgroundColor: 'rgba(229,62,62,.08)',
      borderWidth: 2,
      borderDash: [5, 4],
      pointRadius: 4,
      tension: 0.3,
      fill: false,
    },
    {
      label: 'Realisasi',
      data: [50.0, 52.5, 58.9, 56.1, 88.44],
      borderColor: '#1A6324',
      backgroundColor: 'rgba(26,99,36,.08)',
      borderWidth: 2.5,
      pointRadius: 5,
      pointBackgroundColor: '#1A6324',
      tension: 0.35,
      fill: true,
    },
  ],
}

const chartOptions = {
  responsive: true,
  plugins: {
    legend: { position: 'bottom' as const, labels: { boxWidth: 28 } },
  },
}

export function EconomyCharts({ grafik }: { grafik?: ApiBerandaPayload['grafik'] }) {
  const pe = grafik?.pertumbuhan_ekonomi
  const pi = grafik?.performa_investasi

  const pertumbuhanData = pe?.chart
    ? {
        labels: pe.chart.labels.map(String),
        datasets: [
          {
            ...defaultPertumbuhanData.datasets[0],
            data: pe.chart.jateng,
          },
          {
            ...defaultPertumbuhanData.datasets[1],
            data: pe.chart.nasional,
          },
        ],
      }
    : defaultPertumbuhanData

  const investasiData = pi?.chart
    ? {
        labels: pi.chart.labels.map(String),
        datasets: [
          {
            ...defaultInvestasiData.datasets[0],
            data: pi.chart.target,
          },
          {
            ...defaultInvestasiData.datasets[1],
            data: pi.chart.realisasi,
          },
        ],
      }
    : defaultInvestasiData

  const peTitle = pe?.section?.title || 'Pertumbuhan Ekonomi'
  const peDesc =
    pe?.section?.desc ||
    'Pada tahun 2024, perekonomian Jawa Tengah mencatatkan pertumbuhan sebesar 4,95% (year-on-year), menunjukkan ketahanan ekonomi yang solid di tengah tantangan global.'
  const piTitle = pi?.section?.title || 'Performa Investasi'
  const piDesc =
    pi?.section?.desc ||
    'Jawa Tengah mencatatkan prestasi luar biasa di tahun 2024 dengan total realisasi investasi mencapai Rp88,44 triliun, melampaui target yang ditetapkan.'

  return (
    <section className="bg-white px-6 py-16">
      <Container>
        <SectionHeader label="Ekonomi" title="Performa Ekonomi & Investasi" />
        <div className="mb-14 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h3 className="mb-3 text-xl font-bold text-brand-900">{peTitle}</h3>
            <SafeHtml
              html={peDesc}
              className="text-[0.88rem] leading-relaxed text-content-muted [&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_strong]:text-brand-900"
            />
          </div>
          <div className="rounded-2xl border border-cjip-border bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.05)]">
            <Bar
              data={pertumbuhanData}
              options={{
                ...chartOptions,
                scales: {
                  y: { ticks: { callback: (v) => `${v}%` } },
                  x: { grid: { display: false } },
                },
              }}
            />
          </div>
        </div>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="rounded-2xl border border-cjip-border bg-white p-5 shadow-[0_2px_12px_rgba(0,0,0,0.05)] lg:order-1">
            <Line
              data={investasiData}
              options={{
                ...chartOptions,
                scales: {
                  y: { ticks: { callback: (v) => `Rp${v}T` } },
                  x: { grid: { display: false } },
                },
              }}
            />
          </div>
          <div className="lg:order-2">
            <h3 className="mb-3 text-xl font-bold text-brand-900">{piTitle}</h3>
            <SafeHtml
              html={piDesc}
              className="text-[0.88rem] leading-relaxed text-content-muted [&_p]:mb-2 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_strong]:text-brand-900"
            />
          </div>
        </div>
      </Container>
    </section>
  )
}
