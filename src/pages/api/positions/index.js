const jsonfile = require('jsonfile')
const path = require('path')

const file = path.join(process.cwd(), 'data/positions.json')

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      // read JSON object from file
      jsonfile.readFile(file, 'utf-8', (err, data) => {
        if (err) {
          throw err
        }
        // send JSON object
        res.status(200).json(data)
      })
      break
    case 'POST':
      let newPosition = req.body

      jsonfile.readFile(file, 'utf-8', (err, data) => {
        if (err) {
          throw err
        }

        newPosition.id = data.length + 1

        // add new record
        data.push(newPosition)

        // write JSON to a file
        jsonfile.writeFile(file, data, { spaces: 4 }, (err) => {
          if (err) {
            throw err
          }
          console.log('JSON data is saved.')
        })
      })
      // respond with new position data
      res.status(201).json({
        success: true,
        data: newPosition,
      })
      break
    default: // Method not allowed
      res.status(405).end()
      break
  }
}
