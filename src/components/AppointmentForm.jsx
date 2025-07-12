import React from 'react'

const AppointmentForm = ({
  formData,
  setFormData,
  patients,
  doctors,
  onClose,
  onSubmit,
  isEditMode,
  onDelete,
  selectedEventId,
  darkMode
}) => {
  return (
    <div className="fixed inset-0 translate-px bg-opacity-60 backdrop-blur-sm flex justify-center items-center z-50">
      <div className={`${darkMode?"bg-white/90 text-black":"bg-white/90 text-black"} p-6 rounded-lg shadow-md w-96`}>
        <h3 className="text-lg font-bold mb-4">
          {isEditMode ? 'Edit Appointment' : 'Add Appointment'}
        </h3>
        <form className="space-y-4" onSubmit={onSubmit}>
          <div>
            <label className="block text-sm">Patient</label>
            <select
              className="w-full border rounded p-2"
              value={formData.patient}
              onChange={(e) =>
                setFormData({ ...formData, patient: e.target.value })
              }
              required
            >
              <option value="">Select Patient</option>
              {patients.map((p) => (
                <option className='text-black' key={p} value={p}>
                  {p}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm">Doctor</label>
            <select
              className="w-full border rounded p-2"
              value={formData.doctor}
              onChange={(e) =>
                setFormData({ ...formData, doctor: e.target.value })
              }
              required
            >
              <option value="">Select Doctor</option>
              {doctors.map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm">Time</label>
            <input
              type="time"
              className="w-full border rounded p-2"
              value={formData.time}
              onChange={(e) =>
                setFormData({ ...formData, time: e.target.value })
              }
              required
            />
          </div>
          <div className="flex justify-between pt-2">
         {isEditMode && (
  <button
    type="button"
    onClick={() => {
      onDelete(selectedEventId)
      onClose()
    }}
    className="bg-red-600 text-white px-4 py-2 rounded"
  >
    Delete
  </button>
)}
            <button
              type="button"
              className="text-sm text-gray-500 hover:underline"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            >
              {isEditMode ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AppointmentForm
