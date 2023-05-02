const jsonfile = require('jsonfile')
const path = require('path')
const fs = require('fs')

const file = path.join(process.cwd(), 'data/positions.json')
const tmpFile = '/tmp/positions.json'

export default function handler(req, res) {
  let writeStream = fs.existsSync(tmpFile)
    ? fs.createReadStream(tmpFile)
    : fs.createReadStream(file).pipe(fs.createWriteStream(tmpFile))
  switch (req.method) {
    case 'GET':
      writeStream.on('finish', function () {
        // read JSON object from file
        jsonfile.readFile(tmpFile, 'utf-8', (err, data) => {
          if (err) {
            throw err
          }
          // send JSON object
          res.status(200).json(data)
        })
      })
      break
    case 'POST':
      let newPosition = req.body
      writeStream.on('finish', function () {
        jsonfile.readFile(tmpFile, 'utf-8', (err, data) => {
          if (err) {
            throw err
          }

          newPosition.id = data.length + 1

          // add new record
          data.push(newPosition)

          // write JSON to a file
          jsonfile.writeFile(tmpFile, data, { spaces: 4 }, (err) => {
            if (err) {
              throw err
            }
            console.log('JSON data is saved.')
          })
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
