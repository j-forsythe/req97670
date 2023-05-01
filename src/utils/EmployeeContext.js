import React, { createContext, useEffect, useState } from 'react'

export const EmployeeContext = createContext([])

export const EmployeeContextProvider = ({ children }) => {
  const [employees, setEmployees] = useState(null)

  // get all employees on render
  useEffect(() => {
    fetch('/api/employees')
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data)
        // store full list in ref for resets
        // productList.current = data
      })
      .catch((error) => console.error(error))
  }, [])

  return (
    <EmployeeContext.Provider value={employees}>
      {children}
    </EmployeeContext.Provider>
  )
}
