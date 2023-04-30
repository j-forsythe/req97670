import React from 'react'

import { Formik, Field, Form } from 'formik'

const styles = {
  label: 'block text-gray-700 text-sm font-bold pt-2 pb-1',
  field:
    'bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none',
  button:
    ' bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600',
  errorMsg: 'text-red-500 text-sm',
}

const EmployeeForm = ({
  employeeData = undefined,
  handleSubmit = () => {},
  submitSuccess = false,
  submitError = false,
}) => (
  <>
    <Formik
      initialValues={
        employeeData ?? {
          firstName: '',
          lastName: '',
        }
      }
      onSubmit={(values, { setSubmitting }) => {
        handleSubmit(values)
        setSubmitting(false)
      }}
    >
      {({ values, isSubmitting }) => (
        <Form>
          <label className={styles.label} htmlFor="firstName">
            First Name
          </label>
          <Field
            className={styles.field}
            id="firstName"
            name="firstName"
            required
          />

          <label className={styles.label} htmlFor="lastName">
            Last Name
          </label>
          <Field
            className={styles.field}
            id="lastName"
            name="lastName"
            required
          />

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
    {submitSuccess && <p>Employee {employeeData ? 'Updated' : 'Added'}!</p>}
    {submitError && (
      <p>
        There was an error {employeeData ? 'updating' : 'adding'} the employee.
        Please try again later.
      </p>
    )}
  </>
)

export default EmployeeForm
