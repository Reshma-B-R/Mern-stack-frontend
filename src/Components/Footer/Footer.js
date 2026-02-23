import React from 'react'
import './Footer.css';
import {Link,NavLink} from 'react-router-dom';

export default function Footer() {
  return (
    <div>
      <footer className="footer">
        <div className="container">
          <div className="row">

            <div className="col-md-3">
              <h5>About Us</h5>
              <p>
                BrightSmile Dental Care is dedicated to providing world-class dental treatments with
                modern technology and experienced dentists, ensuring painless and comfortable
                dental care for all ages.
              </p>
            </div>

            <div className="col-md-3">
              <h5>Useful Links</h5>
              <NavLink to="/"><i className="bi bi-chevron-right"></i> Home</NavLink><br />
              <NavLink to="/about"><i className="bi bi-chevron-right"></i> About Us</NavLink><br />
              <NavLink to="/services"><i className="bi bi-chevron-right"></i> Services</NavLink><br />
              <NavLink to="/doctors"><i className="bi bi-chevron-right"></i> Doctors</NavLink><br />
              <NavLink to="/appointment"><i className="bi bi-chevron-right"></i> Book Appointment</NavLink><br />
              <NavLink to="/contact"><i className="bi bi-chevron-right"></i> Contact Us</NavLink>
            </div>

            <div className="col-md-3">
              <h5>Dental Services</h5>
              <Link to="/services"><i className="bi bi-chevron-right"></i> Root Canal Treatment</Link><br />
              <Link to="/services"><i className="bi bi-chevron-right"></i> Dental Implants</Link><br />
              <Link to="/services"><i className="bi bi-chevron-right"></i> Braces & Orthodontics</Link><br />
              <Link to="/services"><i className="bi bi-chevron-right"></i> Teeth Whitening</Link><br />
              <Link to="/services"><i className="bi bi-chevron-right"></i> Cosmetic Dentistry</Link><br />
              <Link to="/services"><i className="bi bi-chevron-right"></i> Kids Dentistry</Link>
            </div>

            <div className="col-md-3">
              <h5>Contact Us</h5>
              <p>
                <i className="bi bi-geo-alt-fill"></i> BrightSmile Dental Clinic,<br />
                Main Road, Your City, India
              </p>
              <p><i className="bi bi-telephone-fill"></i> +91 9876543210</p>
              <p><i className="bi bi-envelope-fill"></i> info@brightsmile.com</p>

              <div className="social-icons mt-3">
                <Link to="#"><i className="bi bi-facebook"></i></Link>
                <Link to="#"><i className="bi bi-instagram"></i></Link>
                <Link to="#"><i className="bi bi-whatsapp"></i></Link>
              </div>
            </div>

          </div>

          <div className="footer-bottom">
            ©2019 BrightSmile Dental Care. All Rights Reserved.
          </div>
        </div>
      </footer>
    </div>
  )
}
