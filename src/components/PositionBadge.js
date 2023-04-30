import React from 'react'

const PositionBadge = ({ employee, position }) => {
  const filled = !!employee
  const { title, id: position_id } = position
  const { firstName, lastName, id: employeeId } = employee || {}
  return (
    <dl className="rounded-md border-2 border-emerald-900 max-w-fit inline-block">
      <dt>
        {title} {position_id}
      </dt>
      <dd></dd>
      {filled ? (
        <>
          <dd>
            {firstName} {lastName}
          </dd>
          <dd>{employeeId}</dd>
        </>
      ) : (
        <dd>
          <strong>vacant</strong>
        </dd>
      )}
    </dl>
  )
}

export default PositionBadge
