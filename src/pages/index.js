import React, { useContext } from 'react'
import { Inter } from 'next/font/google'
import dynamic from 'next/dynamic'
import {
  EmployeeContextProvider,
  EmployeeContext,
} from '@/utils/EmployeeContext'
const OrgChart = dynamic(() => import('@/components/OrgChart'), { ssr: false })

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const employees = useContext(EmployeeContext)

  return (
    <EmployeeContextProvider>
      <section
        className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
      >
        <h2 className="">Organizational Chart</h2>
        <OrgChart />
      </section>
    </EmployeeContextProvider>
  )
}
