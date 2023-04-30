import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import EmployeeForm from '@/components/EmployeeForm'

const NewEmployee = () => {
  const [hasError, setHasError] = useState(false)
  const [employeeAdded, setEmployeeAdded] = useState(false)
  const router = useRouter()

  // send new employee data to API
  const createEmployee = (values) => {
    fetch('/api/employees', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data)
        // inform user employee added successfully
        setEmployeeAdded(true)
        router.push('/')
      })
      .catch((error) => {
        console.error('Error:', error)
        setHasError(true)
      })
  }

  return (
    <>
      <Link href="/">&lt;&nbsp;Back</Link>
      <h1>New Employee</h1>
      <EmployeeForm
        handleSubmit={createEmployee}
        submitSuccess={employeeAdded}
        submitError={hasError}
      />
    </>
  )
}

export default NewEmployee
