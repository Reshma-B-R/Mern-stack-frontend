import React from 'react'
import './AboutUs.css'
import { motion } from "motion/react"
import image1 from '../pro_images/pro3.jpg'
import image2 from '../pro_images/mission.jpg'
import image3 from '../pro_images/vision.jpg'
import image4 from '../pro_images/teeeeth.jpg'
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";



  

export default function AboutUs() {
  useEffect(() => {
  AOS.init();
  AOS.refresh();
}, []);

  return (
    <div>
        <section className="about-section py-5">
    <div className="container-fluid">
      <div className="row align-items-center">
        <div className="col-lg-6"><div data-aos='fade-up'>
          <img src={image1} alt="Dentist treating patient" className="img-fluid about-img" style={{height:'500px',}}></img>
        </div></div>
        <div className="col-lg-6 px-5">
          <h6 className="text-uppercase fw-bold mb-3" style={{color:'rgb(16, 112, 149)',}}>Welcome to BrightSmile Dental Care</h6>
          <h2 className="fw-bold mb-4" style={{color:'#023047',}}>BrightSmile Dental Care — <br></br> Where Healthy Smiles Begin</h2>
          <p className="text-muted mb-4">
            At BrightSmile Dental Care, we combine advanced dental technology with a gentle, caring approach
            to provide exceptional oral health care for all ages. Our mission is to help you achieve a bright,
            confident smile through personalized and comfortable treatments.
          </p>
          <div className="row text-center g-3">
            <div className="col-4">
              <div className="info-box">
                <i className="bi bi-emoji-smile"></i>
                <h4>3,000</h4>
                <p>Happy Patients</p>
              </div>
            </div>
            <div className="col-4">
              <div className="info-box">
                <i className="bi bi-hospital"></i>
                <h4>2,200</h4>
                <p>Performed Treatments</p>
              </div>
            </div>
            <div className="col-4">
              <div className="info-box">
                <i className="bi bi-calendar3"></i>
                <h4>24</h4>
                <p>Years of Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div> 
  </section>
 
<section className="why-choose py-5" style={{backgroundColor:'#f2fcff',}}>
  <div className="container">
    <div className="text-center mb-5">
      <h6 className="text-uppercase mb-2" style={{color: 'rgb(16, 112, 149',}}>Why Choose Us</h6>
      <h2 className="fw-bold" style={{color:'#023047'}}>We Care for Your Smile Like Our Own</h2>
      <p className="text-muted">At BrightSmile Dental Care, we aim to provide stress-free, reliable, and compassionate dental care.</p>
    </div>
   
    <div  className="row text-center g-4">
      
      <div className="col-md-3">
        <motion.div whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            >
        <div className="p-4 bg-white rounded shadow-sm h-100">
          <i className="bi bi-heart-pulse fs-1 text-info mb-3"></i>
          <h5 className="fw-bold mb-2">Comprehensive Care</h5>
          <p className="text-muted">We offer all dental services under one roof, from preventive checkups to complex surgeries.</p>
        </div>
        </motion.div>
      </div>
      
      <div className="col-md-3">
         <motion.div whileHover={{ scale: 1.1}}
            whileTap={{ scale: 0.8 }}
            >
        <div className="p-4 bg-white rounded shadow-sm h-100">
          <i className="bi bi-people fs-1 text-info mb-3"></i>
          <h5 className="fw-bold mb-2">Experienced Team</h5>
          <p className="text-muted">Our certified and compassionate dentists bring years of expertise in dental excellence.</p>
        </div>
        </motion.div>
      </div>
      <div className="col-md-3">
         <motion.div whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            >
        <div className="p-4 bg-white rounded shadow-sm h-100">
          <i className="bi bi-shield-check fs-1 text-info mb-3"></i>
          <h5 className="fw-bold mb-2">Modern Equipment</h5>
          <p className="text-muted">We use advanced dental tools and digital diagnostics for precise, comfortable treatment.</p>
        </div>
        </motion.div>
      </div>
      <div className="col-md-3">
         <motion.div whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            >
        <div className="p-4 bg-white rounded shadow-sm h-100">
          <i className="bi bi-emoji-smile-upside-down fs-1 text-info mb-3"></i>
          <h5 className="fw-bold mb-2">Painless Procedures</h5>
          <p className="text-muted">Our gentle care and pain-free techniques ensure your comfort throughout every visit.</p>
        </div>
        </motion.div>
      </div>
    </div>
  </div>
</section>

<section className="mission-vision py-5" style={{backgroundColor:'#f8f9fa',}}>
  <div className="container">
    <div className="row align-items-stretch g-4">

      
      <div className="col-lg-6 d-flex flex-column justify-content-between">
       <motion.div whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            >
      
        <div className="card mb-4 shadow-sm border-0 flex-fill" style={{borderRadius:'15px', overflow:'hidden',}}>
          <img src={image2} className="card-img-top" alt="Our Mission" style={{height:'220px', objectFit:'cover',}}></img>
          <div className="card-body">
            <h5 className="card-title text-uppercase fw-bold mb-3" style={{color:'rgb(16, 112, 149)',}}>
              <i className="bi bi-bullseye me-2"></i>Our Mission
            </h5>
            <p className="card-text text-muted">
              To deliver high-quality dental care with compassion and precision,  
              helping our patients achieve brighter, healthier smiles through modern, gentle treatments.
            </p>
          </div>
        </div>
        </motion.div> 

       <motion.div whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.8 }}
            >
        <div className="card shadow-sm border-0 flex-fill" style={{borderRadius:'15px', overflow:'hidden',}}>
          <img src={image3} className="card-img-top" alt="Our Vision" style={{height:'220px',objectFit:'cover',}}></img>
          <div className="card-body">
            <h5 className="card-title text-uppercase fw-bold mb-3" style={{color:'rgb(16, 112, 149)',}}>
              <i className="bi bi-eye me-2"></i>Our Vision
            </h5>
            <p className="card-text text-muted mb-0">
              To become a leading dental clinic recognized for innovation, patient satisfaction,  
              and our unwavering dedication to creating confident smiles for everyone.
            </p>
          </div>
        </div>
        </motion.div>
      </div>

      
      <div className="col-lg-6 p-0">
        <img 
          src={image4}
          alt="Dental Care" 
          className="img-fluid w-100 h-100 rounded-end" 
          style={{objectFit:'cover', borderRadius:'15px'}}></img>
      </div>
    </div>
  </div>
</section>
    </div>
  )
}
