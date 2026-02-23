import React from 'react'
import image1 from '../pro_images/woman-patient-dentist4.png'
import image2 from '../pro_images/tooth_org_black2.jpg'
import './Carousel.css'
import Styled, { styled } from 'styled-components';


export default function Carousel() {
  
  return (
    <div className='mt-9'>
   <div id="demo" className="carousel slide " data-bs-ride="carousel">
     <div className="carousel-indicators">
        <button type="button" data-bs-target="#demo" data-bs-slide-to="0" className="active"></button>
        <button type="button" data-bs-target="#demo" data-bs-slide-to="1"></button>
        
     </div>
    <div className="carousel-inner">
        <div className="carousel-item active">
            <img src={image1} alt="image1" className="d-block w-100 carousel-img" style={{paddingTop:'70px',}}></img>
            <div className="centered mt-5"> <p style={{fontWeight: 900,}}>YOUR SMILE, OUR PRIORITY</p>
              <p style={{color: 'white',fontSize:'medium',textAlign: 'justify',fontWeight:'none',}}>We believe every smile deserves gentle and personalized care. 
                Our team combines expertise with modern dental technology to ensure your comfort and confidence. 
                Let us help you achieve a healthy, radiant smile that lasts a lifetime.</p>
                <button type="button" className="btn btn-appointment ms-2">Make an Appointment </button>
    </div>
        </div>
    
        <div className="carousel-item">
            <img src={image2} alt="image2" className="d-block w-100 carousel-img" style={{paddingTop: '70px',}}></img>
            <div className="centered"> <p style={{fontWeight: '900',}}>YOUR SMILE, OUR PRIORITY</p>
              <p style={{color: 'white',fontSize:'medium',textAlign: 'justify',}}>We believe every smile deserves gentle and personalized care.  
  Our team combines expertise with modern dental technology to ensure your comfort and confidence.  
  Let us help you achieve a healthy, radiant smile that lasts a lifetime.</p>
                <button type="button" className="btn btn-appointment ms-2"> Make an Appointment</button>
    </div>
        </div>
        
    </div>
  </div>

    </div>
  )
}
