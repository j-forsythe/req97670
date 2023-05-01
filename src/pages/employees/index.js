import React, { useEffect, useState } from 'react'
import Link from 'next/link'
const Employees = () => {
  const [employees, setEmployees] = useState(null)

  const [isLoading, setLoading] = useState(false)

  // get all employees on render
  useEffect(() => {
    setLoading(true)
    fetch('/api/employees')
      .then((res) => res.json())
      .then((data) => {
        setEmployees(data)
        setLoading(false)
        // store full list in ref for resets
        // productList.current = data
      })
      .catch((error) => console.error(error))
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!employees) return <p>No employee data</p>

  return (
    <>
      <div className="flex  my-4 justify-between">
        <Link href="/">&lt;&nbsp;Back</Link>
        <h2 className="text-center">Employees</h2>
        <Link
          href="/employees/create"
          className=" bg-indigo-700 text-white font-bold py-2 px-4  rounded hover:bg-gray-600"
        >
          Add new employee
        </Link>
      </div>

      <div className="relative rounded-xl overflow-auto">
        <div className="shadow-sm">
          <table className="border-collapse table-auto w-full text-sm">
            <thead className="bg-slate-800">
              <tr>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 py-3 text-slate-400 dark:text-slate-200 text-left">
                  Id
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 py-3 text-slate-400 dark:text-slate-200 text-left">
                  Name
                </th>
                <th className="border-b dark:border-slate-600 font-medium p-4 pl-8 py-3 text-slate-400 dark:text-slate-200 text-left">
                  Manage
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800">
              {employees?.length > 0 ? (
                /* iterate over each product */
                employees?.map((employee) => (
                  <tr key={employee.id}>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      {employee.id}
                    </td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      {employee.firstName} {employee.lastName}
                    </td>
                    <td className="border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400">
                      <div className=" flex flex-col items-center">
                        <Link
                          href={`/employees/edit/${employee.id}`}
                          className="mb-4"
                        >
                          Edit
                        </Link>
                        {/* <DeleteProduct
                          productName={item.productName}
                          onDeleteProduct={() =>
                            handleDeleteProduct(item.productId)
                          }
                        /> */}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="3"
                    className="w-full border-b border-slate-100 dark:border-slate-700 p-4 pl-8 text-slate-500 dark:text-slate-400 text-center"
                  >
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Employees
