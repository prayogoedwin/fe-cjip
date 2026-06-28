import { Navbar } from '@/components/layout/Navbar'

export default function MapLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
