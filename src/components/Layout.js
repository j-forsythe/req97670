import React from 'react'

const Layout = ({ children }) => {
  return (
    <>
      <header className="container mx-auto  items-center justify-between font-mono text-sm lg:flex">
        <h1 className={`mb-3 text-2xl font-semibold`}>
          Software Development Department
        </h1>
      </header>
      <main className="container mx-auto">{children}</main>
    </>
  )
}

export default Layout
