import React from 'react'
import dynamic from 'next/dynamic'
import { EmployeeContextProvider } from '@/utils/EmployeeContext'

const OrgChart = dynamic(() => import('@/components/OrgChart'), { ssr: false })

export default function Home() {
  return (
    <EmployeeContextProvider>
      <section className={`flex flex-col items-center org-chart`}>
        <h2 className="mb-8">Organizational Chart</h2>
        <OrgChart />
      </section>
    </EmployeeContextProvider>
  )
}
