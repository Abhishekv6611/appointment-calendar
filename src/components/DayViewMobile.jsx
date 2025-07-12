import React, { useState } from 'react'
import moment from 'moment'
import AppointmentForm from './AppointmentForm'

function DayViewMobile({ events, onAdd, onEdit, darkMode }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [modalOpen, setModalOpen] = useState(false)
  const [formData, setFormData] = useState({ patient: '', doctor: '', time: '' })
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedEventId, setSelectedEventId] = useState(null)

  const [filterDoctor, setFilterDoctor] = useState('')
  const [filterPatient, setFilterPatient] = useState('')

  const times = []
  for (let hour = 8; hour < 20; hour++) {
    times.push(`${hour.toString().padStart(2, '0')}:00`)
    times.push(`${hour.toString().padStart(2, '0')}:30`)
  }

  const handleSlotClick = (time) => {
    setFormData({ patient: '', doctor: '', time })
    setIsEditMode(false)
    setModalOpen(true)
  }

  const handleEventClick = (event) => {
    setFormData({ patient: event.patient, doctor: event.doctor, time: event.time })
    setIsEditMode(true)
    setSelectedEventId(event.id)
    setModalOpen(true)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const [hours, minutes] = formData.time.split(':')
    const start = new Date(currentDate)
    start.setHours(Number(hours))
    start.setMinutes(Number(minutes))
    const end = new Date(start)
    end.setMinutes(end.getMinutes() + 30)

    const newEvent = {
      id: isEditMode ? selectedEventId : Date.now(),
      title: `${formData.patient} - ${formData.doctor}`,
      start,
      end,
      patient: formData.patient,
      doctor: formData.doctor,
      time: formData.time,
    }

    if (isEditMode) {
      onEdit(newEvent)
    } else {
      onAdd(newEvent)
    }

    setModalOpen(false)
    setFormData({ patient: '', doctor: '', time: '' })
    setIsEditMode(false)
    setSelectedEventId(null)
  }

  const uniqueDoctors = [...new Set(events.map((e) => e.doctor))]
  const uniquePatients = [...new Set(events.map((e) => e.patient))]

  let filteredEvents = events.filter((event) =>
    moment(event.start).isSame(currentDate, 'day')
  )

  if (filterDoctor) {
    filteredEvents = filteredEvents.filter((event) => event.doctor === filterDoctor)
  }
  if (filterPatient) {
    filteredEvents = filteredEvents.filter((event) => event.patient === filterPatient)
  }

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} p-2`}>
      <input
        type="date"
        className="w-full border p-2 mb-2 rounded"
        value={moment(currentDate).format('YYYY-MM-DD')}
        onChange={(e) => setCurrentDate(new Date(e.target.value))}
      />

      <div className="flex gap-2 mb-4">
        <select
          className="w-1/2 border p-2 rounded"
          value={filterDoctor}
          onChange={(e) => setFilterDoctor(e.target.value)}
        >
          <option value="">All Doctors</option>
          {uniqueDoctors.map((doc) => (
            <option key={doc} value={doc}>
              {doc}
            </option>
          ))}
        </select>

        <select
          className="w-1/2 border p-2 rounded"
          value={filterPatient}
          onChange={(e) => setFilterPatient(e.target.value)}
        >
          <option value="">All Patients</option>
          {uniquePatients.map((pat) => (
            <option key={pat} value={pat}>
              {pat}
            </option>
          ))}
        </select>
      </div>

    
      <div className="space-y-2 overflow-y-scroll max-h-[75vh] text-black">
        {times.map((time) => {
          const match = filteredEvents.find((event) => event.time === time)
          return (
            <div
              key={time}
              className={`p-3 border rounded cursor-pointer ${
                match ? 'bg-blue-100' : 'bg-gray-100'
              }`}
              onClick={() => (match ? handleEventClick(match) : handleSlotClick(time))}
            >
              <strong>{time}</strong>{' '}
              {match ? (
                <div className="text-sm">{match.title}</div>
              ) : (
                <span className="text-sm text-gray-500">Tap to add</span>
              )}
            </div>
          )
        })}
      </div>

     
      {modalOpen && (
        <AppointmentForm
          darkMode={darkMode}
          formData={formData}
          setFormData={setFormData}
          patients={['John Doe', 'Jane Smith', 'Alice Johnson']}
          doctors={['Dr. Smith', 'Dr. Emily', 'Dr. Kevin']}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
          isEditMode={isEditMode}
          selectedEventId={selectedEventId}
          onDelete={(id) => {
            const updated = events.filter((e) => e.id !== id)
            localStorage.setItem('appointments', JSON.stringify(updated))
            window.location.reload() 
          }}
        />
      )}
    </div>
  )
}

export default DayViewMobile
