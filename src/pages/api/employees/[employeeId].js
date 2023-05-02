const jsonfile = require('jsonfile')
const path = require('path')
const fs = require('fs')
const file = path.join(process.cwd(), 'data/employees.json')
const tmpFile = '/tmp/employees.json'

export default function handler(req, res) {
  const { employeeId } = req.query
  // if tmp file exists, read it otherwise create it from mock data
  let writeStream = fs.existsSync(tmpFile)
    ? fs.createReadStream(tmpFile)
    : fs.createReadStream(file).pipe(fs.createWriteStream(tmpFile))

  switch (req.method) {
    case 'GET':
      if (employeeId) {
        writeStream.on('finish', function () {
          jsonfile.readFile(tmpFile, 'utf-8', (err, data) => {
            if (err) {
              throw err
            }
            // find employee from id
            let employee = data?.find((employee) => employee.id === employeeId)

            if (employee) {
              // send JSON object
              res.status(200).json(employee)
            } else {
              // employee not found
              res.status(404).end()
            }
          })
        })
      }
      break
    case 'PUT':
      let editEmployee = req.body
      writeStream.on('finish', function () {
        jsonfile.readFile(tmpFile, 'utf-8', (err, data) => {
          if (err) {
            throw err
          }
          // find index of employee to update
          const index = data.findIndex((p) => p.id === employeeId)

          // if index is found replace data with updated employee
          if (index !== -1) {
            data[index] = editEmployee
          } else {
            // employee not found
            res.status(500).end()
          }

          // write updated JSON to file
          jsonfile.writeFile(tmpFile, data, { spaces: 4 }, (err) => {
            if (err) {
              throw err
            }
            console.log('JSON data is saved.')
          })
        })
      })
      res.status(200).json({
        success: true,
        data: editEmployee,
      })
      break
    case 'DELETE':
      jsonfile.readFile(tmpFile, 'utf-8', (err, data) => {
        if (err) {
          throw err
        }
        // find employee from id
        const index = data.findIndex((p) => p.employeeId === employeeId)
        data.splice(index, 1)

        // write updated JSON to file
        jsonfile.writeFile(tmpFile, data, { spaces: 4 }, (err) => {
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
