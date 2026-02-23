// import React from 'react'
// import doctor1 from '../pro_images/beautiful-young-female-doctor-looking-camera-office.jpg'
// import doctor2 from '../pro_images/doctor9.jpg'
// import doctor3 from '../pro_images/doctor7.jpg'
// import doctor4 from '../pro_images/doctor8.jpg'
// import './Doctor.css'
// import {Link} from 'react-router-dom';
// import "aos/dist/aos.css";

// export default function HomeDoctor() {
//   return (
//     <section className="doctor-section">
//       <div className="container-fluid py-5">
//         <div className="container">

//           {/* Heading */}
//           <div className="row text-center mb-4">
//             <h3 className="fw-bold doctor-title">Qualified Doctors</h3>
//             <p className="text-muted">
//               Our experienced dental specialists are dedicated to giving you the best smile possible.
//             </p>
//           </div>

//           {/* Cards */}
//           <div className="row g-4 justify-content-center">

//             <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12" data-aos="fade-right">
//               <div className="doctor-card">
//                 <img src={doctor1} alt="Dr. Sarah Johnson" className="doctor-img" />
//                 <h5>Dr. Sarah Johnson</h5>
//                 <p>Orthodontist</p>
//                 <div className="doctor-social">
//                   <Link to="#"><i className="bi bi-instagram"></i></Link>
//                   <Link to="#"><i className="bi bi-twitter"></i></Link>
//                   <Link to="#"><i className="bi bi-facebook"></i></Link>
//                 </div>
//               </div>
//             </div>

//             <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12" data-aos="fade-down">
//               <div className="doctor-card">
//                 <img src={doctor2} alt="Dr. Michael Lee" className="doctor-img" />
//                 <h5>Dr. Michael Lee</h5>
//                 <p>Cosmetic Dentist</p>
//                 <div className="doctor-social">
//                   <Link to="#"><i className="bi bi-instagram"></i></Link>
//                   <Link to="#"><i className="bi bi-twitter"></i></Link>
//                   <Link to="#"><i className="bi bi-facebook"></i></Link>
//                 </div>
//               </div>
//             </div>

//             <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12" data-aos="fade-up">
//               <div className="doctor-card">
//                 <img src={doctor3} alt="Dr. Emily Davis" className="doctor-img" />
//                 <h5>Dr. Emily Davis</h5>
//                 <p>Dental Surgeon</p>
//                 <div className="doctor-social">
//                   <Link to="#"><i className="bi bi-instagram"></i></Link>
//                   <Link to="#"><i className="bi bi-twitter"></i></Link>
//                   <Link to="#"><i className="bi bi-facebook"></i></Link>
//                 </div>
//               </div>
//             </div>

//             <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12" data-aos="fade-left">
//               <div className="doctor-card">
//                 <img src={doctor4} alt="Dr. John Smith" className="doctor-img" />
//                 <h5>Dr. John Smith</h5>
//                 <p>Periodontist</p>
//                 <div className="doctor-social">
//                   <Link to="#"><i className="bi bi-instagram"></i></Link>
//                   <Link to="#"><i className="bi bi-twitter"></i></Link>
//                   <Link to="#"><i className="bi bi-facebook"></i></Link>
//                 </div>
//               </div>
//             </div>

//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Doctor.css";
import { Link } from "react-router-dom";
import "aos/dist/aos.css";

export default function HomeDoctor() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("https://mern-stack-backend-mlwh.onrender.com/doctors");
      setDoctors(res.data);
    } catch (err) {
      console.log("Error fetching doctors:", err);
    }
  };

  return (
    <section className="doctor-section">
      <div className="container-fluid py-5">
        <div className="container">

          {/* Heading */}
          <div className="row text-center mb-4">
            <h3 className="fw-bold doctor-title" style={{color:'#05668d'}}>Qualified Doctors</h3>
            <p className="text-muted">
              Our experienced dental specialists are dedicated to giving you the best smile possible.
            </p>
          </div>

          {/* Cards */}
          <div className="row g-4 justify-content-center">

            {doctors.slice(0, 4).map((doc, index) => (
              <div
                key={doc._id}
                className="col-xl-3 col-lg-4 col-md-6 col-sm-12"
                data-aos={
                  index === 0
                    ? "fade-right"
                    : index === 1
                    ? "fade-down"
                    : index === 2
                    ? "fade-up"
                    : "fade-left"
                }
              >
                <div className="doctor-card">

                  {/* Doctor Image */}
                  <img
                    src={
                      doc.photo
                        ? `https://mern-stack-backend-mlwh.onrender.com/uploads/doctors/${doc.photo}`
                        : "https://via.placeholder.com/300x300"
                    }
                    alt={doc.name}
                    className="doctor-img"
                  />

                  <h5>{doc.name}</h5>
                  <p>{doc.specialization}</p>

                  <div className="doctor-social">
                    <Link to="#"><i className="bi bi-instagram"></i></Link>
                    <Link to="#"><i className="bi bi-twitter"></i></Link>
                    <Link to="#"><i className="bi bi-facebook"></i></Link>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>
    </section>
  );
}
