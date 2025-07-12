import React from 'react'
import LoginForm from './components/LoginForm'
import CalendarView from './components/CalendarView'
import { Route, Routes } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path={'/'} element={<LoginForm />} />
          <Route path={'/home'} element={<CalendarView />} />
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
