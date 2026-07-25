import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Container } from '@/components/ui/Container'
import { SafeImage } from '@/components/ui/SafeImage'
import { createPageMetadata } from '@/lib/page-metadata'
import { fetchProfilKabkota } from '@/lib/api'
import { resolveImageUrl } from '@/lib/images'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const res = await fetchProfilKabkota(slug)
  const data = res?.data
  if (!data) {
    return createPageMetadata('Profil Wilayah', 'Detail profil kabupaten/kota Jawa Tengah')
  }
  return createPageMetadata(
    data.nama,
    data.desc ? data.desc.replace(/<[^>]+>/g, '').slice(0, 160) : `Profil ${data.nama}`,
  )
}

export default async function DetailKabkotaPage({ params }: PageProps) {
  const { slug } = await params
  const res = await fetchProfilKabkota(slug)
  const data = res?.data
  if (!data) notFound()

  const stats = (data.stats ?? []).filter((s) => s.value)
  const pencaker = data.tenaga_kerja?.pencari_kerja
  const proyeks = data.proyeks ?? []

  return (
    <>
      <div className="mt-[68px] bg-gradient-to-b from-brand-50 to-white pb-10">
        <div className="px-6 pt-10 pb-6 text-center md:pt-14">
          <Container>
            <div className="mb-4 flex items-center justify-center gap-2 text-[0.8rem] text-neutral-500">
              <Link href="/" className="transition duration-300 hover:text-brand-500">
                Beranda
              </Link>
              <span aria-hidden="true">›</span>
              <Link href="/profil-jateng" className="transition duration-300 hover:text-brand-500">
                Profil Jateng
              </Link>
              <span aria-hidden="true">›</span>
              <span className="text-brand-900">{data.nama}</span>
            </div>
            <h1 className="mx-auto max-w-3xl text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-tight text-brand-900">
              {data.nama}
            </h1>
            <div className="mx-auto mt-4 h-1.5 w-20 rounded-full bg-brand-500" aria-hidden="true" />
          </Container>
        </div>

        <Container>
          <div className="relative mx-auto max-w-5xl overflow-hidden rounded-2xl border-4 border-white shadow-lg md:rounded-3xl md:border-8">
            <div className="relative aspect-[16/9] w-full md:aspect-[2/1]">
              <SafeImage
                src={resolveImageUrl(data.foto)}
                alt={data.nama}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 1024px"
              />
            </div>
          </div>
        </Container>
      </div>

      <section className="px-6 pb-16">
        <Container>
          <div className="mx-auto max-w-5xl space-y-10">
            <div>
              <h2 className="mb-3 text-lg font-bold text-brand-900">Latar Belakang</h2>
              {data.desc ? (
                <div
                  className="text-[0.95rem] leading-relaxed text-neutral-600 [&_p]:mb-3 [&_p:last-child]:mb-0"
                  dangerouslySetInnerHTML={{ __html: data.desc }}
                />
              ) : (
                <p className="text-neutral-400">Data latar belakang kosong</p>
              )}
            </div>

            <div className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm">
              <table className="w-full text-left text-sm">
                <tbody>
                  {stats.map((row) => (
                    <tr key={row.label} className="border-t border-brand-50 first:border-t-0">
                      <th className="w-[38%] px-5 py-3.5 align-top font-semibold text-brand-900">
                        {row.label}
                      </th>
                      <td className="px-2 py-3.5 text-neutral-400">:</td>
                      <td className="px-5 py-3.5 text-neutral-700">{row.value}</td>
                    </tr>
                  ))}
                  {data.infrastruktur?.length ? (
                    <tr className="border-t border-brand-50">
                      <th className="px-5 py-3.5 align-top font-semibold text-brand-900">
                        Infrastruktur
                      </th>
                      <td className="px-2 py-3.5 text-neutral-400">:</td>
                      <td className="px-5 py-3.5 text-neutral-700">
                        <ul className="list-disc space-y-1 pl-4">
                          {data.infrastruktur.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      </td>
                    </tr>
                  ) : null}
                  {pencaker ? (
                    <tr className="border-t border-brand-50">
                      <th className="px-5 py-3.5 align-top font-semibold text-brand-900">
                        Ketersediaan Tenaga Kerja
                      </th>
                      <td className="px-2 py-3.5 text-neutral-400">:</td>
                      <td className="px-5 py-3.5 text-neutral-700">
                        <ul className="space-y-1 text-sm">
                          <li>Laki-laki: {pencaker.laki_laki.toLocaleString('id-ID')}</li>
                          <li>Perempuan: {pencaker.perempuan.toLocaleString('id-ID')}</li>
                          <li>Lulusan SMA/SMK: {pencaker.lulusan_sma_smk.toLocaleString('id-ID')}</li>
                          <li>
                            Lulusan di bawah SMA/SMK:{' '}
                            {pencaker.lulusan_dibawah_sma_smk.toLocaleString('id-ID')}
                          </li>
                          <li>Lulusan Sarjana: {pencaker.lulusan_sarjana.toLocaleString('id-ID')}</li>
                          {pencaker.jurusan_terbanyak ? (
                            <li>5 Jurusan Terbanyak: {pencaker.jurusan_terbanyak}</li>
                          ) : null}
                        </ul>
                      </td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            </div>

            <div>
              <h2 className="mb-5 text-xl font-bold text-brand-900">Proyek di Wilayah Ini</h2>
              {proyeks.length === 0 ? (
                <p className="rounded-xl border border-dashed border-brand-200 bg-white px-6 py-12 text-center text-neutral-400">
                  Data proyek kosong
                </p>
              ) : (
                <div className="grid gap-5 md:grid-cols-2">
                  {proyeks.map((proyek) => (
                    <article
                      key={proyek.id}
                      className="overflow-hidden rounded-2xl border border-brand-100 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <div className="relative h-44 bg-brand-50">
                        <SafeImage
                          src={resolveImageUrl(proyek.thumbnail)}
                          alt={proyek.judul}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                      <div className="p-5">
                        {proyek.sektor ? (
                          <span className="mb-2 inline-block rounded-full bg-brand-100 px-2.5 py-0.5 text-[0.7rem] font-bold tracking-wide text-brand-700 uppercase">
                            {proyek.sektor}
                          </span>
                        ) : null}
                        <h3 className="mb-2 text-[0.95rem] font-semibold text-brand-900">
                          {proyek.judul}
                        </h3>
                        {proyek.excerpt ? (
                          <p className="mb-3 line-clamp-3 text-sm leading-relaxed text-neutral-600">
                            {proyek.excerpt}
                          </p>
                        ) : null}
                        {proyek.slug ? (
                          <Link
                            href={`/peluang-investasi/${proyek.slug}`}
                            className="text-sm font-semibold text-brand-500 hover:underline"
                          >
                            Detail →
                          </Link>
                        ) : null}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </div>

            <div className="pt-2 text-center">
              <Link
                href="/profil-jateng"
                className="inline-block text-sm font-semibold text-brand-500 transition duration-300 hover:text-brand-600"
              >
                ← Kembali ke Profil Jateng
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
