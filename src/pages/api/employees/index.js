const jsonfile = require('jsonfile')
const path = require('path')

const file = path.join(process.cwd(), 'data/employees.json')

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
    // case 'POST':
    //   let newEmployee = req.body

    //   jsonfile.readFile('data/employees.json', 'utf-8', (err, data) => {
    //     if (err) {
    //       throw err
    //     }

    //     // add new record
    //     data.push(newEmployee)

    //     // write JSON to a file
    //     jsonfile.writeFile(
    //       'data/employees.json',
    //       data,
    //       { spaces: 4 },
    //       (err) => {
    //         if (err) {
    //           throw err
    //         }
    //         console.log('JSON data is saved.')
    //       },
    //     )
    //   })
    //   // respond with new employee data
    //   res.status(201).json({
    //     success: true,
    //     data: newEmployee,
    //   })
    //   break
    default: // Method not allowed
      res.status(405).end()
      break
  }
}
