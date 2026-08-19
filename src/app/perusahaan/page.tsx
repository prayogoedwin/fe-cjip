import Link from 'next/link'
import { fetchDashboard } from '@/lib/api/perusahaan-server'
import { PageHeader, PanelCard, PrimaryButton, SecondaryButton } from '@/components/perusahaan/ui'

const cards = [
  {
    href: '/perusahaan/kepeminatan',
    title: 'Kepeminatan',
    countKey: 'kepeminatan_count' as const,
    desc: 'Kelola minat investasi dan kontak proyek yang Anda ajukan.',
  },
  {
    href: '/perusahaan/kemitraan',
    title: 'Kemitraan',
    countKey: 'produk_saya_count' as const,
    desc: 'Jelajahi produk mitra dan kelola produk perusahaan Anda.',
  },
  {
    href: '/perusahaan/permohonan-insentif',
    title: 'Permohonan Insentif',
    countKey: 'sinida_count' as const,
    desc: 'Ajukan dan pantau status permohonan insentif (SINIDA).',
  },
]

export default async function PerusahaanDashboardPage() {
  const res = await fetchDashboard()
  const data = res?.data
  const name = data?.user?.name || data?.user?.email || 'Pengguna'
  const initial = name.charAt(0).toUpperCase()

  return (
    <div>
      <PageHeader title="Dashboard" breadcrumbs="Perusahaan > Dashboard" />

      <PanelCard className="mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-brand-500 text-lg font-bold text-white">
              {data?.user?.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={data.user.avatar} alt="" className="h-full w-full object-cover" />
              ) : (
                initial
              )}
            </div>
            <div>
              <p className="font-semibold text-brand-900">Selamat datang, {name}</p>
              <p className="text-sm text-content-muted">
                {data?.perusahaan?.nama_perusahaan
                  ? `${data.perusahaan.nama_perusahaan}${data.perusahaan.nib ? ` · NIB ${data.perusahaan.nib}` : ''}`
                  : 'Lengkapi profil perusahaan Anda untuk mulai mengajukan layanan.'}
              </p>
            </div>
          </div>
          <Link href="/perusahaan/profil">
            <SecondaryButton>Lihat Profil</SecondaryButton>
          </Link>
        </div>
      </PanelCard>

      <div className="grid gap-4 md:grid-cols-3">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="group">
            <PanelCard className="h-full transition group-hover:border-brand-500 group-hover:shadow-md">
              <div className="mb-4 flex h-28 items-end justify-between rounded-lg bg-gradient-to-br from-brand-900 to-brand-500 p-4">
                <span className="text-sm font-semibold text-white">{card.title}</span>
                <span className="text-2xl font-bold text-white">
                  {data?.[card.countKey] ?? 0}
                </span>
              </div>
              <h2 className="mb-1 text-base font-bold text-brand-900">{card.title}</h2>
              <p className="text-sm text-content-muted">{card.desc}</p>
            </PanelCard>
          </Link>
        ))}
      </div>

      <div className="mt-6">
        <Link href="/perusahaan/permohonan-insentif/create">
          <PrimaryButton>+ Buat Permohonan Insentif</PrimaryButton>
        </Link>
      </div>
    </div>
  )
}
