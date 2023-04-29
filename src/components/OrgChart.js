import React, { useEffect, useState } from 'react'
import { Tree, TreeNode } from 'react-organizational-chart'

import { flatToTree } from '../utils/flatToTree'
import PositionBadge from './PositionBadge'

const OrgChart = () => {
  const [employees, setEmployees] = useState(null)
  const [positions, setPositions] = useState(null)
  const [isLoading, setLoading] = useState(false)

  function renderLeaves(node) {
    return (
      <TreeNode
        label={
          <PositionBadge
            position={node}
            employee={employees.find((emp) => emp.id === node.employee_id)}
          />
        }
        key={node.id}
      >
        {node.children.length > 0
          ? node.children.map((leaf) => renderLeaves(leaf))
          : null}
      </TreeNode>
    )
  }

  // get all positions on render
  useEffect(() => {
    setLoading(true)
    fetch('/api/positions')
      .then((res) => res.json())
      .then((data) => {
        const { roots } = flatToTree(data, 'id', 'reports_to', 0)
        setPositions(roots)
        setLoading(false)
        // store full list in ref for resets
        // productList.current = data
      })
      .catch((error) => console.error(error))
  }, [])

  // get all employees on render
  useEffect(() => {
    setLoading(true)
    fetch('/api/employees')
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data)
        setLoading(false)
        // store full list in ref for resets
        // productList.current = data
      })
      .catch((error) => console.error(error))
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!positions) return <p>No data</p>

  return (
    <Tree
      label={
        <PositionBadge
          position={positions[1]}
          employee={employees.find(
            (emp) => emp.id === positions[1].employee_id,
          )}
        />
      }
    >
      {positions[1].children.map((node) => renderLeaves(node))}
    </Tree>
  )
}

export default OrgChart
