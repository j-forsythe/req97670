import React, { useRef } from 'react'
import { updatePosition } from '@/utils/positionAPIs'
const UnfillPosition = ({ position, onUnfillPosition }) => {
  const dialog = useRef(null)
  let removeEmployee = { ...position, employeeId: null }

  return (
    <>
      <button
        onClick={(e) => {
          e.stopPropagation()
          dialog?.current?.showModal()
        }}
        className=" bg-indigo-100 p-2 font-bold rounded hover:bg-gray-600 m-2"
      >
        Unfill Position
      </button>
      <dialog
        className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        ref={dialog}
      >
        <form
          method="dialog"
          className="relative rounded top-20 md:mx-auto p-5 border w-96 shadow-lg rounded-md bg-white"
        >
          <p className=" font-semibold text-lg text-center py-6">
            Are you sure you want to remove employee?
          </p>
          <div className="flex">
            <button
              value="cancel"
              className="px-4 py-2 mr-2 bg-red-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Cancel
            </button>
            <button
              value="default"
              onClick={() => {
                updatePosition(removeEmployee)
                onUnfillPosition()
              }}
              className="px-4 py-2 ml-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              Confirm
            </button>
          </div>
        </form>
      </dialog>
    </>
  )
}

export default UnfillPosition
