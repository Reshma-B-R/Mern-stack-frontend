import React from 'react'
import image from '../pro_images/pro3.jpg'
import './about.css'
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";


export default function Home_about() {
  useEffect(() => {
  AOS.init();
  AOS.refresh();
}, []);

  return (
    <div>
      <section className="about-section py-5">
        <div className="container-fluid">
          <div className="row align-items-center">


            <div className="col-lg-6" ><div data-aos="fade-up">
              <img 
                src={image}
                alt="Dentist treating patient" 
                className="img-fluid about-img"  
                style={{ height: "500px" }}
              />
            </div>
            </div>

            <div className="col-lg-6 px-5">
              <h6 className="text-uppercase fw-bold mb-3" style={{ color: "rgb(16, 112, 149)" }}>
                Welcome to BrightSmile Dental Care
              </h6>

              <h2 className="fw-bold mb-4" style={{ color:"#023047" }}>
                BrightSmile Dental Care <br /> Where Healthy Smiles Begin
              </h2>

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
    </div>
  );
}
