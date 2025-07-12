import React, { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import AppointmentForm from './AppointmentForm'
import DayViewMobile from './DayViewMobile'

const localizer = momentLocalizer(moment)

function CalendarView() {
  const [events, setEvents] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedSlot, setSelectedSlot] = useState(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [selectedEventId, setSelectedEventId] = useState(null)
  const [formData, setFormData] = useState({ patient: '', doctor: '', time: '' })
  const [currentDate, setCurrentDate] = useState(new Date())
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)
  const [darkMode, setDarkMode] = useState(false)


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])


  useEffect(() => {
    const saved = localStorage.getItem('appointments')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        const converted = parsed.map(event => ({
          ...event,
          start: new Date(event.start),
          end: new Date(event.end),
        }))
        setEvents(converted)
      } catch (err) {
        console.error('Error parsing appointments:', err)
      }
    }
  }, [])


  const handleSubmit = (e) => {
    e.preventDefault()
    if (!selectedSlot || !formData.time) return

    const [hours, minutes] = formData.time.split(':')
    const start = new Date(selectedSlot)
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

    const updatedEvents = isEditMode
      ? events.map((e) => (e.id === selectedEventId ? newEvent : e))
      : [...events, newEvent]

    setEvents(updatedEvents)
    localStorage.setItem('appointments', JSON.stringify(updatedEvents))

    setModalOpen(false)
    setFormData({ patient: '', doctor: '', time: '' })
    setIsEditMode(false)
    setSelectedEventId(null)
  }

  const handleOpenModal = (slotInfo) => {
    setIsEditMode(false)
    setSelectedSlot(slotInfo.start)
    setFormData({ patient: '', doctor: '', time: '' })
    setModalOpen(true)
  }

  const handleEditEvent = (event) => {
    setIsEditMode(true)
    setSelectedSlot(event.start)
    setSelectedEventId(event.id)
    setFormData({ patient: event.patient, doctor: event.doctor, time: event.time })
    setModalOpen(true)
  }
const handleDelete = (id) => {
  const updated = events.filter((event) => event.id !== id)
  setEvents(updated)
  localStorage.setItem('appointments', JSON.stringify(updated)) 
}



  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-black'} min-h-screen`}>


    <div className="p-4 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">Appointment Calendar</h2>

<label className="inline-flex items-center relative">
  <input className="peer hidden" id="toggle" type="checkbox" 
  onClick={() => setDarkMode((prev) => !prev)}
  />
  <div
    className="relative w-[110px] h-[50px] bg-white peer-checked:bg-zinc-500 rounded-full after:absolute after:content-[''] after:w-[40px] after:h-[40px] after:bg-gradient-to-r from-orange-500 to-yellow-400 peer-checked:after:from-zinc-900 peer-checked:after:to-zinc-900 after:rounded-full after:top-[5px] after:left-[5px] active:after:w-[50px] peer-checked:after:left-[105px] peer-checked:after:translate-x-[-100%] shadow-sm duration-300 after:duration-300 after:shadow-md"
  ></div>
  <svg
    height="0"
    width="100"
    viewBox="0 0 24 24"
    data-name="Layer 1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    className="fill-white peer-checked:opacity-60 absolute w-6 h-6 left-[13px]"
  >
    <path
      d="M12,17c-2.76,0-5-2.24-5-5s2.24-5,5-5,5,2.24,5,5-2.24,5-5,5ZM13,0h-2V5h2V0Zm0,19h-2v5h2v-5ZM5,11H0v2H5v-2Zm19,0h-5v2h5v-2Zm-2.81-6.78l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54ZM7.76,17.66l-1.41-1.41-3.54,3.54,1.41,1.41,3.54-3.54Zm0-11.31l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Zm13.44,13.44l-3.54-3.54-1.41,1.41,3.54,3.54,1.41-1.41Z"
    ></path>
  </svg>
  <svg
    height="512"
    width="512"
    viewBox="0 0 24 24"
    data-name="Layer 1"
    id="Layer_1"
    xmlns="http://www.w3.org/2000/svg"
    className="fill-black opacity-60 peer-checked:opacity-70 peer-checked:fill-white absolute w-6 h-6 right-[13px]"
  >
    <path
      d="M12.009,24A12.067,12.067,0,0,1,.075,10.725,12.121,12.121,0,0,1,10.1.152a13,13,0,0,1,5.03.206,2.5,2.5,0,0,1,1.8,1.8,2.47,2.47,0,0,1-.7,2.425c-4.559,4.168-4.165,10.645.807,14.412h0a2.5,2.5,0,0,1-.7,4.319A13.875,13.875,0,0,1,12.009,24Zm.074-22a10.776,10.776,0,0,0-1.675.127,10.1,10.1,0,0,0-8.344,8.8A9.928,9.928,0,0,0,4.581,18.7a10.473,10.473,0,0,0,11.093,2.734.5.5,0,0,0,.138-.856h0C9.883,16.1,9.417,8.087,14.865,3.124a.459.459,0,0,0,.127-.465.491.491,0,0,0-.356-.362A10.68,10.68,0,0,0,12.083,2ZM20.5,12a1,1,0,0,1-.97-.757l-.358-1.43L17.74,9.428a1,1,0,0,1,.035-1.94l1.4-.325.351-1.406a1,1,0,0,1,1.94,0l.355,1.418,1.418.355a1,1,0,0,1,0,1.94l-1.418.355-.355,1.418A1,1,0,0,1,20.5,12ZM16,14a1,1,0,0,0,2,0A1,1,0,0,0,16,14Zm6,4a1,1,0,0,0,2,0A1,1,0,0,0,22,18Z"
    ></path>
  </svg>
</label>
    </div>

      {isMobile ? (
        <DayViewMobile
          darkMode={darkMode}
          events={events}
          onAdd={(newEvent) => {
            const updated = [...events, newEvent]
            setEvents(updated)
            localStorage.setItem('appointments', JSON.stringify(updated))
          }}
          onEdit={(updatedEvent) => {
            const updated = events.map((e) =>
              e.id === updatedEvent.id ? updatedEvent : e
            )
            setEvents(updated)
            localStorage.setItem('appointments', JSON.stringify(updated))
          }}
        />
      ) : (
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          views={['month', 'day']}
          date={currentDate}
          onNavigate={(date) => setCurrentDate(date)}
          selectable
          onSelectSlot={handleOpenModal}
          onSelectEvent={handleEditEvent}
          step={30}
          timeslots={2}
          min={new Date(0, 0, 0, 8, 0)}
          max={new Date(0, 0, 0, 20, 0)}
          style={{
            height: 600,
            overflowY: 'auto',
          }}
          popup
        />
      )}

      {modalOpen && (
        <AppointmentForm
         onDelete={handleDelete}
          formData={formData}
          setFormData={setFormData}
          patients={['John Doe', 'Jane Smith', 'Alice Johnson']}
          doctors={['Dr. Smith', 'Dr. Emily', 'Dr. Kevin']}
          onClose={() => setModalOpen(false)}
          onSubmit={handleSubmit}
          isEditMode={isEditMode}
          selectedEventId={selectedEventId}
          darkMode={darkMode}
        />
      )}
    </div>
        </div>
  )
}

export default CalendarView
