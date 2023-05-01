import React, { useState, useEffect } from 'react'
import EmployeeForm from '@/components/EmployeeForm'
import Link from 'next/link'
import { useRouter } from 'next/router'

const EditEmployee = () => {
  const router = useRouter()
  const { employeeId } = router.query
  const [data, setData] = useState(null)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [employeeUpdated, setEmployeeUpdated] = useState(false)

  // send updated employee data
  const updateEmployee = (values) => {
    fetch(`/api/employees/${employeeId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data)
        // if call is successful update state to inform user
        setEmployeeUpdated(true)
        router.push('/employees')
      })
      .catch((error) => {
        console.error('Error:', error)
        setHasError(true)
      })
  }

  // fetch employee data on render to pre-populate form
  useEffect(() => {
    setLoading(true)
    if (employeeId) {
      fetch(`/api/employees/${employeeId}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data)
        })
        .catch((error) => console.error(error))
    }
    setLoading(false)
  }, [employeeId])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No employee data</p>

  return (
    <>
      <div className="flex  my-4">
        <Link href="/employees">&lt;&nbsp;Back</Link>
        <h2 className="basis-full text-center">
          {' '}
          Editing {data.firstName} {data.lastName}
        </h2>
      </div>
      <EmployeeForm
        employeeData={data}
        submitSuccess={employeeUpdated}
        handleSubmit={updateEmployee}
        submitError={hasError}
      />
    </>
  )
}

export default EditEmployee
