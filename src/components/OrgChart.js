import React from 'react'
import { Tree, TreeNode } from 'react-organizational-chart'

import { flatToTree } from '../utils/flatToTree'
import positions from '../../data/positions.json'
const OrgChart = () => {
  const data = positions
  const { nodes, roots, leaves } = flatToTree(data, 'id', 'reports_to', 0)

  function renderLeaves(node) {
    return node.children.length > 0
      ? node.children.map((leaf) => (
          <TreeNode label={<div>{leaf.title}</div>} key={leaf.id}>
            {renderLeaves(leaf)}
          </TreeNode>
        ))
      : null
  }

  return (
    <Tree label={<div>{roots[1].title}</div>}>
      {roots[1].children.map((node) => (
        <TreeNode label={<div>{node.title}</div>} key={node.id}>
          {renderLeaves(node)}
        </TreeNode>
      ))}
    </Tree>
  )
}

export default OrgChart
