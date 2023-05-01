const jsonfile = require('jsonfile')
const path = require('path')

const file = path.join(process.cwd(), 'data/positions.json')
export default function handler(req, res) {
  const { positionId } = req.query

  switch (req.method) {
    case 'GET':
      if (positionId) {
        jsonfile.readFile(file, 'utf-8', (err, data) => {
          if (err) {
            throw err
          }
          // find position from id
          let position = data?.find((position) => position.id === positionId)

          if (position) {
            // send JSON object
            res.status(200).json(position)
          } else {
            // position not found
            res.status(404).end()
          }
        })
      }
      break
    case 'PUT':
      let editPosition = req.body

      jsonfile.readFile(file, 'utf-8', (err, data) => {
        if (err) {
          throw err
        }
        // find index of position to update
        const index = data.findIndex((p) => p.id === positionId)

        // if index is found replace data with updated position
        if (index !== -1) {
          data[index] = editPosition
        } else {
          // position not found
          return res.status(500).end()
        }

        // write updated JSON to file
        jsonfile.writeFile(file, data, { spaces: 4 }, (err) => {
          if (err) {
            throw err
          }
          console.log('JSON data is saved.')
        })
      })
      res.status(200).json({
        success: true,
        data: editPosition,
      })
      break
    case 'DELETE':
      jsonfile.readFile(file, 'utf-8', (err, data) => {
        if (err) {
          throw err
        }
        // find position from id
        const index = data.findIndex((p) => p.positionId === positionId)
        data.splice(index, 1)

        // write updated JSON to file
        jsonfile.writeFile(file, data, { spaces: 4 }, (err) => {
          if (err) {
            throw err
          }
          console.log('JSON data is saved.')
        })
      })
      res.status(204).end()
      break
    default: // Method not allowed
      res.status(405).end()
      break
  }
}
