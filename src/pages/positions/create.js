import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import PositionForm from '@/components/PositionForm'

const NewPosition = () => {
  const [hasError, setHasError] = useState(false)
  const [positionAdded, setPositionAdded] = useState(false)
  const router = useRouter()

  // send new position data to API
  const createPosition = (values) => {
    fetch('/api/positions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data)
        // inform position added successfully
        setPositionAdded(true)
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
      <h2>New Position</h2>
      <PositionForm
        handleSubmit={createPosition}
        submitSuccess={positionAdded}
        submitError={hasError}
        reportingId={router.query.rId}
      />
    </>
  )
}

export default NewPosition
