import React from 'react'
import './Service.css'

export default function HomeService() {
  return (
    <div>
        <div className="container-fluid py-5" style={{backgroundColor:'#f2fcff',}}>
  <div className="container">
    <div className="row text-center mb-4">
      <h3 className="fw-bold" style={{color:'#05668d',}}>Our Services</h3>
      <p className="text-muted">We offer quality dental care with modern facilities and expert dentists.</p>
    </div>

    <div className="row g-4">
      <div className="col-lg-3 col-md-6">
        <div className="service-box">
          <div className="icon-circle">
            <i className="bi bi-telephone-plus"></i>
          </div>
          <h5>Emergency Service</h5>
          <p>We provide fast and reliable emergency dental treatments to relieve pain and restore your comfort.</p>
        </div>
      </div>

      <div className="col-lg-3 col-md-6">
        <div className="service-box">
          <div className="icon-circle">
            <i className="bi bi-person-badge"></i>
          </div>
          <h5>Qualified Dentist</h5>
          <p>Our skilled and experienced dentists ensure you get personalized and professional oral care.</p>
        </div>
      </div>

      <div className="col-lg-3 col-md-6">
        <div className="service-box">
          <div className="icon-circle">
            <i className="bi bi-activity"></i>
          </div>
          <h5>General Treatment</h5>
          <p>We offer a wide range of dental treatments including fillings, cleaning, and preventive care.</p>
        </div>
      </div>

      <div className="col-lg-3 col-md-6">
        <div className="service-box">
          <div className="icon-circle">
            <i className="bi bi-calendar-check"></i>
          </div>
          <h5>Online Appointment</h5>
          <p>Book your appointments online at your convenience and visit us at your preferred time.</p>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  )
}
