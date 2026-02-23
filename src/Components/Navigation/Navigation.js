import React from 'react'
import logo from '../pro_images/clinic1_-_Copy-removebg-preview.png'
import './Navigation.css'
import {Link,NavLink} from 'react-router-dom'
export default function Navigation() {
  return (
    <div>
     <nav className="navbar navbar-expand-lg bg-light fixed-top">
       <div className="container-fluid " >
        <img src={logo} alt='logo' width="50px" height="50px"></img>
       <Link className="navbar-brand co" to="#">
  <span style={{fontSize:'1000'}}>BrightSmile Dental Care</span>
</Link>


        <button className="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                    <NavLink  className="nav-link" to="/" style={({isActive}) => ({color:isActive?"skyblue":"black"})}>Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/about"  style={({isActive}) => ({color:isActive?"red":"black"})}>About</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/doctors" style={({isActive}) => ({color:isActive?"red":"black"})}>Doctors</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/services" style={({isActive}) => ({color:isActive?"red":"black"})}>Services</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/blog" style={({isActive}) => ({color:isActive?"red":"black"})}>Blog</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" to="/contact" style={({isActive}) => ({color:isActive?"red":"black"})}>Contact</NavLink>
                </li>&nbsp;
                <li className="nav-item">
  <button
    type="button"
    className="btn btn-info btn-ap"
    style={{ backgroundColor: "skyblue", border: "none" }}
  >
    <NavLink
      
      to="/appointment" className={({ isActive }) =>
      isActive ? "btn btn-ap active-ap" : "btn btn-ap"
    }
      
    >
      Make an Appointment
    </NavLink>
  </button>
</li>

                
            </ul>
        </div>
       </div>
    </nav>
    </div>
  )
}
