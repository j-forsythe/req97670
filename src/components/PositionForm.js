import React, { useContext } from 'react'
import { EmployeeContext } from '@/utils/EmployeeContext'

import { Formik, Field, Form } from 'formik'

const styles = {
  label: 'block text-gray-700 text-sm font-bold pt-2 pb-1',
  field:
    'bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none',
  button:
    ' bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600',
  errorMsg: 'text-red-500 text-sm',
}

const PositionForm = ({
  positionData = undefined,
  handleSubmit = () => {},
  submitSuccess = false,
  submitError = false,
}) => {
  const employees = useContext(EmployeeContext)

  return (
    <>
      <Formik
        initialValues={
          positionData ?? {
            title: '',
            reportsTo: '',
            employeeId: '',
          }
        }
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values)
          setSubmitting(false)
        }}
      >
        {({ values, isSubmitting }) => (
          <Form>
            <label className={styles.label} htmlFor="title">
              Title
            </label>
            <Field className={styles.field} id="title" name="title" required />

            <label className={styles.label} htmlFor="employeeId">
              Employee
            </label>
            <Field
              className={styles.field}
              id="employeeId"
              name="employeeId"
              as="select"
            >
              <option value="">Vacant</option>
              {employees &&
                employees.map((emp) => (
                  <option value={emp.id} key={emp.id}>
                    {emp.firstName} {emp.lastName}
                  </option>
                ))}
            </Field>

            <div className="mt-8">
              <button
                type="submit"
                className={styles.button}
                disabled={isSubmitting}
              >
                Save
              </button>
            </div>
          </Form>
        )}
      </Formik>
      {submitSuccess && <p>Position {positionData ? 'Updated' : 'Added'}!</p>}
      {submitError && (
        <p>
          There was an error {positionData ? 'updating' : 'adding'} the
          position. Please try again later.
        </p>
      )}
    </>
  )
}

export default PositionForm
