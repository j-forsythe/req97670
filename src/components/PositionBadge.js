import React from 'react'

const PositionBadge = ({ employee, position }) => {
  const filled = employee
  const { title, id: position_id } = position
  const { first_name, last_name, id: employee_id } = employee
  return (
    <dl>
      <dt>{title}</dt>
      <dd>{position_id}</dd>
      {filled ? (
        <>
          <dd>
            {first_name} {last_name}
          </dd>
          <dd>{employee_id}</dd>
        </>
      ) : (
        'vacant'
      )}
    </dl>
  )
}

export default PositionBadge
