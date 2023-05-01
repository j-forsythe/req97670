import Link from 'next/link'
import React from 'react'

const Layout = ({ children }) => {
  return (
    <>
      <header className="container mx-auto  items-center justify-between font-mono text-sm lg:flex">
        <h1 className={`mb-3 text-2xl font-semibold`}>
          Software Development Department
        </h1>
        <nav>
          <Link className="mr-12" href="/">
            Home
          </Link>
          <Link href="/employees">Employees</Link>
        </nav>
      </header>
      <main className="container mx-auto  min-h-screen">{children}</main>
    </>
  )
}

export default Layout
