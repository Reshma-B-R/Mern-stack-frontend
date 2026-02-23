import React from 'react'
import image from '../pro_images/clinic_blue.jpg'
import './Work.css'
import { Link } from 'react-router-dom'

export default function WorkHour() {
  return (
    <div>
        <div className="container-fluid py-0">
  <div className="row g-0 align-items-stretch">

    
    <div className="col-lg-6 d-flex">
      <div className="working-hours-card flex-fill d-flex align-items-center justify-content-center text-center text-lg-start">
        <div className="p-5 text-white">
          <h4 className="fw-bold mb-4">Opening Hours</h4>
          <ul className="list-unstyled">
            <li><span>Monday - Friday</span><span>8:00 - 19:00</span></li>
            <li><span>Saturday</span><span>10:00 - 17:00</span></li>
            <li><span>Sunday</span><span>10:00 - 16:00</span></li>
          </ul>
          <p className="mt-4 mb-0">Need help? <Link to="/contact" className="/contact">Contact Us</Link></p>
        </div>
      </div>
    </div>

    
    <div className="col-lg-6">
      <div className="working-hours-img-container">
        <img src={image} alt="Clinic" className="img-fluid w-100 h-100"></img>
      </div>
    </div>

  </div>
</div>

    </div>
  )
}
