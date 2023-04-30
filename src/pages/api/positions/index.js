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
    default: // Method not allowed
      res.status(405).end()
      break
  }
}
