// import React, { useState } from 'react'
// import './Contact.css'
// import { Link } from 'react-router-dom'
// import axios from "axios";

// export default function ContactPage() {

//   // ✅ Form States
//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [rating, setRating] = useState("");
//   const [message, setMessage] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post("http://localhost:5000/feedback", {
//         name,
//         email,
//         rating,
//         message,
//       });

//       alert("Feedback submitted successfully! ❤️");

//       // clear form
//       setName("");
//       setEmail("");
//       setRating("");
//       setMessage("");

//     } catch (error) {
//       console.log(error);
//       alert("Something went wrong. Try again!");
//     }
//   };

//   return (
//     <div>

//       <section className="contact-header">
//         <h1>Contact Us</h1>
//         <p>We’d love to hear from you. Get in touch for appointments and inquiries.</p>
//       </section>

//       <section className="contact-form-section">
//         <div className="container">
//           <div className="row g-5">

//             <div className="col-lg-6">
//               <div className="contact-info">
//                 <h4 className="mb-4" style={{ color: '#023047' }}>Get In Touch</h4>

//                 <p><i className="bi bi-geo-alt-fill"></i> BrightSmile Dental Clinic, Main Road, Your City, India</p>
//                 <p><i className="bi bi-telephone-fill"></i> +91 9876543210</p>
//                 <p><i className="bi bi-envelope-fill"></i> info@brightsmile.com</p>
//                 <p><i className="bi bi-clock-fill"></i> Mon - Sat: 9:00 AM - 8:00 PM</p>

//                 <div className="social-icons mt-4">
//                   <Link to="#"><i className="bi bi-facebook"></i></Link>
//                   <Link to="#"><i className="bi bi-instagram"></i></Link>
//                   <Link to="#"><i className="bi bi-whatsapp"></i></Link>
//                 </div>
//               </div>
//             </div>

//             {/* ✅ ONLY THIS FORM PART IS CHANGED */}
//             <div className="col-lg-6">
//               <h4 className="mb-4" style={{ color: '#023047' }}>Give Us Your Feedback</h4>

//               <form onSubmit={handleSubmit}>
//                 <div className="mb-3">
//                   <input
//                     type="text"
//                     className="form-control"
//                     placeholder="Your Name"
//                     value={name}
//                     onChange={(e) => setName(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <input
//                     type="email"
//                     className="form-control"
//                     placeholder="Your Email"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     required
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <select
//                     className="form-control"
//                     value={rating}
//                     onChange={(e) => setRating(e.target.value)}
//                     required
//                   >
//                     <option value="">Rate Your Experience</option>
//                     <option value="5">⭐⭐⭐⭐⭐ Excellent</option>
//                     <option value="4">⭐⭐⭐⭐ Very Good</option>
//                     <option value="3">⭐⭐⭐ Good</option>
//                     <option value="2">⭐⭐ Fair</option>
//                     <option value="1">⭐ Poor</option>
//                   </select>
//                 </div>

//                 <div className="mb-3">
//                   <textarea
//                     className="form-control"
//                     rows="5"
//                     placeholder="Write your feedback here..."
//                     value={message}
//                     onChange={(e) => setMessage(e.target.value)}
//                     required
//                   ></textarea>
//                 </div>

//                 <button type="submit" className="btn btn-primary">
//                   Submit Feedback
//                 </button>
//               </form>
//             </div>

//           </div>
//         </div>
//       </section>

//       <div className="mt-4">
//         <iframe
//           title="BrightSmile Dental Clinic Location Map"
//           src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.043679531707!2d75.78388387486423!3d11.25819718892134!2m3!1f0!2f0!3f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba6594884338717%3A0xc70dc331c3be0ef8!2sKozhikode%20New%20Bus%20Stand!5e0!3m2!1sen!2sin!4v1762880645148!5m2!1sen!2sin"
//           width="100%"
//           height="250"
//           style={{ border: 0, borderRadius: "10px" }}
//           allowFullScreen
//           loading="lazy">
//         </iframe>
//       </div>

//     </div>
//   )
// }

import React from "react";
import "./Contact.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function ContactPage() {

  // ✅ Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Name is required"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    subject: Yup.string()
      .min(5, "Subject must be at least 5 characters")
      .required("Subject is required"),

    message: Yup.string()
      .min(10, "Message must be at least 10 characters")
      .required("Message is required"),
  });

  // ✅ Formik Setup
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },

    validationSchema,

    onSubmit: async (values, { resetForm, setStatus }) => {
      try {
        const res = await axios.post(
          "https://mern-stack-backend-mlwh.onrender.com/contact",
          values
        );

        setStatus(res.data.message);
        resetForm();

      } catch (error) {
        setStatus("Something went wrong. Try again!");
      }
    },
  });

  return (
    <div>
      <section className="contact-header">
        <h1>Contact Us</h1>
        <p>
          We’d love to hear from you. Get in touch for appointments and inquiries.
        </p>
      </section>

      <section className="contact-form-section">
        <div className="container">
          <div className="row g-5">

            {/* LEFT SIDE CONTACT INFO */}
            <div className="col-lg-6">
              <div className="contact-info">
                <h4 className="mb-4" style={{ color: "#023047" }}>
                  Get In Touch
                </h4>

                <p>BrightSmile Dental Clinic, Main Road, Your City, India</p>
                <p>+91 9876543210</p>
                <p>info@brightsmile.com</p>
                <p>Mon - Sat: 9:00 AM - 8:00 PM</p>

                <div className="social-icons mt-4">
                  <Link to="#"><i className="bi bi-facebook"></i></Link>
                  <Link to="#"><i className="bi bi-instagram"></i></Link>
                  <Link to="#"><i className="bi bi-whatsapp"></i></Link>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE FORM */}
            <div className="col-lg-6">
              <h4 className="mb-4" style={{ color: "#023047" }}>
                Send Us a Message
              </h4>

              <form onSubmit={formik.handleSubmit}>

                {/* Name */}
                <div className="mb-3">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Your Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <small className="text-danger">
                      {formik.errors.name}
                    </small>
                  )}
                </div>

                {/* Email */}
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Your Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <small className="text-danger">
                      {formik.errors.email}
                    </small>
                  )}
                </div>

                {/* Subject */}
                <div className="mb-3">
                  <input
                    type="text"
                    name="subject"
                    className="form-control"
                    placeholder="Subject"
                    value={formik.values.subject}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.subject && formik.errors.subject && (
                    <small className="text-danger">
                      {formik.errors.subject}
                    </small>
                  )}
                </div>

                {/* Message */}
                <div className="mb-3">
                  <textarea
                    name="message"
                    className="form-control"
                    rows="5"
                    placeholder="Write your message here..."
                    value={formik.values.message}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  ></textarea>
                  {formik.touched.message && formik.errors.message && (
                    <small className="text-danger">
                      {formik.errors.message}
                    </small>
                  )}
                </div>

                <button type="submit" className="btn btn-primary">
                  Send Message
                </button>

                {formik.status && (
                  <p className="mt-3 text-success">
                    {formik.status}
                  </p>
                )}

              </form>
            </div>

          </div>
        </div>
      </section>

      {/* Google Map */}
      <div className="mt-4">
        <iframe
          title="BrightSmile Dental Clinic Location Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d125218.54684735226!2d75.7284133353937!3d11.255555506753332!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba65938563d4747%3A0x32150641ca32ecab!2sKozhikode%2C%20Kerala!5e0!3m2!1sen!2sin!4v1771649975242!5m2!1sen!2sin"
          width="100%"
          height="250"
          style={{ border: 0, borderRadius: "10px" }}
          allowFullScreen
          loading="lazy"
        ></iframe>
      </div>

    </div>
  );
}