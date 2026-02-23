import React, { useState } from "react";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";
import "./Report.css";

const AddReport = ({ user, setUser }) => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [title, setTitle] = useState("");
  const [patientName, setPatientName] = useState("");
  const [status, setStatus] = useState("Completed");
  const [pdf, setPdf] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ SAFE Logout Function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser?.(null); // prevents crash if setUser is undefined
    navigate("/Admin/login", { replace: true });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!pdf) {
      alert("Please upload a PDF report");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("patientName", patientName);
    formData.append("status", status);
    formData.append("pdf", pdf);

    try {
      setLoading(true);
      await axios.post("https://mern-stack-backend-mlwh.onrender.com/reports", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Report uploaded successfully");
      navigate("/Admin/dashboard/reports");
    } catch (err) {
      console.error(err);
      alert("Failed to upload report");
    } finally {
      setLoading(false);
    }
  };

  const handleNavClick = () => setSidebarOpen(false);

  return (
    <div className="dashboard-layout">
      
      {/* ✅ Mobile Topbar */}
      <div className="mobile-topbar">
        <button className="menu-btn" onClick={() => setSidebarOpen(true)}>
          ☰
        </button>
        <h2 className="mobile-logo">DentalUI</h2>
      </div>

      {/* ✅ Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* ===== SIDEBAR ===== */}
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
              <NavLink to="/Admin/dashboard" end onClick={handleNavClick}>
                Dashboard
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/Admin/dashboard/Appointment"
                onClick={handleNavClick}
              >
                Appointments
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/Admin/dashboard/patients"
                onClick={handleNavClick}
              >
                Patients
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/Admin/dashboard/doctors"
                onClick={handleNavClick}
              >
                Doctors
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/Admin/dashboard/services"
                onClick={handleNavClick}
              >
                Services
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/Admin/dashboard/blog"
                onClick={handleNavClick}
              >
                Blog
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/Admin/dashboard/reports"
                onClick={handleNavClick}
              >
                Reports
              </NavLink>
            </li>

            {/* ✅ Logout */}
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

      {/* ===== MAIN CONTENT ===== */}
      <main className="main">
        <h2>Add Report</h2>

        <form className="card" onSubmit={handleSubmit}>
          <div style={{ marginBottom: "15px" }}>
            <label>Report Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Patient Name</label>
            <input
              type="text"
              value={patientName}
              onChange={(e) => setPatientName(e.target.value)}
              required
            />
          </div>

          <div style={{ marginBottom: "15px" }}>
            <label>Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Completed">Completed</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label>Upload PDF</label>
            <input
              type="file"
              accept="application/pdf"
              onChange={(e) => setPdf(e.target.files[0])}
              required
            />
          </div>

          <button
            className="add-btn"
            type="submit"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Save Report"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default AddReport;