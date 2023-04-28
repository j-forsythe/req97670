import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
   <h2 className={`mb-3 text-2xl font-semibold`}>
           software development department
          </h2>
          <p className={`m-0 max-w-[30ch] text-sm opacity-50`}>
            organizational hierarchy
          </p>
      </div>
    </main>
  )
}
