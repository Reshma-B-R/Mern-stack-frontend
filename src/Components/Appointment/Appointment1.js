import React, { useState } from 'react'
import './Appointment.css'
import {auth} from './firebase'
import {createUserWithEmailAndPassword} from 'firebase/auth'


export default function Appointment1() {
    
    const[email,setEmail]=useState('');
    const[password,setPassword]=useState('');

    const signIn=async()=>{
        try{
            await createUserWithEmailAndPassword(auth,email,password)
        }
        catch(err){
            console.log(err)
        }
    }
  return (
    <div>
         <section className="appointment-header">
    <h2>Book Your Appointment</h2>
    <p className="lead">We’re here to give you the perfect smile you deserve. Schedule your visit today!</p>
  </section>

 
  <div className="container my-5 auth_login">
    <div className="appointment-form mx-auto col-lg-8">
      <form  onSubmit={signIn}>
        <div className="row g-3">
         

          <div className="col-md-6">
            <label for="email" className="form-label">Email Address</label>
            <input type="email" className="form-control" id="email" placeholder="Enter your email"  value={email} onChange={(e)=>setEmail(e.target.value)} required />
          </div>
           <div className="col-md-6">
            <label for="password" className="form-label">password</label>
            <input type="text" className="form-control" id="password" placeholder="Enter your password"  value={password} onChange={(e)=>setPassword(e.target.value)} required />
          </div>
            <div className="col-12 text-center mt-4">
            <button type="submit" className="btn btn-appoint" >
              <i className="bi bi-calendar-check me-2"></i>Book Appointment
            </button>
          </div>

         

          

         

          
        </div>
      </form>
    </div>
  </div>
    </div>
  )
}
