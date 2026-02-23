import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./Appointment.css";

export default function AppointmentPage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get("https://mern-stack-backend-mlwh.onrender.com/services");
      setServices(res.data);
    } catch (err) {
      console.error("Error fetching services:", err);
    }
  };

  // ✅ Validation Schema
  const validationSchema = Yup.object({
    name: Yup.string()
      .min(3, "Name must be at least 3 characters")
      .required("Full Name is required"),

    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    phone: Yup.string()
      .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
      .required("Phone number is required"),

    age: Yup.number()
      .min(1, "Invalid age")
      .max(120, "Invalid age")
      .required("Age is required"),

    gender: Yup.string().required("Please select gender"),

    service: Yup.string().required("Please select a service"),

    message: Yup.string()
      .max(500, "Message too long"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      age: "",
      gender: "",
      service: "",
      message: "",
    },
    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post("https://mern-stack-backend-mlwh.onrender.com/appointments", values);
        alert("Appointment request submitted successfully!");
        resetForm();
      } catch (err) {
        console.error(err);
        alert("Failed to book appointment");
      }
    },
  });

  return (
    <div>
      <section className="appointment-header">
        <h2>Book Your Appointment</h2>
        <p className="lead">
          We’re here to give you the perfect smile you deserve. Schedule your visit today!
        </p>
      </section>

      <div className="container my-5">
        <div className="appointment-form mx-auto col-lg-8">
          <form onSubmit={formik.handleSubmit}>
            <div className="row g-3">

              {/* Name */}
              <div className="col-md-6">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  {...formik.getFieldProps("name")}
                />
                {formik.touched.name && formik.errors.name && (
                  <small className="text-danger">{formik.errors.name}</small>
                )}
              </div>

              {/* Email */}
              <div className="col-md-6">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  {...formik.getFieldProps("email")}
                />
                {formik.touched.email && formik.errors.email && (
                  <small className="text-danger">{formik.errors.email}</small>
                )}
              </div>

              {/* Phone */}
              <div className="col-md-6">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  {...formik.getFieldProps("phone")}
                />
                {formik.touched.phone && formik.errors.phone && (
                  <small className="text-danger">{formik.errors.phone}</small>
                )}
              </div>

              {/* Age */}
              <div className="col-md-3">
                <label className="form-label">Age</label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  {...formik.getFieldProps("age")}
                />
                {formik.touched.age && formik.errors.age && (
                  <small className="text-danger">{formik.errors.age}</small>
                )}
              </div>

              {/* Gender */}
              <div className="col-md-3">
                <label className="form-label">Gender</label>
                <select
                  className="form-select"
                  id="gender"
                  {...formik.getFieldProps("gender")}
                >
                  <option value="">Choose...</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </select>
                {formik.touched.gender && formik.errors.gender && (
                  <small className="text-danger">{formik.errors.gender}</small>
                )}
              </div>

              {/* Service */}
              <div className="col-md-6">
                <label className="form-label">Select Service</label>
                <select
                  className="form-select"
                  id="service"
                  {...formik.getFieldProps("service")}
                >
                  <option value="">Choose...</option>
                  {services.map((s) => (
                    <option key={s._id} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                  <option value="Others">Others</option>
                </select>
                {formik.touched.service && formik.errors.service && (
                  <small className="text-danger">{formik.errors.service}</small>
                )}
              </div>

              {/* Message */}
              <div className="col-12">
                <label className="form-label">Additional Message</label>
                <textarea
                  className="form-control"
                  id="message"
                  rows="4"
                  {...formik.getFieldProps("message")}
                />
                {formik.touched.message && formik.errors.message && (
                  <small className="text-danger">{formik.errors.message}</small>
                )}
              </div>

              <div className="col-12 text-center mt-4">
                <button type="submit" className="btn btn-appoint">
                  Book Appointment
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}