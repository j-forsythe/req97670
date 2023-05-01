import React, { useState, useEffect } from 'react'
import PositionForm from '@/components/PositionForm'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { EmployeeContextProvider } from '@/utils/EmployeeContext'

const EditPosition = () => {
  const router = useRouter()
  const { positionId } = router.query
  const [data, setData] = useState(null)
  const [hasError, setHasError] = useState(false)
  const [isLoading, setLoading] = useState(false)
  const [positionUpdated, setPositionUpdated] = useState(false)

  // send updated position data
  const updatePosition = (values) => {
    fetch(`/api/positions/${positionId}`, {
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
        setPositionUpdated(true)
        router.push('/')
      })
      .catch((error) => {
        console.error('Error:', error)
        setHasError(true)
      })
  }

  // fetch position data on render to pre-populate form
  useEffect(() => {
    setLoading(true)
    if (positionId) {
      fetch(`/api/positions/${positionId}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data)
        })
        .catch((error) => console.error(error))
    }
    setLoading(false)
  }, [positionId])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No position data</p>

  return (
    <EmployeeContextProvider>
      <div className="flex  my-4">
        <Link href="/">&lt;&nbsp;Back</Link>
        <h2 className="basis-full text-center">
          {' '}
          Editing {data.title} {data.id}
        </h2>
      </div>
      <PositionForm
        positionData={data}
        submitSuccess={positionUpdated}
        handleSubmit={updatePosition}
        submitError={hasError}
      />
    </EmployeeContextProvider>
  )
}

export default EditPosition
