import fs from 'fs'
const jsonfile = require('jsonfile')
const path = require('path')

const file = path.join(process.cwd(), '/tmp/employees.json')
const readStream = fs.createReadStream(`${file}`)

export default function handler(req, res) {
  switch (req.method) {
    case 'GET':
      readStream.on('open', function () {
        // read JSON object from file
        jsonfile.readFile(file, 'utf-8', (err, data) => {
          if (err) {
            throw err
          }
          // send JSON object
          res.status(200).json(data)
        })
      })
      readStream.on('error', function (err) {
        res.end(err)
      })
      break
    case 'POST':
      let newEmployee = req.body
      readStream.on('open', function () {
        jsonfile.readFile(file, 'utf-8', (err, data) => {
          if (err) {
            throw err
          }

          newEmployee.id = `emp0${data.length + 1}`

          // add new record
          data.push(newEmployee)

          // write JSON to a file
          jsonfile.writeFile(file, data, { spaces: 4 }, (err) => {
            if (err) {
              throw err
            }
            console.log('JSON data is saved.')
          })
        })
      })
      readStream.on('error', function (err) {
        res.end(err)
      })
      // respond with new employee data
      res.status(201).json({
        success: true,
        data: newEmployee,
      })
      break
    default: // Method not allowed
      res.status(405).end()
      break
  }
}
