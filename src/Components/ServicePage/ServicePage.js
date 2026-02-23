import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Service.css";

export default function ServicePage() {
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const res = await axios.get("https://mern-stack-backend-mlwh.onrender.com/services");
      // show only active/published services if needed
      setServices(res.data.filter(s => s.status !== "Inactive"));
    } catch (err) {
      console.error("Error fetching services", err);
    }
  };

  return (
    <div>
      {/* HEADER */}
      <section className="contact-header">
        <h1>Services</h1>
      </section>

      {/* INTRO */}
      <div className="container-fluid py-5" style={{ backgroundColor: "#f2fcff" }}>
        <div className="container text-center mb-4">
          <h3 className="fw-bold" style={{ color: "#05668d" }}>
            Our Dental Services
          </h3>
          <p className="text-muted">
            We provide a wide range of dental treatments with modern technology and expert care.
          </p>
        </div>

        {/* SERVICES GRID */}
        <div className="container">
          <div className="row g-4">
            {services.map((service) => (
              <div className="col-lg-3 col-md-6" key={service._id}>
                <div className="service-box p-3 shadow-sm bg-white rounded-4 text-center h-100">
                  
                  {/* SERVICE IMAGE */}
                  <img
                    src={
                      service.photo
                        ? `https://mern-stack-backend-mlwh.onrender.com/uploads/services/${service.photo}`
                        : "/default-service.png"
                    }
                    alt={service.name}
                    className="img-fluid rounded-3 mb-3"
                    style={{
                      height: "180px",
                      width: "100%",
                      objectFit: "cover",
                    }}
                  />

                  {/* SERVICE INFO */}
                  <h5 className="fw-bold">{service.name}</h5>
                  <p className="text-muted">{service.description}</p>

                  {/* OPTIONAL DETAILS */}
                  {/* <div className="text-muted small">
                    <div>⏱ {service.duration}</div>
                    <div>💰 ₹{service.price}</div>
                  </div> */}
                </div>
              </div>
            ))}

            {/* EMPTY STATE */}
            {services.length === 0 && (
              <p className="text-center text-muted">No services available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
