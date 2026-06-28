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

const pertumbuhanData = {
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

const investasiData = {
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

export function EconomyCharts() {
  return (
    <section className="bg-white px-6 py-16">
      <Container>
        <SectionHeader label="Ekonomi" title="Performa Ekonomi & Investasi" />
        <div className="mb-14 grid items-center gap-10 lg:grid-cols-2">
          <div>
            <h3 className="mb-3 text-xl font-bold text-brand-900">Pertumbuhan Ekonomi</h3>
            <p className="text-[0.88rem] leading-relaxed text-content-muted">
              Pada tahun 2024, perekonomian Jawa Tengah mencatatkan pertumbuhan sebesar{' '}
              <strong>4,95%</strong> (year-on-year), menunjukkan ketahanan ekonomi yang solid di
              tengah tantangan global.
            </p>
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
            <h3 className="mb-3 text-xl font-bold text-brand-900">Performa Investasi</h3>
            <p className="text-[0.88rem] leading-relaxed text-content-muted">
              Jawa Tengah mencatatkan prestasi luar biasa di tahun 2024 dengan total realisasi
              investasi mencapai <strong>Rp88,44 triliun</strong>, melampaui target yang ditetapkan.
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
