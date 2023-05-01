import React, { useState } from 'react'
import UnfillPosition from './UnfillPosition'
import Link from 'next/link'

const PositionBadge = ({ employee, position }) => {
  const { title, id: position_id } = position
  const { firstName, lastName, id: employeeId } = employee || {}
  const [selected, setSelected] = useState(false)
  const [filled, setFilled] = useState(!!position.employeeId)
  return (
    <dl
      className="rounded-md border-2 border-emerald-900 max-w-fit inline-block position-badge"
      onClick={() => setSelected(!selected)}
    >
      <dt>
        <strong>
          {title} {position_id}
        </strong>
      </dt>
      <dd></dd>
      {filled ? (
        <>
          <dd>
            {firstName} {lastName}
          </dd>
          <dd>{employeeId}</dd>
          {selected && (
            <UnfillPosition
              position={position}
              onUnfillPosition={() => {
                setFilled(false)
              }}
            />
          )}
        </>
      ) : (
        <>
          <dd>Vacant</dd>
        </>
      )}
      {selected && (
        <div className="flex">
          <Link
            href={`/positions/edit/${position_id}`}
            className=" bg-rose-100 p-2 font-bold rounded hover:bg-gray-600 m-2"
          >
            Edit Position
          </Link>
          <Link
            href={`/positions/create?rId=${position_id}`}
            className=" bg-purple-300 p-2 font-bold rounded hover:bg-gray-600 m-2"
          >
            Add Position
          </Link>
        </div>
      )}
    </dl>
  )
}

export default PositionBadge
