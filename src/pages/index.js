import Image from 'next/image'
import { Inter } from 'next/font/google'
import dynamic from 'next/dynamic'
const OrgChart = dynamic(() => import('@/components/OrgChart'), { ssr: false })

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <section
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <h2 className={`m-0 max-w-[30ch] text-sm opacity-50`}>
        Organizational Chart
      </h2>
      <OrgChart />
    </section>
  )
}
