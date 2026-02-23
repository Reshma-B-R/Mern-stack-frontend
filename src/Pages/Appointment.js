import React from 'react'
import Navigation from '../Components/Navigation/Navigation'
import AppointmentPage from '../Components/Appointment/AppointmentPage'
import Footer from '../Components/Footer/Footer'
// import Appointment1 from '../Components/Appointment/Appointment1'

export default function Appointment() {
  return (
    <div>
        <Navigation />
        <AppointmentPage />
        {/* <Appointment1/> */}
        <Footer />

    </div>
  )
}
