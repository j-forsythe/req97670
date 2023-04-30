const jsonfile = require('jsonfile')
const path = require('path')

const file = path.join(process.cwd(), 'data/employees.json')
export default function handler(req, res) {
  const { employeeId } = req.query

  switch (req.method) {
    case 'GET':
      if (employeeId) {
        jsonfile.readFile(file, 'utf-8', (err, data) => {
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
      }
      break
    case 'PUT':
      let editEmployee = req.body

      jsonfile.readFile(file, 'utf-8', (err, data) => {
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
        jsonfile.writeFile(file, data, { spaces: 4 }, (err) => {
          if (err) {
            throw err
          }
          console.log('JSON data is saved.')
        })
      })
      res.status(200).json({
        success: true,
        data: editEmployee,
      })
      break
    case 'DELETE':
      jsonfile.readFile(file, 'utf-8', (err, data) => {
        if (err) {
          throw err
        }
        // find employee from id
        const index = data.findIndex((p) => p.employeeId === employeeId)
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
