import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Doctor.css";

const AddDoctor = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [doctor, setDoctor] = useState({
    name: "",
    email: "",
    specialization: "",
    experience: "",
    phone: "",
    status: "Available",
  });

  const [photo, setPhoto] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/admin/login", { replace: true });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDoctor((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    setPhoto(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!photo) {
      alert("Please upload photo");
      return;
    }

    try {
      const formData = new FormData();
      Object.keys(doctor).forEach((key) => {
        formData.append(key, doctor[key]);
      });
      formData.append("photo", photo);

      await axios.post("https://mern-stack-backend-mlwh.onrender.com/doctors", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Doctor added successfully!");
      navigate("/admin/dashboard/doctors");
    } catch (err) {
      console.error(err);
      alert("Error adding doctor");
    }
  };

  const handleNavClick = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="dashboard-layout">
      {/* Mobile Topbar */}
      <div className="mobile-topbar">
        <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
          ☰
        </button>
        <h2 className="mobile-logo">DentalUI</h2>
      </div>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <h2 className="logo">DentalUI</h2>
          <button className="close-btn" onClick={() => setSidebarOpen(false)}>
            ✖
          </button>
        </div>

        <nav>
          <p className="menu-title">MENU</p>
          <ul>
            <li>
              <NavLink
                to="/admin/dashboard"
                end
                onClick={handleNavClick}
                style={({ isActive }) => ({
                  color: isActive ? "#ff6b35" : "#374151",
                  textDecoration: "none",
                })}
              >
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/dashboard/Appointment"
                onClick={handleNavClick}
                style={({ isActive }) => ({
                  color: isActive ? "#ff6b35" : "#374151",
                  textDecoration: "none",
                })}
              >
                Appointments
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/dashboard/patients"
                onClick={handleNavClick}
                style={({ isActive }) => ({
                  color: isActive ? "#ff6b35" : "#374151",
                  textDecoration: "none",
                })}
              >
                Patients
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/dashboard/doctors"
                onClick={handleNavClick}
                style={({ isActive }) => ({
                  color: isActive ? "#ff6b35" : "#374151",
                  textDecoration: "none",
                })}
              >
                Doctors
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/dashboard/services"
                onClick={handleNavClick}
                style={({ isActive }) => ({
                  color: isActive ? "#ff6b35" : "#374151",
                  textDecoration: "none",
                })}
              >
                Services
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/dashboard/blog"
                onClick={handleNavClick}
                style={({ isActive }) => ({
                  color: isActive ? "#ff6b35" : "#374151",
                  textDecoration: "none",
                })}
              >
                Blog
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/admin/dashboard/reports"
                onClick={handleNavClick}
                style={({ isActive }) => ({
                  color: isActive ? "#ff6b35" : "#374151",
                  textDecoration: "none",
                })}
              >
                Reports
              </NavLink>
            </li>

            {/* Logout */}
            <li className="logout-item">
              <button
                type="button"
                className="logout-btn"
                onClick={handleLogout}
              >
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main">
        <h2>Add New Doctor</h2>

        <form className="doctor-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={doctor.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            type="email"
            name="email"
            value={doctor.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <input
            type="text"
            name="specialization"
            value={doctor.specialization}
            onChange={handleChange}
            placeholder="Specialization"
            required
          />
          <input
            type="text"
            name="experience"
            value={doctor.experience}
            onChange={handleChange}
            placeholder="Experience"
            required
          />
          <input
            type="text"
            name="phone"
            value={doctor.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
          />
          <input type="file" accept="image/*" onChange={handlePhotoChange} required />

          <select name="status" value={doctor.status} onChange={handleChange}>
            <option value="Available">Available</option>
            <option value="On Leave">On Leave</option>
          </select>

          <button type="submit" className="add-btn">
            Add Doctor
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddDoctor;