import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Doctor.css";

export default function DoctorPage() {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState(""); // ✅ NEW

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get("https://mern-stack-backend-mlwh.onrender.com/doctors");
      setDoctors(res.data);
    } catch (err) {
      console.error("Error fetching doctors:", err);
    }
  };

  // ✅ NEW: Filter doctors by search
  const filteredDoctors = doctors.filter((doc) =>
    (doc.name + " " + doc.specialization)
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div>
      <section className="contact-header">
        <h1>Our Qualified Doctors</h1>
      </section>

      <div
        className="container-fluid py-5"
        style={{ backgroundColor: "#f2fcff" }}
      >
        <div className="container">
          <div className="row text-center mb-4">
            <h3 className="fw-bold" style={{ color: "#05668d" }}>
              Our Qualified Doctors
            </h3>
            <p className="text-muted">
              Our experienced dental specialists are dedicated to giving you the
              best smile possible.
            </p>
          </div>

          {/* ✅ NEW: Search Bar */}
          <div className="row mb-4">
            <div className="col-lg-6 mx-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Search doctor by name or specialization..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="row g-4">
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doc) => (
                <div className="col-lg-3 col-md-6" key={doc._id}>
                  <div className="doctor-card">
                    <img
                      src={
                        doc.photo
                          ? `https://mern-stack-backend-mlwh.onrender.com/uploads/doctors/${doc.photo}`
                          : "https://via.placeholder.com/300x300?text=Doctor"
                      }
                      alt={doc.name}
                      className="doctor-img"
                    />

                    <h5>{doc.name}</h5>
                    <p>{doc.specialization}</p>

                    <div className="doctor-social">
                      <Link to="#">
                        <i className="bi bi-instagram"></i>
                      </Link>
                      <Link to="#">
                        <i className="bi bi-twitter"></i>
                      </Link>
                      <Link to="#">
                        <i className="bi bi-facebook"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted">No doctors found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
