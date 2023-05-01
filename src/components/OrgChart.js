import React, { useEffect, useState, useRef, useContext } from 'react'
import { Tree, TreeNode } from 'react-organizational-chart'

import { flatToTree } from '../utils/flatToTree'
import PositionBadge from './PositionBadge'
import { EmployeeContext } from '@/utils/EmployeeContext'

const OrgChart = () => {
  const [positionTree, setPositionTree] = useState(null)
  const [isLoading, setLoading] = useState(false)
  const positionData = useRef(null)
  const employees = useContext(EmployeeContext)

  function renderLeaves(node) {
    return (
      <TreeNode
        label={
          <PositionBadge
            position={positionData.current.find(
              (position) => position.id === node.id,
            )}
            employee={employees?.find((emp) => emp.id === node.employeeId)}
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
        const { roots } = flatToTree(data, 'id', 'reportsTo', '0')
        setPositionTree(roots)
        setLoading(false)
        // store full list in ref for reference
        positionData.current = data
      })
      .catch((error) => console.error(error))
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!positionTree) return <p>No data</p>

  return (
    <Tree
      label={
        <PositionBadge
          position={positionTree[1]}
          employee={employees?.find(
            (emp) => emp.id === positionTree[1].employeeId,
          )}
        />
      }
    >
      {positionTree[1].children.map((node) => renderLeaves(node))}
    </Tree>
  )
}

export default OrgChart
